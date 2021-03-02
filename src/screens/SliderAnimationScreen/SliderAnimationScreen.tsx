import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  runOnJS,
  interpolate,
  Extrapolate,
  interpolateColor,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Pinguin, {PINGUIN_SIZE} from './Pinguin';
import {clamp} from '../../utils';

const {width} = Dimensions.get('window');
const SLIDER_WIDTH = width - 150;
const SLIDER_HEIGHT = 50;
const MAX_RANGE = 100;
const INITIAL_VALUE = 0;
const SLIDER_RANGE = SLIDER_WIDTH - PINGUIN_SIZE / 2;
const STEP = SLIDER_RANGE / MAX_RANGE ?? 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bbf3bb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: SLIDER_WIDTH,
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#ddd',
    height: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  progress: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: PINGUIN_SIZE / 2,
  },
  pinguin: {
    height: PINGUIN_SIZE,
    width: PINGUIN_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SliderAnimationScreen: React.FC = () => {
  const translateX = useSharedValue(-5);
  const isSliding = useSharedValue(false);

  const onDraggedSuccess = () => {
    console.log(stepText.value, String(translateX.value));
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translateX.value;
    },
    onActive: (event, ctx) => {
      isSliding.value = true;

      translateX.value = clamp(
        event.translationX + ctx.offsetX,
        -PINGUIN_SIZE / 4,
        SLIDER_RANGE,
      );
    },
    onEnd: () => {
      isSliding.value = false;

      if (translateX.value > SLIDER_RANGE - 3) {
        runOnJS(onDraggedSuccess)();
      }
    },
  });

  const scrollTranslationStyle = useAnimatedStyle(() => {
    return {transform: [{translateX: translateX.value}]};
  });

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: translateX.value + PINGUIN_SIZE / 2,
    };
  });

  const stepText = useDerivedValue(() => {
    const step = Math.ceil(translateX.value / STEP);
    return String(step);
  });

  const rotateStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [0, SLIDER_RANGE],
      [0, 2 * 360], // 2 rotates
      Extrapolate.CLAMP,
    );

    return {
      transform: [{rotate: `${rotate}deg`}],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      translateX.value,
      [0, SLIDER_RANGE],
      ['#82df99', '#00d636'],
    );

    return {
      backgroundColor,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.slider}>
        <Animated.View
          style={[styles.progress, progressStyle, backgroundStyle]}
        />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.pinguin, scrollTranslationStyle]}>
            <Pinguin isSliding={isSliding} rotateStyle={rotateStyle} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <View style={{paddingTop: 50}}>
        <Button
          mode="contained"
          color="#00d636"
          onPress={() => {
            if (translateX.value !== SLIDER_RANGE) {
              isSliding.value = true;

              translateX.value = withTiming(
                SLIDER_RANGE,
                {
                  duration: 4000,
                  easing: Easing.bounce,
                },
                () => {
                  isSliding.value = false;
                },
              );
            }
          }}>
          Slide to end
        </Button>
      </View>
      <View style={{paddingTop: 50}}>
        <Button
          mode="outlined"
          color="#000"
          onPress={() => {
            if (translateX.value !== -5) {
              isSliding.value = true;
              translateX.value = withTiming(
                -5,
                {
                  duration: 3000,
                  easing: Easing.bounce,
                },
                () => {
                  isSliding.value = false;
                },
              );
            }
          }}>
          Slide to beginning
        </Button>
      </View>
    </View>
  );
};

export default SliderAnimationScreen;
