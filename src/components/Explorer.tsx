import { File, Folder } from 'lucide-react'
import { useState } from 'react'
import { cn } from 'utils/cn'
import { useEditorStore } from '../store'
import type { Node } from 'types/index'

export default function Explorer() {
  const { nodes } = useEditorStore(state => state)
  return (
    <ul>
      {nodes.map(node => (
        <TreeNode node={node} key={node.id} />
      ))}
    </ul>
  )
}

function TreeNode({ node }: { node: Node }) {
  const [isOpen, setIsOpen] = useState(false)
  const { selected, setSelected } = useEditorStore(state => state)
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
          {node.isFolder ? <Folder size={16} /> : <File size={16} />}
          <span className="flex items-center gap-2">{node.name}</span>
          {node.children && node.children?.length > 0 && (
            <span>{isOpen && node.isFolder ? ':' : ''}</span>
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
