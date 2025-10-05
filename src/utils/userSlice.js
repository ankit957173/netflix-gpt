import { createSlice } from "@reduxjs/toolkit";
const userReducer = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: {
        addUser: (state, action) => {
        // state.user = action.payload;
        return action.payload;
    }, removeUser: (state) => {
        // state.user = null;
        return null;
    }},
});
export const { addUser, removeUser } = userReducer.actions;
export default userReducer.reducer;