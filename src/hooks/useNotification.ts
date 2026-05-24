import { useEffect } from 'react';
import useAppStore from '@/store/useAppStore';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  data?: any;
  vibrate?: number[];
  tag?: string;
}

export function useNotification() {
  const { setPwaUpdateAvailable } = useAppStore();

  // Bildirim izni iste
  const requestPermission = async () => {
    if (!('Notification' in window)) {
      console.log('Bu tarayıcı bildirimleri desteklemiyor');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Bildirim izni alınamadı:', error);
      return false;
    }
  };

  // Bildirim gönder
  const showNotification = async (options: NotificationOptions) => {
    const permissionGranted = await requestPermission();
    if (!permissionGranted) return;

    try {
      const notification = new Notification(options.title, {
        body: options.body,
        icon: options.icon || '/icons/icon-192x192.png',
        data: options.data,
        vibrate: options.vibrate || [200, 100, 200],
        tag: options.tag
      });

      // Bildirim tıklama olayı
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        // Burada bildirim tıklama işlemleri yapılabilir
      };
    } catch (error) {
      console.error('Bildirim gösterilemedi:', error);
    }
  };

  // PWA güncelleme bildirimi
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        showNotification({
          title: 'Uygulama Güncellendi',
          body: 'Yeni özellikler için sayfayı yenileyin',
          tag: 'pwa-update'
        });
        setPwaUpdateAvailable(true);
      });
    }
  }, []);

  return {
    requestPermission,
    showNotification
  };
}