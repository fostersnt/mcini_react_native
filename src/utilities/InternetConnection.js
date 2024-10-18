import NetInfo from '@react-native-community/netinfo';

export const isInternetActive = async () => {
  try {
    // Fetch the network state
    const state = await NetInfo.fetch();

    // Return true if both isConnected and isInternetReachable are true
    return state.isConnected && state.isInternetReachable;
  } catch (error) {
    console.error('Error checking internet status:', error);
    return false;
  }
};