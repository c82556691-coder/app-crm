# App-Comprador (Expo)

Aplicación móvil React Native con Expo para gestión inteligente de compras personales.

**Versión:** 1.0  
**Plataforma:** Android (Nativo) vía Expo  
**Tecnología:** Expo SDK 49, TypeScript, SQLite, React Navigation  

## 🎯 Características

- ✅ **Persistencia local**: SQLite con `expo-sqlite`
- ✅ **4 Pantallas**: Home, Comprar, Base de datos, Informe
- ✅ **Gestión de productos**: crear, editar, eliminar con validaciones
- ✅ **Control de gastos**: alerta visual (rojo + ⚠️) al superar precio tope
- ✅ **Productos recurrentes**: "Cerveza" (holanda, brahma, imperial) — se mantiene tras compra
- ✅ **Experiencia mejorada**: snackbars animados, estados vacíos con CTA, iconos
- ✅ **Accesibilidad**: labels y descripciones en controles

## 📋 Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar dev server
npm start

# 3. Abrir en Android (emulador o dispositivo)
npm run android

# (Opcional) Abrir en iOS
npm run ios

# (Opcional) Abrir en web
npm run web
```

## 🗂️ Estructura del Proyecto

```
app-crm/
├── App.tsx                     # Entry point + providers
├── app.json                    # Expo config
├── src/
│   ├── model/
│   │   └── Product.ts          # Tipo Product
│   ├── db/
│   │   └── database.ts         # SQLite helpers
│   ├── repository/
│   │   └── ProductRepository.ts # Operaciones SQL
│   ├── state/
│   │   ├── ProductContext.tsx  # Estado global (productos)
│   │   └── UIContext.tsx       # Estado global (UI/snackbars)
│   ├── navigation/
│   │   └── index.tsx           # Stack navigator
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── BuyScreen.tsx
│   │   ├── DatabaseScreen.tsx
│   │   └── ReportScreen.tsx
│   ├── components/
│   │   ├── Snackbar.tsx        # Snackbar animado
│   │   └── EmptyState.tsx      # Estado vacío
│   └── types/
│       └── uuid.d.ts           # Type definitions
├── package.json
├── tsconfig.json
└── README.md
```

## 📱 Pantallas

### Home
- Resumen: productos pendientes, gasto últimos 30 días, último comprado
- Cards visuales con estilos Material
- Navegación rápida a otras pantallas

### Comprar (Buy)
- Lista de productos pendientes (excluye comprados)
- Cervezas: permanecen disponibles tras cada compra
- Modal para ingresar precio real
- Advertencia roja si precio real > precio tope
- Estado vacío con CTA "Ir a Base de datos"

### Base de datos (Database)
- Gestionar catálogo (solo productos no-cerveza padres)
- FAB (+) para crear producto
- Mantener pulsado para editar
- Deslizar/tocar icono de basura para eliminar
- Diálogo de confirmación
- Estado vacío con hint

### Informe (Report)
- Historial de compras (más reciente primero)
- Precio real pagado y fecha
- Precio coloreado en rojo si supera tope
- Icono de cerveza para productos recurrentes

## 🧠 Lógica de Negocio

### Cerveza (Productos Recurrentes)
- **3 tipos iniciales**: holanda ($190), brahma ($120), imperial ($230)
- **Al comprar**: crea registro comprado nuevo, mantiene cerveza padre en "Comprar"
- **Nunca se elimina**: siempre disponible para futuras compras
- **En informe**: aparecen todos los registros de compra históricos

### Precio Tope Superado
- **Al registrar compra**: si `precio real > precio tope` → ⚠️ advertencia visual en modal
- **En historial**: precio aparece en rojo
- **No bloquea**: es solo una alerta, la compra se registra igual

### Persistencia
- Todos los datos se guardan en SQLite (base de datos local)
- Los datos persisten al cerrar/abrir la app
- Sin conexión a nube (privacidad local)

## 🛠️ Tecnologías Principales

| Librería | Versión | Propósito |
|----------|---------|----------|
| `expo` | ~49.0.0 | Framework React Native |
| `expo-sqlite` | ~11.3.3 | Base de datos local |
| `@react-navigation` | ^6.1.7 | Navegación stack |
| `@expo/vector-icons` | ^13.0.0 | Iconos (Ionicons) |
| `typescript` | 5.4.2 | Type safety |

## 🚀 Próximos Pasos (Roadmap)

- [ ] **Fase 2**: Mejoras UX (animaciones transiciones, bottom tabs)
- [ ] **Fase 3**: Estadísticas mensuales/anuales
- [ ] **Fase 4**: Backup/export JSON
- [ ] **Fase 5**: Dark mode y temas personalizables
- [ ] **Fase 6**: Notificaciones locales (recordatorios de compra)

## ⚙️ Variables de Entorno (Opcional)

No se requieren variables de entorno. La app funciona con configuración por defecto.

## 📝 Notas Importantes

- TypeScript con `strict: false` para desarrollo rápido (activar según necesidad)
- SQLite almacena datos en formato blobs; no hay encriptación (para MVP)
- Snackbars se cierran automáticamente tras 3 segundos
- Estados vacíos muestran CTA cuando es aplicable (ej: en Buy → "Ir a Base de datos")

## 🤝 Contribuciones

Este es un MVP v1.0. Siéntete libre de fork/contribuir con mejoras.

---

**Creado**: 7 de diciembre de 2025  
**Stack**: Expo + TypeScript + SQLite + React Navigation

