import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Inicio } from './pages/Inicio';
import { DashboardTitular } from './pages/DashboardTitular';
import { AgenteScanner } from './pages/AgenteScanner';
import { ConfiguracionAccesibilidad } from './pages/ConfiguracionAccesibilidad';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/titular" element={<DashboardTitular />} />
        <Route path="/agente" element={<AgenteScanner />} />
        <Route path="/configuracion" element={<ConfiguracionAccesibilidad />} />
      </Routes>
    </Router>
  );
}

export default App;
