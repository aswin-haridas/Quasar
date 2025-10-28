import { FilePlus2, PackagePlus } from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="w-48 bg-bg-primary border-r border-border-primary text-text-primary">
      <div className="p-1 flex items-center justify-end border-b border-border-primary">
        <div className="hover:bg-border-primary p-1 rounded-md">
          <FilePlus2 size={18} />
        </div>
        <div className="hover:bg-border-primary p-1 rounded-md">
          <PackagePlus size={18} />
        </div>
      </div>
    </aside>
  )
}
