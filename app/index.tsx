import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  FadeInDown,
  FadeInUp,
  Easing,
} from 'react-native-reanimated';
import { Circle, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import GeometricBackground from '../src/components/GeometricBackground';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  return (
    <GeometricBackground>
      <StatusBar barStyle="light-content" />

      <View style={styles.content}>
        {/* Circular Logo */}
        <Animated.View
          entering={FadeInDown.delay(300).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}
          style={styles.logoWrapper}
        >
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Badge */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}
          style={styles.badge}
        >
          <Circle size={8} color="#0077b6" fill="#0077b6" />
          <Text style={styles.badgeText}>Est 2026 • MindBridge</Text>
        </Animated.View>

        <View style={styles.textContainer}>
          <Animated.View entering={FadeInDown.delay(700).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <Text style={styles.subtitle}>The Mission</Text>
            <Text style={styles.title1}>Empowering Minds</Text>
            <Text style={styles.title1}>across</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(900).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))} style={styles.title2Container}>
            <MaskedView
              style={{ width: width - 64, height: 60 }}
              maskElement={<Text style={styles.title2}>Ghanaian</Text>}
            >
              <LinearGradient
                colors={['#CE1126', '#FCD116', '#006B3F']}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={StyleSheet.absoluteFillObject}
              />
            </MaskedView>
            <Text style={styles.title1}>Institutions</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1100).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <Text style={styles.description}>
              A high-fidelity space for mental health wellness{"\n"}
              and profound emotional resilience.
            </Text>
          </Animated.View>
        </View>

        {/* Start Button */}
        <View style={styles.actionContainer}>
          <Animated.View entering={FadeInDown.delay(1300).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryButton}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/register');
              }}
            >
              <Text style={styles.primaryButtonText}>Begin Journey</Text>
              <ArrowRight size={18} color="#030303" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(1400).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1)).springify()}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.secondaryButton, { marginTop: 16 }]}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/login');
              }}
            >
              <Text style={styles.secondaryButtonText}>
                Continue to Dashboard
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>

      {/* Surface Gradient Blur */}
      <LinearGradient
        colors={['transparent', '#030303']}
        style={styles.bottomScrub}
      />
    </GeometricBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrapper: {
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 40,
  },
  badgeText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 13,
    fontWeight: '500',
    letterSpacing: 1,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  title1: {
    fontSize: 40,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1.5,
    textAlign: 'center',
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 2,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title2Container: {
    marginTop: 4,
    alignItems: 'center',
  },
  title2: {
    fontSize: 42,
    fontWeight: '800',
    letterSpacing: -1.5,
    textAlign: 'center',
    lineHeight: 48,
    color: '#000',
  },
  description: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.4)',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 24,
    fontWeight: '300',
  },
  actionContainer: {
    width: '100%',
  },
  primaryButton: {
    height: 64,
    borderRadius: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  primaryButtonText: {
    color: '#030303',
    fontSize: 17,
    fontWeight: '700',
  },
  secondaryButton: {
    height: 64,
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: 'rgba(255,255,255,0.15)',
  },
  secondaryButtonText: {
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.2,
    color: '#fff',
  },
  bottomScrub: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    pointerEvents: 'none',
  },
});
