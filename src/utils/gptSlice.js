import { createSlice } from "@reduxjs/toolkit";
const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        suggestedMovies: null,
        movieNames: null,
        isLoading: false,
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        setGptSearch: (state, action) => {
            state.showGptSearch = action.payload;
        },
        addSuggestedMovies: (state, action) => {
            const{movieNames,suggestedMovies} = action.payload;
        state.movieNames=movieNames;
        state.suggestedMovies=suggestedMovies;
        state.isLoading = false;
        },
        setGptLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearGptResults: (state) => {
            state.suggestedMovies = null;
            state.movieNames = null;
        },
       
    }
});
export const { toggleGptSearch, setGptSearch, addSuggestedMovies, setGptLoading, clearGptResults } = gptSlice.actions;
export default gptSlice.reducer;