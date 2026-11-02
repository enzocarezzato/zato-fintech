import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'

const atalhos = [
  { caminho: '/contas', titulo: 'Contas Bancárias', descricao: 'Cadastre e acompanhe suas contas.' },
  { caminho: '/transacoes', titulo: 'Transações', descricao: 'Registre suas receitas e despesas.' },
  { caminho: '/metas', titulo: 'Metas', descricao: 'Defina objetivos e acompanhe o progresso.' },
]

const HomePage = () => {
  return (
    <>
      <PageHeader titulo="Dashboard" subtitulo="Controle seu dinheiro, conquiste seus objetivos." />

      <div className="cards">
        {atalhos.map((atalho) => (
          <Link key={atalho.caminho} to={atalho.caminho} className="card card-link">
            <h2>{atalho.titulo}</h2>
            <p>{atalho.descricao}</p>
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage
