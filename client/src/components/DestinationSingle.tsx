import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Destination } from '../types/interfaces'
import { retrieveImageUrls, defaultImages } from '../helpers/filter'
import Nav from './Nav'
import ImageCarousel from './ImageCarousel'
import Map from './Map'
import axios from 'axios'

const DestinationSingle = () => {

  // grab the slug data from the params, to cross-reference with API call
  const { slug } = useParams()
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
      <header className="sun-gradient">
        <Nav />
        <h2 className="destination-title">
          {`${destination?.name}, ${destination?.country}` || 'Loading...'}
        </h2>
      </header>

      <main>
        <div className="destination-top">
          <div className="destination-image-carousel">
            <ImageCarousel
              items={images} 
              showThumbnails={true} 
              showFullscreenButton={true} 
              showPlayButton={false} 
              showBullets={true}
            />
          </div>
          <div className="map-container">
            { (destination) ? 
              <Map 
                longitude={destination.longitude}
                latitude={destination.latitude}/>
              :
              <Map 
                longitude={0}
                latitude={0}/>
            }
          </div>
        </div>
      </main>
    </>
  )
}

export default DestinationSingle