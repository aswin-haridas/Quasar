import { BrushCleaning, SaveIcon } from 'lucide-react'
import { cn } from '../../utils'
import { useEditorStore } from '../../store'
import Button from './Button'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import api from 'utils/api'
import { toast } from 'sonner'

export default function Header() {
  const theme = useEditorStore(store => store.theme)
  const content = useEditorStore(store => store.content)
  const selected = useEditorStore(store => store.selected)
  const updateContent = useEditorStore(store => store.updateContent)

  console.log(selected)

  function saveNote() {
    if (selected.type === 'file') {
      const newNote = {
        note: content,
        source: selected.id,
      }
      const res = api.post('/save-notes', newNote)
      console.log(res)
    } else {
      toast('File is not selected somehow')
    }
  }

  function clearEditor() {
    updateContent('')
  }

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 border-neutral-700 text-white' : ''

  return (
    <header
      className={cn(
        'flex h-8 items-center justify-between border-b border-neutral-200 px-2',
        darkTheme
      )}
    >
      <Logo />
      <div className="flex items-center">
        <div className="text-text-secondary text-xs">
          updated just now (4 sec)
        </div>
        <Button onClick={() => {}}>View Raw</Button>
        <Button onClick={clearEditor}>
          <BrushCleaning size={16} />
          Clear
        </Button>
        <Button onClick={saveNote}>
          <SaveIcon size={16} /> Save
        </Button>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
