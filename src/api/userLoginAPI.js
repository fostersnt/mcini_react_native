export const userLoginAPI = async (email, password) => {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            msisdn: email,
            password: password,
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