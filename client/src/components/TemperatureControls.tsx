import { celsiusToFahrenheit } from "../helpers/filter"

interface Props {
  minTemp: number
  maxTemp: number
  setMinTemp: React.Dispatch<React.SetStateAction<number>>
  setMaxTemp: React.Dispatch<React.SetStateAction<number>>
  tempUnit: 'C' | 'F'
}

const TemperatureControls: React.FC<Props> = ({ minTemp, maxTemp, setMinTemp, setMaxTemp, tempUnit }) => {

  const rangeMinTemp:number = 15
  const rangeMaxTemp:number = 35 

  // this function takes a string to understand whether to change minTemp or maxTemp
  // then INCREMENTS the temperature set
  const handleTempIncrement = (rangeType: string) => {
    if (rangeType === "min") {
      const newMinTemp = minTemp + 1
      if (newMinTemp <= maxTemp && newMinTemp <= rangeMaxTemp) {
        setMinTemp(newMinTemp)
      }
    } else if (rangeType === "max") {
      const newMaxTemp = maxTemp + 1
      if (newMaxTemp >= minTemp && newMaxTemp <= rangeMaxTemp) {
        setMaxTemp(newMaxTemp)
      }
    }
  }

  // this function takes a string to understand whether to change minTemp or maxTemp
  // then DECREMENTS the temperature set
  const handleTempDecrement = (rangeType: string) => {
    if (rangeType === "min") {
      const newMinTemp = minTemp - 1;
      if (newMinTemp >= rangeMinTemp && newMinTemp < maxTemp) {
        setMinTemp(newMinTemp)
      }
    } else if (rangeType === "max") {
      const newMaxTemp = maxTemp - 1;
      if (newMaxTemp >= minTemp && newMaxTemp >= rangeMinTemp) {
        setMaxTemp(newMaxTemp)
      }
    }
  }

  return (
    <>
      {/* Min-temp controls */}
      <div id="min-temp-container">
        <div id="min-temp-number" className="tempNumber">{tempUnit === 'C' ? minTemp : celsiusToFahrenheit(minTemp)}</div>
        <div id="min-temp-controls">
          <button onClick={() => handleTempDecrement("min")} disabled={minTemp <= rangeMinTemp}>-</button>
          <button onClick={() => handleTempIncrement("min")} disabled={minTemp >= maxTemp || minTemp >= rangeMaxTemp}>+</button>
        </div>
      </div>

      <div id="to-container">to</div>

      {/* Max-temp controls */}
      <div id="max-temp-container">
        <div id="max-temp-number" className="tempNumber">{tempUnit === 'C' ? maxTemp : celsiusToFahrenheit(maxTemp)}</div>
        <div id="max-temp-controls">
          <button onClick={() => handleTempDecrement("max")} disabled={maxTemp <= minTemp}>-</button>
          <button onClick={() => handleTempIncrement("max")} disabled={maxTemp >= rangeMaxTemp}>+</button>
        </div>
      </div>
  </>
  )
}

export default TemperatureControls