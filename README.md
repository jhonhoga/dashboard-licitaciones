# Dashboard de Análisis de Licitaciones

![Dashboard Preview](https://img.shields.io/badge/Dashboard-Licitaciones-08dd5a)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000)

## 🚀 Demo en Vivo

**🌐 [Ver Dashboard en Vercel](https://dashboard-licitaciones.vercel.app)**

## 📋 Descripción
Dashboard interactivo para analizar licitaciones y identificar patrones de participación de proponentes, empresas y NITs. El sistema permite visualizar concentraciones geográficas y detectar participaciones recurrentes en múltiples procesos.

## 🚀 Características Principales

### 📊 Visualizaciones
- **Tarjetas KPI**: Total de procesos, proponentes y empresas únicas
- **Mapa de Calor**: Concentración geográfica de empresas en Colombia
- **Gráfico de Torta**: Top 5 proponentes más frecuentes
- **Tabla Dinámica**: Análisis detallado de participaciones

### 🔍 Filtros Interactivos
- **Filtro por Proceso**: Visualizar datos de un proceso específico
- **Búsqueda por Proponente/NIT**: Encontrar todas las participaciones
- **Limpiar Filtros**: Resetear todas las visualizaciones

## 📁 Estructura de Archivos

```
proponentes/
├── index.html              # Estructura principal del dashboard
├── style.css               # Estilos y diseño responsive
├── script.js               # Lógica de JavaScript
├── municipios_coordenadas.json  # Coordenadas de municipios
├── data.xlsx               # Datos de licitaciones (ARCHIVO PRINCIPAL)
└── README.md              # Este archivo
```

## 📋 Formato del Archivo XLSX

El archivo `data.xlsx` debe contener las siguientes columnas:

### Columnas Obligatorias:
- **SECRETARIA**: Entidad que ejecuta la licitación
- **PROCESO**: Identificador único del proceso
- **OBJETO**: Descripción del objeto a licitar
- **PROPONENTE**: Nombre del proponente principal

### Columnas de Empresas (hasta 4):
- **EMPRESA 1, EMPRESA 2, EMPRESA 3, EMPRESA 4**: Nombres de empresas participantes
- **NIT 1, NIT 2, NIT 3, NIT 4**: Números de identificación tributaria
- **MUNICIPIO 1, MUNICIPIO 2, MUNICIPIO 3, MUNICIPIO 4**: Ubicación de las empresas

### Columnas Adicionales (Opcionales):
- **RP1-RP4**: Representante legal
- **CCRP1-CCRP4**: Cédula del representante
- **EMAIL, EMAIL2, EMAIL3, EMAIL4**: Correos electrónicos
- **DIRECCION 1-4**: Direcciones físicas

## 🔧 Instalación y Uso

### ⚠️ Problema Común: Error de Carga de Archivos

Si al abrir `index.html` directamente aparece el error "Error al cargar los datos", esto se debe a restricciones de seguridad del navegador (CORS) al acceder archivos locales.

### 🚀 Solución Recomendada: Usar Servidor Local

#### **Opción 1: Servidor Automático (Windows)**
1. Hacer doble clic en `iniciar_dashboard.bat`
2. Se abrirá automáticamente en el navegador
3. ¡Listo para usar!

#### **Opción 2: Servidor Manual con Python**
```bash
# En el directorio del proyecto
python server.py
# O alternativamente:
python -m http.server 8080
```

#### **Opción 3: Carga Manual de Archivo**
1. Abrir `index.html` directamente
2. Si aparece error, usar el campo "📁 Cargar archivo XLSX"
3. Seleccionar manualmente el archivo `data.xlsx`

#### **Opción 4: VS Code Live Server**
1. Instalar extensión "Live Server" en VS Code  
2. Clic derecho en `index.html` → "Open with Live Server"

### 1. Preparar el Archivo de Datos
- Asegúrate de que tu archivo Excel se llame `data.xlsx`
- Colócalo en el mismo directorio que los archivos del dashboard
- Verifica que tenga las columnas obligatorias mencionadas

### 2. Iniciar el Dashboard
- **Recomendado**: Usar `iniciar_dashboard.bat` o `python server.py`
- **Alternativa**: Usar la carga manual si abres `index.html` directamente

### 3. Usar los Filtros
- **Filtro por Proceso**: Selecciona un proceso del dropdown
- **Búsqueda**: Escribe nombre de proponente o NIT para ver todas sus participaciones
- **Limpiar**: Usa el botón para resetear todos los filtros

## 🗺️ Funcionalidades del Mapa

El mapa de calor muestra:
- **Concentración geográfica** de empresas participantes
- **Marcadores circulares** para municipios con alta actividad (5+ empresas)
- **Código de colores**: Azul (baja) → Verde → Amarillo → Rojo (alta concentración)
- **Tooltips informativos** al hacer clic en marcadores

## 📈 Análisis Disponibles

### Identificación de Patrones:
1. **Proponentes Recurrentes**: Empresas que participan en múltiples procesos
2. **Concentración Geográfica**: Zonas con mayor actividad licitatoria  
3. **Análisis por NIT**: Seguimiento de participaciones por identificación
4. **Distribución por Proceso**: Comparación entre diferentes licitaciones

### Casos de Uso:
- Detectar posibles casos de colusión o competencia limitada
- Analizar diversidad geográfica de participantes
- Identificar proponentes dominantes en ciertos sectores
- Evaluar distribución territorial de oportunidades

## 🔧 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Diseño responsive con Grid Layout
- **JavaScript ES6+**: Lógica del dashboard
- **Chart.js**: Gráficos interactivos
- **Leaflet.js**: Mapas interactivos
- **Leaflet.heat**: Plugin para mapas de calor
- **SheetJS**: Lectura de archivos Excel (.xlsx)

## 🛠️ Solución de Problemas

### Error "No se pueden cargar los datos":
1. Verifica que `data.xlsx` existe en el directorio
2. Asegúrate de que el archivo no esté corrupto
3. Confirma que las columnas obligatorias están presentes
4. Revisa la consola del navegador para errores específicos

### El mapa no muestra datos:
1. Verifica que las columnas MUNICIPIO contienen nombres válidos
2. Los municipios deben coincidir con los del archivo `municipios_coordenadas.json`
3. Revisa que no hay caracteres especiales en los nombres de municipios

### Los filtros no funcionan:
1. Asegúrate de que las columnas PROCESO y PROPONENTE tienen datos
2. Verifica que no hay espacios en blanco al inicio/final de los valores
3. Confirma que el navegador soporta JavaScript moderno

## 📝 Notas de Compatibilidad

- **Navegadores soportados**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Tamaño máximo de archivo**: ~50MB (limitado por memoria del navegador)
- **Formatos soportados**: Solo archivos .xlsx (Excel 2007+)

## 🔄 Actualizaciones de Datos

Para actualizar los datos:
1. Reemplaza el archivo `data.xlsx` con la nueva versión
2. Recarga la página (Ctrl+F5 o Cmd+Shift+R)
3. El dashboard se actualizará automáticamente

---

**Desarrollado para análisis de transparencia en procesos de licitación pública**