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
  TextInput,
  Switch
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
  User as UserIcon,
  Activity,
  Lock,
  Search,
  CheckCircle2
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import OnboardingOption from '../../src/components/onboarding/OnboardingOption';
import OnboardingMultiSelect from '../../src/components/onboarding/OnboardingMultiSelect';
import OnboardingScale from '../../src/components/onboarding/OnboardingScale';

const { width, height } = Dimensions.get('window');

const ONBOARDING_STEPS = [
  { id: 1, title: "Identity", subtitle: "Help us personalize your experience", icon: UserIcon, color: "#996515" },
  { id: 2, title: "Academic Context", subtitle: "Tell us about your studies", icon: BookOpen, color: "#6B7A68" },
  { id: 3, title: "Communication", subtitle: "How should we reach you?", icon: MessageSquare, color: "#7B8EA8" },
  { id: 4, title: "Current State", subtitle: "Set your wellbeing baseline", icon: Activity, color: "#A87B7B" },
  { id: 5, title: "Support Level", subtitle: "What's your support circle?", icon: Heart, color: "#A87B95" },
  { id: 6, title: "Safety & Risks", subtitle: "Emergency contact setup", icon: ShieldAlert, color: "#996515" },
  { id: 7, title: "Coping Styles", subtitle: "What helps you through tough times?", icon: Anchor, color: "#7B81A8" },
  { id: 8, title: "Stress Factors", subtitle: "Personal stress indicators", icon: Sparkles, color: "#8E7BA8" },
  { id: 9, title: "Values & Faith", subtitle: "What drives and inspires you?", icon: Target, color: "#A88E7B" },
  { id: 10, title: "Wellness Goals", subtitle: "Your primary health objectives", icon: Target, color: "#6B7A68" },
  { id: 11, title: "Tracking Preference", subtitle: "Your data collection choices", icon: Activity, color: "#7B8EA8" },
  { id: 12, title: "Privacy & Consent", subtitle: "Final steps to proceed", icon: Lock, color: "#475569" }
];

const MOOD_OPTIONS = [
  { label: "Struggling", value: 1, emoji: "😢" },
  { label: "Not good", value: 2, emoji: "😟" },
  { label: "Okay", value: 3, emoji: "😐" },
  { label: "Good", value: 4, emoji: "🙂" },
  { label: "Great", value: 5, emoji: "😊" }
];

const CONCERN_OPTIONS = [
  { label: "Academic stress", value: "academic_stress" },
  { label: "Anxiety", value: "anxiety" },
  { label: "Depression", value: "depression" },
  { label: "Loneliness", value: "loneliness" },
  { label: "Relationships", value: "relationship_issues" },
  { label: "Financial stress", value: "financial_stress" },
  { label: "Family pressure", value: "family_pressure" },
  { label: "Other", value: "other" }
];

const COPING_OPTIONS = [
  { label: "Talk to someone", value: "talk" },
  { label: "Write/journal", value: "journal" },
  { label: "Exercise", value: "exercise" },
  { label: "Music", value: "music" },
  { label: "Pray/meditate", value: "pray" },
  { label: "Other", value: "other" }
];

const GOAL_OPTIONS = [
  { label: "Improve mood", value: "IMPROVE_MOOD" },
  { label: "Reduce stress", value: "REDUCE_STRESS" },
  { label: "Build resilience", value: "BUILD_RESILIENCE" },
  { label: "Better academics", value: "IMPROVE_ACADEMICS" },
  { label: "Better sleep", value: "BETTER_SLEEP" },
  { label: "Healthy habits", value: "DEVELOP_HABITS" }
];

