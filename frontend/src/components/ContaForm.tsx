import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ContaBancaria } from '../types/ContaBancaria'

interface ContaFormProps {
  contaInicial?: ContaBancaria
  usuarioId: number
  onSalvar: (conta: ContaBancaria) => void
  onCancelar: () => void
}

const tiposDeConta = ['Corrente', 'Poupança', 'Digital', 'Investimento']

// O mesmo formulário serve para criar e para editar: se receber uma conta, vem preenchido
const ContaForm = ({ contaInicial, usuarioId, onSalvar, onCancelar }: ContaFormProps) => {
  const [nomeBanco, setNomeBanco] = useState(contaInicial?.nomeBanco ?? '')
  const [tipoConta, setTipoConta] = useState(contaInicial?.tipoConta ?? tiposDeConta[0])
  const [saldo, setSaldo] = useState(String(contaInicial?.saldo ?? ''))
  const [cor, setCor] = useState(contaInicial?.cor ?? '#047857')

  // Se a conta veio do banco com um tipo fora da lista (ex: "corrente", criado pelo Insomnia),
  // mostro ele também, para o select não exibir uma opção diferente da que vai ser salva
  const tiposDisponiveis = tiposDeConta.includes(tipoConta) ? tiposDeConta : [tipoConta, ...tiposDeConta]

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSalvar({
      nomeBanco,
      tipoConta,
      saldo: Number(saldo),
      cor,
      usuario: { id: usuarioId },
    })
  }

  return (
    <form className="card formulario" onSubmit={handleSubmit}>
      <h2>{contaInicial ? 'Editar conta' : 'Nova conta'}</h2>

      <div className="formulario-campos">
        <label>
          Banco
          <input
            value={nomeBanco}
            onChange={(e) => setNomeBanco(e.target.value)}
            placeholder="Ex: Nubank"
            required
          />
        </label>

        <label>
          Tipo de conta
          <select value={tipoConta} onChange={(e) => setTipoConta(e.target.value)}>
            {tiposDisponiveis.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Saldo (R$)
          <input
            type="number"
            step="0.01"
            value={saldo}
            onChange={(e) => setSaldo(e.target.value)}
            placeholder="0,00"
            required
          />
        </label>

        <label>
          Cor
          <input type="color" value={cor} onChange={(e) => setCor(e.target.value)} />
        </label>
      </div>

      <div className="formulario-botoes">
        <button type="submit" className="botao">
          Salvar
        </button>
        <button type="button" className="botao botao-secundario" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default ContaForm
