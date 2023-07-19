interface Props {
  minTemp: number
  maxTemp: number
  setMinTemp: React.Dispatch<React.SetStateAction<number>>
  setMaxTemp: React.Dispatch<React.SetStateAction<number>>
}

const TemperatureControls: React.FC<Props> = ({ minTemp, maxTemp, setMinTemp, setMaxTemp }) => {

  // const rangeMinTemp:number = 15
  // const rangeMaxTemp:number = 35

  // const handleTempChange = (minOrMaxTemp: string, e: React.ChangeEvent<HTMLSelectElement>) => {
  //   // const handleTempChange = (minOrMaxTemp: string, e: React.FormEvent) => {
  //   const buttonClicked = e.target.value
  //   if (minOrMaxTemp === "min") {
  //     if (buttonClicked === '+')
  //       setMinTemp(minTemp + 1)
  //     else
  //       setMaxTemp(minTemp - 1)
  //   }
  // }

  // this function takes a string to understand whether to change minTemp or maxTemp
  // then INCREMENTS the temperature set
  const handleTempIncrement = (rangeType: string) => {
    if (rangeType === "min") {
      setMinTemp(minTemp + 1)
    } else if (rangeType === "max") {
      setMaxTemp(maxTemp + 1)
    }
  }

  const handleTempDecrement = (rangeType: string) => {
    if (rangeType === "min") {
      setMinTemp(minTemp - 1)
    } else if (rangeType === "max") {
      setMaxTemp(maxTemp - 1)
    }
  }

  return (
    <>
      {/* Min-temp controls */}
      <div id="min-temp-container">
        <div id="min-temp-number">{minTemp}</div>
        <div id="min-temp-controls">
          <button onClick={() => handleTempIncrement("min")}>+</button>
          <button onClick={() => handleTempDecrement("min")}>-</button>
        </div>
      </div>

      <div>to</div>

      {/* Max-temp controls */}
      <div id="max-temp-container">
        <div id="min-temp-number">{maxTemp}</div>
        <div id="min-temp-controls">
          <button onClick={() => handleTempIncrement("max")}>+</button>
          <button onClick={() => handleTempDecrement("min")}>-</button>
        </div>
      </div>
  </>
  )
}

export default TemperatureControls