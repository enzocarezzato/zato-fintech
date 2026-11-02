// Cabeçalho reaproveitado no topo de todas as páginas do app
interface PageHeaderProps {
  titulo: string
  subtitulo?: string
}

const PageHeader = ({ titulo, subtitulo }: PageHeaderProps) => {
  return (
    <header className="page-header">
      <h1>{titulo}</h1>
      {subtitulo && <p>{subtitulo}</p>}
    </header>
  )
}

export default PageHeader
