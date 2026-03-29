import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn,
  FadeInDown, 
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../src/context/ThemeContext';
import { ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const { colors } = useTheme();
  const router = useRouter();

  // Mesh Breathing Animation
  const meshSwell = useSharedValue(0);

  useEffect(() => {
    meshSwell.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // Initial impact resonance
    const timer = setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const meshStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(meshSwell.value, [0, 1], [1, 1.15]) },
      { rotate: `${interpolate(meshSwell.value, [0, 1], [0, 5])}deg` }
    ],
    opacity: interpolate(meshSwell.value, [0, 1], [0.4, 0.6]),
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.meshContainer}>
        <Animated.View style={[styles.meshGradient, { backgroundColor: colors.secondary }, meshStyle]} />
      </View>

      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn.duration(1200).springify()}
          style={styles.logoWrapper}
        >
          <Image 
            source={require('../assets/logo.png')} 
            style={[styles.logo, { borderRadius: 60, borderWidth: 1, borderColor: colors.border + '33' }]} 
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify().damping(12)}>
            <Text style={[styles.title, { color: colors.text }]}>
              MindBridge
            </Text>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify().damping(12)}>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              A high-fidelity space for mental clarity{"\n"}and emotional resonance.
            </Text>
          </Animated.View>
        </View>

        <View style={styles.actionContainer}>
          <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/register');
              }}
            >
              <Text style={styles.primaryButtonText}>Begin Journey</Text>
              <ArrowRight size={18} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).duration(1000).springify()}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.secondaryButton, { borderColor: colors.border }]}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/login');
              }}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.text }]}>
                Continue to Dashboard
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <Animated.View 
        entering={FadeIn.delay(1200).duration(1000)}
        style={styles.footer}
      >
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          EST. 2026 • PRECISE WELLNESS
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  meshContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  meshGradient: {
    position: 'absolute',
    top: -width * 0.7,
    right: -width * 0.7,
    width: width * 2,
    height: width * 2,
    borderRadius: width,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 10,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: '#fff',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 48,
    fontWeight: '800',
    letterSpacing: -2,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '400',
    opacity: 0.8,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 64,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    opacity: 0.4,
  },
});
