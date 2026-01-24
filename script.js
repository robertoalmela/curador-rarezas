// ============================================
// BASE DE DATOS DE RAREZAS
// ============================================
// Esta es una base de datos simulada. Puedes reemplazarla con APIs reales.

const discoveriesDatabase = [
    // WEBS EXTRAÑAS O INÚTILES
    {
        category: "web extraña",
        title: "The Useless Web",
        url: "https://theuselessweb.com/",
        description: "Un botón que te lleva a sitios web completamente inútiles y maravillosos. Cada clic es una ruleta de absurdidad digital.",
        quote: "A veces la inutilidad es el único propósito que necesitamos."
    },
    {
        category: "web extraña",
        title: "Windows 93",
        url: "http://www.windows93.net/",
        description: "Un sistema operativo ficticio en tu navegador. Glitchy, surrealista, y lleno de easter eggs imposibles.",
        quote: "La nostalgia del futuro que nunca existió."
    },
    {
        category: "web extraña",
        title: "Pointer Pointer",
        url: "https://pointerpointer.com/",
        description: "Una web que encuentra fotos de personas señalando exactamente donde está tu cursor. Perturbador y hipnótico.",
        quote: "Siempre hay alguien mirándote desde el otro lado."
    },
    {
        category: "web extraña",
        title: "Astronaut.io",
        url: "http://astronaut.io/",
        description: "Videos de YouTube sin vistas, subidos por desconocidos. Ventanas a vidas ajenas, momentos olvidados.",
        quote: "La intimidad accidental de internet."
    },
    {
        category: "web extraña",
        title: "Is It Normal?",
        url: "https://www.isitnormal.com/",
        description: "La gente pregunta si sus comportamientos raros son normales. Spoiler: nada es normal.",
        quote: "Normalidad es solo consenso temporal."
    },
    {
        category: "web extraña",
        title: "Window Swap",
        url: "https://www.window-swap.com/",
        description: "Observa ventanas ajenas desde lugares desconocidos del mundo. Nada pasa, pero es fascinante.",
        quote: "Quizá la vida es esto: mirar desde fuera."
    },
    
    // ARTISTAS DESCONOCIDOS O MARGINALES
    {
        category: "artista marginal",
        title: "Yayoi Kusama (antes del mainstream)",
        url: "https://www.yayoi-kusama.jp/e/information/index.html",
        description: "Antes de ser famosa, hacía performances en las calles de Nueva York cubriéndolo todo de lunares. Obsesión infinita.",
        quote: "El arte nace del caos repetido hasta la hipnosis."
    },
    {
        category: "artista marginal",
        title: "Henry Darger - In the Realms of the Unreal",
        url: "https://en.wikipedia.org/wiki/Henry_Darger",
        description: "Un conserje solitario escribió una novela de 15.000 páginas con ilustraciones épicas sobre niñas guerreras. Nadie lo supo hasta que murió.",
        quote: "Las obras maestras a veces se crean en el silencio absoluto."
    },
    {
        category: "artista marginal",
        title: "Bill Traylor - Arte Outsider",
        url: "https://www.outsiderartfair.com/bill-traylor",
        description: "Ex-esclavo que empezó a dibujar a los 85 años en las calles de Alabama. Sus obras son ahora joyas del arte outsider.",
        quote: "Nunca es tarde para nacer como artista."
    },
    {
        category: "artista marginal",
        title: "Vivian Maier - Fotógrafa Oculta",
        url: "https://www.vivianmaier.com/",
        description: "Niñera de día, fotógrafa secreta de noche. 150.000 fotos descubiertas tras su muerte en una subasta de garaje.",
        quote: "El arte no necesita audiencia para existir."
    },
    
    // PROYECTOS RAROS Y EXPERIMENTALES
    {
        category: "proyecto experimental",
        title: "Every Icon",
        url: "http://www.numeral.com/everyicon.html",
        description: "Un programa que genera cada icono posible de 32x32 píxeles. Tardará más tiempo que la edad del universo.",
        quote: "La eternidad cabe en una cuadrícula."
    },
    {
        category: "proyecto experimental",
        title: "One Million Masterpieces",
        url: "http://www.millionmasterpieces.com/",
        description: "Un millón de personas pintando un píxel cada una. Arte colaborativo anónimo y caótico.",
        quote: "Juntos creamos algo que ninguno comprende."
    },
    {
        category: "proyecto experimental",
        title: "Eternal Sunset",
        url: "https://www.eternalsunset.net/",
        description: "Una app que te mantiene siempre en el atardecer perfecto. Viaja siguiendo al sol eternamente.",
        quote: "Perseguir el horizonte es una forma de rezar."
    },
    {
        category: "proyecto experimental",
        title: "Long Now Foundation - 10,000 Year Clock",
        url: "http://longnow.org/clock/",
        description: "Un reloj diseñado para funcionar durante 10.000 años. Un monumento al tiempo largo y al pensamiento lento.",
        quote: "Pensar en siglos es un acto revolucionario."
    },
    
    // JUEGOS ABSURDOS O INTERACTIVOS
    {
        category: "juego absurdo",
        title: "Everything - David OReilly",
        url: "http://everything-game.com/",
        description: "Un juego donde puedes ser cualquier cosa: una piedra, un átomo, una galaxia. Filosofía jugable.",
        quote: "Ser todo es no ser nada en particular."
    },
    {
        category: "juego absurdo",
        title: "QWOP",
        url: "http://www.foddy.net/Athletics.html",
        description: "Controlar a un corredor con solo 4 teclas. Imposible, frustrante, adictivo. El arte del fracaso.",
        quote: "Caminar es un milagro que damos por hecho."
    },
    {
        category: "juego absurdo",
        title: "The Stanley Parable",
        url: "https://www.stanleyparable.com/",
        description: "Un juego sobre libre albedrío y narrativa. Cada decisión te lleva a un absurdo diferente.",
        quote: "Elegir es ilusorio, pero la ilusión es real."
    },
    {
        category: "juego absurdo",
        title: "Mountain - David OReilly",
        url: "http://mountain-game.com/",
        description: "Eres una montaña. No puedes hacer nada. El tiempo pasa. Es hermoso y deprimente.",
        quote: "A veces la inacción es la única respuesta honesta."
    },
    {
        category: "juego absurdo",
        title: "Cookie Clicker",
        url: "https://orteil.dashnet.org/cookieclicker/",
        description: "Haces clic en una galleta. Luego compras cosas para hacer más clics. Una sátira del capitalismo tardío.",
        quote: "La acumulación infinita como parodia de la existencia."
    },
    
    // MUNDOS UNDER, SUBCULTURAS
    {
        category: "subcultura",
        title: "Abandonedporn - Reddit",
        url: "https://www.reddit.com/r/AbandonedPorn/",
        description: "Fotos de lugares abandonados. Centros comerciales muertos, parques de atracciones fantasma, ciudades olvidadas.",
        quote: "La belleza del declive inevitable."
    },
    {
        category: "subcultura",
        title: "Urban Exploration",
        url: "https://www.uer.ca/",
        description: "Comunidad de exploradores urbanos. Entran donde no deben: túneles, edificios cerrados, cataclumbas.",
        quote: "La ciudad esconde más de lo que muestra."
    },
    {
        category: "subcultura",
        title: "Geocities Archive",
        url: "https://geocities.restorativland.org/",
        description: "Internet de los 90 conservado. Webs personales con GIFs animados, MIDIs y amor puro por la rareza.",
        quote: "Cuando internet era un lugar extraño hecho por extraños."
    },
    {
        category: "subcultura",
        title: "Liminal Spaces",
        url: "https://www.reddit.com/r/LiminalSpace/",
        description: "Fotos de pasillos vacíos, centros comerciales solitarios, parkings nocturnos. Espacios de transición inquietantes.",
        quote: "Los lugares intermedios son los más honestos."
    },
    
    // ESTÉTICAS RARAS, NET.ART, GLITCH, VAPORWAVE
    {
        category: "estética rara",
        title: "Jodi.org",
        url: "http://wwwwwwwww.jodi.org/",
        description: "Net.art pionero. Código como estética. Tu navegador enloquece. Arte que rompe la interfaz.",
        quote: "El error como expresión artística."
    },
    {
        category: "estética rara",
        title: "Glitchet - Rosa Menkman",
        url: "http://rosa-menkman.blogspot.com/",
        description: "Artista del glitch. Estudia la belleza en la corrupción digital, en los fallos, en lo roto.",
        quote: "Lo imperfecto revela la verdad del sistema."
    },
    {
        category: "estética rara",
        title: "Vaporwave Aesthetics Archive",
        url: "https://archive.org/details/VaporwaveAesthetics",
        description: "El archivo definitivo de vaporwave. Nostalgia retrofuturista, estatuas romanas, y Windows 95.",
        quote: "Nostalgia de un pasado que solo existió en anuncios."
    },
    {
        category: "estética rara",
        title: "Brutalist Websites",
        url: "https://brutalistwebsites.com/",
        description: "Web design anti-diseño. Crudo, honesto, funcional, feo-hermoso.",
        quote: "La estética de mostrar las costuras."
    },
    {
        category: "estética rara",
        title: "Webring de Neocities",
        url: "https://neocities.org/",
        description: "El renacer de las webs personales. Sin algoritmos, sin likes. Solo personas haciendo cosas raras.",
        quote: "Internet vuelve a ser jardín, no centro comercial."
    },
    
    // LISTAS DE IDEAS PROVOCADORAS
    {
        category: "ideas provocadoras",
        title: "The Disconnect",
        url: "https://disconnect.blog/",
        description: "Ensayos sobre desconectarse. Lentitud digital. Tecnología consciente. Silencio intencional.",
        quote: "Apagar es el nuevo encender."
    },
    {
        category: "ideas provocadoras",
        title: "Library of Babel",
        url: "https://libraryofbabel.info/",
        description: "Una biblioteca que contiene cada libro posible de 410 páginas. Todo está aquí, perdido entre el ruido infinito.",
        quote: "Información infinita es indistinguible del silencio."
    },
    {
        category: "ideas provocadoras",
        title: "Meaningness",
        url: "https://meaningness.com/",
        description: "Filosofía práctica sobre significado, propósito, y por qué nada importa pero todo cuenta.",
        quote: "El significado no se encuentra, se construye."
    },
    {
        category: "ideas provocadoras",
        title: "Wait But Why",
        url: "https://waitbutwhy.com/",
        description: "Ensayos largos ilustrados sobre inteligencia artificial, procrastinación, civilizaciones alienígenas.",
        quote: "Pensar en grande para entender lo pequeño."
    },
    
    // BLOGS OLVIDADOS
    {
        category: "blog olvidado",
        title: "Kottke.org",
        url: "https://kottke.org/",
        description: "Uno de los blogs más antiguos de internet. Todavía actualizado. Curación humana en la era de algoritmos.",
        quote: "La web lenta resiste."
    },
    {
        category: "blog olvidado",
        title: "The Marginalian (Brain Pickings)",
        url: "https://www.themarginalian.org/",
        description: "Ensayos sobre libros raros, pensadores olvidados, arte, ciencia, y belleza. Hecho con amor obsesivo.",
        quote: "Leer es conversar con fantasmas sabios."
    },
    {
        category: "blog olvidado",
        title: "Aeon",
        url: "https://aeon.co/",
        description: "Ensayos profundos sobre filosofía, ciencia, psicología. Escritura lenta para mentes rápidas.",
        quote: "La profundidad es contracultural."
    },
    {
        category: "blog olvidado",
        title: "Atlas Obscura",
        url: "https://www.atlasobscura.com/",
        description: "Lugares raros del mundo real. Museos extraños, monumentos olvidados, geografía imposible.",
        quote: "El mundo es más extraño de lo que parece en Google Maps."
    },
    
    // CONFERENCIAS, PERFORMANCES, EXPOSICIONES RARAS
    {
        category: "performance rara",
        title: "Marina Abramović - The Artist is Present",
        url: "https://www.moma.org/learn/moma_learning/marina-abramovic-marina-abramovic-the-artist-is-present-2010/",
        description: "Se sentó en silencio durante 736 horas mirando a desconocidos a los ojos. Algunos lloraban. Presencia pura.",
        quote: "Mirar es el acto más íntimo."
    },
    {
        category: "performance rara",
        title: "John Cage - 4'33\"",
        url: "https://www.youtube.com/watch?v=JTEFKFiXSx4",
        description: "Una pieza musical de silencio. El sonido es todo lo que pasa mientras no suena nada.",
        quote: "El silencio nunca está vacío."
    },
    {
        category: "performance rara",
        title: "Tehching Hsieh - One Year Performances",
        url: "https://www.artspace.com/magazine/art_101/in_depth/tehching-hsieh-55245",
        description: "Pasó un año entero sin entrar en edificios. Otro año atado a otra persona. Arte como resistencia temporal.",
        quote: "El tiempo es el único material real del arte."
    },
    {
        category: "conferencia rara",
        title: "TED Talk - Ze Frank",
        url: "https://www.ted.com/talks/ze_frank_my_web_playroom",
        description: "Una charla sobre jugar en internet, crear por crear, y hacer cosas raras sin razón.",
        quote: "El juego es trabajo sin productividad."
    },
    
    // CATEGORÍAS ADICIONALES
    {
        category: "experimento social",
        title: "The Million Dollar Homepage",
        url: "http://www.milliondollarhomepage.com/",
        description: "Un estudiante vendió un millón de píxeles a 1 dólar cada uno. Todos compraron. Un monumento al absurdo viral.",
        quote: "A veces la idea más tonta es la más inteligente."
    },
    {
        category: "archivo digital",
        title: "Internet Archive",
        url: "https://archive.org/",
        description: "La biblioteca de todo internet. Cada versión de cada web. El tiempo congelado en servidores.",
        quote: "Recordar es resistir al olvido algorítmico."
    },
    {
        category: "música experimental",
        title: "Ubuweb",
        url: "https://www.ubu.com/",
        description: "Archivo de música avant-garde, poesía sonora, video experimental. Arte que no cabe en Spotify.",
        quote: "El ruido organizado es música del futuro."
    },
    {
        category: "filosofía digital",
        title: "Are.na",
        url: "https://www.are.na/",
        description: "Pinterest para pensadores. Colecciones de ideas, imágenes, textos. Comunidad de curadores obsesivos.",
        quote: "Conectar ideas es crear conocimiento."
    },
    {
        category: "proyecto imposible",
        title: "Folding@home",
        url: "https://foldingathome.org/",
        description: "Miles de computadoras trabajando juntas para simular proteínas y curar enfermedades. Colaboración silenciosa.",
        quote: "Los sueños grandes se construyen en silencio distribuido."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Falling Falling",
        url: "http://www.fallingfalling.com/",
        description: "Una experiencia visual y auditiva minimalista que te lleva a un viaje infinito hacia no se sabe dónde. Es hipnótico y desconcertante, perfecto para quienes buscan un descanso mental en lo absurdo.",
        quote: "Deja que la gravedad te lleve a mundos inexplorados."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Furby Organ",
        url: "https://www.lookmumnocomputer.com/projects-1/furby-organ",
        description: "Este artista ha convertido a los entrañables Furbys de los años 90 en un órgano musical sinfónico. Explorando la intersección de la nostalgia y el ruido, este proyecto es un espectáculo tanto visual como auditivo.",
        quote: "La infancia se transforma en música caótica."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "ASMR Programmed Voices",
        url: "https://www.asmrion.com/",
        description: "Un proyecto experimental que explora el fenómeno del ASMR a través de voces generadas por IA. Un terreno entre lo humano y lo artificial, buscando provocar respuestas sensoriales únicas.",
        quote: "El susurro cibernético del presente."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Universal Paperclips",
        url: "http://www.decisionproblem.com/paperclips/",
        description: "Comienza como un juego sencillo de fabricación de clips de papel, pero rápidamente te sumerges en una reflexión sobre la inteligencia artificial, la economía y el fin del mundo tal como lo conocemos.",
        quote: "Todo empieza con un pequeño clip de papel."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The SCP Foundation",
        url: "http://www.scpwiki.com/",
        description: "Una comunidad colaborativa de escritura que documenta y protege a criaturas, objetos y fenómenos paranormales. Un portal a una realidad alternativa donde lo imposible es cotidiano.",
        quote: "Protege, contiene y preserva lo inexplicable."
    },
    {
        category: "Estéticas raras",
        title: "Aesthetic Games",
        url: "https://gamejolt.com/c/aestheticgames",
        description: "Una comunidad dedicada a la creación y apreciación de juegos con una fuerte inclinación por la estética vaporwave, glitch y otras corrientes visuales poco convencionales.",
        quote: "Cuando el arte visual se convierte en juego."
    },
    {
        category: "Ideas provocadoras",
        title: "The Society for the Protection of Unwanted Objects",
        url: "http://www.spud.org.uk/",
        description: "Un grupo dedicado a la promoción de objetos que el mundo ha desechado, cuestionando nuestra noción de valor y utilidad en una sociedad consumista.",
        quote: "Lo que un día fue basura hoy es tesoro."
    },
    {
        category: "Blogs olvidados",
        title: "Things Magazine",
        url: "http://www.thingsmagazine.net/",
        description: "Un blog que explora la historia, las asociaciones y los significados de objetos cotidianos que muchas veces pasan desapercibidos. Un archivo visual y textual que desafía nuestra percepción del mundo material.",
        quote: "Todo objeto tiene una historia que contar."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Jurassic Technology",
        url: "https://www.mjt.org/",
        description: "Una institución que desafía las convenciones del museo tradicional, exhibiendo artefactos e historias que juegan entre la línea de lo verdadero y lo ficticio. Una exploración del conocimiento y su presentación.",
        quote: "Donde la naturaleza y la cultura se encuentran en lo asombroso."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Un proyecto comunitario de música electrónica experimental que invita a músicos de todo el mundo a crear piezas sonoras inspiradas por indicaciones semanales. Un laboratorio de innovación auditiva.",
        quote: "La experimentación es la clave de la creación sonora."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://staggeringbeauty.com/",
        description: "Una serpiente negra baila frenéticamente al ritmo de tus movimientos de ratón, con luces que parpadean y un sonido ensordecedor cuando se agitan demasiado rápido.",
        quote: "A veces, la belleza tambaleante es la más cautivadora."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "María Nepomuceno",
        url: "https://www.victoria-miro.com/artists/262-maria-nepomuceno/",
        description: "Esta artista brasileña teje esculturas orgánicas con colores vibrantes y materiales inesperados, invitando a reflexionar sobre la conexión entre lo natural y lo humano.",
        quote: "El hilo de la vida se enreda en el arte."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Balloon HQ",
        url: "http://www.balloonhq.com/",
        description: "Dedicado al arte y la ciencia de los globos, este sitio explora desde esculturas complicadas hasta fenómenos físicos de volátiles y efímeras criaturas de aire y látex.",
        quote: "La fragilidad de un globo es su fortaleza más poderosa."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Dinosaur Polo Club's Mini Metro",
        url: "https://dinopoloclub.com/minimetro/",
        description: "Un juego estratégico relajante donde dibujas líneas de metro en ciudades que crecen sin cesar, mientras te enfrentas al caos de horarios y pasajeros impacientes.",
        quote: "Las mejores líneas son las que nunca se detienen."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "CyberBunk",
        url: "https://www.cyberbunk.net/",
        description: "Explora una webcomic que escudriña el mundo del ciberpunk, donde el humor ácido y la crítica social pintan un futuro distópico pero intrínsecamente humano.",
        quote: "En el futuro, las luces de neón no son lo único eléctrico."
    },
    {
        category: "Estéticas raras",
        title: "Cory Arcangel's Website",
        url: "https://www.coryarcangel.com/",
        description: "Artista relacionado con el net.art, Arcangel utiliza la tecnología y el humor para deconstruir la cultura pop y la estética digital de una era en constante cambio.",
        quote: "El arte es tan fugaz como la banda ancha."
    },
    {
        category: "Ideas provocadoras",
        title: "Digital Nausea",
        url: "http://digitalnausea.com/",
        description: "Un blog de ensayos que busca provocar, reflexionar y a veces incomodar al lector sobre las complejidades de vivir en una era digital delirante.",
        quote: "Vivir entre píxeles puede ser un mareo constante."
    },
    {
        category: "Blogs olvidados",
        title: "The Last Blog",
        url: "http://lastblog.com/",
        description: "Una oda nostálgica a los primeros días de los blogs, con reflexiones personales, ensayos y memorias de una era pasada cuando la web todavía era joven e inocente.",
        quote: "Recordar es revivir en el hipertexto del pasado."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "https://www.thequietvolume.com/",
        description: "Una performance participativa en bibliotecas donde susurros y lecturas guiadas crean una narrativa íntima, explorando los límites entre lector, espacio y texto.",
        quote: "El silencio es el autor más elocuente."
    },
    {
        category: "Música experimental",
        title: "The Drift",
        url: "http://www.thedriftproject.com/",
        description: "Un viaje sonoro que juega con la improvisación y la inmersión, fusionando música ambiental, jazz y electrónica para desafiar la percepción auditiva.",
        quote: "Dejarse llevar puede ser la única forma de avanzar."
    }
];

