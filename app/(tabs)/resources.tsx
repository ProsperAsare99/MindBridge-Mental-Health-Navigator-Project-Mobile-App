import React, { useEffect, useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions,
    TextInput,
    Image,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    Search, 
    BookOpen, 
    Play, 
    PenTool, 
    Clock, 
    ChevronRight, 
    Filter,
    Bookmark,
    ChevronLeft,
    Sparkles,
    Star
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
import resourceService, { Resource } from '../../src/services/resourceService';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const DUMMY_RESOURCES: Resource[] = [
    { id: '1', title: 'Cognitive Reframing for Exam Stress', category: 'ARTICLE', tags: ['EXAMS', 'ANXIETY'], readTime: '5 MIN', description: 'Practical techniques to shift your perspective during finals week.' },
    { id: '2', title: 'Mindful Breathing Guide', category: 'VIDEO', tags: ['ZEN', 'RECOVERY'], readTime: '8 MIN', description: 'A follow-along video for deep relaxation and grounding.' },
    { id: '3', title: 'Sleep Optimization Tool', category: 'TOOL', tags: ['SLEEP', 'ROUTINE'], readTime: '3 MIN', description: 'An interactive ritual builder for better nocturnal recovery.' },
    { id: '4', title: 'Social Anxiety De-escalation', category: 'EXERCISE', tags: ['SOCIAL', 'PRACTICE'], readTime: '10 MIN', description: 'Safe exercises to navigate social burnout and networking.' }
];

const CATEGORIES = ['ALL', 'ARTICLES', 'TOOLS', 'VIDEOS', 'EXERCISES'];

export default function ResourceHubScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [resources, setResources] = useState<Resource[]>(DUMMY_RESOURCES);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            const data = await resourceService.getAll();
            if (data.length > 0) setResources(data);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredResources = resources.filter(res => {
        const matchesCategory = activeCategory === 'ALL' || res.category + 'S' === activeCategory;
        const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Curating your library...</Text>
            </View>
        );
    }

    const renderResource = ({ item, index }: { item: Resource, index: number }) => {
        const Icon = item.category === 'VIDEO' ? Play : item.category === 'TOOL' ? PenTool : BookOpen;

        return (
            <Animated.View 
                entering={FadeInUp.delay(400 + (index * 100))}
                layout={Layout.springify()}
            >
                <TouchableOpacity 
                    style={[styles.resourceCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                >
                    <View style={styles.cardInfo}>
                        <View style={[styles.categoryBadge, { backgroundColor: colors.primary + '10' }]}>
                            <Text style={[styles.categoryText, { color: colors.primary }]}>{item.category}</Text>
                        </View>
                        <Text style={[styles.resTitle, { color: colors.text }]}>{item.title}</Text>
                        <Text style={[styles.resDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                            {item.description}
                        </Text>
                        <View style={styles.metaRow}>
                            <View style={styles.metaItem}>
                                <Clock size={12} color={colors.textSecondary} />
                                <Text style={[styles.metaText, { color: colors.textSecondary }]}>{item.readTime}</Text>
                            </View>
                            <View style={styles.metaItem}>
                                <Star size={12} color="#F59E0B" />
                                <Text style={[styles.metaText, { color: colors.textSecondary }]}>RECOMMENDED</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.iconContainer, { backgroundColor: colors.border }]}>
                        <Icon size={24} color={colors.primary} />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            
            {/* Header */}
            <View style={styles.header}>
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>Wellness <Text style={styles.italic}>Library.</Text></Text>
                    <Text style={[styles.tagline, { color: colors.textSecondary }]}>ARTICLES • TOOLS • GUIDED RECOVERY</Text>
                </View>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Bookmark size={18} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Search & Categories */}
            <View style={styles.controls}>
                <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Search size={18} color={colors.textSecondary} />
                    <TextInput 
                        placeholder="Search collective wisdom..." 
                        placeholderTextColor={colors.textSecondary}
                        style={[styles.searchInput, { color: colors.text }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.categoryPills}
                >
                    {CATEGORIES.map((cat, i) => (
                        <TouchableOpacity 
                            key={cat} 
                            onPress={() => setActiveCategory(cat)}
                            style={[
                                styles.pill, 
                                { backgroundColor: activeCategory === cat ? colors.primary : colors.card, borderColor: colors.border }
                            ]}
                        >
                            <Text style={[styles.pillText, { color: activeCategory === cat ? '#FFF' : colors.textSecondary }]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredResources}
                renderItem={renderResource}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    activeCategory === 'ALL' && !searchQuery ? (
                        <Animated.View entering={FadeInUp.delay(200)} style={styles.featuredSection}>
                            <View style={styles.sectionHeader}>
                                <Sparkles size={16} color={colors.primary} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>CURATED FOR YOUR PULSE</Text>
                            </View>
                            <TouchableOpacity style={[styles.featuredCard, { backgroundColor: colors.primary }]}>
                                <LinearGradient
                                    colors={['rgba(255,255,255,0.2)', 'transparent']}
                                    style={StyleSheet.absoluteFill}
                                />
                                <Text style={styles.featuredTitle}>The Anatomy of Academic Resilience</Text>
                                <Text style={styles.featuredDesc}>Based on your recent pulse, we recommend this guide to semesters of growth.</Text>
                                <View style={styles.featuredFooter}>
                                    <View style={styles.featMeta}>
                                        <Clock size={12} color="#FFF" />
                                        <Text style={styles.featText}>12 MIN READ</Text>
                                    </View>
                                    <View style={styles.featGo}>
                                        <Text style={styles.featGoText}>READ NOW</Text>
                                        <ChevronRight size={14} color="#FFF" />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={[styles.sectionHeader, { marginTop: 24 }]}>
                                <BookOpen size={16} color={colors.primary} />
                                <Text style={[styles.sectionTitle, { color: colors.text }]}>THE COMPLETE ARCHIVE</Text>
                            </View>
                        </Animated.View>
                    ) : null
                }
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={{ color: colors.textSecondary }}>NO RESOURCES FOUND</Text>
                    </View>
                }
            />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
    loadingText: { fontSize: 10, fontWeight: '900', letterSpacing: 2, textTransform: 'uppercase' },
    header: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        marginBottom: 24,
        marginTop: 10
    },
    title: { fontSize: 32, fontWeight: '900', letterSpacing: -1.5 },
    italic: { fontStyle: 'italic' },
    tagline: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginTop: 4, opacity: 0.6 },
    iconButton: { 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    controls: { gap: 16, marginBottom: 24 },
    searchBar: { 
        marginHorizontal: 20, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderRadius: 16, 
        borderWidth: 1, 
        gap: 12 
    },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '600' },
    categoryPills: { paddingHorizontal: 20, gap: 10, paddingBottom: 4 },
    pill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1 },
    pillText: { fontSize: 11, fontWeight: '900', letterSpacing: 1 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    featuredSection: { marginBottom: 8 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16, paddingHorizontal: 4 },
    sectionTitle: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, opacity: 0.6 },
    featuredCard: { padding: 32, borderRadius: 32, overflow: 'hidden' },
    featuredTitle: { color: '#FFF', fontSize: 24, fontWeight: '900', marginBottom: 12 },
    featuredDesc: { color: 'rgba(255,255,255,0.8)', fontSize: 14, fontWeight: '500', lineHeight: 20, marginBottom: 24 },
    featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    featMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    featText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    featGo: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    featGoText: { color: '#FFF', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
    resourceCard: { padding: 20, borderRadius: 28, borderWidth: 1, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 16 },
    cardInfo: { flex: 1, gap: 4 },
    categoryBadge: { alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    categoryText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    resTitle: { fontSize: 16, fontWeight: '900' },
    resDesc: { fontSize: 12, fontWeight: '500', opacity: 0.5, lineHeight: 18 },
    metaRow: { flexDirection: 'row', gap: 16, marginTop: 12 },
    metaItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    metaText: { fontSize: 9, fontWeight: '800' },
    iconContainer: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    emptyContainer: { paddingVertical: 100, alignItems: 'center' }
});
