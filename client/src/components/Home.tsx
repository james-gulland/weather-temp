import { useState } from 'react'
import axios from 'axios'
import { Destination, WeatherSelection, weatherOptions } from '../types/interfaces'
import TemperatureControls from './TemperatureControls'
import TempType from './TempType'
import MonthDropdown from './MonthDropdown'
import Nav from './Nav'

const Home: React.FC = () => {

  // destination states
  // const [destinations, setDestinations] = useState<Destination[]>([])
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([])

  // states between the types of weather (i.e. avg temp / feels like)
  // DEFAULTS to option 1: 'feels like'
  const [weatherType, setWeatherType] = useState<WeatherSelection>(weatherOptions[1])

  // month state
  const currentMonth:string = new Date().toLocaleString([], { month: 'long' })
  const [month, setMonth] = useState<string>(currentMonth)

  // temperature states and variables
  const [minTemp, setMinTemp] = useState<number>(20)
  const [maxTemp, setMaxTemp] = useState<number>(25)
  
  // function that retrieves desinations from the API based on:
  // MONTH selected, and the MIN-TEMP and MAX-TEMP ranges selected
  // returns data into filteredDestinations
  const retrieveDestinations = (month: string, minTemp: number, maxTemp: number, weatherType: WeatherSelection) => {
    const getData = async (): Promise<void> => {
      try { 
        // const { data } = await axios.get<Destination[]>(`/api/destinations/filter/?month=${month}&min_temp=${minTemp}&max_temp=${maxTemp}`)
        const { data } = await axios.get<Destination[]>(`/api/destinations/filter/?month=${month}&min_temp=${minTemp}&max_temp=${maxTemp}&weather_type=${weatherType.value}`)
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
      <Nav />
      <main>
        <header>
          <h1>OnlySun</h1><h2>Helping find you the best place to travel at {minTemp}-{maxTemp}°C in {month}</h2>
        </header>
        
        {/* CONTROL container */}
        <div id="control-container">
          
          {/* TEMPERATURE controls container */}
          <div id="temperature-container">
            <TemperatureControls minTemp={minTemp} maxTemp={maxTemp} setMinTemp={setMinTemp} setMaxTemp={setMaxTemp}/>
          </div>

          {/* DROP-DOWN containers */}
          <div id="dropdown-container">
            <TempType weatherType={weatherType} setWeatherType={setWeatherType} />
            <MonthDropdown month={month} setMonth={setMonth}/>
            <button onClick={() => retrieveDestinations(month, minTemp, maxTemp, weatherType)}>Go!</button>
          </div>
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
                      <li>{weatherOptions[0].label}: {averageTemperature}</li>
                      <li>{weatherOptions[1].label}: {heatIndex}</li>
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