// Variables globales
let rawData = [];
let municipiosCoords = {};
let filteredData = [];
let colombiaMap = null;
let heatmapLayer = null;
let proponentesChart = null;

// Elementos del DOM
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error-message');
const procesosFilter = document.getElementById('proceso-filter');
const searchInput = document.getElementById('search-input');
const clearFiltersBtn = document.getElementById('clear-filters');
const fileInput = document.getElementById('file-input');
const processFileBtn = document.getElementById('process-file');
const dataContainer = document.getElementById('data-container');
const dataTitle = document.getElementById('data-title');
const dataCount = document.getElementById('data-count');

// Elementos de KPIs
const totalProcesosEl = document.getElementById('total-procesos');
const totalProponentesEl = document.getElementById('total-proponentes');
const totalEmpresasEl = document.getElementById('total-empresas');

// Elementos del mapa
const mapMissingCoordsEl = document.getElementById('map-missing-coords');
const missingCoordsCountEl = document.getElementById('missing-coords-count');

/**
 * Función principal que inicializa la aplicación
 */
async function init() {
    try {
        // Usar coordenadas directamente en el código (sin fetch)
        municipiosCoords = {
            "BOGOTA D.C.": [4.6097, -74.0817],
            "BOGOTÁ D.C.": [4.6097, -74.0817],
            "BOGOTA": [4.6097, -74.0817],
            "BOGOTÁ": [4.6097, -74.0817],
            "MEDELLIN": [6.2442, -75.5812],
            "MEDELLÍN": [6.2442, -75.5812],
            "CALI": [3.4516, -76.5320],
            "BARRANQUILLA": [10.9685, -74.7813],
            "CARTAGENA": [10.3910, -75.4794],
            "CARTAGENA DE INDIAS": [10.3910, -75.4794],
            "CUCUTA": [7.8939, -72.5078],
            "CÚCUTA": [7.8939, -72.5078],
            "BUCARAMANGA": [7.1193, -73.1227],
            "SOLEDAD": [10.9185, -74.7642],
            "IBAGUE": [4.4389, -75.2322],
            "IBAGUÉ": [4.4389, -75.2322],
            "PEREIRA": [4.8133, -75.6961],
            "SANTA MARTA": [11.2408, -74.2110],
            "VILLAVICENCIO": [4.1420, -73.6266],
            "VALLEDUPAR": [10.4731, -73.2532],
            "BELLO": [6.3370, -75.5548],
            "MONTERIA": [8.7479, -75.8814],
            "MONTERÍA": [8.7479, -75.8814],
            "PASTO": [1.2136, -77.2811],
            "MANIZALES": [5.0700, -75.5138],
            "NEIVA": [2.9273, -75.2819],
            "PALMIRA": [3.5394, -76.3036],
            "POPAYAN": [2.4448, -76.6147],
            "POPAYÁN": [2.4448, -76.6147],
            "BUENAVENTURA": [3.8801, -77.0313],
            "ARMENIA": [4.5339, -75.6811],
            "SINCELEJO": [9.3047, -75.3978],
            "TUNJA": [5.5353, -73.3678],
            "FLORENCIA": [1.6144, -75.6062],
            "RIOHACHA": [11.5448, -72.9072],
            "MOCOA": [1.1532, -76.6606],
            "YOPAL": [5.3378, -72.3958],
            "QUIBDO": [5.6947, -76.6583],
            "QUIBDÓ": [5.6947, -76.6583],
            "ARAUCA": [7.0844, -70.7592],
            "LETICIA": [-4.2151, -69.9406],
            "INIRIDA": [3.8653, -67.9239],
            "INÍRIDA": [3.8653, -67.9239],
            "SOACHA": [4.5928, -74.2172],
            "FUNZA": [4.7166, -74.2092],
            "MOSQUERA": [4.7053, -74.2305],
            "MADRID": [4.7297, -74.2658],
            "FACATATIVA": [4.8144, -74.3550],
            "FACATATIVÁ": [4.8144, -74.3550],
            "CHIA": [4.8619, -74.0583],
            "CHÍA": [4.8619, -74.0583],
            "ZIPAQUIRA": [5.0308, -74.0044],
            "ZIPAQUIRÁ": [5.0308, -74.0044],
            "SOPO": [4.9080, -73.9402],
            "SOPÓ": [4.9080, -73.9402],
            "OCAÑA": [8.2461, -73.3552],

            
            // Departamento de Magdalena
            "PLATO": [9.7833, -74.7833],
            "FUNDACION": [10.5208, -74.1833],
            "FUNDACIÓN": [10.5208, -74.1833],
            "CIENAGA": [11.0167, -74.2500],
            "CIÉNAGA": [11.0167, -74.2500],
            "EL BANCO": [9.0000, -73.9833],
            "ARACATACA": [10.5833, -74.2000],
            "ZONA BANANERA": [10.7500, -74.1167],
            "ALGARROBO": [10.1833, -74.9333],
            "CERRO SAN ANTONIO": [10.3167, -74.8167],
            "CONCORDIA": [10.2833, -75.1167],
            "EL PIÑON": [10.2667, -74.4167],
            "EL PIÑÓN": [10.2667, -74.4167],
            "GUAMAL": [9.1333, -74.2167],
            "NUEVA GRANADA": [9.5167, -74.3500],
            "PEDRAZA": [10.0167, -74.8000],
            "PIJIÑO DEL CARMEN": [9.4333, -74.4667],
            "PIVIJAY": [10.4667, -74.6167],
            "REMOLINO": [10.7000, -74.7333],
            "SABANAS DE SAN ANGEL": [10.2333, -75.1833],
            "SALAMINA": [10.4833, -74.8000],
            "SAN SEBASTIAN DE BUENAVISTA": [10.4167, -74.7167],
            "SAN ZENON": [9.2500, -74.0833],
            "SANTA ANA": [9.3167, -74.6167],
            "SANTA BARBARA DE PINTO": [10.3500, -74.4333],
            "SITIONUEVO": [10.7833, -74.7167],
            "TENERIFE": [9.8833, -74.8833],
            "ZAPAYAN": [9.2833, -74.4333],
            "ZAPAYÁN": [9.2833, -74.4333],
            
            // Más municipios importantes de otros departamentos
            "ENVIGADO": [6.1739, -75.5911],
            "ITAGUI": [6.1728, -75.6142],
            "ITAGÜÍ": [6.1728, -75.6142],
            "SABANETA": [6.1511, -75.6167],
            "LA ESTRELLA": [6.1583, -75.6428],
            "CALDAS": [6.0917, -75.6339],
            "COPACABANA": [6.3469, -75.5097],
            "GIRARDOTA": [6.3803, -75.4464],
            "RIONEGRO": [6.1556, -75.3736],
            
            // Atlántico
            "MALAMBO": [10.8597, -74.7739],
            "GALAPA": [10.8992, -74.8839],
            "PUERTO COLOMBIA": [10.9889, -74.9544],
            "PUERTO COLOMBIA": [10.9889, -74.9544],
            "BARANOA": [10.8333, -74.9167],
            "SABANAGRANDE": [10.7500, -74.7500],

            
            // Bolívar
            "MAGANGUE": [9.2417, -74.7556],
            "MAGANGUÉ": [9.2417, -74.7556],
            "TURBACO": [10.3389, -75.4275],
            "ARJONA": [10.2556, -75.3406],
            "EL CARMEN DE BOLIVAR": [9.8667, -75.0333],
            "EL CARMEN DE BOLÍVAR": [9.8667, -75.0333],
            "MOMPOS": [9.2500, -74.2000],
            "MOMPÓS": [9.2500, -74.2000],
            "MOMPÓX": [9.2500, -74.2000],
            "MOMPOX": [9.2500, -74.2000],
            "TALAIGUA NUEVO": [9.5833, -74.8667],
            
            // Cesar
            "AGUACHICA": [8.3111, -73.6178],
            "BOSCONIA": [10.0167, -73.8667],
            "LA JAGUA DE IBIRICO": [9.5500, -73.3167],
            "LA PAZ": [10.3852, -73.1719],
            "PUEBLO BELLO": [10.4163, -73.5866],


            
            // Córdoba
            "CERETE": [8.8833, -75.7833],
            "CERETÉ": [8.8833, -75.7833],
            "LORICA": [9.2333, -75.8167],
            "SAHAGUN": [8.9500, -75.4500],
            "SAHAGÚN": [8.9500, -75.4500],
            "MONTELIBANO": [7.9667, -75.4000],
            "MONTELÍBANO": [7.9667, -75.4000],

            
            // La Guajira
            "MAICAO": [11.3833, -72.2500],
            "URIBIA": [11.7000, -72.2667],
            "DIBULLA": [11.2333, -72.7167],
            "DISTRACCION": [10.9667, -72.8667],
            "DISTRACCIÓN": [10.9667, -72.8667],
            "BARRANCAS": [11.5500, -72.9167],
            "EL MOLINO": [10.9667, -73.2500],
            "EL MOLINo": [10.9667, -73.2500],
            "FONSECA": [10.7000, -72.9167],
            "HATO NUEVO": [10.6333, -73.2500],
            "HATO NUEVO": [10.6333, -73.2500],
            "VILLANUEVA": [10.5833, -73.2500],
            "VILLANUEVA": [10.5833, -73.2500],
            "RIOHACHA": [11.5448, -72.9072],
            
            // Sucre
            "COROZAL": [9.3167, -75.3000],
            "SAMPUES": [9.1833, -75.3833],
            "SAMPUÉS": [9.1833, -75.3833],
            "SAN ONOFRE": [9.1833, -75.3833],
            "SUCRE": [9.1833, -75.3833],
            "TAMALAMEQUE": [9.1833, -75.3833],

            // Santander
            "FLORIDABLANCA": [7.0625, -73.0861],
            "GIRON": [7.0800, -73.1194],
            "GIRÓN": [7.0800, -73.1194],
            "BARRANCABERMEJA": [7.0647, -73.8547],
            "barrancabermeja": [7.0647, -73.8547],
            "Barrancabermeja": [7.0647, -73.8547],
            "PUERTO BERRIO": [6.4347, -74.3731],
            "PUERTO BERRÍO": [6.4347, -74.3731],
            "SAN VICENTE DE CHUCURÍ": [7.0000, -73.5000],
            "SAN VICENTE DE CHUCURI": [7.0000, -73.5000],
            
            // Cajicá - municipio de Cundinamarca, no Antioquia
            "CAJICÁ": [4.9166, -74.025],
            "CAJICA": [4.9166, -74.025],
            "cajicá": [4.9166, -74.025],
            "cajica": [4.9166, -74.025],
            
            // Nuevas ciudades del JSON - organizadas por departamentos
            
            // Huila
            "PALERMO": [2.8917, -75.4375],
            "PITALITO": [1.8989, -76.0419],
            
            // Antioquia adicionales
            "TURBO": [8.1000, -76.7333],
            "APARTADO": [7.8833, -76.6333],
            "SABANALARGA": [6.8500, -75.8167],
            
            // Valle del Cauca adicionales  
            "TULUA": [4.0833, -76.2000],
            "TULUÁ": [4.0833, -76.2000],
            "CARTAGO": [4.7000, -75.9167],
            "GUADALAJARA DE BUGA": [3.9000, -76.3019],
            "BUGA": [3.9000, -76.3019],
            "JAMUNDI": [3.2667, -76.5500],
            "JAMUNDÍ": [3.2667, -76.5500],
            
            // Nariño adicionales
            "TUMACO": [1.8067, -78.7647],
            "IPIALES": [0.8303, -77.6444],
            
            // Cundinamarca adicionales
            "FONTIBON": [4.6786, -74.1411],
            "FONTIBÓN": [4.6786, -74.1411],
            "USME": [4.4464, -74.1522],
            "FUSAGASUGA": [4.3452, -74.3618],
            "FUSAGASUGÁ": [4.3452, -74.3618],
            "GIRARDOT": [4.3050, -74.8017],
            "DUITAMA": [5.8333, -73.0167],
            
            // Santander adicionales
            "PIEDECUESTA": [7.0833, -73.0000],
            
            // Risaralda adicionales
            "DOSQUEBRADAS": [4.8333, -75.6833],
            "LA VIRGINIA": [4.9167, -75.8333],
            
            // Cauca adicionales
            "SANTANDER DE QUILICHAO": [3.0167, -76.4833],
            
            // Boyacá adicionales
            "SOGAMOSO": [5.7167, -72.9208],
            
            // San Andrés y Providencia
            "SAN ANDRES": [12.5847, -81.7006],
            "SAN ANDRÉS": [12.5847, -81.7006],
            
            // Guaviare
            "SAN JOSE DEL GUAVIARE": [2.5667, -72.6333],
            "SAN JOSÉ DEL GUAVIARE": [2.5667, -72.6333],
            
            // Vaupés
            "MITU": [1.1983, -70.1733],
            "MITÚ": [1.1983, -70.1733],
            
            // Vichada
            "PUERTO CARREÑO": [6.1903, -67.4836],
            
            // Municipios adicionales de Antioquia
            "ABEJORRAL": [5.8033, -75.4228],
            "ABRIAQUIA": [6.8833, -76.1167],
            "ABRIQUÍ": [6.8833, -76.1167],
            "ALEJANDRIA": [6.3667, -75.0833],
            "ALEJANDRÍA": [6.3667, -75.0833],
            "AMAGA": [6.0500, -75.7000],
            "AMAGÁ": [6.0500, -75.7000],
            "AMALFI": [6.9167, -75.0667],
            "ANDES": [5.6167, -75.8833],
            "ANGELOPOLIS": [6.1333, -75.7167],
            "ANGELÓPOLIS": [6.1333, -75.7167],
            "ANGOSTURA": [6.8833, -75.3333],
            "ANORI": [7.1167, -75.1833],
            "ANORÍ": [7.1167, -75.1833],
            "ANZA": [7.0500, -75.5167],
            "ANZÁ": [7.0500, -75.5167],
            "ARBOLETES": [8.8667, -76.4167],
            "ARGELIA": [5.8000, -75.6167],
            "BARBOSA": [6.4333, -75.3333],
            "BELMIRA": [6.6333, -75.6500],
            "BETANIA": [5.8667, -75.8000],
            "BETULIA": [5.9833, -75.9500],
            "BRICEÑO": [7.0833, -75.7167],
            "BURITICA": [6.7000, -76.1000],
            "BURITICÁ": [6.7000, -76.1000],
            "CACERES": [7.4000, -75.2000],
            "CÁCERES": [7.4000, -75.2000],
            "CAICEDO": [6.7000, -75.6333],
            "CAMPAMENTO": [5.9167, -75.9167],
            "CAÑASGORDAS": [6.7667, -76.2833],
            "CARACOLI": [7.0000, -75.1667],
            "CARACOLÍ": [7.0000, -75.1667],
            "CARAMANTA": [5.5333, -75.6333],
            "CAREPA": [7.7500, -76.6500],
            "CAROLINA DEL PRINCIPE": [6.7167, -75.3667],
            "CAROLINA DEL PRÍNCIPE": [6.7167, -75.3667],
            "CAUCASIA": [7.9833, -75.1833],
            "CHIGORODO": [7.6667, -76.6833],
            "CHIGORODÓ": [7.6667, -76.6833],
            "CISNEROS": [6.5500, -75.0833],
            "CIUDAD BOLIVAR": [5.8667, -76.0167],
            "CIUDAD BOLÍVAR": [5.8667, -76.0167],
            "COCORNA": [6.0667, -75.1833],
            "COCORNÁ": [6.0667, -75.1833],
            "CONCEPCION": [6.3833, -75.3833],
            "CONCEPCIÓN": [6.3833, -75.3833],
            "CONCORDIA": [6.0500, -75.9167],
            "DABEIBA": [6.4333, -76.4167],
            "DONMATIAS": [6.5000, -75.4167],
            "DONMATÍAS": [6.5000, -75.4167],
            "EBEJICO": [6.3167, -75.7667],
            "EBÉJICO": [6.3167, -75.7667],
            "EL BAGRE": [7.6000, -74.8167],
            "EL CARMEN DE VIBORAL": [6.0833, -75.3333],
            "EL PEÑOL": [6.2167, -75.2333],
            "EL RETIRO": [6.0500, -75.5000],
            "EL SANTUARIO": [6.1333, -75.2833],
            "ENTRERRIOS": [6.5833, -75.4833],
            "ENTRERÍOS": [6.5833, -75.4833],
            "FREDONIA": [5.9167, -75.6667],
            "FRONTINO": [6.7500, -76.3500],
            "GIRALDO": [6.3833, -75.8833],
            "GOMEZ PLATA": [6.8167, -75.2000],
            "GÓMEZ PLATA": [6.8167, -75.2000],
            "GRANADA": [6.1667, -75.3000],
            "GUADALUPE": [6.9000, -75.4833],
            "GUARNE": [6.2833, -75.4167],
            "GUATAPE": [6.2333, -75.1667],
            "GUATAPÉ": [6.2333, -75.1667],
            "HELICONIA": [6.2167, -75.7500],
            "HISPANIA": [5.6500, -75.9167],
            "ITUANGO": [7.1667, -75.7500],
            "JARDIN": [5.5833, -75.8167],
            "JARDÍN": [5.5833, -75.8167],
            "JERICO": [5.7833, -75.7833],
            "JERICÓ": [5.7833, -75.7833],
            "LA CEJA": [6.0167, -75.4333],
            "LA PINTADA": [5.7167, -75.6000],
            "LA UNION": [5.9667, -75.3667],
            "LA UNIÓN": [5.9667, -75.3667],
            "LIBORINA": [6.6500, -75.8500],
            "MACEO": [6.5500, -74.7833],
            "MARINILLA": [6.1667, -75.3167],
            "MONTEBELLO": [5.9500, -75.5167],
            "MURINDO": [6.9833, -76.7667],
            "MURINDÓ": [6.9833, -76.7667],
            "MUTATA": [7.4167, -76.5833],
            "MUTATÁ": [7.4167, -76.5833],
            "NARIÑO": [6.1500, -75.1833],
            "NECHI": [8.0833, -74.7667],
            "NECHÍ": [8.0833, -74.7667],
            "NECOCLI": [8.4167, -76.7833],
            "NECOCLÍ": [8.4167, -76.7833],
            "OLAYA": [5.7333, -75.6333],
            "PEQUE": [6.9833, -75.9000],
            "PUEBLORRICO": [5.7000, -75.6833],
            "PUERTO BERRIO": [6.4833, -74.4000],
            "PUERTO BERRÍO": [6.4833, -74.4000],
            "PUERTO NARE": [6.1833, -74.6167],
            "PUERTO TRIUNFO": [5.8667, -74.6333],
            "REMEDIOS": [7.0333, -74.6833],
            "SALGAR": [5.9667, -75.9667],
            "SAN ANDRES DE CUERQUIA": [6.9167, -75.7333],
            "SAN ANDRÉS DE CUERQUIA": [6.9167, -75.7333],
            "SAN CARLOS": [6.2000, -74.9833],
            "SAN FRANCISCO": [6.0333, -75.0833],
            "SAN JERONIMO": [6.4500, -75.7833],
            "SAN JERÓNIMO": [6.4500, -75.7833],
            "SAN JOSE DE LA MONTAÑA": [6.7333, -75.6167],
            "SAN JOSÉ DE LA MONTAÑA": [6.7333, -75.6167],
            "SAN JUAN DE URABA": [8.8000, -76.5000],
            "SAN JUAN DE URABÁ": [8.8000, -76.5000],
            "SAN LUIS": [6.0333, -74.9667],
            "SAN PEDRO DE URABA": [8.2667, -76.4167],
            "SAN PEDRO DE URABÁ": [8.2667, -76.4167],
            "SAN PEDRO DE LOS MILAGROS": [6.4667, -75.5500],
            "SAN RAFAEL": [6.0833, -75.0167],
            "SAN ROQUE": [6.4833, -74.9167],
            "SAN VICENTE": [6.2833, -75.3333],
            "SANTA BARBARA": [6.2000, -75.1167],
            "SANTA BÁRBARA": [6.2000, -75.1167],
            "SANTA FE DE ANTIOQUIA": [6.5667, -75.8333],
            "SANTA ROSA DE OSOS": [6.6500, -75.4500],
            "SANTO DOMINGO": [6.4833, -75.1000],
            "SEGOVIA": [7.0833, -74.7000],
            "SONSON": [5.7167, -75.3167],
            "SONSÓN": [5.7167, -75.3167],
            "SOPETRAN": [6.5000, -75.7500],
            "SOPETRÁN": [6.5000, -75.7500],
            "TAMESIS": [5.6833, -75.7167],
            "TÁMESIS": [5.6833, -75.7167],
            "TARAZA": [7.5667, -75.3833],
            "TARAZÁ": [7.5667, -75.3833],
            "TARSO": [5.8333, -75.7833],
            "TITIRIBI": [6.0667, -75.7667],
            "TITIRIBÍ": [6.0667, -75.7667],
            "TOLEDO": [7.2167, -75.6833],
            "URAMITA": [6.8667, -76.1667],
            "URRAO": [6.3167, -76.1333],
            "VALDIVIA": [7.1833, -75.4333],
            "VALPARAISO": [6.1833, -75.5167],
            "VALPARAÍSO": [6.1833, -75.5167],
            "VEGACHI": [6.7667, -74.8167],
            "VEGACHÍ": [6.7667, -74.8167],
            "VENECIA": [5.9667, -75.7833],
            "VIGIA DEL FUERTE": [6.5833, -76.8833],
            "VIGÍA DEL FUERTE": [6.5833, -76.8833],
            "YALI": [6.6500, -74.8500],
            "YALÍ": [6.6500, -74.8500],
            "YARUMAL": [6.9667, -75.4167],
            "YOLOMBO": [6.9833, -75.1000],
            "YOLOMBÓ": [6.9833, -75.1000],
            "YONDO": [7.0167, -73.8667],
            "YONDÓ": [7.0167, -73.8667],
            "ZARAGOZA": [7.5167, -74.8667],
            
            // Municipios adicionales de Amazonas
            "PUERTO NARIÑO": [-3.7667, -70.3833],
            
            // Municipios adicionales de Arauca
            "ARAUQUITA": [7.0333, -70.9833],
            "CRAVO NORTE": [6.3000, -70.2000],
            "FORTUL": [6.4833, -71.8833],
            "PUERTO RONDON": [6.7833, -71.7500],
            "PUERTO RONDÓN": [6.7833, -71.7500],
            "SARAVENA": [6.9333, -71.8833],
            "TAME": [6.4500, -71.7333],
            
            // Municipios adicionales de Atlántico
            "CAMPO DE LA CRUZ": [10.3833, -74.8833],
            "CANDELARIA": [10.4667, -75.0167],
            "JUAN DE ACOSTA": [10.8333, -75.0333],
            "LURUACO": [10.6167, -75.1667],
            "MANATI": [10.4500, -74.9667],
            "MANATÍ": [10.4500, -74.9667],
            "PALMAR DE VARELA": [10.7333, -74.7667],
            "PIOJO": [10.7833, -75.1167],
            "PIOJÓ": [10.7833, -75.1167],
            "POLONUEVO": [10.7667, -74.8500],
            "PONEDERA": [10.6333, -74.7500],
            "REPELON": [10.4833, -75.1333],
            "REPELÓN": [10.4833, -75.1333],
            "SABANALARGA": [10.6333, -75.0167],
            "SANTA LUCIA": [10.3000, -75.0833],
            "SANTA LUCÍA": [10.3000, -75.0833],
            "SANTO TOMAS": [10.7500, -74.7500],
            "SANTO TOMÁS": [10.7500, -74.7500],
            "SUAN": [10.5500, -75.0167],
            "SUÁN": [10.5500, -75.0167],
            "TUBARA": [10.8833, -75.0833],
            "TUBARÁ": [10.8833, -75.0833],
            "USIACURI": [10.7500, -75.0000],
            "USIACURÍ": [10.7500, -75.0000],
            
            // Municipios adicionales de Bolívar
            "ACHI": [8.9167, -74.6833],
            "ACHÍ": [8.9167, -74.6833],
            "ALTOS DEL ROSARIO": [9.5333, -75.0167],
            "ARENAL": [9.3167, -74.4667],
            "ARROYOHONDO": [10.2333, -75.3167],
            "BARRANCO DE LOBA": [9.2833, -74.4167],
            "BRAZUELO DE PAPAYAL": [9.7667, -74.8167],
            "CALAMAR": [10.2500, -74.9167],
            "CANTAGALLO": [7.3833, -73.9667],
            "CICUCO": [9.2667, -74.9667],
            "CLEMENCIA": [10.2167, -75.2833],
            "CORDOBA": [9.4333, -75.1833],
            "CÓRDOBA": [9.4333, -75.1833],
            "EL GUAMO": [8.9667, -74.7333],
            "EL PEÑON": [9.0333, -74.8500],
            "EL PEÑÓN": [9.0333, -74.8500],
            "HATILLO DE LOBA": [9.1667, -74.5000],
            "MAHATES": [10.1667, -75.1833],
            "MARGARITA": [10.2333, -75.4000],
            "MARIA LA BAJA": [10.0167, -75.2833],
            "MARÍA LA BAJA": [10.0167, -75.2833],
            "MONTECRISTO": [8.9333, -73.9667],
            "MORALES": [9.2667, -74.0167],
            "NOROSI": [8.6833, -74.1167],
            "NOROSÍ": [8.6833, -74.1167],
            "PINILLOS": [9.1833, -74.8333],
            "REGIDOR": [8.9167, -74.1667],
            "RIO VIEJO": [9.4167, -74.8833],
            "RÍO VIEJO": [9.4167, -74.8833],
            "SAN CRISTOBAL": [9.7833, -75.1000],
            "SAN CRISTÓBAL": [9.7833, -75.1000],
            "SAN ESTANISLAO": [10.1167, -75.1500],
            "SAN FERNANDO": [9.3167, -74.9667],
            "SAN JACINTO DEL CAUCA": [9.6667, -75.0833],
            "SAN JACINTO": [9.8500, -75.1167],
            "SAN JUAN NEPOMUCENO": [9.9500, -75.0833],
            "SAN MARTIN DE LOBA": [9.1500, -74.4333],
            "SAN MARTÍN DE LOBA": [9.1500, -74.4333],
            "SAN PABLO": [8.3000, -73.8833],
            "SANTA CATALINA": [9.2167, -75.1000],
            "SANTA ROSA": [9.6333, -75.2833],
            "SANTA ROSA DEL SUR": [8.0500, -74.0000],
            "SIMITI": [8.0167, -74.1500],
            "SIMITÍ": [8.0167, -74.1500],
            "SOPLAVIENTO": [10.1833, -75.1333],
            "TIQUISIO": [8.5500, -74.3000],
            "TURBANA": [10.3000, -75.4167],
            "TURBANÁ": [10.3000, -75.4167],
            "VILLANUEVA": [8.4333, -74.3500],
            "ZAMBRANO": [9.7500, -75.0833],
            
            // Municipios adicionales del archivo JSON
            "PUERTO CARREÑO": [6.1890, -67.4858],
            "SAN JOSE DEL GUAVIARE": [2.5722, -72.6459],
            "SAN JOSÉ DEL GUAVIARE": [2.5722, -72.6459],
            "MITU": [1.2581, -70.1734],
            "MITÚ": [1.2581, -70.1734],
            "LA CALERA": [4.7247, -73.9675],
            "AGUAZUL": [5.1686, -72.5525],
            "VILLANUEVA": [5.3014, -72.9853], // Casanare
            "MONTERREY": [4.7642, -72.8856],
            "TAURAMENA": [4.8317, -72.7436],
            "PORE": [5.6183, -72.0647],
            "PAZ DE ARIPORO": [5.8867, -71.8836],
            "HATO COROZAL": [6.1608, -71.4175],
            "TRINIDAD": [5.4456, -71.6606],
            "SAN LUIS DE PALENQUE": [5.4686, -71.1131],
            "OROCUE": [5.5644, -71.3356],
            "NUNCHIA": [5.7247, -71.7561],
            "NUNCHÍA": [5.7247, -71.7561],
            "RECETOR": [5.3656, -71.9281],
            "SACAMA": [5.3656, -71.9281],
            "SÁCAMA": [5.3656, -71.9281],
            "CHAMEZA": [5.1653, -72.0781],
            "LA SALINA": [5.3656, -71.9281],
            "TAMARA": [5.1831, -71.7031],
            "MANÍ": [4.8256, -72.3019],
            "MANI": [4.8256, -72.3019],
            
            // === DEPARTAMENTO DE BOYACÁ ===
            "DUITAMA": [5.8270, -73.0342],
            "SOGAMOSO": [5.7167, -72.9333],
            "CHIQUINQUIRÁ": [5.6167, -73.8167],
            "CHIQUINQUIRA": [5.6167, -73.8167],
            "VILLA DE LEYVA": [5.6333, -73.5333],
            "PAIPA": [5.7833, -73.1167],
            "NOBSA": [5.7667, -72.9500],
            "TIBASOSA": [5.7500, -73.0000],
            "MONGUÍ": [5.7333, -72.8500],
            "MONGUI": [5.7333, -72.8500],
            "TÓPAGA": [5.7167, -72.8000],
            "TOPAGA": [5.7167, -72.8000],
            "GÁMEZA": [5.6833, -72.7167],
            "GAMEZA": [5.6833, -72.7167],
            "MONIQUIRÁ": [5.8833, -73.5833],
            "MONIQUIRA": [5.8833, -73.5833],
            "BARBOSA": [5.9167, -73.6167],
            "VÉLEZ": [6.0167, -73.6667],
            "VELEZ": [6.0167, -73.6667],
            "PUERTO BOYACÁ": [5.9667, -74.5833],
            "PUERTO BOYACA": [5.9667, -74.5833],
            "OTANCHE": [6.1500, -74.1833],
            "MUZO": [5.5333, -74.1167],
            
            // === DEPARTAMENTO DE CALDAS ===
            "CHINCHINÁ": [4.9833, -75.6167],
            "CHINCHINA": [4.9833, -75.6167],
            "VILLAMARÍA": [5.0333, -75.5167],
            "VILLAMARIA": [5.0333, -75.5167],
            "LA DORADA": [5.4500, -74.6667],
            "RIOSUCIO": [5.4167, -75.7167],
            "ANSERMA": [5.2333, -75.7833],
            "SUPÍA": [5.4500, -75.6833],
            "SUPIA": [5.4500, -75.6833],
            "MARMATO": [5.4833, -75.6500],
            "ARANZAZU": [5.2667, -75.4833],
            "SALAMINA": [5.4167, -75.4833],
            "PÁCORA": [5.5167, -75.4667],
            "PACORA": [5.5167, -75.4667],
            "AGUADAS": [5.6167, -75.4667],
            "NEIRA": [5.1833, -75.5167],
            "PALESTINA": [5.0500, -75.6833],
            "VITERBO": [5.0833, -76.1333],
            "BELALCÁZAR": [5.2000, -76.0000],
            "BELALCAZAR": [5.2000, -76.0000],
            "RISARALDA": [5.2167, -75.9000],
            "SAN JOSÉ": [5.1000, -75.7000],
            "SAN JOSE": [5.1000, -75.7000],
            "LA MERCED": [5.3667, -75.8833],
            "SAMANÁ": [5.3000, -75.0167],
            "SAMANA": [5.3000, -75.0167],
            "VICTORIA": [5.3333, -74.9000],
            "NORCASIA": [5.5833, -74.8833],
            "MARQUETALIA": [5.2833, -75.0167],
            "MANZANARES": [5.2500, -75.1500],
            "PENSILVANIA": [5.4000, -75.1667],
            "FILADELFIA": [5.3167, -75.3167],
            "MARULANDA": [5.2833, -75.2333],
            
            // === DEPARTAMENTO DE CAQUETÁ ===
            "BELÉN DE LOS ANDAQUÍES": [1.4167, -75.8500],
            "BELEN DE LOS ANDAQUIES": [1.4167, -75.8500],
            "LA MONTAÑITA": [1.5333, -75.4167],
            "LA MONTANITA": [1.5333, -75.4167],
            "EL PAUJIL": [1.5333, -75.1333],
            "MORELIA": [1.4833, -75.3167],
            "MILÁN": [1.2833, -75.5167],
            "MILAN": [1.2833, -75.5167],
            "SAN VICENTE DEL CAGUÁN": [2.1167, -74.7667],
            "SAN VICENTE DEL CAGUAN": [2.1167, -74.7667],
            "CARTAGENA DEL CHAIRÁ": [1.3500, -74.8667],
            "CARTAGENA DEL CHAIRA": [1.3500, -74.8667],
            "PUERTO RICO": [1.9167, -75.1333],
            "SOLANO": [0.9500, -74.9167],
            "VALPARAÍSO": [1.2333, -76.4000],
            "VALPARAISO": [1.2333, -76.4000],
            "CURILLO": [1.4333, -76.0833],
            "SOLITA": [1.0833, -75.6833],
            "ALBANIA": [1.8333, -74.8833],
            
            // === DEPARTAMENTO DE CAUCA ===
            "PATÍA": [2.0833, -76.9833],
            "PATIA": [2.0833, -76.9833],
            "PUERTO TEJADA": [3.2333, -76.4167],
            "VILLA RICA": [3.1667, -76.4833],
            "PADILLA": [3.0833, -76.6000],
            "CORINTO": [3.1833, -76.2667],
            "MIRANDA": [3.2500, -76.2333],
            "TORIBÍO": [3.0833, -76.0333],
            "TORIBIO": [3.0833, -76.0333],
            "CAJIBÍO": [2.5833, -76.6167],
            "CAJIBIO": [2.5833, -76.6167],
            "PIENDAMÓ": [2.6500, -76.9833],
            "PIENDAMO": [2.6500, -76.9833],
            "MORALES": [3.0333, -76.6167],
            "SUÁREZ": [2.9167, -76.7000],
            "SUAREZ": [2.9167, -76.7000],
            "BUENOS AIRES": [3.0167, -76.8333],
            "CALOTO": [3.1167, -76.4833],
            "GUACHENÉ": [3.1167, -76.3833],
            "GUACHENE": [3.1167, -76.3833],
            "SILVIA": [2.6167, -76.3833],
            "TIMBÍO": [2.3500, -76.6833],
            "TIMBIO": [2.3500, -76.6833],
            "ROSAS": [2.2833, -77.1333],
            "LA SIERRA": [2.3167, -77.0833],
            "SOTARÁ": [2.1167, -76.6333],
            "SOTARA": [2.1167, -76.6333],
            "TARQUI": [1.8667, -76.7333],
            "LA VEGA": [2.1833, -77.0167],
            "MERCADERES": [2.2333, -77.1833],
            "FLORENCIA": [1.8500, -76.8667], // Cauca
            "BOLÍVAR": [1.8667, -77.0167],
            "BOLIVAR": [1.8667, -77.0167],
            "BALBOA": [1.9167, -77.2667],
            "ARGELIA": [2.3667, -76.9667],
            "EL TAMBO": [2.4500, -76.8000],
            "PURACÉ": [2.3167, -76.4000],
            "PURACE": [2.3167, -76.4000],
            "COCONUCO": [2.3667, -76.3667],
            "INZÁ": [2.5500, -76.0667],
            "INZA": [2.5500, -76.0667],
            "BELALCÁZAR": [2.7833, -76.0333], // Cauca
            "BELALCAZAR": [2.7833, -76.0333], // Cauca
            "PÁEZ": [2.8000, -75.9333],
            "PAEZ": [2.8000, -75.9333],
            "CALDONO": [2.8167, -76.4833],
            "JAMBALÓ": [2.7833, -76.4333],
            "JAMBALO": [2.7833, -76.4333],
            
            // === DEPARTAMENTO DE CHOCÓ ===
            "APARTADÓ": [7.8833, -76.6333], // Antioquia pero cerca de Chocó
            "TURBO": [8.0833, -76.7333], // Antioquia pero cerca de Chocó  
            "ACANDÍ": [8.5167, -77.2833],
            "ACANDI": [8.5167, -77.2833],
            "UNGUÍA": [8.0333, -77.0833],
            "UNGUIA": [8.0333, -77.0833],
            "RIOSUCIO": [7.4333, -77.1167], // Chocó
            "BAGADÓ": [5.4167, -76.3833],
            "BAGADO": [5.4167, -76.3833],
            "BAHÍA SOLANO": [6.2167, -77.3667],
            "BAHIA SOLANO": [6.2167, -77.3667],
            "BOJAYÁ": [6.5833, -76.8000],
            "BOJAYA": [6.5833, -76.8000],
            "EL CANTÓN DEL SAN PABLO": [5.3167, -76.6500],
            "EL CANTON DEL SAN PABLO": [5.3167, -76.6500],
            "CONDOTO": [5.0833, -76.6500],
            "EL CARMEN DE ATRATO": [6.0833, -76.1167],
            "EL CARMEN DE ATRATO": [6.0833, -76.1167],
            "ISTMINA": [5.1667, -76.6833],
            "JURADÓ": [7.1167, -77.7667],
            "JURADO": [7.1167, -77.7667],
            "LLORÓ": [5.5000, -76.5333],
            "LLORO": [5.5000, -76.5333],
            "MEDIO ATRATO": [6.0000, -76.7333],
            "NÓVITA": [4.9500, -76.6000],
            "NOVITA": [4.9500, -76.6000],
            "NUQUÍ": [5.7000, -77.2833],
            "NUQUI": [5.7000, -77.2833],
            "RIOSUCIO": [7.4333, -77.1167],
            "SAN JOSÉ DEL PALMAR": [4.9000, -76.2167],
            "SAN JOSE DEL PALMAR": [4.9000, -76.2167],
            "SIPÍ": [4.7667, -76.5167],
            "SIPI": [4.7667, -76.5167],
            "TADÓ": [5.2667, -76.7333],
            "TADO": [5.2667, -76.7333],
            "UNIÓN PANAMERICANA": [5.3333, -76.6000],
            "UNION PANAMERICANA": [5.3333, -76.6000],
            
            // === DEPARTAMENTO DE HUILA ===
            "GARZÓN": [2.2000, -75.6500],
            "GARZON": [2.2000, -75.6500],
            "LA PLATA": [2.3833, -75.8833],
            "CAMPOALEGRE": [2.6833, -75.3167],
            "ALGECIRAS": [2.5333, -75.2667],
            "GIGANTE": [2.3833, -75.5333],
            "GUADALUPE": [2.5167, -75.7333],
            "HOBO": [2.5833, -75.7000],
            "ÍQUIRA": [2.6167, -75.8167],
            "IQUIRA": [2.6167, -75.8167],
            "NÁTAGA": [2.4000, -75.7167],
            "NATAGA": [2.4000, -75.7167],
            "OPORAPA": [2.1167, -75.9333],
            "PAICOL": [2.4333, -75.7833],
            "PALESTINA": [2.8000, -75.7333], // Huila
            "RIVERA": [2.7667, -75.2833],
            "SALADOBLANCO": [2.0333, -76.1833],
            "SAN AGUSTÍN": [1.8833, -76.2667],
            "SAN AGUSTIN": [1.8833, -76.2667],
            "SANTA MARÍA": [2.9500, -75.0833],
            "SANTA MARIA": [2.9500, -75.0833],
            "SUAZA": [2.1167, -75.8000],
            "TARQUI": [2.0333, -75.8333], // Huila
            "TESALIA": [2.4833, -75.9000],
            "TELLO": [3.0000, -75.3833],
            "TERUEL": [3.0833, -75.0833],
            "TIMANÁ": [1.9667, -75.9167],
            "TIMANA": [1.9667, -75.9167],
            "VILLAVIEJA": [3.2167, -75.2333],
            "YAGUARÁ": [2.6500, -75.5167],
            "YAGUARA": [2.6500, -75.5167],
            "BARAYA": [3.1167, -75.1000],
            "COLOMBIA": [3.2333, -75.0333],
            "ELÍAS": [2.8167, -75.4167],
            "ELIAS": [2.8167, -75.4167],
            "ISNOS": [1.9167, -76.2500],
            "AIPE": [3.2167, -75.2500],
            "ALTAMIRA": [2.3000, -76.0333],
            
            // === DEPARTAMENTO DE META ===
            "ACACÍAS": [3.9833, -73.7667],
            "ACACIAS": [3.9833, -73.7667],
            "BARRANCA DE UPÍA": [4.6667, -72.6000],
            "BARRANCA DE UPIA": [4.6667, -72.6000],
            "CABUYARO": [4.2833, -72.7833],
            "CASTILLA LA NUEVA": [3.8167, -73.6833],
            "CUBARRAL": [3.7833, -73.8333],
            "CUMARAL": [4.2667, -73.4833],
            "EL CALVARIO": [4.3167, -73.6667],
            "EL CASTILLO": [3.6167, -73.8000],
            "EL DORADO": [3.6833, -73.6333],
            "FUENTE DE ORO": [3.4500, -73.6167],
            "GRANADA": [3.5333, -73.7167],
            "GUAMAL": [3.8667, -73.7667], // Meta
            "LA MACARENA": [2.1667, -73.7833],
            "LEJANÍAS": [3.5333, -74.0000],
            "LEJANIAS": [3.5333, -74.0000],
            "MAPIRIPÁN": [2.8833, -72.1333],
            "MAPIRIPAN": [2.8833, -72.1333],
            "MESETAS": [3.4000, -74.0833],
            "LA URIBE": [3.3500, -73.9500],
            "PUERTO CONCORDIA": [2.6667, -72.8333],
            "PUERTO GAITÁN": [4.3167, -72.0833],
            "PUERTO GAITAN": [4.3167, -72.0833],
            "PUERTO LLERAS": [3.2833, -73.3833],
            "PUERTO LÓPEZ": [4.0833, -72.9667],
            "PUERTO LOPEZ": [4.0833, -72.9667],
            "PUERTO RICO": [2.9333, -74.4833], // Meta
            "RESTREPO": [4.2500, -73.5667],
            "SAN CARLOS DE GUAROA": [3.9667, -73.2333],
            "SAN JUANITO": [4.8000, -73.6833],
            "SAN MARTÍN": [3.6833, -73.7000],
            "SAN MARTIN": [3.6833, -73.7000],
            "URIBE": [3.3500, -73.9500],
            "VISTA HERMOSA": [2.9167, -73.6333],
            
            // === DEPARTAMENTO DE NARIÑO ===
            "BARBACOAS": [1.6667, -78.1500],
            "ROBERTO PAYÁN": [1.8500, -78.3333],
            "ROBERTO PAYAN": [1.8500, -78.3333],
            "MAGÜÍ PAYÁN": [1.7500, -78.4000],
            "MAGUI PAYAN": [1.7500, -78.4000],
            "EL CHARCO": [2.4833, -78.1000],
            "LA TOLA": [2.6167, -78.4167],
            "MOSQUERA": [1.8333, -78.4667], // Nariño
            "OLAYA HERRERA": [2.3500, -78.4333],
            "FRANCISCO PIZARRO": [2.0500, -78.6500],
            "SANTA BÁRBARA": [1.2333, -77.7167],
            "SANTA BARBARA": [1.2333, -77.7167],
            "SAMANIEGO": [1.3500, -77.5833],
            "RICAURTE": [1.2000, -78.1167],
            "MALLAMA": [0.9167, -77.8667],
            "SANTACRUZ": [0.9833, -77.2833],
            "GUACHUCAL": [1.0000, -77.7000],
            "CUMBAL": [0.9167, -77.8167],
            "ALDANA": [0.8333, -77.6833],
            "CONTADERO": [1.0000, -77.4333],
            "GUALMATÁN": [0.9167, -77.4833],
            "GUALMATAN": [0.9167, -77.4833],
            "PUPIALES": [0.8833, -77.6500],
            "CÓRDOBA": [1.1667, -77.4167], // Nariño
            "CORDOBA": [1.1667, -77.4167], // Nariño
            "POTOSÍ": [0.8000, -77.5667],
            "POTOSI": [0.8000, -77.5667],
            "CUASPUD": [0.8500, -77.9000],
            "CARLOSAMA": [0.8833, -77.7167],
            "FUNES": [1.0333, -77.3167],
            "ILES": [1.0500, -77.4500],
            "IMUÉS": [0.9833, -77.4833],
            "IMUES": [0.9833, -77.4833],
            "OSPINA": [1.0500, -77.5167],
            "PUERRES": [1.0000, -77.2333],
            "SAN PEDRO DE CARTAGO": [1.0167, -77.3500],
            "TANGUA": [1.1000, -77.1333],
            "YACUANQUER": [1.1167, -77.4000],
            
            // === DEPARTAMENTO DE NORTE DE SANTANDER ===
            "TIBÚ": [8.6500, -72.7333],
            "TIBU": [8.6500, -72.7333],
            "EL TARRA": [8.4167, -73.0833],
            "TEORAMA": [8.2667, -73.0167],
            "CONVENCIÓN": [8.4167, -73.2500],
            "CONVENCION": [8.4167, -73.2500],
            "EL CARMEN": [8.2833, -73.4500],
            "HACARÍ": [8.3167, -73.3000],
            "HACARI": [8.3167, -73.3000],
            "LA PLAYA": [8.3000, -73.6167],
            "SAN CALIXTO": [8.3833, -73.2833],
            "VILLACARO": [8.2000, -73.3167],
            "ÁBREGO": [8.1167, -73.2167],
            "ABREGO": [8.1167, -73.2167],
            "LA ESPERANZA": [8.0167, -73.3667],
            "SARDINATA": [7.8667, -72.9000],
            "PUERTO SANTANDER": [7.8333, -72.4167],
            "VILLA DEL ROSARIO": [7.8333, -72.4667],
            "LOS PATIOS": [7.8500, -72.5000],
            "RAGONVALIA": [7.6167, -72.5000],
            "TOLEDO": [7.2833, -72.4167],
            "HERRÁN": [7.7000, -72.4000],
            "HERRAN": [7.7000, -72.4000],
            "DURANIA": [7.7500, -72.6500],
            "LABATECA": [7.5167, -72.5167],
            "CHINÁCOTA": [7.6000, -72.6000],
            "CHINACOTA": [7.6000, -72.6000],
            "BOCHALEMA": [7.3667, -72.6500],
            "CUCUTILLA": [7.4833, -72.8000],
            "PAMPLONA": [7.3833, -72.6500],
            "PAMPLONITA": [7.4500, -72.6333],
            "MUTISCUA": [7.3333, -72.7167],
            "SILOS": [7.2000, -72.7500],
            "CÁCOTA": [7.2833, -72.6500],
            "CACOTA": [7.2833, -72.6500],
            "CHITAGÁ": [7.1167, -72.5833],
            "CHITAGA": [7.1167, -72.5833],
            
            // === DEPARTAMENTO DE PUTUMAYO ===
            "ORITO": [0.7667, -76.8500],
            "VALLE DEL GUAMUEZ": [0.6500, -76.9000],
            "SAN MIGUEL": [0.2500, -76.7833],
            "VILLA GARZÓN": [0.6667, -76.6167],
            "VILLA GARZON": [0.6667, -76.6167],
            "PUERTO CAICEDO": [0.1667, -76.9333],
            "PUERTO ASÍS": [0.5167, -76.5167],
            "PUERTO ASIS": [0.5167, -76.5167],
            "PUERTO GUZMÁN": [1.0167, -76.5333],
            "PUERTO GUZMAN": [1.0167, -76.5333],
            "PUERTO LEGUÍZAMO": [0.2000, -74.7833],
            "PUERTO LEGUIZAMO": [0.2000, -74.7833],
            "SIBUNDOY": [1.1667, -76.8833],
            "SANTIAGO": [1.1333, -76.9000],
            "COLÓN": [1.2000, -76.9833],
            "COLON": [1.2000, -76.9833],
            "SAN FRANCISCO": [1.1500, -76.8667]

        }; // Total: ~800+ municipios con coordenadas
        
        // Inicializar mapa
        initializeMap();
        
        // Setup event listeners
        setupEventListeners();
        
        // Mostrar mensaje inicial
        showInitialMessage();
        
        // Ocultar loading inicial
        hideLoading();
        
        console.log('Dashboard inicializado correctamente');
        
    } catch (error) {
        console.error('Error al inicializar la aplicación:', error);
        hideLoading();
        showError();
    }
}

