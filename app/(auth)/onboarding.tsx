import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  Platform, 
  ActivityIndicator, 
  Alert,
  StatusBar,
  ScrollView,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthContext } from '../../src/context/AuthContext';
import { 
  ChevronRight, 
  ChevronLeft, 
  Heart, 
  ShieldAlert, 
  MessageSquare, 
  Target, 
  Anchor,
  Sparkles,
  BookOpen,
  User,
  Activity,
  Lock
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { 
  FadeInUp, 
  FadeOutDown,
  useAnimatedStyle, 
  withTiming, 
  interpolateColor,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import OnboardingOption from '../../src/components/onboarding/OnboardingOption';

const { width, height } = Dimensions.get('window');

const ONBOARDING_STEPS = [
  { id: 1, title: "Tell us about yourself", subtitle: "Help us personalize your experience", icon: User, color: "#fbbf24" }, // Identity
  { id: 2, title: "Academic context", subtitle: "Tell us about your studies", icon: BookOpen, color: "#34d399" }, // Context
  { id: 3, title: "Communication", subtitle: "How should we reach you?", icon: MessageSquare, color: "#60a5fa" }, // Comm
  { id: 4, title: "How are you feeling?", subtitle: "Set your wellbeing baseline", icon: Activity, color: "#f87171" }, // Wellbeing
  { id: 5, title: "Support level", subtitle: "What's your current support circle?", icon: Heart, color: "#f472b6" }, // Support
  { id: 6, title: "Safety first", subtitle: "Set up your emergency contact", icon: ShieldAlert, color: "#fb7185" }, // Safety
  { id: 7, title: "Coping mechanisms", subtitle: "What helps you through tough times?", icon: Anchor, color: "#818cf8" }, // Coping
  { id: 8, title: "Stress factors", subtitle: "What causes you the most stress?", icon: Sparkles, color: "#a78bfa" }, // Stress
  { id: 9, title: "Personal values", subtitle: "What drives and inspires you?", icon: Target, color: "#fb923c" }, // Values
  { id: 10, title: "Wellness goals", subtitle: "What do you want to achieve?", icon: Sparkles, color: "#2dd4bf" }, // Goals
  { id: 11, title: "Personal tracking", subtitle: "Preferences for data collection", icon: Activity, color: "#38bdf8" }, // Tracking
  { id: 12, title: "Privacy & Consent", subtitle: "Your data is safe with us", icon: Lock, color: "#475569" } // Privacy
];

export default function Onboarding() {
  const { user, updateOnboarding } = useAuthContext();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    bio: '',
    language: 'English',
    frequency: 'Daily',
    mood: 'Good',
    supportLevel: 'Moderate',
    emergencyContact: '',
    copingMechanisms: [],
    stressFactors: [],
    values: [],
    goals: [],
    trackingPreferences: 'Full',
    consentGranted: false,
    ...user // Pre-fill with user info if available
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Background color animation
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withTiming(currentStep / ONBOARDING_STEPS.length, { duration: 500 });
  }, [currentStep]);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const stepColor = ONBOARDING_STEPS[currentStep - 1]?.color || '#fbbf24';
    return {
      backgroundColor: stepColor,
    };
  });

  const handleNext = async () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else {
      await handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleFinish = async () => {
    if (currentStep === 12 && !formData.consentGranted) {
      Alert.alert('Consent Required', 'Please accept the privacy terms to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await updateOnboarding({
        ...formData,
        onboardingCompleted: true,
        onboardingStep: 12
      });
      router.replace('/(tabs)/dashboard');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Could not save your progress.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    const step = ONBOARDING_STEPS[currentStep - 1];
    
    switch (currentStep) {
      case 1:
        return (
          <View key="step1" style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Brief bio</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Tell us a bit about yourself..."
              multiline
              numberOfLines={4}
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
            />
          </View>
        );
      case 3:
        return (
          <View key="step3" style={styles.stepContainer}>
            <OnboardingOption 
              label="English" 
              selected={formData.language === 'English'} 
              onSelect={() => setFormData({...formData, language: 'English'})} 
            />
            <OnboardingOption 
              label="French" 
              selected={formData.language === 'French'} 
              onSelect={() => setFormData({...formData, language: 'French'})} 
            />
          </View>
        );
      case 4:
        return (
          <View key="step4" style={styles.stepContainer}>
            {['Great', 'Good', 'Okay', 'Stressed', 'Overwhelmed'].map(mood => (
              <OnboardingOption 
                key={mood}
                label={mood} 
                selected={formData.mood === mood} 
                onSelect={() => setFormData({...formData, mood})} 
              />
            ))}
          </View>
        );
      case 12:
        return (
          <View key="step12" style={styles.stepContainer}>
            <Text style={styles.consentText}>
              MindBridge is committed to your privacy. By proceeding, you agree to our data processing guidelines focused on student wellness.
            </Text>
            <OnboardingOption 
              label="I accept the terms & conditions" 
              selected={formData.consentGranted} 
              onSelect={() => setFormData({...formData, consentGranted: !formData.consentGranted})} 
            />
          </View>
        );
      default:
        return (
          <View key="default" style={styles.stepContainer}>
            <Text style={styles.placeholderText}>This step's specific student data will be captured here to match your website's reference.</Text>
            <OnboardingOption 
              label="Standard option" 
              selected={true} 
              onSelect={() => {}} 
            />
          </View>
        );
    }
  };

  const stepInfo = ONBOARDING_STEPS[currentStep - 1];
  const StepIcon = stepInfo.icon;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Hero Header (Headspace-style) */}
      <Animated.View style={[styles.header, animatedHeaderStyle]}>
        <View style={styles.iconCircle}>
          <StepIcon size={48} color={stepInfo.color} strokeWidth={2.5} />
        </View>
      </Animated.View>

      {/* Content Card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View 
                style={[
                  styles.progressFill, 
                  { width: `${(currentStep / ONBOARDING_STEPS.length) * 100}%` },
                  { backgroundColor: stepInfo.color }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>Step {currentStep} of 12</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.cardScroll}>
            <Text style={styles.title}>{stepInfo.title}</Text>
            <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>
            
            <View style={styles.content}>
              {renderStepContent()}
            </View>
          </ScrollView>

          {/* Fixed Footer */}
          <View style={styles.footer}>
            {currentStep > 1 && (
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
              >
                <ChevronLeft size={24} color="#6b7280" />
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={[styles.continueButton, { backgroundColor: stepInfo.color }]} 
              onPress={handleNext}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.continueText}>
                    {currentStep === 12 ? "Complete Setup" : "Continue"}
                  </Text>
                  <ChevronRight size={20} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10,
  },
  cardWrapper: {
    flex: 1,
    marginTop: -40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  card: {
    flex: 1,
    padding: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    marginRight: 16,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#9ca3af',
  },
  cardScroll: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 32,
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    width: '100%',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  textArea: {
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 16,
    padding: 16,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    textAlignVertical: 'top',
    height: 120,
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
    fontStyle: 'italic',
    marginBottom: 20,
    lineHeight: 24,
  },
  consentText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 24,
    marginBottom: 24,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 24,
    right: 24,
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#fff',
    paddingTop: 12,
  },
  backButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  continueText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
