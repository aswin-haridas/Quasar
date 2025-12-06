import { useEditorStore } from '../store'
import { cn } from '../utils/cn'

export default function HtmlViewer() {
  const { htmlContent, theme } = useEditorStore(state => state)

  const darkTheme =
    theme === 'vs-dark' ? 'bg-neutral-900 text-white' : 'text-black'

  if (!htmlContent) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center p-8',
          darkTheme
        )}
      >
        <p className="text-neutral-500">
          No HTML content available. Save the note to generate it.
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'prose h-full w-full max-w-none overflow-auto p-8',
        darkTheme
      )}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
