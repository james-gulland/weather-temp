import axios, { AxiosRequestConfig } from 'axios'
import { ImageUrl } from '../types/interfaces'

// this function takes a min temp and a max temp, and
// returns an array of all numbers within that temp range
export const generateTemperatureRange = (minTemp: number, maxTemp: number): number[] => {
  const range: number[] = [];
  for (let i = minTemp; i <= maxTemp; i++) {
    range.push(i);
  }
  return range
}

// This function takes in the image parameter stored in our database, and calls the Unsplash API for short and thumbnails
// These are then passed down into the ImageCarousel in the jsx
const callUnsplash = async (imageParameter: string, setImages: Function, imageSize: 'small' | 'regular') => {
  try { 
    const authToken = process.env.REACT_APP_UNSPLASH_AUTH_TOKEN
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }

    const { data } = await axios.get<ImageUrl>(`https://api.unsplash.com/photos/${imageParameter}`, config)
    console.log('Here is the image data ->', data)
    const newImage = {
      original: data.urls[imageSize],
      thumbnail: data.urls.thumb,
    }

    setImages((prevImages: any) => [...prevImages, newImage])

  } catch (err) {
    console.log(err)
  }
}

// This function retrieves the image parameters from our database for each of the images within the destination
// Then it calls the Unsplash API
export const retrieveImageUrls = async (dest: any, setImages: Function, defaultImages: any, imageSize: 'small' | 'regular') => {
      
  // checks if there are images stored or otherwise allocated default image
  if (dest.images.length > 0) {
    // loop through the images within the destination and call Unsplash API to retrieve URLs
    const imagePromises = dest.images.map((image: any) => {
      const imageParameter = image.image_parameter
      return callUnsplash(imageParameter, setImages, imageSize)
    })
    await Promise.all(imagePromises)
  } else {
     // If no images are present, push the default images defined above
    setImages([defaultImages])
  }
}