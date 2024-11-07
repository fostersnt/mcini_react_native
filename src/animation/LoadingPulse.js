import React, {useEffect, useRef} from 'react';
import {View, Animated, StyleSheet} from 'react-native';
import {AppStyles} from '../utilities/AppStyles';

const LoadingPulse = () => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Create an infinite pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2, // Scale up
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1, // Scale back to original size
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [scale]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, {transform: [{scale}]}]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulse: {
    width: 50,
    height: 50,
    // backgroundColor: '#6200EE', // Customize color as desired
    backgroundColor: AppStyles.generalColors.blue,
    borderRadius: 50, // Make it a circle
  },
});

export default LoadingPulse;
