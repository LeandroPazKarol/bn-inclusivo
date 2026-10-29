import { createContext, useContext } from 'react';

export const AccessibilityContext = createContext(null);
export const useAccessibility = () => useContext(AccessibilityContext);
