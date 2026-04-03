import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Compass, Users, HeartPulse, BrainCircuit, Activity } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 64) / 2;

const ACTIONS = [
  { 
    title: 'Find Resources', 
    icon: Compass, 
    color: '#3B82F6', 
    subtitle: 'University Support'
  },
  { 
    title: 'Peer Support', 
    icon: Users, 
    color: '#8B5CF6', 
    subtitle: 'Anonymous Hub'
  },
  { 
    title: 'Mood Logger', 
    icon: HeartPulse, 
    color: '#10B981', 
    subtitle: 'Quick Check-in'
  },
  { 
    title: 'Meditation', 
    icon: BrainCircuit, 
    color: '#F59E0B', 
    subtitle: 'Quick Session'
  },
];

export const QuickActionsGrid = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {ACTIONS.map((action, index) => (
          <TouchableOpacity key={index} activeOpacity={0.7} style={styles.item}>
            <BlurView
              intensity={isDark ? 40 : 80}
              tint={isDark ? 'dark' : 'light'}
              style={[styles.card, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)' }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
                <action.icon size={22} color={action.color} />
              </View>
              <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{action.title}</Text>
                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{action.subtitle}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  item: {
    width: ITEM_WIDTH,
  },
  card: {
    padding: 24,
    borderRadius: 32,
    borderWidth: 1.5,
    height: 160,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: 2,
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
