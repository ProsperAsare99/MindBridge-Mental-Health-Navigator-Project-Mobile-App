import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import { BarChart2, TrendingUp, Activity, PieChart } from 'lucide-react-native';
import { StatCard } from '../../src/components/dashboard/StatCard';
import { LineChart } from 'react-native-chart-kit';

const { width } = Dimensions.get('window');

const hexToRGBA = (hex: string, opacity: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default function Analytics() {
  const { colors, isDark } = useTheme();

  const chartConfig = {
    backgroundColor: colors.background,
    backgroundGradientFrom: colors.card,
    backgroundGradientTo: colors.card,
    decimalPlaces: 1,
    color: (opacity = 1) => hexToRGBA(colors.primary, opacity),
    labelColor: (opacity = 1) => isDark ? `rgba(255, 255, 255, ${opacity})` : `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: colors.primary
    }
  };


  const moodData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [7, 6.5, 8, 7.5, 9, 8.5, 8],
        color: (opacity = 1) => colors.primary,
        strokeWidth: 3
      }
    ],
    legend: ["Mood Index"]
  };

  return (
    <SafeAreaView edges={['top']} style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Wellness Insights</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Your mental health trajectory</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard 
            title="Mood Score" 
            value="7.8" 
            icon={TrendingUp} 
            trend="+0.4" 
            trendUp={true} 
            color="#10B981"
          />
          <StatCard 
            title="Log Frequency" 
            value="Daily" 
            icon={Activity} 
            trend="Consistent" 
            trendUp={true}
            color="#3B82F6"
          />
        </View>

        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.chartHeader}>
            <BarChart2 size={20} color={colors.primary} />
            <Text style={[styles.chartTitle, { color: colors.text }]}>Mood Trajectory</Text>
          </View>
          
          <LineChart
            data={moodData}
            width={width - 80}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={[styles.chartCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.chartHeader}>
            <PieChart size={20} color={colors.secondary} />
            <Text style={[styles.chartTitle, { color: colors.text }]}>Activity Distribution</Text>
          </View>
          <View style={styles.placeholderChart}>
            <Text style={{ color: colors.textSecondary, fontWeight: '700' }}>Sleep vs Stress Correlation</Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12, marginTop: 4 }}>Log 3 more days for analysis</Text>
          </View>
        </View>
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
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  chartCard: { padding: 20, borderRadius: 24, borderWidth: 1, marginBottom: 20, overflow: 'hidden' },
  chartHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
  chartTitle: { fontSize: 18, fontWeight: '700' },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    marginLeft: -10,
  },
  placeholderChart: { height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 16 },
});
