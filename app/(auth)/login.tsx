import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';
import { Mail, Lock, ArrowRight, Code, Globe } from 'lucide-react-native';
import { moodService } from '../../src/services/moodService';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Login() {
  const { login } = useAuthContext();
  const { colors } = useTheme();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login('dummy-token', { id: '1', email, name: 'MindBridge User' });
      
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Check your credentials or backend connectivity.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.background, colors.background]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <Animated.View 
          entering={FadeInDown.duration(1000).springify()}
          style={[styles.glassCard, { backgroundColor: 'rgba(255, 255, 255, 0.85)', borderColor: colors.border }]}
        >
          <View style={styles.header}>
            <Animated.View entering={FadeInUp.delay(200).duration(800)}>
              <Image 
                source={require('../../assets/logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.Text 
              entering={FadeInUp.delay(400)}
              style={[styles.subtitle, { color: colors.textSecondary }]}
            >
              Your mental health navigator
            </Animated.Text>
          </View>

          <View style={styles.form}>
            <Animated.View entering={FadeInDown.delay(600)} style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.iconWrapper}>
                <Mail size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Email Address"
                placeholderTextColor={colors.textSecondary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                onFocus={() => Haptics.selectionAsync()}
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(700)} style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <View style={styles.iconWrapper}>
                <Lock size={20} color={colors.textSecondary} />
              </View>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Password"
                placeholderTextColor={colors.textSecondary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => Haptics.selectionAsync()}
              />
            </Animated.View>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={[styles.forgotText, { color: colors.primary }]}>Forgot Password?</Text>
            </TouchableOpacity>

            <Animated.View entering={FadeInDown.delay(800)}>
              <TouchableOpacity 
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <View style={styles.buttonContent}>
                    <Text style={styles.buttonText}>Sign In</Text>
                    <ArrowRight size={20} color="#fff" style={styles.btnIcon} />
                  </View>
                )}
              </TouchableOpacity>
            </Animated.View>

            <View style={styles.divider}>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or continue with</Text>
              <View style={[styles.line, { backgroundColor: colors.border }]} />
            </View>

            <Animated.View entering={FadeInDown.delay(900)} style={styles.socialRow}>
              <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border }]}>
                <Globe size={24} color="#DB4437" />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border }]}>
                <Code size={24} color="#333" />
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInDown.delay(1000)} style={styles.footer}>
            <Text style={{ color: colors.textSecondary }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/register')}>
              <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sign Up</Text>
            </TouchableOpacity>
          </Animated.View>
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
    justifyContent: 'center',
    padding: 20,
  },
  glassCard: {
    borderRadius: 32,
    padding: 32,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    opacity: 0.8,
  },
  form: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    height: 56,
    paddingHorizontal: 16,
  },
  iconWrapper: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  btnIcon: {
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    opacity: 0.5,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  socialBtn: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
});
