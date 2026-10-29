import { Clock3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SESSION_LIMIT = 180;
const PUBLIC_ROUTES = ['/', '/configuracion', '/consentimiento', '/terminos'];

export const SessionGuard = () => {
  const location = useLocation(); const navigate = useNavigate();
  const [remaining, setRemaining] = useState(SESSION_LIMIT);
  const protectedRoute = !PUBLIC_ROUTES.includes(location.pathname);

  useEffect(() => {
    if (!protectedRoute) return undefined;
    let lastActivity = Date.now();
    const activate = () => { lastActivity = Date.now(); setRemaining(SESSION_LIMIT); };
    const events = ['pointerdown', 'keydown', 'touchstart'];
    events.forEach((event) => window.addEventListener(event, activate, { passive: true }));
    const interval = window.setInterval(() => {
      const seconds = Math.max(0, SESSION_LIMIT - Math.floor((Date.now() - lastActivity) / 1000));
      setRemaining(seconds);
      if (seconds === 0) { sessionStorage.removeItem('bn-consent'); navigate('/', { replace: true, state: { sessionExpired: true } }); }
    }, 1000);
    return () => { window.clearInterval(interval); events.forEach((event) => window.removeEventListener(event, activate)); };
  }, [navigate, protectedRoute]);

  if (!protectedRoute || remaining > 30) return null;
  return (
    <div className="session-overlay" role="dialog" aria-modal="true" aria-labelledby="session-title">
      <section><Clock3 /><h2 id="session-title">La sesión se suspenderá pronto</h2><p>Por seguridad, volveremos al inicio en {remaining} segundos.</p><button className="btn-primary" onClick={() => setRemaining(SESSION_LIMIT)}>Continuar sesión</button></section>
    </div>
  );
};
