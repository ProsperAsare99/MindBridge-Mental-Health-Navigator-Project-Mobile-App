import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Flame, Star, Trophy, Target } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const WellnessJourney = () => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(600).duration(800)}
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
            <Text style={[styles.title, { color: colors.text }]}>Wellness Journey</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>YOUR PERSONAL GROWTH TRACK</Text>
          </View>
          <View style={[styles.levelBadge, { backgroundColor: colors.primary + '20' }]}>
            <Star size={14} color={colors.primary} />
            <Text style={[styles.levelText, { color: colors.primary }]}>LEVEL 5</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Flame size={24} color="#F59E0B" />
            <Text style={[styles.statValue, { color: colors.text }]}>7 Days</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>STREAK</Text>
          </View>
          <View style={styles.statSeparator} />
          <View style={styles.statItem}>
            <Trophy size={24} color="#10B981" />
            <Text style={[styles.statValue, { color: colors.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>ACHIEVEMENTS</Text>
          </View>
          <View style={styles.statSeparator} />
          <View style={styles.statItem}>
            <Target size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.text }]}>85%</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>COMPLETE</Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarBackground, { backgroundColor: colors.textSecondary + '20' }]}>
            <View style={[styles.progressBarFill, { backgroundColor: colors.primary, width: '65%' }]} />
          </View>
          <View style={styles.progressLabelRow}>
            <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>650 / 1000 Resilience Points</Text>
            <Text style={[styles.progressLabel, { color: colors.primary }]}>Next Level</Text>
          </View>
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
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '900',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statSeparator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  progressBarContainer: {
    gap: 8,
  },
  progressBarBackground: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
});
