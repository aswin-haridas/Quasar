import { ChevronDown, ChevronRight, File } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { Node } from '../types/index'
import { cn } from '../utils/cn'
import { useEditorStore } from '../store'

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
  const { selected, setSelected } = useEditorStore(state => state)
  const nodeIcon = !node.isFolder ? (
    <File size={16} />
  ) : isOpen ? (
    <ChevronDown size={16} />
  ) : (
    <ChevronRight size={16} />
  )

  return (
    <li>
      <div
        onClick={() => {
          setIsOpen(prev => !prev)
          setSelected({ id: node.id, type: node.isFolder ? 'folder' : 'file' })
        }}
        className={cn(
          'google-sans-code flex h-6 cursor-pointer items-center gap-1 px-1 text-sm select-none hover:bg-neutral-800',
          selected.id === node.id && 'text-blue-500'
        )}
      >
        <div className="flex items-center justify-start gap-1">
          {nodeIcon}
          <span className="flex items-center gap-2">{node.name}</span>
          {node.children && node.children?.length > 0 && (
            <span>{node.isFolder}</span>
          )}
        </div>
      </div>
      {isOpen && (
        <ul className="ml-2 opacity-70">
          {node.children?.map(child => (
            <TreeNode node={child} key={child.id} />
          ))}
        </ul>
      )}
    </li>
  )
}
