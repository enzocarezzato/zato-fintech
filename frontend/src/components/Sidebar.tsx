import { NavLink } from 'react-router-dom'

// Itens do menu: para adicionar uma página nova, basta incluir aqui
const itensMenu = [
  { caminho: '/', texto: 'Dashboard' },
  { caminho: '/contas', texto: 'Contas Bancárias' },
  { caminho: '/transacoes', texto: 'Transações' },
  { caminho: '/metas', texto: 'Metas' },
]

const Sidebar = () => {
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

      <NavLink to="/login" className="sidebar-sair">
        Sair
      </NavLink>
    </aside>
  )
}

export default Sidebar
