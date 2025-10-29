import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'

export default function Header() {
  return (
    <header className="h-8 flex items-center justify-between border-b border-neutral-200 px-2 text-text-primary">
      <Logo />
      <div className="flex gap-2 items-center ">
        <div className="text-xs text-text-secondary">
          updated just now (4 sec)
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  )
}
