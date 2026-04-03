import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Activity, ArrowUpRight, TrendingUp } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 48;

export const ActivityFlowCard = () => {
  const { colors, isDark } = useTheme();

  const data = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        data: [3, 4, 3.5, 5, 4.5, 4, 4.8],
        color: (opacity = 1) => colors.primary || `rgba(59, 130, 246, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: isDark ? '#1F2937' : '#FFFFFF',
    backgroundGradientTo: isDark ? '#111827' : '#F9FAFB',
    backgroundColor: isDark ? '#111827' : '#FFFFFF',
    color: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity * 0.5})` : `rgba(0, 0, 0, ${opacity * 0.3})`,
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity * 0.5})` : `rgba(0, 0, 0, ${opacity * 0.4})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: colors.primary,
    },
    decimalPlaces: 1,
  };

  return (
    <View style={styles.container}>
      <BlurView
        intensity={isDark ? 40 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[styles.card, { borderColor: colors.border, backgroundColor: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)' }]}
      >
        <View style={styles.header}>
          <View>
            <Text style={[styles.title, { color: colors.text }]}>Activity Flow</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Weekly Trajectory</Text>
          </View>
          <View style={styles.headerActions}>
            <View style={[styles.badge, { backgroundColor: colors.primary + '15' }]}>
              <Activity size={12} color={colors.primary} />
              <Text style={[styles.badgeText, { color: colors.primary }]}>12 Logs</Text>
            </View>
            <TouchableOpacity style={styles.iconButton}>
              <ArrowUpRight size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={data}
            width={CHART_WIDTH - 16}
            height={180}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={true}
          />
        </View>

        <View style={styles.footer}>
          <TrendingUp size={16} color="#10B981" />
          <Text style={[styles.footerText, { color: '#10B981' }]}>
            +15% resilience score this week
          </Text>
        </View>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  card: {
    borderRadius: 32,
    padding: 20,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginLeft: -16,
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
