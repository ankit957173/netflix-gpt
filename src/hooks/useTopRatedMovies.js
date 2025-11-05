import React, { useEffect } from 'react'
import { API_OPTIONS,TOP_RATED_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux';
import { addTopRatedMovies } from '../utils/moviesSlice';
const useTopRatedMovies = () => {

  const dispatch = useDispatch();
  const {topRated}=useSelector((store)=>store.movies);
    const getTopRatedMovies=async()=>{
      const response=await fetch(TOP_RATED_URL,API_OPTIONS);
      const data=await response.json();
      dispatch(addTopRatedMovies(data.results));
    }
    useEffect(() => {
      !topRated&&getTopRatedMovies();
    }, []);
  
}

export default useTopRatedMovies