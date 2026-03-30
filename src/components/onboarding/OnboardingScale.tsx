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
    paddingVertical: 12,
  },
  track: {
    flexDirection: 'row',
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(153, 101, 21, 0.1)',
  },
  itemWrapper: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundedFirst: {
    borderTopLeftRadius: 32,
    borderBottomLeftRadius: 32,
  },
  roundedLast: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
  },
  item: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 24,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
  labelContainer: {
    marginTop: 12,
    alignItems: 'center',
  },
  activeLabel: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 2,
    opacity: 0.8,
  },
});
