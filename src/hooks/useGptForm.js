import { GoogleGenAI } from "@google/genai";
import { useDispatch } from 'react-redux'
import { addSuggestedMovies, setGptLoading, clearGptResults } from '../utils/gptSlice'
import { API_OPTIONS, GEMINI_API_KEY } from '../utils/constants'
const useGptForm = (searchInputRef) => {
    // Hook implementation
  const dispatch = useDispatch();
  const searchMovie = async (movie) => {
    
    const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&page=1`, API_OPTIONS);
    const jsonData = await data.json();
    return jsonData.results;
  }
    const handleSearchClick = async () => {
      console.log("handlesearchclick")
    console.log(searchInputRef?.current?.value);
    
    // Clear previous results and set loading
    dispatch(clearGptResults());
    dispatch(setGptLoading(true));
    
    try {
      const gptQuery="Act as a movie recommendation system and suggest some movies for the query: " + searchInputRef?.current?.value+" top 5 movies should be returned and result should be in comma separated values";
      const ai = new GoogleGenAI({apiKey:GEMINI_API_KEY});
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
      dispatch(addSuggestedMovies({movieNames:movies,suggestedMovies:allMovieResults}));
    } catch (error) {
      console.error("Error in GPT search:", error);
      dispatch(setGptLoading(false));
    }
    }
    return { handleSearchClick};
}
export default useGptForm;