import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList, 
  TouchableWithoutFeedback 
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { BlurView } from 'expo-blur';
import Animated, { 
  FadeIn, 
  FadeOut, 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  FadeInLeft,
  ZoomIn,
  ZoomOut
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  label: string;
  options: Option[];
  value: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

export default function CustomSelect({ 
  label, 
  options, 
  value, 
  onSelect, 
  placeholder = "Select an option",
  required = false 
}: CustomSelectProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find(opt => opt.value === value);

  // Chevron rotation animation
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withTiming(modalVisible ? 180 : 0, { duration: 250 });
  }, [modalVisible]);

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }]
    };
  });

  const handleSelect = (val: string) => {
    Haptics.selectionAsync();
    onSelect(val);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label} {required && <Text style={styles.required}>*</Text>}
      </Text>
      
      <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.selectTrigger, modalVisible && styles.selectTriggerActive]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setModalVisible(true);
        }}
      >
        <Text style={[styles.selectText, !selectedOption && styles.placeholderText]}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Animated.View style={chevronStyle}>
          <ChevronDown size={20} color={modalVisible ? "#4f46e5" : "#6b7280"} />
        </Animated.View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <Animated.View 
              entering={FadeIn.duration(250)} 
              exiting={FadeOut.duration(200)}
              style={StyleSheet.absoluteFillObject}
            >
              <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFillObject} />
            </Animated.View>

            <TouchableWithoutFeedback>
              {/* Premium Scale/Fade entry matching the user's web snippet request */}
              <Animated.View 
                entering={ZoomIn.duration(300).springify().damping(18).stiffness(150)} 
                exiting={ZoomOut.duration(200)}
                style={styles.modalContentWrapper}
              >
                <View style={styles.modalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>{label}</Text>
                    <TouchableOpacity 
                      onPress={() => setModalVisible(false)} 
                      style={styles.closeBtn}
                    >
                      <Text style={styles.closeBtnText}>Done</Text>
                    </TouchableOpacity>
                  </View>

                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item, index }) => {
                      const isSelected = item.value === value;
                      return (
                        <Animated.View 
                          // Staggered children entering animation (x: -20 logic)
                          entering={FadeInLeft.delay(index * 40).springify().damping(14)}
                        >
                          <TouchableOpacity 
                            activeOpacity={0.7}
                            style={[
                              styles.optionItem, 
                              isSelected && styles.optionItemSelected
                            ]}
                            onPress={() => handleSelect(item.value)}
                          >
                            <Text 
                              style={[
                                styles.optionText, 
                                isSelected && styles.optionTextSelected
                              ]}
                            >
                              {item.label}
                            </Text>
                            {isSelected && (
                              <Animated.View entering={ZoomIn}>
                                <Check size={20} color="#4f46e5" />
                              </Animated.View>
                            )}
                          </TouchableOpacity>
                        </Animated.View>
                      );
                    }}
                  />
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#4f46e5',
  },
  selectTrigger: {
    height: 52,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  selectTriggerActive: {
    borderColor: '#4f46e5',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#4f46e5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  selectText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1f2937',
    flex: 1,
  },
  placeholderText: {
    color: '#6b7280',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', // Centered popup style like standard web dropdowns
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.15)',
    paddingHorizontal: 20,
  },
  modalContentWrapper: {
    width: '100%',
    maxHeight: '75%',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  closeBtn: {
    padding: 8,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
  },
  closeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#4f46e5',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
    borderRadius: 12,
    marginBottom: 4,
  },
  optionItemSelected: {
    backgroundColor: '#eff6ff',
    borderBottomWidth: 0,
  },
  optionText: {
    fontSize: 16,
    color: '#4b5563',
    fontWeight: '500',
    flex: 1,
  },
  optionTextSelected: {
    color: '#4f46e5',
    fontWeight: '800',
  },
});
