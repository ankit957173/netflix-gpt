import { DETAILS_URL, API_OPTIONS } from "../utils/constants";
const useMovieDetails = async () => {
    const response = await fetch(DETAILS_URL , API_OPTIONS);
    const data = response.json();
}
export default useMovieDetails