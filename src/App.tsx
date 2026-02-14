import { Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div className="app">
      {/* Navbar will be added in Task 4 */}
      <main>
        <Outlet />
      </main>
      {/* Footer will be added in Task 5 */}
    </div>
  )
}
