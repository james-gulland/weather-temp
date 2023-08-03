import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

interface Image {
  original: string;
  thumbnail: string;
}

interface Props {
  items: Image[]
  showThumbnails: boolean
  showFullscreenButton: boolean
  showPlayButton: boolean
}


const ImageCarousel: React.FC<Props> = ({ items, showThumbnails, showFullscreenButton, showPlayButton }) => {
  return (
    <ImageGallery items={items} showThumbnails={showThumbnails} showFullscreenButton={showFullscreenButton} showPlayButton={showPlayButton} />
  )
}

export default ImageCarousel