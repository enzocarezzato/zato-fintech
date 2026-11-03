// Mesmo formato do JSON que a API devolve em /api/metas
export interface Meta {
  id?: number
  nome: string
  valorObjetivo: number
  valorAtual: number
  // O prazo é opcional no banco (DT_PRAZO aceita vazio)
  dataPrazo: string | null
  status: string
  usuario: { id: number }
}
