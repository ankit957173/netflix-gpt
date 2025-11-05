import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_OPTIONS, IMAGE_CDN_URL } from '../utils/constants';
import { TextShimmer, VideoShimmer } from './Shimmer';
import Header from './Header';
import VideoBackground from './VideoBackground';

const DetailsPage = () => {
    const { movieId } = useParams();
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!movieId) return;
            
            try {
                setLoading(true);
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    API_OPTIONS
                );
                const data = await response.json();
          
                setMovieDetails(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [movieId]);

    if (loading) {
        return (
            <div className='bg-black min-h-screen'>
                <Header />
                <div className='text-white p-4 md:p-8'>
                    <TextShimmer width="w-3/4" height="h-8" className="mb-4" />
                    <TextShimmer width="w-full" height="h-4" className="mb-2" />
                    <TextShimmer width="w-full" height="h-4" className="mb-2" />
                    <TextShimmer width="w-2/3" height="h-4" />
                </div>
            </div>
        );
    }

    if (!movieDetails) {
        return (
            <div className='bg-black min-h-screen'>
                <Header />
                <div className='text-white p-4 md:p-8'>
                    <h1 className='text-2xl md:text-4xl font-bold mb-4'>Movie not found</h1>
                    <p className='text-gray-400'>The movie you're looking for doesn't exist or couldn't be loaded.</p>
                </div>
            </div>
        );
    }

    const { title, overview, backdrop_path, poster_path, release_date, vote_average, genres } = movieDetails;

    return (
        <div className='bg-black min-h-screen'>
            <Header />
            {/* Trailer Video Section */}
            <div className='relative'>
                <VideoBackground movieId={movieId} />
            </div>
            
            {/* Movie Details Section */}
            <div className='text-white p-4 md:p-8   relative z-20'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
                    {poster_path && (
                        <img 
                            src={IMAGE_CDN_URL + poster_path} 
                            alt={title}
                            className='w-full md:w-1/3 rounded-lg hidden md:block'
                        />
                    )}
                    <div className='flex-1'>
                        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg'>{title}</h1>
                        <div className='flex flex-wrap items-center gap-3 md:gap-4 mb-4'>
                            {release_date && (
                                <p className='text-gray-300 text-sm md:text-base'>📅 {new Date(release_date).toLocaleDateString()}</p>
                            )}
                            {vote_average && (
                                <p className='text-gray-300 text-sm md:text-base'>⭐ {vote_average.toFixed(1)}/10</p>
                            )}
                        </div>
                        {genres && genres.length > 0 && (
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {genres.map((genre) => (
                                    <span key={genre.id} className='px-3 py-1 bg-red-600 rounded-full text-sm font-semibold'>
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        {overview && (
                            <div className='bg-black/60 backdrop-blur-sm rounded-lg p-4 md:p-6 mt-4'>
                                <h2 className='text-xl md:text-2xl font-bold mb-3'>Overview</h2>
                                <p className='text-gray-300 leading-relaxed text-base md:text-lg'>{overview}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;