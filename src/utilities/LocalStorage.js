import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@storage_Key';

export const storeData = async (data) => {
  try {
    // Convert object to string before storing
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(STORAGE_KEY, jsonData);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getStorageData = async () => {
  try {
    const jsonData = await AsyncStorage.getItem(STORAGE_KEY);
    // Parse the stored string back to object
    return jsonData !== null ? JSON.parse(jsonData) : null;
  } catch (e) {
    console.error('Error retrieving data', e);
  }
};

// Function to clear specific storage data
export const clearStorageData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('Storage data cleared successfully');
  } catch (e) {
    console.error('Error clearing storage data', e);
  }
};

// OR Function to clear all storage data
export const clearAllStorageData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All storage data cleared successfully');
  } catch (e) {
    console.error('Error clearing all storage data', e);
  }
};
