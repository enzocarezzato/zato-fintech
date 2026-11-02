import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* O BrowserRouter envolve o App para as rotas funcionarem em toda a aplicação */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
