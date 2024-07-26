"use client"

import { Dispatch, SetStateAction, useState } from "react"
import Select, { SingleValue } from "react-select"
import Spinner from "../Spinner"
import Editor from "./Editor"
import Header from "./Header"

import { LanguageSupport, StreamParser } from "@codemirror/language"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"
import { go } from "@codemirror/lang-go"
import { java } from "@codemirror/lang-java"
import { javascript } from "@codemirror/lang-javascript"
import { csharp } from "@replit/codemirror-lang-csharp"
import { rust } from "@codemirror/lang-rust"
import { useTheme } from "next-themes"

export type option = {
  value: LanguageSupport[]
  label: string
  template: string
}

const options: option[] = [
  {
    value: [javascript()],
    label: "javascript",
    template: `console.log("Hello, World!")`,
  },
  {
    value: [go()],
    label: "go",
    template: `package main

import "fmt"
    
func main() {
  fmt.Println("Hello, World!")
}`,
  },
  {
    value: [python()],
    label: "python",
    template: `print("Hello, World!")`,
  },
  {
    value: [cpp()],
    label: "c++",
    template: `#include <iostream>

using namespace std;

int main() {
  cout << "Hello, World!";
  
  return 0;
}`,
  },
  {
    value: [rust()],
    label: "rust",
    template: `fn main() {
    println!("Hello, World!");
}`,
  },
  {
    value: [csharp()],
    label: "c#",
    template: `using System;

class Program
{
    static void Main()
    {
        Console.WriteLine("Hello, World!");
    }
}`,
  },
  {
    value: [java()],
    label: "java",
    template: `class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
]

type CodeEditorProps = {
  onSuccess: (result: string) => void
  onFail: (msg: string) => void
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  clear: () => void
}

export default function CodeEditor(props: CodeEditorProps) {
  const [language, setLanguage] = useState<option>(options[0])
  const [code, setCode] = useState<string>(options[0].template)

  const onSubmit = () => {
    props.setIsLoading(true)

    const headers = new Headers()
    headers.append("Content-Type", "application/json")

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        language: language.label,
        code: code,
      }),
    }

    fetch(`${process.env.NEXT_PUBLIC_BACKEND}/run`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          props.onSuccess(data.message)
        } else {
          props.onFail(data.message)
        }
      })
      .catch((err: Error) => {
        props.onFail(err.message)
        props.setIsLoading(false)
      })
  }

  const onLanguageChange = (newValue: SingleValue<option>) => {
    setLanguage(newValue!)
    setCode(newValue!.template)
  }

  const onCodeChange = (newValue: string) => {
    setCode(newValue)
  }

  return (
    <div className="w-full h-full">
      <Header
        options={options}
        isLoading={props.isLoading}
        onSubmit={onSubmit}
        onLanguageChange={onLanguageChange}
        clear={props.clear}
      />

      <Editor
        language={language.value}
        isLoading={props.isLoading}
        code={code}
        onCodeChange={onCodeChange}
      />
    </div>
  )
}
