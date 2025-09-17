#!/bin/bash

# 🔍 Script de Verificación Pre-Despliegue
# Ejecutar antes de subir a Vercel

echo "🚀 Verificando archivos para despliegue en Vercel..."
echo "=================================================="

# Verificar archivos principales
files=("index.html" "style.css" "script.js" "municipios_coordenadas.json" "vercel.json" "package.json")
missing_files=()

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - OK"
    else
        echo "❌ $file - FALTANTE"
        missing_files+=("$file")
    fi
done

echo ""
echo "📁 Archivos opcionales:"
optional_files=("data.xlsx" "_headers" ".gitignore" "LICENSE" "README.md" "DEPLOY.md")

for file in "${optional_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file - OK"
    else
        echo "⚠️  $file - Opcional, pero recomendado"
    fi
done

echo ""
echo "🔍 Verificando configuraciones..."

# Verificar vercel.json
if [ -f "vercel.json" ]; then
    if grep -q "dashboard-licitaciones" vercel.json; then
        echo "✅ vercel.json - Configuración correcta"
    else
        echo "⚠️  vercel.json - Revisar configuración"
    fi
fi

# Verificar package.json
if [ -f "package.json" ]; then
    if grep -q "dashboard-licitaciones" package.json; then
        echo "✅ package.json - Configuración correcta"
    else
        echo "⚠️  package.json - Revisar nombre del proyecto"
    fi
fi

# Verificar index.html
if [ -f "index.html" ]; then
    if grep -q "Dashboard de Análisis de Licitaciones" index.html; then
        echo "✅ index.html - Título correcto"
    else
        echo "⚠️  index.html - Verificar título"
    fi
    
    if grep -q "vercel.app" index.html; then
        echo "✅ index.html - Meta tags para Vercel"
    else
        echo "⚠️  index.html - Verificar meta tags"
    fi
fi

echo ""
echo "📊 Resumen de verificación:"
echo "=========================="

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "🎉 Todos los archivos principales están presentes"
    echo "✅ LISTO PARA DESPLEGAR EN VERCEL"
    echo ""
    echo "🚀 Próximos pasos:"
    echo "1. git init"
    echo "2. git add ."
    echo "3. git commit -m '🚀 Dashboard listo para Vercel'"
    echo "4. Crear repositorio en GitHub"
    echo "5. git push origin main"
    echo "6. Ir a vercel.com y conectar repositorio"
    echo ""
    echo "🌐 URL esperada: https://dashboard-licitaciones-[hash].vercel.app"
else
    echo "❌ FALTAN ARCHIVOS IMPORTANTES:"
    for file in "${missing_files[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "⚠️  Completa los archivos faltantes antes de desplegar"
fi

echo ""
echo "📚 Para más detalles, lee DEPLOY.md"