import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import MetaForm from '../components/MetaForm'
import { buscarUsuarioLogado } from '../services/api'
import { atualizarMeta, criarMeta, excluirMeta, listarMetas } from '../services/metaService'
import type { Meta } from '../types/Meta'
import { formatarData, formatarMoeda } from '../utils/formatar'

// Quanto da meta já foi guardado, de 0 a 100 (passa de 100 não, para a barra não estourar)
const calcularProgresso = (meta: Meta) =>
  Math.min(100, Math.round((meta.valorAtual / meta.valorObjetivo) * 100))

const MetasPage = () => {
  const usuario = buscarUsuarioLogado()
  const usuarioId = usuario?.id
  const [metas, setMetas] = useState<Meta[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [sucesso, setSucesso] = useState<string | null>(null)
  // undefined: formulário fechado | null: criando uma meta nova | meta: editando essa meta
  const [metaEmEdicao, setMetaEmEdicao] = useState<Meta | null | undefined>(undefined)

  // A API devolve as metas de todos os usuários, então mostro só as de quem entrou
  const buscarMetasDoUsuario = async () => {
    const todas = await listarMetas()
    return todas.filter((meta) => meta.usuario?.id === usuarioId)
  }

  // Busca as metas quando a página abre
  useEffect(() => {
    buscarMetasDoUsuario()
      .then((lista) => setMetas(lista))
      .catch((err) => setErro(err instanceof Error ? err.message : 'Erro ao carregar as metas.'))
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

  const recarregarMetas = async () => {
    setMetas(await buscarMetasDoUsuario())
    setErro(null)
  }

  const handleSalvar = async (meta: Meta) => {
    try {
      if (metaEmEdicao?.id) {
        await atualizarMeta(metaEmEdicao.id, meta)
        setSucesso(`Meta ${meta.nome} atualizada com sucesso.`)
      } else {
        await criarMeta(meta)
        setSucesso(`Meta ${meta.nome} criada com sucesso.`)
      }
      setMetaEmEdicao(undefined)
      await recarregarMetas()
    } catch (err) {
      setSucesso(null)
      setErro(err instanceof Error ? err.message : 'Erro ao salvar a meta.')
    }
  }

  const handleExcluir = async (meta: Meta) => {
    if (!meta.id || !window.confirm(`Excluir a meta ${meta.nome}?`)) {
      return
    }
    try {
      await excluirMeta(meta.id)
      await recarregarMetas()
      setSucesso(`Meta ${meta.nome} excluída com sucesso.`)
    } catch (err) {
      setSucesso(null)
      setErro(err instanceof Error ? err.message : 'Erro ao excluir a meta.')
    }
  }

  if (!usuario) {
    return null
  }

  return (
    <>
      <PageHeader titulo="Metas" subtitulo="Seus objetivos financeiros." />

      {erro && <p className="mensagem-erro">{erro}</p>}
      {sucesso && <p className="mensagem-sucesso">{sucesso}</p>}

      {metaEmEdicao === undefined ? (
        <button type="button" className="botao botao-novo" onClick={() => setMetaEmEdicao(null)}>
          + Nova meta
        </button>
      ) : (
        <MetaForm
          key={metaEmEdicao?.id ?? 'nova'}
          metaInicial={metaEmEdicao ?? undefined}
          usuarioId={usuario.id}
          onSalvar={handleSalvar}
          onCancelar={() => setMetaEmEdicao(undefined)}
        />
      )}

      {carregando ? (
        <p className="texto-suave">Carregando metas...</p>
      ) : metas.length === 0 ? (
        <div className="card">
          <p>Você ainda não tem metas cadastradas.</p>
        </div>
      ) : (
        <div className="cards">
          {metas.map((meta) => {
            const progresso = calcularProgresso(meta)
            return (
              <div key={meta.id} className="card meta">
                <div className="meta-topo">
                  <h2>{meta.nome}</h2>
                  <span className="meta-status">{meta.status}</span>
                </div>

                <p>
                  {formatarMoeda(meta.valorAtual)} de {formatarMoeda(meta.valorObjetivo)}
                </p>

                {/* A largura da barra verde é a porcentagem já guardada */}
                <div className="meta-barra">
                  <div className="meta-barra-preenchida" style={{ width: `${progresso}%` }} />
                </div>

                <div className="meta-rodape">
                  <span>
                    {progresso}%{meta.dataPrazo && ` · até ${formatarData(meta.dataPrazo)}`}
                  </span>
                  <div className="lista-item-acoes">
                    <button type="button" className="botao-link" onClick={() => setMetaEmEdicao(meta)}>
                      Editar
                    </button>
                    <button
                      type="button"
                      className="botao-link botao-link-perigo"
                      onClick={() => handleExcluir(meta)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

export default MetasPage
