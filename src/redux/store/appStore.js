import { configureStore } from "@reduxjs/toolkit";

export const appStore = configureStore({
    reducer: {
        subscriber: null
    }
})