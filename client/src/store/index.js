import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL, API_KEY } from '../utils/constants.js';


const initialState = {
    movies: [],
    genresLoaded: false,
    genres: [],
};

export const GetGenres = createAsyncThunk("netflix/genres", async () => {
    const { data: { genres } } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    // console.log(data);
    return genres;
});


const createArrayFromRawData = (array, movies, genres) => {
    array.forEach((movie) => {
        const movieGenres = [];
        movie.genre_ids.forEach((genre) => {
            const name = genres.find(({ id }) => id === genre);
            if (name) movieGenres.push(name.name);
        });
        if (movie.backdrop_path)
            movies.push({
                id: movie.id,
                name: movie?.original_name ? movie.original_name : movie.original_title,
                image: movie.backdrop_path,
                genres: movieGenres.slice(0, 3),
            });
    });
};
const RawData = async (api, genres, paging) => {
    const movies = [];

    for (let i = 1; movies.length < 60 && i < 10; i++) {
        const { data: {results} } = await axios.get(`
        ${api}${paging ? `&page=${i}` : ""}`

        );
        createArrayFromRawData(results, movies, genres);
    }
    return movies;
}

export const FetchMovies = createAsyncThunk(
    "netflix/trending",
    async ({ type }, thunkAPI) => {
        const {
            netflix: { genres },
        } = thunkAPI.getState();
        return RawData(
            `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
            genres,
            true
        );
    }
);
// return RawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`);
//A "slice" is a collection of Redux reducer logic and actions for a single feature in your app, typically defined together in a single file. The name comes from splitting up the root Redux state object into multiple "slices" of state.



const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(GetGenres.fulfilled, (state, action) => {
            state.genres = action.payload;
            state.genresLoaded = true;
        });
        builder.addCase(FetchMovies.fulfilled, (state, action) => {
            state.movies = action.payload;
        });

    },
});

export const store = configureStore({
    reducer: {
        netflix: NetflixSlice.reducer,
    },
});