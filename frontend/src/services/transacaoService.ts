import { requisicao } from './api'
import type { Transacao } from '../types/Transacao'

// Uma função para cada endpoint do CRUD de /api/transacoes
export const listarTransacoes = () => requisicao<Transacao[]>('/transacoes')

export const criarTransacao = (transacao: Transacao) =>
  requisicao<Transacao>('/transacoes', { method: 'POST', body: JSON.stringify(transacao) })

export const atualizarTransacao = (id: number, transacao: Transacao) =>
  requisicao<Transacao>(`/transacoes/${id}`, { method: 'PUT', body: JSON.stringify(transacao) })

export const excluirTransacao = (id: number) =>
  requisicao<void>(`/transacoes/${id}`, { method: 'DELETE' })
