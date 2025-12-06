import { ChevronDown, ChevronRight, File, Edit2, Trash2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import type { Node } from '../types'
import { cn } from '../utils'
import { useEditorStore } from '../store'
import useExplorer from '../hooks/useExplorer'
import ContextMenu, { ContextMenuItem } from './ContextMenu'

interface ExplorerProps {
  loading: boolean
}

export default function Explorer({ loading }: ExplorerProps) {
  const { nodes } = useEditorStore(state => state)

  if (loading) {
    return (
      <div className="p-2">
        <Skeleton />
      </div>
    )
  }

  return (
    <div>
      {nodes.map(node => (
        <TreeNode node={node} key={node.id} />
      ))}
    </div>
  )
}

function Skeleton() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 8)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧']

  return (
    <div className="space-y-4 text-neutral-400">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">{spinnerFrames[frame]}</span>
        <span>Loading files...</span>
      </div>
    </div>
  )
}

function TreeNode({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false)
  const { selected, setSelected, renamingNodeId, setRenamingNodeId } =
    useEditorStore(state => state)
  const { deleteNode, renameNode } = useExplorer()

  const [isRenaming, setIsRenaming] = useState(false)

  useEffect(() => {
    if (renamingNodeId === node.id) {
      setIsRenaming(true)
      setRenamingNodeId(null)
    }
  }, [renamingNodeId, node.id, setRenamingNodeId])
  const [menuPosition, setMenuPosition] = useState<{
    x: number
    y: number
  } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const nodeIcon = !node.isFolder ? (
    <File size={16} />
  ) : isOpen ? (
    <ChevronDown size={16} />
  ) : (
    <ChevronRight size={16} />
  )

  const handleRename = () => {
    if (!inputRef.current) return
    const newName = inputRef.current.value.trim()
    if (newName && newName !== node.name) {
      renameNode({ id: node.id, name: newName })
    }
    setIsRenaming(false)
  }

  return (
    <li>
      <div
        onContextMenu={e => {
          e.preventDefault()
          e.stopPropagation()
          setMenuPosition({ x: e.clientX, y: e.clientY })
        }}
        onClick={() => {
          if (!isRenaming) {
            setIsOpen(prev => !prev)
            setSelected({
              id: node.id,
              type: node.isFolder ? 'folder' : 'file',
            })
          }
        }}
        className={cn(
          'google-sans-code flex h-7 cursor-pointer items-center gap-1 px-1 text-sm select-none hover:bg-neutral-800',
          selected.id === node.id &&
            !isRenaming &&
            'bg-neutral-800 text-blue-500'
        )}
      >
        <div className="flex w-full items-center justify-start gap-1">
          {nodeIcon}
          {isRenaming ? (
            <input
              ref={inputRef}
              defaultValue={node.name}
              className="h-6 w-full rounded border border-blue-500 bg-neutral-900 px-1 text-sm text-white outline-none"
              onClick={e => e.stopPropagation()}
              onKeyDown={e => {
                if (e.key === 'Enter') handleRename()
                if (e.key === 'Escape') setIsRenaming(false)
              }}
              onBlur={handleRename}
              autoFocus
            />
          ) : (
            <span className="flex items-center gap-2 truncate">
              {node.name}
            </span>
          )}
          {(node.children?.length ?? 0) > 0 && <span>{node.isFolder}</span>}
        </div>
      </div>
      {isOpen && (
        <ul className="ml-4 border-l border-neutral-800 opacity-70">
          {node.children?.map(child => (
            <TreeNode node={child} key={child.id} />
          ))}
        </ul>
      )}

      {menuPosition && (
        <ContextMenu
          x={menuPosition.x}
          y={menuPosition.y}
          onClose={() => setMenuPosition(null)}
        >
          <ContextMenuItem
            icon={<Edit2 size={14} />}
            onClick={() => {
              setIsRenaming(true)
              setMenuPosition(null)
            }}
          >
            Rename
          </ContextMenuItem>
          <ContextMenuItem
            icon={<Trash2 size={14} />}
            onClick={() => {
              deleteNode(node.id)
              setMenuPosition(null)
            }}
            className="text-red-400 hover:bg-red-900/20 hover:text-red-400"
          >
            Delete
          </ContextMenuItem>
        </ContextMenu>
      )}
    </li>
  )
}
