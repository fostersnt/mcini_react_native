import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
    name: 'movie',
    initialState: {
        currentMovie: 0,
        movies: [],
        favoriteMovies: [],
        watchList: [],
    },

    reducers: {
        setCurrentMovie: (state, action) => {
            state.currentMovie = action.payload;
        },
        setFavoriteMovies: (state, action) => {
            state.favoriteMovies = action.payload
        },
        addMovieToFavorites: (state, action) => {
            state.favoriteMovies.push(action.payload);
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setWatchList: (state, action) => {
            state.watchList = action.payload;
        },
        addToWatchList: (state, action) => {
            state.watchList.push(action.payload);
        }
    }
});

export const {
    setCurrentMovie,
    setMovies,
    setFavoriteMovies,
    addMovieToFavorites,
    setWatchList,
    addToWatchList
} = MovieSlice.actions

export default MovieSlice.reducer;