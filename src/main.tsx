import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { scan } from 'react-scan'

if (import.meta.env.DEV) {
  scan({
    enabled: true,
    log: true,
  })
}

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)