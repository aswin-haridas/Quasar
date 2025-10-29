import Editor, { type Monaco } from '@monaco-editor/react'
import { useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'
import useEditorStore from '../store/useEditorStore'
import {
  tokyoNightTheme,
  oneDarkProTheme,
  tokyoNightLightTheme,
} from '../themes'
import { markdownEditorConfig } from '../config/editorConfig'

export default function Main() {
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

    // Register custom themes
    monaco.editor.defineTheme('tokyo-night', tokyoNightTheme)
    monaco.editor.defineTheme('one-dark-pro', oneDarkProTheme)
    monaco.editor.defineTheme('tokyo-night-light', tokyoNightLightTheme)

    // Set the current theme AFTER registration
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
    console.log(content)
  }

  return (
    <>
      <Editor
        height="100vh"
        width="100%"
        defaultLanguage="markdown"
        defaultValue={content}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        theme={theme}
        options={markdownEditorConfig}
      />
    </>
  )
}
