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
import Animated, { withTiming, useSharedValue, useAnimatedStyle, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AnimatedBackground from '../../src/components/AnimatedBackground';
import CustomSelect from '../../src/components/CustomSelect';

const INSTITUTIONS = [
  { label: 'University of Ghana (UG)', value: 'University of Ghana (UG)' },
  { label: 'Kwame Nkrumah University of Science and Technology (KNUST)', value: 'KNUST' },
  { label: 'University of Cape Coast (UCC)', value: 'University of Cape Coast (UCC)' },
  { label: 'University of Education, Winneba (UEW)', value: 'UEW' },
  { label: 'University for Development Studies (UDS)', value: 'UDS' },
  { label: 'University of Mines and Technology (UMaT)', value: 'UMaT' },
  { label: 'University of Health and Allied Sciences (UHAS)', value: 'UHAS' },
  { label: 'University of Energy and Natural Resources (UENR)', value: 'UENR' },
  { label: 'Ghana Institute of Management and Public Administration (GIMPA)', value: 'GIMPA' },
  { label: 'Ashesi University', value: 'Ashesi University' },
  { label: 'Central University', value: 'Central University' },
  { label: 'Valley View University', value: 'Valley View University' },
  { label: 'Lancaster University Ghana', value: 'Lancaster University Ghana' },
  { label: 'Academic City University College', value: 'Academic City University College' },
  { label: 'Wisconsin International University College', value: 'Wisconsin International University College' },
  { label: 'Radford University College', value: 'Radford University College' },
  { label: 'Other', value: 'Other' }
];

const LEVELS = [
  { label: 'Level 100', value: '100' },
  { label: 'Level 200', value: '200' },
  { label: 'Level 300', value: '300' },
  { label: 'Level 400', value: '400' },
  { label: 'Level 500', value: '500' },
  { label: 'Level 600', value: '600' },
  { label: 'Postgraduate', value: 'Postgraduate' }
];

export default function Register() {
  const { signUp } = useAuthContext();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [institution, setInstitution] = useState('');
  const [otherInstitution, setOtherInstitution] = useState('');

  const [studentLevel, setStudentLevel] = useState('');
  const [courseOfStudy, setCourseOfStudy] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
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

  const handleRegister = async () => {
    const finalInstitution = institution === 'Other' ? otherInstitution : institution;

    if (!name || !phoneNumber || !finalInstitution || !studentLevel || !courseOfStudy || !email || !password || !confirmPassword) {
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
      await signUp({
        name,
        email,
        password,
        phoneNumber,
        institution: finalInstitution,
        course: courseOfStudy,
        academicLevel: studentLevel
      });
      Alert.alert(
        'Account Created',
        'Welcome to MindBridge! Your account has been successfully initialized.',
        [{ text: 'Continue', onPress: () => router.replace('/(tabs)/dashboard') }]
      );
    } catch (error: any) {
      console.error(error);
      Alert.alert('Registration Failed', error.message || 'Could not create your MindBridge account.');
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
              <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFillObject} />
              
              <View style={styles.cardInner}>
                {/* Header */}
                <View style={styles.header}>
                  <Image 
                    source={require('../../assets/logo.png')} 
                    style={styles.logo} 
                  />
                  <Text style={styles.title}>
                    Create an account
                  </Text>
                  <Text style={styles.subtitle}>
                    Start your wellness journey with MindBridge
                  </Text>
                </View>

                {/* Social Login */}
                <View style={styles.socialContainer}>
                  <TouchableOpacity activeOpacity={0.7} style={styles.socialButton} onPress={() => console.log('Google register')}>
                    <View style={styles.socialIconPlaceholder}>
                      <Text style={styles.socialG}>G</Text>
                    </View>
                    <Text style={styles.socialButtonText}>Sign up with Google</Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider}>
                  <View style={styles.line} />
                  <Text style={styles.dividerText}>or continue with email</Text>
                  <View style={styles.line} />
                </View>

                {/* Form */}
                <View style={styles.form}>
                  
                  <View>
                    <Text style={styles.label}>
                      Full Name <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'name' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Prosper Asare"
                        placeholderTextColor="#6b7280"
                        value={name}
                        onChangeText={setName}
                        autoCapitalize="words"
                        onFocus={() => {
                          setFocusedField('name');
                        }}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>
                      Phone Number <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'phone' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Enter your phone number"
                        placeholderTextColor="#6b7280"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        onFocus={() => {
                          setFocusedField('phone');
                        }}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>

                  <View>
                    <CustomSelect
                      label="Institution"
                      options={INSTITUTIONS}
                      value={institution}
                      onSelect={(val) => {
                        setInstitution(val);
                        if (val !== 'Other') setOtherInstitution('');
                        Haptics.selectionAsync();
                        setFocusedField(null); // Keep focus clean
                      }}
                      placeholder="Select Your Institution"
                      required
                    />
                  </View>

                  {/* Conditional Other Institution Input */}
                  {institution === 'Other' && (
                    <View>
                      <Text style={styles.label}>
                        Enter Institution Name <Text style={styles.required}>*</Text>
                      </Text>
                      <View style={[
                        styles.inputWrapper,
                        focusedField === 'otherInstitution' && styles.inputWrapperFocused
                      ]}>
                        <TextInput
                          style={styles.input}
                          placeholder="e.g. Ashesi University"
                          placeholderTextColor="#6b7280"
                          value={otherInstitution}
                          onChangeText={setOtherInstitution}
                          onFocus={() => {
                            setFocusedField('otherInstitution');
                          }}
                          onBlur={() => setFocusedField(null)}
                        />
                      </View>
                    </View>
                  )}



                  <View>
                    <CustomSelect
                      label="Student's Level"
                      options={LEVELS}
                      value={studentLevel}
                      onSelect={(val) => {
                        setStudentLevel(val);
                        Haptics.selectionAsync();
                        setFocusedField(null);
                      }}
                      placeholder="e.g. Level 100"
                      required
                    />
                  </View>

                  <View>
                    <Text style={styles.label}>
                      Course of Study <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'course' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Computer Science"
                        placeholderTextColor="#6b7280"
                        value={courseOfStudy}
                        onChangeText={setCourseOfStudy}
                        onFocus={() => {
                          setFocusedField('course');
                        }}
                        onBlur={() => setFocusedField(null)}
                      />
                    </View>
                  </View>

                  <View>
                    <Text style={styles.label}>
                      Email Address <Text style={styles.required}>*</Text>
                    </Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedField === 'email' && styles.inputWrapperFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="asareprosper143@gmail.com"
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
                        placeholder="Create a secure password"
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

                  <View>
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
                        placeholderTextColor="#6b7280"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!isConfirmPasswordVisible}
                        onFocus={() => {
                          setFocusedField('confirm');
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
                  </View>

                  <Animated.View style={[styles.registerButtonContainer, animatedButtonProps]}>
                    <TouchableOpacity 
                      activeOpacity={0.9} 
                      onPressIn={handlePressIn}
                      onPressOut={handlePressOut}
                      onPress={handleRegister} 
                      disabled={isLoading}
                      style={{flex: 1}}
                    >
                      <LinearGradient
                        colors={['#4f46e5', '#2563eb', '#3b82f6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
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

                <View style={styles.footer}>
                  <Text style={styles.footerText}>Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                    <Text style={styles.signInText}>Sign in instead</Text>
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
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 70 : 50,
    paddingBottom: 60,
  },
  cardContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    marginTop: 40,
    marginBottom: 40,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.45)', 
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    overflow: 'hidden',
  },
  cardInner: {
    padding: 32,
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
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
  },
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 14,
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
    fontWeight: '600',
    color: '#1f2937',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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
    backgroundColor: 'transparent',
  },
  form: {
    gap: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#4f46e5',
  },
  inputWrapper: {
    height: 52,
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
  registerButtonContainer: {
    marginTop: 8,
    borderRadius: 14,
    overflow: 'hidden',
  },
  registerButtonGradient: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 15,
    color: '#4b5563',
    fontWeight: '500',
  },
  signInText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4f46e5',
  },
});
