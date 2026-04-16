import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import Animated, { 
    useAnimatedStyle, 
    withSpring, 
    withRepeat, 
    withSequence, 
    withTiming,
    withDelay,
    interpolate,
    useSharedValue
} from 'react-native-reanimated';
import { Droplets, Lamp, Zap, Diamond, Sparkles } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

interface MoodGardenProps {
    level: number; // 1-5
    health: number; // 0-100
    plantType?: string; // 'oak', 'baobab', etc.
    loading?: boolean;
    artifacts?: string[];
}

const STAGES = [
    { label: 'Seedling', color: '#34D399' },
    { label: 'Sapling', color: '#10B981' },
    { label: 'Growth', color: '#38BDF8' },
    { label: 'Mature', color: '#0EA5E9' },
    { label: 'Ancient', color: '#6366F1' }
];

export const MoodGarden = ({ level, health, plantType = 'oak', loading, artifacts = [] }: MoodGardenProps) => {
    const { colors, isDark } = useTheme();
    const currentStage = STAGES[Math.min(level - 1, 4)];
    
    // Animation Shared Values
    const scale = useSharedValue(0.8);
    const translateY = useSharedValue(20);
    const opacity = useSharedValue(0);
    
    useEffect(() => {
        scale.value = withSpring(1);
        translateY.value = withSpring(0);
        opacity.value = withTiming(1, { duration: 1000 });
    }, [level]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: translateY.value }],
        opacity: opacity.value
    }));

    // Particle animations
    const Particle = ({ delay, xOffset }: { delay: number, xOffset: number }) => {
        const pY = useSharedValue(0);
        const pOpacity = useSharedValue(0);
        const pScale = useSharedValue(0.5);

        useEffect(() => {
            pY.value = withDelay(delay, withRepeat(withTiming(-100, { duration: 3000 }), -1));
            pOpacity.value = withDelay(delay, withRepeat(withSequence(
                withTiming(1, { duration: 1000 }),
                withTiming(0, { duration: 2000 })
            ), -1));
            pScale.value = withDelay(delay, withRepeat(withTiming(1, { duration: 3000 }), -1));
        }, []);

        const pStyle = useAnimatedStyle(() => ({
            transform: [{ translateY: pY.value }, { translateX: xOffset }, { scale: pScale.value }],
            opacity: pOpacity.value
        }));

        return <Animated.View style={[styles.particle, pStyle]} />;
    };

    return (
        <View style={styles.container}>
            {/* Background Glow */}
            <View style={[styles.glow, { backgroundColor: colors.primary, opacity: isDark ? 0.05 : 0.02 }]} />
            
            <BlurView intensity={isDark ? 30 : 10} tint={isDark ? 'dark' : 'light'} style={[styles.card, { borderColor: colors.border }]}>
                {/* The Plant */}
                <Animated.View style={[styles.plantContainer, animatedStyle]}>
                    <View style={[styles.imagePlaceholder, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Text style={[styles.emoji, { opacity: health < 40 ? 0.5 : 1 }]}>
                            {level === 1 ? '🌱' : level === 2 ? '🌿' : level === 3 ? '🌲' : level === 4 ? '🌳' : '🌳✨'}
                        </Text>
                        {loading && <ActivityIndicator style={styles.loader} color={colors.primary} />}
                    </View>
                    
                    {/* Floating Artifacts */}
                    <View style={styles.artifactsContainer}>
                        {artifacts.includes('GARDEN_ARTIFACT_LANTERN') && (
                            <View style={[styles.artifact, styles.lantern, { backgroundColor: colors.card, borderColor: '#F59E0B' }]}>
                                <Lamp size={14} color="#F59E0B" />
                            </View>
                        )}
                        {artifacts.includes('GARDEN_ARTIFACT_STONE') && (
                            <View style={[styles.artifact, styles.stone, { backgroundColor: colors.card, borderColor: '#64748B' }]}>
                                <Diamond size={14} color="#64748B" />
                            </View>
                        )}
                    </View>
                </Animated.View>

                {/* Stage Info */}
                <View style={styles.info}>
                    <Text style={[styles.tag, { color: colors.primary }]}>MOOD GARDEN STAGE {level}</Text>
                    <Text style={[styles.stageLabel, { color: colors.text }]}>{currentStage.label}</Text>
                    
                    {/* Health Bar */}
                    <View style={[styles.healthBarBg, { backgroundColor: colors.border }]}>
                        <Animated.View 
                            style={[
                                styles.healthBarFill, 
                                { width: `${health}%`, backgroundColor: colors.primary }
                            ]} 
                        />
                    </View>
                    <View style={styles.healthRow}>
                        <Droplets size={10} color="#38BDF8" />
                        <Text style={[styles.healthText, { color: colors.textSecondary }]}>{health}% VITALITY</Text>
                    </View>
                </View>

                {/* Particles */}
                <View pointerEvents="none" style={StyleSheet.absoluteFill}>
                    <Particle delay={0} xOffset={0} />
                    <Particle delay={1000} xOffset={20} />
                    <Particle delay={2000} xOffset={-20} />
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { width: '100%', height: 400, justifyContent: 'center', alignItems: 'center' },
    glow: { position: 'absolute', width: 300, height: 300, borderRadius: 150 },
    card: { 
        width: '100%', 
        padding: 32, 
        borderRadius: 48, 
        borderWidth: 1, 
        alignItems: 'center', 
        overflow: 'hidden'
    },
    plantContainer: { position: 'relative', width: 220, height: 220, justifyContent: 'center', alignItems: 'center' },
    imagePlaceholder: { 
        width: 180, 
        height: 180, 
        borderRadius: 90, 
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 5
    },
    emoji: { fontSize: 80 },
    loader: { position: 'absolute' },
    info: { marginTop: 24, alignItems: 'center', width: '100%' },
    tag: { fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 4 },
    stageLabel: { fontSize: 24, fontWeight: '900' },
    healthBarBg: { width: 140, height: 6, borderRadius: 3, marginTop: 16, overflow: 'hidden' },
    healthBarFill: { height: '100%', borderRadius: 3 },
    healthRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
    healthText: { fontSize: 10, fontWeight: '800' },
    particle: { position: 'absolute', bottom: 100, left: '50%', width: 4, height: 4, backgroundColor: '#38BDF8', borderRadius: 2, opacity: 0.4 },
    artifactsContainer: { position: 'absolute', width: '100%', height: '100%' },
    artifact: { 
        position: 'absolute', 
        width: 36, 
        height: 36, 
        borderRadius: 12, 
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3
    },
    lantern: { top: 0, right: 10 },
    stone: { bottom: 0, left: 10, transform: [{ rotate: '15deg' }] }
});
