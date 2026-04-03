import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { Heart, MessageCircle, Share2, Quote } from 'lucide-react-native';
import { Story } from '../../services/socialService';
import { BlurView } from 'expo-blur';

interface StoryCardProps {
    story: Story;
    onPress: () => void;
    isDark: boolean;
}

export const StoryCard = ({ story, onPress, isDark }: StoryCardProps) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.card, 
                { backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : '#F9FAFB', borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)' }
            ]}
        >
            <View style={styles.quoteIcon}>
                <Quote size={24} color={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} />
            </View>
            
            <View style={styles.tagRow}>
                {story.tags.slice(0, 2).map(tag => (
                    <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag.toUpperCase()}</Text>
                    </View>
                ))}
            </View>

            <Text style={[styles.title, { color: isDark ? '#FFF' : '#111827' }]}>{story.title}</Text>
            <Text style={[styles.excerpt, { color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }]} numberOfLines={3}>
                {story.excerpt}
            </Text>

            <View style={styles.footer}>
                <View style={styles.authorRow}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{story.author[0]}</Text>
                    </View>
                    <Text style={[styles.author, { color: isDark ? '#FFF' : '#374151' }]}>{story.author}</Text>
                    <View style={styles.verifiedBadge} />
                </View>
                
                <View style={styles.stats}>
                    <View style={styles.statItem}>
                        <Heart size={14} color="#EF4444" fill={story.likes > 50 ? "#EF4444" : "transparent"} />
                        <Text style={[styles.statValue, { color: isDark ? '#FFF' : '#111827' }]}>{story.likes}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { 
        padding: 24, 
        borderRadius: 32, 
        borderWidth: 1, 
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden'
    },
    quoteIcon: { position: 'absolute', top: 20, right: 20 },
    tagRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: 'rgba(99, 102, 241, 0.1)' },
    tagText: { fontSize: 8, fontWeight: '900', color: '#6366F1', letterSpacing: 1 },
    title: { fontSize: 20, fontWeight: '900', marginBottom: 12, letterSpacing: -0.5 },
    excerpt: { fontSize: 14, fontWeight: '500', lineHeight: 22, marginBottom: 20 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    authorRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    avatarPlaceholder: { 
        width: 28, 
        height: 28, 
        borderRadius: 14, 
        backgroundColor: '#6366F1', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    avatarText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
    author: { fontSize: 13, fontWeight: '800' },
    verifiedBadge: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginLeft: -4, marginTop: -10 },
    stats: { flexDirection: 'row', gap: 16 },
    statItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statValue: { fontSize: 12, fontWeight: '800' }
});
