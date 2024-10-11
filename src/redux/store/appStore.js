import { configureStore } from "@reduxjs/toolkit";
import { SubscriberSlice } from "../slice/SubscriberSlice";
import { MovieSlice } from "../slice/MovieSlice";


export const appStore = configureStore({
    reducer: {
        subscriber: SubscriberSlice,
        movie: MovieSlice
    }
})