import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
    name: 'movie',
    initialState: {
        currentMovie: 0,
        favoriteMovies: [],
        movies: [],
    },

    reducers: {
        setCurrentMovie: (state, action) => {
            state.currentMovie = action.payload;
        },
        setMovies: (state, action) => {
            state.movies = action.payload;
        },
        setFavoriteMovies: (state, action) => {
            state.favoriteMovies = action.payload
        },
        addMovieToFavorites: (state, action) => {
            state.favoriteMovies.push(action.payload);
        }
    }
});

export const {setCurrentMovie, setMovies, setFavoriteMovies, addMovieToFavorites} = MovieSlice.actions