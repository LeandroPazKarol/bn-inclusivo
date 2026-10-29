import { CalendarDays, Phone, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const SinSaldo = () => {
  const { speak } = useTextToSpeech();
  return (
    <main id="contenido" className="page page-center">
      <button className="listen-button" onClick={() => speak('Aún no hay saldo disponible. Tu próximo pago será el 15 de septiembre.')}><Volume2 />Escuchar</button>
      <p>Hola,</p><h1>Juan Pérez</h1><h2>Tu Pensión 65</h2>
      <section className="empty-card"><CalendarDays /><h2>Aún no hay saldo disponible</h2><p>Fecha de tu próximo pago:</p><strong>15 de septiembre</strong><p>Vuelve ese día y tu plata estará lista.</p></section>
      <a className="button-link" href="tel:080010700"><span className="btn-secondary"><Phone />Llamar a mi familiar</span></a>
      <Link className="text-button" to="/">Volver al inicio</Link>
    </main>
  );
};
