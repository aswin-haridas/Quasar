import Editor, { type Monaco } from '@monaco-editor/react'
import { useRef, useEffect } from 'react'
import type { editor } from 'monaco-editor'
import useEditorStore from '../store/useEditorStore'
import tokyoNightTheme from '../../themes/tokyo-night-color-theme.json'
import tokyoNightStormTheme from '../../themes/tokyo-night-storm-color-theme.json'
import tokyoNightLightTheme from '../../themes/tokyo-night-light-color-theme.json'

interface TokenColor {
  name?: string
  scope: string | string[]
  settings: {
    foreground?: string
    background?: string
    fontStyle?: string
  }
}

interface ThemeData {
  name: string
  colors: Record<string, string>
  tokenColors: TokenColor[]
}

export default function Main() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const monacoRef = useRef<Monaco | null>(null)
  const updateContent = useEditorStore(state => state.updateContent)
  const content = useEditorStore(state => state.content)
  const theme = useEditorStore(state => state.theme)

  const defineTheme = (
    monaco: Monaco,
    themeName: string,
    themeData: ThemeData
  ) => {
    monaco.editor.defineTheme(themeName, {
      base: themeName.includes('light') ? 'vs' : 'vs-dark',
      inherit: true,
      rules: (themeData.tokenColors as TokenColor[])
        .map(token => ({
          token: Array.isArray(token.scope)
            ? token.scope.join(',')
            : token.scope,
          foreground: token.settings.foreground?.replace('#', ''),
          background: token.settings.background?.replace('#', ''),
          fontStyle: token.settings.fontStyle || '',
        }))
        .filter(rule => rule.token),
      colors: themeData.colors,
    })
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) {
    editorRef.current = editor
    monacoRef.current = monaco

    // Define all Tokyo Night themes
    defineTheme(monaco, 'tokyo-night', tokyoNightTheme as ThemeData)
    defineTheme(monaco, 'tokyo-night-storm', tokyoNightStormTheme as ThemeData)
    defineTheme(monaco, 'tokyo-night-light', tokyoNightLightTheme as ThemeData)

    // Set the current theme
    monaco.editor.setTheme(theme)
  }

  // Update theme when it changes in the store
  useEffect(() => {
    if (monacoRef.current) {
      monacoRef.current.editor.setTheme(theme)
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
        defaultLanguage="Markdown"
        defaultValue={content}
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        theme="tokyo-night"
        options={{
          minimap: {
            enabled: false,
          },
        }}
      />
    </>
  )
}
