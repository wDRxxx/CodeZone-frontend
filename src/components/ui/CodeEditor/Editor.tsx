import CodeMirror from "@uiw/react-codemirror"
import {
  githubLight,
  githubDark,
  githubDarkInit,
} from "@uiw/codemirror-theme-github"
import {
  LanguageSupport,
  StreamLanguage,
  StreamParser,
} from "@codemirror/language"
import { useTheme } from "next-themes"
import { javascript } from "@codemirror/lang-javascript"

type EditorProps = {
  code: string
  onCodeChange: (newValue: string) => void
  language: LanguageSupport[]
  isLoading: boolean
}

const lightEditorTheme = githubLight
const darkEditorTheme = githubDarkInit({
  settings: {
    gutterBackground: "#0d1219",
  },
})

export default function Editor(props: EditorProps) {
  const { theme } = useTheme()

  return (
    <CodeMirror
      className={"w-full h-full md:text-lg !outline-none"}
      value={props.code}
      onChange={props.onCodeChange}
      theme={
        theme == "light" || theme == "system"
          ? lightEditorTheme
          : darkEditorTheme
      }
      extensions={props.language}
      basicSetup={{
        autocompletion: true,
        bracketMatching: true,
        closeBrackets: true,
        tabSize:
          props.language[0].language.name === "go" ||
          props.language[0].language.name === "javascript" ||
          props.language[0].language.name === "cpp"
            ? 2
            : 4,
      }}
      height="95%"
      width="100%"
    />
  )
}
