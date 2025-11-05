import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTitle } from '../utils/moviesSlice';

const VideoTitle = ({ title, overview, movieId }) => {
  const showTitleState = useSelector((store) => store.movies.showTitle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleShowTitle = () => {
    dispatch(toggleTitle());
  }
  
  const handleMoreInfo = () => {
    if (movieId) {
      navigate(`/movie/${movieId}`);
    }
  }
  return (
    <div className={`absolute inset-0 z-10 text-white`}>
      {!showTitleState && (
        <div className='absolute top-3 left-3 md:hidden z-20'>
          <button 
            className='px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs backdrop-blur transition'
            onClick={handleShowTitle}
          >
            Show info
          </button>
        </div>
      )}
      {showTitleState && (
        <div className='absolute top-3 right-3 z-10 md:hidden'>
          <button
            aria-label='Hide information'
            onClick={handleShowTitle}
            className='h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur transition flex items-center justify-center'
          >
            ✕
          </button>
        </div>
      )}
      <div className={`${showTitleState ? 'flex' : 'hidden'} md:flex flex-col justify-center px-4 md:px-12 py-16 md:py-24 space-y-3 md:space-y-6 bg-gradient-to-r from-black/80 via-black/50 to-transparent h-full`}>
        <h1 className='text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-snug drop-shadow-md'>
          {title}
        </h1>
        <p className='py-2 md:py-4 text-sm md:text-lg w-full md:max-w-[60%] lg:max-w-[45%] drop-shadow'>
          {overview}
        </p>
        <div className='flex flex-col sm:flex-row gap-3 md:gap-4'>
          <button 
            onClick={() => {
              // Handle play action - can be expanded later
              console.log('Play clicked');
            }}
            className='group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3.5 bg-white text-black hover:bg-opacity-90 rounded-md md:rounded-lg font-semibold text-sm md:text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/60'
          >
            <svg className='w-5 h-5 md:w-6 md:h-6 fill-current' viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
            <span>Play</span>
          </button>
          <button 
            onClick={handleMoreInfo}
            className='group flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-2.5 md:py-3.5 bg-gray-600/80 hover:bg-gray-600 text-white rounded-md md:rounded-lg font-semibold text-sm md:text-lg backdrop-blur-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-black/50 hover:shadow-xl hover:shadow-black/60 border border-white/20 hover:border-white/40'
          >
            <svg className='w-5 h-5 md:w-6 md:h-6 fill-current' viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
            </svg>
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoTitle