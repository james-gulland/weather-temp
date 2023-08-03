import { Destination, weatherOptions } from '../types/interfaces'
import ImageCarousel from './ImageCarousel'
import axios, { AxiosRequestConfig } from 'axios'

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

  // DUMMY DATA to use
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

  // const images = [
  //   {
  //     original: '',
  //     thumbnail: '',
  //   },
  // ]

  const retrieveImageUrls = () => {

    if (dest.images.length > 0) {
      
      dest.images.map((image) => {
        const imageParameter = image.image_parameter
        // console.log(imageParameter)
        callUnsplash(imageParameter)
      }

    )} else {

    }
  }

  const callUnsplash = (imageParameter: string) => {
    const getData = async (): Promise<void> => {
      try { 

        const authToken = 'Client-ID c2NIAZC2STrww8Qh8CVb1r_9MDNwPiEyJacvCON_90c'
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }

        const { data } = await axios.get<ImageData[]>(`https://api.unsplash.com/photos/${imageParameter}`, config)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }

  retrieveImageUrls()

  return (
    <div className="destination-card">
      
      {/* TOP SECTION of card */}
      <div className="top-card">
        <div className="top-weather">
          <ImageCarousel items={images} showThumbnails={false} showFullscreenButton={false} showPlayButton={false} showBullets={true}/>
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