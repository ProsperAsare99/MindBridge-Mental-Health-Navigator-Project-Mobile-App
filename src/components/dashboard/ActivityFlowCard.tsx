import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Activity, ArrowUpRight, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export const ActivityFlowCard = () => {
  const { colors, isDark } = useTheme();

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [3, 4, 2, 5, 4, 3, 5],
        color: (opacity = 1) => colors.primary,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '5',
      strokeWidth: '2',
      stroke: colors.card,
    },
    propsForBackgroundLines: {
      strokeDasharray: '', // solid background lines
      stroke: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    },
  };

  return (
    <Animated.View 
      entering={FadeInUp.delay(200).duration(800)}
      style={styles.container}
    >
      <BlurView
        intensity={isDark ? 40 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.card,
          {
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.7)',
          }
        ]}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Activity Flow</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>YOUR WEEKLY TRAJECTORY</Text>
          </View>
          <View style={styles.statsBadge}>
            <Activity size={12} color={colors.textSecondary} strokeWidth={3} />
            <Text style={[styles.statsText, { color: colors.textSecondary }]}>12 LOGS</Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={width - 80}
            height={180}
            chartConfig={chartConfig}
            bezier
            withDots={true}
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLines={false}
            withHorizontalLines={true}
            style={styles.chart}
          />
        </View>

        <TouchableOpacity style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.primary }]}>Deep Dive Analysis</Text>
          <ArrowUpRight size={16} color={colors.primary} strokeWidth={3} />
        </TouchableOpacity>

        <View style={styles.backgroundIcon}>
          <TrendingUp size={120} color={isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} />
        </View>
      </BlurView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  card: {
    borderRadius: 32,
    padding: 24,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginTop: 2,
  },
  statsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statsText: {
    fontSize: 10,
    fontWeight: '800',
  },
  chartContainer: {
    alignItems: 'center',
    marginLeft: -15,
  },
  chart: {
    borderRadius: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
