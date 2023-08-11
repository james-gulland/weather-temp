import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import DestinationSingle from './components/DestinationSingle'

function App() {

  return (
    <div className="site-wrapper">
      <BrowserRouter>
          {/* Any element inside of BrowserRouter, but outside of Routes can use the Link and will still be visible on every page */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations/:id" element={<DestinationSingle />} />
          </Routes>
        </BrowserRouter>
    </div>
  )

}

export default App
