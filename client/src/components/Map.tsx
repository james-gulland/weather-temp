import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

interface Props {
  latitude: number
  longitude: number
}

const Map: React.FC<Props> = ( {latitude, longitude} ) => {
  
  // Define the type for useRef
  const mapContainer = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Type check for the environment variable
    if (!process.env.REACT_APP_MAPBOX_API_KEY) {
      throw new Error('Missing Mapbox API Key')
    }

    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY

    // Check to make sure mapContainer.current is not null
    if (mapContainer.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [longitude, latitude],
        zoom: 10
      })

      // Cleanup on component unmount
      return () => map.remove()
    }
  }, [latitude, longitude])

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />
    </div>
  )
}

export default Map