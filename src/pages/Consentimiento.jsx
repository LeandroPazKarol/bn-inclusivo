import { Camera, Mic, ShieldCheck } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Consentimiento = () => {
  const navigate = useNavigate(); const [params] = useSearchParams();
  const [accepted, setAccepted] = useState(false);
  const next = params.get('next') === '/agente' ? '/agente' : '/biometria';
  const accept = () => {
    sessionStorage.setItem('bn-consent', new Date().toISOString());
    const pendingScenario = next === '/biometria' ? localStorage.getItem('bn-pending-scenario') : null;
    if (pendingScenario) localStorage.removeItem('bn-pending-scenario');
    navigate(pendingScenario || next);
  };
  return (
    <main id="contenido" className="page"><p className="step">Antes de comenzar</p><h1>Privacidad y consentimiento</h1>
      <section className="privacy-card"><ShieldCheck /><h2>Sus datos permanecen en este dispositivo</h2><p>Esta demostración usa datos ficticios. No se conecta al Banco de la Nación ni realiza operaciones reales.</p>
        <ul><li><Camera />La cámara muestra imagen en vivo, pero no guarda fotografías ni video.</li><li><Mic />La voz se procesa mediante el navegador y no se almacena.</li><li>No se conserva el DNI completo; al finalizar solo se muestra una referencia enmascarada.</li><li>Los resultados de usabilidad son anónimos y pueden eliminarse desde este dispositivo.</li></ul></section>
      <label className="consent-check"><input type="checkbox" checked={accepted} onChange={(event) => setAccepted(event.target.checked)} />He leído y acepto los <Link to="/terminos">términos y condiciones de privacidad</Link>.</label>
      <button className="btn-primary" onClick={accept} disabled={!accepted}>Acepto participar en la prueba</button><button className="text-button" onClick={() => navigate('/')}>No acepto · Volver</button>
    </main>
  );
};