// ============================================
// ESTADO DE LA APLICACIÓN
// ============================================

let shownDiscoveries = []; // IDs de descubrimientos ya mostrados (solo del día)
let currentDayKey = ''; // Clave del día actual (para cambio diario)
let historyIndices = []; // Historial global para no repetir en el tiempo
let dailySelectionIndices = []; // Índices elegidos para el día actual

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene la clave del día actual (YYYY-MM-DD)
 */
function getDayKey() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

/**
 * Formatea la fecha para mostrar
 */
function formatDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return now.toLocaleDateString('es-ES', options);
}

/**
 * Carga el estado desde localStorage
 */
function loadState() {
    const savedState = localStorage.getItem('curiosityStateV2');
    const today = getDayKey();
    if (savedState) {
        const state = JSON.parse(savedState);
        currentDayKey = state.dayKey || today;
        shownDiscoveries = state.shown || [];
        historyIndices = state.history || [];
        if (currentDayKey !== today) {
            // Nuevo día: mantenemos el historial pero vaciamos la selección diaria
            currentDayKey = today;
            dailySelectionIndices = [];
            saveState();
        } else {
            dailySelectionIndices = state.dailySelection || [];
        }
    } else {
        // Inicializa
        currentDayKey = today;
        shownDiscoveries = [];
        historyIndices = [];
        dailySelectionIndices = [];
        saveState();
    }
}

/**
 * Guarda el estado en localStorage
 */
function saveState() {
    localStorage.setItem('curiosityStateV2', JSON.stringify({
        dayKey: currentDayKey,
        shown: shownDiscoveries,
        history: historyIndices,
        dailySelection: dailySelectionIndices
    }));
}

/**
 * Reinicia el estado
 */
function resetState() {
    // Reinicia solo lo diario; conserva el historial para no repetir en el tiempo
    shownDiscoveries = [];
    dailySelectionIndices = [];
    currentDayKey = getDayKey();
    historyIndices = historyIndices || [];
    saveState();
}

/**
 * Mezcla un array (algoritmo Fisher-Yates)
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * Obtiene descubrimientos aleatorios no mostrados
 */
function getRandomDiscoveries(count = 6) {
    // Filtra los no mostrados
    const notShown = discoveriesDatabase.filter((_, index) => !shownDiscoveries.includes(index));
    
    // Si no quedan suficientes, reinicia
    if (notShown.length < count) {
        resetState();
        return getRandomDiscoveries(count);
    }
    
    // Mezcla y toma los primeros 'count'
    const shuffled = shuffleArray(notShown);
    const selected = shuffled.slice(0, count);
    
    // Marca como mostrados
    selected.forEach(item => {
        const originalIndex = discoveriesDatabase.indexOf(item);
        if (!shownDiscoveries.includes(originalIndex)) {
            shownDiscoveries.push(originalIndex);
        }
    });
    
    saveState();
    return selected;
}

/**
 * Crea una tarjeta de descubrimiento
 */
function createDiscoveryCard(discovery) {
    const card = document.createElement('div');
    card.className = 'discovery-card';
    
    card.innerHTML = `
        <div class="category-badge">${discovery.category}</div>
        <h2 class="discovery-title">
            <a href="${discovery.url}" target="_blank" rel="noopener noreferrer">
                ${discovery.title}
            </a>
        </h2>
        <p class="discovery-description">${discovery.description}</p>
        <div class="discovery-quote">${discovery.quote}</div>
    `;
    
    // Animación de entrada
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
    
    return card;
}

/**
 * Renderiza los descubrimientos en el grid
 */
function renderDiscoveries(discoveries) {
    const grid = document.getElementById('discoveries-grid');
    grid.innerHTML = ''; // Limpia el grid
    
    discoveries.forEach((discovery, index) => {
        const card = createDiscoveryCard(discovery);
        // Añade delay escalonado para animación
        setTimeout(() => {
            grid.appendChild(card);
        }, index * 100);
    });
}

/**
 * Muestra el loading
 */
function showLoading() {
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('discoveries-grid').style.opacity = '0';
}

/**
 * Oculta el loading
 */
function hideLoading() {
    setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('discoveries-grid').style.opacity = '1';
    }, 800);
}

/**
 * Carga nuevos descubrimientos
 */
// Selecciona índices para el día (mantiene consistencia al recargar y evita repeticiones en el tiempo)
function getOrGenerateDailyIndices(count = 6) {
    if (dailySelectionIndices && dailySelectionIndices.length >= count) {
        return dailySelectionIndices;
    }

    // Candidatos: todos los índices menos los ya usados históricamente
    const allIndices = discoveriesDatabase.map((_, i) => i);
    const available = allIndices.filter(i => !new Set(historyIndices).has(i));

    const picked = shuffleArray(available).slice(0, Math.min(count, available.length));

    dailySelectionIndices = picked;
    shownDiscoveries = [...picked]; // del día
    historyIndices = [...historyIndices, ...picked];
    saveState();
    return dailySelectionIndices;
}

// Intenta cargar la selección diaria generada por el script de email (daily-selection.json)
async function loadDailyDiscoveriesFromServer() {
    try {
        const res = await fetch('scripts/daily-selection.json', { cache: 'no-store' });
        if (!res.ok) return null;

        const data = await res.json();
        const today = getDayKey();
        if (!data || data.date !== today || !Array.isArray(data.indices) || data.indices.length === 0) {
            return null;
        }

        // Filtra índices inválidos por seguridad
        const validIndices = data.indices.filter(i => i >= 0 && i < discoveriesDatabase.length);
        if (validIndices.length === 0) return null;

        // Actualiza estado local para mantener coherencia con el sistema de historial
        dailySelectionIndices = validIndices;
        shownDiscoveries = [...validIndices];
        historyIndices = Array.from(new Set([...(historyIndices || []), ...validIndices]));
        saveState();

        return validIndices.map(i => discoveriesDatabase[i]);
    } catch (error) {
        console.error('No se pudo cargar scripts/daily-selection.json:', error);
        return null;
    }
}

async function loadDailyDiscoveries() {
    showLoading();

    // Simula tiempo de carga (puedes reemplazar con fetch real/servidor)
    setTimeout(async () => {
        // 1) Intentar usar la misma selección que el email diario
        let items = await loadDailyDiscoveriesFromServer();

        // 2) Si falla o no hay selección válida, usar lógica local existente
        if (!items) {
            const idx = getOrGenerateDailyIndices(6);
            items = idx.map(i => discoveriesDatabase[i]);
        }

        renderDiscoveries(items);
        hideLoading();
    }, 600);
}

/**
 * Añade un solo descubrimiento aleatorio
 */
function addOneMoreDiscovery() {
    const grid = document.getElementById('discoveries-grid');
    const discoveries = getRandomDiscoveries(1);
    
    if (discoveries.length > 0) {
        const card = createDiscoveryCard(discoveries[0]);
        grid.appendChild(card);
        
        // Scroll suave hacia la nueva tarjeta
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Carga el estado
    loadState();
    
    // Muestra la fecha
    document.getElementById('current-date').textContent = formatDate();
    
    // Carga descubrimientos del día (persisten aunque recargues)
    loadDailyDiscoveries();

    // Configura el formulario de Brevo (suscripción sin recargar página)
    setupBrevoForm();
});

// ============================================
// NEWSLETTER: Suscripción con Brevo (frontend)
// ============================================

function setupBrevoForm() {
    const form = document.getElementById('sib-form');
    const msg = document.getElementById('form-message');
    if (!form || !msg) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('EMAIL');
        const email = (emailInput?.value || '').trim();
        if (!email) return;

        msg.textContent = 'Enviando suscripción...';
        msg.style.color = '#8aa';

        const formData = new FormData(form);

        try {
            // No podemos leer la respuesta de Brevo por CORS, así que asumimos éxito
            await fetch(form.action, {
                method: 'POST',
                mode: 'no-cors',
                body: formData,
            });

            msg.textContent = '¡Listo! Revisa tu correo para confirmar la suscripción. Si ya estabas suscrito, no recibirás correos duplicados.';
            msg.style.color = '#00f5ff';
            form.reset();
        } catch (error) {
            console.error('Error enviando suscripción a Brevo:', error);
            msg.textContent = 'Ha habido un problema al suscribirte. Inténtalo de nuevo en unos minutos.';
            msg.style.color = '#ff006e';
        }
    });
}

// ============================================
// INTEGRACIÓN CON APIs REALES (OPCIONAL)
// ============================================

/**
 * Ejemplo de cómo integrar con APIs reales
 * Descomenta y adapta según tus necesidades
 */

