import React from 'react';
import { Link } from 'react-router-dom';
import { Volume2 } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const DashboardTitular = () => {
  const speak = useTextToSpeech();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <button 
          onClick={() => speak("Hola Juan Pérez. Tu Pensión 65 de 350 soles está depositada y lista para retirar.")}
          style={{ background: 'var(--color-primary)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}
          aria-label="Leer saldo en voz alta"
        >
          <Volume2 size={32} />
        </button>
      </div>
      
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Hola, Juan Pérez</h2>
      
      <div style={{ background: 'var(--color-success-bg)', borderRadius: 'var(--border-radius)', padding: '2rem', marginBottom: '2rem', border: '2px solid var(--color-success)' }}>
        <p style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-success)' }}>Pensión 65 Depositada</p>
        <h1 style={{ fontSize: '4rem', margin: 0 }}>S/ 350.00</h1>
        <p style={{ fontSize: '1rem', marginTop: '1rem', background: 'var(--color-success)', color: 'white', padding: '0.5rem 1rem', borderRadius: '10px', display: 'inline-block' }}>✓ Listo para retirar hoy</p>
      </div>

      <button 
        className="btn-primary" 
        style={{ padding: '1.5rem', fontSize: '2rem' }}
        onClick={() => speak("Generando código para retirar tu plata")}
      >
        SACAR MI PLATA
      </button>
      
      <Link to="/" style={{ display: 'block', marginTop: '2rem', color: 'var(--color-text-gray)' }}>Volver al inicio</Link>
    </div>
  );
};
