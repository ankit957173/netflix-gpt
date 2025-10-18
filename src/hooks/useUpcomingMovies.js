import React, { useEffect } from 'react'
import { API_OPTIONS,UPCOMING_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUpcomingMovies } from '../utils/moviesSlice';
const useUpcomingMovies = () => {
  const dispatch=useDispatch();
  const getUpcomingMovies=async()=>{
    const response=await fetch(UPCOMING_URL,API_OPTIONS);
    const data=await response.json();
    dispatch(addUpcomingMovies(data.results));
  }
  useEffect(() => {
    getUpcomingMovies();
  }, []);
  
}

export default useUpcomingMovies