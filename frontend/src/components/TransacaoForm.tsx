import { useState } from 'react'
import type { FormEvent } from 'react'
import type { ContaBancaria } from '../types/ContaBancaria'
import type { Transacao } from '../types/Transacao'
import { dataDeHoje } from '../utils/formatar'

interface TransacaoFormProps {
  contas: ContaBancaria[]
  transacaoInicial?: Transacao
  onSalvar: (transacao: Transacao) => void
  onCancelar: () => void
}

const categorias = ['Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Outros']

// O mesmo formulário serve para criar e para editar: se receber uma transação, vem preenchido
const TransacaoForm = ({ contas, transacaoInicial, onSalvar, onCancelar }: TransacaoFormProps) => {
  const [descricao, setDescricao] = useState(transacaoInicial?.descricao ?? '')
  const [valor, setValor] = useState(String(transacaoInicial?.valor ?? ''))
  const [tipo, setTipo] = useState<Transacao['tipo']>(transacaoInicial?.tipo ?? 'DESPESA')
  const [dataTransacao, setDataTransacao] = useState(transacaoInicial?.dataTransacao ?? dataDeHoje())
  const [categoria, setCategoria] = useState(transacaoInicial?.categoria ?? categorias[0])
  const [contaId, setContaId] = useState(String(transacaoInicial?.contaBancaria.id ?? contas[0]?.id ?? ''))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSalvar({
      descricao,
      valor: Number(valor),
      tipo,
      dataTransacao,
      categoria,
      contaBancaria: { id: Number(contaId) },
    })
  }

  return (
    <form className="card formulario" onSubmit={handleSubmit}>
      <h2>{transacaoInicial ? 'Editar transação' : 'Nova transação'}</h2>

      <div className="formulario-campos">
        <label>
          Descrição
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Mercado"
            maxLength={200}
            required
          />
        </label>

        <label>
          Valor (R$)
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="0,00"
            required
          />
        </label>

        <label>
          Tipo
          <select value={tipo} onChange={(e) => setTipo(e.target.value as Transacao['tipo'])}>
            <option value="DESPESA">Despesa</option>
            <option value="RECEITA">Receita</option>
          </select>
        </label>

        <label>
          Data
          <input
            type="date"
            value={dataTransacao}
            onChange={(e) => setDataTransacao(e.target.value)}
            required
          />
        </label>

        <label>
          Categoria
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {categorias.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          Conta
          {/* O PUT do backend não troca a conta, então só deixo escolher ao criar */}
          <select
            value={contaId}
            onChange={(e) => setContaId(e.target.value)}
            disabled={Boolean(transacaoInicial)}
          >
            {contas.map((conta) => (
              <option key={conta.id} value={conta.id}>
                {conta.nomeBanco}
              </option>
            ))}
          </select>
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

export default TransacaoForm
