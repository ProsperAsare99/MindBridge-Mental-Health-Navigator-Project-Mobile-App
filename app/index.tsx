import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

export default function Home() {
  const { colors, theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>MindBridge</Text>
      <Text style={[styles.subtitle, { color: colors.primary }]}>
        Adaptive Mode: {theme.toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 8,
  },
});
