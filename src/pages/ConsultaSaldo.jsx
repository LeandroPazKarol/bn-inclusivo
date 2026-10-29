import { Mic, Pause, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const ConsultaSaldo = () => {
  const navigate = useNavigate();
  const { speak, pauseOrResume, rate, setRate, isSpeaking, isPaused } = useTextToSpeech();
  const { listen, listening, message } = useSpeechRecognition((command) => {
    if (command.includes('sacar') && (command.includes('plata') || command.includes('dinero'))) navigate('/token');
  });
  const summary = 'Hola Juan. Tu Pensión 65 de 350 soles está depositada y lista para retirar hoy.';

  return (
    <main id="contenido" className="page">
      <p className="step">Paso 2 de 3</p><h1>Hola, Juan</h1>
      <section className="balance-card" aria-label="Saldo disponible">
        <span className="success-label">● Pensión 65 depositada</span>
        <strong className="amount">S/ 350.00</strong><p>✓ Listo para retirar hoy</p>
      </section>
      <section className="voice-controls" aria-label="Controles de lectura">
        <button onClick={() => speak(summary)}><Volume2 />Escuchar</button>
        <button onClick={pauseOrResume} disabled={!isSpeaking}><Pause />{isPaused ? 'Continuar' : 'Pausar'}</button>
        <button onClick={() => setRate(rate === 1 ? 0.75 : 1)} aria-label="Cambiar velocidad de lectura">{rate}x</button>
      </section>
      <button className="btn-primary" onClick={() => navigate('/token')}>Sacar mi plata</button>
      <button className="btn-secondary" onClick={listen} disabled={listening}><Mic />{listening ? 'Escuchando…' : 'Usar comando de voz'}</button>
      <p className="status" role="status" aria-live="polite">{message}</p>
    </main>
  );
};
