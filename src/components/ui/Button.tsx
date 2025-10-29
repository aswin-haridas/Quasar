import { cn } from '../../utils/cn'

export default function Button({
  children,
  onClick,
  className,
  ...rest
}: {
  children: React.ReactNode
  onClick: () => void
  className?: string
}) {
  const color = 'blue-500'
  const hoverColor = 'blue-700'

  return (
    <div className="w-fit h-fit m-1">
      <button
        onClick={onClick}
        {...rest}
        className={cn(
          `bg-${color} hover:bg-${hoverColor} border-b-2 border-${hoverColor} hover:border-b-0 text-white px-4 py-[0.2em] rounded-sm hover:translate-y-[0.1em] cursor-pointer flex items-center gap-2 transition-colors`,
          className
        )}
      >
        {children}
      </button>
    </div>
  )
}
