import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Volume2, ScanFace, QrCode } from 'lucide-react';
import './index.css';

// Componente Global de Lectura de Voz (TTS)
const useTextToSpeech = () => {
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

// Pantalla 1: Inicio (Selector de Ingreso)
const Inicio = () => {
  const speak = useTextToSpeech();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <button className="screen-reader-only" onClick={() => speak("Pantalla de inicio. ¿Cómo deseas ingresar?")}>
        Leer pantalla
      </button>
      
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

// Pantalla Placeholder para Titular (Dashboard)
const DashboardTitular = () => {
  const speak = useTextToSpeech();
  return (
    <div style={{ padding: '2rem', textAlign: 'center', flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
        <button 
          onClick={() => speak("Hola Juan Pérez. Tu Pensión 65 de 350 soles está depositada y lista para retirar.")}
          style={{ background: 'var(--color-primary)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}
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

      <button className="btn-primary" style={{ padding: '1.5rem', fontSize: '2rem' }}>
        SACAR MI PLATA
      </button>
      
      <Link to="/" style={{ display: 'block', marginTop: '2rem', color: 'var(--color-text-gray)' }}>Volver al inicio</Link>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/titular" element={<DashboardTitular />} />
        {/* Rutas futuras para el Agente y Configuración */}
      </Routes>
    </Router>
  );
}

export default App;
