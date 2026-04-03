import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    ChevronLeft, 
    Droplets, 
    Wind, 
    Sparkles, 
    Trophy, 
    Target,
    ChevronRight,
    Search
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
    FadeInUp, 
    FadeInDown,
    Layout
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import wellnessService, { GamificationStats } from '../../src/services/wellnessService';
import { MoodGarden } from '../../src/components/dashboard/MoodGarden';

const { width } = Dimensions.get('window');

export default function GardenScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [stats, setStats] = useState<GamificationStats | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        try {
            const data = await wellnessService.getStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch garden stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Cultivating your space...</Text>
            </View>
        );
    }

    if (!stats) return null;

    const currentLevel = stats.wellnessLevel || 1;
    const progressXP = stats.wellnessXP || 0;
    const targetXP = Math.pow(currentLevel, 2) * 100;
    const xpPercentage = Math.min(100, (progressXP / targetXP) * 100);

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={[styles.backButton, { borderColor: colors.border }]}>
                        <ChevronLeft size={24} color={colors.primary} />
                    </TouchableOpacity>
                    <View style={styles.headerInfo}>
                        <View style={[styles.levelBadge, { backgroundColor: colors.primary + '10' }]}>
                            <Text style={[styles.levelText, { color: colors.primary }]}>RESILIENCE LEVEL {currentLevel}</Text>
                        </View>
                        <Text style={[styles.title, { color: colors.text }]}>Garden of <Text style={styles.primaryText}>Resilience</Text></Text>
                    </View>
                </Animated.View>

                {/* Quick Stats Grid */}
                <View style={styles.statsRow}>
                    <Animated.View entering={FadeInUp.delay(400)} style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={styles.statLabel}>STREAK</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>{stats.streak} Days</Text>
                    </Animated.View>
                    <Animated.View entering={FadeInUp.delay(500)} style={[styles.statBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={styles.statLabel}>HEALTH</Text>
                        <Text style={[styles.statValue, { color: colors.primary }]}>{stats.garden.healthScore}%</Text>
                    </Animated.View>
                </View>

                {/* Main Garden Area */}
                <Animated.View entering={FadeInUp.delay(600)} style={styles.gardenContainer}>
                    <MoodGarden 
                        level={stats.garden.growthLevel} 
                        health={stats.garden.healthScore} 
                    />
                    
                    {/* Interaction Icons Overlaying the Garden */}
                    <View style={styles.gardenActions}>
                        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.primary }]}>
                            <Droplets size={20} color="#FFF" />
                            <Text style={styles.actionButtonText}>TEND GARDEN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => router.push('/(tabs)/zen')}
                            style={[styles.actionButtonOutline, { borderColor: colors.border, backgroundColor: colors.card }]}
                        >
                            <Wind size={20} color={colors.text} />
                            <Text style={[styles.actionButtonOutlineText, { color: colors.text }]}>ZEN MODE</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                {/* Evolution Card */}
                <Animated.View entering={FadeInUp.delay(800)} style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <View style={styles.cardHeader}>
                        <Trophy size={18} color={colors.primary} />
                        <Text style={[styles.cardTitle, { color: colors.text }]}>STAGE EVOLUTION</Text>
                    </View>
                    <View style={styles.xpRow}>
                        <Text style={[styles.xpLevel, { color: colors.primary }]}>LEVEL {currentLevel}</Text>
                        <Text style={[styles.xpCount, { color: colors.textSecondary }]}>{progressXP} / {targetXP} XP</Text>
                    </View>
                    <View style={[styles.xpBarBg, { backgroundColor: colors.border }]}>
                        <View style={[styles.xpBarFill, { width: `${xpPercentage}%`, backgroundColor: colors.primary }]} />
                    </View>
                    <Text style={styles.xpRemaining}>{targetXP - progressXP} XP remaining to next stage</Text>
                </Animated.View>

                {/* Active Challenge Card */}
                <Animated.View entering={FadeInUp.delay(1000)} style={[styles.infoCard, styles.amberCard]}>
                    <View style={styles.cardHeader}>
                        <Target size={18} color="#D97706" />
                        <Text style={[styles.cardTitle, { color: '#92400E' }]}>ACTIVE TRACK</Text>
                    </View>
                    <Text style={[styles.challengeName, { color: colors.text }]}>Gratitude Journey</Text>
                    <Text style={[styles.challengeDesc, { color: colors.textSecondary }]}>
                        Stick with your reflections to unlock the 'Baobab' seed.
                    </Text>
                    <TouchableOpacity onPress={() => router.push('/(tabs)/challenges')} style={styles.challengeLink}>
                        <Text style={styles.challengeLinkText}>CHALLENGES LIBRARY</Text>
                        <ChevronRight size={14} color="#D97706" />
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 100 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32, marginTop: 10 },
    backButton: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    headerInfo: { flex: 1 },
    levelBadge: { alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, marginBottom: 4 },
    levelText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    primaryText: { color: '#6366F1' },
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    statBox: { flex: 1, padding: 16, borderRadius: 24, borderWidth: 1, alignItems: 'center' },
    statLabel: { fontSize: 9, fontWeight: '900', color: 'rgba(0,0,0,0.3)', letterSpacing: 1.5, marginBottom: 4 },
    statValue: { fontSize: 20, fontWeight: '900' },
    gardenContainer: { marginBottom: 32, alignItems: 'center' },
    gardenActions: { 
        flexDirection: 'row', 
        gap: 12, 
        marginTop: -40, // Position actions over the bottom of the card
        paddingBottom: 20
    },
    actionButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 14, 
        borderRadius: 24, 
        gap: 8,
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10
    },
    actionButtonText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    actionButtonOutline: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
        paddingVertical: 14, 
        borderRadius: 24, 
        gap: 8, 
        borderWidth: 1 
    },
    actionButtonOutlineText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    infoCard: { padding: 24, borderRadius: 32, borderWidth: 1, marginBottom: 16 },
    amberCard: { backgroundColor: 'rgba(251, 191, 36, 0.05)', borderColor: 'rgba(251, 191, 36, 0.2)' },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 },
    cardTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    xpRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 8 },
    xpLevel: { fontSize: 12, fontWeight: '900' },
    xpCount: { fontSize: 10, fontWeight: '700' },
    xpBarBg: { height: 8, borderRadius: 4, overflow: 'hidden' },
    xpBarFill: { height: '100%', borderRadius: 4 },
    xpRemaining: { fontSize: 9, fontWeight: '700', color: 'rgba(0,0,0,0.3)', textAlign: 'center', marginTop: 10 },
    challengeName: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
    challengeDesc: { fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 16 },
    challengeLink: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start' },
    challengeLinkText: { fontSize: 10, fontWeight: '900', color: '#D97706', letterSpacing: 1 }
});
