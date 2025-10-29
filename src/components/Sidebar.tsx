import { FilePlus2, PackagePlus } from 'lucide-react'
import useEditorStore from '../store/useEditorStore'
import { cn } from 'utils/cn'
import File from './FilesNFolders/File'

export default function Sidebar() {
  const theme = useEditorStore(store => store.theme)

  const vaultName = '0034R'

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 border-neutral-700 text-white' : ''

  return (
    <aside
      className={cn(
        'text-text-primary w-56 border-r border-neutral-200',
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
          <FilePlus2 size={16} />
        </div>
        <div className="rounded-md p-[0.2em] hover:bg-blue-400">
          <PackagePlus size={16} />
        </div>
      </div>
      <div>
        <File />
      </div>
    </aside>
  )
}
