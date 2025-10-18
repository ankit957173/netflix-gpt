import React, { useEffect } from 'react'
import { API_OPTIONS,TOP_RATED_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addTopRatedMovies } from '../utils/moviesSlice';
const useTopRatedMovies = () => {

    const dispatch=useDispatch();
    const getTopRatedMovies=async()=>{
      const response=await fetch(TOP_RATED_URL,API_OPTIONS);
      const data=await response.json();
      dispatch(addTopRatedMovies(data.results));
    }
    useEffect(() => {
      getTopRatedMovies();
    }, []);
  
}

export default useTopRatedMovies