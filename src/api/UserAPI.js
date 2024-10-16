import { replaceFirstDigitWith233 } from "../utilities/Validations";
import { BaseURL } from "./BaseURL";
import { movieListAPI } from "./MovieAPI";

//This function sends subscriber login request
export const userLoginAPI = async (phone) => {
    var prefix = 'SUBSCRIBER MESSAGE: '
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

        return subscriberData;

    } catch (error) {
        message = prefix + error.toString();
        return {
            'success': 'false',
            'message': message,
            'data': null
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
        const response = await fetch(url, options);
        const data = await response.json()

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `User with ${phone} is not authenticated`,
                // 'status_code': response.status.toString()
            };
        }
        else {
            return data;
        }

    } catch (error) {
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
        const response = await fetch(url, options);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Unable to logout`
            };
        }

        const data = await response.json()
        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//--------------------This function fetches user favorite movies--------------------
export const userFavoriteMoviesAPI = async (phone) => {
    var prefix = 'FAVOURITES MESSAGE: '
    
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

    const url = `${BaseURL}/movies/favorites/list`;

    try {
        const response = await fetch(url, options);

        // if (!response.ok) {
        //     return {
        //         'success': 'false',
        //         'message': `Unable to logout`
        //     };
        // }

        const data = await response.json()

        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': prefix + error.toString(),
            'data': null
        };
    }
}

//--------------------This function fetches user favorite movies--------------------
export const addOrRemoveFavorite = async (payload) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(payload)
    };

    const url = `${BaseURL}/movies/favorites`;

    try {
        const response = await fetch(url, options);

        const data = await response.json()
        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString(),
            'data': null
        };
    }
}

//--------------------This function fetches user watch-list movies--------------------
export const userWatchListAPI = async (phone) => {
    console.log('PHONE PHONE === ', phone);
    
    var prefix = 'WATCH-LIST MESSAGE: '

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

    const url = `${BaseURL}/movies/watch/list`;

    try {
        const response = await fetch(url, options);

        // if (!response.ok) {
        //     return {
        //         'success': 'false',
        //         'message': `Unable to logout`
        //     };
        // }
        const data = await response.json()
        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': prefix + error.toString(),
            'data': null
        };
    }
}


//-------------------This function put all user data together---------------------------
export const allUserData = async (subscriberMsisdn) => {
    var success = 'false';
    var message = '';
    var subscriber = null;
    var movies = null;
    var favorites = null;
    var watchList = null;

    const loginResponse = await userLoginAPI(subscriberMsisdn);
    // console.log('=== USER LOGIN API STARTED === ', loginResponse['data'].user);

    // const allMovies = await movieListAPI();
    // console.log('=== MOVIES LIST API STARTED === ', allMovies['message']);

    // const favoriteMovies = await userFavoriteMoviesAPI(subscriberMsisdn);
    // console.log('=== FAVOURITE MOVIES API STARTED === ', favoriteMovies['message']);

    // const userWatchList = await userWatchListAPI(subscriberMsisdn);
    // console.log('=== WATCH-LIST API STARTED === ', userWatchList['message']);

    // message = loginResponse['message'];

    // //Checking login data or subscriber information
    // if (loginResponse['success'] == 'true' && loginResponse['data'] != null) {
    //     success = loginResponse['success'];
    //     subscriber = loginResponse['data'];
    // }
    
    // //Checking all movies data
    // if (allMovies['success'] == 'true') {
    //     movies = allMovies['data'];
    // }

    // //Checking favorite movies data
    // if (favoriteMovies['success'] == 'true') {
    //     favorites = favoriteMovies['data'];
    // }

    // //Checking watch-list data
    // if (userWatchList['success'] == 'true') {
    //     watchList = userWatchList['data'];
    // }

    return {
        'success': loginResponse['success'],
        'message': loginResponse['message'],
        'subscriber': loginResponse['data'] != null ? loginResponse['data'].user : null,
        'movies': loginResponse['data'] != null ? loginResponse['data'].movies : null,
        'favorites': loginResponse['data'] != null ? loginResponse['data'].favorites : null,
        'watchList': loginResponse['data'] != null ? loginResponse['data'].watch_history : null
    }
}

//--------------------------This function performs user subscription------------------------------
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
        const response = await fetch(url, options);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Subscription failed`
            };
        }

        const data = await response.json()

        return data;

    } catch (error) {
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
        const response = await fetch(url, options);

        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Unsubscription failed`
            };
        }

        const data = await response.json()

        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}


//This function checks for user subscription status
export const userSubscriptionCheck = async (phone) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        //NOTE: payload is an object in our case
        body: JSON.stringify({
            msisdn: phone
        })
    };

    const url = `${BaseURL}/movies/subscriptions`;

    try {
        const response = await fetch(url, options);

        const data = await response.json()

        return data;

    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString(),
            'data': null
        };
    }
}