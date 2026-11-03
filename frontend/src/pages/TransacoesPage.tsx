import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import TransacaoForm from '../components/TransacaoForm'
import { buscarUsuarioLogado } from '../services/api'
import { listarContas } from '../services/contaService'
import {
  atualizarTransacao,
  criarTransacao,
  excluirTransacao,
  listarTransacoes,
} from '../services/transacaoService'
import type { ContaBancaria } from '../types/ContaBancaria'
import type { Transacao } from '../types/Transacao'
import { formatarData, formatarMoeda } from '../utils/formatar'

const TransacoesPage = () => {
  const usuario = buscarUsuarioLogado()
  const usuarioId = usuario?.id
  const [transacoes, setTransacoes] = useState<Transacao[]>([])
  const [contas, setContas] = useState<ContaBancaria[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  // undefined: formulário fechado | null: criando uma transação nova | transação: editando essa
  const [transacaoEmEdicao, setTransacaoEmEdicao] = useState<Transacao | null | undefined>(undefined)

  // Busco as contas e as transações ao mesmo tempo (Promise.all) e fico só com as do usuário logado.
  // A transação não tem o usuário direto: ele vem dentro da conta bancária dela.
  const buscarDados = async () => {
    const [todasContas, todasTransacoes] = await Promise.all([listarContas(), listarTransacoes()])
    const contasDoUsuario = todasContas.filter((conta) => conta.usuario?.id === usuarioId)
    const transacoesDoUsuario = todasTransacoes
      .filter((transacao) => transacao.contaBancaria.usuario?.id === usuarioId)
      // As mais recentes primeiro
      .sort((a, b) => b.dataTransacao.localeCompare(a.dataTransacao))
    return { contasDoUsuario, transacoesDoUsuario }
  }

  const aplicarDados = (dados: Awaited<ReturnType<typeof buscarDados>>) => {
    setContas(dados.contasDoUsuario)
    setTransacoes(dados.transacoesDoUsuario)
  }

  // Busca os dados quando a página abre
  useEffect(() => {
    buscarDados()
      .then(aplicarDados)
      .catch((err) => setErro(err instanceof Error ? err.message : 'Erro ao carregar as transações.'))
      .finally(() => setCarregando(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId])

  // A mensagem de sucesso some sozinha depois de 3 segundos
  useEffect(() => {
    if (!sucesso) {
      return
    }
    const timer = setTimeout(() => setSucesso(null), 3000)
    return () => clearTimeout(timer)
  }, [sucesso])

  const recarregar = async () => {
    aplicarDados(await buscarDados())
    setErro(null)
  }

  const handleSalvar = async (transacao: Transacao) => {
    try {
      if (transacaoEmEdicao?.id) {
        await atualizarTransacao(transacaoEmEdicao.id, transacao)
        setSucesso(`Transação ${transacao.descricao} atualizada com sucesso.`)
      } else {
        await criarTransacao(transacao)
        setSucesso(`Transação ${transacao.descricao} criada com sucesso.`)
      }
      setTransacaoEmEdicao(undefined)
      await recarregar()
    } catch (err) {
      setSucesso(null)
      setErro(err instanceof Error ? err.message : 'Erro ao salvar a transação.')
    }
  }

  const handleExcluir = async (transacao: Transacao) => {
    if (!transacao.id || !window.confirm(`Excluir a transação ${transacao.descricao}?`)) {
      return
    }
    try {
      await excluirTransacao(transacao.id)
      await recarregar()
      setSucesso(`Transação ${transacao.descricao} excluída com sucesso.`)
    } catch (err) {
      setSucesso(null)
      setErro(err instanceof Error ? err.message : 'Erro ao excluir a transação.')
    }
  }

  // Totais mostrados nos cards do topo
  const totalReceitas = transacoes
    .filter((t) => t.tipo === 'RECEITA')
    .reduce((soma, t) => soma + t.valor, 0)
  const totalDespesas = transacoes
    .filter((t) => t.tipo === 'DESPESA')
    .reduce((soma, t) => soma + t.valor, 0)

  if (!usuario) {
    return null
  }

  return (
    <>
      <PageHeader titulo="Transações" subtitulo="Suas receitas e despesas." />

      {erro && <p className="mensagem-erro">{erro}</p>}
      {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

      {!carregando && contas.length === 0 ? (
        // Sem conta não dá para criar transação, porque toda transação pertence a uma conta
        <div className="card">
          <p>
            Para registrar uma transação, primeiro <Link to="/contas" className="link">cadastre uma conta bancária</Link>.
          </p>
        </div>
      ) : (
        <>
          <div className="cards resumo">
            <div className="card">
              <p>Receitas</p>
              <strong className="resumo-valor valor-receita">{formatarMoeda(totalReceitas)}</strong>
            </div>
            <div className="card">
              <p>Despesas</p>
              <strong className="resumo-valor valor-despesa">{formatarMoeda(totalDespesas)}</strong>
            </div>
            <div className="card">
              <p>Saldo das transações</p>
              <strong className="resumo-valor">{formatarMoeda(totalReceitas - totalDespesas)}</strong>
            </div>
          </div>

          {transacaoEmEdicao === undefined ? (
            <button
              type="button"
              className="botao botao-novo"
              onClick={() => setTransacaoEmEdicao(null)}
              disabled={carregando}
            >
              + Nova transação
            </button>
          ) : (
            <TransacaoForm
              key={transacaoEmEdicao?.id ?? 'nova'}
              contas={contas}
              transacaoInicial={transacaoEmEdicao ?? undefined}
              onSalvar={handleSalvar}
              onCancelar={() => setTransacaoEmEdicao(undefined)}
            />
          )}

          {carregando ? (
            <p className="texto-suave">Carregando transações...</p>
          ) : transacoes.length === 0 ? (
            <div className="card">
              <p>Você ainda não tem transações cadastradas.</p>
            </div>
          ) : (
            <ul className="lista">
              {transacoes.map((transacao) => (
                <li key={transacao.id} className="card lista-item">
                  <div className="lista-item-info">
                    <strong>{transacao.descricao}</strong>
                    <span>
                      {transacao.categoria} · {transacao.contaBancaria.nomeBanco} ·{' '}
                      {formatarData(transacao.dataTransacao)}
                    </span>
                  </div>
                  <strong
                    className={`lista-item-valor ${
                      transacao.tipo === 'RECEITA' ? 'valor-receita' : 'valor-despesa'
                    }`}
                  >
                    {transacao.tipo === 'RECEITA' ? '+ ' : '- '}
                    {formatarMoeda(transacao.valor)}
                  </strong>
                  <div className="lista-item-acoes">
                    <button
                      type="button"
                      className="botao-link"
                      onClick={() => setTransacaoEmEdicao(transacao)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="botao-link botao-link-perigo"
                      onClick={() => handleExcluir(transacao)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}

export default TransacoesPage
