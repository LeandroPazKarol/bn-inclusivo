import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Accessibility, QrCode, ScanFace, Volume2 } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const Inicio = () => {
  const { speak } = useTextToSpeech();
  const entryCounted = useRef(false);
  useEffect(() => {
    if (entryCounted.current) return;
    entryCounted.current = true;
    const visits = Number(localStorage.getItem('bn-entry-count') || 0) + 1;
    localStorage.setItem('bn-entry-count', String(visits));
    if (visits % 6 === 0) {
      const alternatives = ['/sin-saldo', '/error-biometria'];
      localStorage.setItem('bn-pending-scenario', alternatives[Math.floor(Math.random() * alternatives.length)]);
    }
  }, []);
  return (
    <main id="contenido" className="page page-center">
      <header className="brand-block">
        <span className="brand-mark" aria-hidden="true">BN</span>
        <div><h1>BANCO DE LA NACIÓN</h1><p>BN Inclusivo · Modo Lite</p></div>
      </header>
      <button className="listen-button" onClick={() => speak('Pantalla de inicio. Elija Entrar a mi cuenta o Soy Agente.')} aria-label="Escuchar opciones de esta pantalla">
        <Volume2 aria-hidden="true" /> Escuchar
      </button>
      <h2>¿Cómo deseas ingresar?</h2>
      <Link className="button-link" to="/consentimiento?next=/biometria"><span className="btn-primary"><ScanFace aria-hidden="true" />Entrar a mi cuenta</span></Link>
      <Link className="button-link" to="/consentimiento?next=/agente"><span className="btn-secondary"><QrCode aria-hidden="true" />Soy Agente</span></Link>
      <Link className="button-link" to="/configuracion"><span className="btn-access"><Accessibility aria-hidden="true" />Accesibilidad</span></Link>
      <Link className="text-button" to="/terminos">Términos y privacidad</Link>
    </main>
  );
};
