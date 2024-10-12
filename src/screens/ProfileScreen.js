import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { clearAllStorageData, getStorageData } from '../utilities/LocalStorage';
import { AppStyles } from '../utilities/AppStyles';
import AntIcons from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IonIcons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import OctIcons from 'react-native-vector-icons/Octicons'
import { useNavigation } from '@react-navigation/native';
import { userLogout } from '../api/UserAPI';
import { showToast } from '../components/ToastAlert';
import { useSelector } from 'react-redux';


export default function ProfileScreen() {

  const [isLoading, setIsLoading] = useState(false);

  const navigator = useNavigation();

  const subscriber = useSelector((state) => state.subscriber.subscriberDetails);

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
            justifyContent: 'center',
            alignItems: 'center',
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
            navigator.navigate('PrivacyPolicy')
            console.log('PRIVACY POLICY');
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
          <TouchableOpacity onPress={() => {
            navigator.navigate('TermsAndConditions')
            console.log('TERMS AND CONDITIONS');
          }}>
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
            onPress={async () => {
              const msisdn = subscriber['msisdn'];
              setIsLoading(true)
              const response = await userLogout(subscriber['msisdn']);
              if (response['success'] == 'true' && response['data']['login_status'].toLowerCase() == 'inactive') {
                await clearAllStorageData();
                setIsLoading(false)
                navigator.navigate('Login');
              } else {
                setIsLoading(false)
                showToast('Logout Error:', 'Unable to logout', 'error', 5000);
              }
              console.log('LOGOUT ACTION TRIGGERED === ', response['data']['login_status'].toLowerCase());
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

      {/* LOGOUT MODAL */}
      <Modal
        transparent={true}
        visible={isLoading}
        animationType="slide" // You can use 'fade' or 'none' for other effects
        onRequestClose={() => setIsLoading(false)} // For Android back button
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Logout in progress...</Text>
            <View style={styles.activityIndicatorContainer}>
              {
                isLoading ? <ActivityIndicator color={'white'} /> : ''
              }
            </View>
          </View>
        </View>
      </Modal>
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
  },
  activityIndicatorContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  modalButtonRed: {
    width: 100,
    marginRight: 20,
    backgroundColor: 'red',
    paddingVertical: 10
  },
  modalButtonBlue: {
    width: 100,
    marginRight: 20,
    backgroundColor: AppStyles.generalColors.blue,
    paddingVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    width: '80%',  // Set width of modal
    height: 200, // Set height of modal
    backgroundColor: AppStyles.generalColors.dark_one, //This color changes dynamically for the subscription modal
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: AppStyles.generalColors.white_one
  },
})