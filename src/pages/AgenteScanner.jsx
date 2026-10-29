import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle2, ScanFace, ScanLine, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const AgenteScanner = () => {
  const { speak } = useTextToSpeech();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const timerRef = useRef(null);
  const [step, setStep] = useState(1);
  const [dni, setDni] = useState('');
  const [manualDni, setManualDni] = useState(false);
  const [dniMethod, setDniMethod] = useState('');
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('La cámara está apagada');
  const [error, setError] = useState('');
  const [manualFaceConfirm, setManualFaceConfirm] = useState(false);

  const stopCamera = () => {
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };
  useEffect(() => stopCamera, []);

  const openCamera = async (facingMode) => {
    stopCamera(); setError('');
    streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode, width: { ideal: 1280 } }, audio: false });
    videoRef.current.srcObject = streamRef.current;
    await videoRef.current.play();
  };

  const scanDni = async () => {
    if (!navigator.mediaDevices?.getUserMedia) { setError('Este dispositivo no permite usar la cámara.'); return; }
    try {
      await openCamera('environment');
      setDniMethod('scan');
      setMessage('Cámara trasera activa. Mantenga el DNI dentro del marco…');
      timerRef.current = window.setTimeout(() => {
        setDni('74281936'); setMessage('DNI ficticio capturado y reconocido correctamente.'); stopCamera();
      }, 3000);
    } catch { setDniMethod(''); setError('No se pudo abrir la cámara. Puede elegir Ingresar DNI manualmente.'); }
  };

  const startFaceCheck = async () => {
    try {
      await openCamera('user'); setMessage('Mire al frente y mantenga un solo rostro en el marco.');
      setManualFaceConfirm(true); setMessage('Cámara activa. Mantenga el rostro dentro del marco…');
      timerRef.current = window.setTimeout(() => {
        stopCamera(); setManualFaceConfirm(false); setMessage('Rostro capturado correctamente'); setStep(3);
        speak('Rostro capturado. Solicite al beneficiario su código de retiro.');
      }, 3000);
    } catch { setError('No se pudo abrir la cámara frontal. Revise el permiso.'); }
  };

  const validateToken = (event) => {
    event.preventDefault(); setError('');
    const retiro = JSON.parse(localStorage.getItem('bn-retiro') || 'null');
    if (!retiro) { setError('No existe una solicitud. El beneficiario debe ingresar primero a su cuenta y generar el código.'); return; }
    if (retiro.used) { setError('Este código ya fue utilizado.'); return; }
    if (retiro.expiresAt <= Date.now()) { setError('El código venció. El beneficiario debe generar uno nuevo.'); return; }
    if (retiro.code !== token) { setError('Código incorrecto. Confirme los cuatro números con el beneficiario.'); return; }
    localStorage.setItem('bn-retiro', JSON.stringify({ ...retiro, used: true, completedAt: Date.now(), dniLast3: dni.slice(-3) }));
    setStep(4); speak('Código correcto. Entregue 350 soles al señor Juan Pérez.');
  };

  if (step === 4) return (
    <main id="contenido" className="page page-center success-screen"><p className="agent-header">AGENTE MULTIRED · OPERACIÓN</p><CheckCircle2 /><h1>Código correcto</h1>
      <section className="delivery-card"><p>Instrucción del banco:</p><h2>Entregue <em>S/ 350.00</em><br />al señor Juan Pérez</h2></section>
      <dl className="operation-detail"><div><dt>Beneficiario</dt><dd>Juan Pérez</dd></div><div><dt>DNI</dt><dd>*****{dni.slice(-3)}</dd></div><div><dt>Programa</dt><dd>Pensión 65</dd></div><div><dt>Monto</dt><dd>S/ 350.00</dd></div></dl>
      <Link className="button-link" to="/confirmacion"><span className="btn-primary">Finalizar operación</span></Link></main>
  );

  if (step === 3) return (
    <main id="contenido" className="page"><p className="agent-header"><ShieldCheck /> Validar retiro</p><p className="step">Paso 3 de 3 · Código del beneficiario</p>
      <h1>Pida al beneficiario el código generado en su cuenta</h1><p>El agente nunca crea este código.</p>
      <form onSubmit={validateToken}><label htmlFor="token">Código de retiro</label><input id="token" className="token-input" type="text" inputMode="numeric" pattern="[0-9]{4}" maxLength="4" value={token} onChange={(e) => setToken(e.target.value.replace(/\D/g, ''))} required />
        {error && <p className="error" role="alert">{error}</p>}<button className="btn-primary" disabled={token.length !== 4}>Validar código</button></form><Link className="text-button" to="/">Cancelar</Link></main>
  );

  if (step === 2) return (
    <main id="contenido" className="page"><p className="step">Paso 2 de 3 · Presencia del beneficiario</p><h1>Verificación facial</h1>
      <p>Mantenga el rostro dentro del marco durante tres segundos.</p>
      <section className="camera-frame"><video ref={videoRef} autoPlay muted playsInline /><div className="face-guide"><ScanFace /><strong>{message}</strong></div></section>
      {error && <p className="error" role="alert">{error}</p>}<button className="btn-primary" onClick={startFaceCheck} disabled={manualFaceConfirm}><ScanFace />{manualFaceConfirm ? 'Cámara encendida' : 'Encender cámara frontal'}</button>
      <Link className="text-button" to="/">Cancelar</Link></main>
  );

  return (
    <main id="contenido" className="page"><p className="agent-header">AGENTE MULTIRED</p><p className="step">Paso 1 de 3 · Documento</p><h1>Seleccione cómo validar el DNI</h1>
      <section className="camera-frame compact"><video ref={videoRef} autoPlay muted playsInline /><div className="face-guide"><Camera /><ScanLine /><strong>{message}</strong></div></section>
      {error && <p className="error" role="alert">{error}</p>}
      {!dniMethod && <div className="method-choice"><button className="btn-primary" onClick={scanDni}><Camera />Escanear DNI con cámara</button><button className="btn-secondary" onClick={() => { setDniMethod('manual'); setManualDni(true); setMessage('Ingrese los ocho dígitos del DNI.'); }}><ShieldCheck />Ingresar DNI manualmente</button></div>}
      {dniMethod === 'scan' && !dni && <p className="status" role="status">Capturando documento…</p>}
      {manualDni && <div className="manual-entry"><label htmlFor="dni">DNI (8 dígitos)</label><input id="dni" type="text" inputMode="numeric" pattern="[0-9]{8}" maxLength="8" value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))} /></div>}
      <button className="btn-secondary" disabled={dni.length !== 8} onClick={() => { stopCamera(); setStep(2); setError(''); setMessage('La cámara está apagada'); }}>DNI registrado · Continuar</button>
      {dniMethod && <button className="text-button" onClick={() => { stopCamera(); setDni(''); setDniMethod(''); setManualDni(false); setMessage('La cámara está apagada'); }}>Cambiar método</button>}
      <Link className="text-button" to="/">Cancelar</Link></main>
  );
};
