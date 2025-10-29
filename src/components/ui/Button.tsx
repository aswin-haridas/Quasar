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
    <div className="m-1 h-fit w-fit">
      <button
        onClick={onClick}
        {...rest}
        className={cn(
          `bg-${color} hover:bg-${hoverColor} border-b-2 border-${hoverColor} flex cursor-pointer items-center gap-1 rounded-sm p-1 text-xs text-white transition-colors hover:translate-y-[0.1em] hover:border-b-0`,
          className
        )}
      >
        {children}
      </button>
    </div>
  )
}
