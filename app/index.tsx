import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
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

  // Nebula Resonance System
  const coreSwell = useSharedValue(0);
  const accentDrift = useSharedValue(0);
  const ambientFade = useSharedValue(0);

  useEffect(() => {
    // Phase 1: Core Breathing (Slow Pulse)
    coreSwell.value = withRepeat(
      withTiming(1, { duration: 5000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true
    );

    // Phase 2: Accent Drifting (Longer Sweep)
    accentDrift.value = withRepeat(
      withTiming(1, { duration: 7000, easing: Easing.inOut(Easing.quad) }),
      -1,
      true
    );

    // Phase 3: Ambient Glow (Short Flicker)
    ambientFade.value = withRepeat(
      withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.exp) }),
      -1,
      true
    );

    const timer = setTimeout(() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const coreStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: interpolate(coreSwell.value, [0, 1], [1, 1.25]) },
      { rotate: `${interpolate(coreSwell.value, [0, 1], [0, 15])}deg` }
    ],
    opacity: interpolate(coreSwell.value, [0, 1], [0.3, 0.5]),
  }));

  const accentStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(accentDrift.value, [0, 1], [-width * 0.2, width * 0.2]) },
      { translateY: interpolate(accentDrift.value, [0, 1], [0, -width * 0.1]) },
      { scale: interpolate(accentDrift.value, [0, 1], [0.8, 1.1]) }
    ],
    opacity: interpolate(accentDrift.value, [0, 1], [0.2, 0.4]),
  }));

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* Resonance Nebula System */}
      <View style={styles.nebulaContainer}>
        {/* Core Mesh: Grounding Color */}
        <Animated.View style={[styles.meshOrb, { backgroundColor: colors.secondary, width: width * 2, height: width * 2, top: -width * 0.5, right: -width * 0.5 }, coreStyle]} />
        
        {/* Accent Mesh: Dynamic Energy */}
        <Animated.View style={[styles.meshOrb, { backgroundColor: colors.primary, width: width * 1.5, height: width * 1.5, bottom: -width * 0.3, left: -width * 0.3 }, accentStyle]} />
        
        {/* Light-Scrubbed Overlay: Text Visibility Security */}
        <LinearGradient
          colors={['transparent', colors.background]}
          style={StyleSheet.absoluteFillObject}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
        <View style={[styles.visibilityOverlay, { backgroundColor: colors.background, opacity: 0.4 }]} />
      </View>

      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn.duration(1200).springify().damping(15)}
          style={styles.logoWrapper}
        >
          <View style={[styles.logoContainer, { borderColor: colors.border + '33' }]}>
            <Image 
              source={require('../assets/logo.png')} 
              style={styles.logo} 
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.View entering={FadeInDown.delay(200).duration(1000).springify().damping(12).mass(0.8)}>
            <Text style={[styles.title, { color: colors.text }]}>
              MindBridge
            </Text>
          </Animated.View>
          
          <Animated.View entering={FadeInDown.delay(400).duration(1000).springify().damping(12).mass(1)}>
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
  nebulaContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  meshOrb: {
    position: 'absolute',
    borderRadius: 2000,
  },
  visibilityOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  logoWrapper: {
    marginBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    backgroundColor: '#fff',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 52,
    fontWeight: '800',
    letterSpacing: -2.5,
    textAlign: 'center',
    marginBottom: 16,
    textShadowColor: 'rgba(0,0,0,0.05)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 19,
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '400',
    opacity: 0.85,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 68,
    borderRadius: 22,
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
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 68,
    borderRadius: 22,
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
