import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'
import { ThemeProvider } from './context/ThemeContext'
import { router } from './routes'

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  )
}
