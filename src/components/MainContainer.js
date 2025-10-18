import React from 'react'
import { useSelector } from 'react-redux'
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const moviews=useSelector((store)=>store.movies?.nowPlaying)
    
    if(moviews===null) return null;
    const movie = moviews?.[Math.floor(Math.random() * moviews.length)];

    const{original_title,overview,id}=movie;
  return (
      <div>
          
          <VideoTitle title={original_title} overview={ overview} />
          <VideoBackground movieId={id} />
    </div>
  )
}

export default MainContainer