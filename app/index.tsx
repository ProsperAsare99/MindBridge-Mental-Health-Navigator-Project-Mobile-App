import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { 
  FadeIn,
  FadeInDown, 
  FadeInUp, 
} from 'react-native-reanimated';
import { useTheme } from '../src/context/ThemeContext';
import { ArrowRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.meshContainer}>
        <View style={[styles.meshGradient, { backgroundColor: colors.secondary, opacity: 0.5 }]} />
      </View>

      <View style={styles.content}>
        <Animated.View 
          entering={FadeIn.duration(1200)}
          style={styles.logoWrapper}
        >
          <Image 
            source={require('../assets/logo.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.Text 
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={[styles.title, { color: colors.text }]}
          >
            MindBridge
          </Animated.Text>
          <Animated.Text 
            entering={FadeInDown.delay(400).duration(1000).springify()}
            style={[styles.subtitle, { color: colors.textSecondary }]}
          >
            A high-fidelity space for mental clarity{"\n"}and emotional resonance.
          </Animated.Text>
        </View>

        <View style={styles.actionContainer}>
          <Animated.View entering={FadeInUp.delay(600).duration(1000).springify()}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.primaryButton, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/(auth)/register')}
            >
              <Text style={styles.primaryButtonText}>Begin Journey</Text>
              <ArrowRight size={18} color="#fff" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(800).duration(1000).springify()}>
            <TouchableOpacity 
              activeOpacity={0.7}
              style={[styles.secondaryButton, { borderColor: colors.border }]}
              onPress={() => router.push('/(auth)/login')}
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
    top: -width * 0.5,
    right: -width * 0.5,
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
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
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  title: {
    fontSize: 44,
    fontWeight: '800',
    letterSpacing: -1.5,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
    opacity: 0.8,
  },
  actionContainer: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    height: 60,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#0077b6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  secondaryButton: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    opacity: 0.5,
  },
});
