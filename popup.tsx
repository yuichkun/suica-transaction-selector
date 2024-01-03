import { useState } from "react"
import Select from "react-select"

import "./style.css"

import { checkSelectedMonth } from "./script"

const MONTHS = [
  { value: 1, label: "1月" },
  { value: 2, label: "2月" },
  { value: 3, label: "3月" },
  { value: 4, label: "4月" },
  { value: 5, label: "5月" },
  { value: 6, label: "6月" },
  { value: 7, label: "7月" },
  { value: 8, label: "8月" },
  { value: 9, label: "9月" },
  { value: 10, label: "10月" },
  { value: 11, label: "11月" },
  { value: 12, label: "12月" }
]

function IndexPopup() {
  const [selectedMonths, setSelectedMonths] = useState<number[]>([])

  const handleClick = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id as any },
        func: checkSelectedMonth,
        args: [selectedMonths] // Pass the month as an argument
      })
    })
  }

  return (
    <div className="w-[300px] h-[800px] pt-4 px-2 bg-gradient-to-bl from-lime-300 via-teal-300 to-blue-400">
      <h1 className="text-lg text-center">Suica 交通費計算ヘルパー</h1>
      <div className="mt-6">
        <div className="mb-4 text-sm text-center">経費計算する月を選択</div>
        <Select
          isMulti
          name="months"
          options={MONTHS}
          onChange={(months) => {
            setSelectedMonths(months.map((m) => m.value))
          }}
          closeMenuOnSelect={false}
        />
      </div>
      <div className="grid place-content-center">
        <button
          onClick={handleClick}
          className="mt-6 text-lg rounded-lg border-4 px-3 border-blue-400 bg-white">
          合計額を計算
        </button>
      </div>
    </div>
  )
}

export default IndexPopup
