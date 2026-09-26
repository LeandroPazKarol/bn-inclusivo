import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Mic, QrCode } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const AgenteScanner = () => {
  const speak = useTextToSpeech();
  const [escaneando, setEscaneando] = useState(false);

  const simularEscaneo = () => {
    speak("Escaneando DNI del cliente. Por favor, enfoque el código de barras.");
    setEscaneando(true);
    setTimeout(() => {
      speak("Escaneo exitoso. Ingrese el código dictado por el titular.");
      setEscaneando(false);
    }, 3000);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Flujo del Agente</h2>
      <p style={{ marginBottom: '2rem', color: 'var(--color-text-gray)' }}>Valida la identidad del abuelo fácilmente.</p>

      {/* Simulación de Cámara */}
      <div style={{ 
        flex: 1, 
        background: escaneando ? '#e0f7fa' : '#eeeeee', 
        border: '4px dashed #ccc', 
        borderRadius: 'var(--border-radius)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        marginBottom: '2rem',
        minHeight: '250px'
      }}>
        {escaneando ? <QrCode size={64} color="var(--color-primary)" className="scanning-animation" /> : <Camera size={64} color="#999" />}
        <h3 style={{ marginTop: '1rem' }}>{escaneando ? 'Leyendo código...' : 'Cámara Apagada'}</h3>
      </div>

      <button className="btn-primary" onClick={simularEscaneo}>
        <Camera size={24} />
        {escaneando ? 'Escaneando...' : 'Escanear DNI'}
      </button>

      <button className="btn-secondary" onClick={() => speak("Activando asistente de voz. Dime qué necesitas.")}>
        <Mic size={24} />
        Usar Asistente de Voz
      </button>
      
      <Link to="/" style={{ display: 'block', marginTop: '2rem', color: 'var(--color-text-gray)' }}>Volver al inicio</Link>
    </div>
  );
};
