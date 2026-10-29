import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { PwaStatus } from './components/PwaStatus';
import { SessionGuard } from './components/SessionGuard';
import { VoiceGuide } from './components/VoiceGuide';
import { AgenteScanner } from './pages/AgenteScanner';
import { Biometria } from './pages/Biometria';
import { ConfiguracionAccesibilidad } from './pages/ConfiguracionAccesibilidad';
import { ConsultaSaldo } from './pages/ConsultaSaldo';
import { ConfirmacionSMS } from './pages/ConfirmacionSMS';
import { Consentimiento } from './pages/Consentimiento';
import { ErrorBiometria } from './pages/ErrorBiometria';
import { Inicio } from './pages/Inicio';
import { SinSaldo } from './pages/SinSaldo';
import { TokenRetiro } from './pages/TokenRetiro';
import { TerminosPrivacidad } from './pages/TerminosPrivacidad';

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <PwaStatus />
        <VoiceGuide />
        <SessionGuard />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/biometria" element={<Biometria />} />
          <Route path="/consentimiento" element={<Consentimiento />} />
          <Route path="/terminos" element={<TerminosPrivacidad />} />
          <Route path="/saldo" element={<ConsultaSaldo />} />
          <Route path="/sin-saldo" element={<SinSaldo />} />
          <Route path="/error-biometria" element={<ErrorBiometria />} />
          <Route path="/titular" element={<Navigate to="/saldo" replace />} />
          <Route path="/token" element={<TokenRetiro />} />
          <Route path="/confirmacion" element={<ConfirmacionSMS />} />
          <Route path="/agente" element={<AgenteScanner />} />
          <Route path="/configuracion" element={<ConfiguracionAccesibilidad />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  );
}

export default App;
