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
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { 
    Search, 
    Filter, 
    Calendar, 
    Clock, 
    Heart, 
    FileText, 
    Trophy, 
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    Quote
} from 'lucide-react-native';
import Animated, { 
    FadeInUp, 
    Layout,
    FadeInRight
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import activityService, { ActivityItem } from '../../src/services/activityService';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const getActivityColor = (type: string) => {
    switch (type) {
        case 'MOOD': return '#6366F1';
        case 'JOURNAL': return '#10B981';
        case 'ASSESSMENT': return '#F59E0B';
        case 'CHALLENGE': return '#EC4899';
        default: return '#9CA3AF';
    }
};

const getActivityIcon = (type: string) => {
    switch (type) {
        case 'MOOD': return Heart;
        case 'JOURNAL': return Quote;
        case 'ASSESSMENT': return FileText;
        case 'CHALLENGE': return Trophy;
        default: return Calendar;
    }
};

export default function ActivityScreen() {
    const { colors, isDark } = useTheme();
    const router = useRouter();
    const [feed, setFeed] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchFeed = async () => {
        try {
            const data = await activityService.getUnifiedFeed();
            setFeed(data);
        } catch (error) {
            console.error('Failed to fetch activity feed:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFeed();
    }, []);

    if (loading) {
        return (
            <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.textSecondary }]}>Archiving your resilience...</Text>
            </View>
        );
    }

    const renderItem = ({ item, index }: { item: ActivityItem, index: number }) => {
        const Icon = getActivityIcon(item.type);
        const color = getActivityColor(item.type);

        return (
            <Animated.View 
                entering={FadeInUp.delay(200 + (index * 100))}
                layout={Layout.springify()}
            >
                <TouchableOpacity 
                    style={[styles.itemCard, { backgroundColor: colors.card, borderColor: colors.border }]}
                    onPress={() => {}}
                >
                    <View style={styles.itemHeader}>
                        <View style={[styles.iconBg, { backgroundColor: color + '15' }]}>
                            <Icon size={18} color={color} />
                        </View>
                        <View style={styles.itemInfo}>
                            <Text style={[styles.itemTitle, { color: colors.text }]}>{item.title}</Text>
                            <View style={styles.timeRow}>
                                <Clock size={10} color={colors.textSecondary} />
                                <Text style={[styles.itemTime, { color: colors.textSecondary }]}>
                                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </Text>
                            </View>
                        </View>
                        <ChevronRight size={18} color={colors.textSecondary} />
                    </View>
                    
                    <Text style={[styles.itemDesc, { color: colors.textSecondary }]} numberOfLines={2}>
                        {item.description}
                    </Text>

                    {item.tags && item.tags.length > 0 && (
                        <View style={styles.tagRow}>
                            {item.tags.map(tag => (
                                <View key={tag} style={[styles.tag, { backgroundColor: colors.border }]}>
                                    <Text style={[styles.tagText, { color: colors.textSecondary }]}>#{tag.toUpperCase()}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        );
    };

    return (
        <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <View>
                    <Text style={[styles.title, { color: colors.text }]}>Unified <Text style={{ fontStyle: 'italic' }}>Timeline.</Text></Text>
                    <Text style={[styles.tagline, { color: colors.textSecondary }]}>JOURNAL • TRACKER • REPOSITORY</Text>
                </View>
                <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Calendar size={18} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* Search and Filters */}
            <View style={styles.controls}>
                <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Search size={18} color={colors.textSecondary} />
                    <TextInput 
                        placeholder="Search history..." 
                        placeholderTextColor={colors.textSecondary}
                        style={[styles.searchInput, { color: colors.text }]}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={[styles.filterBtn, { backgroundColor: colors.primary }]}>
                    <Filter size={18} color="#FFF" />
                </TouchableOpacity>
            </View>

            {/* Quick Insights Strip */}
            <View style={styles.insightsStrip}>
                <Animated.View entering={FadeInRight.delay(400)} style={[styles.insightCard, { backgroundColor: '#6366F1' + '10' }]}>
                    <TrendingUp size={14} color="#6366F1" />
                    <Text style={[styles.insightText, { color: '#6366F1' }]}>STABLE TRENDS</Text>
                </Animated.View>
                <Animated.View entering={FadeInRight.delay(600)} style={[styles.insightCard, { backgroundColor: '#10B981' + '10' }]}>
                    <FileText size={14} color="#10B981" />
                    <Text style={[styles.insightText, { color: '#10B981' }]}>12 JOURNAL ENTRIES</Text>
                </Animated.View>
            </View>

            <FlatList
                data={feed}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={{ color: colors.textSecondary }}>NO RECOLLECTIONS FOUND</Text>
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
    tagline: { fontSize: 10, fontWeight: '900', letterSpacing: 1.5, marginTop: 4, opacity: 0.6 },
    iconButton: { 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        borderWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    controls: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 20 },
    searchBar: { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 12, 
        borderRadius: 16, 
        borderWidth: 1, 
        gap: 12 
    },
    searchInput: { flex: 1, fontSize: 14, fontWeight: '600' },
    filterBtn: { width: 50, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
    insightsStrip: { flexDirection: 'row', gap: 12, paddingHorizontal: 20, marginBottom: 24 },
    insightCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, gap: 8 },
    insightText: { fontSize: 9, fontWeight: '900', letterSpacing: 1 },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    itemCard: { padding: 20, borderRadius: 24, borderWidth: 1, marginBottom: 16 },
    itemHeader: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    iconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    itemInfo: { flex: 1 },
    itemTitle: { fontSize: 16, fontWeight: '900' },
    timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
    itemTime: { fontSize: 10, fontWeight: '700' },
    itemDesc: { fontSize: 13, fontWeight: '500', lineHeight: 20 },
    tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
    tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
    tagText: { fontSize: 8, fontWeight: '900', letterSpacing: 1 },
    emptyContainer: { paddingVertical: 100, alignItems: 'center' }
});
