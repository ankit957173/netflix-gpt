import { useSelector } from 'react-redux'
import useMovieTrailer from '../hooks/useMovieTrailer';
import { VideoShimmer } from './Shimmer';
const VideoBackground = ({ movieId }) => {
    useMovieTrailer(movieId);
    const trailerVideo=useSelector((store)=>store.movies?.trailerVideo);
    
    // Show shimmer while trailer is loading
    if(!trailerVideo || !trailerVideo.key) {
        return <VideoShimmer />
    }
    
  return (
    <div className='relative w-screen overflow-hidden md:-mt-20'>
      {/* temporary debug ke liye ye class hta rha hu baad me upr lga denge md:-mt-20 */}
          <iframe 
            className='w-screen aspect-video md:aspect-video pointer-events-none' 
            src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&controls=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&loop=1&playlist=${trailerVideo?.key}&enablejsapi=1&origin=${window.location.origin}`}
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            title="Movie Trailer"
            frameBorder="0"
            allowFullScreen
          ></iframe>
    </div>
  )
}

export default VideoBackground