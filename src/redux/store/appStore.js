import { configureStore } from "@reduxjs/toolkit";
import  SubscriberReduce from "../slice/SubscriberSlice"; //Use any custom variable
import MovieReducer from "../slice/MovieSlice"; //Use any custom variable


export const appStore = configureStore({
    reducer: {
        subscriber: SubscriberReduce,
        movie: MovieReducer
    },

    devTools: process.env.NODE_ENV !== 'production',

    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
})