/**
 * Muestra mensaje inicial para que el usuario cargue un archivo
 */
function showInitialMessage() {
    dataTitle.textContent = 'Seleccione un archivo XLSX para comenzar';
    dataCount.textContent = '';
    dataContainer.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📄</div><p>Cargue un archivo XLSX para ver las licitaciones</p></div>';
}

/**
 * Procesa el archivo XLSX seleccionado
 */
async function processFile() {
    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor seleccione un archivo XLSX');
        return;
    }
    
    try {
        showLoading();
        hideError();
        
        // Cargar datos del archivo
        const xlsxData = await loadXLSXFromFile(file);
        
        // Inicializar con los datos
        rawData = xlsxData;
        filteredData = [...rawData];
        
        // Actualizar todas las visualizaciones
        populateProcessFilter();
        updateKPIs();
        updateChart();
        updateDataDisplay();
        updateHeatmap();
        
        hideLoading();
        
    } catch (error) {
        console.error('Error al procesar archivo:', error);
        showError();
    }
}

/**
 * Eliminar función loadXLSXData ya que ahora solo usamos loadXLSXFromFile
 */

/**
 * Carga un archivo XLSX desde un input de archivo
 */
async function loadXLSXFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const arrayBuffer = e.target.result;
                const workbook = XLSX.read(arrayBuffer, { type: 'array' });
                
                // Tomar la primera hoja
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                
                // Convertir a JSON
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                    header: 1,
                    defval: ''
                });
                
                if (jsonData.length < 2) {
                    throw new Error('El archivo XLSX no contiene suficientes datos');
                }
                
                const headers = jsonData[0].map(h => String(h).trim());
                const data = [];
                
                for (let i = 1; i < jsonData.length; i++) {
                    const row = jsonData[i];
                    const rowData = {};
                    
                    headers.forEach((header, index) => {
                        rowData[header] = row[index] ? String(row[index]).trim() : '';
                    });
                    
                    if (Object.values(rowData).some(value => value !== '')) {
                        data.push(rowData);
                    }
                }
                
                console.log(`Archivo cargado: ${data.length} registros con ${headers.length} columnas`);
                resolve(data);
                
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = function() {
            reject(new Error('Error al leer el archivo'));
        };
        
        reader.readAsArrayBuffer(file);
    });
}

