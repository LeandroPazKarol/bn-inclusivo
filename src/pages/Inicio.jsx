import React from 'react';
import { Link } from 'react-router-dom';
import { ScanFace, QrCode, Settings } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const Inicio = () => {
  const speak = useTextToSpeech();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <button className="screen-reader-only" onClick={() => speak("Pantalla de inicio. ¿Cómo deseas ingresar?")}>
        Leer pantalla
      </button>

      {/* Botón de configuración arriba a la derecha */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <Link to="/configuracion">
          <button 
            style={{ background: 'transparent', border: 'none', color: 'var(--color-primary)', cursor: 'pointer' }}
            aria-label="Ir a Configuración de Accesibilidad"
            onClick={() => speak("Configuración")}
          >
            <Settings size={40} />
          </button>
        </Link>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '1rem' }}>BANCO DE LA NACIÓN</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-gray)' }}>BN Inclusivo — Modo Lite</p>
      </div>

      <h2 style={{ fontSize: 'var(--font-size-h1)', marginBottom: '2rem' }}>¿Cómo deseas ingresar?</h2>
      
      <Link to="/titular" style={{ textDecoration: 'none' }}>
        <button 
          className="btn-primary" 
          onClick={() => speak("Entrar a mi cuenta")}
          aria-label="Botón para ingresar como titular de la cuenta"
        >
          <ScanFace size={32} />
          Entrar a mi cuenta
        </button>
      </Link>
      
      <Link to="/agente" style={{ textDecoration: 'none' }}>
        <button 
          className="btn-secondary"
          onClick={() => speak("Soy Agente o Acompañante")}
          aria-label="Botón para ingresar como agente multired"
        >
          <QrCode size={32} />
          Soy Agente / Acompañante
        </button>
      </Link>
    </div>
  );
};
