import { useEffect } from 'react'
import Editor from '../components/Editor'
import Sidebar from '../components/Sidebar'
import HtmlViewer from '../components/HtmlViewer'
import { useEditorStore } from '../store'
import api from '../utils/api'

export default function Workplace() {
  const viewMode = useEditorStore(state => state.viewMode)
  const selected = useEditorStore(state => state.selected)
  const updateContent = useEditorStore(state => state.updateContent)
  const updateHtmlContent = useEditorStore(state => state.updateHtmlContent)
  const setViewMode = useEditorStore(state => state.setViewMode)

  useEffect(() => {
    async function fetchNote() {
      if (selected.id && selected.type === 'file') {
        try {
          const res = await api.get(`/note/${selected.id}`)
          updateContent(res.data.note)

          if (res.data.html_content) {
            updateHtmlContent(res.data.html_content)
            setViewMode('preview')
          } else {
            updateHtmlContent('')
            setViewMode('editor')
          }
        } catch (error) {
          console.error(error)
          setViewMode('editor')
        }
      }
    }
    fetchNote()
  }, [selected, updateContent, updateHtmlContent, setViewMode])

  return (
    <div className="barlow-regular flex h-full">
      <Sidebar />
      {viewMode === 'preview' ? <HtmlViewer /> : <Editor />}
    </div>
  )
}
