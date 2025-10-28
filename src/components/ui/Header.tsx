import Logo from './Logo'

export default function Header() {
  return (
    <header className="h-8 flex items-center justify-between">
      <Logo />
      <div>updated just now (4 sec)</div>
    </header>
  )
}
