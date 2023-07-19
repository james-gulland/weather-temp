interface Props {
  minTemp: number
  maxTemp: number
}

const TemperatureControls = ( {minTemp, maxTemp }: Props ) => {
  return (
    <>
      {/* Min-temp controls */}
      <div id="min-temp-container">
        <div id="min-temp-number">{minTemp}</div>
        <div id="min-temp-controls">
          <button>+</button>
          <button>-</button>
        </div>
      </div>

      <div>to</div>

      {/* Max-temp controls */}
      <div id="max-temp-container">
        <div id="min-temp-number">{maxTemp}</div>
        <div id="min-temp-controls">
          <button>+</button>
          <button>-</button>
        </div>
      </div>
  </>
  )
}

export default TemperatureControls