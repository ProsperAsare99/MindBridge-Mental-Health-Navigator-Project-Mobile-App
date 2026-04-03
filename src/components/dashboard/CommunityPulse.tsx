import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Users, ArrowUpRight } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export const CommunityPulse = () => {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.container}>
      <LinearGradient
        colors={[colors.primary, '#8B5CF6']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <View style={styles.iconContainer}>
              <Users size={24} color="#FFF" />
            </View>
            <View>
              <Text style={styles.title}>Community Pulse</Text>
              <Text style={styles.subtitle}>ANONYMOUS PEER SUPPORT</Text>
            </View>
          </View>
          <ArrowUpRight size={22} color="#FFF" />
        </View>

        <Text style={styles.description}>
          Join support circles and share your resilience journey anonymously with peers who understand.
        </Text>

        <View style={styles.footer}>
          <View style={styles.avatarGroup}>
            {[1, 2, 3].map((i) => (
              <View 
                key={i} 
                style={[
                  styles.avatar, 
                  { 
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    marginLeft: i === 1 ? 0 : -8,
                    borderColor: colors.primary,
                    borderWidth: 1.5
                  }
                ]} 
              />
            ))}
          </View>
          <Text style={styles.statsText}>124 Peers Online</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  gradient: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.8)',
    letterSpacing: 1,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    lineHeight: 20,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarGroup: {
    flexDirection: 'row',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  statsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
});
