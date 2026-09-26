export const useTextToSpeech = () => {
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'es-PE';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };
  return speak;
};
