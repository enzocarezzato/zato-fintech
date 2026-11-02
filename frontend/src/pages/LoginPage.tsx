import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    // Por enquanto só navega para o Dashboard; a autenticação com a API vem no próximo passo
    navigate('/')
  }

  return (
    <div className="login">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-marca">
          <span className="login-logo">Zato</span>
          <span className="login-slogan">Controle seu dinheiro, conquiste seus objetivos.</span>
        </div>

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Sua senha"
          required
        />

        <button type="submit" className="botao">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default LoginPage
