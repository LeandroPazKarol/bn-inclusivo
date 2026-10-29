import { Pause, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const readPage = () => {
  if (!('speechSynthesis' in window)) return;
  const content = document.querySelector('main')?.innerText?.replace(/\s+/g, ' ').trim();
  if (!content) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = 'es-PE'; utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

export const VoiceGuide = () => {
  const location = useLocation();
  const [enabled, setEnabled] = useState(() => localStorage.getItem('bn-voice-guide') === 'true');
  useEffect(() => {
    if (!enabled) return undefined;
    const timer = window.setTimeout(readPage, 450);
    return () => { window.clearTimeout(timer); window.speechSynthesis?.cancel(); };
  }, [enabled, location.pathname]);
  const toggle = () => {
    const next = !enabled; setEnabled(next); localStorage.setItem('bn-voice-guide', String(next));
    if (next) window.setTimeout(readPage, 100); else window.speechSynthesis?.cancel();
  };
  return (
    <aside className="voice-guide" aria-label="Guía por voz">
      <button onClick={toggle} aria-pressed={enabled}>{enabled ? <Volume2 /> : <VolumeX />}{enabled ? 'Guía activa' : 'Activar voz'}</button>
      {enabled && <><button onClick={readPage}><Volume2 />Repetir</button><button onClick={() => window.speechSynthesis?.pause()}><Pause />Pausar</button></>}
    </aside>
  );
};
