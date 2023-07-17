import { useState } from 'react'
import axios from 'axios'
import { generateTemperatureRange } from './helpers/filter'
import { Destination } from './types/interfaces'

function App() {

  // destination states
  // const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])

  // month state
  const [month, setMonth] = useState<string>('July')

  // temperature states and variables
  const [minTemp, setMinTemp] = useState<number>(20)
  const [maxTemp, setMaxTemp] = useState<number>(25)
  const rangeMinTemp:number = 15
  const rangeMaxTemp:number = 35
  const temperatureRange = generateTemperatureRange(rangeMinTemp, rangeMaxTemp)

  // useEffect(() => {
  //   const getData = async (): Promise<void> => {
  //     try { 
  //       const { data } = await axios.get<Destination[]>('/api/destinations/')
  //       setDestinations(data)
  //       console.log('All destinations', data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  const retrieveDestinations = (month: string, minTemp: number, maxTemp: number) => {
    const getData = async (): Promise<void> => {
      try { 
        const { data } = await axios.get<Destination[]>(`/api/destinations/filter/?month=${month}&min_temp=${minTemp}&max_temp=${maxTemp}`)
        setFilteredDestinations(data)
        console.log(`Filtered destinations by ${month} and ${minTemp}-${maxTemp}`, data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }

  return (
    <>
      <h1>Hello world</h1>
      <div className="month-container">
        <label htmlFor="months">Choose a month:</label>

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
        <button onClick={() => retrieveDestinations(month, minTemp, maxTemp)}>Go!</button>
      </div>

      <div className="filtered-destination-container">
        {filteredDestinations.length > 0 ? 
          <>
            <div className="destination-card">
              {filteredDestinations.map((dest) => {
                const weatherDataForMonth = dest.weatherdata.find(data => data.month === month)
                console.log(weatherDataForMonth)
                const averageTemperature = weatherDataForMonth ? weatherDataForMonth.average_temperature : 'N/A'

                return (
                  <ul key={dest.name}>
                    <li>{dest.name}, {dest.country}</li>
                    <li>Average Temperature: {averageTemperature}</li>
                  </ul>
                )
              })}
            </div>
          </>
          :
            <div>None</div>
        }
      </div>
    </>
  )
}

export default App
