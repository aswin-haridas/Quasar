import type { FolderProps } from 'types/index'
import File from './File'
import { useState } from 'react'
import { cn } from 'utils/cn'

export default function Folder({
  files,
  folderName,
  id,
  selected,
  setSelected,
}: FolderProps) {
  const isFolderSelected = selected.id === id && selected.type === 'folder'
  const [isExpanded, setIsExpanded] = useState(false)
  const derivedFolderName =
    isExpanded && files.length > 0 ? `${folderName}/` : folderName
  const handleClick = () => {
    // If clicking the same folder, toggle expansion
    if (isFolderSelected) {
      setIsExpanded(prev => !prev)
    } else {
      // If clicking a different folder, select it and expand
      setSelected({ id, type: 'folder' })
      setIsExpanded(true)
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        className={cn(
          'google-sans-code flex h-6 cursor-pointer items-center gap-1 px-1 text-sm select-none hover:bg-neutral-800',
          isFolderSelected && 'bg-neutral-800',
          files.length === 0 && 'opacity-50'
        )}
      >
        {derivedFolderName}
      </div>
      {isExpanded && files?.length > 0 && (
        <div className="opacity-80">
          {files?.map(f => (
            <File
              key={f.id}
              id={f.id}
              fileName={f.fileName}
              nested={f.nested}
              selected={selected}
              setSelected={setSelected}
            />
          ))}
        </div>
      )}
    </div>
  )
}
