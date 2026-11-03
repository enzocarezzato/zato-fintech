import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Meta } from '../types/Meta'

interface MetaFormProps {
  metaInicial?: Meta
  usuarioId: number
  onSalvar: (meta: Meta) => void
  onCancelar: () => void
}

const opcoesDeStatus = ['em andamento', 'concluída', 'pausada']

// O mesmo formulário serve para criar e para editar: se receber uma meta, vem preenchido
const MetaForm = ({ metaInicial, usuarioId, onSalvar, onCancelar }: MetaFormProps) => {
  const [nome, setNome] = useState(metaInicial?.nome ?? '')
  const [valorObjetivo, setValorObjetivo] = useState(String(metaInicial?.valorObjetivo ?? ''))
  const [valorAtual, setValorAtual] = useState(String(metaInicial?.valorAtual ?? '0'))
  const [dataPrazo, setDataPrazo] = useState(metaInicial?.dataPrazo ?? '')
  const [status, setStatus] = useState(metaInicial?.status ?? opcoesDeStatus[0])

  // Se a meta veio do banco com um status fora da lista (ex: criado pelo Insomnia),
  // mostro ele também, para o select não exibir uma opção diferente da que vai ser salva
  const statusDisponiveis = opcoesDeStatus.includes(status) ? opcoesDeStatus : [status, ...opcoesDeStatus]

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSalvar({
      nome,
      valorObjetivo: Number(valorObjetivo),
      valorAtual: Number(valorAtual),
      // Campo vazio vai como null, porque o prazo é opcional
      dataPrazo: dataPrazo || null,
      status,
      usuario: { id: usuarioId },
    })
  }

  return (
    <form className="card formulario" onSubmit={handleSubmit}>
      <h2>{metaInicial ? 'Editar meta' : 'Nova meta'}</h2>

      <div className="formulario-campos">
        <label>
          Nome da meta
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Viagem de férias"
            maxLength={100}
            required
          />
        </label>

        <label>
          Valor objetivo (R$)
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={valorObjetivo}
            onChange={(e) => setValorObjetivo(e.target.value)}
            placeholder="0,00"
            required
          />
        </label>

        <label>
          Quanto já guardei (R$)
          <input
            type="number"
            step="0.01"
            min="0"
            value={valorAtual}
            onChange={(e) => setValorAtual(e.target.value)}
            required
          />
        </label>

        <label>
          Prazo (opcional)
          <input type="date" value={dataPrazo} onChange={(e) => setDataPrazo(e.target.value)} />
        </label>

        <label>
          Status
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusDisponiveis.map((item) => (
              <option key={item} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
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

export default MetaForm
