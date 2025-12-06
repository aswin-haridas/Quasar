import Editor, { type Monaco } from '@monaco-editor/react'
import { useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'
import { useEditorStore } from '../store'
import { markdownEditorConfig } from '../utils/editor.config'

export default function EditorComponent() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const { content, updateContent, theme } = useEditorStore(state => state)

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

  return (
    <>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="markdown"
        defaultValue={content}
        value={content}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        theme={theme}
        options={markdownEditorConfig}
      />
    </>
  )
}
