import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList';
import { MovieListShimmer } from './Shimmer';

const GptMovieSuggestion = () => {
    const { suggestedMovies, movieNames, isLoading } = useSelector((store) => store.gpt);
    console.log(suggestedMovies, movieNames)
    
    // Show shimmer while loading
    if (isLoading) {
        return (
            <div className='p-2 md:p-4 mt-4 md:mt-8 bg-black bg-opacity-80 rounded-lg'>
                {[...Array(3)].map((_, index) => (
                    <MovieListShimmer key={index} title={`Loading suggestions...`} />
                ))}
            </div>
        )
    }
    
    if (!suggestedMovies || !movieNames) {
        return null;
    }
  return (
      <div className='p-2 md:p-4 mt-4 md:mt-8 bg-black bg-opacity-80 rounded-lg'>
          {
              movieNames.map((name, index) => (
                            <MovieList key={name} movies={suggestedMovies[index]} title={name} />
                ))
          }
    </div>
  )
}

export default GptMovieSuggestion