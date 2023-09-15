import { useEffect, useState } from 'react'
import axios from 'axios'
import { Destination, WeatherSelection, weatherOptions } from '../types/interfaces'
import TemperatureControls from './TemperatureControls'
import TempType from './TempType'
import MonthDropdown from './MonthDropdown'
import HomeNav from './HomeNav'
import Grid from './Grid'
import { celsiusToFahrenheit } from '../helpers/filter'

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
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C')
  
  // function that retrieves desinations from the API based on:
  // MONTH selected, and the MIN-TEMP and MAX-TEMP ranges selected
  // returns data into filteredDestinations
  const retrieveDestinations = (month: string, minTemp: number, maxTemp: number, weatherType: WeatherSelection) => {
    const getData = async (): Promise<void> => {
      try { 
        const { data } = await axios.get<Destination[]>(`/api/destinations/filter/?month=${month}&min_temp=${minTemp}&max_temp=${maxTemp}&weather_type=${weatherType.value}`)
        setFilteredDestinations(data)
        localStorage.setItem('selectedMonth', month)
        localStorage.setItem('selectedMinTemp', minTemp.toString())
        localStorage.setItem('selectedMaxTemp', maxTemp.toString())
        console.log(`Filtered destinations by ${month} and ${minTemp}-${maxTemp}`, data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }

  // ON MOUNT check and retrieve local storage values for temp and month
  useEffect(() => {
    // Fetch from localStorage
    const savedMonth = localStorage.getItem('selectedMonth')
    const savedMinTemp = localStorage.getItem('selectedMinTemp')
    const savedMaxTemp = localStorage.getItem('selectedMaxTemp')

    // Update states if the saved variables are found
    if (savedMonth) setMonth(savedMonth)
    if (savedMinTemp) setMinTemp(Number(savedMinTemp))
    if (savedMaxTemp) setMaxTemp(Number(savedMaxTemp))

    // Call retrieveDestinations if all variables are found
    if (savedMonth && savedMinTemp && savedMaxTemp) {
      retrieveDestinations(savedMonth, Number(savedMinTemp), Number(savedMaxTemp), weatherType)
    }
  }, [])

  return (
    <>
      <header>
        <div className="sun-gradient sun-large"></div>
        <div className="above-gradient homepage">
          <HomeNav tempUnit={tempUnit} setTempUnit={setTempUnit}/>
          <h1>OnlySun</h1>
          <h2 className="homepage-h2">Helping you find the best place to travel at {tempUnit === 'C' ? minTemp : celsiusToFahrenheit(minTemp)}-{tempUnit === 'C' ? maxTemp : celsiusToFahrenheit(maxTemp)}°{tempUnit} in {month}</h2>
        </div>
      </header>
        
      <main>
        {/* CONTROL container */}
        <div id="control-container">
          
          {/* TEMPERATURE controls container */}
          <div id="temperature-container">
            <TemperatureControls minTemp={minTemp} maxTemp={maxTemp} setMinTemp={setMinTemp} setMaxTemp={setMaxTemp} tempUnit={tempUnit}/>
          </div>

          {/* DROP-DOWN containers */}
          <div id="dropdown-container">
            <TempType weatherType={weatherType} setWeatherType={setWeatherType} />
            <div>in</div>
            <MonthDropdown month={month} setMonth={setMonth}/>
            <button className="go-btn" onClick={() => retrieveDestinations(month, minTemp, maxTemp, weatherType)}>Go!</button>
          </div>
        </div>
        
        {/* GRID container */}
        <div className="filtered-destination-container">
          <Grid filteredDestinations={filteredDestinations} month={month} tempUnit={tempUnit}/>
        </div>
      </main>
      
      {/* FOOTER container */}
      <footer></footer>
    </>
  )

}
export default Home