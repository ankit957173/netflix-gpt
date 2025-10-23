import React, { useRef } from 'react'
import { GoogleGenAI } from "@google/genai";
import langConstants from '../utils/langConstants'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { addSuggestedMovies } from '../utils/gptSlice'
import {API_OPTIONS, GEMINI_API_KEY} from '../utils/constants'
const GptSearchForm = () => {
  const language = useSelector((store) => store.config.language);
  const searchInputRef = useRef(null);
  const dispatch = useDispatch();
  const searchMovie = async (movie) => {
    
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`, API_OPTIONS);
    const jsonData = await data.json();
    return jsonData.results;
  }
  const handleSearchClick=async()=>{
    console.log(searchInputRef.current.value);
    const gptQuery="Act as a movie recommendation system and suggest some movies for the query: " + searchInputRef.current.value+" top 5 movies should be returned and result should be in comma separated values";
    const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});
    // const gptResults = await openai.chat.completions.create({
    // model: "gpt-3.5-turbo",
    // messages: [{role: "user", content: gptQuery}],)}
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:  gptQuery,
    })  ;
 const movies=response?.candidates[0]?.content?.parts[0]?.text.split(", ");
    console.log(movies)
    //no
    const promiseArray = movies.map(movie => searchMovie(movie.trim()));
    const allMovieResults = await Promise.all(promiseArray);
    console.log(allMovieResults);
    dispatch(addSuggestedMovies({movieNames:movies,suggestedMovies:allMovieResults.flat()}));
  }
  return (
      <div className='pt-[10%] flex justify-center'>
          <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e)=>e.preventDefault()}>

        <input type="text"
            ref={searchInputRef}
                  className='p-4 m-4 col-span-9'
                  placeholder={langConstants[language].searchPlaceholder} />
        <button className='col-span-3 p-4 m-4 bg-red-700 text-white rounded-lg'
        onClick={handleSearchClick}>{langConstants[language].search}</button>
              </form>
        
    </div>
  )
}

export default GptSearchForm