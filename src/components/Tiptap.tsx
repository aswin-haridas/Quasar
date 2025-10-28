// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'plaintext',
      }),
    ],
    content: '', // initial content
  })

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
