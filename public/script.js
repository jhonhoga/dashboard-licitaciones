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
            
            // Bolívar
            "MAGANGUE": [9.2417, -74.7556],
            "MAGANGUÉ": [9.2417, -74.7556],
            "TURBACO": [10.3389, -75.4275],
            "ARJONA": [10.2556, -75.3406],
            
            // Cesar
            "AGUACHICA": [8.3111, -73.6178],
            "BOSCONIA": [10.0167, -73.8667],
            "LA JAGUA DE IBIRICO": [9.5500, -73.3167],
            
            // Córdoba
            "CERETE": [8.8833, -75.7833],
            "CERETÉ": [8.8833, -75.7833],
            "LORICA": [9.2333, -75.8167],
            "SAHAGUN": [8.9500, -75.4500],
            "SAHAGÚN": [8.9500, -75.4500],
            
            // La Guajira
            "MAICAO": [11.3833, -72.2500],
            "URIBIA": [11.7000, -72.2667],
            
            // Sucre
            "COROZAL": [9.3167, -75.3000],
            "SAMPUES": [9.1833, -75.3833],
            "SAMPUÉS": [9.1833, -75.3833]
        };
        
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