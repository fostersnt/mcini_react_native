import { createSlice } from '@reduxjs/toolkit';


const SubscriberSlice = createSlice({
    name: 'subscriber',
    initialState: {
        subscriberDetails: null,
        loginStatus: null,
    },

    reducers: {
        setSubscriber: (state, action) => {
            state.subscriberDetails = action.payload;
        },

        setLoginStatus: (state, action) => {
            state.loginStatus = action.payload;
        },
    },
});

export const {setSubscriber, setLoginStatus} = SubscriberSlice.actions;

export default SubscriberSlice.reducer;
