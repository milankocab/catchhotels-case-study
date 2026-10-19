import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter'
import '@fontsource/poppins/latin-600.css'
import '@fontsource/poppins/latin-ext-600.css'
import '@fontsource/poppins/latin-700.css'
import '@fontsource/poppins/latin-ext-700.css'
import '@fontsource/outfit/latin-500.css'
import '@fontsource/outfit/latin-ext-500.css'
import '@fontsource/outfit/latin-700.css'
import '@fontsource/outfit/latin-ext-700.css'
import '@fontsource/outfit/latin-800.css'
import '@fontsource/outfit/latin-ext-800.css'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
