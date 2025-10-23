import { createSlice } from "@reduxjs/toolkit";
const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGptSearch: false,
        suggestedMovies: null,
        movieNames: null,
    },
    reducers: {
        toggleGptSearch: (state) => {
            state.showGptSearch = !state.showGptSearch;
        },
        addSuggestedMovies: (state, action) => {
            const{movieNames,suggestedMovies} = action.payload;
        state.movieNames=movieNames;
        state.suggestedMovies=suggestedMovies;
        },
       
    }
});
export const { toggleGptSearch,addSuggestedMovies } = gptSlice.actions;
export default gptSlice.reducer;