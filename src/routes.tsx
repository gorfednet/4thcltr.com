import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import Contact from './routes/Contact'
import Home from './routes/Home'
import Manifesto from './routes/Manifesto'
import NotFound from './routes/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'manifesto', Component: Manifesto },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
])
