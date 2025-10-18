import React from 'react'
import Button from './Button'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='pt-36 px-6 md:px-12 space-y-6 bg-black bg-opacity-10 text-white absolute bg-gradient-to-r from-black w-screen aspect-video'>
      <h1 className='text-3xl md:text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-sm md:text-lg w-full md:w-1/4'>{overview}</p>
      <div className='flex flex-col sm:flex-row gap-4'>
        <Button variant="primary" size="lg" className="flex items-center justify-center gap-2">
          ▶️ Play
        </Button>
        <Button variant="secondary" size="lg" className="flex items-center justify-center gap-2">
          ℹ️ More Info
        </Button>
      </div>
    </div>
  )
}

export default VideoTitle