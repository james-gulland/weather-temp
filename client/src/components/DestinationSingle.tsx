import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Destination } from '../types/interfaces'
import Nav from './Nav'
import axios from 'axios'

const DestinationSingle = () => {

  // grab the slug data from the params, to cross-reference with API call
  const { slug } = useParams()
  const [destination, setDestination] = useState<Destination | null>(null)

  useEffect(() => {

    // on pageload, get destination data based on the entered slug
    const getData = async (): Promise<void> => {
      try { 
        const { data } = await axios.get<Destination>(`/api/destinations/${slug}/`)
        setDestination(data)
        console.log(`Single destination data:`, data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [slug])


  return (
    <>
      <div className="header sun-gradient">
        <Nav />
        <h1>{destination?.name || 'Loading...'}</h1>
      </div>
      
    </>
  )
}

export default DestinationSingle