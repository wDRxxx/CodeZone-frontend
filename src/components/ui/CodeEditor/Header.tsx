import Select, { SingleValue } from "react-select"
import { option } from "./CodeEditor"
import { useState } from "react"
import Spinner from "../Spinner"
import ThemeBtn from "../ThemeBtn"
import ClearOutputBtn from "./ClearOutputBtn"

type HeaderProps = {
  options: option[]
  isLoading: boolean
  onSubmit: () => void
  onLanguageChange: (newValue: SingleValue<option>) => void
  clear: () => void
}

export default function Header(props: HeaderProps) {
  return (
    <div className="h-12 flex items-center justify-between px-2">
      <div className="flex">
        <Select
          defaultValue={props.options[0]}
          className="w-40 h-full dark:text-white "
          classNamePrefix={" dark:!text-white dark:!border-zinc-800 "}
          classNames={{
            indicatorsContainer: (state) =>
              " dark:!bg-zinc-900 dark:!text-white ",
            container: (state) => " dark:!bg-zinc-900 dark:!text-white ",
            valueContainer: (state) => " dark:!bg-zinc-900 dark:!text-white",
            control: (state) => " !border-zinc-200 !border-2 !shadow-none ",
            option: (state) =>
              " dark:!bg-zinc-800 " +
              (state.isFocused ? " !bg-slate-100 dark:!bg-zinc-900 " : " ") +
              (state.isSelected
                ? " !bg-slate-100 dark:!bg-zinc-900 !text-black "
                : " "),
          }}
          options={props.options}
          onChange={props.onLanguageChange}
        />
        <ThemeBtn className=" ml-2" />
      </div>
      <div className="flex items-center">
        <button
          className={
            "dark:text-zinc-900 w-20 h-10 rounded-md bg-green-500 text-white font-bold transition duration-200 hover:-translate-y-[2px] transform hover:shadow-md" +
            (props.isLoading
              ? "border-2 border-transparentflex items-center justify-center"
              : " hover:bg-transparent hover:text-green-500 border-2 border-transparent hover:border-green-500 flex items-center justify-center")
          }
          onClick={props.onSubmit}
          disabled={props.isLoading}
        >
          {props.isLoading ? <Spinner /> : "Run"}
        </button>
        <ClearOutputBtn clear={props.clear} className="ml-2" />
      </div>
    </div>
  )
}
