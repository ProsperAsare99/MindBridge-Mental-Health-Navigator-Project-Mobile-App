import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeInUp, 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { useTheme } from '../src/context/ThemeContext';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const { colors } = useTheme();
  const router = useRouter();

  const floatingButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withRepeat(
          withSequence(
            withTiming(-10, { duration: 2000 }),
            withTiming(0, { duration: 2000 })
          ),
          -1,
          true
        ),
      },
    ],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.accent, colors.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.content}>
        <Animated.View 
          entering={FadeInUp.duration(1000).springify()}
          style={[styles.logoContainer, floatingButtonStyle]}
        >
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.Text 
            entering={FadeInDown.delay(300).duration(800)}
            style={[styles.title, { color: colors.text }]}
          >
            MindBridge
          </Animated.Text>
          <Animated.Text 
            entering={FadeInDown.delay(500).duration(800)}
            style={[styles.tagline, { color: colors.textSecondary }]}
          >
            Your journey to mental clarity and emotional balance starts here.
          </Animated.Text>
        </View>

        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(700).springify()}>
            <TouchableOpacity 
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <ArrowRight size={20} color="#fff" style={styles.btnIcon} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(900).springify()}>
            <TouchableOpacity 
              style={[styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={() => router.push('/(auth)/login')}
            >
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>
                I already have an account
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      <Animated.View 
        entering={FadeInDown.delay(1200)}
        style={styles.footer}
      >
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>
          Designed for your peace of mind
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  logoContainer: {
    width: 250,
    height: 150,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 64,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 20,
    opacity: 0.9,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
  },
  btnIcon: {
    marginLeft: 10,
  },
  secondaryButton: {
    height: 64,
    borderRadius: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.6,
  },
});
