import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions,
    TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    Search, 
    Users, 
    MessageCircle, 
    Sparkles, 
    Filter,
    Plus,
    Bell,
    ChevronRight,
    Trophy,
    Target
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    FadeInRight,
    Layout,
    useAnimatedStyle,
    withSpring,
    useSharedValue
} from 'react-native-reanimated';
import socialService, { Circle, Story, Peer } from '../../src/services/socialService';
import { CircleCard } from '../../src/components/community/CircleCard';
import { StoryCard } from '../../src/components/community/StoryCard';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function CommunityScreen() {
    const { colors, isDark } = useTheme();
    const [circles, setCircles] = useState<Circle[]>([]);
    const [stories, setStories] = useState<Story[]>([]);
    const [peers, setPeers] = useState<Peer[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'EXPLORE' | 'MY_GROUPS'>('EXPLORE');

    const fetchData = async () => {
        try {
            const [fetchedCircles, fetchedStories, fetchedPeers] = await Promise.all([
                socialService.getCircles(),
                socialService.getStories(),
                socialService.getNetwork()
            ]);
            setCircles(fetchedCircles);
            setStories(fetchedStories);
            setPeers(fetchedPeers);
        } catch (error) {
            console.error('Failed to fetch community data:', error);
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
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Sensing the collective pulse...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                {/* Header */}
                <Animated.View entering={FadeInUp.delay(200)} style={styles.header}>
                    <View>
                        <Text style={[styles.title, { color: colors.text }]}>Community <Text style={styles.italic}>Pulse.</Text></Text>
                        <Text style={[styles.tagline, { color: colors.textSecondary }]}>SAFE • ANONYMOUS • SUPPORTIVE</Text>
                    </View>
                    <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
                        <Bell size={18} color={colors.primary} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Search Bar */}
                <Animated.View entering={FadeInUp.delay(400)} style={[styles.searchContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Search size={18} color={colors.textSecondary} />
                    <TextInput 
                        placeholder="Search circles, stories, or peers..." 
                        placeholderTextColor={colors.textSecondary}
                        style={[styles.searchInput, { color: colors.text }]}
                    />
                    <TouchableOpacity style={styles.filterBtn}>
                        <Filter size={16} color={colors.primary} />
                    </TouchableOpacity>
                </Animated.View>

                {/* Circles Section */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <Users size={16} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>SUPPORT CIRCLES</Text>
                    </View>
                    <TouchableOpacity style={styles.viewAllBtn}>
                        <Text style={styles.viewAllText}>SEE ALL</Text>
                        <ChevronRight size={12} color={colors.primary} />
                    </TouchableOpacity>
                </View>

                <Animated.ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.circlesScroll}
                    entering={FadeInRight.delay(600)}
                >
                    {circles.map((circle, i) => (
                        <CircleCard 
                            key={circle.id} 
                            circle={circle} 
                            isDark={isDark} 
                            onPress={() => {}} 
                        />
                    ))}
                    <TouchableOpacity style={[styles.addCircleCard, { borderColor: colors.border, borderStyle: 'dashed' }]}>
                        <Plus size={24} color={colors.textSecondary} />
                        <Text style={[styles.addCircleText, { color: colors.textSecondary }]}>CREATE CIRCLE</Text>
                    </TouchableOpacity>
                </Animated.ScrollView>

                {/* Network Strip */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <Sparkles size={16} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>YOUR SUPPORT NETWORK</Text>
                    </View>
                </View>

                <Animated.ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.peersScroll}
                    entering={FadeInRight.delay(800)}
                >
                    {peers.map((peer, i) => (
                        <TouchableOpacity key={peer.id} style={styles.peerItem}>
                            <View style={[styles.peerAvatar, { backgroundColor: colors.primary + '20' }]}>
                                <Text style={[styles.peerAvatarText, { color: colors.primary }]}>{peer.name[0]}</Text>
                                {peer.status === 'ONLINE' && <View style={styles.onlineStatus} />}
                            </View>
                            <Text style={[styles.peerName, { color: colors.text }]} numberOfLines={1}>{peer.name}</Text>
                        </TouchableOpacity>
                    ))}
                </Animated.ScrollView>

                {/* Stories Feed */}
                <View style={styles.sectionHeader}>
                    <View style={styles.sectionTitleRow}>
                        <MessageCircle size={16} color={colors.primary} />
                        <Text style={[styles.sectionTitle, { color: colors.text }]}>PEER STORIES</Text>
                    </View>
                </View>

                <View style={styles.storiesGrid}>
                    {stories.map((story, i) => (
                        <Animated.View 
                            key={story.id} 
                            entering={FadeInUp.delay(1000 + (i * 200))}
                            layout={Layout.springify()}
                        >
                            <StoryCard 
                                story={story} 
                                isDark={isDark} 
                                onPress={() => {}} 
                            />
                        </Animated.View>
                    ))}
                </View>

            </ScrollView>

            {/* Floating Action Button */}
            <Animated.View entering={FadeInUp.delay(1500)} style={styles.fabContainer}>
                <TouchableOpacity style={[styles.fab, { backgroundColor: colors.primary }]}>
                    <Plus size={28} color="#FFF" />
                </TouchableOpacity>
            </Animated.View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    scrollContent: { padding: 16, paddingBottom: 120 },
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
    searchContainer: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderRadius: 16, 
        borderWidth: 1, 
        gap: 12,
        marginBottom: 32
    },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '600' },
    filterBtn: { padding: 4 },
    sectionHeader: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 16,
        paddingHorizontal: 4
    },
    sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    sectionTitle: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    viewAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    viewAllText: { fontSize: 10, fontWeight: '900', color: '#6366F1' },
    circlesScroll: { paddingBottom: 10, paddingRight: 20 },
    addCircleCard: { 
        width: 140, 
        height: 180, 
        borderRadius: 24, 
        borderWidth: 2, 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 8,
        marginRight: 16
    },
    addCircleText: { fontSize: 10, fontWeight: '900', textAlign: 'center' },
    peersScroll: { paddingBottom: 10, gap: 16, marginBottom: 32 },
    peerItem: { alignItems: 'center', width: 70 },
    peerAvatar: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: 8, position: 'relative' },
    peerAvatarText: { fontSize: 18, fontWeight: '900' },
    onlineStatus: { position: 'absolute', bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', borderWidth: 2, borderColor: '#FFF' },
    peerName: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
    storiesGrid: { gap: 8 },
    fabContainer: { position: 'absolute', bottom: 30, right: 20 },
    fab: { 
        width: 64, 
        height: 64, 
        borderRadius: 32, 
        justifyContent: 'center', 
        alignItems: 'center',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10
    }
});
