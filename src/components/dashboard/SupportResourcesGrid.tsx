import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Phone, Users, ShieldCheck, HeartPulse, ArrowUpRight } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

const RESOURCES = [
  { title: 'Counseling Center', type: 'University', icon: Users, color: '#3B82F6' },
  { title: 'Wellness Workshops', type: 'Weekly', icon: HeartPulse, color: '#10B981' },
  { title: 'Privacy Shield', type: 'Secure', icon: ShieldCheck, color: '#8B5CF6' },
  { title: '24/7 Helpline', type: 'Instant', icon: Phone, color: '#EF4444' },
];

export const SupportResourcesGrid = () => {
  const { colors, isDark } = useTheme();

  return (
    <Animated.View 
      entering={FadeInUp.delay(800).duration(800)}
      style={styles.container}
    >
      <View style={styles.headerRow}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Support Resources</Text>
        <TouchableOpacity style={styles.viewAllRow}>
          <Text style={[styles.viewAllText, { color: colors.primary }]}>EXPLORE ALL</Text>
          <ArrowUpRight size={14} color={colors.primary} strokeWidth={3} />
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {RESOURCES.map((item, index) => (
          <TouchableOpacity key={item.title} style={styles.gridItemContainer}>
            <BlurView
              intensity={isDark ? 40 : 80}
              tint={isDark ? 'dark' : 'light'}
              style={[
                styles.gridItem,
                {
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
                }
              ]}
            >
              <View style={[styles.iconBox, { backgroundColor: item.color + '15' }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <View style={styles.infoBox}>
                <Text style={[styles.itemType, { color: colors.textSecondary }]}>{item.type.toUpperCase()}</Text>
                <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  viewAllRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  gridItemContainer: {
    width: '47.5%', // Slightly less than 50% to account for gap
  },
  gridItem: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1.5,
    overflow: 'hidden',
    height: 120,
    justifyContent: 'space-between',
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    gap: 2,
  },
  itemType: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 1,
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
});
