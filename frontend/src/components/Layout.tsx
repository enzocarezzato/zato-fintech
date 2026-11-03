import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { buscarUsuarioLogado } from '../services/api'

const Layout = () => {
  // Quem não fez login é mandado de volta para a tela de login
  if (!buscarUsuarioLogado()) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="layout">
      <Sidebar />
      <main className="layout-conteudo">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
