import BackgroundFetch from "react-native-background-fetch";
import notifee, { AndroidImportance } from '@notifee/react-native';


const onBackgroundFetch = async (taskId) => {
  // Perform your API request here
  try {
    const response = await fetch('https://example.com/api');
    const data = await response.json();

    // Display a notification (see step 3)
    // showNotification("API Data", `Data: ${data.message}`);
    console.log('BACKGROUND TASK SUCCESSFUL');
  } catch (error) {
    console.error('API Fetch Error:', error);
  }

  // Mark task as complete
  BackgroundFetch.finish(taskId);
};

BackgroundFetch.configure(
  {
    minimumFetchInterval: 15, // Minimum interval in minutes
  },
  onBackgroundFetch,
  (error) => {
    console.error("Background Fetch failed to start:", error);
  }
);


const requestNotificationPermission = async () => {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus === 1) { // 1 = authorized
    console.log("Notification permission granted");
  } else {
    console.log("Notification permission denied");
  }

  // For Android, create a default notification channel
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }
};

