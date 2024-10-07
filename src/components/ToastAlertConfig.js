// ToastConfig.js
import React from 'react';
import { Text, View } from 'react-native';

const ToastAlertConfig = {
  // Define a custom toast type
  success: ({ text1, text2 }) => (
    <View style={{ height: 60, width: '90%', backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{text1}</Text>
      {text2 ? <Text style={{ color: 'white' }}>{text2}</Text> : null}
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={{ height: 60, width: '90%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{text1}</Text>
      {text2 ? <Text style={{ color: 'white' }}>{text2}</Text> : null}
    </View>
  ),
  // You can add more custom types here
};

export default ToastAlertConfig;
