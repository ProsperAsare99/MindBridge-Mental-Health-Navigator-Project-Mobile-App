import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { ClipboardCheck, Sparkles, HeartPulse, Brain } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

export default function Assessment() {
  const { colors, isDark } = useTheme();

  const assessments = [
    { title: 'Daily Check-in', desc: 'How are you feeling right now?', icon: HeartPulse, time: '2 mins' },
    { title: 'Wellness Audit', desc: 'Weekly deep-dive into your habits.', icon: Sparkles, time: '5 mins' },
    { title: 'Stress Screen', desc: 'Identify your current stress levels.', icon: Brain, time: '3 mins' },
  ];

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Assessments</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Understand your mental landscape</Text>
        </View>

        {assessments.map((item, index) => (
          <TouchableOpacity key={index} activeOpacity={0.8} style={styles.cardWrapper}>
            <BlurView
              intensity={isDark ? 40 : 60}
              tint={isDark ? 'dark' : 'light'}
              style={[styles.card, { borderColor: colors.border }]}
            >
              <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
                <item.icon size={28} color={colors.primary} />
              </View>
              <View style={styles.textContainer}>
                <View style={styles.cardHeader}>
                  <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
                  <View style={[styles.timeTag, { backgroundColor: colors.secondary + '15' }]}>
                    <Text style={[styles.timeText, { color: colors.secondary }]}>{item.time}</Text>
                  </View>
                </View>
                <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
              </View>
            </BlurView>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  subtitle: { fontSize: 16, marginTop: 4 },
  cardWrapper: { marginBottom: 20, borderRadius: 24, overflow: 'hidden' },
  card: { padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 24 },
  iconContainer: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: '700' },
  timeTag: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  timeText: { fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  cardDesc: { fontSize: 14, fontWeight: '500' },
});
