# App-Comprador (Expo)

Proyecto inicial scaffold para la aplicación "App-Comprador" en Expo + TypeScript.

Visión: gestión inteligente de compras personales con control de gastos y productos.

Quick start

```bash
# instalar dependencias
npm install

# iniciar Metro
npm start

# abrir en dispositivo/emulador Android
npm run android
```

Notas:
- La persistencia usa `expo-sqlite` y hay una semilla inicial de 3 tipos de cerveza.
- Navegación: `@react-navigation/native` + stack.

Estructura relevante:
- `App.tsx` - proveedor y navegación
- `src/state/ProductContext.tsx` - estado y acciones (add/update/delete/markAsBought)
- `src/repository/ProductRepository.ts` - operaciones SQL
- `src/screens` - Home, Comprar, Base de datos, Informe
