import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions,
    Linking,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    Phone, 
    ShieldAlert, 
    MapPin, 
    Globe, 
    ChevronRight, 
    MessageSquare,
    HeartPulse,
    Info,
    ChevronLeft
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    withRepeat, 
    withTiming, 
    useAnimatedStyle, 
    useSharedValue,
    withSequence,
    interpolate,
    Extrapolate
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import crisisService, { CrisisContact, SupportCenter } from '../../src/services/crisisService';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CrisisScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [contacts, setContacts] = useState<CrisisContact[]>([]);
    const [centers, setCenters] = useState<SupportCenter[]>([]);
    const [loading, setLoading] = useState(true);

    const pulseValue = useSharedValue(1);

    useEffect(() => {
        pulseValue.value = withRepeat(
            withSequence(
                withTiming(1.05, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [fetchedContacts, fetchedCenters] = await Promise.all([
                crisisService.getContacts(),
                crisisService.getNearbyCenters()
            ]);
            setContacts(fetchedContacts);
            setCenters(fetchedCenters);
        } catch (error) {
            console.error('Failed to fetch crisis data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCall = (number: string) => {
        Linking.openURL(`tel:${number}`);
    };

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseValue.value }],
        shadowOpacity: interpolate(pulseValue.value, [1, 1.05], [0.3, 0.6], Extrapolate.CLAMP)
    }));

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color="#E11D48" />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Coordinating safety resources...</Text>
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
                        <Text style={[styles.title, { color: colors.text }]}>Safe <Text style={{ color: '#E11D48' }}>Haven.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>YOU ARE SECURE • HELP IS IMMEDIATE</Text>
                    </View>
                </View>

                {/* Main Emergency Button */}
                <Animated.View style={[styles.emergencyContainer, pulseStyle]}>
                    <TouchableOpacity 
                        onPress={() => handleCall('911')}
                        style={[styles.emergencyButton, { backgroundColor: '#E11D48' }]}
                    >
                        <View style={styles.emergencyIconBg}>
                            <ShieldAlert size={48} color="#FFF" />
                        </View>
                        <Text style={styles.emergencyText}>EMERGENCY CALL</Text>
                        <Text style={styles.emergencySubtext}>911 / 112 SERVICES</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Primary Specialized Contacts */}
                <View style={styles.sectionHeader}>
                    <HeartPulse size={16} color="#E11D48" />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>QUALIFIED SUPPORT DIRECTIVE</Text>
                </View>

                <View style={styles.contactsGrid}>
                    {contacts.slice(0, 3).map((contact, i) => (
                        <Animated.View 
                            key={contact.id} 
                            entering={FadeInUp.delay(400 + (i * 100))}
                        >
                            <TouchableOpacity 
                                onPress={() => handleCall(contact.phone)}
                                style={[styles.contactCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                            >
                                <View style={styles.contactIcon}>
                                    <Phone size={20} color={contact.type === 'EMERGENCY' ? '#E11D48' : '#6366F1'} />
                                </View>
                                <View style={styles.contactInfo}>
                                    <Text style={[styles.contactName, { color: colors.text }]}>{contact.name}</Text>
                                    <Text style={[styles.contactAvail, { color: colors.textSecondary }]}>{contact.availability}</Text>
                                </View>
                                <ChevronRight size={18} color={colors.textSecondary} />
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Nearby Safe Centers */}
                <View style={styles.sectionHeader}>
                    <MapPin size={16} color="#6366F1" />
                    <Text style={[styles.sectionTitle, { color: colors.text }]}>NEAREST PHYSICAL SAFETY</Text>
                </View>

                <View style={styles.centersList}>
                    {centers.map((center, i) => (
                        <Animated.View 
                            key={center.id} 
                            entering={FadeInUp.delay(800 + (i * 100))}
                            style={[styles.centerItem, { backgroundColor: colors.card, borderColor: colors.border }]}
                        >
                            <View style={styles.centerDetails}>
                                <Text style={[styles.centerName, { color: colors.text }]}>{center.name}</Text>
                                <Text style={[styles.centerDist, { color: colors.primary }]}>{center.distance}</Text>
                                <Text style={[styles.centerAddr, { color: colors.textSecondary }]}>{center.address}</Text>
                            </View>
                            <TouchableOpacity style={[styles.dirBtn, { backgroundColor: colors.primary + '10' }]}>
                                <Text style={[styles.dirBtnText, { color: colors.primary }]}>DIRECTIONS</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </View>

                {/* Global Hotlines */}
                <Animated.View entering={FadeInUp.delay(1200)}>
                    <TouchableOpacity style={[styles.globalHotlineCard, { backgroundColor: 'rgba(225, 29, 72, 0.05)', borderColor: 'rgba(225, 29, 72, 0.1)' }]}>
                        <Globe size={20} color="#E11D48" />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={[styles.globalHotlineTitle, { color: colors.text }]}>GLOBAL DIRECTORY</Text>
                            <Text style={[styles.globalHotlineDesc, { color: colors.textSecondary }]}>International support and specialized text services</Text>
                        </View>
                        <ChevronRight size={18} color="#E11D48" />
                    </TouchableOpacity>
                </Animated.View>

            </ScrollView>

            <View style={styles.footer}>
                <Info size={14} color={colors.textSecondary} />
                <Text style={styles.footerText}>YOUR GEOLOCATION IS ENCRYPTED AND PRIVATE</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 60 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 40, marginTop: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    tagline: { fontSize: 9, fontWeight: '900', letterSpacing: 2, marginTop: 4, opacity: 0.6 },
    emergencyContainer: { width: '100%', alignItems: 'center', marginBottom: 48 },
    emergencyButton: { 
        width: 280, 
        height: 280, 
        borderRadius: 140, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#E11D48',
        shadowOffset: { width: 0, height: 20 },
        shadowRadius: 40,
        elevation: 20
    },
    emergencyIconBg: { 
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        backgroundColor: 'rgba(255,255,255,0.2)', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: 16 
    },
    emergencyText: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: -0.5 },
    emergencySubtext: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '800', letterSpacing: 1, marginTop: 4 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 20, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    contactsGrid: { gap: 12, marginBottom: 40 },
    contactCard: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 24, borderWidth: 1, gap: 16 },
    contactIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: 'rgba(0,0,0,0.03)', justifyContent: 'center', alignItems: 'center' },
    contactInfo: { flex: 1 },
    contactName: { fontSize: 16, fontWeight: '900' },
    contactAvail: { fontSize: 11, fontWeight: '700', marginTop: 2 },
    centersList: { gap: 16, marginBottom: 40 },
    centerItem: { padding: 24, borderRadius: 32, borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    centerDetails: { flex: 1 },
    centerName: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
    centerDist: { fontSize: 12, fontWeight: '900', marginBottom: 8 },
    centerAddr: { fontSize: 12, fontWeight: '500', opacity: 0.5 },
    dirBtn: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 },
    dirBtnText: { fontSize: 10, fontWeight: '900' },
    globalHotlineCard: { flexDirection: 'row', alignItems: 'center', padding: 24, borderRadius: 32, borderWidth: 1 },
    globalHotlineTitle: { fontSize: 14, fontWeight: '900', letterSpacing: 1 },
    globalHotlineDesc: { fontSize: 12, fontWeight: '500', opacity: 0.6, marginTop: 4 },
    footer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8, paddingVertical: 20, opacity: 0.4 },
    footerText: { fontSize: 8, fontWeight: '900', letterSpacing: 1.5 }
});
