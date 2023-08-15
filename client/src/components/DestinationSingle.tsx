import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Destination } from '../types/interfaces'
import axios from 'axios'

const DestinationSingle = () => {

  // grab the slug data from the params, to cross-reference with API call
  const { slug } = useParams()
  const [destination, setDestination] = useState<Destination[]>([])

  useEffect(() => {

    // on pageload, get destination data based on the entered slug
    const getData = async (): Promise<void> => {
      try { 
        const { data } = await axios.get<Destination[]>(`/api/destinations/${slug}/`)
        setDestination(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <div>Hello {slug}!</div>
  )
}

export default DestinationSingle