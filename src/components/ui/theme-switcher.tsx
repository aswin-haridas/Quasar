import { SwatchBook } from 'lucide-react'
import { useEditorStore, type Theme } from '../../store'
import Button from './button'

const themes: { value: Theme; label: string }[] = [
  { value: 'vs-dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
]

export default function ThemeSwitcher() {
  const theme = useEditorStore(store => store.theme)
  const setTheme = useEditorStore(store => store.setTheme)

  const currentIndex = themes.findIndex(t => t.value === theme)

  function switchTheme() {
    const newIndex = (currentIndex + 1) % themes.length

    setTheme(themes[newIndex].value)
  }

  return (
    <div className="relative">
      <Button onClick={switchTheme}>
        <SwatchBook size={16} />
      </Button>
    </div>
  )
}
