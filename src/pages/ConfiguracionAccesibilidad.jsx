import { Contrast, ZoomIn, ZoomOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAccessibility } from '../context/accessibilityStore';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const ConfiguracionAccesibilidad = () => {
  const navigate = useNavigate();
  const { speak } = useTextToSpeech();
  const { highContrast, setHighContrast, fontScale, increaseFont, decreaseFont } = useAccessibility();
  return (
    <main id="contenido" className="page page-center">
      <h1>Accesibilidad</h1><p>Los cambios se guardan automáticamente.</p>
      <button className="btn-secondary" aria-pressed={highContrast} onClick={() => { setHighContrast(!highContrast); speak(`Alto contraste ${!highContrast ? 'activado' : 'desactivado'}`); }}>
        <Contrast />{highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}
      </button>
      <p className="font-preview" aria-live="polite">Tamaño actual: {Math.round(fontScale * 100)}%</p>
      <div className="button-row">
        <button className="btn-secondary" onClick={() => { increaseFont(); speak('Letra más grande'); }}><ZoomIn />A+</button>
        <button className="btn-secondary" onClick={() => { decreaseFont(); speak('Letra más pequeña'); }}><ZoomOut />A-</button>
      </div>
      <button className="btn-primary" onClick={() => navigate(-1)}>Guardar y volver</button>
    </main>
  );
};
