import Editor, { type Monaco } from '@monaco-editor/react'
import { useRef, useEffect, useState } from 'react'
import type { editor } from 'monaco-editor'
import { useEditorStore } from '../store'
import { markdownEditorConfig } from '../utils/editor.config'
import { cn } from '../utils/cn'
import api from '../utils/api'

export default function EditorComponent() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { content, updateContent, theme, selected } = useEditorStore(
    state => state
  )
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchNote() {
      if (selected.id && selected.type === 'file') {
        setLoading(true)
        try {
          const res = await api.get(`/note/${selected.id}`)
          updateContent(res.data.note)
        } catch (error) {
          console.error(error)
        } finally {
          setLoading(false)
        }
      }
    }
    fetchNote()
  }, [selected, updateContent])

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
        height="100%"
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
            {loading ? 'Loading...' : ''}
          </div>
        }
        onChange={handleEditorChange}
        theme={theme}
        options={markdownEditorConfig}
      />
    </>
  )
}
