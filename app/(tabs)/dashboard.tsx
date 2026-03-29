import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/context/ThemeContext';
import { Sun, Moon, Zap, Heart, Bell } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

export default function Dashboard() {
  const { user } = useAuth();
  const { colors, theme } = useTheme();

  const handleQuickLog = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Future: Open mood logger
  };

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: colors.text }]}>{user?.name || 'Explorer'}</Text>
          </View>
          <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
            <Bell size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Status Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { backgroundColor: colors.primary + '10' }]}>
            <Zap size={24} color={colors.primary} />
            <Text style={[styles.statValue, { color: colors.primary }]}>5 Days</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#FFD70020' }]}>
            <Sun size={24} color="#DAA520" />
            <Text style={[styles.statValue, { color: '#DAA520' }]}>Balanced</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Mood</Text>
          </View>
        </View>

        {/* Mood Reflection Trigger */}
        <TouchableOpacity 
          style={[styles.mainAction, { backgroundColor: colors.card, borderColor: colors.border }]}
          onPress={handleQuickLog}
        >
          <View style={[styles.actionIcon, { backgroundColor: colors.primary }]}>
            <Heart size={28} color="#fff" />
          </View>
          <View style={styles.actionTextContainer}>
            <Text style={[styles.actionTitle, { color: colors.text }]}>How are you feeling?</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary }]}>Check in with your MindBridge</Text>
          </View>
        </TouchableOpacity>

        {/* Activity Section Placeholder */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Daily Navigator</Text>
          <View style={[styles.activityItem, { backgroundColor: colors.card }]}>
            <View style={[styles.itemDot, { backgroundColor: colors.secondary }]} />
            <View>
              <Text style={[styles.itemTitle, { color: colors.text }]}>Morning Reflection</Text>
              <Text style={[styles.itemTime, { color: colors.textSecondary }]}>Available until 11:00 AM</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    gap: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 14,
  },
  mainAction: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    marginBottom: 32,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  actionSubtitle: {
    fontSize: 14,
    marginTop: 2,
  },
  section: {
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 20,
    gap: 16,
  },
  itemDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemTime: {
    fontSize: 13,
  },
});
