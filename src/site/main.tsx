import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../shared/fonts'
import { SiteApp } from './SiteApp'
import '../index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SiteApp />
  </StrictMode>,
)
