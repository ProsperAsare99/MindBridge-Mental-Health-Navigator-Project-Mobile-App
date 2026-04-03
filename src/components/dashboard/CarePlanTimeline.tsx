import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Circle, CheckCircle2, ChevronRight, Activity } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

const STEPS = [
  { id: '1', title: 'Onboarding', status: 'completed' },
  { id: '2', title: 'First Week', status: 'completed' },
  { id: '3', title: 'Establishing Habits', status: 'active' },
  { id: '4', title: 'Resilience Training', status: 'upcoming' },
  { id: '5', title: 'Emotional Mastery', status: 'upcoming' },
];

export const CarePlanTimeline = () => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(700).duration(800)}
      style={styles.container}
    >
      <BlurView
        intensity={isDark ? 40 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.card,
          {
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
          }
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Care Plan Timeline</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>YOUR RESILIENCE ROADMAP</Text>
          </View>
          <Activity size={18} color={colors.primary} strokeWidth={3} />
        </View>

        <View style={styles.timeline}>
          {STEPS.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.stepMarkerColumn}>
                <View style={[
                  styles.dot, 
                  step.status === 'completed' ? { backgroundColor: colors.primary } : 
                  step.status === 'active' ? { backgroundColor: colors.primary, borderWidth: 4, borderColor: colors.primary + '30' } : 
                  { backgroundColor: colors.textSecondary + '20' }
                ]}>
                  {step.status === 'completed' && <CheckCircle2 size={12} color="#FFF" />}
                </View>
                {index < STEPS.length - 1 && (
                  <View style={[
                    styles.line, 
                    { backgroundColor: step.status === 'completed' ? colors.primary : colors.textSecondary + '20' }
                  ]} />
                )}
              </View>
              <View style={styles.stepContent}>
                <Text style={[
                  styles.stepTitle, 
                  { color: step.status === 'upcoming' ? colors.textSecondary : colors.text },
                  step.status === 'active' && { fontWeight: '900', color: colors.primary }
                ]}>
                  {step.title}
                </Text>
                {step.status === 'active' && (
                  <Text style={[styles.stepStatus, { color: colors.textSecondary }]}>CURRENT PHASE</Text>
                )}
              </View>
              {step.status === 'active' && <ChevronRight size={16} color={colors.primary} />}
            </View>
          ))}
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  card: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  timeline: {
    paddingLeft: 4,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    height: 60,
  },
  stepMarkerColumn: {
    alignItems: 'center',
    width: 20,
    height: '100%',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  line: {
    width: 2,
    flex: 1,
    marginVertical: -2,
  },
  stepContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepStatus: {
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
});
