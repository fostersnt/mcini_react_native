//This function checks if subscriber is authenticated
export const movieListAPI = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        // body: JSON.stringify({
        //     msisdn: phone,
        // })
    };

    url = 'https://mcini.tv/api/v1/movies/list';

    try {
        console.log('MOVIE LIST API STARTING');
        
       const response = await fetch(url, options);

        const data = response.json()

        console.log('MAIN MOVIE LIST API RESPONSE: ', data);
        
        if (!response.ok) {
            return {
                'success': 'false',
                'message': 'Failed to retrieve movies'
            };
        }
        return data;

    } catch (error) {
        console.log('MOVIE LIST API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString()
        };
    }
}