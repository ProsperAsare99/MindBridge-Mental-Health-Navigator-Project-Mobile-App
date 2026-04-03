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
    User, 
    Trophy, 
    Flame, 
    Sparkles, 
    Calendar, 
    ShieldCheck, 
    ChevronRight, 
    Settings,
    Edit3,
    Award,
    Heart,
    ChevronLeft
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    FadeInDown,
    Layout,
    useAnimatedStyle,
    withSpring,
    useSharedValue
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import userService, { UserProfile } from '../../src/services/userService';
import { useAuthContext } from '../../src/context/AuthContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DUMMY_ACHIEVEMENTS = [
    { id: '1', title: 'Early Adopter', icon: Sparkles, color: '#6366F1' },
    { id: '2', title: '7 Day Streak', icon: Flame, color: '#EF4444' },
    { id: '3', title: 'Life Saver', icon: ShieldCheck, color: '#10B981' },
    { id: '4', title: 'Zen Master', icon: Trophy, color: '#A855F7' }
];

export default function ProfileScreen() {
    const { colors, isDark } = useTheme();
    const { user } = useAuthContext();
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            const data = await userService.getProfile();
            setProfile(data);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            // Fallback for demo
            setProfile({
                id: user?.id || '1',
                username: user?.displayName || user?.name || 'User',
                email: user?.email || '',
                institution: 'MINDBRIDGE UNIVERSITY',
                joinDate: 'MARCH 2026',
                stats: {
                    totalReflections: 42,
                    completedChallenges: 12,
                    supportActions: 8
                }
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading || !profile) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Retrieving identity records...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Custom Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/settings')} style={styles.iconBtn}>
                        <Settings size={22} color={colors.text} />
                    </TouchableOpacity>
                </View>

                {/* Hero Profile */}
                <Animated.View entering={FadeInUp.delay(200)} style={styles.heroSection}>
                    <View style={styles.avatarContainer}>
                        <LinearGradient
                            colors={['#6366F1', '#A855F7']}
                            style={styles.avatarGradient}
                        >
                            <Text style={styles.heroAvatarText}>{(profile.username || user?.displayName || user?.name || 'U')[0]}</Text>
                        </LinearGradient>
                        <TouchableOpacity style={styles.editBadge}>
                            <Edit3 size={12} color="#FFF" />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={[styles.heroName, { color: colors.text }]}>{profile.username.toUpperCase()}</Text>
                    <View style={styles.verifyRow}>
                        <ShieldCheck size={14} color="#10B981" />
                        <Text style={[styles.verifyText, { color: '#10B981' }]}>VERIFIED INSTITUTIONAL IDENTITY</Text>
                    </View>
                    <Text style={[styles.institution, { color: colors.textSecondary }]}>{profile.institution}</Text>
                </Animated.View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Animated.View entering={FadeInUp.delay(400)} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.statVal, { color: colors.text }]}>{profile.stats.totalReflections}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>REFLECTIONS</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInUp.delay(500)} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.statVal, { color: colors.primary }]}>{profile.stats.completedChallenges}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>JOURNEYS</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInUp.delay(600)} style={[styles.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.statVal, { color: '#10B981' }]}>{profile.stats.supportActions}</Text>
                        <Text style={[styles.statLabel, { color: colors.textSecondary }]}>CONTRIB.</Text>
                    </Animated.View>
                </View>

                {/* Achievements */}
                <View style={styles.sectionHeader}>
                    <Award size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>RESILIENCE MILESTONES</Text>
                </View>

                <Animated.ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.achievementsScroll}
                    entering={FadeInDown.delay(800)}
                >
                    {DUMMY_ACHIEVEMENTS.map((ach, i) => {
                        const Icon = ach.icon;
                        return (
                            <View key={ach.id} style={styles.achievementItem}>
                                <View style={[styles.achIconContainer, { backgroundColor: ach.color + '15' }]}>
                                    <Icon size={24} color={ach.color} />
                                </View>
                                <Text style={[styles.achTitle, { color: colors.text }]}>{ach.title}</Text>
                            </View>
                        );
                    })}
                </Animated.ScrollView>

                {/* Recent Activity Mini-List */}
                <View style={[styles.sectionHeader, { marginTop: 32 }]}>
                    <Calendar size={16} color={colors.textSecondary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>JOINED {profile.joinDate}</Text>
                </View>

                <Animated.View entering={FadeInUp.delay(1000)} style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.infoRow}>
                        <View style={styles.infoIconBg}>
                            <Heart size={18} color={colors.primary} />
                        </View>
                        <View style={styles.infoContent}>
                            <Text style={[styles.infoTitle, { color: colors.text }]}>Compassion Index</Text>
                            <Text style={[styles.infoDesc, { color: colors.textSecondary }]}>Your supportive actions are in the top 10%.</Text>
                        </View>
                        <ChevronRight size={18} color={colors.textSecondary} />
                    </View>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 60 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    iconBtn: { width: 44, height: 44, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    heroSection: { alignItems: 'center', marginBottom: 40 },
    avatarContainer: { position: 'relative', marginBottom: 20 },
    avatarGradient: { width: 100, height: 100, borderRadius: 40, justifyContent: 'center', alignItems: 'center' },
    heroAvatarText: { color: '#FFF', fontSize: 48, fontWeight: '900' },
    editBadge: { position: 'absolute', bottom: -5, right: -5, width: 28, height: 28, borderRadius: 14, backgroundColor: '#1A1A1A', justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFF' },
    heroName: { fontSize: 32, fontWeight: '900', letterSpacing: -1.5, marginBottom: 8 },
    verifyRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
    verifyText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    institution: { fontSize: 12, fontWeight: '800', opacity: 0.5 },
    statsGrid: { flexDirection: 'row', gap: 12, marginBottom: 40 },
    statCard: { flex: 1, padding: 20, borderRadius: 28, borderWidth: 1, alignItems: 'center' },
    statVal: { fontSize: 24, fontWeight: '900' },
    statLabel: { fontSize: 8, fontWeight: '900', letterSpacing: 1, marginTop: 4 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    achievementsScroll: { paddingBottom: 20, gap: 16 },
    achievementItem: { alignItems: 'center', gap: 8, width: 90 },
    achIconContainer: { width: 64, height: 64, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    achTitle: { fontSize: 9, fontWeight: '900', textAlign: 'center' },
    infoCard: { padding: 24, borderRadius: 32, borderWidth: 1 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    infoIconBg: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
    infoContent: { flex: 1 },
    infoTitle: { fontSize: 16, fontWeight: '900' },
    infoDesc: { fontSize: 12, fontWeight: '500', opacity: 0.5, marginTop: 2 }
});
