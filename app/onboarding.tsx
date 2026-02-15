import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';
import { Sparkles, FileText, Zap, ChevronRight, Check } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const ONBOARDING_SCREENS = [
  {
    id: '1',
    icon: FileText,
    title: 'Import Your Resume',
    description: 'Upload your resume once and let AI use it for every application',
    color: '#4338CA',
  },
  {
    id: '2',
    icon: Zap,
    title: 'Paste Job Description',
    description: 'Add any job posting and our AI will analyze what matters most',
    color: '#F59E0B',
  },
  {
    id: '3',
    icon: Sparkles,
    title: 'Get Your Letter',
    description: 'Receive a tailored cover letter in seconds, ready to send',
    color: '#10B981',
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<any>(null);

  const handleNext = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    if (currentIndex < ONBOARDING_SCREENS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      // Complete onboarding
      await AsyncStorage.setItem('onboardingComplete', 'true');
      router.replace('/(tabs)');
    }
  };

  const handleSkip = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await AsyncStorage.setItem('onboardingComplete', 'true');
    router.replace('/(tabs)');
  };

  const renderItem = ({ item }: { item: typeof ONBOARDING_SCREENS[0] }) => (
    <View style={styles.screen}>
      <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
        <item.icon size={64} color={item.color} />
      </View>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Carousel */}
      <View style={styles.carousel}>
        {ONBOARDING_SCREENS.map((screen, index) => (
          <View
            key={screen.id}
            style={[
              styles.dot,
              index === currentIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.flatListContainer}>
          {ONBOARDING_SCREENS.map((item) => (
            <View key={item.id} style={styles.screen}>
              <View style={[styles.iconContainer, { backgroundColor: item.color + '20' }]}>
                <item.icon size={64} color={item.color} />
              </View>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === ONBOARDING_SCREENS.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  skipText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
  },
  carousel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: theme.colors.primary,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  flatListContainer: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: theme.fontSize.largeTitle,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: theme.fontSize.title,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 28,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: 18,
    gap: 8,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
});
