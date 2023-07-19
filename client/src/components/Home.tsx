import { useState } from 'react'
import axios from 'axios'
import { generateTemperatureRange } from '../helpers/filter'
import { Destination } from '../types/interfaces'
import TemperatureControls from './TemperatureControls'
import TempType from './TempType'
import MonthDropdown from './MonthDropdown'

const Home: React.FC = () => {

  // destination states
  // const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])

  // month state
  const currentMonth:string = new Date().toLocaleString([], { month: 'long' })
  const [month, setMonth] = useState<string>(currentMonth)

  // temperature states and variables
  
  const [minTemp, setMinTemp] = useState<number>(20)
  const [maxTemp, setMaxTemp] = useState<number>(25)
  const rangeMinTemp:number = 15
  const rangeMaxTemp:number = 35
  // const temperatureRange = generateTemperatureRange(rangeMinTemp, rangeMaxTemp)
  

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

  const handleTempChange = (minOrMaxTemp: string, e: React.ChangeEvent<HTMLSelectElement>) => {
    // const handleTempChange = (minOrMaxTemp: string, e: React.FormEvent) => {
    const buttonClicked = e.target.value
    if (minOrMaxTemp === "min") {
      if (buttonClicked === '+')
        setMinTemp(minTemp + 1)
      else
        setMaxTemp(minTemp - 1)
    }
  }

  return (
    <>
      <header></header>
      <main>
        <h1>OnlySun Helping find you the best place to travel in {month} at {minTemp}-{maxTemp}°C</h1>
        
        {/* CONTROL container */}
        <div id="control-container">
          
          {/* TEMPERATURE controls container */}
          <div id="temperature-container">
            <TemperatureControls minTemp={minTemp} maxTemp={maxTemp} />
          </div>

          {/* DROP-DOWN containers */}
          <div id="dropdown-container">
            <TempType />
            <MonthDropdown month={month} setMonth={setMonth}/>
          </div>
        </div>

        <div className="temp-container">
          {/* <label htmlFor="min-temp">Choose a temp:</label>
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
          </select> */}
          <button onClick={() => retrieveDestinations(month, minTemp, maxTemp)}>Go!</button>
        </div>

        <div className="filtered-destination-container">
          {filteredDestinations.length > 0 ? 
            <>
              <div className="destination-card">
                {filteredDestinations.map((dest) => {
                  const weatherDataForMonth = dest.weatherdata.find(data => data.month === month)
                  const averageTemperature = weatherDataForMonth ? weatherDataForMonth.average_temperature : 'n/a'
                  const heatIndex = weatherDataForMonth ? weatherDataForMonth.heat_index : 'n/a'

                  return (
                    <ul key={dest.name}>
                      <li>{dest.name}, {dest.country}</li>
                      <li>Average Temperature: {averageTemperature}</li>
                      <li>Heat Index: {heatIndex}</li>
                    </ul>
                  )
                })}
              </div>
            </>
            :
            <div>Choose your preference and hit Go!</div>
          }
        </div>
      </main>
      <footer></footer>
    </>
  )

}
export default Home