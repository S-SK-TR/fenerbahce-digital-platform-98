import { BrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { AppRoutes } from './core/routes/AppRoutes'
import { navItems } from './components/layout/AppShell'
import { useNotification } from './hooks/useNotification'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { NotFoundPage } from './features/not-found/NotFoundPage'

function App() {
  // Bildirim hook'unu başlat
  useNotification();

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