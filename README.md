# 📱 Criptomonedas App

Aplicación móvil desarrollada con **React Native** y **TypeScript** para consultar información actualizada sobre criptomonedas usando la API pública de [CoinLore](https://www.coinlore.com/cryptocurrency-data-api).

Ofrece funcionalidades como listado de criptomonedas, detalles individuales, sistema de favoritos, conversor de divisas y soporte multilenguaje.
---

## 🚀 Tecnologías utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
- [i18n-js](https://github.com/fnando/i18n-js) para internacionalización
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para almacenamiento local
- [CoinLore API](https://www.coinlore.com/cryptocurrency-data-api)

---

## 📦 Requisitos previos

- Node.js >= 14.x
- Expo CLI instalado globalmente: npm install -g expo-cli
- Dispositivo físico o emulador con Expo Go

---

## ⚙️ Instalación y ejecución

1. **Clonar el repositorio**

   
bash
   git clone https://github.com/lvargas258951/Criptomonedas-app.git
   cd Criptomonedas-app
2. **Instalar dependencias**
    npm install
3. **Iniciar la aplicacion**
    npx expo start
    Escanea el código QR con Expo Go o utiliza un emulador para visualizar la app.

**Estructura del proyecto**
├── app/                 # Configuraciones de navegación y temas
├── assets/              # Recursos estáticos como imágenes y fuentes
├── components/          # Componentes reutilizables de UI
├── constants/           # Constantes utilizadas en la app
├── contexts/            # Contextos de React para manejo de estado global
├── hooks/               # Hooks personalizados
├── i18n/                # Archivos de internacionalización
├── models/              # Definiciones de tipos y modelos
├── services/            # Lógica de integración con APIs
├── utils/               # Funciones utilitarias
├── app.json             # Configuración de Expo
├── package.json         # Dependencias y scripts
└── tsconfig.json        # Configuración de TypeScript

🌐 Funcionalidades principales

✅ Listado de criptomonedas: Visualiza una lista actualizada de criptomonedas con sus precios en USD.

🔍 Búsqueda y filtrado: Filtra criptomonedas por nombre o símbolo.

ℹ️ Detalles individuales: Accede a información detallada de cada criptomoneda.

⭐ Favoritos: Marca tus criptomonedas favoritas y guárdalas localmente.

💱 Conversor de divisas: Convierte montos entre USD y la criptomoneda seleccionada.

📈 Gráficos de precios: Visualiza tendencias de precios mediante gráficos (si aplica).

🌓 Modo oscuro/claro: La app se adapta al tema del sistema.

🌍 Soporte multilenguaje: Disponible en inglés y español
