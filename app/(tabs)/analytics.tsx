import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    Dimensions, 
    TouchableOpacity, 
    ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    BarChart2, 
    TrendingUp, 
    Brain, 
    Zap, 
    Users, 
    Target, 
    ShieldCheck, 
    Calendar,
    ChevronLeft,
    Share2,
    Info
} from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
    FadeInUp, 
    FadeInRight, 
    Layout, 
    useAnimatedStyle, 
    withSpring 
} from 'react-native-reanimated';
import wellnessService, { DeepDiveData } from '../../src/services/wellnessService';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default function AnalyticsScreen() {
    const { colors, isDark } = useTheme();
    const [data, setData] = useState<DeepDiveData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDeepDive = async () => {
        try {
            const result = await wellnessService.getDeepDive();
            setData(result);
        } catch (error) {
            console.error('Failed to fetch deep dive stats:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeepDive();
    }, []);

    const chartConfig = {
        backgroundColor: 'transparent',
        backgroundGradientFrom: colors.card,
        backgroundGradientTo: colors.card,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`, // primary-ish
        labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity * 0.5})` : `rgba(0, 0, 0, ${opacity * 0.5})`,
        propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: "#6366F1"
        },
        propsForBackgroundLines: {
            strokeDasharray: "", // solid background lines
            stroke: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
        }
    };

    const dummyMoodData = {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{
            data: [65, 72, 68, 85, 92, 88, 90],
        }]
    };

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Synthesizing clinical correlations...</Text>
            </View>
        );
    }

    if (!data) return null;

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Longevity <Text style={styles.italic}>Insights.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>PHASE 5: THE RESILIENCE ENGINE</Text>
                    </View>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Share2 size={18} color={colors.primary} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Forecast Card */}
                <Animated.View entering={FadeInUp.delay(400)}>
                    <LinearGradient
                        colors={isDark ? ['rgba(99, 102, 241, 0.15)', 'transparent'] : ['rgba(99, 102, 241, 0.05)', 'transparent']}
                        style={[styles.forecastCard, { borderColor: colors.border }]}
                    >
                        <View style={styles.forecastHeader}>
                            <View style={[styles.iconContainer, { backgroundColor: 'rgba(99, 102, 241, 0.1)' }]}>
                                <Brain size={20} color="#6366F1" />
                            </View>
                            <Text style={[styles.forecastTitle, { color: colors.text }]}>RESILIENCE FORECAST</Text>
                        </View>
                        
                        <Text style={[styles.forecastStatus, { color: colors.text }]}>{data.forecast}</Text>
                        <Text style={[styles.forecastDesc, { color: colors.textSecondary }]}>
                            Your emotional baseline is currently {data.forecast.toLowerCase()}. 
                            Your system is adapting well to current stressors.
                        </Text>
                    </LinearGradient>
                </Animated.View>

                {/* Participation Row */}
                <View style={styles.statsRow}>
                    <Animated.View entering={FadeInRight.delay(600)} style={[styles.statBox, { backgroundColor: colors.card, borderColor: 'rgba(16, 185, 129, 0.2)' }]}>
                        <Text style={[styles.statLabel, { color: '#10B981' }]}>CARE ADHERENCE</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>{data.participationStats.carePlanAdherence}%</Text>
                        <View style={styles.progressBarBg}>
                            <View style={[styles.progressBarFill, { width: `${data.participationStats.carePlanAdherence}%`, backgroundColor: '#10B981' }]} />
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInRight.delay(800)} style={[styles.statBox, { backgroundColor: colors.card, borderColor: 'rgba(99, 102, 241, 0.2)' }]}>
                        <Text style={[styles.statLabel, { color: colors.primary }]}>CIRCLE INVOLVEMENT</Text>
                        <Text style={[styles.statValue, { color: colors.text }]}>{data.participationStats.totalCircleShares}</Text>
                        <Text style={styles.statSubValue}>Shares & Posts</Text>
                    </Animated.View>
                </View>

                {/* Correlation Matrix */}
                <View style={styles.sectionHeader}>
                    <Zap size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>MULTI-FACTOR CORRELATIONS</Text>
                </View>

                <View style={styles.matrixGrid}>
                    {data.correlations.map((corr, i) => (
                        <Animated.View 
                            key={corr.factor} 
                            entering={FadeInUp.delay(1000 + (i * 100))}
                            style={[styles.matrixCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <View style={styles.matrixHeader}>
                                <View style={styles.matrixBadge}>
                                    <Text style={styles.matrixBadgeText}>{corr.factor}</Text>
                                </View>
                                <Text style={[styles.impactText, { color: corr.impact === 'POSITIVE' ? '#10B981' : colors.textSecondary }]}>
                                    {corr.impact}
                                </Text>
                            </View>
                            <Text style={[styles.matrixDesc, { color: colors.text }]} numberOfLines={3}>
                                {corr.description}
                            </Text>
                            <View style={styles.scoreContainer}>
                                <Text style={styles.scoreLabel}>CORRELATION WEIGHTING</Text>
                                <Text style={[styles.scoreValue, { color: colors.primary }]}>{Math.round(corr.score)}%</Text>
                            </View>
                            <View style={styles.scoreBarBg}>
                                <View style={[styles.scoreBarFill, { width: `${corr.score}%`, backgroundColor: colors.primary }]} />
                            </View>
                        </Animated.View>
                    ))}
                </View>

                {/* Mood Trend Chart */}
                <View style={styles.sectionHeader}>
                    <TrendingUp size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>EMOTIONAL TRAJECTORY</Text>
                </View>

                <Animated.View entering={FadeInUp.delay(1400)} style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <LineChart
                        data={dummyMoodData}
                        width={width - 56}
                        height={200}
                        chartConfig={chartConfig}
                        bezier
                        style={styles.chart}
                        withHorizontalLabels={false}
                        withVerticalLines={false}
                        withHorizontalLines={true}
                    />
                </Animated.View>

                {/* Academic Context */}
                <Animated.View entering={FadeInUp.delay(1600)} style={[styles.academicCard, { backgroundColor: 'rgba(99, 102, 241, 0.03)', borderColor: 'rgba(99, 102, 241, 0.1)' }]}>
                    <View style={styles.academicInfo}>
                        <Calendar size={20} color={colors.primary} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={[styles.academicTitle, { color: colors.text }]}>Academic Calibration</Text>
                            <Text style={[styles.academicDesc, { color: colors.textSecondary }]}>
                                Your resilience scores typically anticipate academic peaks by 3 days. Focus on Deep Sleep this week.
                            </Text>
                        </View>
                    </View>
                    <View style={styles.academicStats}>
                        <View style={styles.academicStatItem}>
                            <Text style={[styles.academicStatVal, { color: colors.text }]}>8.4</Text>
                            <Text style={styles.academicStatLabel}>STRESS INDEX</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.academicStatItem}>
                            <Text style={[styles.academicStatVal, { color: colors.primary }]}>92%</Text>
                            <Text style={styles.academicStatLabel}>RECOVERY</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Privacy Footer */}
                <View style={styles.privacyFooter}>
                    <ShieldCheck size={14} color={colors.textSecondary} />
                    <Text style={styles.privacyText}>PRIVACY-VALIDATED ANALYTICS ENGINE</Text>
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
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 24,
        marginTop: 8
    },
    title: { fontSize: 32, fontWeight: '900', letterSpacing: -1.5 },
    italic: { fontStyle: 'italic' },
    tagline: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginTop: 4 },
    iconButton: { 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    forecastCard: {
        padding: 24,
        borderRadius: 32,
        borderWidth: 1,
        marginBottom: 20
    },
    forecastHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    iconContainer: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    forecastTitle: { fontSize: 12, fontWeight: '900', letterSpacing: 1, marginLeft: 12 },
    forecastStatus: { fontSize: 42, fontWeight: '900', letterSpacing: -1, marginBottom: 8, textTransform: 'capitalize' },
    forecastDesc: { fontSize: 13, fontWeight: '500', lineHeight: 20 },
    statsRow: { flexDirection: 'row', gap: 12, marginBottom: 32 },
    statBox: { flex: 1, padding: 20, borderRadius: 24, borderWidth: 1, justifyContent: 'space-between', height: 130 },
    statLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginBottom: 8 },
    statValue: { fontSize: 32, fontWeight: '900' },
    statSubValue: { fontSize: 9, fontWeight: '800', opacity: 0.5, textTransform: 'uppercase', marginTop: 4 },
    progressBarBg: { height: 6, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 3, marginTop: 12, overflow: 'hidden' },
    progressBarFill: { height: 6, borderRadius: 3 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    matrixGrid: { gap: 12, marginBottom: 32 },
    matrixCard: { padding: 24, borderRadius: 28, borderWidth: 1 },
    matrixHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    matrixBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, backgroundColor: 'rgba(99, 102, 241, 0.1)' },
    matrixBadgeText: { fontSize: 9, fontWeight: '900', color: '#6366F1', letterSpacing: 1, textTransform: 'uppercase' },
    impactText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    matrixDesc: { fontSize: 16, fontWeight: '900', letterSpacing: -0.3, lineHeight: 22, marginBottom: 16 },
    scoreContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
    scoreLabel: { fontSize: 9, fontWeight: '800', opacity: 0.4 },
    scoreValue: { fontSize: 10, fontWeight: '900' },
    scoreBarBg: { height: 4, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' },
    scoreBarFill: { height: '100%', borderRadius: 2, opacity: 0.4 },
    chartCard: { padding: 12, borderRadius: 28, borderWidth: 1, marginBottom: 32, alignItems: 'center' },
    chart: { borderRadius: 16 },
    academicCard: { padding: 24, borderRadius: 32, borderWidth: 1, marginBottom: 32 },
    academicInfo: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 20 },
    academicTitle: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
    academicDesc: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
    academicStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.05)', paddingTop: 20 },
    academicStatItem: { alignItems: 'center' },
    academicStatVal: { fontSize: 24, fontWeight: '900' },
    academicStatLabel: { fontSize: 8, fontWeight: '900', opacity: 0.4, letterSpacing: 1, marginTop: 4 },
    divider: { width: 1, height: 30, backgroundColor: 'rgba(0,0,0,0.1)' },
    privacyFooter: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6, opacity: 0.4, paddingVertical: 10 },
    privacyText: { fontSize: 8, fontWeight: '900', letterSpacing: 2 }
});
