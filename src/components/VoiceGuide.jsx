import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pickVoice } from '../utils/voice';

const readPage = () => {
  if (!('speechSynthesis' in window)) return;
  const content = document.querySelector('main')?.innerText?.replace(/\s+/g, ' ').trim();
  if (!content) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(content);
  const { voice, lang } = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.lang = lang; utterance.rate = 0.85;
  window.speechSynthesis.speak(utterance);
};

export const VoiceGuide = () => {
  const location = useLocation();
  const [enabled, setEnabled] = useState(() => localStorage.getItem('bn-voice-guide') === 'true');
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!enabled) return undefined;
    const timer = window.setTimeout(() => { setPaused(false); readPage(); }, 450);
    return () => { window.clearTimeout(timer); window.speechSynthesis?.cancel(); };
  }, [enabled, location.pathname]);
  const toggle = () => {
    const next = !enabled; setEnabled(next); setPaused(false); localStorage.setItem('bn-voice-guide', String(next));
    if (next) window.setTimeout(readPage, 100); else window.speechSynthesis?.cancel();
  };
  const togglePause = () => {
    if (!window.speechSynthesis) return;
    if (paused) window.speechSynthesis.resume(); else window.speechSynthesis.pause();
    setPaused(!paused);
  };
  const repeat = () => { setPaused(false); readPage(); };
  return (
    <aside className="voice-guide" aria-label="Guía por voz">
      <button onClick={toggle} aria-pressed={enabled}>{enabled ? <Volume2 /> : <VolumeX />}{enabled ? 'Guía activa' : 'Activar voz'}</button>
      {enabled && <><button onClick={repeat}><Volume2 />Repetir</button><button onClick={togglePause} aria-pressed={paused}>{paused ? <Play /> : <Pause />}{paused ? 'Continuar' : 'Pausar'}</button></>}
    </aside>
  );
};
