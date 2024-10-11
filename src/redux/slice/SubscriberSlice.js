import { createSlice } from "@reduxjs/toolkit";


export const SubscriberSlice = createSlice({
    name: '',
    initialState: {
        subscriberDetails: null
    },

    reducers: {
        setSubscriber: (state, action) => {
            state.subscriberDetails = action.payload
        }
    }
});

export const {setSubscriber} = SubscriberSlice.actions;