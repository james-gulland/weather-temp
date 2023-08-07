import { useState } from 'react'
import axios from 'axios'
import { Destination, WeatherSelection, weatherOptions } from '../types/interfaces'
import TemperatureControls from './TemperatureControls'
import TempType from './TempType'
import MonthDropdown from './MonthDropdown'
import Nav from './Nav'
import Grid from './Grid'

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
      <header>
        <div className="sun-gradient">
          <Nav />
          <h1>OnlySun</h1>
          <h2>Helping you find the best place to travel at {minTemp}-{maxTemp}°C in {month}</h2>
        </div>

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

      </header>
        
        <main>
        {/* GRID container */}
        <div className="filtered-destination-container">
          <Grid filteredDestinations={filteredDestinations} month={month}/>
        </div>
      </main>
      
      {/* FOOTER container */}
      <footer></footer>
    </>
  )

}
export default Home