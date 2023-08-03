import { Destination, weatherOptions } from '../types/interfaces'
import ImageCarousel from './ImageCarousel'

interface Props {
  dest: Destination
  month: string
  averageTemperature: number | string
  heatIndex: number | string
  humidity: number | string
  averageRainfall: number | string
}

const GridItem: React.FC<Props> = ({ dest, month, averageTemperature, heatIndex, humidity, averageRainfall }) => {

  // Get image data
  // const primaryImage = dest.images.find(img => img.is_primary === true)
  // if (primaryImage) {
  //   console.log(primaryImage.image_parameter)
  // }

  // Map out images into image gallery
  // console.log(dest.images.length > 0)

  const images = [
    {
      original: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=200',
    },
    {
      original: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=200',
    },
  ]

  return (
    <div className="destination-card">
      
      {/* TOP SECTION of card */}
      <div className="top-card">
        <div className="top-weather">
          <ImageCarousel items={images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false}/>
        </div>
      </div>

      {/* BOTTOM SECTION of card */}
      <div className="bottom-card">
        <div className="dest-name">{dest.name}, {dest.country}</div>
        <div className="dest-month">in {month}</div>
        <div className="dest-weather-data">
          <div className="weather-data">{weatherOptions[0].label}: <span>{averageTemperature}</span></div>
          <div className="weather-data">{weatherOptions[1].label}: <span>{heatIndex}</span></div>
          <div className="weather-data">{weatherOptions[2].label}: <span>{humidity}%</span></div>
          <div className="weather-data">{weatherOptions[3].label}: <span>{averageRainfall}mm</span></div>
        </div>
      </div>
    </div>
  )
}

export default GridItem