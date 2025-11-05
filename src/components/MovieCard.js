import React from 'react'
import { useNavigate } from 'react-router-dom'
import { IMAGE_CDN_URL } from '../utils/constants'

const MovieCard = ({ posterPath, movieId }) => {
  const navigate = useNavigate();

  if (!posterPath) {
    return null; // Return null if posterPath is not available
  }

  const handleClick = () => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
    }
  }

  return (
    <div 
      className='flex-shrink-0 w-28 sm:w-36 md:w-48 lg:w-56 xl:w-64 transition-transform duration-300 hover:scale-110 cursor-pointer'
      onClick={handleClick}
    >
      <img 
        src={IMAGE_CDN_URL+posterPath} 
        alt="Movie poster" 
        className='w-full h-40 sm:h-52 md:h-72 lg:h-80 object-cover rounded-lg'
        loading="lazy"
      />
    </div>
  )
}

export default MovieCard