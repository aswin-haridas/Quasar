import { BrushCleaning, SaveIcon } from 'lucide-react'
import { cn } from '../../utils'
import { useEditorStore } from '../../store'
import Button from './Button'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  const theme = useEditorStore(store => store.theme)

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 border-neutral-700 text-white' : ''

  return (
    <header
      className={cn(
        'text-text-primary flex h-8 items-center justify-between border-b border-neutral-200 px-2',
        darkTheme
      )}
    >
      <Logo />
      <div className="flex items-center">
        <div className="text-text-secondary text-xs">
          updated just now (4 sec)
        </div>
        <Button onClick={() => {}}>View Raw</Button>
        <Button onClick={() => {}}>
          <BrushCleaning size={16} />
          Clear
        </Button>
        <Button onClick={() => {}}>
          <SaveIcon size={16} /> Save
        </Button>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
