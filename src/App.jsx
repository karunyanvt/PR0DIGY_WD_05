import React from 'react'
import Weather from './compnents/Weather'
import backgroundimg from './assets/backgroundimg.jpg'

const App = () => {
  return (
    <div 
      className="h-screen w-screen flex justify-center items-center p-3" 
      style={{ backgroundImage: `url(${backgroundimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <Weather />
    </div>
  )
}

export default App