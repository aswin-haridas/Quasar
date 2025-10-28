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
  return (
    <div className="w-fit h-fit m-1">
      <button
        onClick={onClick}
        {...rest}
        className={cn(
          'bg-primary-500 hover:border-b-0 border-b-2 text-white px-4 border-primary-700 py-[0.2em] rounded-sm hover:translate-y-[0.1em] hover:bg-primary-700 cursor-pointer',
          className
        )}
      >
        {children}
      </button>
    </div>
  )
}
