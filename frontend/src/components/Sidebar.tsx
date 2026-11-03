import { NavLink, useNavigate } from 'react-router-dom'
import { buscarUsuarioLogado, sair } from '../services/api'

// Itens do menu: para adicionar uma página nova, basta incluir aqui
const itensMenu = [
  { caminho: '/', texto: 'Dashboard' },
  { caminho: '/contas', texto: 'Contas Bancárias' },
  { caminho: '/transacoes', texto: 'Transações' },
  { caminho: '/metas', texto: 'Metas' },
]

const Sidebar = () => {
  const navigate = useNavigate()
  const usuario = buscarUsuarioLogado()

  const handleSair = () => {
    sair()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-marca">
        <span className="sidebar-logo">Zato</span>
        <span className="sidebar-slogan">Controle seu dinheiro.</span>
      </div>

      <nav>
        <ul className="sidebar-menu">
          {itensMenu.map((item) => (
            <li key={item.caminho}>
              {/* O NavLink sabe se está na página atual e aplica a classe "active" */}
              <NavLink
                to={item.caminho}
                end={item.caminho === '/'}
                className="sidebar-link"
              >
                {item.texto}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-rodape">
        {usuario && (
          <div className="sidebar-usuario">
            <span className="sidebar-usuario-nome">{usuario.nome}</span>
            <span className="sidebar-usuario-email">{usuario.email}</span>
          </div>
        )}
        <button type="button" className="sidebar-sair" onClick={handleSair}>
          Sair
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
