import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL, salvarUsuarioLogado } from '../services/api'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setErro(null)
    setCarregando(true)

    try {
      const response = await fetch(`${API_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      })

      // 401: a API não encontrou o e-mail ou a senha não bate
      if (response.status === 401) {
        setErro('E-mail ou senha inválidos.')
        return
      }

      if (!response.ok) {
        throw new Error()
      }

      const usuario = await response.json()
      salvarUsuarioLogado(usuario)
      navigate('/')
    } catch {
      setErro('Não foi possível conectar ao servidor. Confira se o backend está rodando.')
    } finally {
      setCarregando(false)
    }
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

        {erro && <p className="mensagem-erro">{erro}</p>}

        <button type="submit" className="botao" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default LoginPage
