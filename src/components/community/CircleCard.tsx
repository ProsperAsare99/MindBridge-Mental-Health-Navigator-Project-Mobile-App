import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { Users, ShieldCheck } from 'lucide-react-native';
import { Circle } from '../../services/socialService';

interface CircleCardProps {
    circle: Circle;
    onPress: () => void;
    isDark: boolean;
}

export const CircleCard = ({ circle, onPress, isDark }: CircleCardProps) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.card, 
                { backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#FFF', borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
            ]}
        >
            <View style={styles.header}>
                <View style={[styles.iconContainer, { backgroundColor: '#6366F1' + '20' }]}>
                    <Users size={18} color="#6366F1" />
                </View>
                <View style={styles.memberBadge}>
                    <Text style={styles.memberText}>{circle.memberCount} MEMBERS</Text>
                </View>
            </View>
            
            <Text style={[styles.name, { color: isDark ? '#FFF' : '#1A1A1A' }]}>{circle.name}</Text>
            <Text style={[styles.desc, { color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }]} numberOfLines={2}>
                {circle.description}
            </Text>
            
            <View style={styles.footer}>
                <View style={styles.privacyRow}>
                    <ShieldCheck size={10} color="#10B981" />
                    <Text style={[styles.privacyText, { color: '#10B981' }]}>ANONYMOUS</Text>
                </View>
                <Text style={[styles.lastActive, { color: isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }]}>
                    {circle.lastActive}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: { 
        width: 240, 
        padding: 20, 
        borderRadius: 24, 
        borderWidth: 1,
        marginRight: 16,
        justifyContent: 'space-between',
        height: 180
    },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    iconContainer: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
    memberBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: 'rgba(0,0,0,0.03)' },
    memberText: { fontSize: 8, fontWeight: '900', opacity: 0.4 },
    name: { fontSize: 18, fontWeight: '900', marginBottom: 6 },
    desc: { fontSize: 13, fontWeight: '500', lineHeight: 18 },
    footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
    privacyRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    privacyText: { fontSize: 9, fontWeight: '900' },
    lastActive: { fontSize: 9, fontWeight: '700' }
});
