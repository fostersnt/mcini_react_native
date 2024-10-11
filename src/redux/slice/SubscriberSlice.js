import { createSlice } from "@reduxjs/toolkit";


const SubscriberSlice = createSlice({
    name: 'subscriber',
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

export default SubscriberSlice.reducer