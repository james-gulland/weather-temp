import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [destinations, setDestinations] = useState([])
  const defaultMinTemp:number = 15
  const defaultMaxTemp:number = 35

  useEffect(() => {
    const getData = async () => {
      try { 
        const { data } = await axios.get('/api/destinations/')
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
        <select name="min-temp" id="min-temp">
          <option value={defaultMinTemp}>{defaultMinTemp}</option>
          <option value={defaultMaxTemp}>{defaultMaxTemp}</option>
        </select>
        <select name="max-temp" id="max-temp">
          <option value={defaultMinTemp}>{defaultMinTemp}</option>
          <option value={defaultMaxTemp}>{defaultMaxTemp}</option>
        </select>

      </div>
    </>
  )
}

export default App
