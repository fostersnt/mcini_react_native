import React, { useState, useEffect } from 'react';
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppStyles } from '../utilities/AppStyles';

const { width, height } = Dimensions.get('window');
const finalSize = Math.max(width, height) * 1.5; // Make sure circle covers the screen diagonally

const WelcomeTransition = () => {
  const [animation] = useState(new Animated.Value(0));
  const navigation = useNavigation();

  useEffect(() => {
    // Start the animation with a slight delay to ensure smooth start
    const animationTimeout = setTimeout(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 700,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1), // Material Design easing
        useNativeDriver: false,
      }).start();
    }, 0);

    // Navigate after animation is mostly complete
    const navigationTimeout = setTimeout(() => {
      navigation.navigate('WelcomeSlider');
    }, 1000); // Slightly before animation ends for smooth transition

    // Cleanup timeouts
    return () => {
      clearTimeout(animationTimeout);
      clearTimeout(navigationTimeout);
    };
  }, [animation, navigation]);

  const circleSize = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [50, finalSize],
  });

  const circleOpacity = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [1, 1, 0.8],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            opacity: circleOpacity,
            transform: [
              {
                scale: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1], // Slight scale effect for smoother appearance
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  circle: {
    backgroundColor: AppStyles.generalColors.blue,
    borderRadius: 10000, // Large value to ensure circle stays round
    position: 'absolute',
  },
});

export default WelcomeTransition;

// import React, { useEffect, useRef } from 'react';
// import { View, Animated, StyleSheet, Dimensions } from 'react-native';

// const WelcomeTransition = ({ onAnimationComplete }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;
//   const { width: screenWidth } = Dimensions.get('window');
//   const finalScale = screenWidth / 50; // Starting from 50px to screen width

//   useEffect(() => {
//     Animated.timing(scaleAnim, {
//       toValue: finalScale,
//       duration: 1500, // 1.5 seconds
//       useNativeDriver: true,
//     }).start(() => {
//       // onAnimationComplete();
//     });
//   }, [finalScale, onAnimationComplete, scaleAnim]);

//   return (
//     <View style={styles.container}>
//       <Animated.View
//         style={[
//           styles.circle,
//           {
//             transform: [{ scale: scaleAnim }],
//           },
//         ]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'blue',
//   },
// });

// export default WelcomeTransition;