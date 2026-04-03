import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { BrainCircuit, Sparkles, Quote } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 48;

const MOTIVATIONS = [
  {
    category: 'Resilience',
    text: "Your journey isn't defined by the setbacks, but by the courage to rise each day.",
    icon: BrainCircuit,
    color: '#3B82F6',
  },
  {
    category: 'Mindfulness',
    text: "Peace begins the moment you choose not to allow another person or event to control your emotions.",
    icon: Sparkles,
    color: '#8B5CF6',
  },
  {
    category: 'Growth',
    text: "Small steps in the right direction can lead to the biggest changes in your life.",
    icon: Quote,
    color: '#10B981',
  },
];

export const MotivationsCarousel = () => {
  const { colors, isDark } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {MOTIVATIONS.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <BlurView
              intensity={isDark ? 40 : 80}
              tint={isDark ? 'dark' : 'light'}
              style={[styles.card, { borderColor: item.color + '40', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)' }]}
            >
              <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <Text style={[styles.category, { color: item.color }]}>
                  {item.category}
                </Text>
              </View>
              <Text style={[styles.text, { color: colors.text }]}>
                {item.text}
              </Text>
              <View style={styles.footer}>
                <Text style={[styles.footerText, { color: colors.textSecondary }]}>
                  A curated space for your resilience
                </Text>
              </View>
            </BlurView>
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {MOTIVATIONS.map((_, i) => (
          <View 
            key={i} 
            style={[
              styles.dot, 
              { backgroundColor: i === 0 ? colors.primary : colors.border }
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: CAROUSEL_WIDTH,
    paddingRight: 16,
  },
  card: {
    height: '100%',
    borderRadius: 32,
    padding: 24,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    flex: 1,
  },
  footer: {
    marginTop: 8,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    opacity: 0.6,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
