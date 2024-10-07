import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStorageData } from '../utilities/LocalStorage';
import { AppStyles } from '../utilities/AppStyles';

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
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: AppStyles.generalColors.dark_four,
        paddingTop: 40,
        paddingHorizontal: 10
      }}
    >
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: 10
          }}
        >
          <Text
            style={{
              color: AppStyles.generalColors.blue,
              fontWeight: AppStyles.generalFontWeight.weight_one,
              fontSize: AppStyles.generalFontSize.page_header
            }}
          >User Account Management
          </Text>
        </View>
        <View>
          <Text
            style={[styles.textStyle, {
              // fontWeight: AppStyles.generalFontWeight.weight_one,
              marginTop: 20,
              marginBottom: AppStyles.generalMargin.higher,
              fontSize: AppStyles.generalFontSize.normal
            }]}
          >General
          </Text>
          <Text
            style={[styles.textStyle, {
              fontWeight: AppStyles.generalFontWeight.weight_one
            }]}
          >Phone Number
          </Text>
          <TextInput style={styles.textInput} value={subscriber.msisdn} />
        </View>
        <View>
          <Text
            style={[styles.textStyle, {
              fontWeight: AppStyles.generalFontWeight.weight_one
            }]}
          >E-Mail
          </Text>
          <TextInput style={styles.textInput} value={subscriber.email} />
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    color: AppStyles.generalColors.white_one
  },
  textInput: {
    color: AppStyles.generalColors.white_one,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    marginTop: AppStyles.generalMargin.low,
    marginBottom: AppStyles.generalMargin.higher,
    paddingHorizontal: AppStyles.generalPadding.low
  }
})