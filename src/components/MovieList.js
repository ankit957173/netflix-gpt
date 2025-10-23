import React from 'react'
import MovieCard from './MovieCard';    
const MovieList = ({ title, movies }) => {
  return (
    <div className='px-6'>
      <h1 className='text-white text-2xl py-2'>{title}</h1>
      <div className='flex overflow-x-auto scrollbar-hide'>
        {movies?.map((movie) => (
          <MovieCard key={movie.id} posterPath={movie.backdrop_path} />
        ))}
      </div>
    </div>
  )
}

export default MovieList