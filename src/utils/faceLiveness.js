const averageBrightness = (video, canvas) => {
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  let total = 0;
  for (let index = 0; index < pixels.length; index += 16) total += (pixels[index] + pixels[index + 1] + pixels[index + 2]) / 3;
  return total / (pixels.length / 16);
};

export const startFaceLiveness = ({ video, onStatus, onError, onSuccess }) => {
  if (!('FaceDetector' in window)) throw new Error('unsupported');
  const detector = new window.FaceDetector({ fastMode: true, maxDetectedFaces: 2 });
  const canvas = document.createElement('canvas');
  canvas.width = 32; canvas.height = 24;
  let active = true;
  let phase = 'center';
  let validFrames = 0;
  let baselineArea = 0;
  const samples = [];
  const startedAt = Date.now();

  const scan = async () => {
    if (!active) return;
    if (Date.now() - startedAt > 45000) {
      active = false; onError('Tiempo agotado. Mantenga buena luz y repita la señal más lentamente.'); return;
    }
    try {
      if (averageBrightness(video, canvas) < 38) { validFrames = 0; onStatus('Hay poca luz. Acérquese a una ventana o encienda una lámpara.'); }
      else {
        const faces = await detector.detect(video);
        if (faces.length === 0) { validFrames = 0; onStatus('No se detecta un rostro. Colóquese dentro del marco.'); }
        else if (faces.length > 1) { validFrames = 0; onStatus('Se detectaron varias personas. Debe aparecer solo el beneficiario.'); }
        else {
          const box = faces[0].boundingBox;
          const centered = Math.abs(box.x + box.width / 2 - video.videoWidth / 2) < video.videoWidth * 0.23;
          const area = box.width * box.height;
          if (!centered) { validFrames = 0; onStatus('Centre el rostro dentro del marco.'); }
          else if (phase === 'center') {
            samples.push(area); validFrames += 1; onStatus('Rostro detectado. Mire al frente y no se mueva.');
            if (validFrames >= 6) { baselineArea = samples.reduce((sum, value) => sum + value, 0) / samples.length; phase = 'closer'; validFrames = 0; onStatus('Ahora acerque lentamente su rostro a la cámara.'); }
          } else if (phase === 'closer') {
            onStatus('Acerque lentamente su rostro a la cámara.');
            if (area > baselineArea * 1.28) { phase = 'back'; validFrames = 0; onStatus('Bien. Ahora aléjese hasta volver a la posición inicial.'); }
          } else {
            onStatus('Aléjese lentamente hasta la posición inicial.');
            validFrames = area < baselineArea * 1.12 ? validFrames + 1 : 0;
            if (validFrames >= 5) { active = false; onSuccess(); return; }
          }
        }
      }
    } catch { onError('No se pudo analizar la imagen. Limpie la cámara y vuelva a intentarlo.'); }
    window.setTimeout(scan, 250);
  };
  scan();
  return () => { active = false; };
};
