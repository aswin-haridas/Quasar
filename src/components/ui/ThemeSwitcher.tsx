import { useState } from 'react'
import { Palette } from 'lucide-react'
import useEditorStore, { type Theme } from '../../store/useEditorStore'

const themes: { value: Theme; label: string }[] = [
  { value: 'tokyo-night', label: 'Tokyo Night' },
  { value: 'tokyo-night-storm', label: 'Tokyo Night Storm' },
  { value: 'tokyo-night-light', label: 'Tokyo Night Light' },
]

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const theme = useEditorStore(state => state.theme)
  const setTheme = useEditorStore(state => state.setTheme)

  const currentTheme = themes.find(t => t.value === theme)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors"
        title="Switch Theme"
      >
        <Palette className="h-5 w-5" />
        <span className="text-sm hidden md:inline">{currentTheme?.label}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-20 overflow-hidden">
            {themes.map(t => (
              <button
                key={t.value}
                onClick={() => {
                  setTheme(t.value)
                  setIsOpen(false)
                }}
                className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-700/50 transition-colors ${
                  theme === t.value ? 'bg-gray-700/70 font-medium' : ''
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
