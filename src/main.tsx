import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@primer/primitives/dist/css/functional/themes/light.css'
import {BaseStyles, ThemeProvider} from '@primer/react'
import App from './App.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BaseStyles>
        <App />
      </BaseStyles>
    </ThemeProvider>
  </StrictMode>,
)
