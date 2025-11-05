import type { FileProps } from 'types/index'
import { cn } from 'utils/cn'

export default function File({
  fileName,
  id,
  selected,
  setSelected,
  nested,
}: FileProps) {
  const derivedFileName = `${fileName}${selected.id === id ? ' *' : ''}`

  function handleClick() {
    setSelected(prev =>
      prev.id !== id ? { id: id, type: 'file' } : { id: null, type: null }
    )
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        'google-sans-code flex h-6 cursor-pointer items-center gap-1 px-1 text-sm select-none hover:bg-neutral-800',
        nested ? 'pl-4' : ''
      )}
    >
      {derivedFileName}
    </div>
  )
}
