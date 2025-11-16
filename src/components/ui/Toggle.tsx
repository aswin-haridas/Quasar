'use client'
import { useState } from 'react'

export default function Toggle() {
  const [on, setOn] = useState(false)

  return (
    <button
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className={`relative h-6 w-12 rounded-full transition-colors duration-200 ease-out ${
        on ? 'bg-blue-600' : 'bg-blue-300'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-out ${
          on ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  )
}
