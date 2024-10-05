//This function checks if subscriber is authenticated
import { BaseURL } from "./BaseURL";

export const movieListAPI = async () => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    };

    url = `${BaseURL}/movies/list`;

    try {
        
       const response = await fetch(url, options);

        const movieResponse = await response.json()

        return movieResponse;

    } catch (error) {
        console.log('MOVIE LIST API ERROR: ', error);
        return {
            'success': 'false',
            'message': error.toString(),
            'data': null
        };
    }
}