/*
async function fetchFromReddit(subreddit) {
    try {
        const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`);
        const data = await response.json();
        
        return data.data.children.map(post => ({
            category: 'reddit',
            title: post.data.title,
            url: `https://reddit.com${post.data.permalink}`,
            description: post.data.selftext.substring(0, 200) + '...',
            quote: 'De los rincones de Reddit.'
        }));
    } catch (error) {
        console.error('Error fetching from Reddit:', error);
        return [];
    }
}

async function fetchFromHackerNews() {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        const ids = await response.json();
        
        // Obtiene los primeros 5 posts
        const posts = await Promise.all(
            ids.slice(0, 5).map(id => 
                fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json())
            )
        );
        
        return posts.map(post => ({
            category: 'tech',
            title: post.title,
            url: post.url || `https://news.ycombinator.com/item?id=${post.id}`,
            description: 'Descubrimiento técnico de Hacker News.',
            quote: 'La frontera del hacking y la innovación.'
        }));
    } catch (error) {
        console.error('Error fetching from HN:', error);
        return [];
    }
},
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com",
        description: "Una obra web interactiva que reacciona de manera sorprendente al movimiento del mouse. Es un paseo visual que sacude el ánimo.",
        quote: "A veces, la belleza se tambalea en el caos."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jennifer Glassford",
        url: "https://cargocollective.com/jenniferglassford",
        description: "Una artista que explora lo efímero a través de instalaciones hechas de materiales reciclados. Su trabajo es una oda a lo transitorio.",
        quote: "El arte es un susurro en el viento, apenas audible, pero siempre presente."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Universe Within",
        url: "http://ncase.me/universe-within/",
        description: "Un fascinante recorrido interactivo desde lo más grande a lo más pequeño del universo. Es un viaje que desafía la percepción.",
        quote: "Todo es inmenso y diminuto a la vez."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Notpron Riddle",
        url: "https://notpron.org/notpron/",
        description: "Conocido como el 'juego más difícil de la red', Notpron desafía a los jugadores con enigmas que requieren pensar fuera de lo convencional.",
        quote: "El ingenio es el arte de lo improbable."
    },
    {
        category: "Subculturas",
        title: "Otaku Pal",
        url: "https://otaku-pal.com/",
        description: "Un sitio dedicado a documentar la cultura otaku en Japón y más allá, explorando lo que significa ser un fanático devoto en la era digital.",
        quote: "La pasión puede convertir lo común en lo extraordinario."
    },
    {
        category: "Estéticas raras",
        title: "Net Art Anthology",
        url: "https://anthology.rhizome.org/",
        description: "Compilación de obras de net.art que han definido y redefinido el arte en la web desde sus inicios. Un museo digital del arte en línea.",
        quote: "El arte es un virus que infecta el alma."
    },
    {
        category: "Ideas provocadoras",
        title: "Uncomfortable",
        url: "https://katerinasychova.com/uncomfortable",
        description: "Una colección de objetos incómodos diseñados para desafiar la utilidad cotidiana y provocar una reflexión sobre su propio uso.",
        quote: "Lo incómodo nos invita a replantear nuestros hábitos."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un blog donde las personas envían secretos anónimamente en forma de postales. Una mirada íntima a las almas humanas.",
        quote: "Los secretos son peonzas que giran en el silencio."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Telematic Dreaming",
        url: "http://www.paolocirio.net/work/telematic-dreaming/",
        description: "Una performance interactiva a distancia, donde los participantes se comunican a través de proyecciones digitales. Un sueño compartido en la era de la conexión virtual.",
        quote: "Soñar es viajar sin moverse del sitio."
    },
    {
        category: "Filosofía digital",
        title: "The Machine Stops",
        url: "http://archive.ncsa.illinois.edu/prajlich/forster.html",
        description: "E.M. Forster anticipó nuestra relación con la tecnología en este cuento corto. Una lectura que desafía a repensar nuestra dependencia digital.",
        quote: "Cuando la máquina se detiene, ¿qué queda de nosotros?"
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Una experiencia visual extraña y perturbadora donde un gusano en blanco y negro responde a tus movimientos del ratón con efectos de luz y sonido sorpresivos.",
        quote: "El caos no puede ser contenido, solo guiado brevemente."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Anne Marie Grgich",
        url: "http://www.artbrut.ch/en_GB/author/grgich-anne-marie",
        description: "Artista autodidacta conocida por sus collages vibrantes y figuras coloridas, construyendo mundos surrealistas llenos de detalles fascinantes.",
        quote: "La belleza de la imperfección revela mundos ocultos."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quiet Place Project",
        url: "https://thequietplaceproject.com/thequietplace",
        description: "Un rincón digital donde el tiempo se detiene. Una invitación para desconectar del ruido de internet y encontrar un momento de calma y reflexión.",
        quote: "En el silencio, las ideas susurran."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Sort The Court!",
        url: "https://graebor.itch.io/sort-the-court",
        description: "Un juego donde, como monarca, decides el destino de tu reino con respuestas simples, revelando lo absurdo y cómico de la política.",
        quote: "A veces, una simple decisión cambia un reino entero."
    },
    {
        category: "Mundos "under", subculturas",
        title: "The Flexing Jugaad",
        url: "https://theflexingjugaad.com/",
        description: "Celebración de la ingeniería improvisada en India. Las fotos muestran soluciones creativas con objetos cotidianos, revelando ingenio y humor.",
        quote: "La creatividad es el arte de lo posible con lo que hay."
    },
    {
        category: "Estéticas raras",
        title: "Digital Ocean",
        url: "https://wavepot.com/",
        description: "Un entorno de creación musical basado en código, permitiendo a los músicos experimentar con sonidos en un espacio infinitamente maleable.",
        quote: "El código es la partitura del futuro."
    },
    {
        category: "Ideas provocadoras",
        title: "HyperNormalisation",
        url: "https://www.youtube.com/watch?v=fh2cDKyFdyU",
        description: "Documental que examina cómo el mundo ha sido organizado y simplificado a lo largo del tiempo, desafiando la percepción de la realidad.",
        quote: "En un mundo de simulacros, la verdad se vuelve extraña."
    },
    {
        category: "Blogs olvidados",
        title: "The Old New Thing",
        url: "https://devblogs.microsoft.com/oldnewthing/",
        description: "Historias del desarrollo de software en Microsoft, una joya escondida llena de anécdotas técnicas y sabiduría geek de tiempos pasados.",
        quote: "En cada línea de código, una historia por contar."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Maybe",
        url: "https://www.swide.com/art-culture/art-history/marina-abramovic-and-uly-an-artistic-relationship-that-changed-the-world/",
        description: "Una exposición única con Marina Abramovic durmiendo en una vitrina en un museo, desafiando las nociones de arte y presencia.",
        quote: "Cuando el artista es el arte, el espectador deviene parte del cuadro."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad en línea que explora la música experimental, proponiendo desafíos semanales para compositores y creadores sonoros.",
        quote: "El sonido es una frontera infinita, esperando ser explorada."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Un sitio web sorprendentemente inútil pero hipnotizante donde una figura abstracta responde al movimiento de tu ratón con una animación inesperada y vívida.",
        quote: "El absurdo también tiene su coreografía."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Theo Jansen's Strandbeest",
        url: "https://www.strandbeest.com/",
        description: "Theo Jansen crea impresionantes criaturas cinéticas que caminan solas por la playa, fusionando arte e ingeniería en una danza con el viento.",
        quote: "Cuando el viento sopla, la playa cobra vida."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un refugio digital que te invita a dejar de lado las distracciones del mundo online y disfrutar de instantes de soledad en un espacio virtual tranquilo.",
        quote: "Encuentra el silencio en la maraña del ruido digital."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume: Kitty Collector",
        url: "https://www.nekoatsume.com/",
        description: "Un juego en el que todo lo que haces es colocar juguetes y comida para atraer gatos virtuales a tu jardín, una experiencia tan absurda como encantadora.",
        quote: "A veces, coleccionar momentos de ternura es suficiente."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Cicada 3301",
        url: "https://cicada3301.github.io/",
        description: "Un misterioso colectivo que lanzó complejas pruebas de reclutamiento en internet, desafiando la lógica y atrayendo a criptoanalistas y amantes del misterio.",
        quote: "El camino al conocimiento es laberíntico."
    },
    {
        category: "Estéticas raras",
        title: "Virtual Dream Foundation",
        url: "http://www.virtualdreamfoundation.org/",
        description: "Explora una colección de sueños digitales que evoca las estéticas del net.art y el vaporwave, creando una cartografía onírica del mundo virtual.",
        quote: "Los sueños también se crean con píxeles."
    },
    {
        category: "Ideas provocadoras",
        title: "This is Sand",
        url: "https://thisissand.com/",
        description: "Convierte tu pantalla en un lienzo de arena, dejando que millones de granos virtuales fluyan y formen paisajes únicos. Una idea simple que desafía nuestra percepción de lo tangible.",
        quote: "Cada grano cuenta una historia."
    },
    {
        category: "Blogs olvidados",
        title: "BLDGBLOG",
        url: "https://www.bldgblog.com/",
        description: "Un blog que explora las fronteras de la arquitectura y el paisaje urbano, desenterrando ideas olvidadas y visiones alternativas del espacio construido.",
        quote: "Las ciudades son sueños congelados en concreto."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Broken Relationships",
        url: "https://brokenships.com/",
        description: "Una exposición itinerante que colecciona objetos donados por gente de todo el mundo para narrar las historias de relaciones pasadas y pérdidas amorosas.",
        quote: "Los fragmentos del corazón son arte en potencia."
    },
    {
        category: "Filosofía digital",
        title: "The Center for Humane Technology",
        url: "https://www.humanetech.com/",
        description: "Un movimiento que busca rediseñar la tecnología poniendo en el centro el bienestar humano, cuestionando la naturaleza de nuestras interacciones digitales.",
        quote: "La verdadera innovación está en humanizar la tecnología."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Bored Button",
        url: "https://www.boredbutton.com/",
        description: "Un botón que te lleva a una serie de webs aleatorias diseñadas para combatir el aburrimiento. Una puerta a lo insólito que no sabías que necesitabas.",
        quote: "En la era del exceso de información, el tedio es un tesoro."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Shintaro Kago",
        url: "https://sakaisei.com/tag/shintaro-kago/",
        description: "Artista japonés del manga ero guro, mezcla de grotesco y erotismo. Sus ilustraciones muestran el lado más oscuro y surrealista de la mente humana.",
        quote: "La belleza emerge de la deformidad interior."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "This Is Sand",
        url: "https://thisissand.com/",
        description: "Una canvas digital donde puedes crear paisajes con arena virtual. La simplicidad se encuentra con la meditación en un collage de colores brillantes.",
        quote: "Cada grano cuenta una historia en el desierto de lo digital."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume",
        url: "http://www.nekoatsume.com/",
        description: "Un juego para coleccionar gatos en tu patio virtual. Simple, fascinante y sutilmente adictivo para los amantes de los felinos.",
        quote: "El arte de la paciencia se aprende esperando un visitante peludo."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Cypherpunks Mailing List",
        url: "http://cypherpunks.venona.com/date/",
        description: "El archivo de una lista de correos donde visionarios discutieron sobre criptografía y la privacidad en Internet. Un vistazo al nacimiento de la libertad digital.",
        quote: "El futuro de la privacidad fue redactado en códigos y correo."
    },
    {
        category: "Estéticas raras",
        title: "Cyberpunk Forum",
        url: "https://cyberpunkforums.com/",
        description: "Un refugio para aquellos interesados en la estética y las ideas del cyberpunk. Aquí la tecnología y el arte se fusionan en un caleidoscopio distópico.",
        quote: "La distopía es el sueño del insomnio tecnológico."
    },
    {
        category: "Ideas provocadoras",
        title: "The Last Message Received",
        url: "https://thelastmessagereceived.tumblr.com/",
        description: "Una colección de mensajes finales enviados por personas que se han ido. Un recordatorio del poder emocional de las palabras que pronunciamos.",
        quote: "Cada despedida es una pequeña eternidad encapsulada."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un blog donde los usuarios envían secretos anonimamente en forma de postales. La vida privada hecha arte colectivo.",
        quote: "Todos guardamos un mar de secretos en el silencio del corazón."
    },
    {
        category: "Performances o exposiciones raras",
        title: "On Kawara - One Million Years",
        url: "https://www.tate.org.uk/art/artworks/kawara-one-million-years-p13097",
        description: "Una obra que lista cada año desde hace un millón hasta dentro de un millón de años. Una exploración del tiempo que transforma la historia en mantra.",
        quote: "El tiempo no corre, nos transforma."
    },
    {
        category: "Música experimental",
        title: "The Conet Project",
        url: "http://www.irdial.com/conet.htm",
        description: "Grabaciones de números estaciones de onda corta, posiblemente usadas para mensajes de espionaje. La inquietante melodía de lo desconocido.",
        quote: "En el aire, las cifras son los susurros de lo invisible."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Endless Horse",
        url: "http://endless.horse/",
        description: "Un sitio que desafía la lógica con un caballo interminable. Desplázate hacia abajo y descubre por cuánto tiempo puedes seguir viendo el caballo sin fin.",
        quote: "La infinitud es un espacio que solo la imaginación puede recorrer."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "The Art of Jeremy Geddes",
        url: "http://www.jeremygeddesart.com/",
        description: "Jeremy Geddes crea mundos etéreos con sus pinturas al óleo, llenos de soledad y misterio. Sus obras evocan un sentimiento de aislamiento surrealista.",
        quote: "El arte es el lenguaje del silencio."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "This Person Does Not Exist",
        url: "https://thispersondoesnotexist.com/",
        description: "Genera rostros humanos realistas de personas que simplemente no existen. Un proyecto que desafía la percepción de la realidad y la identidad.",
        quote: "La ilusión más convincente es aquella que nunca existió."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Frog Fractions",
        url: "http://twinbeard.com/frog-fractions",
        description: "Un juego que empieza siendo sobre fracciones... o eso parece. Pronto, te encontrarás en una travesía surrealista que desafía las expectativas.",
        quote: "Las matemáticas no son lo que parecen en este lío anfibio."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Dumpster Diving Reddit",
        url: "https://www.reddit.com/r/DumpsterDiving/",
        description: "Un rincón de internet donde se comparte la cultura del reciclaje y la reutilización, convirtiendo la basura en tesoro.",
        quote: "Lo que un hombre tira, otro lo convierte en un arte."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Cyber City Oedo 808 Vaporwave",
        url: "https://cybercityodvapor.neocities.org/",
        description: "Un sitio que encapsula la esencia del vaporwave, con una estética cyberpunk que combina pasado, presente y futuro en un solo golpe visual.",
        quote: "Navega por el ciberespacio; un sueño digital atrapado en un bucle."
    },
    {
        category: "Ideas provocadoras",
        title: "The Last Message Received",
        url: "http://thelastmessagereceived.tumblr.com/",
        description: "Una colección conmovedora de los últimos mensajes recibidos antes de un adiós permanente. Refleja las emociones humanas en su momento más vulnerable.",
        quote: "Las despedidas escritas resuenan en el eco de la eternidad."
    },
    {
        category: "Blogs olvidados",
        title: "The Strange Case of Origami Yoda",
        url: "http://origamiyoda.wordpress.com/",
        description: "Un blog sobre una pequeña figura de origami Yoda, que comparte consejos de vida sinceros y divertidos en una sala de escuela.",
        quote: "Incluso el papel puede doblarse en sabiduría."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Guggenheim's Floating Island",
        url: "https://www.guggenheim.org/exhibition/robert-smithson-floating-island",
        description: "Una isla que se desplaza por el río Hudson en un homenaje al artista Robert Smithson. La obra redefine el concepto de escultura y paisaje.",
        quote: "El arte, como los sueños, a veces necesita flotar libremente."
    },
    {
        category: "Música experimental",
        title: "The Disintegration Loops",
        url: "https://pitchfork.com/reviews/albums/17430-the-disintegration-loops/",
        description: "Una serie de composiciones que capturan el proceso de deterioro magnético de las cintas de audio. La belleza se encuentra en el desvanecimiento y la decadencia.",
        quote: "Hay música en la descomposición, un eco del tiempo desvaneciéndose."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Un gusano negro que responde a cada sacudida del mouse, estallando en una danza de colores asombrosamente psicodélica. Una experiencia hipnotizante en su inutilidad.",
        quote: "A veces la belleza reside en la pura incomodidad."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Molly Soda",
        url: "http://mollysoda.exposed/",
        description: "La artista digital Molly Soda crea obras que exploran la identidad y la vulnerabilidad en la era de las redes sociales, desdibujando las líneas entre lo personal y lo público.",
        quote: "La intimidad es un campo de batalla digital."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "PostSecret",
        url: "http://postsecret.com/",
        description: "Un proyecto comunitario donde personas de todo el mundo envían postales anónimas con secretos, revelando la belleza y el dolor universal de la experiencia humana.",
        quote: "Todos guardamos un mar de confesiones en nuestros corazones."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume",
        url: "https://www.nekoatsume.com/",
        description: "Un encantador juego donde coleccionas virtualmente gatos en tu jardín, celebrando la pasividad y la alegría de lo absurdo en la vida digital.",
        quote: "A veces, la felicidad se mide en gatos virtuales."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Cyborg Nest",
        url: "https://www.cyborgnest.net/",
        description: "Un rincón donde biohackers exploran la fusión del cuerpo humano con lo tecnológico, llevando la noción de humanidad a nuevos horizontes y posibilidades.",
        quote: "El futuro del ser humano está en la unión entre carne y circuito."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Critter & Guitari",
        url: "https://www.critterandguitari.com/",
        description: "Una plataforma de arte modular que combina dispositivos audiovisuales con un toque de estética glitch, permitiendo explorar lo inesperado en cada sonido y pixel.",
        quote: "La imperfección da lugar a la auténtica belleza."
    },
    {
        category: "Ideas provocadoras",
        title: "The Immediate Life",
        url: "http://immediatelife.tumblr.com/",
        description: "Un viaje visual a través de fragmentos de vida, yuxtaponiendo imágenes que desafían y emocionan, permitiendo que el espectador complete su propio significado.",
        quote: "La vida no es más que un mosaico de momentos."
    },
    {
        category: "Blogs olvidados",
        title: "The Last Psychiatrist",
        url: "http://thelastpsychiatrist.com/",
        description: "Un blog provocador y a menudo crítico que explora la psique humana y la cultura moderna, desafiando nuestras suposiciones con un bisturí afilado de ironía.",
        quote: "La locura es solo una medida de discordancia con la norma."
    },
    {
        category: "Música experimental",
        title: "People Like Us",
        url: "https://peoplelikeus.org/",
        description: "La artista Vicki Bennett crea collages sonoros que desafían las categorías tradicionales, llevando al oyente a un viaje de descubrimiento auditivo único.",
        quote: "El sonido es solo una narrativa esperando ser contada."
    },
    {
        category: "Filosofía digital",
        title: "The Digital Beyond",
        url: "https://www.thedigitalbeyond.com/",
        description: "Explora el concepto de la muerte digital y el legado de nuestros 'yo' virtuales en un mundo donde lo temporal se vuelve eterno.",
        quote: "La continuidad de nuestra existencia está enlazada en bits y bytes."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Cyborg Name Generator",
        url: "http://cybernations.wikia.com/wiki/Cyborg_Name_Generator",
        description: "Un sitio que te asigna un nombre de cyborg, con títulos tan curiosos como 'Quantum-C-Unit'. Es inútil, pero irresistiblemente entretenido.",
        quote: "¿Qué nombre tendría tu versión robótica?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "The Art of Jolene Lau",
        url: "https://www.jolene-lau.com/",
        description: "Jolene Lau se adentra en lo surrealista con sus coloridas y oníricas ilustraciones que invitan a perderse en mundos de ensueño.",
        quote: "La realidad parece un sueño cuando el arte llama."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quiet Place Project",
        url: "https://thequietplaceproject.com/",
        description: "Un refugio digital para desconectar del ruido y encontrar paz. Sin notificaciones ni distracciones, un espacio para sólo estar.",
        quote: "La tranquilidad no tiene precio, pero puede tener URL."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Sandspiel",
        url: "https://sandspiel.club/",
        description: "Un juego que simula la física de partículas de manera relajante, creando paisajes únicos con elementos como agua, fuego y plantas.",
        quote: "Construye mundos de arena donde la física es poesía."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Post-Internet Survival Guide",
        url: "https://pismoresearch.org/guide",
        description: "Una guía para comprender las subculturas digitales que emergen tras el colapso de internet tal como lo conocemos.",
        quote: "Sobreviviendo a lo que viene después del fin digital."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Art Collective",
        url: "https://glitchart.com/",
        description: "Un colectivo que celebra los errores visuales como forma de arte, transformando fallos digitales en vibrantes obras creativas.",
        quote: "El error en la máquina tiene su propia belleza."
    },
    {
        category: "Ideas provocadoras",
        title: "A Philosophy of Boredom",
        url: "https://philosophyofboredom.com/",
        description: "Un blog dedicado a explorar el concepto de aburrimiento como estímulo intelectual y creativo, más que un estado de apatía.",
        quote: "El aburrimiento es un prisma que refracta la creatividad."
    },
    {
        category: "Blogs olvidados",
        title: "Encyclopedia Obscura",
        url: "http://www.encyclopediaobscura.com/",
        description: "Una colección de entradas que documentan lo extraño y lo maravilloso en tópicos históricos, científicos y culturales.",
        quote: "Explorando los márgenes de la curiosidad."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Invisible Exhibition",
        url: "https://invisibleexhibition.com/",
        description: "Una exposición que desafía los sentidos al explorar el arte desde la ceguera, guiando a los participantes en la oscuridad.",
        quote: "Cuando el arte se siente más allá de lo visible."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/category/junto/",
        description: "Un colectivo de músicos experimentales que semanalmente crean piezas basadas en instrucciones específicas, desafiando los límites del sonido.",
        quote: "Cuando la música se convierte en un experimento semanal."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Patatap",
        url: "https://patatap.com/",
        description: "Un sitio donde cada tecla del teclado genera un sonido y una animación única. Es una experiencia sensorial que transforma el aburrimiento en un juego audiovisual.",
        quote: "La música es el espacio entre las notas."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Chrisilyst",
        url: "https://chrisilyst.com/",
        description: "Chrisilyst es un artista autodidacta que crea simultáneamente caos y orden usando líneas y patrones repetitivos. Sus obras son embriagadoras y reflejan un universo paralelo de geometría infinita.",
        quote: "Las líneas son universos en expansión."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Infinite Conversation",
        url: "https://infiniteconversation.com/",
        description: "Este proyecto utiliza inteligencia artificial para generar una conversación interminable entre dos filósofos podrían discutir eternamente sobre el universo, el arte y la existencia.",
        quote: "El diálogo sin fin es el eco del pensamiento humano."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "QWOP",
        url: "http://www.foddy.net/Athletics.html",
        description: "En este simulador de atletismo, controlarás a un corredor con las teclas Q, W, O y P, en una experiencia tan frustrante como divertida. El desafío yace en mover las piernas correctamente.",
        quote: "El fracaso está a solo un paso en falso."
    },
    {
        category: "Subculturas",
        title: "Vapor95",
        url: "https://vapor95.com/blogs/vapor95-blog",
        description: "Explora un blog que se sumerge en la cultura vaporwave, una subcultura que mezcla nostalgia, música retro y saturación visual para crear una estética nostálgica y futurista a la vez.",
        quote: "El pasado y el futuro colisionan en la memoria digital."
    },
    {
        category: "Estéticas raras",
        title: "Fractal Lab",
        url: "http://hirnsohle.de/test/fractalLab/",
        description: "Un generador interactivo de fractales en 3D que te permite explorar y crear tus propios patrones fractales. Es un viaje hipnótico hacia el infinito matemático.",
        quote: "Los fractales son las huellas digitales del universo."
    },
    {
        category: "Ideas provocadoras",
        title: "Weird Box",
        url: "https://weirdbox.tv/",
        description: "Weird Box inserta tus fotos de Instagram en un cortometraje interactivo donde las redes sociales se funden con un thriller surrealista.",
        quote: "Cuando la realidad y la ficción colisionan, nace lo extraño."
    },
    {
        category: "Blogs olvidados",
        title: "The Last Blog",
        url: "http://www.thelastblog.com/",
        description: "Un blog encantadoramente anacrónico que continúa publicando reflexiones, poesía y arte en la era de la inmediatez digital. Un refugio para el pensamiento prolongado.",
        quote: "Las palabras escritas son relojes que desafían el tiempo."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Mono-Ha",
        url: "https://www.tate.org.uk/art/art-terms/m/mono-ha",
        description: "Explora la filosofía y obras de Mono-Ha, el movimiento artístico japonés que utilizaba materiales naturales y objetos industriales para desafiar las percepciones tradicionales del arte.",
        quote: "El arte es la danza del orden y el caos."
    },
    {
        category: "Música experimental",
        title: "Radiophonic Workshop",
        url: "https://www.bbc.co.uk/programmes/articles/4LT8Lr8w4m3n8LtqNF04mCz/the-radiophonic-workshop",
        description: "Revive el legado de un colectivo pionero de la BBC, que revolucionó la música experimental y los efectos de sonido en la radio y televisión del siglo XX.",
        quote: "El sonido es la materia prima de la imaginación."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Patatap",
        url: "https://patatap.com/",
        description: "Un sitio interactivo que convierte tu teclado en una máquina de sonidos y animaciones hipnóticas. Cada tecla es una sorpresa visual y auditiva.",
        quote: "¿Cuántos mundos hay en un teclado?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Tim Bavington",
        url: "http://www.timbavington.com/",
        description: "Este artista transforma la música en color con un enfoque sinestésico único. Cada obra es una interpretación visual de una canción.",
        quote: "Deja que la música pinte tus sueños."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Museum of Broken Relationships",
        url: "https://brokenships.com/",
        description: "Una colección de objetos cotidianos que cuentan historias de amor perdido, cada pieza es un testimonio de la fragilidad humana.",
        quote: "En las ruinas del amor, encontramos la belleza."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "QWOP",
        url: "http://www.foddy.net/Athletics.html",
        description: "Un juego absurdamente difícil donde controlas un corredor con las teclas QWOP de tu teclado. La física extraña hace de este juego un reto hilarante.",
        quote: "Fracasar nunca fue tan entretenido."
    },
    {
        category: "Mundos "under", subculturas",
        title: "SpaceHey",
        url: "https://spacehey.com/",
        description: "Una red social nostálgica que revive la estética y la comunidad de MySpace. Un viaje al internet de principios de los 2000.",
        quote: "Viajemos al pasado digital, un post a la vez."
    },
    {
        category: "Estéticas raras",
        title: "Cave of Forgotten Dreams",
        url: "https://www.documentarytube.com/videos/cave-of-forgotten-dreams",
        description: "Un documental de Werner Herzog sobre las cuevas de Chauvet, cuyos secretos y arte rupestre antiguo desafían la comprensión del tiempo y el arte.",
        quote: "El arte es el eco de la eternidad."
    },
    {
        category: "Ideas provocadoras",
        title: "Unconsumption",
        url: "http://unconsumption.tumblr.com/",
        description: "Un blog que reimagina el consumo como una actividad consciente, proponiendo formas de reutilizar y repensar nuestros hábitos de compra.",
        quote: "Porque poseer menos es poseer más."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un espacio donde personas anónimas envían sus más profundos secretos en forma de postales. Una ventana al alma humana.",
        quote: "Los secretos unen lo que el silencio separa."
    },
    {
        category: "Performances o exposiciones raras",
        title: "ŠKART",
        url: "https://skart.rs/",
        description: "Un colectivo serbio que combina poesía, diseño gráfico, y activismo social, creando performances que desafían lo cotidiano.",
        quote: "El arte que grita en silencio."
    },
    {
        category: "Filosofía digital",
        title: "The Glass Bead Game",
        url: "https://glassbead.org/",
        description: "Una revista y proyecto filosófico que explora la intersección de la ciencia, el arte y la filosofía. Un juego intelectual de conexiones.",
        quote: "Todo está conectado en el vasto juego del conocimiento."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "http://zoomquilt.org/",
        description: "Zoom Quilt es una alucinante experiencia visual que parece no tener final. Se trata de una colaboración entre múltiples artistas para crear una imagen infinita y en constante zoom, generando un efecto hipnótico y surreal.",
        quote: "La infinitud del arte no tiene límites ni bordes."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Joel-Peter Witkin",
        url: "https://www.edelmangallery.com/joel-peter-witkin",
        description: "El universo de Joel-Peter Witkin es oscuro y provocador. Sus fotografías desafían las normas del arte convencional, explorando temas de muerte, sexualidad y religión de una manera perturbadora.",
        quote: "Donde existe la controversia, el arte respira."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Pheromone Synthesizer",
        url: "https://www.artlery.com/art/The-Pheromone-Synthesizer-13189",
        description: "Un extraño proyecto que busca replicar feromonas humanas mediante una máquina. Esta obra experimental combina ciencia y arte para hacer visible lo invisible e inaudito.",
        quote: "Los olores también cuentan historias que nadie escucha."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Isle of Tune",
        url: "http://isleoftune.com/",
        description: "Isle of Tune te permite crear música a través de la construcción de una ciudad musical. Cada elemento del entorno genera un sonido, sumergiéndote en un mundo donde la urbanización se convierte en sinfonía.",
        quote: "Edificando melodías en el vasto terreno de la imaginación."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Furscience",
        url: "https://furscience.com/",
        description: "Furscience es un espacio dedicado al estudio científico de la comunidad 'furry'. Aquí se exploran los aspectos culturales, sociales y psicológicos de esta vibrante subcultura.",
        quote: "En el pelaje se encuentran historias más profundas de lo que se ve."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Hyper Geography",
        url: "https://www.hypergeography.tumblr.com/",
        description: "Un blog visual que desafía la percepción del espacio y la geografía. A través de collages digitales, Hyper Geography crea una experiencia estética única y desorientadora.",
        quote: "El mundo en un collage pixelado y sin fronteras."
    },
    {
        category: "Ideas provocadoras",
        title: "Dead Drops",
        url: "https://deaddrops.com/",
        description: "Dead Drops es una red de intercambio de archivos fuera de línea en espacios públicos. USBs cementados en paredes urbanas invitan a una reflexión sobre la privacidad digital.",
        quote: "Los secretos mejor guardados pueden estar al alcance de todos."
    },
    {
        category: "Blogs olvidados",
        title: "The Obscure Hollow",
        url: "https://theobscurehollow.blogspot.com/",
        description: "Un blog que explora casas antiguas, encantadas y estéticamente inquietantes. The Obscure Hollow te invita a un viaje a través del tiempo y la arquitectura olvidada.",
        quote: "Entre las ruinas yace la memoria de lo que fue."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Ryoji Ikeda's Data-verse",
        url: "https://ryojiikeda.com/project/data-verse/",
        description: "Ryoji Ikeda manipula datos en una serie de performances audiovisuales que transforman información en arte sensorial. Data-verse es una sinfonía moderna de bits y bytes.",
        quote: "En el caos del código, la belleza encuentra su orden."
    },
    {
        category: "Música experimental",
        title: "Plunderphonics by John Oswald",
        url: "http://www.plunderphonics.com/",
        description: "John Oswald desafía la música convencional al remezclar y reorganizar sonidos existentes en nuevas composiciones. Este acto de 'plunderphonics' cuestiona los límites de la autoría musical.",
        quote: "La música es un río en constante remolino."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "https://zoomquilt.org/",
        description: "Un viaje visual interminable que te sumerge a través de un mundo de imágenes infinitamente conectadas. El arte va más allá de lo convencional, empujándote hacia un abismo onírico de creatividad y detalles.",
        quote: "¿Y si el infinito fuera una serie de sueños interconectados?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jan von Holleben",
        url: "https://www.janvonholleben.com/",
        description: "Fotógrafo que transforma la cotidianidad en obras fantásticas. Su enfoque único desafía la percepción del espacio y el tiempo, creando universos paralelos a partir de objetos comunes.",
        quote: "La magia está donde menos lo esperas, a menudo bajo tus pies."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un refugio digital para escapar del ruido constante de la vida moderna. Ofrece una serie de experiencias interactivas que invitan a la introspección y a la serenidad.",
        quote: "A veces, el sonido más potente es el silencio."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Pippo",
        url: "https://pippo.phetch.co/",
        description: "Un juego de palabras visuales, donde tu objetivo es identificar lo incorrecto en imágenes cotidianas. Es un test de observación que te hará dudar de la realidad tal como la conoces.",
        quote: "Lo extraño se oculta a plena vista."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Balloon HQ",
        url: "http://balloonhq.com/",
        description: "Un portal inesperado a la comunidad global de arte y escultura con globos. Más que entretenimiento infantil, es un mundo vibrante de creatividad e innovación.",
        quote: "La ligereza del arte solo es superada por la imaginación que lo infla."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitche",
        url: "https://glitche.com/",
        description: "Un experimento visual que permite crear arte glitch a partir de tus fotos. Una ruptura con la perfección digital que te invita a explorar la belleza de la imperfección.",
        quote: "A veces, el error es el camino más directo hacia lo hermoso."
    },
    {
        category: "Ideas provocadoras",
        title: "Museum of Endangered Sounds",
        url: "http://savethesounds.info/",
        description: "Una cápsula del tiempo digital que conserva los sonidos emblemáticos de tecnologías obsoletas. Un recordatorio auditivo de cómo el progreso transforma nuestro paisaje cotidiano.",
        quote: "El eco del pasado resuena en el futuro."
    },
    {
        category: "Blogs olvidados",
        title: "Things We Forget",
        url: "https://thingsweforget.blogspot.com/",
        description: "Un blog con notas adhesivas ilustradas que se centran en frases motivadoras y pensamientos introspectivos. Pequeños recordatorios de humanidad dejados al azar en el mundo.",
        quote: "Las palabras que olvidamos dicen más de lo que recordamos."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Jurassic Technology",
        url: "http://www.mjt.org/",
        description: "Un museo que desafía las expectativas de lo que es o debería ser un museo, exhibiendo artefactos inesperados que invitan a reflexionar sobre la memoria, el conocimiento y la percepción.",
        quote: "En el cruce entre lo real y lo imaginado, florece la maravilla."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Comunidad de músicos que participan en desafíos semanales para crear música experimental. Una colmena de creatividad sónica que explora los límites del sonido en la era digital.",
        quote: "Cada nota es un paso hacia lo desconocido."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoomquilt",
        url: "http://zoomquilt.org/",
        description: "Un viaje visual interminable a través de un paisaje surrealista que se expande y contrae en un bucle infinito. Cada imagen fluye hacia la siguiente, creando una ilusión hipnótica que desafía la percepción del espacio.",
        quote: "El infinito es un enigma envuelto en la eternidad."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Anne van der Linden",
        url: "http://annevanderlinden.net/",
        description: "Anne van der Linden es una pintora y dibujante cuyo trabajo explora lo grotesco, lo sensual y lo subversivo. Sus obras provocativas desdibujan las fronteras entre el cuerpo y la mente, desafiando las normas artísticas convencionales.",
        quote: "Lo grotesco revela aquello que la belleza esconde."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Human Clock",
        url: "http://www.humanclock.com/",
        description: "Una curiosa colección de fotografías que muestran personas sosteniendo el tiempo. Cada minuto del día se representa con una imagen diferente, creando una cápsula del tiempo visual que cambia constantemente.",
        quote: "El tiempo es un mosaico de momentos efímeros."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume",
        url: "http://nekoatsume.com/",
        description: "Un juego encantadormente absurdo donde el objetivo es atraer gatos virtuales a tu jardín con juguetes y comida. Imagina un mundo donde los felinos son la única preocupación, proporcionando una satisfacción inesperadamente serena.",
        quote: "La simplicidad del juego es un refugio de tranquilidad."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Ghost Town Cafe",
        url: "https://ghosttowncafe.neocities.org/",
        description: "Un rincón digital dedicado a la exploración de lo paranormal y lo inexplicado. Esta comunidad online fomenta el intercambio de historias de encuentros sobrenaturales, avistamientos de ovnis y lo inexplicable.",
        quote: "Lo desconocido es un eco del mundo que no vemos."
    },
    {
        category: "Estéticas raras",
        title: "Glitché App Showcase",
        url: "https://glitche.com/",
        description: "Explora las posibilidades del arte en la era digital con Glitché, una aplicación que transforma las imágenes cotidianas en obras glitch art. Los ejemplos presentados muestran la belleza oculta en el error.",
        quote: "El caos puede ser tan hermoso como el orden."
    },
    {
        category: "Ideas provocadoras",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un proyecto comunitario donde las personas envían sus secretos de forma anónima en postales. El espacio se convierte en un lienzo para confesiones humanas, desde lo cómico hasta lo trágico.",
        quote: "Los secretos son las sombras del alma."
    },
    {
        category: "Blogs olvidados",
        title: "Things Organized Neatly",
        url: "http://thingsorganizedneatly.tumblr.com/",
        description: "Un blog dedicado a la organización visual, donde los objetos cotidianos se transforman en arte a través del orden y la simetría. Una oda a la armonía en las pequeñas cosas de la vida.",
        quote: "El orden revela lo sublime en lo cotidiano."
    },
    {
        category: "Experimentos sociales",
        title: "We Feel Fine",
        url: "http://www.wefeelfine.org/",
        description: "Este proyecto recopila sentimientos humanos de blogs en todo el mundo, creando una representación visual de las emociones colectivas. Una exploración poética de la humanidad a través de los datos.",
        quote: "Cada sentimiento es un latido en el corazón del mundo."
    },
    {
        category: "Filosofía digital",
        title: "The Cyborg Manifesto",
        url: "https://theanarchistlibrary.org/library/donna-haraway-a-cyborg-manifesto",
        description: "Un ensayo seminal de Donna Haraway que desafía las definiciones tradicionales de naturaleza, cultura y tecnología. Propone una visión radical del futuro posthumano a través del lente del ciborg.",
        quote: "El futuro será híbrido o no será."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Un gusano negro se retuerce frenéticamente al movimiento de tu cursor, creando un espectáculo visual que desafía el sentido común. Es una experiencia que combina simpleza y caos en un rincón digital.",
        quote: "A veces, la inutilidad es la más pura forma de diversión."
    },
    {
        category: "Estéticas raras",
        title: "Cameron's World",
        url: "http://www.cameronsworld.net/",
        description: "Un homenaje vibrante al internet de los años 90, donde los gráficos pixelados y los colores llamativos te trasladan a una era de ingenuidad digital. Cada clic es un viaje a la nostalgia más ruidosa.",
        quote: "El pasado digital nunca estuvo tan vivo."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "We Feel Fine",
        url: "http://www.wefeelfine.org/",
        description: "Un proyecto que recopila y visualiza las emociones de millones de personas a través de sus blogs. Una obra de arte colectiva que transforma el sentir humano en colores y formas, revelando patrones de la humanidad.",
        quote: "Más que palabras, somos emociones compartidas."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Dinosaur Polo Club's Mini Metro",
        url: "https://dinopoloclub.com/minimetro/",
        description: "Un juego de simulación de metro minimalista que desafía la lógica y la paciencia mientras intentas mantener una ciudad funcional. Una representación perfecta de cómo el caos y el orden pueden coexistir de manera entretenida.",
        quote: "Construir un sistema perfecto, un ciclo interminable."
    },
    {
        category: "Música experimental",
        title: "Patatap",
        url: "https://www.patatap.com/",
        description: "Una herramienta interactiva que transforma las pulsaciones de teclas en música y arte visual. Cada letra desencadena un sonido único, creando una sinfonía de caos y belleza sincronizada.",
        quote: "La música del teclado, el arte del instante."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Embroidered Digital Commons",
        url: "https://www.hq.uis.no/~signe/idngr_dev/EDC/",
        description: "Signe Lidén borda términos tecnológicos en tela, evocando una era en que las palabras eran rarezas táctiles. Una mezcla de lo antiguo y lo moderno que invita a reflexionar sobre el significado de lo digital.",
        quote: "Tejer conceptos como quien cose un nuevo lenguaje."
    },
    {
        category: "Filosofía digital",
        title: "The Glass Bead Game",
        url: "http://www.holosfind.com/glassbeadgame/",
        description: "Un espacio digital donde las ideas se entrelazan en complejas redes. Inspirado por la obra de Hermann Hesse, es un juego mental que explora el infinito potencial de la mente humana.",
        quote: "En el juego de las ideas, la mente es el tablero."
    },
    {
        category: "Subculturas",
        title: "MyNoise",
        url: "https://mynoise.net/",
        description: "Un sitio que ofrece generadores de ruido ajustables para crear paisajes sonoros personalizables. Es un refugio acústico para aquellos que buscan paz o concentración en un mundo saturado de sonido.",
        quote: "El silencio también tiene su propio sonido."
    },
    {
        category: "Ideas provocadoras",
        title: "This is sand",
        url: "https://thisissand.com/",
        description: "Convierte tu pantalla en un lienzo digital de arena. A través del simple acto de dejar caer granos de colores, se invita a la contemplación y la creación en un mundo donde la simplicidad es revolucionaria.",
        quote: "La eternidad se mide en granos de arena."
    },
    {
        category: "Experimentos sociales",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un espacio virtual diseñado para desconectar del ruido digital, invitando al visitante a un refugio de tranquilidad y meditación sencilla. Aquí, el silencio es un lujo indulgente.",
        quote: "Desconectar para conectarse con uno mismo."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Patience is a Virtue",
        url: "https://patience-is-a-virtue.org/",
        description: "Un sitio que celebra la paciencia, con una sola página que se carga infinitamente y sin ofrecer nada más que la experiencia de esperar. Una oda a lo inútil en la era de la instantaneidad.",
        quote: "A veces, esperar es lo único que podemos hacer."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Don Porcella",
        url: "http://www.donporcella.com/",
        description: "Don Porcella utiliza limpiapipas para crear esculturas coloridas y absurdas que redefinen el significado de lo efímero y lo cotidiano, mostrando otro ángulo del arte contemporáneo.",
        quote: "El arte es la reimaginación de lo ordinario."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Weird Box",
        url: "http://weirdbox.tv/",
        description: "Un proyecto interactivo donde puedes ver tus fotos de Instagram en una extraña y surrealista caja de televisión, cuestionando la relación entre tecnología e identidad.",
        quote: "Mira cómo te ve la pantalla."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "A Dark Room",
        url: "http://adarkroom.doublespeakgames.com/",
        description: "Un juego de texto minimalista que comienza con una simple habitación oscura y se convierte en una épica experiencia de supervivencia, exploración y misterio.",
        quote: "En la oscuridad es donde realmente despertamos."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "DeepDream Viewer",
        url: "https://deepdreamviewer.com/",
        description: "Explora el surrealista universo del algoritmo DeepDream, donde las imágenes son reimaginadas con un toque psicodélico y un vistazo a la percepción artificial.",
        quote: "Las máquinas también sueñan."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitché Art",
        url: "https://www.glitche.com/",
        description: "Una aplicación que permite crear glitch art en dispositivos móviles, descompone y distorsiona imágenes para transformarlas en obras de arte digital únicas.",
        quote: "La belleza en el error."
    },
    {
        category: "Ideas provocadoras",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un refugio digital del ruido y el caos de internet, ofreciendo espacios de tranquilidad virtual para la reflexión y el silencio en medio de la saturación digital.",
        quote: "Encuentra la calma en un mundo ruidoso."
    },
    {
        category: "Blogs olvidados",
        title: "Hyperbole and a Half",
        url: "http://hyperboleandahalf.blogspot.com/",
        description: "Con humor e ilustraciones crudamente honestas, este blog explora la vida con una mirada irónica y conmovedora, ofreciendo un espacio para la risa y la reflexión.",
        quote: "La vida es una tragicomedia de dibujos."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Luminiferous Aether",
        url: "https://www.luminiferousaether.com/",
        description: "Una exposición virtual que combina arte, ciencia y filosofía para explorar la noción del éter luminífero en un espacio digital envolvente lleno de misterio.",
        quote: "Más allá de lo visible reside la verdadera luz."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad sonora en línea dedicada a la música experimental, que cada semana propone un desafío creativo para explorar nuevos horizontes musicales.",
        quote: "El sonido es una exploración infinita."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "The Museum of Endangered Sounds",
        url: "http://savethesounds.info/",
        description: "Un museo digital dedicado a preservar los sonidos que podrían perderse en la era digital, como el zumbido del dial-up o el clic de un disquete. Un viaje sonoro nostálgico hacia tiempos más simples.",
        quote: "El silencio no es siempre de oro; a veces, es un sonido olvidado."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jennet Thomas",
        url: "http://www.jennetthomas.co.uk/",
        description: "Artista multimedia que desafía los límites del videoarte con narrativas surrealistas e imágenes de otro mundo. Su trabajo explora la frontera entre lo absurdo y lo inquietante.",
        quote: "En lo extraño habita la verdad."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Weird Box",
        url: "http://weirdbox.tv/",
        description: "Una experiencia interactiva que convierte tu perfil de Instagram en una caja extraña llena de sorpresas visuales. Un juego inquietante entre lo privado y lo público.",
        quote: "La privacidad es la nueva rareza."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Nothing To Hide",
        url: "http://nothing-to-hide.cc/",
        description: "Un juego de sigilo donde ser visto es la clave. En un mundo donde la privacidad no existe, el jugador debe maniobrar entre cámaras siempre vigilantes.",
        quote: "En un mundo de observadores, ¿qué significa realmente ser libre?"
    },
    {
        category: "Mundos "under", subculturas",
        title: "Deep Dream Generator",
        url: "https://deepdreamgenerator.com/",
        description: "Una comunidad de artistas digitales que usan la inteligencia artificial para transformar imágenes normales en visiones surreales y psicodélicas. Un lugar donde la IA y el arte se encuentran.",
        quote: "Los sueños digitales pueden ser más vivos que la realidad."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Beeple's Everydays",
        url: "https://www.beeple-crap.com/everydays",
        description: "Elambiente digital de Beeple ofrece una estética de ciencia ficción distópica todos los días, explorando los límites de nuestra existencia tecnológica.",
        quote: "Cada día trae un universo nuevo."
    },
    {
        category: "Ideas provocadoras",
        title: "The Simulation Argument",
        url: "http://www.simulation-argument.com/",
        description: "Un sitio dedicado a explorar la teoría de que vivimos dentro de una simulación computacional, cuestionando la naturaleza de la realidad de manera filosófica y científica.",
        quote: "¿Y si toda la existencia fuese solo un código bien escrito?"
    },
    {
        category: "Blogs olvidados",
        title: "The Dreaming",
        url: "http://thedreaming.com/",
        description: "Un blog arcaico que recopila experiencias personales y anécdotas de sueños vívidos, demostrando que los mundos oníricos pueden ser tan reales como los despiertos.",
        quote: "En los sueños, recordamos lo que en la vigilia olvidamos."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Walk",
        url: "https://www.thequietwalk.com/",
        description: "Una performance en línea que invita a los visitantes a dar un paseo virtual mientras meditan sobre sonidos y textos calmantes. Un respiro digital en un mundo ruidoso.",
        quote: "La paz es solo una caminata silenciosa de distancia."
    },
    {
        category: "Música experimental",
        title: "Plunderphonics",
        url: "http://www.plunderphonics.com/",
        description: "John Oswald explora el arte de deconstruir y reconstruir música popular, creando una experiencia auditiva que desafía las convenciones de la autoría musical.",
        quote: "La música no es posesión; es posibilidad."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Procrastinator's Clock",
        url: "http://procrastinator-mind.com/clock/",
        description: "Un reloj que nunca está seguro si va a tiempo o no, diseñado para aquellos que deseen escapar de la dictadura de la puntualidad. Su tiempo es relativo y variable.",
        quote: "La hora no es más que una ilusión colectiva."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Heather Wilcoxon",
        url: "https://www.heatherwilcoxon.com",
        description: "Artista outsider que crea mundos fantásticos y perturbadores con sus pinturas, llenas de personajes grotescos y colores vibrantes, explorando la locura y el caos.",
        quote: "El arte no tiene sentido si no sacude el alma."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Aphantasia Project",
        url: "https://aphantasia.com/",
        description: "Explora el fenómeno de la aphantasia, la incapacidad de crear imágenes mentales, a través de historias y entrevistas con aquellos que experimentan este curioso estado mental.",
        quote: "El vacío mental puede ser una fuente inagotable de creatividad."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Eggnog.io",
        url: "https://eggnog.io/",
        description: "Un alocado juego multijugador en línea donde todos son guerreros de neón compitiendo en un combate frenético y sin sentido donde solo el más rápido sobrevive.",
        quote: "En el caos, solo el absurdo tiene sentido."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Slab City",
        url: "https://www.slabcity.org/",
        description: "Conocida como \"la última ciudad libre de América\", Slab City es un refugio para artistas, vagabundos y nómadas que abrazan una vida al margen de la sociedad convencional.",
        quote: "La libertad se encuentra al final del camino polvoriento."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Artists Collective",
        url: "https://www.facebook.com/glitchartistscollective/",
        description: "Una comunidad vibrante y caótica donde los artistas comparten sus obras de glitch art, abrazando errores digitales como una forma de expresión estética.",
        quote: "El error es la nueva perfección."
    },
    {
        category: "Ideas provocadoras",
        title: "The Last Message Received",
        url: "http://thelastmessagereceived.tumblr.com/",
        description: "Un blog desgarrador que compila las últimas palabras enviadas a las personas antes de relaciones rotas, muertes o separaciones definitivas, reflejando la fragilidad humana.",
        quote: "En cada adiós, hay una eternidad."
    },
    {
        category: "Blogs olvidados",
        title: "Fragments of Past Curiosity",
        url: "http://fragmentsofpastcuriosity.blogspot.com/",
        description: "Un viaje nostálgico a través de pequeñas curiosidades del pasado, donde se exploran objetos obsoletos que desafían la lógica contemporánea.",
        quote: "El pasado siempre nos susurra secretos a través de sus vestigios."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "https://www.thequietvolume.com/",
        description: "Una obra teatral única que se desarrolla silenciosamente entre dos personas en una biblioteca, explorando el acto de leer como una experiencia compartida e íntima.",
        quote: "El silencio también susurra historias."
    },
    {
        category: "Experimentos sociales",
        title: "Grocery Store Wars",
        url: "http://www.storewars.org/noflash/",
        description: "Una parodia del universo de Star Wars donde los productos orgánicos luchan contra los alimentos procesados, invitando a reflexionar sobre el consumo y la producción masiva.",
        quote: "La fuerza orgánica estará contigo, siempre."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "http://zoomquilt.org/",
        description: "Un viaje infinito y alucinante a través de un mundo de ilustraciones que se conectan sin fin. Es una ventana al arte colaborativo y una experiencia meditativa.",
        quote: "El infinito cabe en un parpadeo, solo hay que saber dónde mirar."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Ryoji Ikeda",
        url: "https://www.ryojiikeda.com/",
        description: "Un artista japonés que explora el universo digital a través del sonido y la luz. Sus instalaciones y performances son una sinfonía de datos y una celebración de lo imperceptible.",
        quote: "Donde los datos se convierten en poesía."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/thequietplace",
        description: "Este lugar en la web te invita a detenerte, respirar y encontrar paz. Es un rincón digital que te recuerda la importancia de desconectar en un mundo siempre activo.",
        quote: "A veces, el silencio habla más fuerte que cualquier ruido."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume: Kitty Collector",
        url: "https://www.nekoatsume.com/",
        description: "Un juego simple y encantador donde coleccionas gatos que visitan tu patio virtual. Es absurdo, sin prisas, y no tiene un objetivo más que disfrutar de la compañía felina.",
        quote: "La felicidad también cabe en un par de bigotes digitales."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Post Apocalyptic Costuming",
        url: "https://postapocalypticcostuming.com/",
        description: "Una comunidad dedicada a crear e intercambiar ideas sobre vestuario inspirado en mundos post-apocalípticos. Es un escaparate del talento y la creatividad que florece en la adversidad ficticia.",
        quote: "Vestirse es reimaginar la supervivencia."
    },
    {
        category: "Estéticas raras",
        title: "Cybernetics Library",
        url: "https://cybernetics.social/",
        description: "Una biblioteca digital dedicada a la estética y la teoría de la cibernética. Un lugar donde el futuro y el pasado se cruzan en una danza de ideas y posibilidades.",
        quote: "La cibernética es el puente entre el hombre y la máquina."
    },
    {
        category: "Ideas provocadoras",
        title: "Existential Comics",
        url: "https://existentialcomics.com/",
        description: "Este cómic semanal explora las filosofías complejas a través del humor. Con viñetas que hacen reír y pensar, te desafía a cuestionar lo que crees saber.",
        quote: "Cuando la risa se vuelve un acto de rebeldía intelectual."
    },
    {
        category: "Blogs olvidados",
        title: "The Obsolete Weblog",
        url: "http://obsoleteweblog.blogspot.com/",
        description: "Un rincón nostálgico del internet que documenta tecnologías y tendencias que han quedado en el camino. Es un epitafio digital para lo que alguna vez fue la vanguardia.",
        quote: "Recordando lo que el tiempo y el progreso se llevaron."
    },
    {
        category: "Música experimental",
        title: "The 365 Days Project",
        url: "http://365project.org/",
        description: "Un archivo de música rara y experimental recolectada a lo largo de un año. Es un manantial de sonidos peculiares que desafía los límites de lo que llamamos música.",
        quote: "El sonido es el susurro del universo en nuestros oídos."
    },
    {
        category: "Filosofía digital",
        title: "Digital Philosophy",
        url: "https://www.digitalphilosophy.org/",
        description: "Un espacio donde se discuten las implicaciones filosóficas de la tecnología y el mundo digital. Es un foro de ideas para quienes cuestionan y reimaginan el futuro.",
        quote: "Pensar digitalmente es pensar en el entramado de nuestras realidades conectadas."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zombo Com",
        url: "http://www.zombo.com/",
        description: "Un sitio web minimalista que celebra la libertad de hacer cualquier cosa. Su mantra constante es que todo es posible en Zombo Com, un recordatorio de los inicios del internet surrealista.",
        quote: "The only limit is yourself."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Ben Wilson: El artista del chicle",
        url: "https://www.benwilsonchewinggumman.com/",
        description: "Ben Wilson transforma chicles desechados en auténticas obras de arte urbano. Estas miniaturas pintadas en las calles de Londres son un testimonio de cómo lo desechable puede convertirse en arte único.",
        quote: "Even the ground we walk on holds stories."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Telephant",
        url: "https://www.telephant.me/",
        description: "Un proyecto experimental que explora las conexiones humanas a través de llamadas telefónicas anónimas. Cada llamada es una ventana a una conversación inesperada, un puente temporal entre desconocidos.",
        quote: "Every conversation is an untold story waiting to unfold."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Dunkey's Big No-No",
        url: "https://bontegames.com/2015/05/dunkeys-big-no-no.html",
        description: "Un juego absurdo e incómodo donde tu misión es literalmente no hacer nada. La experiencia se convierte en una reflexión sobre el sentido de propósito en actividades aparentemente vacías.",
        quote: "Sometimes doing nothing is the greatest adventure."
    },
    {
        category: "Estéticas raras",
        title: "Art of Glitch",
        url: "https://www.artofglitch.com/",
        description: "Esta plataforma celebra los errores digitales y los convierte en arte. Cada glitch es una oportunidad de ver la belleza oculta en los fallos del sistema, transformando lo defectuoso en fascinante.",
        quote: "Imperfection is the new perfection."
    },
    {
        category: "Ideas provocadoras",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Una iniciativa que ofrece espacios virtuales para desconectarse y encontrar un momento de paz. En un mundo saturado de estímulos, esta página es un refugio para la mente.",
        quote: "In silence, the mind finds its true voice."
    },
    {
        category: "Blogs olvidados",
        title: "The Flaming Lips' Imaginary Blog",
        url: "http://flaminglipsimaginaryblog.blogspot.com/",
        description: "Un blog aparentemente olvidado de The Flaming Lips, repleto de ideas disparatadas, arte excéntrico y reflexiones poéticas. Un rincón digital que captura la esencia caótica de la banda.",
        quote: "Reality is a canvas for the imagination."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Ensemble's Performances",
        url: "http://quietensemble.com/",
        description: "Este colectivo italiano de artistas mezcla tecnología, naturaleza y música para crear performances donde lo cotidiano se transforma en arte sublime. Cada espectáculo es un ballet silencioso de lo inesperado.",
        quote: "In the ordinary, we find the extraordinary."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad de músicos que exploran el sonido y la composición experimental. Cada semana, un nuevo reto impulsa a los artistas a cruzar los límites de lo convencional.",
        quote: "Sound is the playground of the mind."
    },
    {
        category: "Filosofía digital",
        title: "Digital Philosophy",
        url: "https://digitalphilosophy.org/",
        description: "Una exploración filosófica del impacto del entorno digital en nuestra percepción de la realidad. Ofrece ensayos y reflexiones profundas sobre el cruce entre tecnología y existencialismo.",
        quote: "In bytes and pixels, we seek meaning beyond the virtual."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "https://zoomquilt.org/",
        description: "Un tapiz animado de imágenes que se hunden infinitamente en un mundo onírico. Explora un universo surrealista que parece no tener fin a medida que te sumerges en la pantalla.",
        quote: "En el mundo de los sueños, siempre hay más profundo a dónde ir."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Annie Rauwerda",
        url: "https://depthsofwikipedia.com/",
        description: "Una exploración de las páginas más inusuales y peculiares de Wikipedia. Annie Rauwerda curatea este espacio con un toque de humor e ingenio, mostrando el lado excéntrico del conocimiento humano.",
        quote: "En el caos de la información, hay una alegría inigualable en lo extraño."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Kill Screen",
        url: "https://killscreengames.com/",
        description: "Experiencias de juego que desafían las normas tradicionales, llevándote a espacios donde la lógica convencional no siempre aplica. Estos juegos empujan los límites de lo que se espera de la interactividad.",
        quote: "Jugar es descubrir nuevos mundos donde las reglas son solo sugerencias."
    },
    {
        category: "Experimentos sociales",
        title: "Unfamiliar Places",
        url: "https://unfamiliar.space/",
        description: "Un proyecto colaborativo que presenta historias y fotografías de lugares extraños y desconocidos de todo el mundo. Un llamado a la curiosidad y al asombro por lo que se encuentra más allá de nuestra vista cotidiana.",
        quote: "A veces, lo más extraordinario está oculto en lo ordinario."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Lociol Folios",
        url: "https://lociol.com/folios/",
        description: "Un archivo digital de pensamientos, imágenes y sonidos que ofrecen un vistazo al flujo de conciencia de su creador. Este proyecto invita al espectador a reflexionar sobre la conexión entre arte y pensamiento.",
        quote: "El arte no solo se mira, se escucha en el silencio de una mente en creación."
    },
    {
        category: "Música experimental",
        title: "Radiooooo",
        url: "https://radiooooo.com/",
        description: "Una máquina del tiempo musical que te permite explorar canciones de diferentes décadas y países. Esta radio interactiva ofrece una experiencia auditiva única, sorprendiendo con sonidos del pasado global.",
        quote: "Cada canción es un viaje a una era olvidada."
    },
    {
        category: "Filosofía digital",
        title: "The Society Pages",
        url: "https://thesocietypages.org/sociologylens/",
        description: "Un blog que reflexiona sobre la intersección de la tecnología, la cultura y la sociedad. Combina el pensamiento sociológico con un análisis crítico de la era digital.",
        quote: "La sociedad es un espejo pixelado, reflejando nuestras conexiones e inquietudes."
    },
    {
        category: "Estéticas raras",
        title: "Trash Palace",
        url: "https://trashpalace.com/",
        description: "Una celebración del 'trash aesthetic' en todas sus formas. Este sitio reúne arte, música y cultura que desafían la noción de la belleza tradicional, mostrando la vitalidad en lo que se considera 'basura'.",
        quote: "En lo desechado, encontramos el alma de la resistencia creativa."
    },
    {
        category: "Blogs olvidados",
        title: "The Distraction Society",
        url: "https://distractionsociety.wordpress.com/",
        description: "Un blog que ofrece pensamientos dispersos y ensayos breves sobre la distracción como fenómeno sociocultural. Aquí se celebra la desconexión intencional y la belleza de perderse.",
        quote: "A veces, perder el hilo es encontrar un nuevo camino."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Institute for New Feeling",
        url: "https://www.institutefornewfeeling.com/",
        description: "Un colectivo de artistas que diseñan nuevos tratamientos para el cuerpo y la mente, explorando las intersecciones de la tecnología y el bienestar en performances inmersivas e interactivas.",
        quote: "Sentir es el primer paso hacia nuevos horizontes mentales."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Falling Sand Game",
        url: "http://fallingsandgame.com/sand/",
        description: "Un sitio minimalista que permite jugar con elementos como arena, agua, fuego y sal para crear reacciones fascinantes y observar cómo interactúan en un mundo digital.",
        quote: "A veces, la belleza está en dejar que los elementos sigan su curso natural."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Carlos Garaicoa",
        url: "https://www.garaicoa.com/",
        description: "Carlos Garaicoa explora la arquitectura y el urbanismo como metáforas en sus instalaciones y obras gráficas, creando un puente entre lo imaginado y lo real.",
        quote: "Las ciudades son lienzos en constante transformación."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "ASMR Soprano",
        url: "https://www.asmrsoprano.com/",
        description: "Una soprano que combina la técnica vocal clásica con sonidos ASMR, creando una experiencia auditiva única y relajante que desafía los límites de la música tradicional.",
        quote: "El arte de susurrar puede ser tan poderoso como el de cantar."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Paunch",
        url: "https://paunch.com/",
        description: "Un juego multijugador donde los jugadores controlan a luchadores en ropa interior compitiendo en peleas absurdas y cómicamente brutales.",
        quote: "La seriedad nunca fue el fuerte de aquellos dispuestos a dejar caer sus pantalones."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Cyberdelia",
        url: "https://www.cyberdelia.com/",
        description: "Un mundo subterráneo de cyberpunk y estética retrofuturista que celebra la convergencia de tecnología y psicodelia a través de arte, música y literatura.",
        quote: "En el cruce de chips y trances, florece la cyberdelia."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Art Collective",
        url: "https://www.glitchartcollective.com/",
        description: "Artistas que se unen para celebrar el error visual y la estética glitch, transformando fallos digitales en arte visualmente impactante.",
        quote: "Encontramos belleza en lo que el mundo digital considera fallos."
    },
    {
        category: "Ideas provocadoras",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un rincón digital diseñado para ayudar a la gente a desconectarse y desestresarse, ofreciendo un espacio donde el silencio y la reflexión son los verdaderos protagonistas.",
        quote: "En el silencio, encontramos nuestra verdadera voz."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "http://postsecret.blogspot.com/",
        description: "Un blog donde personas de todo el mundo envían postales anónimas con sus secretos más íntimos, creando una colección conmovedora y a veces inquietante de confesiones humanas.",
        quote: "Todos tienen un secreto que contar; a veces solo necesitas la plataforma correcta."
    },
    {
        category: "Música experimental",
        title: "The Standing Wave Orchestra",
        url: "http://standingwaveorchestra.com/",
        description: "Un colectivo musical que utiliza ondas estacionarias generadas electrónicamente para crear composiciones únicas que desafían las normas musicales convencionales.",
        quote: "En las ondas, la música encuentra su forma más eterna."
    },
    {
        category: "Filosofía digital",
        title: "Digital Natives",
        url: "http://digital-natives.org/",
        description: "Un ensayo colectivo que examina cómo la generación de nativos digitales está redefiniendo identidad, privacidad y comunidad en un mundo cada vez más conectado.",
        quote: "Nacidos con un dispositivo en mano, creados para navegar lo digital y lo humano."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "http://zoomquilt.org/",
        description: "Un bucle visual interminable que te sumerge en un paisaje surrealista y cambiante. Es una obra colaborativa que desafía la percepción del infinito.",
        quote: "El viaje nunca termina, solo cambia de perspectiva."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Ellie Pritts",
        url: "http://elliepritts.com/",
        description: "Artista visual que mezcla la tecnología y el arte tradicional, creando piezas que vibran en un encantador glitch visual. Sus obras son un caleidoscopio de color y distorsión.",
        quote: "El caos puede ser el lienzo perfecto para la belleza."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "This Person Does Not Exist",
        url: "https://thispersondoesnotexist.com/",
        description: "Una página que genera rostros realistas utilizando inteligencia artificial, desafiando la noción de identidad y autenticidad en la era digital.",
        quote: "La realidad es un espejismo creado por algoritmos."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "NRAnt",
        url: "http://nra.nteract.io/",
        description: "Un juego interactivo donde controlas una colonia de hormigas a través de un terminal de comandos. Es un ejercicio de estrategia y paciencia en un mundo minimalista.",
        quote: "La microrregulación es el arte de pensar a lo grande."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Darknet Diaries",
        url: "https://darknetdiaries.com/",
        description: "Un podcast que explora historias del ciberespacio, desde hackers hasta violaciones de privacidad. Sumérgete en las sombras digitales del mundo.",
        quote: "En las sombras, la luz de la verdad brilla más."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Internet Archaeology",
        url: "https://internetarchaeology.org/",
        description: "Un sitio dedicado a preservar la estética y la cultura de la web antigua. Viaja al pasado de internet en un viaje nostálgico y visual.",
        quote: "El pasado digital es un museo del futuro."
    },
    {
        category: "Ideas provocadoras",
        title: "Unwritten",
        url: "http://www.unwritten.nyc/",
        description: "Un provocador proyecto que invita a personas a compartir los mensajes que no se atreven a enviar. Es un vistazo a la comunicación no expresada.",
        quote: "A veces, lo no dicho es lo que más merece ser escuchado."
    },
    {
        category: "Experimentos sociales",
        title: "The Quiet Place Project",
        url: "http://thequietplaceproject.com/",
        description: "Un refugio digital para escapar del ruido del mundo. Ofrece una experiencia interactiva que promueve la introspección y la calma.",
        quote: "El silencio es un lienzo donde la mente se dibuja a sí misma."
    },
    {
        category: "Música experimental",
        title: "Flood of Circle",
        url: "https://floodofcircle.com/",
        description: "Banda japonesa que fusiona el rock clásico con una estridente psicodelia moderna. Sus guitarras son un viaje a través de ondas sonoras inesperadas.",
        quote: "Donde el caos musical florece, allí reside la innovación."
    },
    {
        category: "Filosofía digital",
        title: "Philosophy Tube",
        url: "https://www.youtube.com/c/PhilosophyTube",
        description: "Un canal de YouTube que transforma la filosofía en un arte visual y accesible. Cada video es una reflexión profunda sobre sociedad, política y tecnología.",
        quote: "La filosofía es el código fuente de nuestros pensamientos."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "http://zoomquilt.org/",
        description: "Una experiencia visual hipnótica que te sumerge en un viaje interminable de imágenes que se entrelazan, creando un efecto de zoom infinito. Es una ventana a un universo que nunca deja de expandirse.",
        quote: "El viaje nunca termina, solo evoluciona en nuevas formas."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Molly Soda",
        url: "http://mollysoda.exposed/",
        description: "La artista digital Molly Soda explora la relación entre la feminidad, la cultura de internet y la identidad a través de gifs, videos y redes sociales. Combina nostalgia con crítica cultural en un collage digital.",
        quote: "Internet es el espejo donde se refleja nuestra sociedad coloreada."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Secret Door",
        url: "http://www.mapcrunch.com/",
        description: "Tras un clic, esta web te transporta a un rincón aleatorio del mundo a través de Google Street View, recordándonos que cada lugar tiene su propia historia esperando ser descubierta.",
        quote: "Cada puerta que abrimos es un nuevo mundo por explorar."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume",
        url: "http://nekogamestudio.com/atsume/",
        description: "Un juego encantador y sin pretensiones, donde los jugadores coleccionan gatos digitales simplemente colocando juguetes y comida en su jardín. Un tributo al deleite de lo simple y cotidiano.",
        quote: "La felicidad puede encontrarse en las cosas más simples, como un gato en tu jardín."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The Church of the SubGenius",
        url: "http://www.subgenius.com/",
        description: "Una parodia religiosa fundida con la cultura pop, esta organización satírica desafía las convenciones con humor absurdo, iconografía bizarra y una dogma de 'Slack'.",
        quote: "La verdad puede ser tan absurda como el más ridículo de los mitos."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Internet Archaeology",
        url: "http://www.internetarchaeology.org/",
        description: "Un proyecto dedicado a preservar y celebrar las estéticas web de los años 90, Internet Archaeology es un homenaje a los días de los sitios GeoCities y el HTML rudimentario.",
        quote: "Lo que una vez fue moderno, ahora es arqueología digital."
    },
    {
        category: "Ideas provocadoras",
        title: "PostSecret",
        url: "http://www.postsecret.com/",
        description: "Un proyecto comunitario que invita a las personas a enviar postales anónimamente revelando sus secretos más íntimos, creando un mosaico de experiencias humanas compartidas.",
        quote: "En cada secreto, una verdad compartida."
    },
    {
        category: "Blogs olvidados",
        title: "The Forgotten Language",
        url: "http://forgottenlanguages-full.forgottenlanguages.org/",
        description: "Un enigmático blog que mezcla lingüística, criptografía y teoría de conspiración, cautivando con su lenguaje propio y textos crípticos que parecen desafiar nuestra percepción de la realidad.",
        quote: "Lo olvidado siempre deja rastros para quien sabe mirar."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Telematic Dreaming",
        url: "http://www.palatank.com/tele-dream/",
        description: "Esta obra de arte de Paul Sermon conecta dos camas físicas en ubicaciones diferentes mediante videoconferencia, permitiendo a las personas interactuar y soñar juntas a través de mundos virtuales.",
        quote: "Sueños compartidos trascienden las fronteras físicas."
    },
    {
        category: "Música experimental",
        title: "People Like Us",
        url: "http://peoplelikeus.org/",
        description: "Un fascinante proyecto de collage sonoro que recontextualiza fragmentos de música y sonido para crear composiciones que son a la vez nostálgicas y radicalmente nuevas.",
        quote: "El pasado resuena en nuestras creaciones más nuevas."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoomquilt",
        url: "http://zoomquilt.org/",
        description: "Un lienzo infinito que te sumerge en un viaje hipnótico y sin fin a través de ilustraciones que se conectan sin solución de continuidad. Una experiencia visual única que desafía la percepción del espacio.",
        quote: "El arte de perderse en lo interminable."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Yoshitoshi Kanemaki",
        url: "https://twitter.com/ykanemaki",
        description: "Escultor japonés cuyas obras tallan en madera la esencia de duplicidad y paradojas humanas. Sus figuras poliédricas revelan la inquietante belleza de la multiplicidad y la incertidumbre.",
        quote: "Las caras ocultas del alma reveladas en madera."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "We Feel Fine",
        url: "http://www.wefeelfine.org/",
        description: "Un proyecto que captura y visualiza emociones humanas a partir de los blogs y redes sociales. Ofrece una experiencia interactiva que muestra el caleidoscopio de sentimientos dispersos por la web.",
        quote: "Las emociones flotan como datos en el éter digital."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume: Kitty Collector",
        url: "http://nekoatsume.com/",
        description: "Un juego para dispositivos móviles donde el objetivo es simple: atraer y coleccionar gatos. Sin grandes pretensiones, se convierte en una inesperada fuente de alegría felina y tranquilidad cotidiana.",
        quote: "La vida, a veces, solo requiere un poco de ternura felina."
    },
    {
        category: "Mundos "under", subculturas",
        title: "Sea-Punk",
        url: "https://knowyourmeme.com/memes/subcultures/seapunk",
        description: "Una subcultura digital que mezcla la estética oceánica con la cibercultura. Con tonos azulados y una mezcla de nostalgia noventera, busca crear una identidad en el mar de la era digital.",
        quote: "Las olas digitales del mar cibernético."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Art by Rosa Menkman",
        url: "https://rosa-menkman.blogspot.com/p/glitch-studies.html",
        description: "Artista pionera en el mundo del glitch art, Menkman explora la belleza en la ruptura digital, revelando cómo los errores y fallos pueden convertirse en un nuevo lenguaje visual.",
        quote: "Las imperfecciones son el pulso vivo del arte digital."
    },
    {
        category: "Ideas provocadoras",
        title: "A Softer World",
        url: "http://www.asofterworld.com/",
        description: "Una tira cómica fotográfica cargada de ironía y poesía oscura. Cada imagen acompaña textos cortos que desnudan la vida, el amor y la improbabilidad de la existencia con mordaz sinceridad.",
        quote: "A veces, la vida es un susurro en colores desvaídos."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "http://postsecret.com/",
        description: "Un blog invitando a personas de todo el mundo a compartir sus secretos anónimamente en postales decoradas. Una compasiva y humana colección de confesiones que iluminan la condición humana.",
        quote: "Entre líneas y sellos, los secretos encuentran voz."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Broken Relationships",
        url: "https://brokenships.com/",
        description: "Un museo dedicado a objetos personales que representan relaciones fallidas. Cada pieza cuenta una historia de amor y pérdida, recordándonos que todos compartimos la experiencia del desamor.",
        quote: "Las reliquias de amores pasados cuentan historias universales."
    },
    {
        category: "Música experimental",
        title: "Musical Mind Control",
        url: "https://soundcloud.com/musicalmindcontrol",
        description: "Un proyecto sonoro que explora el uso de ondas cerebrales y música para crear experiencias auditivas únicas. Un viaje que promete alterar la percepción y conectar con lo más profundo del ser.",
        quote: "Cuando el sonido se convierte en un puente al subconsciente."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "BingBongPage",
        url: "https://www.bingbongpage.com/",
        description: "Una puerta a la absoluta futilidad, esta página simula un universo de coloridos estallidos sin propósito. Es como si el internet decidiera hacerse una introspección y concluyera que solo quiere divertirse.",
        quote: "La belleza de la inutilidad: donde todo es nada y nada es todo."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Alicja Rogalska",
        url: "http://www.alicjarogalska.com/",
        description: "Artista multidisciplinaria que explora los límites de la sociedad a través de performances que invitan a la reflexión sobre lo normal y lo extraordinario. Sus trabajos son como espejos que distorsionan la realidad cotidiana para revelar lo invisible.",
        quote: "La realidad está siempre sujeto a negociación."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Fortune Cookie Generator",
        url: "http://www.fortunecookiemessage.com/",
        description: "Un generador que te ofrece inacabables dosis de mini profecías y sugerencias de autoayuda absurdas. Como si las galletas de la suerte decidieran rebelarse de su monotonía y optaran por el camino del surrealismo.",
        quote: "El futuro es como una galleta: crujiente e indescifrable."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "DON'T EAT PETS",
        url: "https://dont-eat-pets.itch.io/dont-eat-pets",
        description: "Un juego donde la moralidad se invierte y la supervivencia depende de decisiones absurdas y dilemas éticos bizarros. Un comentario hilarante sobre el comportamiento humano, en un mundo donde la lógica no tiene lugar.",
        quote: "En el caos del orden, los dilemas éticos se vuelven un banquete."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The Old School Revival Blog",
        url: "https://theosr.blogspot.com/",
        description: "Un blog dedicado al resurgimiento de los juegos de rol al estilo de los años 70 y 80, donde los límites de la imaginación son las únicas reglas. Un refugio para aquellos que buscan experiencias narrativas crudas y sin filtros.",
        quote: "La imaginación es el único dado que necesitas."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Artist Collective",
        url: "https://www.glitchartistcollective.com/",
        description: "Un colectivo dedicado a explorar los errores digitales como arte, revelando la accidental belleza oculta en el caos tecnológico. Aquí, los fallos son celebrados como portales a un nuevo tipo de estética.",
        quote: "El arte se encuentra en la imperfección de la máquina."
    },
    {
        category: "Ideas provocadoras",
        title: "The Museum of Conceptual Art",
        url: "https://www.museumofconceptualart.com/",
        description: "Un espacio virtual donde las ideas desafían a las formas tradicionales de arte, proponiendo conceptos que, aunque intangibles, impactan profundamente al espectador. Es un juego mental donde cada visita redefine lo que significa el arte.",
        quote: "La idea es el arte final."
    },
    {
        category: "Blogs olvidados",
        title: "The Temple of the Exploding Head",
        url: "http://templeofexplodinghead.blogspot.com/",
        description: "Un blog que, cual cápsula del tiempo, captura la esencia de la internet pasada, con ensayos que van desde lo sublime hasta lo ridículo. Un recordatorio de la era dorada de los blogs, donde las explosiones mentales eran moneda corriente.",
        quote: "Explosiones mentales: el arte de pensar fuera de la caja."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Institute for New Feeling",
        url: "http://www.institutefornewfeeling.com/",
        description: "Un colectivo de artistas que ofrece tratamientos imaginarios para los malestares contemporáneos, subvirtiendo las expectativas de sanación con poesía y humor. Sus 'remedios' nos invitan a cuestionar la manera en que percibimos el bienestar.",
        quote: "La cura es una sensación en constante cambio."
    },
    {
        category: "Música experimental",
        title: "The Quietus Mixes",
        url: "https://thequietus.com/sections/mix",
        description: "Una colección de mixtapes que desafía los géneros musicales, explorando nuevos territorios sónicos y ofreciendo una experiencia auditiva que es tanto un reto como un deleite. Aquí, la música se convierte en un paisaje a explorar.",
        quote: "El sonido es un universo sin fronteras."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "http://zoomquilt.org/",
        description: "Una web que te invita a un viaje visual interminable a través de una obra de arte que se expande constantemente. Cada cuadro te absorbe en un horizonte hipnótico.",
        quote: "En el infinito, siempre hay espacio para un poco más de maravilla."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Lena Gieseke",
        url: "http://lenagieseke.com/",
        description: "Artista digital que reimagina el mundo de manera tridimensional, explorando la intersección entre el arte tradicional y la tecnología moderna. Su trabajo es un enigma para los sentidos.",
        quote: "Dibujar en tres dimensiones es escribir en el aire."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "You Are Listening To",
        url: "http://youarelistening.to/",
        description: "Esta web mezcla transmisiones de radio policial con paisajes sonoros ambientales, creando una banda sonora envolvente que te sumerge en el pulso de la ciudad.",
        quote: "Las ciudades, como los sueños, están construidas de deseos y miedos."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Sandspiel",
        url: "https://sandspiel.club/",
        description: "Un juego de simulación de física de arena donde puedes crear y destruir mundos, todo en un espacio pixelado y satisfactorio. Ideal para perderse en la hora de la nada.",
        quote: "La creación es un acto de pura libertad."
    },
    {
        category: "Mundos under, subculturas",
        title: "We Make Money Not Art",
        url: "https://we-make-money-not-art.com/",
        description: "Un blog dedicado a explorar el arte contemporáneo más raro e impactante. Un rincón donde se encuentran tecnología, política y expresión artística de lo no convencional.",
        quote: "El arte no es un espejo para reflejar el mundo, sino un martillo para forjarlo."
    },
    {
        category: "Estéticas raras",
        title: "GLTI.CH Karaoke",
        url: "http://www.gltchkrk.com/",
        description: "GLTI.CH Karaoke es una experiencia visual donde las lyrics de karaoke se mezclan con estética glitch, creando un espectáculo distorsionado y colorido.",
        quote: "Las imperfecciones son lo que dan sabor a la vida."
    },
    {
        category: "Ideas provocadoras",
        title: "The Museum of Everything",
        url: "http://www.musevery.com/",
        description: "Un museo que celebra el arte de los invisibles: los autodidactas, los anónimos, los marginales. Un homenaje a la creatividad sin filtros ni reglas.",
        quote: "En lo que no se ve, reside una belleza inexplorada."
    },
    {
        category: "Blogs olvidados",
        title: "The Ghost in the Machine",
        url: "http://ghostinthemachine.net/",
        description: "Un blog dedicado a lo extraño y lo inexplicable, donde la cultura pop se encuentra con la filosofía oscura y las rarezas de la vida cotidiana.",
        quote: "En cada rincón oscuro, hay un misterio esperando a ser descubierto."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "http://thequietvolume.com/",
        description: "Un experimento de teatro invisible que tiene lugar en bibliotecas y otros espacios silenciosos, guiado por auriculares. Una coreografía de palabras y susurros.",
        quote: "En el silencio, la palabra toma su forma más pura."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad de músicos experimentales que exploran el potencial de lo digital y lo acústico. Cada proyecto es una conversación sónica con lo desconocido.",
        quote: "La música es el arte de pensar con sonidos."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Un sitio web hipnótico donde una curiosa criatura es detonada en efectos vibrantes y rítmicos con cada movimiento del cursor. La simplicidad del sitio es su encanto.",
        quote: "A veces, lo sencillo es lo más sublime."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Enigmatic Sculptures of Sophie Lygon",
        url: "https://sophielygon.art",
        description: "Sophie Lygon, una escultora que trabaja con materiales encontrados, crea piezas que parecen relictos de un mundo alternativo. Sus obras invitan a la contemplación de las narrativas no contadas de objetos ordinarios.",
        quote: "El arte nace en la intersección de lo olvidado y lo redescubierto."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Deep Time Walk",
        url: "https://www.deeptimewalk.org/",
        description: "Este proyecto invita a los participantes a caminar 4.6 kilómetros para experimentar la historia completa de la Tierra: cada metro recorrido representa un millón de años. Una mezcla única de aplicación móvil y exploración al aire libre.",
        quote: "Camina para comprender la eternidad."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Nonsense Dance Machine",
        url: "https://nonsensedancemachine.com/",
        description: "Un juego en línea donde puedes crear baile de personajes absurdos al ritmo de música electrónica aleatoria. La interacción es tan impredecible como divertida.",
        quote: "Bailar es solo un pretexto para el caos organizado."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Letterboxing Community",
        url: "http://www.letterboxing.org/",
        description: "Una subcultura de búsqueda de tesoros secreta que combina el arte y la aventura. Los participantes crean cajas ocultas en espacios públicos, compartiendo pistas para encontrarlas.",
        quote: "El tesoro no es el hallazgo, sino el camino recorrido."
    },
    {
        category: "Estéticas raras",
        title: "Trash Wave Aesthetic",
        url: "https://trash-wave.tumblr.com/",
        description: "Una colección de imágenes y memes que representan la estética del 'Trash Wave', un collage visual de la decadencia digital y el exceso de los años 90.",
        quote: "En la basura hay belleza si sabes dónde mirar."
    },
    {
        category: "Ideas provocadoras",
        title: "The Anti-Museum",
        url: "http://www.anti-museum.com/",
        description: "Un proyecto que desafía la noción de los museos como guardianes del arte. Presenta arte que no puede capturarse, objetos efímeros y performances que cuestionan la permanencia.",
        quote: "El arte es como el viento, sólo se siente pero nunca se posee."
    },
    {
        category: "Blogs olvidados",
        title: "The Ghost in the Machine",
        url: "https://ghostinthemachine.wordpress.com/",
        description: "Un blog que explora relatos de encuentros con la tecnología y lo paranormal, mezclando anécdotas personales con teoría filosófica.",
        quote: "Hay espíritus escondidos en cada línea de código."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Invisible Art Exhibit",
        url: "https://www.invisibleartmuseum.com/",
        description: "Una exhibición curada de obras de arte 'invisibles', donde la imaginación del espectador es el lienzo y la narrativa es libre. Un desafío a la percepción tradicional del arte.",
        quote: "Lo que no se ve puede ser lo más revelador."
    },
    {
        category: "Música experimental",
        title: "Infinite Drone Radio",
        url: "http://www.infinitedroneradio.com/",
        description: "Una web que transmite drones musicales experimentales ininterrumpidamente. Su atmósfera envolvente es un escape hacia paisajes sonoros interminables.",
        quote: "El silencio también tiene melodía, sólo hay que saber escucharla."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoomquilt",
        url: "https://zoomquilt.org/",
        description: "Un tortuoso viaje visual que te sumerge en un continuo interminable de imágenes surrealistas que se conectan en un asombroso bucle sin fin.",
        quote: "¿Dónde termina el sueño y comienza la realidad?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "James Castle",
        url: "https://jamescastle.com/",
        description: "Descubre el mundo de James Castle, un artista autodidacta que creó universos de papel y cartón en un lenguaje visual propio, a pesar de ser sordo y mudo.",
        quote: "Habla el silencio con formas y sombras."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Eternal Echo",
        url: "https://eternalecho.org/",
        description: "Una experiencia auditiva interactiva que transforma sonidos cotidianos en ecos musicales infinitos y meditativos, creando ritmos que desafían la percepción del tiempo.",
        quote: "El sonido es el viaje que nunca termina."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Burrito Galaxy",
        url: "https://burritogalaxy.com/",
        description: "Un juego de rol surrealista que mezcla la estética vaporwave con mecánicas absurdas y narrativas delirantes, donde la lógica es tanto el enemigo como el aliado.",
        quote: "Desertiza tu mente, explora la galaxia burrito."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The Weird Christian Twitter",
        url: "https://twitter.com/hashtag/WeirdChristianTwitter",
        description: "Sumérgete en un rincón singular de Twitter donde la teología se mezcla con memes absurdos y reflexiones profundas, desdibujando las líneas entre fe y humor.",
        quote: "La divinidad no es siempre solemne."
    },
    {
        category: "Estéticas raras",
        title: "Data Erasure",
        url: "https://dataerase.com/",
        description: "Explora un espacio digital donde el arte glitch celebra la belleza del error, la corrupción de datos y la estética de lo incompleto.",
        quote: "La imperfección es el nuevo perfecto."
    },
    {
        category: "Ideas provocadoras",
        title: "The Society of the Spectacle",
        url: "https://www.marxists.org/reference/archive/debord/society.htm",
        description: "Un texto esencial de Guy Debord sobre la crítica de la sociedad contemporánea, reflexionando sobre cómo la vida se ha convertido en una representación espectacular.",
        quote: "La representación ha usurpado la realidad."
    },
    {
        category: "Blogs olvidados",
        title: "The Grumpy Old Twentysomething",
        url: "http://grumpyoldtwentysomething.blogspot.com/",
        description: "Un blog sarcástico y olvidado que, con humor ácido, ilustra las luchas existenciales de ser adulto en una década incierta.",
        quote: "La ironía es el bálsamo de una generación confundida."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "https://anthampton.com/thequietvolume/",
        description: "Una obra de teatro íntima y silenciosa que se desarrolla en una biblioteca, donde los participantes son guiados en un viaje de susurros y páginas.",
        quote: "Escuchar es leer con oídos atentos."
    },
    {
        category: "Música experimental",
        title: "The Disquiet Junto",
        url: "https://disquiet.com/junto/",
        description: "Una comunidad de música experimental que desafía a los compositores a crear piezas conceptuales basadas en desafíos semanales, explorando el sonido de maneras innovadoras.",
        quote: "La música es el arte de transformar el aire."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://staggeringbeauty.com/",
        description: "Una serpiente negra ondulante que reacciona de manera caótica y psicodélica cuando mueves tu mouse de forma rápida. Inútil, pero hipnótico.",
        quote: "A veces, el caos es la mejor forma de belleza."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "The Art of Lin Onus",
        url: "https://www.artgallery.nsw.gov.au/collection/artists/onus-lin/",
        description: "Lin Onus fue un artista aborigen australiano cuyo trabajo desafía las convenciones del arte indígena y combina elementos surrealistas con iconografía cultural.",
        quote: "El arte es un puente entre mundos, visibles e invisibles."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Solar Protocol",
        url: "https://solarprotocol.net/",
        description: "Un servidor web experimental que funciona con energía solar, rediseñando nuestra relación con la energía y la tecnología. Cuando el sol no brilla, el servidor descansa.",
        quote: "La naturaleza dicta el ritmo, nosotros lo seguimos."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "NAYA's Realm",
        url: "https://nayarealm.tumblr.com/",
        description: "Un viaje experimental en un universo visual interactivo. Pierde el sentido del tiempo mientras exploras sus formas impredecibles.",
        quote: "La exploración es un juego donde las reglas se escriben en cada paso."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "El Mundo de los ARGs",
        url: "https://forums.unfiction.com/forums/",
        description: "Sumérgete en los ARGs (Alternate Reality Games) donde la comunidad global se reúne para jugar, desconcertar y crear mundos alternativos.",
        quote: "La realidad tiene más capas de las que el ojo puede ver."
    },
    {
        category: "Estéticas raras",
        title: "Glitch Artists Collective",
        url: "https://www.facebook.com/groups/626626184057327/",
        description: "Un colectivo vibrante que celebra la estética del error en el arte digital. Aquí, la imperfección es una forma de arte.",
        quote: "El error también es un lenguaje, uno que revela lo oculto."
    },
    {
        category: "Ideas provocadoras",
        title: "Privacidad vs. Transparencia",
        url: "https://shmoocon.org/",
        description: "Conferencia que reúne a hackers, tecnólogos y pensadores alrededor del mundo para discutir y empujar los límites de la privacidad y la transparencia digital.",
        quote: "Lo que escondemos revela quiénes creemos ser."
    },
    {
        category: "Blogs olvidados",
        title: "The Stone - NY Times",
        url: "https://archive.nytimes.com/opinionator.blogs.nytimes.com/category/the-stone/",
        description: "Un espacio casi olvidado que albergaba artículos de filosofía discutidos por voces contemporáneas. Reflexiones profundas sobre la vida, el arte y la humanidad.",
        quote: "El pensamiento es un arte en sí mismo, uno que nunca deja de evolucionar."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Swarm",
        url: "https://www.thesunshinefactory.co.uk/the-swarm/",
        description: "Una performance interactiva donde una multitud de drones coreografiados bailan, reflejando la danza de la humanidad en su búsqueda de conexión.",
        quote: "Bailamos todos, aunque nuestras alas sean invisibles."
    },
    {
        category: "Música experimental",
        title: "Hyperdub",
        url: "https://www.hyperdub.net/",
        description: "Sello discográfico que desafía los límites de la música electrónica, explorando ritmos que desarman al oyente. Cada sonido es una nueva dimensión por descubrir.",
        quote: "El sonido es un mapa hacia lo desconocido."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "ZoomQuilt",
        url: "http://zoomquilt.org/",
        description: "Una hipnótica obra de arte multimedia que te lleva en un viaje interminable a través de un mundo de ensueños y pesadillas, pintado por varios artistas. Cada clic te sumerge más y más en su profundidad infinita.",
        quote: "¿Qué tan profundo puede sumergirse tu imaginación?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Heather Dewey-Hagborg",
        url: "http://deweyhagborg.com/",
        description: "Artista transdisciplinaria que explora la privacidad genética. Con su proyecto 'Stranger Visions', crea retratos 3D de personas a partir del ADN dejado en chicles y cabellos encontrados en la ciudad.",
        quote: "Tu identidad flota en fragmentos invisibles."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "We Feel Fine",
        url: "http://wefeelfine.org/",
        description: "Un fascinante proyecto que capta las emociones humanas globales mediante el análisis de blogs. Una cartografía de sentimientos que bulle con la fluctuante latencia del sentir humano.",
        quote: "La suma de nuestras emociones es el pulso del mundo."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Deep Sea",
        url: "http://www.roarinpenguin.com/?p=266",
        description: "Un juego de audio inmersivo sobre la claustrofobia y el miedo. Se navega un oscuro océano solo con sonidos, en la penumbra completa, poniendo a prueba tus sentidos.",
        quote: "A veces, el verdadero terror es no saber qué te rodea."
    },
    {
        category: "Mundos "under", subculturas",
        title: "The Art of Nothing",
        url: "https://theartofnothingpoetry.tumblr.com/",
        description: "Un rincón de la web donde la poesía dadaísta y la cultura DIY se encuentran. Un blog poético que celebra la belleza de lo vacío, lo aleatorio y lo realmente subversivo.",
        quote: "En el vacío, encontramos significado."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Rhizome",
        url: "https://rhizome.org/",
        description: "Un archivo y comunidad de arte digital que promueve el net.art y la cultura de los memes. Los artistas exploran las intersecciones entre tecnología y arte en formas inesperadas.",
        quote: "La creatividad florece en la red de lo inesperado."
    },
    {
        category: "Ideas provocadoras",
        title: "Impermanence",
        url: "http://www.impermanence.co.uk/",
        description: "Un proyecto artístico que cuestiona la permanencia a través de compromisos teatrales y artísticos efímeros, alentando a abrazar el cambio y la transitoriedad.",
        quote: "Todo lo que comienza debe terminar — y así está bien."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "http://postsecret.com/",
        description: "Un blog comunitario donde las personas envían secretos anónimos en forma de postales artísticas. Un archivo emocional de confesiones privadas que revelan lo humano detrás de lo cotidiano.",
        quote: "El secreto es el lazo que nos une en la distancia."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Silent Disco",
        url: "http://silentdisco.com/",
        description: "Una experiencia musical colectiva donde el público baila con auriculares, creando una fiesta visualmente silenciosa pero íntimamente estruendosa, retando la percepción del espacio compartido.",
        quote: "El silencio creado por unos es el ruido perfecto para otros."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/2012/01/25/disquiet-junto/",
        description: "Un colectivo musical en línea que propone desafíos semanales para crear piezas sonoras experimentales, promoviendo la colaboración y la innovación sin fronteras.",
        quote: "La música comienza donde las palabras terminan."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Nyan Cat Progress Bar",
        url: "http://www.nyan.cat/",
        description: "Una interpretación digital del infame Nyan Cat, pero aquí, la barra de progreso se convierte en un espectáculo interminable de arcoíris y música hilarante que desafía la utilidad misma de la web.",
        quote: "Porque a veces, la espera merece un desfile de dulces, gatos voladores."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Art Brut Project",
        url: "https://artbrut.ch/en_GB/home",
        description: "El Art Brut Project se sumerge en el mundo del arte marginal, exhibiendo obras de creadores autodidactas que desafían las normativas convencionales del arte con sus expresiones puras y a menudo oscuras.",
        quote: "En el arte marginal, las reglas no aplican; sólo el alma."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Useless Machines",
        url: "http://uselessmachines.co.uk/",
        description: "Estas máquinas no tienen propósito, pero en su absurdo, desafían la lógica y nos hacen cuestionar el valor mismo de la utilidad en la era moderna.",
        quote: "La inutilidad como arte es un abrazo del caos cotidiano."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "It's Literally Just Mowing",
        url: "http://www.itsliterallyjustmowing.com/",
        description: "Un juego donde simplemente cortas césped. Es tan absurdo y zen como parece, llevando la simplicidad a un nuevo nivel de satisfacción digital.",
        quote: "A veces, todas las respuestas están en la hierba."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The Zine Scene",
        url: "https://zinelibrary.info/",
        description: "Un archivo digital que celebra la cultura de los fanzines, ofreciendo un espacio para voces independientes y subversivas que narran historias y manifiestos fuera del radar.",
        quote: "En cada pliegue de papel, una resistencia en miniatura."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "GL1TCH",
        url: "http://www.glitchart.com/",
        description: "Un refugio digital para amantes del arte glitch, donde el caos visual se transforma en belleza inesperada, y cada error es una oportunidad estética.",
        quote: "Encontrando perfección en la imperfección digital."
    },
    {
        category: "Ideas provocadoras",
        title: "The Death Clock",
        url: "https://www.death-clock.org/",
        description: "Un sitio espeluznante que analiza tu mortalidad estimada, invitando a una reflexión sobre la vida y la inevitabilidad del paso del tiempo.",
        quote: "Contempla la muerte, vive más intensamente."
    },
    {
        category: "Blogs olvidados",
        title: "The Rusty Wire",
        url: "http://rustywire.blogspot.com/",
        description: "Un blog olvidado que cuenta historias de carreteras secundarias, encuentros peculiares y reflexiones sobre el paso del tiempo en un mundo de hierro oxidado.",
        quote: "Cada óxido es una historia que espera ser contada."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Non-visible Art",
        url: "https://www.nonvisiblemuseum.com/",
        description: "Un museo en línea donde las obras de arte no son visibles, desafiando las percepciones de qué es arte y cómo lo experimentamos.",
        quote: "Ver no siempre es creer; el arte vive en el pensamiento."
    },
    {
        category: "Música experimental",
        title: "The Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad dedicada a la música experimental, donde compositores y músicos comparten proyectos que desafían las convenciones musicales y abrazan la innovación sonora.",
        quote: "El sonido es la frontera final de la imaginación desbocada."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Bored Button",
        url: "https://www.boredbutton.com/",
        description: "Un sitio donde puedes presionar un botón rojo y ser llevado a una serie de páginas web aleatorias y extrañas. Es como un juego de ruleta rusa digital para los curiosos de la red.",
        quote: "El aburrimiento es el lienzo donde se pinta la creatividad."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Syclla Mundi",
        url: "https://www.scyllamundi.com/",
        description: "Un artista que explora las profundidades del surrealismo digital y el glitch. Sus obras ofrecen un vistazo a un universo paralelo donde lo distorsionado es la norma.",
        quote: "En el caos, hallamos la belleza de la imperfección."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Share the Air",
        url: "http://www.sharetheair.net/",
        description: "Este sitio invita a los usuarios a compartir y respirar el mismo aire virtual, un experimento extraño que conecta a la gente en una atmósfera intangible.",
        quote: "Respira profundo, y sentirás el aliento del mundo."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Gravity Points",
        url: "https://erikfantasia.com/gravity/",
        description: "Un juego interactivo donde puedes crear burbujas de gravedad que atraen y repelen partículas coloridas, formando patrones hipnóticos. Sin objetivos claros, incita a la meditación visual.",
        quote: "Déjate atraer por la gravedad de tus propios pensamientos."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Cyberpunk Forums",
        url: "https://www.cyberpunkforums.com/",
        description: "Un foro para los amantes de la estética y filosofía cyberpunk, donde se discuten temas que van desde la tecnología de vanguardia hasta las utopías distópicas del futuro.",
        quote: "En un mundo controlado por la tecnología, la rebelión es digital."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Artists Collective",
        url: "https://www.facebook.com/groups/GlitchArtistsCollective/",
        description: "Un colectivo de artistas que comparten obras innovadoras en glitch art, empujando los límites de la estética digital por medio de distorsiones visuales intencionadas.",
        quote: "La perfección se descompone en cada pixel roto."
    },
    {
        category: "Ideas provocadoras",
        title: "Death Clock",
        url: "http://deathclock.com/",
        description: "Un sitio que calcula una fecha estimada de tu muerte, provocando un tipo peculiar de reflexión sobre la vida y el tiempo. Es un recordatorio inusual de nuestra mortalidad.",
        quote: "El reloj de la vida nunca deja de marcar, incluso cuando olvidamos mirar."
    },
    {
        category: "Blogs olvidados",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un blog donde la gente envía postales anónimas que revelan sus secretos más profundos. Una ventana conmovedora a las almas humanas a menudo ocultas.",
        quote: "En el anonimato, encontramos la verdad sin filtro."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Museum of Nonvisible Art",
        url: "https://www.kickstarter.com/projects/praxis/museum-of-non-visible-art",
        description: "Una exposición de arte que no puedes ver porque todas las obras son invisibles. Es un desafío a la percepción tradicional del arte y su valor.",
        quote: "El arte no visible existe en la mente del que lo percibe."
    },
    {
        category: "Música experimental",
        title: "Liquid Audio",
        url: "https://lqdn.bandcamp.com/",
        description: "Música que transforma sonidos cotidianos en paisajes sonoros oníricos. Una exploración auditiva que desafía lo conocido y nos sumerge en lo surrealista.",
        quote: "Deja que tus oídos naveguen por mares de sonido."
    },
    {
        category: "webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Una experiencia web inusual donde solo controlas un gusano negro con el cursor. El arte de lo absurdo cobra vida cuando todo se descontrola si lo mueves demasiado rápido.",
        quote: "A veces, perder el control revela lo más bello."
    },
    {
        category: "artistas desconocidos o marginales",
        title: "The Art of Molly Crabapple",
        url: "https://www.mollycrabapple.com/",
        description: "Molly Crabapple, una artista y periodista visual, fusiona arte y activismo. Su trabajo aborda con crudeza temas sociales y políticos, explorando a menudo el borde de lo aceptable.",
        quote: "El arte debe ser una daga en el corazón del poder."
    },
    {
        category: "proyectos raros y experimentales",
        title: "Star Simulator",
        url: "http://stars.chromeexperiments.com/",
        description: "Explora un universo en miniatura interactivo que simula millones de estrellas. Un proyecto de Google Chrome Experiments que invita a perderse en la infinitud del cosmos digital.",
        quote: "En el silencio del espacio, cada estrella tiene un secreto."
    },
    {
        category: "juegos absurdos o interactivos",
        title: "Totally Accurate Battle Simulator",
        url: "https://landfall.se/totally-accurate-battle-simulator",
        description: "Un juego que parodia los simuladores de batalla con física caótica y personajes que desafían la lógica. La estrategia se convierte en comedia inesperada.",
        quote: "La guerra es caos, y en ese caos, hay humor."
    },
    {
        category: "mundos 'under', subculturas",
        title: "Hikikomori, Japan's Modern-Day Hermits",
        url: "https://www.dailymotion.com/video/x5x1fzc",
        description: "Una mirada íntima a la subcultura japonesa de los hikikomori, jóvenes que eligen el aislamiento extremo. Un fenómeno que revela las tensiones de la modernidad.",
        quote: "A veces, el refugio es una elección en un mundo ruidoso."
    },
    {
        category: "estéticas raras (net.art, glitch, vaporwave)",
        title: "Cybernetic Spree",
        url: "https://cybernetic-spree.tumblr.com/",
        description: "Un blog de Tumblr que celebra el arte cyberpunk y las estéticas retrofuturistas. Un collage visual donde el pasado y el futuro chocan en un estallido de neón.",
        quote: "El futuro es solo un eco del pasado con más color."
    },
    {
        category: "ideas provocadoras",
        title: "Post-Internet Art",
        url: "https://www.postinternet.art/",
        description: "Un portal dedicado al arte que no solo utiliza internet como medio, sino que se inspira en su omnipresencia. Un cuestionamiento del arte en la era digital.",
        quote: "Cuando el arte respira bits, ¿qué es real?"
    },
    {
        category: "blogs olvidados",
        title: "The Invisible Library",
        url: "https://invisiblelibrary.wordpress.com/",
        description: "Un blog que compila libros ficticios mencionados en obras literarias reales. Un archivo imaginario que enciende el deseo de lo inexistente.",
        quote: "Los mejores libros son los que nunca se escribieron."
    },
    {
        category: "performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "http://www.thequietvolume.com/",
        description: "Una performance participativa en bibliotecas que explora la naturaleza íntima de la lectura. A través de auriculares, los participantes son guiados en un viaje casi meditativo.",
        quote: "En el silencio de las palabras, el mundo se revela."
    },
    {
        category: "música experimental",
        title: "The Caretaker",
        url: "https://thecaretaker.bandcamp.com/",
        description: "Un proyecto musical que evoca la nostalgia y el deterioro mental a través de samples distorsionados de música de salón. Una exploración sonora de la memoria y el olvido.",
        quote: "En cada eco, una historia que se desvanece."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "The Mystery of the Haunted Keyboard",
        url: "http://www.staggeringbeauty.com/",
        description: "Una página donde puedes mover el mouse para ver cómo una figura serpenteante cobra vida en la pantalla. La simplicidad se encuentra con el surrealismo en este rincón olvidado de la web.",
        quote: "¿Es un movimiento o solo una ilusión que baila ante tus ojos?"
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jenny Hval: Sonidos del Inconsciente",
        url: "https://jennyhval.com/",
        description: "Con una mezcla de sonidos abstractos y letras poéticas, Jenny Hval desafía los límites de la música convencional. Su obra es un viaje auditivo hacia lo sublime.",
        quote: "La música es el espacio donde el silencio se atreve a hablar."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Infinite Conversation",
        url: "https://infiniteconversation.com/",
        description: "Un experimento que utiliza inteligencia artificial para generar interminables diálogos entre los filósofos Slavoj Žižek y Michel Foucault. Es una charla interminable que desafía el tiempo.",
        quote: "En la repetición, encontramos lo eterno."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Burrito Bison: Revenge",
        url: "https://www.kongregate.com/games/juicybeast/burrito-bison-revenge",
        description: "Un juego donde la gravedad pierde sentido y los burritos vuelan. Prepárate para rebotar en un mundo donde la lógica no es bienvenida.",
        quote: "A veces hay que dar un salto de fe, incluso si eres un burrito."
    },
    {
        category: "Subculturas",
        title: "Biopunk: El Nuevo Renacimiento Genético",
        url: "https://www.biopunkfiction.com/",
        description: "Una comunidad en línea dedicada a la intersección entre la biotecnología y el ciberpunk. Aquí encontramos historias que exploran el futuro de la evolución impulsada por la tecnología.",
        quote: "En el ADN del mañana, escribimos las historias del presente."
    },
    {
        category: "Estéticas raras",
        title: "Glitch Art Collective",
        url: "https://www.glitchartistscollective.org/",
        description: "Un hogar en línea para artistas que ven la belleza en lo fragmentado y roto. Glitch Artists Collective reúne obras que celebran la estética de lo imperfecto.",
        quote: "La verdad está en las fallas que revelamos."
    },
    {
        category: "Ideas provocadoras",
        title: "Uncovering Future Crimes",
        url: "https://futurecrimes.org/",
        description: "Un sitio que explora las ramificaciones de futuros crímenes en el ciberespacio. Cada artículo es una exploración de lo que podría ser si nuestras pesadillas digitales se hicieran realidad.",
        quote: "En las sombras del mañana, se escriben los códigos del miedo."
    },
    {
        category: "Blogs olvidados",
        title: "Letters from Utopia",
        url: "http://lettersfromutopia.tumblr.com/",
        description: "Un blog que recopila cartas anónimas de personas que imaginan sus vidas en utopías personales. Un collage de sueños y aspiraciones.",
        quote: "La utopía vive en las palabras que aún no hemos escrito."
    },
    {
        category: "Performances raras",
        title: "Act of Resistance",
        url: "http://www.acts-of-resistance.com/",
        description: "Una serie de performances que exploran la resistencia como arte. Aquí, el cuerpo se convierte en un lienzo convertido en símbolo de lucha.",
        quote: "El arte nunca es mudo; siempre resiste."
    },
    {
        category: "Música experimental",
        title: "Sounds from the Abyss",
        url: "https://soundsfromtheabyss.bandcamp.com/",
        description: "Una colección de sonidos oscuros y ambientales que evocan los misterios del océano profundo. Es una invitación a perderse en el sonido del abismo.",
        quote: "Escucha atentamente; los secretos más profundos no siempre gritan."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Bored Button",
        url: "https://www.boredbutton.com/",
        description: "Un botón rojo que promete aliviar el aburrimiento con cada clic, llevándote a un sitio web al azar que es tan inútil como sorprendente.",
        quote: "Clic por clic, el aburrimiento se va desvaneciendo."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jon Rafman",
        url: "https://jonrafman.com/",
        description: "Artista canadiense conocido por sus exploraciones del impacto de la tecnología en la vida contemporánea, usando capturas de pantalla de Google Street View para revelar fragmentos inesperados de belleza y extrañeza.",
        quote: "La realidad filtrada a través del lente digital es más rara de lo que la ficción podría concebir."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "We Feel Fine",
        url: "http://www.wefeelfine.org/",
        description: "Un experimento social que rastrea los sentimientos humanos a través de las publicaciones en blogs, presentándolos como puntos interactivos y coloridos en un mapa emocional global.",
        quote: "En la vasta marea de datos, cada emoción es un latido en la sinfonía humana."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Neko Atsume",
        url: "http://www.nekoatsume.com/ja/",
        description: "Un juego de recolección de gatos donde la recompensa es pura ternura y no hay otro objetivo más que ver cómo adorables gatitos toman posesión de tu jardín virtual.",
        quote: "En la simplicidad yace la encantadora magia de la indolencia felina."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The SCP Foundation",
        url: "http://www.scpwiki.com/",
        description: "Un misterioso proyecto colaborativo que documenta objetos y criaturas paranormales, creado por una comunidad de escritores que exploran los límites de la ficción y el horror.",
        quote: "¿Qué secretos ocultan los rincones más oscuros de nuestra imaginación colectiva?"
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Net Art Anthology",
        url: "https://anthology.rhizome.org/",
        description: "Una colección curada de arte digital desde los inicios de internet, que destaca obras que han definido la estética y la cultura en línea.",
        quote: "La frontera digital es un lienzo sin límites, donde los píxeles pintan una historia en constante evolución."
    },
    {
        category: "Ideas provocadoras",
        title: "The Quiet Place",
        url: "http://thequietplaceproject.com/thequietplace",
        description: "Un refugio en línea que te invita a desconectar de la vorágine digital y buscar un momento de paz introspectiva en el silencio.",
        quote: "En el ruido constante, el silencio se convierte en el acto más subversivo."
    },
    {
        category: "Blogs olvidados",
        title: "The World of Kane",
        url: "http://worldofkane.blogspot.com/",
        description: "Un blog que captura la esencia del diseño visual y la moda de décadas pasadas, resucitando el glamour y la osadía del siglo XX.",
        quote: "Redescubrir el pasado es darle nueva vida a nuestra imaginación."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Non-Visible Art",
        url: "https://www.nonvisiblemuseum.com/",
        description: "Una exposición que desafía las nociones tradicionales del arte al presentar obras que existen únicamente en la imaginación, cuestionando la relación entre el espectador y la obra de arte.",
        quote: "El arte más puro es el que se crea en el espacio etéreo de la mente."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Una comunidad que desafía a los músicos a crear piezas experimentales en respuesta a conceptos desafiantes, fomentando la innovación y la colaboración sonora.",
        quote: "Cada sonido es un universo inexplorado, esperando ser habitado."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoomquilt",
        url: "http://zoomquilt.org/",
        description: "Un viaje infinito a través de un lienzo eterno que se expande y contrae al compás de un zoom sin fin. Aquí, la percepción de la realidad se desdibuja y transforma en un sueño recurrente.",
        quote: "El viaje es el destino."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Doomsday Painting",
        url: "http://doomsdaypainting.com/",
        description: "Un artista anónimo que pinta el apocalipsis en un lienzo colosal, sin descanso, día tras día. Es un acto solitario y obsesivo que desafía al tiempo y la cordura.",
        quote: "Pintar el fin del mundo también es un comienzo."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "This Website Will Self-Destruct",
        url: "https://www.thiswebsitewillselfdestruct.com/",
        description: "Una página que amenaza con autodestruirse si nadie le presta atención. Alimentada por mensajes anónimos, es un experimento sobre la necesidad humana de conexión.",
        quote: "La soledad es el detonante de la extinción."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Universal Paperclips",
        url: "https://www.decisionproblem.com/paperclips/",
        description: "Un juego minimalista sobre la producción de clips de papel que, de manera absurda, se convierte en una reflexión sobre la inteligencia artificial y la obsesión por la eficiencia.",
        quote: "El destino del universo puede depender de un clip."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "The Weirdest Band in the World",
        url: "http://weirdestbandintheworld.com/",
        description: "Un rincón dedicado a bandas musicales que desafían las convenciones de la industria, explorando sonidos y estilos que solo pueden clasificarse como extraños.",
        quote: "Lo raro es el nuevo normal."
    },
    {
        category: "Estéticas raras",
        title: "Three.js Experiments",
        url: "http://www.chromeexperiments.com/webgl",
        description: "Exploraciones visuales donde la realidad se distorsiona y se reinventa usando tecnología de modelado 3D, fusionando arte y código en un espectáculo vibrante.",
        quote: "La realidad es solo una versión del código."
    },
    {
        category: "Ideas provocadoras",
        title: "The Last Tuesday Society",
        url: "https://www.thelasttuesdaysociety.org/",
        description: "Un bizarro gabinete de curiosidades que mezcla arte, taxidermia y esoterismo para desafiar lo que entendemos como cultura y civilización.",
        quote: "La curiosidad mató al gato, pero lo hizo eterno."
    },
    {
        category: "Blogs olvidados",
        title: "Oddity Central",
        url: "https://www.odditycentral.com/",
        description: "Este blog es un archivo de lo insólito y lo extravagante, recogiendo historias que pueden parecer irreales, pero que reflejan la diversidad y riqueza del mundo.",
        quote: "La realidad siempre supera a la ficción más extraña."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Ryoji Ikeda's Datamatics",
        url: "http://www.ryojiikeda.com/project/datamatics/",
        description: "Una sinfonía audiovisual que explora la percepción de los datos, transformando cifras y algoritmos en una experiencia sensorial que desafía los sentidos.",
        quote: "Los datos también tienen su propia música."
    },
    {
        category: "Música experimental",
        title: "Licht by Karlheinz Stockhausen",
        url: "https://www.stockhausen.org/licht.html",
        description: "Una composición operística en siete partes, cada una asociada con un día de la semana, que fusiona lo místico y lo vanguardista en una odisea sonora.",
        quote: "La música es un puente hacia lo desconocido."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Una experiencia visual y de sonido simple pero impactante, donde la interacción con un gracioso personaje negro produce resultados inesperados y caóticos.",
        quote: "A veces, la belleza está en el desorden."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Mierle Laderman Ukeles",
        url: "https://www.queensmuseum.org/2016/10/mierle-laderman-ukeles-maintenance-art",
        description: "Explora la obra de Mierle Laderman Ukeles, una artista que desafía las convenciones del arte al centrar su trabajo en el mantenimiento y el cuidado como formas de arte.",
        quote: "El arte es lo que hacemos todos los días."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Quietest Place on the Internet",
        url: "http://nooooooooooooooo.com/",
        description: "Un sitio con el solo propósito de proporcionar un espacio donde puedas escuchar el interminable grito de Darth Vader para desahogar tu frustración diaria.",
        quote: "A veces, todo lo que necesitamos es un grito silencioso."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Sandspiel",
        url: "https://sandspiel.club/",
        description: "Un simulador de física de partículas en línea que desafía al jugador a jugar con el fuego, agua, plantas y otros elementos en un entorno sandbox.",
        quote: "La belleza del caos controlado."
    },
    {
        category: "Mundos "under", subculturas",
        title: "The Dark Web Diaries",
        url: "https://darkwebdiaries.com/",
        description: "Un blog que ofrece un vistazo humano a la vida en el lado oculto de Internet, desmitificando mitos y revelando historias desde lo más profundo de la red oscura.",
        quote: "A veces, la verdad reside en la oscuridad."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Art",
        url: "https://www.glitchet.com/",
        description: "Un portal dedicado al arte de la distorsión digital, donde los fallos tecnológicos se convierten en formas estéticas fascinantes y contemplativas.",
        quote: "El error es una nueva forma de belleza."
    },
    {
        category: "Ideas provocadoras",
        title: "The Uncomfortable",
        url: "https://www.theuncomfortable.com/",
        description: "Un proyecto de diseño provocador que reimagina los objetos cotidianos en formas que son deliberadamente incómodas de usar.",
        quote: "La incomodidad nos despierta a nuevas posibilidades."
    },
    {
        category: "Blogs olvidados",
        title: "The Secret Diary of Steve Jobs",
        url: "http://www.fakesteve.net/",
        description: "Un blog satírico que presenta una visión alternativa y humorística de la mente de Steve Jobs, explorando la cultura de Silicon Valley desde un ángulo irónico.",
        quote: "En el mundo de las manzanas, la ironía es dorada."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Soundwalk Collective",
        url: "https://www.soundwalkcollective.com/",
        description: "Un colectivo que combina el arte del sonido, la performance y la antropología para crear experiencias auditivas inmersivas y meditativas.",
        quote: "El sonido es el eco del alma."
    },
    {
        category: "Filosofía digital",
        title: "Digital Philosophy Org",
        url: "https://www.digitalphilosophy.org/",
        description: "Explora la teoría de que el universo puede ser entendido como una vasta computadora, desafiando nuestras percepciones de la realidad y la conciencia.",
        quote: "En el código del cosmos, encontramos nuestros propios reflejos."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoomquilt",
        url: "https://zoomquilt.org/",
        description: "Un portal infinito de ilustraciones entrelazadas que te invita a perderte en su interminable loop visual de elementos surrealistas.",
        quote: "El viaje no tiene fin, solo tus ojos pueden detenerse."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Jan Svankmajer",
        url: "http://www.jansvankmajer.com/",
        description: "Sumérgete en el mundo de este artista checo, conocido por su animación stop-motion y cine surrealista que desafía la lógica convencional.",
        quote: "El arte es la única manera de escapar sin salir."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "Electric Sheep",
        url: "https://electricsheep.org/",
        description: "Un protector de pantalla colaborativo que utiliza algoritmos generativos de fractales, creando hipnóticas y eternas animaciones de 'ovejas eléctricas'.",
        quote: "Sueños colectivos en un mundo digital dormido."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "A Dark Room",
        url: "http://adarkroom.doublespeakgames.com/",
        description: "Un juego minimalista de texto que comienza con la simple tarea de encender un fuego, pero pronto evoluciona en un completo universo de misterios.",
        quote: "Enciende la llama de lo desconocido."
    },
    {
        category: "Mundos "under", subculturas",
        title: "The Doll Forum",
        url: "https://www.dollforum.com/",
        description: "Una comunidad de entusiastas de muñecas realistas, compartiendo pasiones, anécdotas y curiosidades dentro de una subcultura con matices asombrosos.",
        quote: "En un mundo de plástico, la realidad es moldeable."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Rafaël Rozendaal's Websites",
        url: "http://www.newrafael.com/",
        description: "Una colección de sitios web convertidos en arte digital por Rafaël Rozendaal, donde cada URL es una ventana a una pieza de net.art única.",
        quote: "El arte de navegar, navegar en el arte."
    },
    {
        category: "Ideas provocadoras",
        title: "The Plan",
        url: "http://www.iamtheplan.com/",
        description: "Una experiencia interactiva que te invita a reflexionar sobre la insignificancia de la vida a través de la aventura de una simple mosca en su efímero viaje.",
        quote: "La grandeza reside en lo pequeño."
    },
    {
        category: "Blogs olvidados",
        title: "Things Organized Neatly",
        url: "http://thingsorganizedneatly.tumblr.com/",
        description: "Un blog dedicado al orden geométrico y la estética de la simetría, celebrando la tranquilizadora belleza del control visual.",
        quote: "El caos es solo una ilusión de la mente."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Infinite Objects",
        url: "https://infiniteobjects.com/",
        description: "Una exhibición de 'videoesculturas' encapsuladas en marcos de pantalla, donde los videos se convierten en objetos físicos.",
        quote: "El tiempo atrapado en un ojo eléctrico."
    },
    {
        category: "Música experimental",
        title: "Disquiet Junto",
        url: "https://disquiet.com/",
        description: "Un proyecto colaborativo que desafía a músicos a crear piezas sonoras a partir de instrucciones conceptuales, renovando la música cada semana.",
        quote: "El silencio es el lienzo de la innovación sonora."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Falling Sand Game",
        url: "https://sandspiel.club/",
        description: "Una simulación donde puedes crear y destruir pequeños universos de arena, agua, fuego y aceite. La física simple se convierte en un medio para crear arte efímero y caótico.",
        quote: "La belleza efímera yace en millones de granos danzando al ritmo de un desierto digital."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Agnes Richter: Art from Within",
        url: "https://www.psychologytoday.com/us/blog/connecting-creativity/201908/embroidery-the-jacket",
        description: "Una artista anónima del siglo XIX que bordó su chaqueta psiquiátrica con un intrincado y enigmático diario. Un poderoso testimonio de resistencia y expresión personal en medio del confinamiento.",
        quote: "Aunque limitados, los hilos cosían sus pensamientos en libertad."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "100,000 Stars",
        url: "https://experiments.withgoogle.com/100000-stars",
        description: "Un mapa interactivo que te permite explorar la Vía Láctea. Este proyecto de Google visualiza estrellas cercanas en un viaje cósmico que va más allá del ojo humano.",
        quote: "Viaja a través del vasto silencio donde las estrellas habitan en soledad."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Dinosaur Polo Club: Mini Metro",
        url: "https://dinopoloclub.com/games/mini-metro/",
        description: "Mini Metro es un juego minimalista sobre el diseño de mapas de metro. Balancea simplicidad y complejidad mientras conectas líneas y estaciones en un sistema urbano en crecimiento.",
        quote: "Con cada línea, trazamos nuestra propia cartografía del caos urbano."
    },
    {
        category: "Mundos "under", subculturas",
        title: "The Aesthetic of Vaporwave",
        url: "https://vapor95.com/pages/what-is-vaporwave",
        description: "Un vistazo a la cultura Vaporwave, una subcultura que recicla elementos de la era digital temprana para crear una estética nostálgica y crítica de la cultura de consumo.",
        quote: "En la distorsión de lo retro, hallamos el eco de un futuro que nunca llegó."
    },
    {
        category: "Estéticas raras (net.art, glitch, vaporwave)",
        title: "Glitch Safari",
        url: "https://glitchsafari.com/",
        description: "Glitch Safari es un coliseo digital para aquellos que desean cazas sueltas de errores visuales en la web. Una reunión de fallos convertidos en arte.",
        quote: "Cuando el error se convierte en arte, el caos se embellece."
    },
    {
        category: "Ideas provocadoras",
        title: "The Age of Em",
        url: "https://age-of-em.com/",
        description: "Explora cómo la vida cambiaría si usáramos 'ems', simulaciones de cerebros humanos. Una profunda reflexión sobre identidad, economía y la esencia de lo que significa ser humano.",
        quote: "¿Y si nuestro cerebro digitalizado nos permitiera vivir para siempre?"
    },
    {
        category: "Blogs olvidados",
        title: "Textfiles.com",
        url: "http://www.textfiles.com/",
        description: "Una colección de archivos de texto que remontan a los primeros días de la web. Un archivo de pensamientos, historias y datos que capturan el espíritu del internet primitivo.",
        quote: "En la simplicidad de un archivo de texto yace la historia de internet."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Museum of Broken Relationships",
        url: "https://brokenships.com/",
        description: "Una singular exposición compuesta por objetos cotidianos que narran historias de amor y pérdida. Cada pieza es un fragmento cristalizado de emociones pasadas.",
        quote: "Los fragmentos del corazón humano se exhiben como reliquias de un museo compartido."
    },
    {
        category: "Música experimental",
        title: "Radio Garden",
        url: "http://radio.garden/",
        description: "Radio Garden permite explorar emisoras de todo el mundo. Un viaje sonoro en tiempo real que revela las vibraciones únicas de cada rincón del planeta.",
        quote: "El mundo sintonizado en frecuencias invisibles, una radio infinita."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "Zoom Quilt",
        url: "https://zoomquilt.org/",
        description: "Un tapiz interminable que te invita a viajar más allá de lo imaginable, un sueño digital tejido con hilos de surrealismo y fantasía sin fin.",
        quote: "Si el infinito tuviera un rostro, sería un caleidoscopio de sueños."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Anna Dumitriu",
        url: "http://www.normalflora.co.uk/",
        description: "Dumitriu combina el arte y la microbiología para explorar el mundo invisible de las bacterias, creando bellas y provocadoras obras que cuestionan nuestra relación con lo biológico.",
        quote: "En la fusión de ciencia y arte florecen las bacterias de la creatividad."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Museum of Everyday Life",
        url: "http://museumofeverydaylife.org/",
        description: "Este museo celebra lo mundano con una colección de objetos cotidianos cargados de historias y significados, revalorizando lo que a menudo pasamos por alto.",
        quote: "La belleza acecha en los rincones más comunes de nuestra existencia."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "A Dark Room",
        url: "http://adarkroom.doublespeakgames.com/",
        description: "Un juego de texto minimalista que comienza con una simple tarea que conduce a un enigmático viaje en lo desconocido. La oscuridad es solo el inicio.",
        quote: "A veces, encender un fuego es el primer paso hacia lo increíble."
    },
    {
        category: "Mundos under, subculturas",
        title: "The Burning Man Project",
        url: "https://burningman.org/",
        description: "Más allá de su festival famoso, este proyecto cultiva una cultura efímera y vibrante que desafía las convenciones sociales a través de la creatividad radical y la comunidad.",
        quote: "Un lienzo desértico donde las almas arden con libertad creativa."
    },
    {
        category: "Estéticas raras",
        title: "Giphy",
        url: "https://giphy.com/gifs/surreal-glitch-art-1d5UA7n9mVEyR1t2T0",
        description: "Una pieza de glitch art que te envuelve en su caos digital, donde las fallas se convierten en poesía gráfica. Un recordatorio de la belleza en la imperfección.",
        quote: "La perfección es una ilusión que los errores transforman en arte."
    },
    {
        category: "Ideas provocadoras",
        title: "The Human Library",
        url: "https://humanlibrary.org/",
        description: "Un espacio vivo donde las personas son libros, y sus historias desafiantes, una colección de empoderamiento, diversidad y diálogo abierto.",
        quote: "Para entender el mundo, primero debemos leer sus habitantes."
    },
    {
        category: "Blogs olvidados",
        title: "The Cool Hunter",
        url: "http://www.thecoolhunter.net/",
        description: "Este blog estético, aunque en los bordes del olvido, presenta una mezcla de diseño innovador y cultura visual que desafía lo convencional.",
        quote: "La frescura es un estado de mente que se reinventa constantemente."
    },
    {
        category: "Performances o exposiciones raras",
        title: "Silent Room",
        url: "https://www.jakoblang.dk/thesilentroom/",
        description: "Una instalación de arte sonoro que aísla al oyente del ruido del mundo, promoviendo un espacio de introspección y comprensión personal.",
        quote: "En el silencio, las voces internas encuentran la armonía."
    },
    {
        category: "Música experimental",
        title: "Björk's Biophilia App",
        url: "https://bjork.com/biophilia/",
        description: "Un disco convertido en experiencia interactiva, donde la música se mezcla con la naturaleza a través de aplicaciones artísticas multidimensionales.",
        quote: "La música es un universo donde la biología y la tecnología bailan juntas."
    },
    {
        category: "Webs extrañas o inútiles",
        title: "The Staggering Beauty",
        url: "http://www.staggeringbeauty.com/",
        description: "Un sitio web surrealista que te invita a mover una figura negra al ritmo de tu ratón, cobrando vida con cada movimiento. La simplicidad se convierte en un juego fascinante de luces y colores.",
        quote: "El movimiento es poesía en una pantalla."
    },
    {
        category: "Artistas desconocidos o marginales",
        title: "Evelyn De Morgan",
        url: "https://www.demorgan.org.uk/evelyn-de-morgan/",
        description: "Conocida por sus obras llenas de simbolismo y misticismo, Evelyn De Morgan pintó visiones del más allá y la evolución espiritual en colores vívidos, transportándote a un universo diferente.",
        quote: "En cada lienzo, una ventana a la eternidad."
    },
    {
        category: "Proyectos raros y experimentales",
        title: "The Nicest Place on the Internet",
        url: "http://thenicestplaceontheinter.net/",
        description: "Un espacio virtual donde abrazos digitales de extraños llegan a curar los días más grises. Los vídeos de personas ofreciendo abrazos y sonrisas traen un respiro inesperado.",
        quote: "A veces, la bondad es solo un clic de distancia."
    },
    {
        category: "Juegos absurdos o interactivos",
        title: "Sandspiel",
        url: "https://sandspiel.club/",
        description: "Este juego te permite experimentar con elementos físicos en una caja de arena digital. El caos y el orden se mezclan en un ballet de partículas, creando mundos efímeros.",
        quote: "Construye castillos de arena en el ciberespacio."
    },
    {
        category: "Mundos 'under', subculturas",
        title: "Glitch Artists Collective",
        url: "https://www.facebook.com/groups/GlitchArtistsCollective/",
        description: "Una comunidad dedicada a explorar las imperfecciones digitales como forma de arte. Aquí, los errores tecnológicos se vuelven artefactos de belleza insospechada y provocativa.",
        quote: "Celebrar el error, encontrar belleza en lo roto."
    },
    {
        category: "Estéticas raras",
        title: "Cory Arcangel",
        url: "http://www.coryarcangel.com/",
        description: "Este artista digital manipula tecnologías obsoletas para crear piezas visuales que evocan nostalgia y reflexión sobre el progreso tecnológico y sus residuos.",
        quote: "Navegar entre lo obsoleto y lo sublime."
    },
    {
        category: "Ideas provocadoras",
        title: "PostSecret",
        url: "https://postsecret.com/",
        description: "Un proyecto de arte comunitario en el que las personas comparten sus secretos más profundos en postales anónimas. Una exploración conmovedora de las sombras de la psique colectiva.",
        quote: "En las confesiones, encontramos humanidad."
    },
    {
        category: "Blogs olvidados",
        title: "BizarreRecords",
        url: "http://bizarrerecords.com/",
        description: "Este blog celebra portadas de discos extrañas y maravillosas, ofreciendo un paseo nostálgico por las épocas doradas del vinilo donde la creatividad no conocía límites.",
        quote: "La música visualizada en lo absurdo."
    },
    {
        category: "Performances o exposiciones raras",
        title: "The Quiet Volume",
        url: "http://anthampton.com/thequietvolume/",
        description: "Una performance literaria que guía a los participantes a través de un mundo de palabras susurradas en una biblioteca, creando una experiencia íntima con el susurro de los libros.",
        quote: "Las palabras adquieren voz en el susurro del papel."
    },
    {
        category: "Experimentos sociales",
        title: "We Feel Fine",
        url: "http://www.wefeelfine.org/",
        description: "Este proyecto captura emociones humanas de blogs de todo el mundo, visualizándolas como partículas danzantes en una pantalla, un testimonio a la universalidad de nuestras experiencias.",
        quote: "Las emociones humanas en un tapiz digital."
    }

// Para usar APIs reales, reemplaza getRandomDiscoveries() con:
async function getRandomDiscoveriesFromAPIs() {
    const redditData = await fetchFromReddit('InternetIsBeautiful');
    const hnData = await fetchFromHackerNews();
    
    // Combina con tu base de datos local
    const allDiscoveries = [...discoveriesDatabase, ...redditData, ...hnData];
    
    // Aplica la lógica de no repetición
    // ... (similar a getRandomDiscoveries)
}
*/

