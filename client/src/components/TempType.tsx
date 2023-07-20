import { WeatherSelection, weatherOptions } from '../types/interfaces'

interface Props {
  weatherType: WeatherSelection
  setWeatherType: React.Dispatch<React.SetStateAction<WeatherSelection>>
}

const TempType: React.FC<Props>= ( { weatherType, setWeatherType }) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedWeatherType = e.target.value;
    // Find the corresponding WeatherSelection object based on the selected value
    const newWeatherType = weatherOptions.find((option) => option.value === selectedWeatherType)
    if (newWeatherType) {
      setWeatherType(newWeatherType)
    }
  }

  return (
    <>
      <label htmlFor="temp-selector">in </label>
      <select name="temp-selector" id="temp-selector" defaultValue={weatherType.value} onChange={handleChange}>
        <option value={weatherOptions[0].value}>{weatherOptions[0].label}</option>
        <option value={weatherOptions[1].value}>{weatherOptions[1].label}</option>
      </select>
    </>
  )
}

export default TempType