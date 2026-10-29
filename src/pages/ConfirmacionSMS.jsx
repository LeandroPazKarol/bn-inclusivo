import { MessageSquareText, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ConfirmacionSMS = () => {
  const now = new Date();
  const time = new Intl.DateTimeFormat('es-PE', { hour: '2-digit', minute: '2-digit' }).format(now);
  const date = new Intl.DateTimeFormat('es-PE', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  return (
  <main id="contenido" className="page confirmation-page">
    <div className="phone-time">{time} <small>{date}</small></div>
    <section className="sms-card"><header><span className="brand-mark mini">BN</span><strong>Banco de la Nación</strong><span>ahora</span></header><p><MessageSquareText /> Retiro exitoso. Se entregaron <strong>S/ 350.00</strong> a Juan Pérez en el Agente MultiRed de su barrio. Si no reconoce esta operación, denuncie al <a href="tel:080010700">0800-10700</a>.</p><small><ShieldCheck /> Mensaje verificado · BN Antifraude</small></section>
    <p className="family-notice">También se notificó al familiar de confianza registrado.</p>
    <Link className="button-link" to="/"><span className="btn-primary">Volver al inicio</span></Link>
  </main>
  );
};
