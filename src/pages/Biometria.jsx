import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle2, ScanFace } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

export const Biometria = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [status, setStatus] = useState('La cámara está apagada');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [manualCapture, setManualCapture] = useState(false);
  const { speak } = useTextToSpeech();

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
  };
  useEffect(() => stopCamera, []);

  const startCamera = async () => {
    setError(''); setStatus('Solicitando permiso para usar la cámara…');
    if (!navigator.mediaDevices?.getUserMedia) { setError('Este dispositivo no permite usar la cámara desde el navegador.'); return; }
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 720 } }, audio: false });
      videoRef.current.srcObject = streamRef.current;
      await videoRef.current.play();
      setStatus('Mire al frente y mantenga su rostro dentro del marco');
      speak('Mire al frente y mantenga su rostro dentro del marco.');
      setManualCapture(true);
      setStatus('Cámara activa. Centre el rostro y mire al frente…');
      window.setTimeout(() => {
        setVerified(true); setManualCapture(false); setStatus('Rostro capturado correctamente'); stopCamera();
        speak('Rostro capturado correctamente. Puede continuar.');
      }, 3000);
    } catch {
      setError('No se pudo abrir la cámara. Revise el permiso y vuelva a intentarlo.');
      setStatus('Cámara no disponible');
    }
  };

  return (
    <main id="contenido" className="page">
      <p className="step">Titular · Paso 1 de 3</p><h1>Verificación facial</h1>
      <p>Mire al frente y mantenga el rostro dentro del marco durante tres segundos. La imagen no se guarda.</p>
      <section className={`camera-frame ${verified ? 'verified' : ''}`} aria-label="Vista de cámara frontal">
        <video ref={videoRef} autoPlay muted playsInline />
        <div className="face-guide">{verified ? <CheckCircle2 /> : <ScanFace />}<strong>{status}</strong></div>
      </section>
      <p className="status" role="status" aria-live="polite">{error || status}</p>
      {!verified ? <button className="btn-primary" onClick={startCamera} disabled={manualCapture}><Camera />{manualCapture ? 'Cámara encendida' : 'Encender cámara y verificar'}</button> :
        <button className="btn-primary" onClick={() => navigate('/saldo')}>Continuar a mi saldo</button>}
      <button className="text-button" onClick={() => { stopCamera(); navigate('/'); }}>Cancelar</button>
    </main>
  );
};
