import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { AppStyles } from '../utilities/AppStyles'

export default function MovieBanner() {
    return (
        <View style={{
            backgroundColor: AppStyles.generalColors.dark_four,
            height: AppStyles.generalHeight.height_four,
            marginBottom: AppStyles.generalMargin.higher,
            padding: AppStyles.generalPadding.low
        }}>
            <Text style={{
                color: AppStyles.generalColors.white_one,
                fontWeight: AppStyles.generalFontWeight.weight_one,
                fontSize: AppStyles.generalFontSize.large
            }}>MovieBanner</Text>
            <Text style={{
                color: AppStyles.generalColors.white_one,
                fontWeight: AppStyles.generalFontWeight.weight_one,
                fontSize: AppStyles.generalFontSize.large
            }}>MovieBanner</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // viewContainer: {
    //     height: 500,
    //     backgroundColor: 'black',
    //     padding: 20,
    //     marginBottom: 20,
    //     // borderRadius: 20,
    // },
    // txtContent: {
    //     color: 'white',
    //     fontWeight: 'bold',
    //     fontSize: 20,
    // }
})