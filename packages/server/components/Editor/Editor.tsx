import { EditorView, basicSetup } from "codemirror"
import { useLayoutEffect, useRef } from "react"
import {
  keymap, highlightSpecialChars, drawSelection, dropCursor,
  rectangularSelection, crosshairCursor, placeholder
} from "@codemirror/view"
import { Extension, EditorState } from "@codemirror/state"
import {
  defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
  foldGutter, foldKeymap
} from "@codemirror/language"
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands"
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete"

export function Editor() {
  const $editor = useRef<HTMLDivElement>(null)
  const cm = useRef<EditorView | null>(null)

  useLayoutEffect(() => {
    if ($editor.current) {
      cm.current = initEditor($editor.current)
    }

    return () => {
      cm.current?.destroy()
    }
  }, [])

  return (
    <div className="w-full h-full" ref={$editor}>

    </div>
  )
}

function initEditor($el: HTMLElement) {
  const theme = EditorView.theme({
    '&': {
      'width': '100%',
      'height': '100%',
      'cursor': 'text',
      'font-size': "16px",
    },
    '&.cm-focused': {
      'outline': 'none',
    },
    '&.cm-content': {
      'white-space': 'pre-wrap',
    }
  }, {
    dark: true
  })

  const view = new EditorView({
    extensions: [
      // basicSetup,
      theme,
      // lineNumbers(),
      // highlightActiveLineGutter(),
      highlightSpecialChars(),
      history(),
      // foldGutter(),
      drawSelection(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(true),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      bracketMatching(),
      closeBrackets(),
      autocompletion(),
      rectangularSelection(),
      crosshairCursor(),
      placeholder("Write Now..."),
      EditorView.lineWrapping,
      // highlightActiveLine(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        ...historyKeymap,
        ...foldKeymap,
        ...completionKeymap,
      ])
    ],
    parent: $el,
  })
  return view
}