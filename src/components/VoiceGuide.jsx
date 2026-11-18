import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { speakText } from '../utils/voice';
import { getScreenMessage } from '../utils/voiceMessages';

const INTERACTIVE = 'button, a, select, input, [role="button"], label';

// Nombre hablado de un control: etiqueta ARIA o su texto visible (máx. 80 caracteres).
const labelOf = (el) => {
  const text = (el.getAttribute('aria-label') || el.innerText || el.title || '').replace(/\s+/g, ' ').trim();
  return text && text.length <= 80 ? text : '';
};

export const VoiceGuide = () => {
  const { pathname } = useLocation();
  const [enabled, setEnabled] = useState(() => localStorage.getItem('bn-voice-guide') === 'true');
  const [paused, setPaused] = useState(false);
  const lastLabel = useRef({ text: '', time: 0 });

  // 1) Al entrar a una pantalla: solo un mensaje corto con el paso a seguir.
  useEffect(() => {
    if (!enabled) return undefined;
    const currentLang = document.documentElement.lang;
    const timer = window.setTimeout(() => {
      setPaused(false);
      speakText(getScreenMessage(pathname, currentLang));
    }, 450);
    return () => { window.clearTimeout(timer); window.speechSynthesis?.cancel(); };
  }, [enabled, pathname]);

  // 2) Al pasar el mouse, enfocar con teclado o tocar un botón: habla solo el elemento seleccionado.
  useEffect(() => {
    if (!enabled) return undefined;
    let timer;
    const announce = (event) => {
      const el = event.target.closest?.(INTERACTIVE);
      if (!el || el.closest('.voice-guide')) return;
      const text = labelOf(el);
      const now = Date.now();
      if (!text || (text === lastLabel.current.text && now - lastLabel.current.time < 1200)) return;
      window.clearTimeout(timer);
      // Para hover esperamos 250ms por si pasa de largo; para click o focus hablamos más rápido (80ms)
      const delay = event.type === 'mouseover' ? 250 : 80;
      timer = window.setTimeout(() => {
        lastLabel.current = { text, time: Date.now() };
        speakText(text, 1);
      }, delay);
    };
    document.addEventListener('mouseover', announce);
    document.addEventListener('focusin', announce);
    document.addEventListener('click', announce);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('mouseover', announce);
      document.removeEventListener('focusin', announce);
      document.removeEventListener('click', announce);
    };
  }, [enabled]);

  const toggle = () => {
    const next = !enabled; setEnabled(next); setPaused(false); localStorage.setItem('bn-voice-guide', String(next));
    if (next) window.setTimeout(() => speakText(getScreenMessage(pathname, document.documentElement.lang)), 100); else window.speechSynthesis?.cancel();
  };
  const repeat = () => { setPaused(false); speakText(getScreenMessage(pathname, document.documentElement.lang)); };
  const togglePause = () => {
    if (!window.speechSynthesis) return;
    if (paused) window.speechSynthesis.resume(); else window.speechSynthesis.pause();
    setPaused(!paused);
  };

  return (
    <aside className="voice-guide" aria-label="Guía por voz">
      <button onClick={toggle} aria-pressed={enabled}>{enabled ? <Volume2 /> : <VolumeX />}{enabled ? 'Guía activa' : 'Activar voz'}</button>
      {enabled && <><button onClick={repeat}><Volume2 />Repetir</button><button onClick={togglePause} aria-pressed={paused}>{paused ? <Play /> : <Pause />}{paused ? 'Continuar' : 'Pausar'}</button></>}
    </aside>
  );
};
