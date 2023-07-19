interface Props {
  month: string
  setMonth: React.Dispatch<React.SetStateAction<string>>
}

const MonthDropdown = ( {month, setMonth}: Props) => {
  return (
    <>
      <label htmlFor="months">in </label>
      <select name="months" id="months" defaultValue={month} onChange={(e) => setMonth((e.target.value))}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
    </>
  )
}

export default MonthDropdown