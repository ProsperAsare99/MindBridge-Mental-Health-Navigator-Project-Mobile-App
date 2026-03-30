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

        {/* Mission Badge */}
        <Animated.View
          entering={FadeInDown.delay(500).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}
          style={styles.missionTag}
        >
          <Circle size={4} color="#FCD116" fill="#FCD116" />
          <Text style={styles.missionTagText}>The Mission</Text>
        </Animated.View>

        <View style={styles.heroContainer}>
          <Animated.View entering={FadeInDown.delay(700).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <Text style={styles.mainHeading}>Empowering Minds</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <Text style={styles.acrossText}>across</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(900).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))} style={styles.impactContainer}>
            <MaskedView
              style={{ width: width - 64, height: 48 }}
              maskElement={<Text style={styles.ghanaianTitle}>Ghanaian</Text>}
            >
              <LinearGradient
                colors={['#CE1126', '#FCD116', '#FCD116', '#006B3F']}
                locations={[0, 0.45, 0.55, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFillObject}
              />
            </MaskedView>
            <Animated.View 
              entering={FadeInDown.delay(1000).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}
              style={{ marginTop: -4 }}
            >
              <Text style={styles.mainHeading}>Institutions</Text>
            </Animated.View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(1150).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <Text style={styles.descriptionText}>
              A high-fidelity space for mental health wellness{"\n"}
              and profound emotional resilience across Ghana.
            </Text>
          </Animated.View>
        </View>

        {/* Action Section */}
        <View style={styles.footer}>
          <Animated.View entering={FadeInDown.delay(1300).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1))}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.ctaButton}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/register');
              }}
            >
              <Text style={styles.ctaButtonText}>Begin Journey</Text>
              <ArrowRight size={18} color="#030303" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(1400).duration(1000).easing(Easing.bezier(0.25, 0.4, 0.25, 1)).springify()}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.ghostButton}
              onPress={() => {
                Haptics.selectionAsync();
                router.push('/(auth)/login');
              }}
            >
              <Text style={styles.ghostButtonText}>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  missionTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
  },
  missionTagText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainHeading: {
    fontSize: 38,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1.5,
    textAlign: 'center',
    lineHeight: 44,
  },
  acrossText: {
    fontSize: 13,
    color: '#FCD116',
    fontWeight: '700',
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginVertical: 8,
    opacity: 0.8,
  },
  impactContainer: {
    alignItems: 'center',
  },
  ghanaianTitle: {
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: -1.5,
    textAlign: 'center',
    lineHeight: 44,
    color: 'white',
  },
  descriptionText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
    fontWeight: '400',
    maxWidth: width * 0.85,
  },
  footer: {
    width: '100%',
    paddingBottom: 40,
  },
  ctaButton: {
    height: 60,
    borderRadius: 18,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  ctaButtonText: {
    color: '#030303',
    fontSize: 17,
    fontWeight: '700',
  },
  ghostButton: {
    height: 60,
    borderRadius: 18,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    borderColor: 'rgba(255,255,255,0.1)',
    marginTop: 16,
  },
  ghostButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.8)',
  },
  bottomScrub: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.25,
    pointerEvents: 'none',
  },
});
