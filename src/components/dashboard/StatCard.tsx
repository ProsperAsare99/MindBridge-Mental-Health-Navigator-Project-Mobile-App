import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';
import { LucideIcon } from 'lucide-react-native';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, trend, trendUp, color }) => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <BlurView
        intensity={isDark ? 40 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.blur,
          { 
            borderColor: colors.border,
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.7)'
          }
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: color || colors.primary + '20' }]}>
            <Icon size={18} color={color || colors.primary} />
          </View>
          {trend && (
            <Text style={[styles.trend, { color: trendUp ? '#10B981' : '#EF4444' }]}>
              {trend}
            </Text>
          )}
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
          <Text style={[styles.title, { color: colors.textSecondary }]}>{title}</Text>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    marginBottom: 16,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  blur: {
    padding: 16,
    height: 140,
    borderWidth: 1,
    borderRadius: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trend: {
    fontSize: 12,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  value: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
