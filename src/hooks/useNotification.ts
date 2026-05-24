import { useEffect, useState } from 'react';
import useAppStore from '@/store/useAppStore';

interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  data?: any;
  vibrate?: number[];
  tag?: string;
  contentType?: 'news' | 'fixture' | 'fanzone' | 'membership';
  link?: string;
}

interface Notification {
  id: string;
  type: 'news' | 'fixture' | 'fanzone' | 'membership';
  title: string;
  message: string;
  link?: string;
}

export function useNotification() {
  const { setPwaUpdateAvailable } = useAppStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);

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
        if (options.link) {
          window.open(options.link, '_blank');
        }
      };

      // UI bildirimi ekle
      if (options.contentType) {
        setNotifications(prev => [
          ...prev,
          {
            id: Date.now().toString(),
            type: options.contentType,
            title: options.title,
            message: options.body,
            link: options.link
          }
        ]);
      }
    } catch (error) {
      console.error('Bildirim gösterilemedi:', error);
    }
  };

  // Bildirimi kapat
  const closeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
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
    showNotification,
    notifications,
    closeNotification
  };
}