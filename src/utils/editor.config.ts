import type { editor } from 'monaco-editor'

/**
 * Monaco Editor configuration optimized for Markdown editing
 * Based on IStandaloneEditorConstructionOptions
 */
export const markdownEditorConfig: editor.IStandaloneEditorConstructionOptions =
  {
    // Basic editor behavior
    wordWrap: 'on', // Essential for markdown - wrap lines to viewport
    // wordWrapColumn: 80, // Removed to ensure viewport wrapping
    wrappingStrategy: 'advanced', // Better wrapping algorithm
    wrappingIndent: 'same', // Maintain indentation on wrapped lines
    stickyScroll: {
      enabled: false,
    },
    // Font and typography
    fontSize: 16,
    lineHeight: 28, // More spacious for reading
    fontFamily: 'monospace, sans-serif', // Clean, readable font
    fontLigatures: false, // Barlow doesn't need ligatures
    letterSpacing: 0.1, // Slightly wider for better readability
    fontWeight: '400', // Regular weight for body text

    // Line numbers and margins
    lineNumbers: 'on',
    lineNumbersMinChars: 3,
    glyphMargin: false, // No need for glyph margin in markdown
    folding: true, // Allow folding of sections
    foldingStrategy: 'indentation',
    showFoldingControls: 'mouseover',

    // Minimap
    minimap: {
      enabled: false, // Typically not needed for markdown
    },

    // Cursor and selection
    cursorStyle: 'line',
    cursorBlinking: 'smooth',
    cursorWidth: 2,
    selectOnLineNumbers: true,
    selectionHighlight: true,
    roundedSelection: true,
    occurrencesHighlight: 'off', // Disable same words highlighting

    // Brackets and auto-closing
    matchBrackets: 'never', // Not useful for markdown
    autoClosingBrackets: 'languageDefined',
    autoClosingQuotes: 'languageDefined',
    autoClosingDelete: 'auto',
    autoClosingOvertype: 'auto',
    autoSurround: 'languageDefined',

    // Indentation
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    autoIndent: 'advanced',

    // Suggestions and IntelliSense
    quickSuggestions: {
      other: true,
      comments: false,
      strings: true,
    },
    quickSuggestionsDelay: 100,
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    acceptSuggestionOnCommitCharacter: true,
    snippetSuggestions: 'top', // Show snippets at top
    tabCompletion: 'on',
    wordBasedSuggestions: 'matchingDocuments',

    // Hover and parameter hints
    hover: {
      enabled: true,
      delay: 300,
      sticky: true,
    },
    parameterHints: {
      enabled: true,
      cycle: true,
    },

    // Links
    links: true, // Enable clickable links in markdown

    // Rendering
    renderLineHighlight: 'none', // Less distracting for markdown
    renderWhitespace: 'selection', // Show whitespace when selected
    renderControlCharacters: false,
    renderFinalNewline: 'on',
    renderLineHighlightOnlyWhenFocus: true,

    // Padding for better reading experience
    padding: {
      top: 16,
      bottom: 16,
    },

    // Scrollbar
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
      verticalScrollbarSize: 14,
      horizontalScrollbarSize: 14,
      useShadows: true,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      arrowSize: 11,
    },

    // Find widget
    find: {
      seedSearchStringFromSelection: 'always',
      autoFindInSelection: 'never',
      addExtraSpaceOnTop: true,
      loop: true,
    },

    // Accessibility
    accessibilitySupport: 'auto',
    ariaLabel: 'Markdown Editor',

    // Performance
    largeFileOptimizations: true,
    stopRenderingLineAfter: 10000,

    // Multi-cursor
    multiCursorModifier: 'alt',
    multiCursorMergeOverlapping: true,
    multiCursorPaste: 'spread',

    // Copy/Paste
    copyWithSyntaxHighlighting: true,
    emptySelectionClipboard: true,

    // Guides
    guides: {
      indentation: true,
      highlightActiveIndentation: true,
      bracketPairs: false, // Not needed for markdown
    },

    // Comments (for markdown, these are code blocks)
    comments: {
      insertSpace: true,
      ignoreEmptyLines: true,
    },

    // Drag and drop
    dragAndDrop: true,
    dropIntoEditor: {
      enabled: true,
      showDropSelector: 'afterDrop',
    },

    // Format
    formatOnPaste: false, // Can be disruptive in markdown
    formatOnType: false,

    // Other useful options
    automaticLayout: true, // Auto-resize on container changes
    fixedOverflowWidgets: true,
    readOnly: false,
    domReadOnly: false,

    // Experimental features
    experimentalWhitespaceRendering: 'svg',
  }