// ============================================
// NOTAS PARA EXTENSIÓN
// ============================================

/*
CÓMO EXTENDER ESTA WEB:

1. AÑADIR MÁS FUENTES DE DATOS:
   - Modifica la función getRandomDiscoveries para incluir fetch a APIs
   - APIs sugeridas:
     * Reddit API: https://www.reddit.com/dev/api/
     * Hacker News API: https://github.com/HackerNews/API
     * Are.na API: https://dev.are.na/
     * Internet Archive API: https://archive.org/help/json.php

2. SCRAPING (REQUIERE BACKEND):
   - JavaScript en navegador tiene limitaciones de CORS
   - Considera usar un backend simple (Node.js, Python Flask, etc.)
   - O usa servicios como ScrapingBee, ParseHub

3. MEJORAR PERSISTENCIA:
   - Actualmente usa localStorage (límite ~5MB)
   - Para más datos, considera IndexedDB
   - O sincroniza con un backend simple

4. AÑADIR FILTROS:
   - Por categoría
   - Por "mood" (alegre, triste, filosófico)
   - Por dificultad/accesibilidad

5. COMPARTIR:
   - Añade botones de share en cada tarjeta
   - Genera URLs únicas para colecciones

6. NOTIFICACIONES:
   - Implementa service worker para notificaciones diarias
   - Recordatorios de nuevos descubrimientos

7. COMUNIDAD:
   - Permite a usuarios sugerir nuevas rarezas
   - Sistema de votación
   - Backend necesario (Firebase, Supabase, etc.)
*/
