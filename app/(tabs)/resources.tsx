import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { BookOpen, Phone, MapPin, Globe, ExternalLink, GraduationCap, ShieldAlert } from 'lucide-react-native';

import { BlurView } from 'expo-blur';

interface ResourceItem {
  name: string;
  desc: string;
  icon: any;
  contact?: string;
  priority?: boolean;
  type?: string;
}

interface ResourceSection {
  category: string;
  items: ResourceItem[];
}

export default function Resources() {
  const { colors, isDark } = useTheme();

  const resources: ResourceSection[] = [
    { 
      category: 'University Support',
      items: [
        { name: 'Counseling Center', desc: 'Free professional counseling for students.', icon: GraduationCap, contact: '030 123 4567' },
        { name: 'Wellness Workshops', desc: 'Weekly group sessions on stress management.', icon: BookOpen, contact: 'Visit Hall B' },
      ]
    },
    {
      category: 'Emergency Help',
      items: [
        { name: 'Crisis Helpline', desc: '24/7 immediate emotional support.', icon: Phone, contact: '0800 123 456', priority: true },
        { name: 'Campus Security', desc: 'For immediate physical safety concerns.', icon: ShieldAlert, contact: 'Ext 999' },
      ]
    },
    {
      category: 'Digital Library',
      items: [
        { name: 'Mindfulness Basics', desc: 'Introduction to daily meditation.', icon: Globe, type: 'Article' },
        { name: 'Sleep Hygiene', desc: 'How to improve your rest cycles.', icon: Globe, type: 'Guide' },
      ]
    }
  ];


  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Library & Resources</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your guide to wellness and support</Text>
        </View>

        {resources.map((section, sIndex) => (
          <View key={sIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{section.category}</Text>
            {section.items.map((item, iIndex) => (
              <TouchableOpacity key={iIndex} activeOpacity={0.8} style={styles.cardWrapper}>
                <BlurView
                  intensity={isDark ? 30 : 50}
                  tint={isDark ? 'dark' : 'light'}
                  style={[
                    styles.card, 
                    { borderColor: item.priority ? '#EF4444' + '40' : colors.border },
                    item.priority && { backgroundColor: '#EF4444' + '05' }
                  ]}
                >
                  <View style={[styles.iconContainer, { backgroundColor: item.priority ? '#EF444415' : colors.primary + '15' }]}>
                    <item.icon size={24} color={item.priority ? '#EF4444' : colors.primary} />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={[styles.cardTitle, { color: colors.text }]}>{item.name}</Text>
                    <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>{item.desc}</Text>
                    {item.contact && (
                      <Text style={[styles.contactText, { color: item.priority ? '#EF4444' : colors.primary }]}>
                        {item.contact}
                      </Text>
                    )}
                  </View>
                  <ExternalLink size={18} color={colors.textSecondary} />
                </BlurView>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', letterSpacing: -1 },
  subtitle: { fontSize: 16, marginTop: 4 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 14, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16 },
  cardWrapper: { marginBottom: 12, borderRadius: 20, overflow: 'hidden' },
  card: { padding: 16, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: 20 },
  iconContainer: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 2 },
  cardDesc: { fontSize: 13, fontWeight: '500', marginBottom: 4 },
  contactText: { fontSize: 12, fontWeight: '800' },
});
