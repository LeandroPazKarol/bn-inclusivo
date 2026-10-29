import { useEffect, useMemo, useState } from 'react';
import { Clock, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

const getToken = () => {
  const saved = JSON.parse(localStorage.getItem('bn-retiro') || 'null');
  if (saved && saved.expiresAt > Date.now() && !saved.used) return saved.code;
  const values = new Uint32Array(1);
  crypto.getRandomValues(values);
  const code = String(1000 + (values[0] % 9000));
  localStorage.setItem('bn-retiro', JSON.stringify({ code, expiresAt: Date.now() + 30 * 60 * 1000, used: false, amount: 350, beneficiary: 'Juan Pérez' }));
  return code;
};

export const TokenRetiro = () => {
  const [token] = useState(getToken);
  const navigate = useNavigate();
  const [remaining, setRemaining] = useState(() => Math.max(0, JSON.parse(localStorage.getItem('bn-retiro') || '{}').expiresAt - Date.now()));
  const { speak } = useTextToSpeech();
  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(Math.max(0, JSON.parse(localStorage.getItem('bn-retiro') || '{}').expiresAt - Date.now())), 1000);
    return () => window.clearInterval(timer);
  }, []);
  const time = `${String(Math.floor(remaining / 60000)).padStart(2, '0')}:${String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')}`;
  const cells = useMemo(() => Array.from({ length: 81 }, (_, i) => ((token.charCodeAt(i % 4) + i * 7) % 3) !== 0), [token]);

  return (
    <main id="contenido" className="page page-center">
      <p className="step">Paso 3 de 3</p><h1>Código para retirar</h1>
      <p>Este código se genera en la cuenta del beneficiario. Muéstralo o díselo al agente; el agente no puede crearlo.</p>
      <div className="token" aria-label={`Código ${token.split('').join(' ')}`}>{token}</div>
      <div className="qr" aria-label="Código QR simulado">{cells.map((dark, i) => <span key={i} className={dark ? 'dark' : ''} />)}</div>
      <p className="timer"><Clock />Válido por {time}</p>
      <button className="btn-primary" onClick={() => speak(`Tu código es ${token.split('').join(', ')}`)}><Volume2 />Escuchar código</button>
      <button className="text-button" onClick={() => navigate('/confirmacion')}>Terminar y proteger cuenta</button>
    </main>
  );
};
