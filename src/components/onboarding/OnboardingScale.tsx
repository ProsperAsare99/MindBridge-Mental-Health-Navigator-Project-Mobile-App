import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions, 
  Platform 
} from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withSpring, 
  interpolateColor,
  useDerivedValue
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface OnboardingScaleProps {
  options: { label: string; value: number; emoji?: string }[];
  selectedValue: number;
  onSelect: (value: number) => void;
  activeColor?: string;
}

export default function OnboardingScale({ 
  options, 
  selectedValue, 
  onSelect,
  activeColor = '#f59e0b' // Default to Amber
}: OnboardingScaleProps) {
  
  return (
    <View style={styles.container}>
      <View style={styles.track}>
        {options.map((option, index) => {
          const isSelected = selectedValue === option.value;
          return (
            <ScaleItem 
              key={option.value}
              option={option}
              selected={isSelected}
              onPress={() => onSelect(option.value)}
              activeColor={activeColor}
              isFirst={index === 0}
              isLast={index === options.length - 1}
            />
          );
        })}
      </View>
      
      {/* Dynamic Label Display */}
      <View style={styles.labelContainer}>
        {options.find(o => o.value === selectedValue) && (
          <Text style={[styles.activeLabel, { color: activeColor }]}>
            {options.find(o => o.value === selectedValue)?.label}
          </Text>
        )}
      </View>
    </View>
  );
}

function ScaleItem({ option, selected, onPress, activeColor, isFirst, isLast }: any) {
  const progress = useDerivedValue(() => {
    return selected ? withSpring(1) : withSpring(0);
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ['rgba(0,0,0,0.05)', activeColor]
      ),
      transform: [{ scale: withSpring(selected ? 1.15 : 1) }],
    };
  });

  const emojiStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolateColor(
        progress.value,
        [0, 1],
        ['#9ca3af', '#ffffff']
      ) as any, // simplify
    };
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={onPress}
      style={[
        styles.itemWrapper,
        isFirst && styles.roundedFirst,
        isLast && styles.roundedLast
      ]}
    >
      <Animated.View style={[styles.item, animatedStyle]}>
        {option.emoji ? (
          <Text style={[styles.emoji, { opacity: selected ? 1 : 0.4 }]}>{option.emoji}</Text>
        ) : (
          <Text style={[styles.value, { color: selected ? '#fff' : '#6b7280' }]}>{option.value}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  track: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  itemWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedFirst: {
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  roundedLast: {
    borderTopRightRadius: 28,
    borderBottomRightRadius: 28,
  },
  item: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  value: {
    fontSize: 16,
    fontWeight: '800',
  },
  labelContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  activeLabel: {
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
