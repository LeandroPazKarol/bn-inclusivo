import { useEffect, useState } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';

export const PwaStatus = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const [installEvent, setInstallEvent] = useState(null);
  const [installed, setInstalled] = useState(window.matchMedia('(display-mode: standalone)').matches);
  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    const captureInstall = (event) => { event.preventDefault(); setInstallEvent(event); };
    const confirmInstall = () => { setInstalled(true); setInstallEvent(null); };
    window.addEventListener('online', update); window.addEventListener('offline', update);
    window.addEventListener('beforeinstallprompt', captureInstall); window.addEventListener('appinstalled', confirmInstall);
    return () => { window.removeEventListener('online', update); window.removeEventListener('offline', update); window.removeEventListener('beforeinstallprompt', captureInstall); window.removeEventListener('appinstalled', confirmInstall); };
  }, []);
  const install = async () => { if (!installEvent) return; await installEvent.prompt(); const choice = await installEvent.userChoice; if (choice.outcome === 'accepted') setInstallEvent(null); };
  return (
    <aside className="pwa-status" aria-live="polite">
      <span className={online ? 'online' : 'offline'}>{online ? <Wifi /> : <WifiOff />}{online ? 'Con conexión' : 'Sin conexión'}</span>
      {!installed && installEvent && <button onClick={install}><Download />Instalar app</button>}
      {installed && <span>Aplicación instalada</span>}
    </aside>
  );
};
