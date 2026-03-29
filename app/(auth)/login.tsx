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
  StatusBar,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp, withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AnimatedBackground from '../../src/components/AnimatedBackground';

export default function Login() {
  const { signIn } = useAuthContext();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Button scale animation
  const buttonScale = useSharedValue(1);

  const handlePressIn = () => {
    buttonScale.value = withTiming(0.95, { duration: 150, easing: Easing.out(Easing.ease) });
  };

  const handlePressOut = () => {
    buttonScale.value = withTiming(1, { duration: 150, easing: Easing.out(Easing.ease) });
  };

  const animatedButtonProps = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }]
    };
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      await signIn(email, password);
      // AuthContext handles the state, router will automatically redirect if protected
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.message || 'Could not establish a secure connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AnimatedBackground />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled" 
        >
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              {/* Blur background moved inside the card and behind content for stability */}
              <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFillObject} />
              
              <View style={styles.cardInner}>
                {/* Header */}
                <View style={styles.header}>
                  <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logo} 
                  />
                  <Text style={styles.title}>
                    Welcome back
                  </Text>
                  <Text style={styles.subtitle}>
                    Sign in to your account
                  </Text>
                </View>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.socialButton} onPress={() => console.log('Google login')}>
                    <View style={styles.socialIconPlaceholder}>
                      <Text style={styles.socialG}>G</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Login with Google</Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>or</Text>
                  <View style={styles.line} />
                </View>

                {/* Form */}
                <View style={styles.form}>
                  
                  <View>
                    <Text style={styles.label}>
                      Email <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'email' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your email address"
                        placeholderTextColor="#6b7280"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onFocus={() => {
                          setFocusedField('email');
                        }}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>
                      Password <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'password' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your password"
                        placeholderTextColor="#6b7280"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        onFocus={() => {
                          setFocusedField('password');
                        }}
                        onBlur={() => setFocusedField(null)}
                      />
                      <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? (
                          <EyeOff size={20} color="#6b7280" />
                        ) : (
                          <Eye size={20} color="#6b7280" />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <Animated.View style={[styles.loginButtonContainer, animatedButtonProps]}>
                    <TouchableOpacity 
                      activeOpacity={0.9} 
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                      onPress={handleLogin} 
                      disabled={isLoading}
                      style={{flex: 1}}
                    >
                      <LinearGradient
                        colors={['#4f46e5', '#2563eb', '#3b82f6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.loginButtonGradient}
                      >
                        {isLoading ? (
                          <ActivityIndicator color="#fff" />
                        ) : (
                          <View style={styles.buttonInner}>
                            <Text style={styles.loginButtonText}>Sign in</Text>
                            <ArrowRight size={18} color="#fff" />
                          </View>
                        )}
                      </LinearGradient>
                    </TouchableOpacity>
                  </Animated.View>

                  <View style={styles.forgotPassword}>
                    <TouchableOpacity>
                      <Text style={styles.forgotText}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>New to MindBridge? </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                    <Text style={styles.signUpText}>Initialize Account</Text>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    paddingBottom: 40,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)', 
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    overflow: 'hidden',
  },
  cardInner: {
    padding: 24,
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginBottom: 8,
    borderRadius: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: '800', 
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#4b5563',
    fontWeight: '500',
  },
  socialContainer: {
    marginBottom: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 12,
  },
  socialIconPlaceholder: {
    marginRight: 8,
  },
  socialG: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ea4335',
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#4f46e5',
  },
  inputWrapper: {
    height: 46,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  inputWrapperFocused: {
    borderColor: '#4f46e5',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
  },
  eyeIcon: {
    padding: 4,
  },
  loginButtonContainer: {
    marginTop: 4,
    borderRadius: 14,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 4,
  },
  forgotText: {
    color: '#4f46e5',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 15,
    color: '#4b5563',
    fontWeight: '500',
  },
  signUpText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4f46e5',
  },
});
