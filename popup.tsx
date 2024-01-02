import { useState } from "react"
import './style.css'

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="w-[300px] h-[800px]">
      <h1 className="text-lg">Suica 交通費計算ヘルパー</h1>
    </div>
  )
}

export default IndexPopup
