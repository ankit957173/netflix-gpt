import { createSlice } from "@reduxjs/toolkit";
const movieSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlaying: null,
        popular: null,
        topRated: null,
        upcoming: null,
        trailerVideo: null,
        showTitle: true,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlaying = action.payload;
        },
        addTrailerVideo: (state, action) => {
            state.trailerVideo = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popular = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRated = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcoming = action.payload;
        },
        toggleTitle: (state) => {
            state.showTitle = !state.showTitle;
        },
        }
});
export const { addNowPlayingMovies,addTrailerVideo, addPopularMovies, addTopRatedMovies, addUpcomingMovies, toggleTitle } = movieSlice.actions;
export default movieSlice.reducer;