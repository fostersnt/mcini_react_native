import BackgroundFetch from 'react-native-background-fetch';

export const bgTask = () => BackgroundFetch.configure({
    minimumFetchInterval: 60, // Minimum interval in minutes (1 hour)
    stopOnTerminate: false, // Continue running after the app is terminated
    startOnBoot: true, // Start when the device boots up
    onTimeout: () => {
      console.log('Background fetch timeout. Finishing task...');
      BackgroundFetch.finish();
    },
  }, async (taskId) => {
    // Perform your API call here
    fetch('https://your-api-endpoint.com')
      .then(response => response.json())
      .then(data => {
        // Handle the API response
        console.log(data);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally(() => {
        // End the background task
        BackgroundFetch.finish(taskId); 
      });
  });
  