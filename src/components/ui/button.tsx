import { cn } from '../../utils'

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
  return (
    <div className="m-1 h-fit w-fit">
      <button
        onClick={onClick}
        {...rest}
        className={cn(
          `flex cursor-pointer items-center gap-1 rounded-sm border-b-2 border-blue-700 bg-blue-500 p-1 text-xs text-white transition-colors hover:translate-y-[0.1em] hover:border-b-0 hover:bg-blue-700`,
          className
        )}
      >
        {children}
      </button>
    </div>
  )
}
