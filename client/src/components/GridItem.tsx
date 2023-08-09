import { Destination, weatherOptions } from '../types/interfaces'
import ImageCarousel from './ImageCarousel'
import axios, { AxiosRequestConfig } from 'axios'
import { useState, useEffect } from 'react'

interface Props {
  dest: Destination
  month: string
  averageTemperature: number | string
  heatIndex: number | string
  humidity: number | string
  averageRainfall: number | string
}

interface ImageUrl {
  urls: {
    small: string;
    thumb: string;
  }
}

const GridItem: React.FC<Props> = ({ dest, month, averageTemperature, heatIndex, humidity, averageRainfall }) => {
  
  // const images: { original: string; thumbnail: string; }[] = []
  const [images, setImages] = useState<{ original: string; thumbnail: string }[]>([])
  const defaultImages: { original: string; thumbnail: string } = {
      original: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=400',
      thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0ODAzNDh8MHwxfGFsbHx8fHx8fHx8fDE2OTA5ODg5MTF8&ixlib=rb-4.0.3&q=80&w=200',
  }

  useEffect(() => {

    // This function retrieves the image parameters from our database for each of the images within the destination
    // Then it calls the Unsplash API
    // const retrieveImageUrls = async () => {

    const retrieveImageUrls = async () => {
      // checks if there are images stored or otherwise allocated default image
      if (dest.images.length > 0) {
        // loop through the images within the destination and call Unsplash API to retrieve URLs
        await Promise.all(
          dest.images.map((image) => {
            const imageParameter = image.image_parameter;
            return callUnsplash(imageParameter);
          })
        );
      } else {
        // If no images are present, push the default images defined above
        // images.push(defaultImages);
        setImages([defaultImages])
      }
    };

    // This function takes in the image parameter stored in our database, and calls the Unsplash API for short and thumbnails
    // These are then passed down into the ImageCarousel in the jsx
    const callUnsplash = (imageParameter: string) => {
      const getData = async (): Promise<void> => {
        try { 
          const authToken = process.env.REACT_APP_UNSPLASH_AUTH_TOKEN
          // const authToken = 'Client-ID c2NIAZC2STrww8Qh8CVb1r_9MDNwPiEyJacvCON_90c'
          const config: AxiosRequestConfig = {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }

          const { data } = await axios.get<ImageUrl>(`https://api.unsplash.com/photos/${imageParameter}`, config)

          const newImage = {
            original: data.urls.small,
            thumbnail: data.urls.thumb,
          }
          // images.push(newImage)
          setImages((prevImages) => [...prevImages, newImage])
          
        } catch (err) {
          console.log(err)
        }
      }
      getData()
    }

    retrieveImageUrls()
  }, [dest.images])

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