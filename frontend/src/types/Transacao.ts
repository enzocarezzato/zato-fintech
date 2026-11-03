import type { ContaBancaria } from './ContaBancaria'

// Mesmo formato do JSON que a API devolve em /api/transacoes
export interface Transacao {
  id?: number
  descricao: string
  valor: number
  tipo: 'RECEITA' | 'DESPESA'
  dataTransacao: string
  categoria: string
  // Para salvar, basta mandar o id da conta; na listagem a API devolve a conta completa
  contaBancaria: Pick<ContaBancaria, 'id'> & Partial<ContaBancaria>
}
