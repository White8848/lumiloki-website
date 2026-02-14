import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

function renderRoute(path: string) {
  const router = createMemoryRouter(
    [
      { path: '/', element: <div>Home Page</div> },
      { path: '/products', element: <div>Products Page</div> },
      { path: '/products/:id', element: <div>Product Detail Page</div> },
      { path: '/brand', element: <div>Brand Story Page</div> },
      { path: '/news', element: <div>News Page</div> },
      { path: '/news/:id', element: <div>News Detail Page</div> },
      { path: '/contact', element: <div>Contact Page</div> },
      { path: '/careers', element: <div>Careers Page</div> },
      { path: '*', element: <div>404 Not Found</div> },
    ],
    { initialEntries: [path] },
  )

  return render(<RouterProvider router={router} />)
}

describe('Routes', () => {
  it('renders home page at /', () => {
    renderRoute('/')
    expect(screen.getByText('Home Page')).toBeInTheDocument()
  })

  it('renders products page at /products', () => {
    renderRoute('/products')
    expect(screen.getByText('Products Page')).toBeInTheDocument()
  })

  it('renders product detail page at /products/:id', () => {
    renderRoute('/products/cube-1')
    expect(screen.getByText('Product Detail Page')).toBeInTheDocument()
  })

  it('renders brand story page at /brand', () => {
    renderRoute('/brand')
    expect(screen.getByText('Brand Story Page')).toBeInTheDocument()
  })

  it('renders news page at /news', () => {
    renderRoute('/news')
    expect(screen.getByText('News Page')).toBeInTheDocument()
  })

  it('renders news detail page at /news/:id', () => {
    renderRoute('/news/article-1')
    expect(screen.getByText('News Detail Page')).toBeInTheDocument()
  })

  it('renders contact page at /contact', () => {
    renderRoute('/contact')
    expect(screen.getByText('Contact Page')).toBeInTheDocument()
  })

  it('renders careers page at /careers', () => {
    renderRoute('/careers')
    expect(screen.getByText('Careers Page')).toBeInTheDocument()
  })

  it('renders 404 for unknown routes', () => {
    renderRoute('/unknown-page')
    expect(screen.getByText('404 Not Found')).toBeInTheDocument()
  })
})
