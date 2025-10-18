import React, { useEffect }  from 'react'
import { API_OPTIONS,POPULAR_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addPopularMovies } from '../utils/moviesSlice';

const usePopularMovies = () => {
  const dispatch=useDispatch();
  const getPopularMovies=async()=>{
    const response=await fetch(POPULAR_URL,API_OPTIONS);
      const data = await response.json();
      console.log(data);
    dispatch(addPopularMovies(data.results));
  }
  useEffect(() => {
    getPopularMovies();
  }, []);
}

export default usePopularMovies