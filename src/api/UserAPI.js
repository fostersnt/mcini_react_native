import { replaceFirstDigitWith233 } from "../utilities/Validations";
import { BaseURL } from "./BaseURL";
import { movieListAPI } from "./MovieAPI";

//This function sends subscriber login request
export const userLoginAPI = async (phone) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            msisdn: phone,
        })
    };

    const url = `${BaseURL}/user/login`;

    try {
        const response = await fetch(url, options);

        const subscriberData = await response.json()
        // console.log('DATA NOW: ', data);
        const finalSubscriberData = subscriberData['data'];

        const movieData = await movieListAPI();

        if (!response.ok) {
            return {
                'success': 'false',
                'message': 'Unable to perform login',
                'status_code': `${response.status}`,
            };
        }


        return {
            'success': 'true',
            'message': 'Data fetching successful',
            'subscriberData': finalSubscriberData,
            'movieData': movieData
        }

    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function checks if subscriber is authenticated
export const checkAuthAPI = async (phone) => {
    phoneMain = replaceFirstDigitWith233(phone)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            msisdn: phoneMain,
        })
    };

    const url = `${BaseURL}/user/check-auth`;

    try {
        // console.log('CHECK AUTH API STARTING');

        const response = await fetch(url, options);
        const data = await response.json()

        // console.log('MAIN AUTH CHECK API RESPONSE: ', data);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `User with ${phone} is not authenticated`,
                // 'status_code': response.status.toString()
            };
        }
        else {
            // console.log('TTTTTT: ', response);            
            return data;
        }

    } catch (error) {
        // console.log('CHECK AUTH API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function performs user logout
export const userLogout = async (phone) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            msisdn: phone,
        })
    };

    const url = `${BaseURL}/user/logout`;

    try {
        console.log('USER LOGOUT API STARTING');

        const response = await fetch(url, options);

        console.log('MAIN LOGOUT API RESPONSE: ', data);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Unable to logout`
            };
        }

        const data = await response.json()
        return data;

    } catch (error) {
        console.log('USER LOGOUT API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function performs user subscription
export const user_MTN_subscription = async (payload) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        //NOTE: payload is an object in our case
        body: JSON.stringify(payload)
    };

    const url = `${BaseURL}/mtn/subscription`;

    try {
        console.log('USER MOVIE SUBSCRIPTION API STARTING');

        const response = await fetch(url, options);

        console.log('MAIN MOVIE SUBSCRIPTION API RESPONSE: ', data);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Subscription failed`
            };
        }

        const data = await response.json()

        return data;

    } catch (error) {
        console.log('USER MOVIE SUBSCRIPTION API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function performs user unSubscription
export const user_MTN_unSubscription = async (payload) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        //NOTE: payload is an object in our case
        body: JSON.stringify(payload)
    };

    const url = `${BaseURL}/mtn/unsubscription`;

    try {
        console.log('USER MOVIE UNSUBSCRIPTION API STARTING');

        const response = await fetch(url, options);

        console.log('MAIN MOVIE UNSUBSCRIPTION API RESPONSE: ', data);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Unsubscription failed`
            };
        }

        const data = await response.json()

        return data;

    } catch (error) {
        console.log('USER MOVIE UNSUBSCRIPTION API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}