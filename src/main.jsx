import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider,CssBaseline } from '@mui/material'
import customTheme from './theme/componentsTheme.js'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <BrowserRouter>
    <App />
    </BrowserRouter>

    </ThemeProvider>
    
  </StrictMode>,
)
