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
  const nestedFiles = files.filter(f => f.folderId === id)
  const derivedFolderName =
    isExpanded && nestedFiles.length > 0 ? `${folderName}/` : folderName

  const handleClick = () => {
    if (isFolderSelected) {
      setIsExpanded(prev => !prev)
    } else {
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
          nestedFiles.length === 0 && 'opacity-50'
        )}
      >
        {derivedFolderName}
      </div>
      {isExpanded && nestedFiles?.length > 0 && (
        <div className="opacity-80">
          {nestedFiles?.map(f => (
            <File
              key={f.id}
              id={f.id}
              folderId={f.folderId}
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
