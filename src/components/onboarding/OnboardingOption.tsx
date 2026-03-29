import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  View, 
  Platform 
} from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor,
  useDerivedValue
} from 'react-native-reanimated';

interface OnboardingOptionProps {
  label: string;
  selected: boolean;
  onSelect: () => void;
}

export default function OnboardingOption({ label, selected, onSelect }: OnboardingOptionProps) {
  // Animation for the selection color shift
  const progress = useDerivedValue(() => {
    return selected ? withSpring(1) : withSpring(0);
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ['rgba(0,0,0,0.05)', '#2563eb']
    );

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#ffffff', 'rgba(37, 99, 235, 0.05)']
    );

    return {
      borderColor,
      backgroundColor,
      transform: [{ scale: withSpring(selected ? 1.02 : 1) }]
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ['#1f2937', '#1d4ed8']
    );

    return {
      color,
      fontWeight: selected ? '700' : '600' as any
    };
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      onPress={onSelect}
      style={styles.pressable}
    >
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {label}
        </Animated.Text>
        
        {selected ? (
          <Animated.View style={styles.iconContainer}>
            <CheckCircle2 size={24} color="#2563eb" fill="rgba(37, 99, 235, 0.1)" />
          </Animated.View>
        ) : (
          <View style={styles.radioPlaceholder} />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pressable: {
    width: '100%',
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  label: {
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.05)',
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
});
