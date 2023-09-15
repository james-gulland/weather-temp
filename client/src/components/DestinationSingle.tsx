import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Destination } from '../types/interfaces'
import { retrieveImageUrls, defaultImages } from '../helpers/filter'
import axios from 'axios'
import Nav from './Nav'
import ImageCarousel from './ImageCarousel'
import Map from './Map'
import ClimateOverview from './ClimateOverview'

const DestinationSingle = () => {

  // grab the slug data from the params, to cross-reference with API call
  const { slug } = useParams()
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C')
  const [destination, setDestination] = useState<Destination | null>(null)
  const [images, setImages] = useState<{ original: string; thumbnail: string }[]>([])

  // get destination data once slug established
  useEffect(() => {
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

  // get images once destination available
  useEffect(() => {
    if (destination) {
      if (destination.images.length > 0) {
        retrieveImageUrls(destination, setImages, defaultImages, 'regular')
      } else {
        setImages([defaultImages])
      }
    }
  }, [destination])

  return (
    <>
      <header>
        <div className="sun-gradient"></div>
        <div className="above-gradient">
          <Nav tempUnit={tempUnit} setTempUnit={setTempUnit}/>    
          <h2 className="destination-title">
            {destination ? `${destination.name}, ${destination.country}` : 'Loading...'}  
          </h2>
        </div>
      </header>

      <main>
        <div className="destination-top">
          <div className="destination-image-carousel">
            <ImageCarousel
              items={images} 
              showThumbnails={ destination && destination.images.length > 0 ? true : false}
              showFullscreenButton={true} 
              showPlayButton={false} 
              showBullets={ destination && destination.images.length > 0 ? true : false}
            />
          </div>
          <div className="map-container">
            <Map 
              longitude={destination ? destination.longitude : 0}
              latitude={destination ? destination.latitude : 0}
            />
          </div>
        </div>

        <div className="destination-middle">
          <h3>Climate Snapshot</h3>
          <div className="climate-container">
            { destination && <ClimateOverview weatherdata={destination.weatherdata}/> }
          </div>
        </div>
      </main>
    </>
  )
}

export default DestinationSingle