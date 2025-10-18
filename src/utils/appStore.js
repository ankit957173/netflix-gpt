import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./moviesSlice"
import userReducer from "./userSlice"
const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies:movieReducer,
    }
});
export default appStore;    