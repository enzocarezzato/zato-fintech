import { requisicao } from './api'
import type { ContaBancaria } from '../types/ContaBancaria'

// Uma função para cada endpoint do CRUD de /api/contas
export const listarContas = () => requisicao<ContaBancaria[]>('/contas')

export const criarConta = (conta: ContaBancaria) =>
  requisicao<ContaBancaria>('/contas', { method: 'POST', body: JSON.stringify(conta) })

export const atualizarConta = (id: number, conta: ContaBancaria) =>
  requisicao<ContaBancaria>(`/contas/${id}`, { method: 'PUT', body: JSON.stringify(conta) })

export const excluirConta = (id: number) =>
  requisicao<void>(`/contas/${id}`, { method: 'DELETE' })
