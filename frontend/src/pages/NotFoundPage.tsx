import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="nao-encontrado">
      <span className="nao-encontrado-codigo">404</span>
      <h1>Página não encontrada</h1>
      <p>O endereço que você tentou acessar não existe na Zato.</p>
      <Link to="/" className="botao">
        Voltar para o Dashboard
      </Link>
    </div>
  )
}

export default NotFoundPage
