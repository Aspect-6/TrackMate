import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/app/context/AppContext';
import { ToastProvider } from '@/app/context/ToastContext';
import App from '@/app/App'
import './index.css'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ToastProvider>
    </BrowserRouter>
  </StrictMode>,
)
