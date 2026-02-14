import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Outlet />
      </main>
      {/* Footer will be added in Task 5 */}
    </div>
  )
}