/**
 * Normaliza el nombre de una columna para facilitar la búsqueda
 */
function normalizeColumnName(name) {
    return String(name).trim().toUpperCase().replace(/\s+/g, ' ');
}

/**
 * Busca una columna por nombre, considerando variaciones comunes
 */
function findColumn(data, ...possibleNames) {
    if (!data || data.length === 0) return null;
    
    const firstRow = data[0];
    for (const name of possibleNames) {
        const normalizedTarget = normalizeColumnName(name);
        
        for (const key of Object.keys(firstRow)) {
            const normalizedKey = normalizeColumnName(key);
            if (normalizedKey === normalizedTarget) {
                return key;
            }
        }
    }
    return null;
}

/**
 * Obtiene el valor de una columna considerando variaciones en el nombre
 */
function getColumnValue(row, ...possibleNames) {
    for (const name of possibleNames) {
        if (row[name] !== undefined && row[name] !== null && String(row[name]).trim() !== '') {
            return String(row[name]).trim();
        }
    }
    return '';
}

/**
 * Formatea documentos de identidad (NITs y CCRPs) eliminando puntos pero conservando guiones
 */
function formatDocument(document) {
    if (!document || document.trim() === '') return '';
    // Eliminar puntos pero conservar guiones
    return String(document).replace(/\./g, '').trim();
}

