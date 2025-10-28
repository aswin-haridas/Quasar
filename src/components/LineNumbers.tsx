import { useEffect, useState } from 'react'

interface LineNumbersProps {
  totalLines?: number
  className?: string
}

export default function LineNumbers({
  totalLines = 50,
  className = '',
}: LineNumbersProps) {
  const [lines, setLines] = useState<number[]>([])

  useEffect(() => {
    setLines(Array.from({ length: totalLines }, (_, i) => i + 1))
  }, [totalLines])

  return (
    <div
      className={`flex flex-col items-center w-fit text-sm text-neutral-400 select-none ${className}`}
      style={{ minWidth: '3rem' }}
    >
      {lines.map(lineNumber => (
        <div key={lineNumber} className="leading-6 font-mono">
          {lineNumber}
        </div>
      ))}
    </div>
  )
}
