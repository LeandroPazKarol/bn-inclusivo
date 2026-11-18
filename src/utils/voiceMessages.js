// Mensajes concisos de orientación por pantalla, segmentados por idioma
export const screenMessages = {
  es: {
    '/': 'Paso 1. Elija Entrar a mi cuenta si es beneficiario, o Soy Agente para atender.',
    '/consentimiento': 'Antes de comenzar, marque la casilla de consentimiento y pulse Acepto.',
    '/biometria': 'Paso 2. Verificación facial. Encienda la cámara y mire al frente.',
    '/saldo': 'Paso 3. Pensión depositada. Pulse Sacar mi plata para obtener su código.',
    '/sin-saldo': 'Aún no hay saldo disponible. Revise la fecha de su próximo pago.',
    '/error-biometria': 'No pudimos verificar su rostro. Busque buena iluminación y reintente.',
    '/token': 'Paso 4. Código generado. Dígale estos cuatro números al agente.',
    '/confirmacion': 'Retiro completado. Se envió un mensaje de seguridad a su familiar.',
    '/agente': 'Módulo Agente. Escanee el DNI o ingréselo manualmente, verifique el rostro y valide el código.',
    '/configuracion': 'Ajustes de accesibilidad. Puede activar alto contraste, cambiar tamaño de letra e idioma.',
    '/terminos': 'Términos y privacidad del servicio.'
  },
  qu: {
    '/': 'Ñawpaq kaq. Yupayniyman yaykuy akllay, icha Agente kani nisqata.',
    '/consentimiento': 'Manaraq qallarispa, ari niyta akllay hinaspa ñawpaqman riy.',
    '/biometria': 'Iskay kaq. Uya qhawariy. Kamarata hapichiy hinaspa ñawpaqman qhaway.',
    '/saldo': 'Kimsa kaq. Qullqiyki churasqaña. Qullqiyta hurquy nisqata ñit’iy.',
    '/sin-saldo': 'Manaraq qullqi kanchu. Hamuq p’unchawta qhaway.',
    '/error-biometria': 'Mana uyaykita qhawarirqaykuchu. K’anchaypi yapamanta ruray.',
    '/token': 'Tawa kaq. Qullqi hurquna yupay. Kay tawa yupaykunata agenteman willay.',
    '/confirmacion': 'Ruray allin tukusqa. Aylluykiman willakuy kachasqaña.',
    '/agente': 'Agente yanapaynin. DNI qillqay icha kamarawan qhaway, uyanta qhaway, yupaytapas.',
    '/configuracion': 'Yaykuy atiy allichaykuna.',
    '/terminos': 'Kamachikuna, sapanchasqa willakuy.'
  },
  ay: {
    '/': 'Mayïri. Jakhupar mantaña ajlliña, jan ukax Agente-ta.',
    '/consentimiento': 'Janïr qalltkasina, iyawsma chimpuntaña ukat sarantaña.',
    '/biometria': 'Payïri. Ajanu uñakipaña. Kámara qhantayaña ukat uñtaña.',
    '/saldo': 'Kimsïri. Qullqima uchatawa. Qullqij apsuña ch’iqintaña.',
    '/sin-saldo': 'Janïraw qullqi utjkiti. Jutir uru uñjaña.',
    '/error-biometria': 'Janiw ajanum uñjktati. Qhanampi mayampi yant’aña.',
    '/token': 'Pusïri. Qullqi apsuñataki chimpu. Kay pusi jakhunak agentero arsuña.',
    '/confirmacion': 'Luräwi sum tukuyata. Wila masiruw yatiyata.',
    '/agente': 'Agente yanapäwi. DNI qillqaña, ajanu uñakipaña ukat chimpu chiqapañchaña.',
    '/configuracion': 'Taqinitaki wakichäwinaka.',
    '/terminos': 'Kamachinaka ukat sapaki yatiyäwi.'
  }
};

export const getScreenMessage = (pathname, lang = 'es') => {
  const l = (lang === 'qu' || lang === 'ay') ? lang : 'es';
  return screenMessages[l]?.[pathname] || screenMessages.es[pathname] || '';
};
