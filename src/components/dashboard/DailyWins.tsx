import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, Trophy, Star, ShieldCheck } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

const WINS = [
  { id: '1', title: 'Morning Meditation', points: 10, completed: true },
  { id: '2', title: 'Mood Logged', points: 5, completed: true },
  { id: '3', title: 'Community Interaction', points: 15, completed: false },
];

export const DailyWins = () => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(400).duration(800)}
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
            <Text style={[styles.title, { color: colors.text }]}>Daily Wins</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>ACHIEVE YOUR POTENTIAL</Text>
          </View>
          <View style={[styles.pointsBadge, { backgroundColor: colors.primary + '20' }]}>
            <Trophy size={14} color={colors.primary} />
            <Text style={[styles.pointsText, { color: colors.primary }]}>150 PTS</Text>
          </View>
        </View>

        <View style={styles.winsList}>
          {WINS.map((win, index) => (
            <View 
              key={win.id} 
              style={[
                styles.winItem,
                { borderBottomColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                index === WINS.length - 1 && { borderBottomWidth: 0 }
              ]}
            >
              <View style={[styles.checkbox, { backgroundColor: win.completed ? colors.primary : 'transparent', borderColor: win.completed ? colors.primary : colors.textSecondary + '40' }]}>
                {win.completed && <CheckCircle2 size={16} color="#FFF" />}
              </View>
              <View style={styles.winInfo}>
                <Text style={[styles.winTitle, { color: win.completed ? colors.text : colors.textSecondary }]}>{win.title}</Text>
                <View style={styles.pointsRow}>
                  <Star size={10} color={colors.primary} />
                  <Text style={[styles.winPoints, { color: colors.textSecondary }]}>+{win.points} Resilience Points</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.backgroundIcon}>
          <ShieldCheck size={120} color={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
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
    marginBottom: 20,
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
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: '900',
  },
  winsList: {
    gap: 4,
  },
  winItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    borderWidth: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  winInfo: {
    flex: 1,
  },
  winTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  winPoints: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  backgroundIcon: {
    position: 'absolute',
    bottom: -20,
    right: -20,
    zIndex: -1,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
