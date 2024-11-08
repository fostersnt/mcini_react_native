import React from 'react';
import { View, Button, Alert } from 'react-native';

const AlertComponent = (alertTitle, alertMessage) => {
    Alert.alert(
        alertTitle,
        alertMessage,
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false } // Prevents dismissal by tapping outside
    );
};

export default AlertComponent;
