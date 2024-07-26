"use client"

import CodeEditor from "@/components/ui/CodeEditor/CodeEditor"
import CreditsMiniFooter from "@/components/ui/CreditsMiniFooter"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import {
  getPanelElement,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels"
import { useMediaPredicate } from "react-media-hook"

export default function Home() {
  const smScreen = useMediaPredicate("(max-width: 768px)")

  const [codeResult, setCodeResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onFail = (msg: string) => {
    toast.error(msg)
    setIsLoading(false)
  }

  const checkStatus = (id: string) => {
    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "GET",
      headers: headers,
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/check/${id}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          if (data.status === "success") {
            setCodeResult(data.result)
            setIsLoading(false)
          } else {
            checkStatus(id)
          }
        } else {
          onFail(data.message)
          setIsLoading(false)
        }
      })
      .catch((err: Error) => {
        onFail(err.message)
      })
  }

  const onSuccess = (id: string) => {
    checkStatus(id)
  }

  const clear = () => {
    setCodeResult("")
  }

  return (
    <div className="w-full h-full">
      <PanelGroup
        direction={smScreen ? "vertical" : "horizontal"}
        className="w-full bg-slate-50 dark:bg-zinc-900 rounded-md"
      >
        <Panel
          className="bg-transparent min-h-[30%] md:min-w-[30%]"
          id="left-panel"
        >
          <CodeEditor
            onSuccess={onSuccess}
            onFail={onFail}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            clear={clear}
          />
        </Panel>

        <PanelResizeHandle className="h-1 md:w-1 md:h-full bg-zinc-200 dark:bg-zinc-800" />

        <Panel className="w-full h-full min-h-[20%] md:min-w-[20%]">
          <textarea
            className="p-3 w-full h-[calc(100%-2.5rem)] focus-visible:!outline-none text-lg resize-none dark:text-white dark:disabled:bg-neutral-900 disabled:bg-zinc-100 cursor-text"
            disabled={true}
            value={codeResult}
          />

          <CreditsMiniFooter />
        </Panel>
      </PanelGroup>
    </div>
  )
}
