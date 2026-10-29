import { useEffect, useState } from 'react';
import { AccessibilityContext } from './accessibilityStore';

export const AccessibilityProvider = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('bn-contrast') === 'true');
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('bn-font-scale')) || 1);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('bn-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale);
    localStorage.setItem('bn-font-scale', fontScale);
  }, [fontScale]);

  const increaseFont = () => setFontScale((value) => Math.min(1.4, +(value + 0.1).toFixed(1)));
  const decreaseFont = () => setFontScale((value) => Math.max(0.9, +(value - 0.1).toFixed(1)));

  return (
    <AccessibilityContext.Provider value={{ highContrast, setHighContrast, fontScale, increaseFont, decreaseFont }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

