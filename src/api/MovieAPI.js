//This function checks if subscriber is authenticated
import { BaseURL } from "./BaseURL";

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

    url = `${BaseURL}/movies/list`;

    try {
        console.log('MOVIE LIST API STARTING');
        
       const response = await fetch(url, options);

        const movieResponse = await response.json()

        // console.log('MAIN MOVIE LIST API RESPONSE: ', movieResponse);
        
        if (!response.ok) {
            return [];
        }
        return movieResponse['data'];

    } catch (error) {
        console.log('MOVIE LIST API ERROR: ', error);
        return [];
    }
}