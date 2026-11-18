import { useEffect, useState } from 'react';
import { LanguageContext } from './languageStore';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('bn-language') || 'es');
  useEffect(() => { localStorage.setItem('bn-language', language); document.documentElement.lang = language === 'qu' ? 'qu' : language === 'ay' ? 'ay' : 'es'; }, [language]);
  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};
