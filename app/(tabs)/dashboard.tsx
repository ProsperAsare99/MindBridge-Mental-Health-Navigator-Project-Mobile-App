import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/hooks/useAuth';
import { useTheme } from '../../src/context/ThemeContext';
import { 
  Zap, 
  HeartPulse, 
  TrendingUp, 
  Activity, 
  ShieldAlert, 
  Sparkles,
  Bell,
  Search,
  ArrowUpRight
} from 'lucide-react-native';
import { StatCard } from '../../src/components/dashboard/StatCard';
import { RecommendationCard } from '../../src/components/dashboard/RecommendationCard';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { user } = useAuth();
  const { colors, isDark } = useTheme();

  const handleQuickLog = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Navigation to Assessment/Mood Logger
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.textSecondary }]}>
              Good Morning,
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {user?.name?.split(' ')[0] || 'Explorer'}
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

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard 
            title="Streak" 
            value="5 Days" 
            icon={Zap} 
            trend="+2" 
            trendUp={true} 
            color="#F59E0B"
          />
          <StatCard 
            title="Avg Mood" 
            value="Balanced" 
            icon={Activity} 
            trend="Stable" 
            trendUp={true}
            color="#10B981"
          />
        </View>

        {/* Analytics Preview Placeholder */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Weekly Trajectory</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAll, { color: colors.primary }]}>Analysis</Text>
          </TouchableOpacity>
        </View>
        
        <View style={[styles.chartPlaceholder, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TrendingUp size={48} color={colors.primary + '40'} strokeWidth={1} />
          <Text style={[styles.placeholderText, { color: colors.textSecondary }]}>
            Log more moods to see your wellness path
          </Text>
        </View>

        {/* Personalized Recommendations */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>For Your Resilience</Text>
        </View>

        <RecommendationCard 
          title="Growth Reflection" 
          description="A curated space for your resilience. Explore mindfulness techniques tailored to your current mood."
          icon={Sparkles}
          tag="Mindfulness"
        />

        <RecommendationCard 
          title="University Support" 
          description="Access Ghanaian campus-specific counseling and wellness workshops."
          icon={Activity}
          tag="Resources"
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
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    fontWeight: '600',
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
    marginHorizontal: 16,
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
    fontWeight: '500',
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  viewAll: {
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  chartPlaceholder: {
    marginHorizontal: 16,
    height: 180,
    borderRadius: 28,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  placeholderText: {
    fontSize: 13,
    fontWeight: '600',
    width: '60%',
    textAlign: 'center',
    lineHeight: 18,
  },
  crisisCard: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 28,
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
