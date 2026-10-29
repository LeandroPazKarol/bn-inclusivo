import { ShieldCheck, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const TerminosPrivacidad = () => {
  const { speak } = useTextToSpeech();
  const text = 'Términos y privacidad. BN Inclusivo es un prototipo académico y no realiza operaciones bancarias reales. Utiliza datos ficticios. La cámara y el micrófono funcionan durante el uso, pero las imágenes, videos y audios no se almacenan. El código de retiro se guarda temporalmente en este dispositivo. La participación es voluntaria y puede retirarse en cualquier momento.';
  return (
    <main id="contenido" className="page"><p className="step">Información importante</p><h1>Términos y privacidad</h1>
      <button className="listen-button" onClick={() => speak(text)}><Volume2 />Escuchar este texto</button>
      <section className="privacy-card"><ShieldCheck /><h2>Uso académico</h2><p>BN Inclusivo es un prototipo académico. No se conecta al Banco de la Nación ni realiza operaciones financieras reales.</p>
        <h2>Datos utilizados</h2><ul><li>Todos los nombres, saldos y documentos deben ser ficticios.</li><li>La cámara y el micrófono funcionan únicamente mientras se usa la aplicación.</li><li>No se almacenan fotografías, videos ni grabaciones de voz.</li><li>El código de retiro se conserva temporalmente en este dispositivo y vence automáticamente.</li><li>No se comparten datos con terceros ni se envían a servidores.</li></ul>
        <h2>Participación voluntaria</h2><p>El participante puede cancelar la prueba en cualquier momento. Las fotografías para el informe requieren una autorización adicional.</p></section>
      <Link className="button-link" to="/"><span className="btn-primary">Entendido · Volver</span></Link>
    </main>
  );
};
