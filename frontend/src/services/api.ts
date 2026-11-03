import type { Usuario } from '../types/Usuario'

// Endereço do backend Spring Boot
export const API_URL = 'http://localhost:8080/api'

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
