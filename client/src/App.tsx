import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [destinations, setDestinations] = useState([])

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
    <h1>Hello world</h1>
  )
}

export default App
