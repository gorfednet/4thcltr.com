import { createBrowserRouter } from 'react-router'
import Layout from './components/Layout'
import ManifestoModal from './components/ManifestoModal'
import Contact from './routes/Contact'
import Home from './routes/Home'
import NotFound from './routes/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      {
        path: 'manifesto',
        element: (
          <>
            <Home />
            <ManifestoModal />
          </>
        ),
      },
      { path: 'contact', Component: Contact },
      { path: '*', Component: NotFound },
    ],
  },
])