/**
 * Inicializa el mapa de Colombia
 */
function initializeMap() {
    // Coordenadas del centro de Colombia
    const colombiaCenter = [4.5709, -74.2973];
    
    colombiaMap = L.map('colombia-map', {
        center: colombiaCenter,
        zoom: 6,
        scrollWheelZoom: true,
        dragging: true
    });
    
    // Agregar capa de tiles de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(colombiaMap);
}

/**
 * Puebla el filtro de procesos
 */
function populateProcessFilter() {
    const procesos = [...new Set(rawData.map(row => getColumnValue(row, 'PROCESO')))].filter(Boolean).sort();
    
    procesosFilter.innerHTML = '<option value="">Todos los procesos</option>';
    
    procesos.forEach(proceso => {
        const option = document.createElement('option');
        option.value = proceso;
        option.textContent = proceso;
        procesosFilter.appendChild(option);
    });
}

/**
 * Actualiza las métricas KPI
 */
function updateKPIs() {
    const dataToAnalyze = filteredData.length > 0 ? filteredData : rawData;
    
    // Total de procesos únicos
    const uniqueProcesses = new Set(dataToAnalyze.map(row => getColumnValue(row, 'PROCESO')).filter(Boolean));
    totalProcesosEl.textContent = uniqueProcesses.size;
    
    // Total de proponentes únicos
    const uniqueProponentes = new Set(dataToAnalyze.map(row => getColumnValue(row, 'PROPONENTE')).filter(Boolean));
    totalProponentesEl.textContent = uniqueProponentes.size;
    
    // Total de empresas únicas (de todas las columnas EMPRESA)
    const empresas = new Set();
    dataToAnalyze.forEach(row => {
        for (let i = 1; i <= 4; i++) {
            const empresa = getColumnValue(row, `EMPRESA ${i}`, `EMPRESA${i}`);
            if (empresa) {
                empresas.add(empresa);
            }
        }
    });
    totalEmpresasEl.textContent = empresas.size;
}

