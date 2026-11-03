// Mostra um número no formato de dinheiro brasileiro: 1500 vira "R$ 1.500,00"
export const formatarMoeda = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// A API devolve a data como "2026-11-03"; aqui ela vira "03/11/2026".
// Separo o texto em vez de usar new Date() para não sofrer com o fuso horário
// (new Date("2026-11-03") em São Paulo mostraria 02/11).
export const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split('-')
  return `${dia}/${mes}/${ano}`
}

// Data de hoje no formato que o input type="date" e a API usam: "2026-11-03"
export const dataDeHoje = () => {
  const hoje = new Date()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const dia = String(hoje.getDate()).padStart(2, '0')
  return `${hoje.getFullYear()}-${mes}-${dia}`
}