export default function Onboarding() {
  const { user, updateOnboarding } = useAuthContext();
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    displayName: user?.displayName || '',
    bio: '',
    academicLevel: user?.academicLevel?.toString() || '',
    program: user?.program || '',
    language: 'english',
    notificationPreference: 'daily',
    preferredCheckInTime: 'morning',
    baseline: { mood: 3 },
    concerns: [],
    supportLevel: 'somewhat',
    emergencyContactName: '',
    emergencyContactPhone: '',
    copingStyles: [],
    stressors: { academic: 5, social: 5, financial: 5 },
    faithLevel: 'somewhat_important',
    approachPreference: 'holistic',
    goals: [],
    trackingPreferences: { mood: true, sleep: true, academic: true },
    consentGranted: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const animationProgress = useSharedValue(0);

  useEffect(() => {
    animationProgress.value = withTiming(currentStep / ONBOARDING_STEPS.length, { duration: 500 });
  }, [currentStep]);

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const stepColor = ONBOARDING_STEPS[currentStep - 1]?.color || '#fbbf24';
    return { backgroundColor: stepColor };
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
    if (!formData.consentGranted) {
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
    switch (currentStep) {
      case 1: // Identity
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>What should we call you?</Text>
            <TextInput
              style={styles.input}
              value={formData.displayName}
              onChangeText={(text) => setFormData({...formData, displayName: text})}
              placeholder="Display Name"
            />
            <Text style={[styles.label, {marginTop: 20}]}>A short bio (optional)</Text>
            <TextInput
              style={styles.textArea}
              value={formData.bio}
              onChangeText={(text) => setFormData({...formData, bio: text})}
              placeholder="Tell us a bit about yourself..."
              multiline
            />
          </View>
        );
      case 2: // Academic Context
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Academic Level</Text>
            <View style={styles.chipGrid}>
              {['100', '200', '300', '400', '500', '600'].map(level => (
                <TouchableOpacity 
                  key={level}
                  style={[styles.chip, formData.academicLevel === level && styles.chipActive]}
                  onPress={() => setFormData({...formData, academicLevel: level})}
                >
                  <Text style={[styles.chipText, formData.academicLevel === level && styles.chipTextActive]}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.label, {marginTop: 20}]}>Program of Study</Text>
            <TextInput
              style={styles.input}
              value={formData.program}
              onChangeText={(text) => setFormData({...formData, program: text})}
              placeholder="e.g. Computer Science"
            />
          </View>
        );
      case 3: // Communication
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Language</Text>
            <View style={styles.chipGrid}>
              {['English', 'Twi', 'Ga', 'Ewe'].map(lang => (
                <TouchableOpacity 
                  key={lang}
                  style={[styles.chip, formData.language === lang.toLowerCase() && styles.chipActive]}
                  onPress={() => setFormData({...formData, language: lang.toLowerCase()})}
                >
                  <Text style={[styles.chipText, formData.language === lang.toLowerCase() && styles.chipTextActive]}>{lang}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.label, {marginTop: 20}]}>Check-in Frequency</Text>
            {['daily', 'weekly', 'only_when_needed'].map(freq => (
              <OnboardingOption 
                key={freq}
                label={freq.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                selected={formData.notificationPreference === freq}
                onSelect={() => setFormData({...formData, notificationPreference: freq})}
              />
            ))}
          </View>
        );
      case 4: // Current State
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>How are you feeling right now?</Text>
            <OnboardingScale 
              options={MOOD_OPTIONS}
              selectedValue={formData.baseline.mood}
              onSelect={(val) => setFormData({...formData, baseline: {...formData.baseline, mood: val}})}
              activeColor="#f87171"
            />
            <Text style={[styles.label, {marginTop: 20}]}>Primary Concerns</Text>
            <OnboardingMultiSelect 
              options={CONCERN_OPTIONS}
              selectedValues={formData.concerns}
              onToggle={(val) => {
                const current = formData.concerns;
                setFormData({...formData, concerns: current.includes(val) ? current.filter((c: any) => c !== val) : [...current, val]});
              }}
            />
          </View>
        );
      case 5: // Support Level
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Current Support Level</Text>
            <OnboardingScale 
              options={[
                { label: "Alone", value: "alone", emoji: "😟" },
                { label: "Somewhat", value: "somewhat", emoji: "😐" },
                { label: "Strong", value: "strong", emoji: "😊" }
              ]}
              selectedValue={formData.supportLevel}
              onSelect={(val) => setFormData({...formData, supportLevel: val})}
              activeColor="#f472b6"
            />
          </View>
        );
      case 6: // Safety
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Emergency Contact Name</Text>
            <TextInput
              style={styles.input}
              value={formData.emergencyContactName}
              onChangeText={(text) => setFormData({...formData, emergencyContactName: text})}
              placeholder="Name"
            />
            <Text style={[styles.label, {marginTop: 20}]}>Emergency Contact Phone</Text>
            <TextInput
              style={styles.input}
              value={formData.emergencyContactPhone}
              onChangeText={(text) => setFormData({...formData, emergencyContactPhone: text})}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
          </View>
        );
      case 7: // Coping Styles
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Helpful Coping Styles</Text>
            <OnboardingMultiSelect 
              options={COPING_OPTIONS}
              selectedValues={formData.copingStyles}
              onToggle={(val) => {
                const current = formData.copingStyles;
                setFormData({...formData, copingStyles: current.includes(val) ? current.filter((c: any) => c !== val) : [...current, val]});
              }}
            />
          </View>
        );
      case 8: // Stressors
        return (
          <View style={styles.stepContainer}>
            {Object.keys(formData.stressors).map(key => (
              <View key={key} style={{marginBottom: 20}}>
                <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)} Stress (1-10)</Text>
                <OnboardingScale 
                  options={[1,2,3,4,5,6,7,8,9,10].map(v => ({ label: v.toString(), value: v }))}
                  selectedValue={formData.stressors[key]}
                  onSelect={(val) => setFormData({...formData, stressors: {...formData.stressors, [key]: val}})}
                  activeColor="#a78bfa"
                />
              </View>
            ))}
          </View>
        );
      case 9: // Values
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Significance of Faith / Spirituality?</Text>
            <OnboardingScale 
              options={[
                { label: "Not Important", value: "not_important", emoji: "😐" },
                { label: "Somewhat", value: "somewhat_important", emoji: "🙏" },
                { label: "Very Important", value: "very_important", emoji: "✨" }
              ]}
              selectedValue={formData.faithLevel}
              onSelect={(val) => setFormData({...formData, faithLevel: val})}
              activeColor="#fb923c"
            />
            <View style={{marginTop: 30}} />
            <Text style={styles.label}>Preferred Approach</Text>
            {['holistic', 'clinical', 'faith-based'].map(approach => (
              <OnboardingOption 
                key={approach}
                label={approach.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                selected={formData.approachPreference === approach}
                onSelect={() => setFormData({...formData, approachPreference: approach})}
              />
            ))}
          </View>
        );
      case 10: // Goals
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.label}>Select Top 3 Wellness Goals</Text>
            <OnboardingMultiSelect 
              options={GOAL_OPTIONS}
              selectedValues={formData.goals}
              maxSelections={3}
              onToggle={(val) => {
                const current = formData.goals;
                if (current.includes(val)) {
                  setFormData({...formData, goals: current.filter((g: any) => g !== val)});
                } else if (current.length < 3) {
                  setFormData({...formData, goals: [...current, val]});
                }
              }}
            />
          </View>
        );
      case 11: // Tracking
        return (
          <View style={styles.stepContainer}>
            {Object.keys(formData.trackingPreferences).map(key => (
              <View key={key} style={styles.switchRow}>
                <Text style={styles.switchLabel}>Track {key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                <Switch 
                  value={formData.trackingPreferences[key]}
                  onValueChange={(val) => setFormData({...formData, trackingPreferences: {...formData.trackingPreferences, [key]: val}})}
                  trackColor={{ false: "#e5e7eb", true: "#38bdf8" }}
                />
              </View>
            ))}
          </View>
        );
      case 12: // Privacy
        return (
          <View style={styles.stepContainer}>
            <View style={styles.consentCard}>
              <Lock size={32} color="#475569" style={{marginBottom: 16}} />
              <Text style={styles.consentTitle}>Privacy & Consent</Text>
              <Text style={styles.consentBody}>
                MindBridge protects your cognitive data with military-grade encryption. By continuing, you consent to our privacy protocols and student-first data usage.
              </Text>
            </View>
            <TouchableOpacity 
              style={[styles.consentToggle, formData.consentGranted && styles.consentToggleActive]}
              onPress={() => setFormData({...formData, consentGranted: !formData.consentGranted})}
            >
              <CheckCircle2 size={24} color={formData.consentGranted ? "#fff" : "#9ca3af"} />
              <Text style={[styles.consentToggleText, formData.consentGranted && styles.consentToggleTextActive]}>
                I accept the MindBridge terms
              </Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const stepInfo = ONBOARDING_STEPS[currentStep - 1];
  const StepIcon = stepInfo.icon;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Dynamic Background Elements */}
      <View style={[styles.bgCircle, { backgroundColor: stepInfo.color, top: -width * 0.2, left: -width * 0.2 }]} />
      <View style={[styles.bgCircle, { backgroundColor: stepInfo.color, bottom: -width * 0.3, right: -width * 0.2 }]} />

      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View style={styles.header}>
          <View style={styles.iconCircle}>
            <StepIcon size={40} color={stepInfo.color} strokeWidth={2.5} />
          </View>
        </Animated.View>

        <View style={styles.cardWrapper}>
          <BlurView intensity={80} tint="light" style={styles.cardBlur}>
            <View style={styles.card}>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${(currentStep / ONBOARDING_STEPS.length) * 100}%`, backgroundColor: stepInfo.color }]} />
                </View>
                <Text style={styles.progressText}>{currentStep} / 12</Text>
              </View>

              <View style={styles.titleContainer}>
                <Text style={styles.title}>{stepInfo.title}</Text>
                <Text style={styles.subtitle}>{stepInfo.subtitle}</Text>
              </View>

              <View style={styles.content}>{renderStepContent()}</View>

              <View style={styles.footer}>
                {currentStep > 1 && (
                  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <ChevronLeft size={24} color="#6b7280" />
                  </TouchableOpacity>
                )}
                <TouchableOpacity 
                  style={[styles.continueButton, { backgroundColor: stepInfo.color }]} 
                  onPress={handleNext}
                  disabled={isLoading}
                >
                  {isLoading ? <ActivityIndicator color="#fff" /> : (
                    <>
                      <Text style={styles.continueText}>{currentStep === 12 ? "Enter Dashboard" : "Continue"}</Text>
                      <ChevronRight size={18} color="#fff" />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAF8' 
  },
  bgCircle: {
    position: 'absolute',
    width: width * 1.5,
    height: width * 1.5,
    borderRadius: width * 0.75,
    opacity: 0.03,
  },
  header: { 
    height: height * 0.2, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingTop: 40 
  },
  iconCircle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#fff', 
    justifyContent: 'center', 
    alignItems: 'center', 
    shadowOpacity: 0.05, 
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.02)',
  },
  cardWrapper: { 
    flex: 1, 
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  cardBlur: {
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  card: { 
    padding: 28,
    minHeight: height * 0.65,
  },
  progressContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 24 
  },
  progressBar: { 
    flex: 1, 
    height: 4, 
    backgroundColor: 'rgba(0,0,0,0.03)', 
    borderRadius: 2, 
    marginRight: 12, 
    overflow: 'hidden' 
  },
  progressFill: { height: '100%', borderRadius: 2 },
  progressText: { fontSize: 11, fontWeight: '700', color: 'rgba(0,0,0,0.3)', letterSpacing: 1 },
  titleContainer: {
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#2D3436', marginBottom: 8, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, color: 'rgba(45, 52, 54, 0.5)', lineHeight: 22, fontWeight: '400' },
  content: { flex: 1, marginBottom: 80 },
  stepContainer: { width: '100%' },
  label: { fontSize: 13, fontWeight: '800', color: '#2D3436', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1, opacity: 0.6 },
  input: { height: 56, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 16, paddingHorizontal: 20, fontSize: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', color: '#2D3436' },
  textArea: { height: 120, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 16, padding: 20, fontSize: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', textAlignVertical: 'top', color: '#2D3436' },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 16, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.05)', backgroundColor: 'transparent' },
  chipActive: { backgroundColor: '#996515', borderColor: '#996515' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#2D3436' },
  chipTextActive: { color: '#fff' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.03)' },
  switchLabel: { fontSize: 16, fontWeight: '600', color: '#2D3436' },
  consentCard: { padding: 32, backgroundColor: 'rgba(153, 101, 21, 0.03)', borderRadius: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(153, 101, 21, 0.1)' },
  consentTitle: { fontSize: 20, fontWeight: '900', color: '#2D3436', marginBottom: 12 },
  consentBody: { fontSize: 14, color: 'rgba(45, 52, 54, 0.6)', textAlign: 'center', lineHeight: 22 },
  consentToggle: { flexDirection: 'row', alignItems: 'center', padding: 22, borderRadius: 20, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.05)', gap: 12, backgroundColor: '#fff' },
  consentToggleActive: { borderColor: '#996515', backgroundColor: 'rgba(153, 101, 21, 0.02)' },
  consentToggleText: { fontSize: 15, fontWeight: '700', color: 'rgba(0,0,0,0.2)' },
  consentToggleTextActive: { color: '#996515' },
  footer: { position: 'absolute', bottom: 24, left: 28, right: 28, flexDirection: 'row', gap: 12, paddingTop: 20 },
  backButton: { width: 56, height: 56, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
  continueButton: { flex: 1, height: 56, borderRadius: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, shadowColor: '#996515', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 5 },
  continueText: { color: '#fff', fontSize: 16, fontWeight: '800', letterSpacing: 0.5 },
});
