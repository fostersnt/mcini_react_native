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
