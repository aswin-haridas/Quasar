import { FilePlus2, PackagePlus } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-48  border-r border-neutral-200 text-text-primary">
      <div className="p-1 flex items-center justify-end border-b border-neutral-200">
        <div className="hover:bg-blue-400 p-1 rounded-md">
          <FilePlus2 size={18} />
        </div>
        <div className="hover:bg-blue-400 p-1 rounded-md">
          <PackagePlus size={18} />
        </div>
      </div>
    </aside>
  )
}
