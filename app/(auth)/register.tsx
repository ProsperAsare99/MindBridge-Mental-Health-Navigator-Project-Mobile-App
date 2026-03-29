import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { useTheme } from '../../src/context/ThemeContext';
import { User, Mail, Lock, CheckCircle, ArrowRight, Code, Globe } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function Register() {
  const { login } = useAuthContext();
  const { colors } = useTheme();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      // Simulation for development
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login('dummy-token', { id: '1', email, name });
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Registration Failed', 'Something went wrong. Please try again.');
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
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Animated.View 
            entering={FadeInDown.duration(1000).springify()}
            style={[styles.glassCard, { backgroundColor: 'rgba(255, 255, 255, 0.85)', borderColor: colors.border }]}
          >
            <View style={styles.header}>
              <Animated.View entering={FadeInUp.delay(200)}>
                <Image 
                  source={require('../../assets/logo.png')} 
                  style={styles.logo} 
                  resizeMode="contain"
                />
              </Animated.View>
              <Animated.Text entering={FadeInUp.delay(300)} style={[styles.title, { color: colors.text }]}>Join MindBridge</Animated.Text>
              <Animated.Text entering={FadeInUp.delay(400)} style={[styles.subtitle, { color: colors.textSecondary }]}>Start your journey to better mental health</Animated.Text>
            </View>

            <View style={styles.form}>
              <Animated.View entering={FadeInDown.delay(500)} style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.iconWrapper}>
                  <User size={20} color={colors.textSecondary} />
                </View>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Full Name"
                  placeholderTextColor={colors.textSecondary}
                  value={name}
                  onChangeText={setName}
                  onFocus={() => Haptics.selectionAsync()}
                />
              </Animated.View>

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

              <Animated.View entering={FadeInDown.delay(800)} style={[styles.inputContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                <View style={styles.iconWrapper}>
                  <CheckCircle size={20} color={colors.textSecondary} />
                </View>
                <TextInput
                  style={[styles.input, { color: colors.text }]}
                  placeholder="Confirm Password"
                  placeholderTextColor={colors.textSecondary}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  onFocus={() => Haptics.selectionAsync()}
                />
              </Animated.View>

              <Animated.View entering={FadeInDown.delay(900)}>
                <TouchableOpacity 
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  onPress={handleRegister}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <View style={styles.buttonContent}>
                      <Text style={styles.buttonText}>Create Account</Text>
                      <ArrowRight size={20} color="#fff" style={styles.btnIcon} />
                    </View>
                  )}
                </TouchableOpacity>
              </Animated.View>

              <View style={styles.divider}>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.textSecondary }]}>or join with</Text>
                <View style={[styles.line, { backgroundColor: colors.border }]} />
              </View>

              <Animated.View entering={FadeInDown.delay(1000)} style={styles.socialRow}>
                <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border }]}>
                  <Globe size={24} color="#DB4437" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.socialBtn, { borderColor: colors.border }]}>
                  <Code size={24} color="#333" />
                </TouchableOpacity>
              </Animated.View>
            </View>

            <Animated.View entering={FadeInDown.delay(1100)} style={styles.footer}>
              <Text style={{ color: colors.textSecondary }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Sign In</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
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
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: 'center',
    minHeight: height,
  },
  glassCard: {
    borderRadius: 32,
    padding: 32,
    borderWidth: 1,
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    // Android Shadow
    elevation: 8,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 60,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 8,
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
    marginVertical: 12,
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
    gap: 12,
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
