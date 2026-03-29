import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { 
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

function ElegantShape({ 
  delay = 0, 
  styleSize = { width: 400, height: 100 }, 
  rotate = 0, 
  gradient = ['rgba(255,255,255,0.08)', 'transparent'],
  position = { top: 0, left: 0 }
}: any) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(15, { duration: 6000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { rotate: `${rotate}deg` }
    ]
  }));

  const entranceStyle = FadeIn.delay(delay).duration(2400).easing(Easing.bezier(0.23, 0.86, 0.39, 0.96));

  return (
    <Animated.View 
      entering={entranceStyle}
      style={[styles.shapePosition, position, animatedStyle]}
    >
      <View style={{ width: styleSize.width, height: styleSize.height }}>
        <BlurView intensity={10} tint="light" style={styles.blurShape}>
          <LinearGradient
            colors={gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientFill}
          />
          <View style={styles.shapeBorder} />
        </BlurView>
      </View>
    </Animated.View>
  );
}

export default function GeometricBackground({ children }: { children?: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {/* Background Orbs */}
      <View style={styles.bgGradientContainer}>
        <View style={styles.indigoOrb} />
        <View style={styles.roseOrb} />
      </View>

      {/* Geometric Shapes */}
      <View style={styles.shapesContainer}>
        <ElegantShape
          delay={300}
          styleSize={{ width: width * 1.5, height: 140 }}
          rotate={12}
          gradient={['rgba(99, 102, 241, 0.15)', 'transparent']}
          position={{ top: height * 0.15, left: -width * 0.1 }}
        />
        <ElegantShape
          delay={500}
          styleSize={{ width: width * 1.25, height: 120 }}
          rotate={-15}
          gradient={['rgba(244, 63, 94, 0.15)', 'transparent']}
          position={{ top: height * 0.7, right: -width * 0.05 }}
        />
        <ElegantShape
          delay={400}
          styleSize={{ width: width * 0.75, height: 80 }}
          rotate={-8}
          gradient={['rgba(139, 92, 246, 0.15)', 'transparent']}
          position={{ bottom: height * 0.05, left: width * 0.05 }}
        />
        <ElegantShape
          delay={600}
          styleSize={{ width: width * 0.5, height: 60 }}
          rotate={20}
          gradient={['rgba(245, 158, 11, 0.15)', 'transparent']}
          position={{ top: height * 0.1, right: width * 0.15 }}
        />
        <ElegantShape
          delay={700}
          styleSize={{ width: width * 0.35, height: 40 }}
          rotate={-25}
          gradient={['rgba(6, 182, 212, 0.15)', 'transparent']}
          position={{ top: height * 0.05, left: width * 0.2 }}
        />
      </View>

      <View style={styles.contentOverlay}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#030303',
  },
  bgGradientContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  indigoOrb: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    borderRadius: 1000,
    transform: [{ scale: 1.2 }],
    opacity: 0.5,
  },
  roseOrb: {
    position: 'absolute',
    bottom: -height * 0.1,
    right: -width * 0.2,
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: 'rgba(244, 63, 94, 0.1)',
    borderRadius: 1000,
    transform: [{ scale: 1.2 }],
    opacity: 0.5,
  },
  shapesContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  shapePosition: {
    position: 'absolute',
  },
  blurShape: {
    flex: 1,
    borderRadius: 1000,
    overflow: 'hidden',
  },
  gradientFill: {
    flex: 1,
  },
  shapeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 1000,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  contentOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },
});
