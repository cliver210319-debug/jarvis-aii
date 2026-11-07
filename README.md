# JARVIS AI — starter para Android

Esta es una primera versión instalable como PWA (aplicación web progresiva). Está pensada para Android 10 y usa Google Gemini a través de un servidor Node.js.

## Importante
- No pongas tu clave de Gemini en `public/` ni en el código del navegador.
- La clave se guarda en el servidor, en la variable `GEMINI_API_KEY`.
- Este proyecto es una app nueva inspirada en la idea de un asistente personal; no es el APK oficial de OpenJarvis.
- Para instalarla como app, debe publicarse en un sitio HTTPS. Abrir `index.html` directamente no instala la PWA.
- Gmail, WhatsApp, contactos y calendario NO están conectados todavía. Se añadirán después mediante autorizaciones oficiales y permisos específicos.

## Requisitos para ejecutar el servidor
Node.js 20 o posterior y una clave de Google AI Studio con acceso a Gemini API.

## Ejecutar
1. En un equipo o servicio de hosting compatible, abre esta carpeta.
2. Ejecuta `npm install`.
3. Copia `.env.example` a `.env` y añade tu clave en `GEMINI_API_KEY`.
4. Ejecuta `npm start`.
5. Publica el sitio detrás de HTTPS.
6. En Android 10, abre la URL HTTPS en Chrome y usa el menú ⋮ > Añadir a pantalla de inicio.

## Modelo
El servidor usa `gemini-2.5-flash` como valor inicial configurable mediante `GEMINI_MODEL`. Comprueba la disponibilidad y límites actuales de tu cuenta de Google antes de usarlo.

## Seguridad
No compartas tu clave API en chats, capturas ni repositorios públicos. Si se expone, revócala en Google AI Studio y crea otra.
