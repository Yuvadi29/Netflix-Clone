import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {TMDB_BASE_URL, API_KEY} from '../utils/constants.js';   


const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const GetGenres = createAsyncThunk("netflix/genres", async()=>{
    const { data: {genres} } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    // console.log(data);
    return genres;    
});

//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state.



const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers:(builder) => {
        builder.addCase(GetGenres.fulfilled,(state,action)=>{
            state.genres = action.payload;
            state.genresLoaded = true;
        })
    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});