/**
 * Actualiza el gráfico de Chart.js
 */
function updateChart() {
    const dataToAnalyze = filteredData.length > 0 ? filteredData : rawData;
    
    // Contar frecuencia de empresas (todas las columnas EMPRESA 1,2,3,4)
    const empresaCount = {};
    dataToAnalyze.forEach(row => {
        for (let i = 1; i <= 4; i++) {
            const empresa = getColumnValue(row, `EMPRESA ${i}`, `EMPRESA${i}`);
            if (empresa) {
                empresaCount[empresa] = (empresaCount[empresa] || 0) + 1;
            }
        }
    });
    
    // Obtener top 5 empresas
    const sortedEmpresas = Object.entries(empresaCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    const labels = sortedEmpresas.map(([nombre]) => 
        nombre.length > 30 ? nombre.substring(0, 30) + '...' : nombre
    );
    const data = sortedEmpresas.map(([, count]) => count);
    const colors = [
        '#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'
    ];
    
    const ctx = document.getElementById('proponentes-chart').getContext('2d');
    
    if (proponentesChart) {
        proponentesChart.destroy();
    }
    
    proponentesChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: colors.map(color => color + '80'),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 10,
                        font: {
                            size: 11
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            return data.labels.map((label, i) => ({
                                text: `${label} (${data.datasets[0].data[i]})`,
                                fillStyle: data.datasets[0].backgroundColor[i],
                                strokeStyle: data.datasets[0].borderColor[i],
                                lineWidth: 2,
                                hidden: false,
                                index: i
                            }));
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const fullName = sortedEmpresas[context.dataIndex][0];
                            const count = context.parsed;
                            return `${fullName}: ${count} participaciones`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Actualiza la visualización de datos con cards jerárquicos
 */
function updateDataDisplay() {
    const dataToShow = filteredData.length > 0 ? filteredData : rawData;
    
    // Actualizar título y contador
    const currentFilter = procesosFilter.value;
    const currentSearch = searchInput.value.trim();
    
    let title = 'Datos de Licitaciones';
    if (currentFilter) {
        title = `Proceso: ${currentFilter}`;
    } else if (currentSearch) {
        title = `Búsqueda de Empresa: ${currentSearch}`;
    }
    
    dataTitle.textContent = title;
    dataCount.textContent = `(${dataToShow.length} registros)`;
    
    // Agrupar datos por proceso
    const procesoGroups = {};
    dataToShow.forEach(row => {
        const proceso = getColumnValue(row, 'PROCESO');
        if (!proceso) return;
        
        if (!procesoGroups[proceso]) {
            procesoGroups[proceso] = {
                objeto: getColumnValue(row, 'OBJETO'),
                secretaria: getColumnValue(row, 'SECRETARIA'),
                proponentes: {}
            };
        }
        
        const proponente = getColumnValue(row, 'PROPONENTE');
        if (!proponente) return;
        
        if (!procesoGroups[proceso].proponentes[proponente]) {
            procesoGroups[proceso].proponentes[proponente] = [];
        }
        
        // Agregar empresas del proponente
        for (let i = 1; i <= 4; i++) {
            const empresa = getColumnValue(row, `EMPRESA ${i}`, `EMPRESA${i}`);
            const nit = formatDocument(getColumnValue(row, `NIT ${i}`, `NIT${i}`));
            const ccrp = formatDocument(getColumnValue(row, `CCRP${i}`, `CCRP ${i}`));
            const municipio = getColumnValue(row, `MUNICIPIO ${i}`, `MUNICIPIO${i}`);
            
            if (empresa) {
                procesoGroups[proceso].proponentes[proponente].push({
                    empresa,
                    nit,
                    ccrp,
                    municipio
                });
            }
        }
    });
    
    // Generar HTML
    let html = '';
    
    if (Object.keys(procesoGroups).length === 0) {
        html = '<div class="empty-state"><div class="empty-state-icon">🔍</div><p>No se encontraron datos que coincidan con los filtros</p></div>';
    } else {
        Object.entries(procesoGroups).forEach(([proceso, data]) => {
            const proponenteCount = Object.keys(data.proponentes).length;
            const empresaCount = Object.values(data.proponentes).reduce((total, empresas) => total + empresas.length, 0);
            
            html += createLicitacionCard(proceso, data, proponenteCount, empresaCount);
        });
    }
    
    dataContainer.innerHTML = html;
}

/**
 * Crea una tarjeta de licitación
 */
function createLicitacionCard(proceso, data, proponenteCount, empresaCount) {
    let cardHtml = `
        <div class="licitacion-card">
            <div class="licitacion-header" onclick="toggleLicitacion(this)">
                <h3 class="licitacion-title">${proceso}</h3>
                <div class="licitacion-stats">
                    <div class="stat-badge">
                        <span>👥</span>
                        <span>${proponenteCount} Proponente${proponenteCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="stat-badge">
                        <span>🏢</span>
                        <span>${empresaCount} Empresa${empresaCount !== 1 ? 's' : ''}</span>
                    </div>
                    <div class="toggle-icon">▼</div>
                </div>
            </div>
            
            <div class="licitacion-content">
                <div class="licitacion-object">
                    <strong>Objeto:</strong> ${data.objeto || 'No especificado'}
                </div>
                
                <div class="proponentes-container">
    `;
    
    Object.entries(data.proponentes).forEach(([proponente, empresas]) => {
        cardHtml += `
            <div class="proponente-card">
                <div class="proponente-header">
                    <div class="proponente-name">${proponente}</div>
                    <div class="empresa-count">${empresas.length} Empresa${empresas.length !== 1 ? 's' : ''}</div>
                </div>
                
                <div class="empresas-list">
        `;
        
        empresas.forEach(emp => {
            cardHtml += `
                <div class="empresa-item">
                    <div class="empresa-info">
                        <div class="empresa-name">${emp.empresa}</div>
                        <div class="empresa-details">
                            ${emp.nit ? `<span><strong>NIT:</strong> ${emp.nit}</span>` : ''}
                            ${emp.ccrp ? `<span><strong>CCRP:</strong> ${emp.ccrp}</span>` : ''}
                        </div>
                    </div>
                    ${emp.municipio ? `<div class="empresa-location">${emp.municipio}</div>` : ''}
                </div>
            `;
        });
        
        cardHtml += `
                </div>
            </div>
        `;
    });
    
    cardHtml += `
                </div>
            </div>
        </div>
    `;
    
    return cardHtml;
}

/**
 * Función para expandir/contraer licitaciones
 */
function toggleLicitacion(header) {
    const card = header.parentElement;
    const content = card.querySelector('.licitacion-content');
    
    if (card.classList.contains('expanded')) {
        // Contraer
        content.style.maxHeight = '0px';
        card.classList.remove('expanded');
    } else {
        // Expandir - calcular altura real del contenido
        card.classList.add('expanded');
        
        // Obtener la altura real del contenido
        const scrollHeight = content.scrollHeight;
        content.style.maxHeight = scrollHeight + 'px';
        
        // Limpiar la altura después de la transición para permitir redimensionado
        setTimeout(() => {
            if (card.classList.contains('expanded')) {
                content.style.maxHeight = 'none';
            }
        }, 400); // Coincide con la duración de la transición CSS
    }
}

/**
 * Actualiza el mapa de calor
 */
function updateHeatmap() {
    if (!colombiaMap) {
        console.log('Mapa no inicializado');
        return;
    }
    
    // Remover capas anteriores si existen
    if (heatmapLayer) {
        colombiaMap.removeLayer(heatmapLayer);
        heatmapLayer = null;
    }
    
    // Limpiar marcadores anteriores
    colombiaMap.eachLayer(function(layer) {
        if (layer instanceof L.CircleMarker) {
            colombiaMap.removeLayer(layer);
        }
    });
    
    const dataToAnalyze = filteredData.length > 0 ? filteredData : rawData;
    
    if (!dataToAnalyze || dataToAnalyze.length === 0) {
        console.log('No hay datos para analizar en el mapa');
        return;
    }
    
    console.log(`Analizando ${dataToAnalyze.length} registros para el mapa`);
    
    const municipioCount = {};
    
    // Contar ocurrencias por municipio
    dataToAnalyze.forEach(row => {
        for (let i = 1; i <= 4; i++) {
            const municipio = getColumnValue(row, `MUNICIPIO ${i}`, `MUNICIPIO${i}`);
            if (municipio) {
                const municipioNorm = municipio.toUpperCase().trim();
                municipioCount[municipioNorm] = (municipioCount[municipioNorm] || 0) + 1;
            }
        }
    });
    
    console.log('Municipios encontrados:', municipioCount);
    
    // Debug: mostrar algunos municipios específicos
    if (municipioCount['BARRANCABERMEJA']) {
        console.log('✅ BARRANCABERMEJA encontrado:', municipioCount['BARRANCABERMEJA']);
    }
    if (municipioCount['CAJICÁ'] || municipioCount['CAJICA']) {
        console.log('✅ CAJICÁ encontrado:', municipioCount['CAJICÁ'] || municipioCount['CAJICA']);
    }
    
    // Mostrar municipios que NO tienen coordenadas
    const municipiosSinCoordenadas = Object.keys(municipioCount).filter(m => !municipiosCoords[m]);
    if (municipiosSinCoordenadas.length > 0) {
        console.log('❌ Municipios sin coordenadas:', municipiosSinCoordenadas);
    }
    
    // Crear puntos para el heatmap
    const heatPoints = [];
    const foundMunicipios = [];
    const notFoundMunicipios = [];
    
    Object.entries(municipioCount).forEach(([municipio, count]) => {
        const coords = municipiosCoords[municipio];
        if (coords) {
            foundMunicipios.push({municipio, count, coords});
            // Intensidad basada en la cantidad (normalizada entre 0.3 y 1.0)
            const maxCount = Math.max(...Object.values(municipioCount));
            const intensity = 0.3 + (count / maxCount) * 0.7;
            heatPoints.push([coords[0], coords[1], intensity]);
        } else {
            notFoundMunicipios.push({municipio, count});
        }
    });
    
    console.log(`Municipios con coordenadas: ${foundMunicipios.length}`);
    console.log('Encontrados:', foundMunicipios);
    console.log(`Municipios sin coordenadas: ${notFoundMunicipios.length}`);
    if (notFoundMunicipios.length > 0) {
        console.log('No encontrados:', notFoundMunicipios);
    }
    
    // Actualizar información de municipios sin coordenadas en el mapa
    updateMissingCoordsInfo(notFoundMunicipios);
    
    // Ya no creamos heatmap, solo círculos con colores
    
    // Calcular umbrales para colores
    const counts = Object.values(municipioCount);
    const sortedCounts = counts.sort((a, b) => b - a);
    const percentile90 = sortedCounts[Math.floor(sortedCounts.length * 0.1)] || Math.max(...counts);
    const percentile75 = sortedCounts[Math.floor(sortedCounts.length * 0.25)] || Math.max(...counts);
    const percentile50 = sortedCounts[Math.floor(sortedCounts.length * 0.5)] || (counts.reduce((a, b) => a + b, 0) / counts.length);
    
    // Agregar marcadores con colores según concentración
    foundMunicipios.forEach(({municipio, count, coords}) => {
        // Determinar color según concentración
        let color, fillColor, description;
        
        if (count >= percentile90) {
            color = '#d73027';      // Rojo oscuro
            fillColor = '#ff4444';  // Rojo
            description = 'Alta concentración';
        } else if (count >= percentile75) {
            color = '#fd8d3c';      // Naranja oscuro
            fillColor = '#ff9944';  // Naranja
            description = 'Media-alta concentración';
        } else if (count >= percentile50) {
            color = '#fed976';      // Amarillo oscuro
            fillColor = '#ffdd44';  // Amarillo
            description = 'Media concentración';
        } else {
            color = '#2563eb';      // Azul oscuro
            fillColor = '#3b82f6';  // Azul
            description = 'Baja concentración';
        }
        
        const marker = L.circleMarker([coords[0], coords[1]], {
            radius: Math.max(Math.min(count * 2 + 8, 25), 8),
            color: color,
            fillColor: fillColor,
            fillOpacity: 0.8,
            weight: 2
        });
        
        marker.bindPopup(`
            <div style="font-family: system-ui; padding: 8px;">
                <strong>${municipio}</strong><br>
                ${count} ${count === 1 ? 'empresa registrada' : 'empresas registradas'}<br>
                <span style="color: ${color}; font-weight: bold;">${description}</span>
            </div>
        `);
        
        marker.addTo(colombiaMap);
        
        console.log(`${municipio}: ${count} empresas - ${description} (${color})`);
    });
    
    console.log('Mapa actualizado correctamente');
}

/**
 * Actualiza la información de municipios sin coordenadas en la UI
 */
function updateMissingCoordsInfo(notFoundMunicipios) {
    if (!mapMissingCoordsEl || !missingCoordsCountEl) return;
    
    const count = notFoundMunicipios.length;
    
    if (count === 0) {
        // Ocultar si no hay municipios sin coordenadas
        mapMissingCoordsEl.style.display = 'none';
    } else {
        // Mostrar información con el conteo
        missingCoordsCountEl.textContent = count;
        mapMissingCoordsEl.style.display = 'block';
        
        // Opcional: agregar título con lista de municipios
        if (count <= 5) {
            const municipiosList = notFoundMunicipios.map(m => m.municipio).join(', ');
            mapMissingCoordsEl.title = `Municipios sin coordenadas: ${municipiosList}`;
        } else {
            mapMissingCoordsEl.title = `${count} municipios sin coordenadas registradas`;
        }
    }
}

/**
 * Configura los event listeners
 */
function setupEventListeners() {
    // Habilitar botón cuando se selecciona archivo
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            processFileBtn.disabled = !fileInput.files[0];
        });
    }
    
    // Procesar archivo
    if (processFileBtn) {
        processFileBtn.addEventListener('click', processFile);
    }
    
    // Filtro por proceso - solo funciona si hay datos cargados
    procesosFilter.addEventListener('change', (e) => {
        if (!rawData || rawData.length === 0) return;
        
        const selectedProcess = e.target.value;
        
        if (selectedProcess) {
            filteredData = rawData.filter(row => getColumnValue(row, 'PROCESO') === selectedProcess);
        } else {
            filteredData = [...rawData];
        }
        
        // Limpiar búsqueda si hay filtro de proceso
        if (selectedProcess) {
            searchInput.value = '';
        }
        
        updateAll();
    });
    
    // Búsqueda por proponente o NIT - solo funciona si hay datos cargados
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        if (!rawData || rawData.length === 0) return;
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.trim().toLowerCase();
            
            if (searchTerm) {
                filteredData = rawData.filter(row => {
                    // Buscar en todas las empresas (1, 2, 3, 4)
                    for (let i = 1; i <= 4; i++) {
                        const empresa = getColumnValue(row, `EMPRESA ${i}`, `EMPRESA${i}`).toLowerCase();
                        if (empresa.includes(searchTerm)) {
                            return true;
                        }
                    }
                    
                    // Buscar en NITs y CCRPs
                    for (let i = 1; i <= 4; i++) {
                        const nit = getColumnValue(row, `NIT ${i}`, `NIT${i}`).toLowerCase();
                        const ccrp = getColumnValue(row, `CCRP${i}`, `CCRP ${i}`).toLowerCase();
                        
                        if (nit.includes(searchTerm) || ccrp.includes(searchTerm)) {
                            return true;
                        }
                    }
                    
                    return false;
                });
                
                // Limpiar filtro de proceso
                procesosFilter.value = '';
            } else {
                filteredData = [...rawData];
            }
            
            updateAll();
        }, 300);
    });
    
    // Botón limpiar filtros - solo funciona si hay datos cargados
    clearFiltersBtn.addEventListener('click', () => {
        if (!rawData || rawData.length === 0) return;
        
        procesosFilter.value = '';
        searchInput.value = '';
        filteredData = [...rawData];
        updateAll();
    });
}

/**
 * Actualiza todas las visualizaciones
 */
function updateAll() {
    updateKPIs();
    updateChart();
    updateDataDisplay();
    updateHeatmap();
}

/**
 * Muestra el indicador de carga
 */
function showLoading() {
    loadingElement.style.display = 'flex';
}

/**
 * Oculta el indicador de carga
 */
function hideLoading() {
    loadingElement.style.display = 'none';
}

/**
 * Muestra mensaje de error
 */
function showError() {
    hideLoading();
    errorElement.style.display = 'block';
}

/**
 * Oculta mensaje de error
 */
function hideError() {
    errorElement.style.display = 'none';
}

// Inicializar la aplicación cuando se carga el DOM
document.addEventListener('DOMContentLoaded', init);