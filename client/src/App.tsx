import { useEffect, useState } from 'react'
import axios from 'axios'
import { generateTemperatureRange } from './helpers/filter'

function App() {

  interface WeatherData {
    id: number,
    month: string,
    average_temperature: number,
    highest_temperature: number,
    lowest_temperature: number,
    average_feels_like_temperature: number
    highest_feels_like_temperature: number,
    lowest_feels_like_temperature: number,
    relative_humidity: number,
    heat_index: number,
    precipitation_levels: number,
    air_quality_index: number,
    cloud_cover: number,
    destination: number
  }

  interface Destination {
    name: string,
		country: string,
		continent: string,
		latitude: number,
		longitude: number,
		description: string,
    weatherData: WeatherData[]
  }

  const [destinations, setDestinations] = useState<Destination[]>([])
  const [minTemp, setMinTemp] = useState<number>(20)
  const [maxTemp, setMaxTemp] = useState<number>(25)

  const defaultMinTemp:number = 15
  const defaultMaxTemp:number = 35

  const temperatureRange = generateTemperatureRange(defaultMinTemp, defaultMaxTemp)

  useEffect(() => {
    const getData = async (): Promise<void> => {
      try { 
        const { data } = await axios.get<Destination[]>('/api/destinations/')
        setDestinations(data)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1>Hello world</h1>
      <div className="month-container">
        <label htmlFor="months">Choose a month:</label>

        <select name="months" id="months">
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
      </div>

      <div className="temp-container">
        <label htmlFor="min-temp">Choose a temp:</label>
        <select name="min-temp" id="min-temp" defaultValue={minTemp} onChange={(e) => setMinTemp(parseInt(e.target.value))}>
          {temperatureRange.map((temp) => (
            <option key={temp} value={temp}>{temp}</option>
          ))
          }
        </select>
        <select name="max-temp" id="max-temp" defaultValue={maxTemp} onChange={(e) => setMaxTemp(parseInt(e.target.value))}>
          {temperatureRange.map((temp) => (
            <option key={temp} value={temp}>{temp}</option>
          ))
          }
        </select>

      </div>
    </>
  )
}

export default App
