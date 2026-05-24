import { BrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AppRoutes } from './core/routes/AppRoutes'
import { navItems } from './components/layout/AppShell'
import { useNotification } from './hooks/useNotification'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { NotFoundPage } from './features/not-found/NotFoundPage'
import { useEffect } from 'react'
import { aiContentService } from './services/aiContentService'

function App() {
  const { showNotification } = useNotification();

  // AI içerik bildirimlerini dinle
  useEffect(() => {
    const checkForNewContent = async () => {
      try {
        const newContent = await aiContentService.checkForNewContent();
        if (newContent) {
          newContent.forEach(item => {
            showNotification({
              title: item.title,
              body: item.description,
              contentType: item.type,
              link: item.link,
              tag: `ai-content-${item.id}`
            });
          });
        }
      } catch (error) {
        console.error('AI içerik kontrol hatası:', error);
      }
    };

    // İlk kontrol
    checkForNewContent();

    // Periyodik kontrol (örneğin her 5 dakikada bir)
    const interval = setInterval(checkForNewContent, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [showNotification]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AppShell>
          <AppRoutes navItems={navItems} />
        </AppShell>
      </ErrorBoundary>
    </BrowserRouter>
  )
}

export default App