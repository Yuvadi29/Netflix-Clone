import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state.



const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers:(builder) => {},
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});