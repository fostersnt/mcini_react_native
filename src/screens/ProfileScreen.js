import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStorageData } from '../utilities/LocalStorage';

export default function ProfileScreen() {

const [subscriber, setSubscriber] = useState(null);

  useEffect(() => {
    const mySubscriber = async () => {
      try {
        const storageData = await getStorageData();

        const subscriberData = storageData.subscriber;

        if (subscriberData != null) {
          console.log('SUBSCRIBER DATA FROM STORAGE === ', subscriber);
        }

        setSubscriber(subscriberData);  // Use data.data as per your API response
        console.log('NO SUBSCRIBER WATCH-LIST FROM STORAGE');
        // console.log('USER FAVOURITE MOVIES === ', data.data);
      } catch (error) {
        console.error('Error fetching subscriber data:', error);
      } 
      // finally {
      //   setLoading(false);  // Always set loading to false after the fetch
      // }
    };

    mySubscriber();
  }, []);

  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}