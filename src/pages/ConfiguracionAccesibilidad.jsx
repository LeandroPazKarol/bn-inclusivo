import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Contrast, ZoomIn, ZoomOut } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const ConfiguracionAccesibilidad = () => {
  const speak = useTextToSpeech();
  const [highContrast, setHighContrast] = useState(document.body.classList.contains('high-contrast'));
  
  const toggleContrast = () => {
    const newValue = !highContrast;
    setHighContrast(newValue);
    if (newValue) {
      document.body.classList.add('high-contrast');
      speak("Alto contraste activado");
    } else {
      document.body.classList.remove('high-contrast');
      speak("Alto contraste desactivado");
    }
  };

  const changeFontSize = (increment) => {
    const html = document.documentElement;
    const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
    html.style.fontSize = `${currentSize + increment}px`;
    speak(increment > 0 ? "Letra más grande" : "Letra más pequeña");
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Configuración Accesible</h2>
      
      <button className="btn-secondary" style={{ marginBottom: '2rem' }} onClick={toggleContrast}>
        <Contrast size={28} />
        {highContrast ? "Desactivar Alto Contraste" : "Activar Alto Contraste"}
      </button>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => changeFontSize(2)}>
          <ZoomIn size={28} /> A+
        </button>
        <button className="btn-secondary" style={{ flex: 1 }} onClick={() => changeFontSize(-2)}>
          <ZoomOut size={28} /> A-
        </button>
      </div>

      <Link to="/" style={{ display: 'block', marginTop: 'auto', color: 'var(--color-text-gray)' }}>
        <button className="btn-primary" onClick={() => speak("Guardando y volviendo al inicio")}>
          Guardar Cambios
        </button>
      </Link>
    </div>
  );
};
