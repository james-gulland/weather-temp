import { useState } from 'react'
import { WeatherSelection } from '../types/interfaces'

const TempType: React.FC = () => {
  
  const weatherOptions: WeatherSelection[] = [
    { value: 'average_temperature', label: 'Avg Temp' },
    { value: 'average_feels_like_temperature', label: 'Feels Like' }
  ]
  const [weatherType, setWeatherType] = useState<WeatherSelection>(weatherOptions[1])

  return (
    <>
      <label htmlFor="temp-selector">in </label>
      <select name="temp-selector" id="temp-selector" defaultValue={weatherType.value}>
        <option value="avg-temp">Avg Temp</option>
        <option value="feels-like">Feels Like</option>
      </select>
    </>
  )
}

export default TempType