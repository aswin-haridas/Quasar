import { FilePlus2, PackagePlus } from 'lucide-react'
import useExplorer from '../hooks/useExplorer'
import { useEditorStore } from '../store'
import { cn } from '../utils'
import Explorer from './file-explorer/Explorer'

export default function Sidebar() {
  const theme = useEditorStore(store => store.theme)

  const {
    files,
    folders,
    createFile,
    createFolder,
    currentlySelected,
    setCurrentlySelected,
  } = useExplorer()

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 border-neutral-700 text-white' : ''
  const vaultName = '0034R'

  return (
    <aside
      className={cn(
        'text-text-primary w-56 min-w-56 border-r border-neutral-200',
        darkTheme
      )}
    >
      <div
        className={cn(
          'flex items-center justify-end border-b border-neutral-200',
          darkTheme
        )}
      >
        <div className="mr-auto ml-1 text-sm text-neutral-500">{vaultName}</div>
        <div className="rounded-md p-[0.2em] hover:bg-blue-400">
          <FilePlus2 onClick={createFile} size={16} />
        </div>
        <div className="rounded-md p-[0.2em] hover:bg-blue-400">
          <PackagePlus onClick={createFolder} size={16} />
        </div>
      </div>
      <Explorer
        files={files}
        folders={folders}
        setSelected={setCurrentlySelected}
        selected={currentlySelected}
      />
    </aside>
  )
}
