import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';

export const PINGUIN_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    width: PINGUIN_SIZE,
    height: PINGUIN_SIZE,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

const Pinguin: React.FC = ({isSliding, rotateStyle}) => {
  const pinguinUpStyle = useAnimatedStyle(() => {
    return {
      opacity: isSliding.value ? 1 : 0,
    };
  });

  const pinguinDownStyle = useAnimatedStyle(() => {
    return {
      opacity: isSliding.value ? 0 : 1,
    };
  });

  return (
    <Animated.View style={[styles.container, rotateStyle]}>
      <Animated.Image
        style={[styles.image, pinguinDownStyle]}
        source={require('../../assets/slider/pinguin-down.png')}
      />
      <Animated.Image
        style={[styles.image, pinguinUpStyle]}
        source={require('../../assets/slider/pinguin-up.png')}
      />
    </Animated.View>
  );
};

export default Pinguin;
