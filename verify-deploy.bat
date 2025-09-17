@echo off
REM Verificacion de archivos para despliegue en Vercel

echo 🚀 Verificando archivos para despliegue en Vercel...
echo ==================================================

REM Verificar archivos principales
echo.
echo 📄 Archivos principales:

if exist "index.html" (
    echo ✅ index.html - OK
) else (
    echo ❌ index.html - FALTANTE
    set "missing=true"
)

if exist "style.css" (
    echo ✅ style.css - OK
) else (
    echo ❌ style.css - FALTANTE
    set "missing=true"
)

if exist "script.js" (
    echo ✅ script.js - OK
) else (
    echo ❌ script.js - FALTANTE
    set "missing=true"
)

if exist "municipios_coordenadas.json" (
    echo ✅ municipios_coordenadas.json - OK
) else (
    echo ❌ municipios_coordenadas.json - FALTANTE
    set "missing=true"
)

if exist "vercel.json" (
    echo ✅ vercel.json - OK
) else (
    echo ❌ vercel.json - FALTANTE
    set "missing=true"
)

if exist "package.json" (
    echo ✅ package.json - OK
) else (
    echo ❌ package.json - FALTANTE
    set "missing=true"
)

echo.
echo 📁 Archivos opcionales:

if exist "data.xlsx" (
    echo ✅ data.xlsx - OK
) else (
    echo ⚠️  data.xlsx - Opcional, pero recomendado
)

if exist "_headers" (
    echo ✅ _headers - OK
) else (
    echo ⚠️  _headers - Opcional, pero recomendado
)

if exist ".gitignore" (
    echo ✅ .gitignore - OK
) else (
    echo ⚠️  .gitignore - Opcional, pero recomendado
)

if exist "LICENSE" (
    echo ✅ LICENSE - OK
) else (
    echo ⚠️  LICENSE - Opcional, pero recomendado
)

if exist "README.md" (
    echo ✅ README.md - OK
) else (
    echo ⚠️  README.md - Opcional, pero recomendado
)

if exist "DEPLOY.md" (
    echo ✅ DEPLOY.md - OK
) else (
    echo ⚠️  DEPLOY.md - Opcional, pero recomendado
)

echo.
echo 📊 Resumen de verificacion:
echo ==========================

if not defined missing (
    echo 🎉 Todos los archivos principales están presentes
    echo ✅ LISTO PARA DESPLEGAR EN VERCEL
    echo.
    echo 🚀 Proximos pasos:
    echo 1. git init
    echo 2. git add .
    echo 3. git commit -m "🚀 Dashboard listo para Vercel"
    echo 4. Crear repositorio en GitHub
    echo 5. git push origin main
    echo 6. Ir a vercel.com y conectar repositorio
    echo.
    echo 🌐 URL esperada: https://dashboard-licitaciones-[hash].vercel.app
) else (
    echo ❌ FALTAN ARCHIVOS IMPORTANTES
    echo ⚠️  Completa los archivos faltantes antes de desplegar
)

echo.
echo 📚 Para mas detalles, lee DEPLOY.md
echo.
pause