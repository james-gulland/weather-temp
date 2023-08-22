import { Destination, weatherOptions } from '../types/interfaces'
import ImageCarousel from './ImageCarousel'
import { retrieveImageUrls } from '../helpers/filter'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  dest: Destination
  month: string
  averageTemperature: number | string
  heatIndex: number | string
  humidity: number | string
  averageRainfall: number | string
}

const GridItem: React.FC<Props> = ({ dest, month, averageTemperature, heatIndex, humidity, averageRainfall }) => {
  
  // const images: { original: string; thumbnail: string; }[] = []
  const [images, setImages] = useState<{ original: string; thumbnail: string }[]>([])

  // on load 
  useEffect(() => {

    const defaultImages: { original: string; thumbnail: string } = {
      original: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=200',
    }

    // retrieve the images from helpers function to set the images.
    if (dest.images.length > 0) {
      retrieveImageUrls(dest, setImages, defaultImages, 'small')
    } else {
      setImages([defaultImages])
    }
  }, [])

  return (
    <div className="destination-card">
      {/* TOP SECTION of card */}
      <div className="top-card">
        <ImageCarousel 
          items={images} 
          showThumbnails={false} 
          showFullscreenButton={false} 
          showPlayButton={false} 
          showBullets={dest.images.length > 0 ? true : false} />
      </div>

      {/* BOTTOM SECTION of card */}
      <div className="bottom-card">
        <Link to={`/destinations/${dest.slug}`}>
          <div className="dest-name">{dest.name}, {dest.country}</div>
          <div className="dest-month">in {month}</div>
          <div className="dest-weather-data">
            <div className="weather-data">{weatherOptions[0].label}: <span>{averageTemperature}</span></div>
            <div className="weather-data">{weatherOptions[1].label}: <span>{heatIndex}</span></div>
            <div className="weather-data">{weatherOptions[2].label}: <span>{humidity}%</span></div>
            <div className="weather-data">{weatherOptions[3].label}: <span>{averageRainfall}mm</span></div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default GridItem