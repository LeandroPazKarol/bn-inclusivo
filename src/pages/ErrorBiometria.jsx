import { AlertTriangle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ErrorBiometria = () => (
  <main id="contenido" className="page page-center">
    <section className="error-card" role="alert"><AlertTriangle /><h1>No pudimos ver bien tu rostro</h1><p>Ubícate en un lugar con más luz e intenta no moverte.</p><small>Consejo: busca una ventana con luz natural y sostén el celular al nivel de tus ojos.</small></section>
    <Link className="button-link" to="/biometria"><span className="btn-primary"><RotateCcw />Reintentar</span></Link>
    <Link className="text-button" to="/">Cancelar</Link>
  </main>
);
