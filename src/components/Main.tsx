import Editor from '@monaco-editor/react'
import { useRef } from 'react'
import type { editor } from 'monaco-editor'
import useEditorStore from '../store/useEditorStore'

export default function Main() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const updateContent = useEditorStore(state => state.updateContent)
  const content = useEditorStore(state => state.content)

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor
  }

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
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </>
  )
}
