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
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import DotMap from '../../src/components/DotMap';

export default function Login() {
  const { login } = useAuthContext();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please provide both email and password.');
      return;
    }

    setIsLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      await login('dummy-token', { id: '1', email, name: 'MindBridge User' });
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', 'Could not establish a secure connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient 
      colors={['#eff6ff', '#e0e7ff']} 
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />
      <DotMap />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Animated.View 
            entering={FadeInUp.springify().damping(12).stiffness(90)}
            style={styles.card}
          >
            {/* Header */}
            <View style={styles.header}>
              <Animated.View entering={FadeInDown.springify().delay(100)}>
                <Image 
                  source={require('../../assets/logo.png')} 
                  style={styles.logo} 
                />
              </Animated.View>
              <Animated.Text entering={FadeInDown.springify().delay(200)} style={styles.title}>
                Welcome back
              </Animated.Text>
              <Animated.Text entering={FadeInDown.springify().delay(300)} style={styles.subtitle}>
                Sign in to your account
              </Animated.Text>
            </View>

            {/* Social Login */}
            <Animated.View entering={FadeInDown.delay(400)} style={styles.socialContainer}>
              <TouchableOpacity activeOpacity={0.7} style={styles.socialButton} onPress={() => console.log('Google login')}>
                {/* SVG Google Logo substitute with text to keep it simple natively or use an emoji/icon as placeholder since SVGs require react-native-svg */}
                <View style={styles.socialIconPlaceholder}>
                  <Text style={styles.socialG}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Login with Google</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <Animated.View entering={FadeInDown.delay(500)} style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.line} />
            </Animated.View>

            {/* Form */}
            <View style={styles.form}>
              <Animated.View entering={FadeInDown.delay(600)}>
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
                    placeholderTextColor="#9ca3af"
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
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(700)}>
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
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isPasswordVisible}
                    onFocus={() => {
                      setFocusedField('password');
                      Haptics.selectionAsync();
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
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(800)}>
                <TouchableOpacity activeOpacity={0.8} style={styles.loginButtonContainer} onPress={handleLogin} disabled={isLoading}>
                  <LinearGradient
                    colors={['#3b82f6', '#4f46e5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
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

              <Animated.View entering={FadeInDown.delay(900)} style={styles.forgotPassword}>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forgot password?</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>

            <Animated.View entering={FadeInDown.delay(1000)} style={styles.footer}>
              <Text style={styles.footerText}>New to MindBridge? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                <Text style={styles.signUpText}>Initialize Account</Text>
              </TouchableOpacity>
            </Animated.View>

          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
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
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 14,
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
    fontWeight: '500',
    color: '#374151',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#6b7280',
    backgroundColor: '#ffffff',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#3b82f6',
  },
  inputWrapper: {
    height: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  inputWrapperFocused: {
    borderColor: '#3b82f6',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1f2937',
    height: '100%',
  },
  eyeIcon: {
    padding: 4,
  },
  loginButtonContainer: {
    marginTop: 8,
    borderRadius: 12,
    overflow: 'hidden',
  },
  loginButtonGradient: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 8,
  },
  forgotText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 14,
    color: '#6b7280',
  },
  signUpText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
});
