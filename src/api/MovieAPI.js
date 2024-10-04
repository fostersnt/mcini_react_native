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

    url = 'https://mcini.tv/api/v1/user/logout';

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