import React, {  useEffect } from 'react'
import { API_OPTIONS,NOW_PLAYING_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { addNowPlayingMovies } from '../utils/moviesSlice';



const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const {nowPlaying}=useSelector((store)=>store.movies);
  const getNowPlayingMovies=async()=>{
    const response=await fetch(NOW_PLAYING_URL,API_OPTIONS);
    const data=await response.json();
    dispatch(addNowPlayingMovies(data.results));
    
  }
  useEffect(() => {
  !nowPlaying&&  getNowPlayingMovies();
  }, []);
}

export default useNowPlayingMovies;