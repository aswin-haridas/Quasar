import Sidebar from 'components/Sidebar'
import Tiptap from 'components/Tiptap'
import LineNumbers from 'components/LineNumbers'

export default function Editor() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <article className="flex w-full h-full border border-neutral-300">
        <LineNumbers totalLines={100} />
        <div className="flex-1 overflow-auto">
          <Tiptap />
        </div>
      </article>
    </div>
  )
}
