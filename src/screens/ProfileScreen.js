import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStorageData } from '../utilities/LocalStorage';
import { AppStyles } from '../utilities/AppStyles';
import AntIcons from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import OctIcons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';


export default function ProfileScreen() {

  const [subscriber, setSubscriber] = useState(null);
  const navigator = useNavigation();

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
          <TextInput style={styles.textInput} value={subscriber != null ? subscriber.msisdn : 'N/A'} />
        </View>
        <View>
          <Text
            style={[styles.textStyle, {
              fontWeight: AppStyles.generalFontWeight.weight_one
            }]}
          >E-Mail
          </Text>
          <TextInput style={styles.textInput} value={subscriber != null ? subscriber.email : 'N/A'} />
        </View>
        {/* LEGAL INFORMATION */}
        <View
          style={{
            marginTop: 50,
          }}
        >
          <Text
            style={[styles.textStyle, {
              // fontWeight: AppStyles.generalFontWeight.weight_one,
              fontSize: AppStyles.generalFontSize.normal
            }]}
          >Legal Information
          </Text>
          {/* INFORMATION ONE */}
          <TouchableOpacity onPress={() => {
            navigator.navigate('TermsAndConditions')
            console.log('TERMS AND CONDITIONS');
          }}>
            <View style={styles.legalInfoContainer}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <AntIcons name='lock' size={20} style={styles.iconStyle} />
                <Text style={[styles.textStyle, {
                  paddingLeft: 10, alignSelf: 'flex-start'
                }]}>Privacy & Security</Text>
              </View>
              <IonIcons name='chevron-forward-outline' size={20} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
          {/* INFORMATION TWO */}
          <TouchableOpacity>
            <View style={styles.legalInfoContainer}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MaterialIcons name='content-paste' size={20} style={styles.iconStyle} />
                <Text style={[styles.textStyle, {
                  paddingLeft: 10, alignSelf: 'flex-start'
                }]}>Terms & Condition</Text>
              </View>
              <IonIcons name='chevron-forward-outline' size={20} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.legalInfoContainer}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MaterialIcons name='history' size={20} style={styles.iconStyle} />
                <Text style={[styles.textStyle, {
                  paddingLeft: 10, alignSelf: 'flex-start'
                }]}>WatchList</Text>
              </View>
              <IonIcons name='chevron-forward-outline' size={20} style={styles.iconStyle} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              console.log('LOGOUT ACTION TRIGGERED');
            }}
          >
            <View style={[styles.logout]}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MaterialIcons name='logout' size={20} style={styles.iconStyle} />
                <Text style={[styles.textStyle, {
                  paddingLeft: 10, alignSelf: 'flex-start'
                }]}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
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
    marginBottom: 40,
    paddingHorizontal: AppStyles.generalPadding.low
  },
  iconStyle: {
    color: AppStyles.generalColors.white_one,
  },
  legalInfoContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: AppStyles.generalMargin.higher
  },
  logout: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: AppStyles.generalMargin.higher
  }
})