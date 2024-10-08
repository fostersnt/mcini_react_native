import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TermsAndConditions } from '../../utilities/TermsAndConditions'
import { AppStyles } from '../../utilities/AppStyles'
import { Dimensions } from 'react-native'

export default function TermsAndConditionsScreen() {

    const { width: screenWidth } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <View style={styles.mainHeaderContainer}>
                <Text style={styles.mainHeader}>TERMS & CONDITIONS</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.textHeaderStyle}>Introduction</Text>
                <Text style={styles.textStyle}>{TermsAndConditions.introduction}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.textHeaderStyle}>1. Membership / Account</Text>
                <Text style={styles.textStyle}>{TermsAndConditions.membershipAccount}</Text>
            </View>
        </View>
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