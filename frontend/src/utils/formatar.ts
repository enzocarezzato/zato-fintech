// Mostra um número no formato de dinheiro brasileiro: 1500 vira "R$ 1.500,00"
export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
