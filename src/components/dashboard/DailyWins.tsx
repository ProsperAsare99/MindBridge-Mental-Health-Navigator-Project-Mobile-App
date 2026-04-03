import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { CheckCircle2, Trophy, Clock, Zap } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const WINS = [
  { 
    title: 'Daily Mood Log', 
    completed: true, 
    icon: CheckCircle2, 
    color: '#10B981',
    time: '2 hours ago'
  },
  { 
    title: 'Mindfulness Practice', 
    completed: false, 
    icon: Clock, 
    color: '#F59E0B',
    time: 'Required'
  },
];

export const DailyWins = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <BlurView
        intensity={isDark ? 40 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[styles.card, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)' }]}
      >
        <View style={styles.header}>
          <View style={[styles.titleIcon, { backgroundColor: '#F59E0B' + '20' }]}>
            <Trophy size={18} color="#F59E0B" />
          </View>
          <Text style={[styles.title, { color: colors.text }]}>Daily Wins</Text>
        </View>

        <View style={styles.list}>
          {WINS.map((win, index) => (
            <View key={index} style={styles.winItem}>
              <View style={[styles.winIcon, { backgroundColor: win.color + '15' }]}>
                <win.icon size={16} color={win.color} />
              </View>
              <View style={styles.winContent}>
                <Text style={[styles.winTitle, { color: colors.text }]}>{win.title}</Text>
                <Text style={[styles.winTime, { color: colors.textSecondary }]}>{win.time}</Text>
              </View>
              {win.completed && (
                <View style={styles.completedBadge}>
                  <Zap size={10} color="#fff" />
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.primary }]}>
            Score: +25 Resilience Points Today
          </Text>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
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
    gap: 10,
    marginBottom: 16,
  },
  titleIcon: {
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  list: {
    gap: 12,
  },
  winItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  winIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  winContent: {
    flex: 1,
  },
  winTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  winTime: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  completedBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  footerText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});
