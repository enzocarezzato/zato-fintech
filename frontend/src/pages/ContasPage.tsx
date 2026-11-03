import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import ContaForm from '../components/ContaForm'
import { buscarUsuarioLogado } from '../services/api'
import { atualizarConta, criarConta, excluirConta, listarContas } from '../services/contaService'
import type { ContaBancaria } from '../types/ContaBancaria'
import { formatarMoeda } from '../utils/formatar'

const ContasPage = () => {
  const usuario = buscarUsuarioLogado()
  const usuarioId = usuario?.id
  const [contas, setContas] = useState<ContaBancaria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  // undefined: formulário fechado | null: criando uma conta nova | conta: editando essa conta
  const [contaEmEdicao, setContaEmEdicao] = useState<ContaBancaria | null | undefined>(undefined)

  // A API devolve as contas de todos os usuários, então mostro só as de quem entrou
  const buscarContasDoUsuario = async () => {
    const todas = await listarContas()
    return todas.filter((conta) => conta.usuario?.id === usuarioId)
  }

  // Busca as contas quando a página abre
  useEffect(() => {
    buscarContasDoUsuario()
      .then((lista) => setContas(lista))
      .catch((err) => setErro(err instanceof Error ? err.message : 'Erro ao carregar as contas.'))
      .finally(() => setCarregando(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId])

  // A mensagem de sucesso some sozinha depois de 3 segundos
  useEffect(() => {
    if (!sucesso) {
      return
    }
    const timer = setTimeout(() => setSucesso(null), 3000)
    // Se outra mensagem aparecer antes, cancelo o timer antigo
    return () => clearTimeout(timer)
  }, [sucesso])

  // Depois de criar, editar ou excluir, busco a lista de novo para mostrar o que mudou
  const recarregarContas = async () => {
    setContas(await buscarContasDoUsuario())
    setErro(null)
  }

  const handleSalvar = async (conta: ContaBancaria) => {
    try {
      if (contaEmEdicao?.id) {
        await atualizarConta(contaEmEdicao.id, conta)
        setSucesso(`Conta ${conta.nomeBanco} atualizada com sucesso.`)
      } else {
        await criarConta(conta)
        setSucesso(`Conta ${conta.nomeBanco} criada com sucesso.`)
      }
      setContaEmEdicao(undefined)
      await recarregarContas()
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao salvar a conta.')
    }
  }

  const handleExcluir = async (conta: ContaBancaria) => {
    if (!conta.id || !window.confirm(`Excluir a conta ${conta.nomeBanco}?`)) {
      return
    }
    try {
      await excluirConta(conta.id)
      await recarregarContas()
      setSucesso(`Conta ${conta.nomeBanco} excluída com sucesso.`)
    } catch (err) {
      setSucesso(null)
      // Se a conta tiver transações, a API responde 409 e a mensagem dela aparece aqui
      setErro(err instanceof Error ? err.message : 'Erro ao excluir a conta.')
    }
  }

  if (!usuario) {
    return null
  }

  return (
    <>
      <PageHeader titulo="Contas Bancárias" subtitulo="Suas contas cadastradas na Zato." />

      {erro && <p className="mensagem-erro">{erro}</p>}
      {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

      {contaEmEdicao === undefined ? (
        <button type="button" className="botao botao-novo" onClick={() => setContaEmEdicao(null)}>
          + Nova conta
        </button>
      ) : (
        <ContaForm
          key={contaEmEdicao?.id ?? 'nova'}
          contaInicial={contaEmEdicao ?? undefined}
          usuarioId={usuario.id}
          onSalvar={handleSalvar}
          onCancelar={() => setContaEmEdicao(undefined)}
        />
      )}

      {carregando ? (
        <p className="texto-suave">Carregando contas...</p>
      ) : contas.length === 0 ? (
        <div className="card">
          <p>Você ainda não tem contas cadastradas.</p>
        </div>
      ) : (
        <ul className="lista">
          {contas.map((conta) => (
            <li key={conta.id} className="card lista-item">
              <span className="conta-cor" style={{ backgroundColor: conta.cor }}>
                {conta.nomeBanco.charAt(0).toUpperCase()}
              </span>
              <div className="lista-item-info">
                <strong>{conta.nomeBanco}</strong>
                <span>{conta.tipoConta}</span>
              </div>
              <strong className="lista-item-valor">{formatarMoeda(conta.saldo)}</strong>
              <div className="lista-item-acoes">
                <button type="button" className="botao-link" onClick={() => setContaEmEdicao(conta)}>
                  Editar
                </button>
                <button
                  type="button"
                  className="botao-link botao-link-perigo"
                  onClick={() => handleExcluir(conta)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default ContasPage
