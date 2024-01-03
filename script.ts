export function calcSum() {
  function getCheckedRows(): HTMLTableRowElement[] {
    const rows = Array.from(document.querySelectorAll(".whtBg > input:checked"))
    return rows.map((row) => row.closest("tr")) as HTMLTableRowElement[]
  }
  function getValFromRow(row: HTMLTableRowElement) {
    const stringValue = (
      row.querySelector("td:nth-child(8) > font") as HTMLDivElement
    ).innerText
    const numberValue = parseFloat(stringValue.replace(/,/g, ""))
    return isNaN(numberValue) ? 0 : numberValue
  }

  return getCheckedRows().reduce((acc, cur) => {
    const curVal = getValFromRow(cur)
    console.log("acc, curVal", acc, curVal)
    return acc + curVal
  }, 0)
}

export function checkSelectedMonth(months: number[]) {
  function getAllRows(): HTMLTableRowElement[] {
    return Array.from(document.querySelectorAll("tr.noline ~ tr"))
  }

  function checkRow(row: HTMLTableRowElement) {
    row.querySelector("input")!.checked = true
  }

  function uncheckRow(row: HTMLTableRowElement) {
    row.querySelector("input")!.checked = false
  }

  function uncheckAllRows() {
    getAllRows().forEach(uncheckRow)
  }

  function filterRowByMonth(row: HTMLTableRowElement, targetMonth: number) {
    const dateStr = (row.querySelector("td:nth-child(2)") as HTMLDivElement)
      .innerText
    const month = new Date(dateStr).getMonth() + 1
    return month === targetMonth
  }

  function filterRowByCategory(row: HTMLTableRowElement, pattern: RegExp) {
    const rowCategory = (row.querySelector("td:nth-child(3)") as HTMLDivElement)
      .innerText
    return pattern.test(rowCategory)
  }

  function getTransportationRowsWithinMonth(month: number) {
    const pattern = /^＊?入$/
    return getAllRows()
      .filter((row) => filterRowByMonth(row, month))
      .filter((row) => filterRowByCategory(row, pattern))
  }

  uncheckAllRows()

  for (const month of months) {
    getTransportationRowsWithinMonth(month).forEach(checkRow)
  }
}
