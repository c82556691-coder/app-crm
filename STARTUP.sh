#!/bin/bash
# STARTUP GUIDE - App-Comprador

cat << 'EOF'

╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║            🎉 APP-COMPRADOR - REACT NATIVE (EXPO)             ║
║         Gestión Inteligente de Compras Personales              ║
║                                                                ║
║                    Versión 1.0 - MVP                          ║
║                  Fecha: 7 Diciembre 2025                       ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

📋 RESUMEN RÁPIDO
═════════════════════════════════════════════════════════════════

✅ COMPLETADO:
  • Scaffold Expo + TypeScript (705 líneas de código)
  • 4 Pantallas funcionales (Home, Comprar, Base datos, Informe)
  • Persistencia SQLite con seed inicial (3 tipos de cerveza)
  • Componentes mejorados (Snackbar, EmptyState)
  • Reglas de negocio: control de precio tope, recurrentes
  • UI/UX: iconos, colores, advertencias visuales
  • Documentación completa

═════════════════════════════════════════════════════════════════

🚀 QUICK START
═════════════════════════════════════════════════════════════════

Opción 1: Terminal (Recomendado)
───────────────────────────────────────────────────────────────

1. Instalar dependencias:
   $ npm install

2. Iniciar dev server:
   $ npm start

3. Abrir en Android:
   $ npm run android

(Presiona 'a' en la terminal de Metro para Android, 'i' para iOS)

Opción 2: En el Contenedor (Dev Container)
───────────────────────────────────────────────────────────────

$ cd /workspaces/app-crm
$ npm install
$ npm start --no-dev

Luego escanea el QR con Expo Go o abre en emulador local.

═════════════════════════════════════════════════════════════════

📱 CARACTERÍSTICAS
═════════════════════════════════════════════════════════════════

🏠 HOME
   • Resumen de productos pendientes
   • Gasto últimos 30 días
   • Último producto comprado
   • Navegación rápida

🛒 COMPRAR
   • Lista de productos para comprar
   • Modal para registrar precio real
   • ⚠️ Alerta roja si precio > tope
   • Cervezas permanecen tras compra
   • Estado vacío con CTA

🗃️  BASE DE DATOS
   • Crear: FAB (+)
   • Editar: mantener pulsado
   • Eliminar: con confirmación
   • Validaciones integradas

📊 INFORME
   • Historial de compras
   • Precio y fecha
   • Coloreado si supera tope
   • Más reciente primero

═════════════════════════════════════════════════════════════════

🧠 REGLAS DE NEGOCIO
═════════════════════════════════════════════════════════════════

🍺 CERVEZA (Recurrentes)
   • Tipos: holanda ($190), brahma ($120), imperial ($230)
   • Nunca se elimina tras compra
   • Inserta nuevo registro comprado
   • Siempre disponible

💰 PRECIO TOPE SUPERADO
   • Advertencia visual en modal (rojo + ⚠️)
   • Precio en rojo en historial
   • No bloquea la compra
   • Solo alerta

📌 PERSISTENCIA
   • SQLite local (sin nube)
   • Datos se guardan automáticamente
   • Persisten al cerrar la app

═════════════════════════════════════════════════════════════════

📂 ESTRUCTURA IMPORTANTE
═════════════════════════════════════════════════════════════════

src/
  ├── state/
  │   ├── ProductContext.tsx    # Estado global (productos)
  │   └── UIContext.tsx         # Estado global (snackbars)
  ├── screens/                  # Las 4 pantallas
  ├── repository/               # Operaciones SQL
  ├── components/               # Snackbar, EmptyState
  └── db/                       # SQLite

═════════════════════════════════════════════════════════════════

🛠️  COMANDOS ÚTILES
═════════════════════════════════════════════════════════════════

# Iniciar dev server
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web

# Verificar tipos TypeScript
npx tsc --noEmit

# Reinstalar dependencias
rm -rf node_modules package-lock.json && npm install

═════════════════════════════════════════════════════════════════

✨ NOTAS
═════════════════════════════════════════════════════════════════

• TypeScript sin strict mode (para desarrollo rápido)
• Snackbars se cierran automáticamente (3 segundos)
• SQLite almacena datos localmente (sin encriptación MVP)
• Navegación fluida entre pantallas
• Accesibilidad mejorada (labels, hints)

═════════════════════════════════════════════════════════════════

📖 DOCUMENTACIÓN
═════════════════════════════════════════════════════════════════

README.md                  # Guía completa
COMPLETION_SUMMARY.md     # Resumen de desarrollo
COMMANDS.sh               # Comandos rápidos
src/                      # Código comentado

═════════════════════════════════════════════════════════════════

🎯 PRÓXIMOS PASOS
═════════════════════════════════════════════════════════════════

Fase 2: Animaciones y bottom tabs
Fase 3: Estadísticas mensuales
Fase 4: Backup/export JSON
Fase 5: Dark mode
Fase 6: Notificaciones

═════════════════════════════════════════════════════════════════

¡Listo para empezar! 🚀

$ npm install && npm start

═════════════════════════════════════════════════════════════════

EOF
