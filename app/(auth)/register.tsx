import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  ActivityIndicator, 
  Alert, 
  ScrollView, 
  Image, 
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { User, Mail, Lock, CheckCircle, ArrowRight, Github, Chrome } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import GeometricBackground from '../../src/components/GeometricBackground';

export default function Register() {
  const { login } = useAuthContext();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Incomplete Form', 'Please fill in all resonance parameters.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Security keys do not match.');
      return;
    }

    setIsLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login('dummy-token', { id: '1', email, name });
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Initialization Failed', 'Could not synchronize with the MindBridge network.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GeometricBackground>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.header}>
            <Animated.View entering={FadeInUp.duration(1000).springify()}>
              <View style={styles.logoContainer}>
                <Image 
                  source={require('../../assets/logo.png')} 
                  style={styles.logo} 
                  resizeMode="contain"
                />
              </View>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(200).duration(800)}>
              <Text style={styles.title}>
                New Resonance
              </Text>
            </Animated.View>
            <Animated.View entering={FadeInDown.delay(300).duration(800)}>
              <Text style={styles.subtitle}>
                Initialize your MindBridge profile.
              </Text>
            </Animated.View>
          </View>

          <View style={styles.form}>
            {/* FULL NAME */}
            <Animated.View entering={FadeInDown.delay(400)}>
              <Text style={styles.label}>FULL NAME</Text>
              <BlurView intensity={20} tint="light" style={styles.blurWrapper}>
                <View style={[
                  styles.inputWrapper, 
                  { 
                    borderColor: focusedField === 'name' ? '#a5b4fc' : 'rgba(255,255,255,0.15)',
                  }
                ]}>
                  <User size={18} color={focusedField === 'name' ? '#a5b4fc' : 'rgba(255,255,255,0.6)'} />
                  <TextInput
                    style={styles.input}
                    placeholder="Identity Name"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={name}
                    onChangeText={setName}
                    onFocus={() => {
                      setFocusedField('name');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </BlurView>
            </Animated.View>

            {/* EMAIL */}
            <Animated.View entering={FadeInDown.delay(500)}>
              <Text style={styles.label}>EMAIL ADDRESS</Text>
              <BlurView intensity={20} tint="light" style={styles.blurWrapper}>
                <View style={[
                  styles.inputWrapper, 
                  { 
                    borderColor: focusedField === 'email' ? '#a5b4fc' : 'rgba(255,255,255,0.15)',
                  }
                ]}>
                  <Mail size={18} color={focusedField === 'email' ? '#a5b4fc' : 'rgba(255,255,255,0.6)'} />
                  <TextInput
                    style={styles.input}
                    placeholder="resonance@mindbridge.com"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onFocus={() => {
                      setFocusedField('email');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </BlurView>
            </Animated.View>

            {/* PASSWORD */}
            <Animated.View entering={FadeInDown.delay(600)}>
              <Text style={styles.label}>PASSWORD</Text>
              <BlurView intensity={20} tint="light" style={styles.blurWrapper}>
                <View style={[
                  styles.inputWrapper, 
                  { 
                    borderColor: focusedField === 'password' ? '#a5b4fc' : 'rgba(255,255,255,0.15)',
                  }
                ]}>
                  <Lock size={18} color={focusedField === 'password' ? '#a5b4fc' : 'rgba(255,255,255,0.6)'} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    onFocus={() => {
                      setFocusedField('password');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </BlurView>
            </Animated.View>

            {/* CONFIRM PASSWORD */}
            <Animated.View entering={FadeInDown.delay(700)}>
              <Text style={styles.label}>CONFIRM SECURITY KEY</Text>
              <BlurView intensity={20} tint="light" style={styles.blurWrapper}>
                <View style={[
                  styles.inputWrapper, 
                  { 
                    borderColor: focusedField === 'confirm' ? '#a5b4fc' : 'rgba(255,255,255,0.15)',
                  }
                ]}>
                  <CheckCircle size={18} color={focusedField === 'confirm' ? '#a5b4fc' : 'rgba(255,255,255,0.6)'} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    onFocus={() => {
                      setFocusedField('confirm');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </BlurView>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(800)}>
              <TouchableOpacity 
                activeOpacity={0.8}
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#030303" />
                ) : (
                  <View style={styles.buttonInner}>
                    <Text style={styles.registerButtonText}>Initialize Account</Text>
                    <ArrowRight size={18} color="#030303" />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>QUICK INITIALIZATION</Text>
              <View style={styles.line} />
            </View>

            <Animated.View entering={FadeInDown.delay(900)} style={styles.socialRow}>
              <BlurView intensity={20} tint="light" style={styles.socialBtnBlur}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Chrome size={22} color="#fff" />
                </TouchableOpacity>
              </BlurView>
              
              <BlurView intensity={20} tint="light" style={styles.socialBtnBlur}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Github size={22} color="#fff" />
                </TouchableOpacity>
              </BlurView>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInDown.delay(1000)} style={styles.footer}>
            <Text style={styles.footerText}>
              Already synchronized?{" "}
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signInText}>Access Dashboard</Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GeometricBackground>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 32,
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  blurWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  inputWrapper: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1.5,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  registerButton: {
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#fff',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  registerButtonText: {
    color: '#030303',
    fontSize: 17,
    fontWeight: '700',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    color: 'rgba(255,255,255,0.4)',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialBtnBlur: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  socialBtn: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.6)',
  },
  signInText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#a5b4fc',
  },
});
