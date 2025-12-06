import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../utils'

interface ContextMenuProps {
  x: number
  y: number
  onClose: () => void
  children: React.ReactNode
}

export default function ContextMenu({
  x,
  y,
  onClose,
  children,
}: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  return createPortal(
    <div
      ref={ref}
      style={{ top: y, left: x }}
      className="fixed z-50 min-w-32 rounded-md border border-neutral-700 bg-neutral-800 p-1 shadow-md"
    >
      {children}
    </div>,
    document.body
  )
}

interface ContextMenuItemProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function ContextMenuItem({
  onClick,
  children,
  className,
  icon,
}: ContextMenuItemProps) {
  return (
    <div
      onClick={e => {
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-neutral-200 hover:bg-neutral-700',
        className
      )}
    >
      {icon && <span className="text-neutral-400">{icon}</span>}
      {children}
    </div>
  )
}
