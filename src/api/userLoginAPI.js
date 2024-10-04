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

    url = 'https://mcini.tv/api/v1/user/login';

    try {
        console.log('API STARTING');
        
       const response = await fetch(url, options);

        const data = response.json()
        console.log('MAIN USER LOGIN API RESPONSE: ', data);
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': 'Unable to perform login'
            };
        }
        return data;
    } catch (error) {
        console.log('USER LOGIN API ERROR: ', error);
        
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

    url = 'https://mcini.tv/api/v1/user/check-auth';

    try {
        console.log('CHECK AUTH API STARTING');
        
       const response = await fetch(url, options);

        const data = response.json()

        console.log('MAIN USER LOGIN API RESPONSE: ', data);
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': 'Unable to perform login'
            };
        }
        return data;
    } catch (error) {
        console.log('CHECK AUTH API ERROR: ', error);
        
    }
}