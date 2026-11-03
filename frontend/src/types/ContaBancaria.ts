// Formato da conta bancária que a API recebe e devolve
export interface ContaBancaria {
  id?: number
  nomeBanco: string
  tipoConta: string
  saldo: number
  cor: string
  usuario: { id: number }
}
