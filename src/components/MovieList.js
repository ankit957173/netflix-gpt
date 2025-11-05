import React from 'react'
import MovieCard from './MovieCard';
import { MovieListShimmer } from './Shimmer';    
const MovieList = ({ title, movies }) => {
  // Show shimmer while movies are loading
  if(!movies || movies.length === 0) {
    return <MovieListShimmer title={title} />
  }

  return (
    <div className='px-3 md:px-6 py-2 md:py-4'>
      <h1 className='text-white text-base md:text-2xl font-bold mb-2 md:mb-4'>{title}</h1>
      <div className='flex overflow-x-auto scrollbar-hide gap-3 md:gap-4 py-1'>
        {movies?.map((movie) => (
          <MovieCard 
            key={movie.id} 
            posterPath={movie.poster_path || movie.backdrop_path} 
            movieId={movie.id}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList