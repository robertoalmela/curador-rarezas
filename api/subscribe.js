// ============================================
// API SERVERLESS: Suscripción a Mailchimp
// Funciona en Vercel o Netlify
// ============================================

// Para usar esta API necesitas:
// 1. Cuenta en Mailchimp (gratis hasta 500 suscriptores)
// 2. Variables de entorno:
//    - MAILCHIMP_API_KEY
//    - MAILCHIMP_AUDIENCE_ID
//    - MAILCHIMP_SERVER_PREFIX (ej: us21)

export default async function handler(req, res) {
    // Solo acepta POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    // Validación básica
    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    // Configuración de Mailchimp desde variables de entorno
    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX; // ej: us21

    if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
        console.error('Falta configuración de Mailchimp');
        return res.status(500).json({ 
            error: 'Configuración incompleta. Lee el README para configurar Mailchimp.' 
        });
    }

    try {
        // Llama a la API de Mailchimp
        const response = await fetch(
            `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `apikey ${API_KEY}`,
                },
                body: JSON.stringify({
                    email_address: email,
                    status: 'pending', // Requiere confirmación (double opt-in)
                    tags: ['rarezas-diarias']
                }),
            }
        );

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ 
                success: true, 
                message: 'Suscripción exitosa. Revisa tu email para confirmar.' 
            });
        } else if (data.title === 'Member Exists') {
            return res.status(400).json({ 
                error: 'Este email ya está suscrito.' 
            });
        } else {
            console.error('Error de Mailchimp:', data);
            return res.status(400).json({ 
                error: data.detail || 'Error al suscribir' 
            });
        }
    } catch (error) {
        console.error('Error en subscribe:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
}
