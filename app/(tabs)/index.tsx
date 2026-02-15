import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { theme } from '../../src/theme';
import { Sparkles, ChevronRight, Briefcase, User } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleCreateNew = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/letters');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Sparkles size={32} color={theme.colors.primary} />
          </View>
          <Text style={styles.heroTitle}>AI Cover Letter</Text>
          <Text style={styles.heroSubtitle}>
            Generate tailored cover letters in seconds using AI
          </Text>
        </View>

        {/* Quick Create Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create New Cover Letter</Text>
          
          <View style={styles.inputGroup}>
            <View style={styles.inputRow}>
              <Briefcase size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Job title (e.g., Software Engineer)"
                placeholderTextColor={theme.colors.textTertiary}
                value={jobTitle}
                onChangeText={setJobTitle}
              />
            </View>
            
            <View style={styles.inputRow}>
              <User size={20} color={theme.colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Company name"
                placeholderTextColor={theme.colors.textTertiary}
                value={companyName}
                onChangeText={setCompanyName}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateNew}
            activeOpacity={0.8}
          >
            <Sparkles size={20} color="#FFFFFF" />
            <Text style={styles.createButtonText}>Generate with AI</Text>
          </TouchableOpacity>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <User size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>1. Add Your Resume</Text>
              <Text style={styles.featureDescription}>
                Import your resume once, we'll use it for all applications
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Briefcase size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>2. Paste Job Description</Text>
              <Text style={styles.featureDescription}>
                Add the job posting to get tailored content
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <Sparkles size={24} color={theme.colors.primary} />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>3. Get Your Letter</Text>
              <Text style={styles.featureDescription}>
                AI generates a personalized cover letter instantly
              </Text>
            </View>
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
          <Text style={styles.tipsText}>
            • Include keywords from the job posting{'\n'}
            • Quantify your achievements{'\n'}
            • Keep it to 3-4 paragraphs
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  hero: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  heroIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: theme.colors.primaryLight + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  heroTitle: {
    fontSize: theme.fontSize.largeTitle,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  heroSubtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  inputGroup: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
  section: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxxl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  featureDescription: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  tipsCard: {
    backgroundColor: theme.colors.accent + '15',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  },
  tipsTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  tipsText: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.textSecondary,
    lineHeight: 24,
  },
});
