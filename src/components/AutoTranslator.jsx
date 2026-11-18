import { useEffect } from 'react';
import { useLanguage } from '../context/languageStore';

const translations = {
  qu: {
    '¿Cómo deseas ingresar?':'¿Imayna yaykuyta munanki?','Entrar a mi cuenta':'Yupayniyman yaykuy','Soy Agente':'Agente kani','Accesibilidad':'Yaykuy atiy','Términos y privacidad':'Kamachikuna, sapanchasqa willakuy','Activar voz':'Rimayta hapichiy','Guía activa':'Rimay yanapana hapichisqa','Repetir':'Kutichiy','Pausar':'Samarichiy','Continuar':'Qatipay','Contraste':'Tullpu','Antes de comenzar':'Manaraq qallarispa','Privacidad y consentimiento':'Sapanchasqa willakuy, ari niy','Acepto participar en la prueba':'Kay ruraypi kanaypaq ari nini','No acepto · Volver':'Mana ari ninichu · Kutiy','He leído y acepto los términos y condiciones de privacidad.':'Sapanchasqa kamachikunata ñawinchani, ari nini.','Verificación facial':'Uya qhawariy','Encender cámara y verificar':'Kamarata hapichiy, qhawariy','Cámara encendida':'Kamara hapichisqa','Continuar a mi saldo':'Qullqiyta qhawanapaq ñawpaqman','Cancelar':'Saqiy','Hola, Juan':'Allinllachu, Juan','Tu Pensión 65':'Pensión 65 nisqayki','Pensión 65 depositada':'Pensión 65 churasqa','Listo para retirar hoy':'Kunan hurqunapaq listo','Sacar mi plata':'Qullqiyta hurquy','Escuchar':'Uyariy','Usar comando de voz':'Rimay kamachiyta llamk’achiy','Código para retirar':'Qullqi hurquna yupay','Escuchar código':'Yupayta uyariy','Terminar y proteger cuenta':'Tukuy, yupayta waqaychay','Atención del agente':'Agente yanapaynin','Seleccione cómo validar el DNI':'DNI imayna qhawarinata akllay','Escanear DNI con cámara':'Kamarawan DNI qhaway','Ingresar DNI manualmente':'DNI yupayta qillqay','DNI registrado · Continuar':'DNI qillqasqa · Ñawpaqman','Cambiar método':'Huk ñanta akllay','Verificación facial del cliente':'Runap uyanta qhaway','Encender cámara frontal':'Ñawpaq kamarata hapichiy','Validar código':'Yupayta qhaway','Finalizar operación':'Rurayta tukuy','Configuración Accesible':'Yaykuy atiy allichay','Configuración':'Allichay','Guardar y volver':'Waqaychay, kutiy','Activar alto contraste':'Kallpachasqa tullpuyta hapichiy','Desactivar alto contraste':'Kallpachasqa tullpuyta wañuchiy','Tamaño actual:':'Kunan hatun kay:','Sin conexión':'Mana internetwan','Con conexión':'Internetwan','Instalar app':'Aplicaciónta churay','Aplicación instalada':'Aplicación churasqa','Volver al inicio':'Qallariyman kutiy','Aún no hay saldo disponible':'Manaraq qullqi kanchu','Fecha de tu próximo pago:':'Hamuq qullqi chaskina p’unchaw:','Llamar a mi familiar':'Aylluyman waqyay','Reintentar':'Yapamanta ruray','No pudimos ver bien tu rostro':'Uyachaykita mana allintachu qhawarirqayku','Operación exitosa':'Ruray allin tukusqa','Código correcto':'Yupay allinmi','Información importante':'Ancha allin willakuy','Entendido · Volver':'Hamutasqa · Kutiy'
  },
  ay: {
    '¿Cómo deseas ingresar?':'¿Kunjamatsa mantañ munta?','Entrar a mi cuenta':'Jakhupar mantaña','Soy Agente':'Agente-ta','Accesibilidad':'Taqinitaki mantaña','Términos y privacidad':'Kamachinaka ukat sapaki yatiyäwi','Activar voz':'Aru qhantayaña','Guía activa':'Aru yanapiri qhantata','Repetir':'Mayampi','Pausar':'Suyt’ayaña','Continuar':'Sarantaña','Contraste':'Sami','Antes de comenzar':'Janïr qalltkasina','Privacidad y consentimiento':'Sapaki yatiyäwi ukat iyawsäwi','Acepto participar en la prueba':'Yant’awin chikañataki iyawsma','No acepto · Volver':'Janiw iyawskiti · Kutiña','He leído y acepto los términos y condiciones de privacidad.':'Sapaki kamachinak ullartwa ukat iyawsma.','Verificación facial':'Ajanu uñakipaña','Encender cámara y verificar':'Kámara qhantayaña ukat uñakipaña','Cámara encendida':'Kámara qhantata','Continuar a mi saldo':'Qullqij uñjañatak sarantaña','Cancelar':'Jaytaña','Hola, Juan':'Kamisaki, Juan','Tu Pensión 65':'Pensión 65 ukamawa','Pensión 65 depositada':'Pensión 65 uchata','Listo para retirar hoy':'Jichhür apsuñataki wakicht’ata','Sacar mi plata':'Qullqij apsuña','Escuchar':'Ist’aña','Usar comando de voz':'Aru kamachi apnaqaña','Código para retirar':'Qullqi apsuñataki chimpu','Escuchar código':'Chimp ist’aña','Terminar y proteger cuenta':'Tukuyaña ukat jakhu jark’aqaña','Atención del agente':'Agente yanapäwi','Seleccione cómo validar el DNI':'DNI kunjam uñakipañsa ajlliña','Escanear DNI con cámara':'Kámarampi DNI uñakipaña','Ingresar DNI manualmente':'DNI jakhunak qillqaña','DNI registrado · Continuar':'DNI qillqata · Sarantaña','Cambiar método':'Thakhi mayjt’ayaña','Verificación facial del cliente':'Apnaqirin ajanu uñakipaña','Encender cámara frontal':'Nayra kámara qhantayaña','Validar código':'Chimp uñakipaña','Finalizar operación':'Luräwi tukuyaña','Configuración Accesible':'Taqinitaki wakichäwi','Configuración':'Wakichäwi','Guardar y volver':'Imaña ukat kutiña','Activar alto contraste':'Jach’a contraste qhantayaña','Desactivar alto contraste':'Jach’a contraste jiwt’ayaña','Tamaño actual:':'Jichha taña:','Sin conexión':'Internet jan utji','Con conexión':'Internet utji','Instalar app':'Aplicación uchaña','Aplicación instalada':'Aplicación uchata','Volver al inicio':'Qalltar kutiña','Aún no hay saldo disponible':'Janïraw qullqi utjkiti','Fecha de tu próximo pago:':'Jutir payllawi uru:','Llamar a mi familiar':'Wila masir jawsaña','Reintentar':'Mayampi yant’aña','No pudimos ver bien tu rostro':'Janiw ajanum sum uñjapkayätti','Operación exitosa':'Luräwi sum tukuyata','Código correcto':'Chimpu chiqapa','Información importante':'Wakiskiri yatiyäwi','Entendido · Volver':'Amuyata · Kutiña'
  }
};

const originals = new WeakMap(); const applied = new WeakMap();
const translateNode = (node, language) => {
  const current = node.nodeValue; const previousApplied = applied.get(node);
  if (!originals.has(node) || (previousApplied && current !== previousApplied)) originals.set(node, current);
  const original = originals.get(node); const key = original.trim(); const value = language === 'es' ? key : translations[language]?.[key] || key;
  const next = key ? original.replace(key, value) : original;
  applied.set(node, next); if (current !== next) node.nodeValue = next;
};
const translateTree = (root, language) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); let node;
  while ((node = walker.nextNode())) if (!['SCRIPT','STYLE'].includes(node.parentElement?.tagName)) translateNode(node, language);
};

export const AutoTranslator = () => {
  const { language } = useLanguage();
  useEffect(() => {
    const root = document.getElementById('root'); if (!root) return undefined;
    translateTree(root, language);
    const observer = new MutationObserver(() => translateTree(root, language));
    observer.observe(root, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);
  return null;
};
