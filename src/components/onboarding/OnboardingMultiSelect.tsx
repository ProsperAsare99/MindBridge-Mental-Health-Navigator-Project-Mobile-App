import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Platform 
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor,
  useDerivedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface MultiSelectOption {
  label: string;
  value: string;
  icon?: LucideIcon;
}

interface OnboardingMultiSelectProps {
  options: MultiSelectOption[];
  selectedValues: string[];
  onToggle: (value: string) => void;
  maxSelections?: number;
}

export default function OnboardingMultiSelect({ 
  options, 
  selectedValues, 
  onToggle, 
  maxSelections 
}: OnboardingMultiSelectProps) {
  
  return (
    <View style={styles.grid}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);
        const isDisabled = maxSelections ? (selectedValues.length >= maxSelections && !isSelected) : false;
        const Icon = option.icon;

        return (
          <OptionCard 
            key={option.value}
            option={option}
            selected={isSelected}
            disabled={isDisabled}
            onPress={() => onToggle(option.value)}
            Icon={Icon}
          />
        );
      })}
    </View>
  );
}

function OptionCard({ option, selected, disabled, onPress, Icon }: any) {
  const progress = useDerivedValue(() => {
    return selected ? withSpring(1) : withSpring(0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      borderColor: interpolateColor(
        progress.value,
        [0, 1],
        ['rgba(0,0,0,0.05)', '#996515']
      ),
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['#ffffff', 'rgba(153, 101, 21, 0.05)']
      ),
      transform: [{ scale: withSpring(selected ? 1.02 : 1) }],
      opacity: disabled ? 0.3 : 1
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [0, 1],
        ['#4b5563', '#996515']
      ),
      fontWeight: selected ? '700' : '600' as any
    };
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress}
      disabled={disabled}
      style={styles.cardWrapper}
    >
      <Animated.View style={[styles.card, animatedStyle]}>
        {Icon && (
          <View style={styles.iconContainer}>
            <Icon size={24} color={selected ? '#996515' : 'rgba(0,0,0,0.3)'} />
          </View>
        )}
        <Animated.Text style={[styles.label, textStyle]}>
          {option.label}
        </Animated.Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  cardWrapper: {
    width: '48%', // More robust than manual calculation for grid
    marginBottom: 12,
  },
  card: {
    padding: 20,
    borderRadius: 24,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 110,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
