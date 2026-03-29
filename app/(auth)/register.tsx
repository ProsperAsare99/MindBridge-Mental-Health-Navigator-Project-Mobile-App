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

export default function Register() {
  const { login } = useAuthContext();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Incomplete Form', 'Please fill in all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mismatch', 'Passwords do not match.');
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
      Alert.alert('Registration Failed', 'Could not create your MindBridge account.');
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
                Create an account
              </Animated.Text>
              <Animated.Text entering={FadeInDown.springify().delay(300)} style={styles.subtitle}>
                Start your wellness journey with MindBridge
              </Animated.Text>
            </View>

            {/* Social Login */}
            <Animated.View entering={FadeInDown.delay(400)} style={styles.socialContainer}>
              <TouchableOpacity activeOpacity={0.7} style={styles.socialButton} onPress={() => console.log('Google register')}>
                <View style={styles.socialIconPlaceholder}>
                  <Text style={styles.socialG}>G</Text>
                </View>
                <Text style={styles.socialButtonText}>Sign up with Google</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Divider */}
            <Animated.View entering={FadeInDown.delay(500)} style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>or continue with email</Text>
              <View style={styles.line} />
            </Animated.View>

            {/* Form */}
            <View style={styles.form}>
              <Animated.View entering={FadeInDown.delay(600)}>
                <Text style={styles.label}>
                  Full Name <Text style={styles.required}>*</Text>
                </Text>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'name' && styles.inputWrapperFocused
                ]}>
                  <TextInput
                    style={styles.input}
                    placeholder="John Doe"
                    placeholderTextColor="#9ca3af"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    onFocus={() => {
                      setFocusedField('name');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(700)}>
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

              <Animated.View entering={FadeInDown.delay(800)}>
                <Text style={styles.label}>
                  Password <Text style={styles.required}>*</Text>
                </Text>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'password' && styles.inputWrapperFocused
                ]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a secure password"
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

              <Animated.View entering={FadeInDown.delay(900)}>
                <Text style={styles.label}>
                  Confirm Password <Text style={styles.required}>*</Text>
                </Text>
                <View style={[
                  styles.inputWrapper,
                  focusedField === 'confirm' && styles.inputWrapperFocused
                ]}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    placeholderTextColor="#9ca3af"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onFocus={() => {
                      setFocusedField('confirm');
                      Haptics.selectionAsync();
                    }}
                    onBlur={() => setFocusedField(null)}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOff size={20} color="#6b7280" />
                    ) : (
                      <Eye size={20} color="#6b7280" />
                    )}
                  </TouchableOpacity>
                </View>
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(1000)}>
                <TouchableOpacity activeOpacity={0.8} style={styles.registerButtonContainer} onPress={handleRegister} disabled={isLoading}>
                  <LinearGradient
                    colors={['#3b82f6', '#4f46e5']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.registerButtonGradient}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <View style={styles.buttonInner}>
                        <Text style={styles.registerButtonText}>Create Account</Text>
                        <ArrowRight size={18} color="#fff" />
                      </View>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>

            </View>

            <Animated.View entering={FadeInDown.delay(1100)} style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                <Text style={styles.signInText}>Sign in instead</Text>
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
    marginTop: 40,
    marginBottom: 40,
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
    fontSize: 13,
    color: '#6b7280',
    backgroundColor: '#ffffff',
  },
  form: {
    gap: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
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
  registerButtonContainer: {
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  registerButtonGradient: {
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
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
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
  signInText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563eb',
  },
});
