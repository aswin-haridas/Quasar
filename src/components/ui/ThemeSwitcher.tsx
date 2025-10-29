import useEditorStore, { type Theme } from '../../store/useEditorStore'
import Button from './Button'

const themes: { value: Theme; label: string }[] = [
  { value: 'tokyo-night', label: 'Tokyo Night' },
  { value: 'one-dark-pro', label: 'One Dark Pro' },
  { value: 'tokyo-night-light', label: 'Tokyo Night Light' },
]

export default function ThemeSwitcher() {
  const theme = useEditorStore(store => store.theme)
  const setTheme = useEditorStore(store => store.setTheme)

  const currentTheme = themes.find(t => t.value === theme)
  const currentIndex = themes.findIndex(t => t.value === theme)

  function switchTheme() {
    const newIndex = (currentIndex + 1) % themes.length

    setTheme(themes[newIndex].value)
  }

  return (
    <div className="relative">
      <Button onClick={switchTheme}>
        <span className="text-sm hidden md:inline">{currentTheme?.label}</span>
      </Button>
    </div>
  )
}
