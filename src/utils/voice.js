// Devuelve una voz instalada compatible con el idioma de la interfaz. Si el
// dispositivo no tiene voz en quechua o aimara, usa una voz en español para no quedar en silencio.
export const pickVoice = () => {
  const lang = document.documentElement.lang;
  const wanted = lang === 'qu' ? 'qu' : lang === 'ay' ? 'ay' : 'es';
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const voice = voices.find((v) => v.lang?.toLowerCase().startsWith(wanted))
    || voices.find((v) => v.lang?.toLowerCase() === 'es-pe')
    || voices.find((v) => v.lang?.toLowerCase().startsWith('es'));
  return { voice, lang: voice?.lang || 'es-PE' };
};

// Habla un texto corto cancelando lo que estuviera sonando (evita que se acumulen).
export const speakText = (text, rate = 0.9) => {
  if (!text || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  const { voice, lang } = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = lang; utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
};
