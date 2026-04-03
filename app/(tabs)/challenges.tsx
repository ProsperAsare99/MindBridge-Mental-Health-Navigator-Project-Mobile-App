import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    Trophy, 
    Target, 
    Zap, 
    ChevronRight, 
    Plus, 
    Flame, 
    Star,
    Award,
    Users,
    Clock,
    ChevronLeft
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    FadeInRight,
    Layout,
    useAnimatedStyle,
    withSpring,
    useSharedValue
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import wellnessService, { GamificationStats } from '../../src/services/wellnessService';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Challenge {
    id: string;
    title: string;
    description: string;
    category: string;
    participants: number;
    duration: string;
    xpReward: number;
    progress?: number;
    isActive?: boolean;
}

const DUMMY_CHALLENGES: Challenge[] = [
    { id: '1', title: 'Gratitude Journey', description: 'Log 3 daily wins for 7 consecutive days.', category: 'MINDFULNESS', participants: 1240, duration: '7 DAYS', xpReward: 500, progress: 65, isActive: true },
    { id: '2', title: 'Social Weaver', description: 'Share 2 supportive comments in any circle.', category: 'SOCIAL', participants: 850, duration: '3 DAYS', xpReward: 200, progress: 0, isActive: false },
    { id: '3', title: 'Zen Master', description: 'Complete 10 cycles of 4-7-8 breathing.', category: 'WELLNESS', participants: 2100, duration: '5 DAYS', xpReward: 350, progress: 20, isActive: true }
];

