import React, { useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

// A generic animated orb component
const Orb = ({ 
  size, 
  colorStart, 
  colorEnd, 
  startX, 
  startY, 
  delay, 
  duration 
}: { 
  size: number, 
  colorStart: string, 
  colorEnd: string, 
  startX: number, 
  startY: number, 
  delay: number,
  duration: number 
}) => {
  const translateX = useSharedValue(startX);
  const translateY = useSharedValue(startY);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Randomize movement slightly around the start position
    const moveRangeX = width * 0.4;
    const moveRangeY = height * 0.3;

    // We use setTimeout to handle the initial delay so all orbs don't start moving at the exact same frame
    setTimeout(() => {
      translateX.value = withRepeat(
        withSequence(
          withTiming(startX + moveRangeX, { duration, easing: Easing.inOut(Easing.quad) }),
          withTiming(startX, { duration, easing: Easing.inOut(Easing.quad) }),
          withTiming(startX - moveRangeX, { duration, easing: Easing.inOut(Easing.quad) }),
          withTiming(startX, { duration, easing: Easing.inOut(Easing.quad) })
        ), -1, true
      );

      translateY.value = withRepeat(
        withSequence(
          withTiming(startY - moveRangeY, { duration: duration * 1.2, easing: Easing.inOut(Easing.quad) }),
          withTiming(startY + moveRangeY, { duration: duration * 1.2, easing: Easing.inOut(Easing.quad) }),
          withTiming(startY, { duration: duration * 1.2, easing: Easing.inOut(Easing.quad) })
        ), -1, true
      );

      scale.value = withRepeat(
        withSequence(
          withTiming(1.2, { duration: duration * 0.8, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.8, { duration: duration * 0.8, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: duration * 0.8, easing: Easing.inOut(Easing.ease) })
        ), -1, true
      );
    }, delay);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  return (
    <Animated.View style={[styles.orbContainer, { width: size, height: size, borderRadius: size / 2 }, animatedStyle]}>
      <LinearGradient
        colors={[colorStart, colorEnd]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
};

export default function AnimatedBackground() {
  return (
    <Animated.View style={styles.container} pointerEvents="none">
      {/* Background base layer */}
      <LinearGradient 
        colors={['#faf5ff', '#eff6ff']} 
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Floating Orbs - these will be blurred together by the Glassmorphism layer above them */}
      <Orb 
        size={width * 0.8} 
        colorStart="#c084fc" // Purple
        colorEnd="#a855f7"
        startX={-width * 0.2} 
        startY={-height * 0.1} 
        delay={0}
        duration={12000}
      />
      <Orb 
        size={width} 
        colorStart="#60a5fa" // Blue
        colorEnd="#3b82f6"
        startX={width * 0.4} 
        startY={height * 0.3} 
        delay={1000}
        duration={15000}
      />
      <Orb 
        size={width * 0.9} 
        colorStart="#34d399" // Emerald/Cyan
        colorEnd="#2dd4bf"
        startX={-width * 0.1} 
        startY={height * 0.6} 
        delay={2000}
        duration={18000}
      />
      
      <Orb 
        size={width * 0.7} 
        colorStart="#f472b6" // Pink base
        colorEnd="#ec4899"
        startX={width * 0.6} 
        startY={height * 0.8} 
        delay={3000}
        duration={14000}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  orbContainer: {
    position: 'absolute',
    opacity: 0.6, // Semi-transparent to let them blend
  }
});
