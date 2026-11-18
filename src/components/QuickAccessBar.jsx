import { Contrast, ZoomIn, ZoomOut } from 'lucide-react';
import { useAccessibility } from '../context/accessibilityStore';
import { useLanguage } from '../context/languageStore';

const languages = [['es', 'ES', 'Español'], ['qu', 'QU', 'Quechua'], ['ay', 'AY', 'Aimara']];

// Barra de accesibilidad rápida: muestra en la pantalla de inicio las herramientas
// (contraste, tamaño de letra e idioma) sin obligar a entrar a Configuración.
export const QuickAccessBar = () => {
  const { highContrast, setHighContrast, fontScale, increaseFont, decreaseFont } = useAccessibility();
  const { language, setLanguage } = useLanguage();
  return (
    <section className="quick-access" aria-label="Ajustes rápidos de accesibilidad">
      <div className="quick-row">
        <button type="button" aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)} aria-label="Alto contraste">
          <Contrast aria-hidden="true" /><span>Contraste</span>
        </button>
        <button type="button" onClick={decreaseFont} disabled={fontScale <= 0.9} aria-label="Letra más pequeña"><ZoomOut aria-hidden="true" /><span>A-</span></button>
        <button type="button" onClick={increaseFont} disabled={fontScale >= 1.4} aria-label="Letra más grande"><ZoomIn aria-hidden="true" /><span>A+</span></button>
      </div>
      <div className="quick-row" role="group" aria-label="Idioma">
        {languages.map(([code, short, name]) => (
          <button key={code} type="button" lang={code} aria-pressed={language === code} aria-label={name} onClick={() => setLanguage(code)}>{short}</button>
        ))}
      </div>
    </section>
  );
};
