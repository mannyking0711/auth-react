import React from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import 'react-toastify/dist/ReactToastify.css'
import App from 'App'
import { ThemeProvider } from '@material-tailwind/react'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

const customTheme = {
  list: {
    styles: {
      base: {
        item: {
          selected: {
            bg: 'bg-blue-600',
            color: 'text-white'
          }
        }
      }
    }
  }
}

root.render(
  <ThemeProvider value={customTheme}>
    <App />
  </ThemeProvider>
)
