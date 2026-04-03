import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BrainCircuit, Sparkles, TrendingUp, Info } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const MoodInsight = () => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(500).duration(800)}
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
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '20' }]}>
            <BrainCircuit size={20} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Mood Insight</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>AI-DRIVEN PATTERNS</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={[styles.insightText, { color: colors.text }]}>
            Based on your recent logs, your resilience score has increased by 15% this week.
          </Text>
          <View style={styles.tipContainer}>
            <Info size={16} color={colors.primary} />
            <Text style={[styles.tipText, { color: colors.textSecondary }]}>
              Tip: Maintaining your morning meditation helps stabilize your mood throughout the day.
            </Text>
          </View>
        </View>

        <View style={styles.backgroundIcon}>
          <TrendingUp size={120} color={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
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
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  iconContainer: {
    padding: 10,
    borderRadius: 14,
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
  content: {
    gap: 16,
  },
  insightText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  tipContainer: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  tipText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  backgroundIcon: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    zIndex: -1,
  },
});
