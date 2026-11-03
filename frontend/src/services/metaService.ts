import { requisicao } from './api'
import type { Meta } from '../types/Meta'

// Uma função para cada endpoint do CRUD de /api/metas
export const listarMetas = () => requisicao<Meta[]>('/metas')

export const criarMeta = (meta: Meta) =>
  requisicao<Meta>('/metas', { method: 'POST', body: JSON.stringify(meta) })

export const atualizarMeta = (id: number, meta: Meta) =>
  requisicao<Meta>(`/metas/${id}`, { method: 'PUT', body: JSON.stringify(meta) })

export const excluirMeta = (id: number) =>
  requisicao<void>(`/metas/${id}`, { method: 'DELETE' })
