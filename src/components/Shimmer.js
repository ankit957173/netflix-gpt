import React from 'react'

const Shimmer = ({ className = "" }) => {
  return (
    <div className={`shimmer-effect bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 ${className}`}></div>
  )
}

// Shimmer for video background
export const VideoShimmer = () => {
  return (
    <div className='relative w-screen aspect-video bg-black'>
      <Shimmer className="w-full h-full" />
    </div>
  )
}

// Shimmer for movie cards
export const MovieCardShimmer = () => {
  return (
    <div className='flex-shrink-0 w-28 sm:w-36 md:w-48 lg:w-56 xl:w-64'>
      <Shimmer className='w-full h-40 sm:h-52 md:h-72 lg:h-80 rounded-lg' />
    </div>
  )
}

// Shimmer for movie list
export const MovieListShimmer = ({ title = "" }) => {
  return (
    <div className='px-3 md:px-6 py-2 md:py-4'>
      {title && (
        <Shimmer className='h-6 md:h-8 w-48 mb-2 md:mb-4 rounded' />
      )}
      <div className='flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 py-1'>
        {[...Array(6)].map((_, index) => (
          <MovieCardShimmer key={index} />
        ))}
      </div>
    </div>
  )
}

// Shimmer for text/title
export const TextShimmer = ({ width = "w-full", height = "h-4", className = "" }) => {
  return (
    <Shimmer className={`${width} ${height} rounded ${className}`} />
  )
}

// Shimmer for video title section
export const VideoTitleShimmer = () => {
  return (
    <div className='absolute inset-0 z-10 flex flex-col justify-center px-4 md:px-12 py-16 md:py-24 space-y-3 md:space-y-6 bg-gradient-to-r from-black/80 via-black/50 to-transparent h-full'>
      <TextShimmer width="w-3/4 md:w-1/2" height="h-8 md:h-12 lg:h-16" className="mb-2" />
      <TextShimmer width="w-full md:w-3/4" height="h-4 md:h-6" className="mb-1" />
      <TextShimmer width="w-full md:w-2/3" height="h-4 md:h-6" className="mb-1" />
      <TextShimmer width="w-3/4 md:w-1/2" height="h-4 md:h-6" className="mb-4 md:mb-6" />
      <div className='flex flex-col sm:flex-row gap-2 md:gap-4'>
        <Shimmer className="h-10 md:h-12 w-24 md:w-32 rounded" />
        <Shimmer className="h-10 md:h-12 w-24 md:w-32 rounded" />
      </div>
    </div>
  )
}

export default Shimmer

