import { useParams } from 'react-router-dom'

const DestinationSingle = () => {
  const { slug } = useParams()
  return (
    <div>Hello {slug}!</div>
  )
}

export default DestinationSingle