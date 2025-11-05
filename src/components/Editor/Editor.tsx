import Editor, { type Monaco } from '@monaco-editor/react'
import { useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'
import { useEditorStore } from '../../store'
import { markdownEditorConfig } from './editor.config'
import { cn } from 'utils/cn'

export default function EditorComponent() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const updateContent = useEditorStore(state => state.updateContent)
  const content = useEditorStore(state => state.content)
  const theme = useEditorStore(state => state.theme)

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor
    monacoRef.current = monaco

    // Set the current theme (using Monaco's built-in themes)
    monaco.editor.setTheme(theme)

    // Force a refresh
    editor.updateOptions({})
  }

  // Update theme when it changes in the store
  useEffect(() => {
    if (monacoRef.current && editorRef.current) {
      monacoRef.current.editor.setTheme(theme)
      editorRef.current.updateOptions({})
    }
  }, [theme])

  function handleEditorChange(value: string | undefined) {
    if (value !== undefined) {
      updateContent(value)
    }
  }

  const darkTheme = theme === 'vs-dark' ? 'bg-neutral-900 text-white' : ''

  return (
    <>
      <Editor
        height="100vh"
        width="100%"
        defaultLanguage="markdown"
        defaultValue={content}
        value={content}
        onMount={handleEditorDidMount}
        loading={
          <div
            className={cn(
              'cookie flex h-full w-full items-center justify-center',
              darkTheme
            )}
          >
            Loading...
          </div>
        }
        onChange={handleEditorChange}
        theme={theme}
        options={markdownEditorConfig}
      />
    </>
  )
}
