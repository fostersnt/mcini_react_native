import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { AppStyles } from '../../utilities/AppStyles'
import { PrivacyPolicy } from '../../utilities/PrivacyPolicy'

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView>
            <View style={styles.container}>
                <View style={styles.mainHeaderContainer}>
                    <Text style={styles.mainHeader}>PRIVACY POLICY</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>Privacy Policy for mCini Video on Demand (VOD) in Ghana and African Market</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.introduction}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>1. Information Collection and Use</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.informationCollection}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>2. Information Sharing and Disclosure</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.informationSharing}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>3. Data Security</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.dataSecurity}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>4. Data Retention</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.dataRetention}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>5. User Rights and Choices</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.userRights}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>6. Changes To This Privacy Policy</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.changesToPolicy}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <Text style={styles.textHeaderStyle}>7. Contact Us</Text>
                    <Text style={styles.textStyle}>{PrivacyPolicy.contactUs}</Text>
                </View>
            </View>
        </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppStyles.generalColors.dark_four,
        paddingTop: 40,
        padding: 10
    },
    itemContainer: {
        borderColor: AppStyles.generalColors.dark_one,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 10,
        marginBottom: AppStyles.generalMargin.higher,
        backgroundColor: AppStyles.generalColors.dark_one
    },
    mainHeaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    mainHeader: {
        color: AppStyles.generalColors.white_one,
        marginBottom: AppStyles.generalMargin.low,
        fontWeight: AppStyles.generalFontWeight.weight_one
    },
    textHeaderStyle: {
        color: AppStyles.generalColors.white_one,
        marginBottom: AppStyles.generalMargin.low,
        fontWeight: AppStyles.generalFontWeight.weight_one,
        fontSize: AppStyles.generalFontSize.normal
    },
    textStyle: {
        color: AppStyles.generalColors.white_one,
        fontSize: AppStyles.generalFontSize.small,
    }
})