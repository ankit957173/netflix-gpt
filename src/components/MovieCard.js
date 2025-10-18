import React from 'react'
import { IMAGE_CDN_URL } from '../utils/constants'

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-40 md:w-48 pr-4 flex-shrink-0'>
      <img 
        src={IMAGE_CDN_URL+posterPath} 
        alt="Movie poster" 
        className='w-full h-auto rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
        loading="lazy"
      />
    </div>
  )
}

export default MovieCard