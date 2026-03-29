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
  Image, 
  StatusBar 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function Login() {
  const { login } = useAuthContext();
  const { colors } = useTheme();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={colors.background === '#f8fafc' ? 'dark-content' : 'light-content'} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <View style={styles.header}>
          <Animated.View entering={FadeInUp.duration(1000).springify()}>
            <Image 
              source={require('../../assets/logo.png')} 
              style={[styles.logo, { borderRadius: 50, borderWidth: 1, borderColor: colors.border + '33', backgroundColor: 'transparent' }]} 
            />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200).duration(800)}>
            <Text style={[styles.title, { color: colors.text }]}>
              Welcome Back
            </Text>
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300).duration(800)}>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Continue your journey to resonance.
            </Text>
          </Animated.View>
        </View>

        <View style={styles.form}>
          <Animated.View entering={FadeInDown.delay(400)}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>EMAIL ADDRESS</Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.stroke,
                borderColor: focusedField === 'email' ? colors.primary : 'transparent',
                borderWidth: 1.5
              }
            ]}>
              <Mail size={18} color={focusedField === 'email' ? colors.primary : colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="resonance@mindbridge.com"
                placeholderTextColor="#94a3b8"
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

          <Animated.View entering={FadeInDown.delay(500)}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>PASSWORD</Text>
            <View style={[
              styles.inputWrapper, 
              { 
                backgroundColor: colors.stroke,
                borderColor: focusedField === 'password' ? colors.primary : 'transparent',
                borderWidth: 1.5
              }
            ]}>
              <Lock size={18} color={focusedField === 'password' ? colors.primary : colors.textSecondary} />
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="••••••••"
                placeholderTextColor="#94a3b8"
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
          </Animated.View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={[styles.forgotText, { color: colors.primary }]}>Recovery Options</Text>
          </TouchableOpacity>

          <Animated.View entering={FadeInDown.delay(600)}>
            <TouchableOpacity 
              activeOpacity={0.8}
              style={[styles.loginButton, { backgroundColor: colors.primary }]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.buttonInner}>
                  <Text style={styles.loginButtonText}>Access Dashboard</Text>
                  <ArrowRight size={18} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.divider}>
            <View style={[styles.line, { backgroundColor: colors.border, opacity: 0.2 }]} />
            <Text style={[styles.dividerText, { color: colors.textSecondary }]}>VERIFIED ACCESS</Text>
            <View style={[styles.line, { backgroundColor: colors.border, opacity: 0.2 }]} />
          </View>

          <Animated.View entering={FadeInDown.delay(700)} style={styles.socialRow}>
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: colors.stroke }]}>
              <Chrome size={22} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialBtn, { backgroundColor: colors.stroke }]}>
              <Github size={22} color={colors.text} />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(800)} style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textSecondary }]}>
            New to MindBridge?{" "}
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text style={[styles.signUpText, { color: colors.primary }]}>Initialize Account</Text>
          </TouchableOpacity>
        </Animated.View>
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
    paddingHorizontal: 32,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    opacity: 0.7,
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputWrapper: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'center',
    marginTop: -4,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.9,
  },
  loginButton: {
    height: 60,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  loginButtonText: {
    color: '#fff',
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
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    opacity: 0.4,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
  },
  socialBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
  },
  footerText: {
    fontSize: 15,
  },
  signUpText: {
    fontSize: 15,
    fontWeight: '700',
  },
});
