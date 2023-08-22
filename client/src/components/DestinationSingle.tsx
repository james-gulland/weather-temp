import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Destination } from '../types/interfaces'
import { retrieveImageUrls } from '../helpers/filter'
import Nav from './Nav'
import ImageCarousel from './ImageCarousel'
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
    const defaultImages: { original: string; thumbnail: string } = {
      original: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=200',
    }

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
          <ImageCarousel 
            items={images} 
            showThumbnails={true} 
            showFullscreenButton={true} 
            showPlayButton={false} 
            showBullets={true}
            />
        </div>
      </main>
    </>
  )
}

export default DestinationSingle