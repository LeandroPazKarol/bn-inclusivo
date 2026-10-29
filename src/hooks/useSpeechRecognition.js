import { useState } from 'react';

export const useSpeechRecognition = (onCommand) => {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');

  const listen = () => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setMessage('El reconocimiento de voz no está disponible en este navegador.');
      return;
    }
    const recognition = new Recognition();
    recognition.lang = 'es-PE';
    recognition.interimResults = false;
    recognition.onstart = () => {
      setListening(true);
      setMessage('Escuchando… diga “Sacar plata”.');
    };
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setMessage(`Se escuchó: ${command}`);
      onCommand(command);
    };
    recognition.onerror = () => setMessage('No se pudo reconocer la voz. Inténtelo nuevamente.');
    recognition.onend = () => setListening(false);
    recognition.start();
  };

  return { listen, listening, message };
};
