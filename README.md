# BN Inclusivo - Modo Lite

Prototipo funcional accesible para beneficiarios de Pensión 65/Contigo y agentes MultiRed. Desarrollado con React, Vite y PWA.

## Ejecución

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. Para probar cámara y micrófono desde otro celular debe publicar la carpeta `dist` bajo HTTPS; estos permisos no funcionan desde una dirección HTTP de la red local.

## Instalación como PWA

1. Ejecute `npm run build` y publique `dist` en un hosting HTTPS como Netlify, Vercel o GitHub Pages.
2. Abra la URL desde Chrome o Edge.
3. Pulse **Instalar app** en la barra superior. En Android también puede usar el menú del navegador > **Instalar aplicación**.
4. En iPhone/iPad use Safari > **Compartir** > **Añadir a pantalla de inicio**.
5. Abra una vez con internet para almacenar los recursos; después pruebe el indicador offline.

Validación de entrega:

```bash
npm run lint
npm run build
```

## Pantallas y rutas

- `/`: selección de titular o agente.
- `/biometria`: cámara frontal y detección facial local compatible.
- `/saldo`: saldo disponible, lectura TTS y comando "Sacar plata".
- `/sin-saldo`: próximo pago y llamada de apoyo.
- `/error-biometria`: orientación y reintento ante mala iluminación.
- `/token`: token, QR simulado y vigencia de 30 minutos.
- `/confirmacion`: SMS antifraude y familiar de confianza.
- `/agente`: lectura real del código de barras del DNI, detección facial, token de un solo uso y autorización.
- `/configuracion`: contraste y tamaño de texto.
- `/consentimiento`: información de privacidad antes de cámara o micrófono.
- `/terminos`: términos, privacidad y lectura de la información.

## Accesibilidad implementada

- Botones táctiles de al menos 60 px, foco visible y navegación por teclado.
- Alto contraste, tipografía ajustable y preferencias persistentes.
- ARIA, regiones de estado, etiquetas y enlace para saltar al contenido.
- Síntesis de voz con pausa y velocidad; reconocimiento del comando principal.
- Guía por voz global: al activarla una vez, lee automáticamente cada pantalla y sus pasos.
- Reducción de movimiento según preferencias del sistema.
- Instalación PWA y recursos principales disponibles sin conexión.

## Recomendaciones para el tercer avance

1. Aplicar una encuesta Likert de 10 preguntas a usuarios finales o simulados y registrar tiempo, errores y satisfacción.
2. Probar los flujos con adultos mayores y personas con discapacidad visual/auditiva; adjuntar fotografías o capturas con consentimiento.
3. Ejecutar Lighthouse y una revisión WCAG 2.1 AA, documentando hallazgos antes/después.
4. La detección del navegador confirma presencia facial, pero no identidad. En producción debe conectarse con el servicio biométrico y transaccional seguro del banco; nunca almacenar imágenes biométricas en el navegador.
5. Publicar bajo HTTPS para habilitar cámara, micrófono y PWA, y probar en Android de gama baja con conexión intermitente.
6. Documentar como limitación que SpeechRecognition depende del navegador y siempre conservar una alternativa táctil.

## Privacidad sin base de datos

- Use únicamente perfiles, saldos y DNI ficticios durante las pruebas.
- Cámara y micrófono se procesan en memoria; no se guardan imágenes, video ni audio.
- El token se conserva temporalmente en `localStorage` para conectar los dos roles durante la demostración.
- La encuesta se aplica en un formato externo y no forma parte de la aplicación.
- Esta arquitectura sirve para validar usabilidad, no para realizar operaciones bancarias reales.

## Flujo operativo

1. El beneficiario entra a su cuenta desde su teléfono o una cabina autorizada, activa la cámara, consulta el saldo y genera un código de retiro con vigencia de 30 minutos.
2. El agente abre su flujo, escanea el código de barras del DNI con la cámara trasera y realiza la prueba de vida: mirar al frente, acercar el rostro y volver a alejarlo.
3. El beneficiario dicta su código. El agente no puede generarlo ni consultarlo.
4. La aplicación verifica vigencia, coincidencia y uso único; recién entonces autoriza entregar el dinero.

`BarcodeDetector`, `FaceDetector` y `SpeechRecognition` dependen del navegador. Si no están disponibles, la aplicación informa la limitación; para el DNI ofrece ingreso manual, pero nunca aprueba automáticamente un rostro o token.

Cada sexto ingreso a la aplicación activa aleatoriamente un caso alternativo: ausencia de saldo o problema de verificación. Así los estados de error aparecen de manera natural sin botones de demostración. Las rutas operativas se suspenden después de tres minutos sin actividad y muestran una advertencia durante los últimos 30 segundos.
