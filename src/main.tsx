import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import CubeSpinner from './components/ui/CubeSpinner'

import './styles/fonts.css'
import './styles/variables.css'
import './styles/animations.css'
import './styles/global.css'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductsPage = lazy(() => import('./pages/ProductsPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const BrandStoryPage = lazy(() => import('./pages/BrandStoryPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsDetailPage = lazy(() => import('./pages/NewsDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'var(--color-bg)',
    }}>
      <CubeSpinner />
    </div>
  )
}

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Suspense fallback={<Loading />}><HomePage /></Suspense> },
      { path: 'products', element: <Suspense fallback={<Loading />}><ProductsPage /></Suspense> },
      { path: 'products/:id', element: <Suspense fallback={<Loading />}><ProductDetailPage /></Suspense> },
      { path: 'brand', element: <Suspense fallback={<Loading />}><BrandStoryPage /></Suspense> },
      { path: 'news', element: <Suspense fallback={<Loading />}><NewsPage /></Suspense> },
      { path: 'news/:id', element: <Suspense fallback={<Loading />}><NewsDetailPage /></Suspense> },
      { path: 'contact', element: <Suspense fallback={<Loading />}><ContactPage /></Suspense> },
      { path: '*', element: <Suspense fallback={<Loading />}><NotFoundPage /></Suspense> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
