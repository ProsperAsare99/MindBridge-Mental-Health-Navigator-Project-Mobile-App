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
      ['rgba(0,0,0,0.05)', '#996515']
    );

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#ffffff', 'rgba(153, 101, 21, 0.05)']
    );

    return {
      borderColor,
      backgroundColor,
      transform: [{ scale: withSpring(selected ? 1.01 : 1) }]
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ['#2D3436', '#996515']
    );

    return {
      color,
      fontWeight: selected ? '700' : '500' as any
    };
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onSelect}
      style={styles.pressable}
    >
      <Animated.View style={[styles.container, animatedContainerStyle]}>
        <Animated.Text style={[styles.label, animatedTextStyle]}>
          {label}
        </Animated.Text>
        
        {selected ? (
          <Animated.View style={styles.iconContainer}>
            <CheckCircle2 size={24} color="#996515" fill="rgba(153, 101, 21, 0.1)" />
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
    marginBottom: 16,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 24,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 1.5,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
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
