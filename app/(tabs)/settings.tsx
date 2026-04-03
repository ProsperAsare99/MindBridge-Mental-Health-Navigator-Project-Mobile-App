import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Switch,
    ActivityIndicator,
    Dimensions,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    User, 
    Bell, 
    Shield, 
    Lock, 
    Moon, 
    Fingerprint, 
    ChevronRight, 
    LogOut, 
    Database, 
    HelpCircle,
    Info,
    ChevronLeft,
    CheckCircle
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    Layout 
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import userService, { UserPreferences } from '../../src/services/userService';
import { useAuthContext } from '../../src/context/AuthContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
    const { colors, isDark, setTheme } = useTheme();
    const { logout, user } = useAuthContext();
    const router = useRouter();
    const [prefs, setPrefs] = useState<UserPreferences>({
        darkMode: isDark,
        notifications: true,
        zenReminder: true,
        biometrics: false
    });
    const [loading, setLoading] = useState(false);

    const updatePref = (key: keyof UserPreferences, value: boolean) => {
        setPrefs(prev => ({ ...prev, [key]: value }));
        if (key === 'darkMode') setTheme(value ? 'carbon' : 'slate');
    };

    const handleSignOut = () => {
        Alert.alert(
            "Terminate Session",
            "Are you sure you want to log out of MindBridge?",
            [
                { text: "STAY", style: "cancel" },
                { text: "TERMINATE", style: "destructive", onPress: () => logout() }
            ]
        );
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <ChevronLeft size={24} color={colors.text} />
                    </TouchableOpacity>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Settings <Text style={styles.italic}>& Prefs.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>SECURE • ENCRYPTED • TAILORED</Text>
                    </View>
                </View>

                {/* Profile Quick Entry */}
                <Animated.View entering={FadeInUp.delay(200)}>
                    <TouchableOpacity 
                        onPress={() => router.push('/(tabs)/profile')}
                        style={[styles.profileEntry, { backgroundColor: colors.card, borderColor: colors.border }]}
                    >
                        <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
                            <Text style={[styles.avatarText, { color: colors.primary }]}>{(user?.displayName || user?.name || 'U')[0]}</Text>
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={[styles.profileName, { color: colors.text }]}>{user?.displayName || user?.name}</Text>
                            <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>{user?.email}</Text>
                        </View>
                        <ChevronRight size={20} color={colors.textSecondary} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Preference Sections */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Bell size={16} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>INTERFACE & ALERTS</Text>
                    </View>
                    
                    <View style={[styles.settingsGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <Moon size={20} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Dark Aesthetic</Text>
                            </View>
                            <Switch 
                                value={isDark} 
                                onValueChange={(val) => updatePref('darkMode', val)}
                                trackColor={{ false: '#767577', true: colors.primary }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <Bell size={20} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Pulse Notifications</Text>
                            </View>
                            <Switch 
                                value={prefs.notifications} 
                                onValueChange={(val) => updatePref('notifications', val)}
                                trackColor={{ false: '#767577', true: colors.primary }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Shield size={16} color="#10B981" />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>SECURITY & IDENTITY</Text>
                    </View>
                    
                    <View style={[styles.settingsGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <View style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <Fingerprint size={20} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Biometric Unlock</Text>
                            </View>
                            <Switch 
                                value={prefs.biometrics} 
                                onValueChange={(val) => updatePref('biometrics', val)}
                                trackColor={{ false: '#767577', true: colors.primary }}
                            />
                        </View>
                        <View style={styles.divider} />
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <Lock size={20} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Two-Factor Authentication</Text>
                            </View>
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>ENABLED</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Data & Export */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Database size={16} color="#F59E0B" />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>YOUR DATA ARCHIVE</Text>
                    </View>
                    
                    <View style={[styles.settingsGroup, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <TouchableOpacity style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <Database size={20} color={colors.text} />
                                <Text style={[styles.settingLabel, { color: colors.text }]}>Export Resilience History (JSON)</Text>
                            </View>
                            <ChevronRight size={18} color={colors.textSecondary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Account Actions */}
                <View style={styles.section}>
                    <View style={[styles.settingsGroup, { backgroundColor: colors.card, borderColor: colors.border, marginTop: 12 }]}>
                        <TouchableOpacity onPress={handleSignOut} style={styles.settingItem}>
                            <View style={styles.settingLabelRow}>
                                <LogOut size={20} color="#E11D48" />
                                <Text style={[styles.settingLabel, { color: '#E11D48' }]}>Terminate Session</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.appInfo}>
                    <Text style={[styles.versionText, { color: colors.textSecondary }]}>MINDBRIDGE MOBILE v1.0.4-BETA</Text>
                    <Text style={[styles.versionText, { color: colors.textSecondary }]}>AES-256 E2EE TERMINAL SECURITY</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 60 },
    header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32, marginTop: 10 },
    backBtn: { width: 44, height: 44, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: '900', letterSpacing: -1 },
    italic: { fontStyle: 'italic' },
    tagline: { fontSize: 9, fontWeight: '900', letterSpacing: 2, marginTop: 4, opacity: 0.6 },
    profileEntry: { flexDirection: 'row', alignItems: 'center', padding: 20, borderRadius: 28, borderWidth: 1, marginBottom: 32 },
    avatar: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    avatarText: { fontSize: 24, fontWeight: '900' },
    profileInfo: { flex: 1, marginLeft: 16 },
    profileName: { fontSize: 18, fontWeight: '900' },
    profileEmail: { fontSize: 13, fontWeight: '600', opacity: 0.5 },
    section: { marginBottom: 28 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    settingsGroup: { borderRadius: 28, borderWidth: 1, overflow: 'hidden' },
    settingItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20 },
    settingLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
    settingLabel: { fontSize: 15, fontWeight: '700' },
    divider: { height: 1, backgroundColor: 'rgba(0,0,0,0.05)', marginHorizontal: 20 },
    badge: { backgroundColor: 'rgba(16, 185, 129, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    badgeText: { color: '#10B981', fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    appInfo: { paddingVertical: 40, alignItems: 'center', gap: 8 },
    versionText: { fontSize: 8, fontWeight: '900', letterSpacing: 2, opacity: 0.4 }
});
