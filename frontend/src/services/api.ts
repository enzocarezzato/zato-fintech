import type { Usuario } from '../types/Usuario'

// Endereço do backend Spring Boot
export const API_URL = 'http://localhost:8080/api'

// Faz a chamada para a API e, se der erro, usa a mensagem que o backend devolveu
// (por exemplo: "Não é possível excluir a conta: ela ainda tem transações cadastradas.")
export const requisicao = async <T>(caminho: string, opcoes?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_URL}${caminho}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opcoes,
  })

  if (!response.ok) {
    const erro = await response.json().catch(() => null)
    throw new Error(erro?.message ?? 'Não foi possível concluir a operação.')
  }

  // DELETE devolve 204, sem corpo na resposta
  if (response.status === 204) {
    return undefined as T
  }

  return response.json()
}

// Guardo o usuário logado no navegador para as outras páginas saberem quem entrou
const CHAVE_USUARIO = 'zato-usuario'

export const salvarUsuarioLogado = (usuario: Usuario) => {
  localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario))
}

export const buscarUsuarioLogado = (): Usuario | null => {
  const usuario = localStorage.getItem(CHAVE_USUARIO)
  return usuario ? JSON.parse(usuario) : null
}

export const sair = () => {
  localStorage.removeItem(CHAVE_USUARIO)
}
