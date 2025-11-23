import { Editor } from 'components/editor'
import Sidebar from '../components/Sidebar'
export default function Workplace() {
  return (
    <div className="barlow-regular flex h-full">
      <Sidebar />
      <Editor />
    </div>
  )
}
