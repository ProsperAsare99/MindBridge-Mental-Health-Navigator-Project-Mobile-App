import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  HeartPulse, 
  ShieldCheck, 
  Bell, 
  User, 
  Zap,
} from 'lucide-react-native';
import { useTheme } from '../../src/context/ThemeContext';
import { useAuth } from '../../src/hooks/useAuth';
import { getGreeting } from '../../src/utils/timeUtils';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

// Components
import { MotivationsCarousel } from '../../src/components/dashboard/MotivationsCarousel';
import { ActivityFlowCard } from '../../src/components/dashboard/ActivityFlowCard';
import { DailyWins } from '../../src/components/dashboard/DailyWins';
import { QuickActionsGrid } from '../../src/components/dashboard/QuickActionsGrid';
import { CommunityPulse } from '../../src/components/dashboard/CommunityPulse';
import { DailyPerspective } from '../../src/components/dashboard/DailyPerspective';
import { MoodInsight } from '../../src/components/dashboard/MoodInsight';
import { WellnessJourney } from '../../src/components/dashboard/WellnessJourney';
import { CarePlanTimeline } from '../../src/components/dashboard/CarePlanTimeline';
import { SupportResourcesGrid } from '../../src/components/dashboard/SupportResourcesGrid';
import { MoodGarden } from '../../src/components/dashboard/MoodGarden';
import wellnessService, { GamificationStats } from '../../src/services/wellnessService';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const [greeting, setGreeting] = useState(getGreeting());
  const [stats, setStats] = useState<GamificationStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(true);

  const fetchStats = async () => {
    try {
      const data = await wellnessService.getStats();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch gamification stats:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'Guest';

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <Animated.View 
          entering={FadeInDown.duration(800)}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greetingText, { color: colors.textSecondary }]}>
                {greeting},
              </Text>
              <Text style={[styles.userName, { color: colors.text }]}>
                {firstName}
              </Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <Bell size={20} color={colors.text} />
              </TouchableOpacity>
              <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}>
                <User size={20} color={colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerStatusRow}>
            <View style={styles.privacyBadge}>
              <ShieldCheck size={10} color={colors.primary} />
              <Text style={[styles.privacyText, { color: colors.textSecondary }]}>PRIVACY-VALIDATED</Text>
            </View>
            <TouchableOpacity style={[styles.checkInButton, { backgroundColor: colors.primary }]}>
              <HeartPulse size={16} color="#FFF" strokeWidth={3} />
              <Text style={styles.checkInButtonText}>DAILY CHECK-IN</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Growth Reflections Carousel */}
        <MotivationsCarousel />

        {/* Daily Perspective & AI Insights */}
        <DailyPerspective moodStats={{ streak: stats?.streak || 0, average: 4.5, count: 12 }} />
        <MoodInsight />

        {/* The Mood Garden - Central Visual Hook */}
        <MoodGarden 
          level={stats?.garden.growthLevel || 1} 
          health={stats?.garden.healthScore || 100} 
          loading={loadingStats}
          artifacts={['GARDEN_ARTIFACT_LANTERN']} // Example artifact
        />

        {/* Analytics & Activity Flow */}
        <ActivityFlowCard />

        {/* Daily Wins & Streaks */}
        <DailyWins />
        <WellnessJourney />

        {/* Community Pulse */}
        <CommunityPulse />

        {/* Care Plan & Roadmap */}
        <CarePlanTimeline />

        {/* Quick Actions Grid */}
        <QuickActionsGrid />

        {/* University Support Resources */}
        <SupportResourcesGrid />

        {/* Crisis Support - High Impact Card */}
        <Animated.View entering={FadeInUp.delay(900).duration(800)} style={styles.crisisSection}>
          <BlurView
            intensity={40}
            tint="dark"
            style={styles.crisisCard}
          >
            <View style={styles.crisisContent}>
              <View style={styles.crisisHeader}>
                <Zap size={24} color="#EF4444" fill="#EF4444" />
                <Text style={styles.crisisTitle}>Crisis Support</Text>
              </View>
              <Text style={styles.crisisDescription}>
                Our Ghanaian support network is available 24/7 if things feel heavy.
              </Text>
              <TouchableOpacity style={styles.crisisButton}>
                <Text style={styles.crisisButtonText}>GET SUPPORT NOW</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>

        <View style={styles.footerSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 20,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  userName: {
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2,
    lineHeight: 48,
    marginTop: -4,
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
    borderWidth: 1,
  },
  headerStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  privacyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0,0,0,0.03)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  privacyText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  checkInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkInButtonText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1,
  },
  crisisSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  crisisCard: {
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  crisisContent: {
    padding: 24,
    gap: 16,
  },
  crisisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  crisisTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1,
  },
  crisisDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  crisisButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  crisisButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1,
  },
  footerSpacer: {
    height: 40,
  },
});

export default DashboardScreen;
