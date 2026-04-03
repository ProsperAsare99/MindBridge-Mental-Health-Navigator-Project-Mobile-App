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
    ClipboardCheck, 
    History, 
    ChevronRight, 
    ShieldCheck, 
    Activity, 
    Brain, 
    Moon, 
    GraduationCap,
    Info,
    ChevronLeft,
    Clock
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
import assessmentService, { Assessment } from '../../src/services/assessmentService';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DUMMY_ASSESSMENTS: Assessment[] = [
    { id: 'phq9', title: 'PHQ-9 Depression Scale', description: 'Standard clinical screening for emotional baseline.', questionCount: 9, category: 'CLINICAL', lastTaken: '2026-04-01', severity: 'NORMAL', lastScore: 4 },
    { id: 'gad7', title: 'GAD-7 Anxiety Scale', description: 'Screening for generalized anxiety and stressors.', questionCount: 7, category: 'CLINICAL', lastTaken: '2026-03-25', severity: 'MILD', lastScore: 8 },
    { id: 'burnout', title: 'Academic Burnout', description: 'Assess resilience during semester peaks.', questionCount: 12, category: 'ACADEMIC', lastTaken: '2026-03-15', severity: 'MODERATE', lastScore: 16 }
];

const getSeverityColor = (severity?: string) => {
    switch (severity) {
        case 'NORMAL': return '#10B981';
        case 'MILD': return '#F59E0B';
        case 'MODERATE': return '#EF4444';
        case 'SEVERE': return '#E11D48';
        default: return '#9CA3AF';
    }
};

export default function AssessmentScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [assessments, setAssessments] = useState<Assessment[]>(DUMMY_ASSESSMENTS);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const data = await assessmentService.getAvailable();
            if (data.length > 0) setAssessments(data);
        } catch (error) {
            console.error('Failed to fetch assessments:', error);
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
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Coordinating diagnostic suite...</Text>
            </View>
        );
    }

    const latest = assessments[0];

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Diagnostic <Text style={styles.italic}>Center.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>CLINICAL FEEDBACK • ACADEMIC BURNOUT</Text>
                    </View>
                </View>

                {/* Status Hub Banner */}
                <Animated.View entering={FadeInUp.delay(200)}>
                    <LinearGradient
                        colors={isDark ? ['rgba(99, 102, 241, 0.15)', 'transparent'] : ['rgba(99, 102, 241, 0.05)', 'transparent']}
                        style={[styles.statusHub, { borderColor: colors.border }]}
                    >
                        <View style={styles.hubHeader}>
                            <Activity size={20} color={colors.primary} />
                            <Text style={[styles.hubTitle, { color: colors.text }]}>LATEST CLINICAL SNAPSHOT</Text>
                        </View>
                        
                        <View style={styles.hubContent}>
                            <View>
                                <Text style={[styles.hubStatus, { color: getSeverityColor(latest.severity) }]}>{latest.severity}</Text>
                                <Text style={[styles.hubMetric, { color: colors.text }]}>Score: {latest.lastScore}</Text>
                                <Text style={[styles.hubSubtext, { color: colors.textSecondary }]}>{latest.title} • {latest.lastTaken}</Text>
                            </View>
                            <TouchableOpacity style={[styles.historyBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
                                <History size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </Animated.View>

                {/* Categories */}
                <View style={styles.sectionHeader}>
                    <Brain size={16} color={colors.primary} />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>AVAILABLE EVALUATIONS</Text>
                </View>

                <View style={styles.assessmentsList}>
                    {assessments.map((assessment, i) => (
                        <Animated.View 
                            key={assessment.id} 
                            entering={FadeInUp.delay(400 + (i * 100))}
                            style={[styles.assessmentCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <View style={styles.assessmentHeader}>
                                <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '10' }]}>
                                    <Text style={[styles.categoryText, { color: colors.primary }]}>{assessment.category}</Text>
                                </View>
                                <Text style={styles.questionCount}>{assessment.questionCount} QUESTIONS</Text>
                            </View>
                            
                            <Text style={[styles.assessmentTitle, { color: colors.text }]}>{assessment.title}</Text>
                            <Text style={[styles.assessmentDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                                {assessment.description}
                            </Text>
                            
                            <View style={styles.assessmentFooter}>
                                <View style={styles.lastTakenRow}>
                                    <Clock size={10} color={colors.textSecondary} />
                                    <Text style={[styles.lastTakenText, { color: colors.textSecondary }]}>
                                        {assessment.lastTaken ? `LAST TAKEN: ${assessment.lastTaken}` : 'NEVER TAKEN'}
                                    </Text>
                                </View>
                                <TouchableOpacity style={[styles.startBtn, { backgroundColor: colors.primary }]}>
                                    <Text style={styles.startBtnText}>BEGIN</Text>
                                    <ChevronRight size={14} color="#FFF" />
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    ))}
                </View>

                {/* Safety Protocol Reminder */}
                <Animated.View entering={FadeInUp.delay(800)} style={[styles.safetyCard, { backgroundColor: 'rgba(225, 29, 72, 0.05)', borderColor: 'rgba(225, 29, 72, 0.1)' }]}>
                    <ShieldCheck size={20} color="#E11D48" />
                    <View style={{ flex: 1, marginLeft: 16 }}>
                        <Text style={[styles.safetyTitle, { color: colors.text }]}>Clinical Responsibility</Text>
                        <Text style={[styles.safetyDesc, { color: colors.textSecondary }]}>
                            These diagnostics are supplemental. High-severity results will trigger immediate crisis support protocols.
                        </Text>
                    </View>
                </Animated.View>

            </ScrollView>

            <View style={styles.footer}>
                <Info size={14} color={colors.textSecondary} />
                <Text style={styles.footerText}>HIPAA-LEVEL DATA ENCRYPTION ENABLED</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 60 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32, marginTop: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    italic: { fontStyle: 'italic' },
    tagline: { fontSize: 9, fontWeight: '900', letterSpacing: 2, marginTop: 4, opacity: 0.6 },
    statusHub: { padding: 24, borderRadius: 32, borderWidth: 1, marginBottom: 32 },
    hubHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20 },
    hubTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    hubContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    hubStatus: { fontSize: 32, fontWeight: '900', letterSpacing: -1 },
    hubMetric: { fontSize: 16, fontWeight: '900', marginTop: 4 },
    hubSubtext: { fontSize: 11, fontWeight: '600', opacity: 0.6, marginTop: 2 },
    historyBtn: { width: 44, height: 44, borderRadius: 12, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    assessmentsList: { gap: 12, marginBottom: 32 },
    assessmentCard: { padding: 24, borderRadius: 32, borderWidth: 1 },
    assessmentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    categoryBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    categoryText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    questionCount: { fontSize: 8, fontWeight: '800', opacity: 0.4 },
    assessmentTitle: { fontSize: 20, fontWeight: '900', marginBottom: 8 },
    assessmentDesc: { fontSize: 13, fontWeight: '500', lineHeight: 18, marginBottom: 20 },
    assessmentFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    lastTakenRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    lastTakenText: { fontSize: 9, fontWeight: '800', letterSpacing: 0.5 },
    startBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
    startBtnText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    safetyCard: { flexDirection: 'row', alignItems: 'center', padding: 24, borderRadius: 32, borderWidth: 1, marginBottom: 20 },
    safetyTitle: { fontSize: 16, fontWeight: '900' },
    safetyDesc: { fontSize: 12, fontWeight: '500', opacity: 0.6, marginTop: 4 },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 20, opacity: 0.4 },
    footerText: { fontSize: 8, fontWeight: '900', letterSpacing: 1.5 }
});
