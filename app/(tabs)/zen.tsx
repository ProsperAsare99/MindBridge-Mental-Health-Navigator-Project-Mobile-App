import React, { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    Vibration 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    ChevronLeft, 
    Wind, 
    Sparkles, 
    Play, 
    Pause, 
    RefreshCcw,
    CheckCircle2
} from 'lucide-react-native';
import Animated, { 
    useAnimatedStyle, 
    withTiming, 
    withRepeat, 
    withSequence, 
    useSharedValue,
    withSpring,
    interpolate,
    Extrapolate,
    FadeIn,
    FadeOut
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import wellnessService from '../../src/services/wellnessService';

const { width } = Dimensions.get('window');

// 4-7-8 Breathing Technique
const PHASES = {
    inhale: 4000,
    hold: 7000,
    exhale: 8000
};

export default function ZenModeScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
    const [timer, setTimer] = useState(0);
    const [cycles, setCycles] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [rewarding, setRewarding] = useState(false);

    // Shared Values for Animations
    const orbScale = useSharedValue(1);
    const orbOpacity = useSharedValue(0.1);
    const progress = useSharedValue(0);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isActive && !isComplete) {
            startBreathing();
        } else {
            stopBreathing();
        }
        return () => stopBreathing();
    }, [isActive, phase, cycles, isComplete]);

    const startBreathing = () => {
        const duration = PHASES[phase];
        
        // Progress ring animation
        progress.value = 0;
        progress.value = withTiming(1, { duration });

        // Orb scaling animation
        if (phase === 'inhale') {
            orbScale.value = withTiming(1.6, { duration });
            orbOpacity.value = withTiming(0.4, { duration });
        } else if (phase === 'exhale') {
            orbScale.value = withTiming(0.9, { duration });
            orbOpacity.value = withTiming(0.1, { duration });
        }

        intervalRef.current = setTimeout(() => {
            if (phase === 'inhale') {
                setPhase('hold');
            } else if (phase === 'hold') {
                setPhase('exhale');
            } else {
                setPhase('inhale');
                setCycles((c) => c + 1);
            }
        }, duration);
    };

    const stopBreathing = () => {
        if (intervalRef.current) clearTimeout(intervalRef.current);
        progress.value = 0;
    };

    useEffect(() => {
        if (cycles >= 4 && !isComplete) {
            handleCompletion();
        }
    }, [cycles]);

    const handleCompletion = async () => {
        setIsActive(false);
        setIsComplete(true);
        setRewarding(true);
        Vibration.vibrate([0, 100, 50, 100]);
        try {
            await wellnessService.rewardXP('MEDITATION_COMPLETE', 50);
        } catch (err) {
            console.error('Failed to claim Zen reward:', err);
        } finally {
            setRewarding(false);
        }
    };

    const toggleZen = () => {
        if (isComplete) {
            setIsComplete(false);
            setCycles(0);
            setPhase('inhale');
        }
        setIsActive(!isActive);
    };

    const getPhaseMessage = () => {
        if (!isActive && !isComplete) return "Ready to center yourself?";
        if (isComplete) return "Peace attained.";
        if (phase === 'inhale') return "Breathe in deeply...";
        if (phase === 'hold') return "Hold the still point...";
        return "Release slowly...";
    };

    const orbAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: orbScale.value }],
        opacity: orbOpacity.value
    }));

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Background Glow */}
            <Animated.View style={[styles.glow, orbAnimatedStyle, { backgroundColor: colors.primary }]} />
            
            {/* Navigation */}
            <SafeAreaView edges={['top']} style={styles.nav}>
                <TouchableOpacity onPress={() => router.back()} style={styles.exitButton}>
                    <ChevronLeft size={20} color={colors.primary} />
                    <Text style={[styles.exitText, { color: colors.primary }]}>EXIT PRESENCE</Text>
                </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.content}>
                <View style={styles.textContainer}>
                    <Text style={[styles.message, { color: colors.text }]}>{getPhaseMessage()}</Text>
                    <Text style={[styles.subtitle, { color: colors.primary }]}>
                        {isActive ? `CYCLE ${cycles + 1} OF 4` : "4-7-8 BREATHING TECHNIQUE"}
                    </Text>
                </View>

                {/* Breathing Orb */}
                <View style={styles.orbWrapper}>
                    <Animated.View 
                        style={[
                            styles.orb, 
                            { borderColor: colors.primary + '30' },
                            orbAnimatedStyle
                        ]} 
                    />
                    
                    <BlurView intensity={20} tint={isDark ? 'dark' : 'light'} style={[styles.innerOrb, { borderColor: colors.primary + '20' }]}>
                        {isComplete ? (
                            <Animated.View entering={FadeIn} style={styles.completeIcon}>
                                <CheckCircle2 size={64} color={colors.primary} strokeWidth={1} />
                                <Text style={[styles.xpText, { color: colors.primary }]}>+50 XP</Text>
                            </Animated.View>
                        ) : (
                            <View style={styles.phaseTimer}>
                                <Wind size={32} color={colors.primary} style={{ opacity: 0.3 }} />
                            </View>
                        )}
                    </BlurView>
                </View>

                {/* Controls */}
                <TouchableOpacity 
                    onPress={toggleZen}
                    style={[styles.playButton, { backgroundColor: isActive ? colors.secondary : colors.primary }]}
                >
                    {isActive ? <Pause size={32} color="#FFF" /> : isComplete ? <RefreshCcw size={32} color="#FFF" /> : <Play size={32} color="#FFF" style={{ marginLeft: 4 }} />}
                </TouchableOpacity>
            </View>

            {/* Achievement Toast */}
            {isComplete && (
                <Animated.View entering={FadeIn.delay(500)} style={styles.toastContainer}>
                    <BlurView intensity={80} tint={isDark ? 'dark' : 'light'} style={[styles.toast, { borderColor: colors.border }]}>
                        <Sparkles size={24} color="#F59E0B" />
                        <View style={styles.toastInfo}>
                            <Text style={[styles.toastTitle, { color: colors.text }]}>Presence Mastered</Text>
                            <Text style={[styles.toastSubtitle, { color: colors.textSecondary }]}>Your garden health has improved</Text>
                        </View>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/garden')} style={[styles.toastBtn, { backgroundColor: colors.primary }]}>
                            <Text style={styles.toastBtnText}>GARDEN</Text>
                        </TouchableOpacity>
                    </BlurView>
                </Animated.View>
            )}

            <View style={styles.footer}>
                <Text style={styles.hint}>INHALE (4S) • HOLD (7S) • EXHALE (8S)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    glow: { position: 'absolute', width: 400, height: 400, borderRadius: 200, blurRadius: 100 },
    nav: { position: 'absolute', top: 0, left: 16, zIndex: 10 },
    exitButton: { flexDirection: 'row', alignItems: 'center', padding: 8, gap: 4 },
    exitText: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
    content: { alignItems: 'center', gap: 60, width: '100%' },
    textContainer: { alignItems: 'center', gap: 8 },
    message: { fontSize: 32, fontWeight: '900', textAlign: 'center', paddingHorizontal: 40, textTransform: 'uppercase', letterSpacing: -1 },
    subtitle: { fontSize: 10, fontWeight: '900', letterSpacing: 3, opacity: 0.6 },
    orbWrapper: { width: 280, height: 280, justifyContent: 'center', alignItems: 'center' },
    orb: { position: 'absolute', width: '100%', height: '100%', borderRadius: 140, borderWidth: 1 },
    innerOrb: { width: 220, height: 220, borderRadius: 110, borderWidth: 1, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
    completeIcon: { alignItems: 'center', gap: 12 },
    xpText: { fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    phaseTimer: { opacity: 0.5 },
    playButton: { 
        width: 80, 
        height: 80, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10
    },
    toastContainer: { position: 'absolute', bottom: 100, width: '100%', paddingHorizontal: 20 },
    toast: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 20, 
        borderRadius: 24, 
        borderWidth: 1, 
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
    toastInfo: { flex: 1 },
    toastTitle: { fontSize: 16, fontWeight: '900' },
    toastSubtitle: { fontSize: 10, fontWeight: '700', textTransform: 'uppercase', opacity: 0.5 },
    toastBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
    toastBtnText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    footer: { position: 'absolute', bottom: 40, opacity: 0.3 },
    hint: { fontSize: 9, fontWeight: '900', letterSpacing: 2 }
});
