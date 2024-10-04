import { BaseURL } from "./BaseURL";

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

    url = `${BaseURL}/user/login`;

    try {
       const response = await fetch(url, options);

        const data = response.json()
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': 'Unable to perform login'
            };
        }
        return data;
    } catch (error) {
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function checks if subscriber is authenticated
export const checkAuthAPI = async (phone) => {

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

    url = `${BaseURL}/user/check-auth`;

    try {
        console.log('CHECK AUTH API STARTING');
        
       const response = await fetch(url, options);

        const data = response.json()

        console.log('MAIN AUTH CHECK API RESPONSE: ', data);
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': `User with ${phone} is not authenticated`
            };
        }
        return data;

    } catch (error) {
        console.log('CHECK AUTH API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}

//This function checks if subscriber is authenticated
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

    url = `${BaseURL}/user/logout`;

    try {
        console.log('USER LOGOUT API STARTING');
        
       const response = await fetch(url, options);

        const data = response.json()

        console.log('MAIN LOGOUT API RESPONSE: ', data);
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': `Unable to logout`
            };
        }
        return data;

    } catch (error) {
        console.log('USER LOGOUT API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}