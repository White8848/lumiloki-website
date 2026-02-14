import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import App from '../App'

function renderWithRouter(initialEntry = '/') {
  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          { index: true, element: <div>Home Page</div> },
          { path: 'products', element: <div>Products Page</div> },
          { path: 'brand', element: <div>Brand Page</div> },
          { path: 'news', element: <div>News Page</div> },
          { path: 'contact', element: <div>Contact Page</div> },
          { path: '*', element: <div>Not Found</div> },
        ],
      },
    ],
    { initialEntries: [initialEntry] },
  )

  return render(<RouterProvider router={router} />)
}

describe('App', () => {
  it('renders navbar with logo', () => {
    renderWithRouter()
    // LUMILOKI appears in both Navbar and Footer
    const logos = screen.getAllByText('LUMILOKI')
    expect(logos.length).toBeGreaterThanOrEqual(1)
  })

  it('renders navigation links', () => {
    renderWithRouter()
    // Nav links appear in both desktop nav and mobile menu
    const homeLinks = screen.getAllByText('首页')
    expect(homeLinks.length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('产品中心').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('品牌故事').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('新闻动态').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('联系我们').length).toBeGreaterThanOrEqual(1)
  })

  it('renders footer', () => {
    renderWithRouter()
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })
})
