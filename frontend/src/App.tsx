import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import ContasPage from './pages/ContasPage'
import TransacoesPage from './pages/TransacoesPage'
import MetasPage from './pages/MetasPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Routes>
      {/* O login fica fora do Layout, então aparece sem a sidebar */}
      <Route path="/login" element={<LoginPage />} />

      {/* As páginas do app ficam dentro do Layout e aparecem no lugar do <Outlet /> */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="contas" element={<ContasPage />} />
        <Route path="transacoes" element={<TransacoesPage />} />
        <Route path="metas" element={<MetasPage />} />
      </Route>

      {/* Rota curinga: qualquer endereço que não existe cai na página de erro */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