export default function ChallengesScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [stats, setStats] = useState<GamificationStats | null>(null);
    const [challenges, setChallenges] = useState<Challenge[]>(DUMMY_CHALLENGES);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await wellnessService.getStats();
            setStats(data);
            // In a real app, we'd fetch actual challenges too
        } catch (error) {
            console.error('Failed to fetch challenges data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Loading your growth path...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Growth <Text style={styles.italic}>Journeys.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>COLLECTIVE & PERSONAL MILESTONES</Text>
                    </View>
                </View>

                {/* Streak Banner */}
                <Animated.View entering={FadeInUp.delay(200)}>
                    <LinearGradient
                        colors={['#6366F1', '#A855F7']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.streakBanner}
                    >
                        <View style={styles.streakInfo}>
                            <Flame size={32} color="#FFF" />
                            <View style={{ marginLeft: 16 }}>
                                <Text style={styles.streakCount}>{stats?.streak || 0} DAY STREAK</Text>
                                <Text style={styles.streakSubtext}>You're in the top 5% this week!</Text>
                            </View>
                        </View>
                        <View style={styles.levelCircle}>
                            <Text style={styles.levelNum}>{stats?.wellnessLevel || 1}</Text>
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Active Challenges */}
                <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                    <Target size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>ACTIVE CHALLENGES</Text>
                </View>

                <Animated.ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.activeScroll}
                    entering={FadeInRight.delay(400)}
                >
                    {challenges.filter(c => c.isActive).map((challenge, i) => (
                        <TouchableOpacity 
                            key={challenge.id} 
                            style={[styles.activeCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <View style={styles.activeHeader}>
                                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '15' }]}>
                                    <Text style={[styles.categoryText, { color: colors.primary }]}>{challenge.category}</Text>
                                </View>
                                <Text style={styles.participantsText}>{challenge.participants} JOINED</Text>
                            </View>
                            <Text style={[styles.challengeTitle, { color: colors.text }]}>{challenge.title}</Text>
                            <View style={styles.progressSection}>
                                <View style={styles.progressBarBg}>
                                    <View style={[styles.progressBarFill, { width: `${challenge.progress}%`, backgroundColor: colors.primary }]} />
                                </View>
                                <Text style={[styles.progressText, { color: colors.textSecondary }]}>{challenge.progress}% COMPLETE</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>

                {/* Challenge Library */}
                <View style={styles.sectionHeader}>
                    <Zap size={16} color="#F59E0B" />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>EXPLORE JOURNEYS</Text>
                </View>

                <View style={styles.libraryGrid}>
                    {challenges.filter(c => !c.isActive).map((challenge, i) => (
                        <Animated.View 
                            key={challenge.id} 
                            entering={FadeInUp.delay(600 + (i * 100))}
                            style={[styles.libraryCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <View style={styles.libraryInfo}>
                                <Text style={[styles.libTitle, { color: colors.text }]}>{challenge.title}</Text>
                                <Text style={[styles.libDesc, { color: colors.textSecondary }]} numberOfLines={2}>{challenge.description}</Text>
                                <View style={styles.libMeta}>
                                    <View style={styles.metaItem}>
                                        <Clock size={12} color={colors.textSecondary} />
                                        <Text style={[styles.metaText, { color: colors.textSecondary }]}>{challenge.duration}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Award size={12} color="#F59E0B" />
                                        <Text style={[styles.metaText, { color: "#F59E0B" }]}>{challenge.xpReward} XP</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.joinBtn, { backgroundColor: colors.primary }]}>
                                <Plus size={20} color="#FFF" />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Milestones */}
                <View style={styles.sectionHeader}>
                    <Star size={16} color="#EC4899" />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>PERSONAL MILESTONES</Text>
                </View>

                <View style={styles.milestonesContainer}>
                    <TouchableOpacity style={[styles.milestoneCard, { backgroundColor: 'rgba(236, 72, 153, 0.05)', borderColor: 'rgba(236, 72, 153, 0.1)' }]}>
                        <Award size={24} color="#EC4899" />
                        <View style={{ flex: 1, marginLeft: 16 }}>
                            <Text style={[styles.milestoneTitle, { color: colors.text }]}>Anonymity Master</Text>
                            <Text style={[styles.milestoneDesc, { color: colors.textSecondary }]}>Shared 5 stories with the community</Text>
                        </View>
                        <ChevronRight size={18} color="#EC4899" />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 100 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24, marginTop: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    italic: { fontStyle: 'italic' },
    tagline: { fontSize: 9, fontWeight: '900', letterSpacing: 2, marginTop: 4, opacity: 0.6 },
    streakBanner: { 
        width: '100%', 
        padding: 24, 
        borderRadius: 32, 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    streakInfo: { flexDirection: 'row', alignItems: 'center' },
    streakCount: { color: '#FFF', fontSize: 22, fontWeight: '900' },
    streakSubtext: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '500' },
    levelCircle: { 
        width: 56, 
        height: 56, 
        borderRadius: 28, 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        justifyContent: 'center', 
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF'
    },
    levelNum: { color: '#FFF', fontSize: 24, fontWeight: '900' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    activeScroll: { paddingBottom: 10, gap: 16, marginBottom: 32 },
    activeCard: { width: 260, padding: 24, borderRadius: 32, borderWidth: 1 },
    activeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    categoryText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    participantsText: { fontSize: 8, fontWeight: '800', opacity: 0.4 },
    challengeTitle: { fontSize: 20, fontWeight: '900', marginBottom: 20 },
    progressSection: { gap: 8 },
    progressBarBg: { height: 8, borderRadius: 4, backgroundColor: 'rgba(0,0,0,0.05)', overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: 4 },
    progressText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    libraryGrid: { gap: 12, marginBottom: 32 },
    libraryCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 28, borderWidth: 1 },
    libraryInfo: { flex: 1, gap: 4 },
    libTitle: { fontSize: 16, fontWeight: '900' },
    libDesc: { fontSize: 12, fontWeight: '500', lineHeight: 18, opacity: 0.6 },
    libMeta: { flexDirection: 'row', gap: 16, marginTop: 8 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    metaText: { fontSize: 9, fontWeight: '800' },
    joinBtn: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    milestonesContainer: { gap: 12 },
    milestoneCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 24, borderWidth: 1 },
    milestoneTitle: { fontSize: 16, fontWeight: '900' },
    milestoneDesc: { fontSize: 12, fontWeight: '500', opacity: 0.6, marginTop: 2 }
});
