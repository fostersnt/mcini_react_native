// storage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@storage_Key';

export const storeData = async (data) => {
    //Ensure the data is an object
  try {
    await AsyncStorage.setItem(STORAGE_KEY, data);
  } catch (e) {
    console.error('Error storing data', e);
  }
};

export const getData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);    
    return data !== null ? data : null;
  } catch (e) {
    console.error('Error retrieving data', e);
  }
};

