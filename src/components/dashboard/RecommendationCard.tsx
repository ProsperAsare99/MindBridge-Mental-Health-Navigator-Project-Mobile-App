import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';
import { LucideIcon, ArrowRight } from 'lucide-react-native';

interface RecommendationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onPress?: () => void;
  tag?: string;
  image?: any;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  onPress, 
  tag, 
  image 
}) => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress} 
      style={styles.container}
    >
      <BlurView
        intensity={isDark ? 40 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.blur,
          { 
            borderColor: colors.border,
          }
        ]}
      >
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
            <Icon size={24} color={colors.primary} />
          </View>
          {tag && (
            <View style={[styles.tagContainer, { backgroundColor: colors.secondary + '20' }]}>
              <Text style={[styles.tag, { color: colors.secondary }]}>{tag}</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text 
            style={[styles.description, { color: colors.textSecondary }]} 
            numberOfLines={2}
          >
            {description}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.action, { color: colors.primary }]}>Explore Now</Text>
          <ArrowRight size={16} color={colors.primary} />
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  blur: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagContainer: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tag: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
