import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';
import { VideoShimmer, VideoTitleShimmer } from './Shimmer';
const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlaying)

  const [featuredMovie, setFeaturedMovie] = useState(null)

  useEffect(() => {
  if(movies){
    const random = movies[Math.floor(Math.random() * movies.length)]

    setFeaturedMovie(random)
    }
  
  
        
    }, [movies])

  // Show shimmer while movies are loading or featured movie is not selected
  if(!movies || !featuredMovie) {
    return (
      <div className='relative bg-black'>
        <VideoShimmer />
        <VideoTitleShimmer />
      </div>
    )
  }

  const { original_title, overview, id } = featuredMovie || {};
  return (
      <div className='relative bg-black'>
          <VideoBackground movieId={id} />
          <VideoTitle 
            title={original_title} 
            overview={ overview}
            movieId={id}
          />
        
    </div>
  )
}

export default MainContainer