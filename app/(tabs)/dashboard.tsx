import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  HeartPulse, 
  ShieldAlert, 
  Bell,
  Search,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { getGreeting } from '../../src/utils/timeUtils';

// New Components
import { MotivationsCarousel } from '../../src/components/dashboard/MotivationsCarousel';
import { ActivityFlowCard } from '../../src/components/dashboard/ActivityFlowCard';
import { DailyWins } from '../../src/components/dashboard/DailyWins';
import { QuickActionsGrid } from '../../src/components/dashboard/QuickActionsGrid';
import { CommunityPulse } from '../../src/components/dashboard/CommunityPulse';
import { StatCard } from '../../src/components/dashboard/StatCard';
import { RecommendationCard } from '../../src/components/dashboard/RecommendationCard';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { user } = useAuth();
  const { colors, isDark } = useTheme();
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleQuickLog = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const firstName = user?.name?.split(' ')[0] || 'Explorer';

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <View style={styles.badgeRow}>
              <ShieldCheck size={12} color={colors.primary} />
              <Text style={[styles.privacyBadge, { color: colors.primary }]}>Privacy-Validated</Text>
            </View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              {greeting},
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {firstName}
            </Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
              <Search size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card }]}>
              <Bell size={20} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Growth Reflections Carousel */}
        <MotivationsCarousel />

        {/* Daily Check-in CTA */}
        <TouchableOpacity 
          activeOpacity={0.9}
          onPress={handleQuickLog}
          style={styles.mainCta}
        >
          <BlurView
            intensity={isDark ? 50 : 80}
            tint={isDark ? 'dark' : 'light'}
            style={[styles.ctaBlur, { borderColor: colors.primary + '30' }]}
          >
            <View style={styles.ctaContent}>
              <View style={[styles.ctaIconContainer, { backgroundColor: colors.primary }]}>
                <HeartPulse size={28} color="#fff" />
              </View>
              <View style={styles.ctaTextContainer}>
                <Text style={[styles.ctaTitle, { color: colors.text }]}>Daily Check-in</Text>
                <Text style={[styles.ctaSubtitle, { color: colors.textSecondary }]}>
                  How is your mind feeling today?
                </Text>
              </View>
              <ArrowUpRight size={20} color={colors.primary} />
            </View>
          </BlurView>
        </TouchableOpacity>

        {/* Activity Flow / Weekly Trajectory */}
        <ActivityFlowCard />

        {/* Section: Wellness Journey */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Wellness Journey</Text>
          <TouchableOpacity style={styles.viewAllBtn}>
            <Text style={[styles.viewAll, { color: colors.primary }]}>Analysis</Text>
            <ChevronRight size={14} color={colors.primary} />
          </TouchableOpacity>
        </View>
        
        <DailyWins />

        {/* Community Pulse */}
        <CommunityPulse />

        {/* Utility Grid */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Actions</Text>
        </View>
        <QuickActionsGrid />

        {/* Personalized Recommendations */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>For Your Resilience</Text>
        </View>

        <RecommendationCard 
          title="Growth Reflection" 
          description="A curated space for your resilience. Explore mindfulness techniques tailored to your current mood."
          icon={HeartPulse}
          tag="Mindfulness"
        />

        {/* Crisis Support - Premium High-Impact Card */}
        <TouchableOpacity style={styles.crisisCard}>
          <View style={[styles.crisisGradient, { backgroundColor: isDark ? '#EF444420' : '#EF4444' }]}>
            <View style={styles.crisisHeader}>
              <ShieldAlert size={24} color={isDark ? '#EF4444' : '#FFF'} />
              <Text style={[styles.crisisTitle, { color: isDark ? '#EF4444' : '#FFF' }]}>
                Crisis Support
              </Text>
            </View>
            <Text style={[styles.crisisDescription, { color: isDark ? '#EF4444CC' : '#FFFFF0' }]}>
              Our support network is available 24/7 if things feel heavy.
            </Text>
            <View style={[styles.crisisButton, { backgroundColor: isDark ? '#EF4444' : '#FFF' }]}>
              <Text style={[styles.crisisButtonText, { color: isDark ? '#FFF' : '#EF4444' }]}>
                Get Help Now
              </Text>
            </View>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  privacyBadge: {
    fontSize: 9,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  userName: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainCta: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaBlur: {
    padding: 20,
    borderWidth: 1.5,
  },
  ctaContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ctaIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  ctaTextContainer: {
    flex: 1,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '800',
  },
  ctaSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAll: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  crisisCard: {
    marginHorizontal: 24,
    marginTop: 8,
    borderRadius: 32,
    overflow: 'hidden',
  },
  crisisGradient: {
    padding: 24,
  },
  crisisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  crisisTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  crisisDescription: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 20,
  },
  crisisButton: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  crisisButtonText: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
