import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { BrainCircuit, Sparkles, Quote } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CAROUSEL_WIDTH = width - 48;

const MOTIVATIONS = [
  {
    category: 'Resilience',
    text: "Your journey isn't defined by the setbacks, but by the courage to rise each day.",
    author: "Dan Millman",
    icon: BrainCircuit,
    color: '#3B82F6',
  },
  {
    category: 'Mindfulness',
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dalai Lama",
    icon: Sparkles,
    color: '#8B5CF6',
  },
  {
    category: 'Growth',
    text: "Small steps in the right direction can lead to the biggest changes in your life.",
    author: "Theodore Roosevelt",
    icon: Quote,
    color: '#10B981',
  },
  {
    category: 'Perspective',
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein",
    icon: BrainCircuit,
    color: '#F59E0B',
  },
  {
    category: 'Action',
    text: "Act as if what you do makes a difference. It does.",
    author: "William James",
    icon: Quote,
    color: '#3B82F6',
  }
];

export const MotivationsCarousel = () => {
  const { colors, isDark } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % MOTIVATIONS.length;
      setActiveIndex(nextIndex);
      scrollViewRef.current?.scrollTo({ x: nextIndex * CAROUSEL_WIDTH, animated: true });
    }, 10000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / CAROUSEL_WIDTH);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Growth Reflections</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {MOTIVATIONS.map((item, index) => (
          <View key={index} style={styles.cardContainer}>
            <BlurView
              intensity={isDark ? 40 : 80}
              tint={isDark ? 'dark' : 'light'}
              style={[
                styles.card, 
                { 
                  borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                  backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)' 
                }
              ]}
            >
              <View style={styles.contentWrapper}>
                <View style={styles.header}>
                  <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                    <item.icon size={20} color={item.color} />
                  </View>
                  <Text style={[styles.category, { color: item.color }]}>
                    {item.category}
                  </Text>
                </View>
                <Text style={[styles.text, { color: colors.text }]} numberOfLines={3}>
                  "{item.text}"
                </Text>
                <View style={styles.footer}>
                  <Text style={[styles.author, { color: colors.textSecondary }]}>
                    — {item.author}
                  </Text>
                  <Quote size={28} color={isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'} />
                </View>
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
              { 
                backgroundColor: i === activeIndex ? colors.primary : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                width: i === activeIndex ? 20 : 6,
              }
            ]} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  cardContainer: {
    width: CAROUSEL_WIDTH,
    paddingRight: 16,
  },
  card: {
    height: 200,
    borderRadius: 32,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  contentWrapper: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  category: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  text: {
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 16,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
});
