import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Compass, Sparkles, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

interface DailyPerspectiveProps {
  moodStats?: {
    average: number;
    count: number;
    streak: number;
  };
}

export const DailyPerspective = ({ moodStats }: DailyPerspectiveProps) => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(300).duration(800)}
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
          <Compass size={24} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>Daily Perspective</Text>
        </View>

        <View style={styles.content}>
          <Text style={[styles.mainText, { color: colors.text }]}>
            You've maintained a <Text style={{ color: colors.primary }}>{moodStats?.streak || 3} day streak</Text> of mindfulness. 
            Your resilience is building steadily.
          </Text>
          
          <View style={styles.insightBox}>
            <Sparkles size={16} color={colors.primary} />
            <Text style={[styles.insightText, { color: colors.textSecondary }]}>
              Typically, your mood peaks on Tuesday mornings after your meditation session.
            </Text>
          </View>
        </View>

        <View style={styles.backgroundIcon}>
          <TrendingUp size={140} color={isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'} />
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
    minHeight: 200,
    justifyContent: 'center',
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
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  content: {
    gap: 16,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
  },
  insightBox: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: 'rgba(0,0,0,0.03)',
    padding: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  insightText: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  backgroundIcon: {
    position: 'absolute',
    bottom: -30,
    right: -30,
    zIndex: -1,
  },
});
