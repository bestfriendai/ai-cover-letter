import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { theme } from '../../src/theme';
import { ArrowLeft, Copy, Share, Sparkles, Edit3, RefreshCw } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';

const SAMPLE_COVER_LETTER = `Dear Hiring Manager,

I am writing to express my strong interest in the Software Engineer position at Google. With over 5 years of experience in full-stack development and a passion for building scalable applications, I am excited about the opportunity to contribute to your team.

Throughout my career, I have developed expertise in React, Node.js, and cloud technologies. At my current role, I led the development of a microservices architecture that improved system reliability by 40% and reduced deployment time by 60%.

I am particularly drawn to Google's commitment to organizing the world's information and making it universally accessible. I would love the opportunity to bring my technical skills and collaborative spirit to your engineering team.

Thank you for considering my application. I look forward to the possibility of discussing how I can contribute to Google's mission.

Best regards,
[Your Name]`;

export default function CoverLetterDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [coverLetter, setCoverLetter] = useState(SAMPLE_COVER_LETTER);
  const [isEditing, setIsEditing] = useState(false);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(coverLetter);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // Share functionality would go here
  };

  const handleRegenerate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Regenerate with AI
  };

  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsEditing(!isEditing);
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleEdit}
            activeOpacity={0.7}
          >
            <Edit3 size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleRegenerate}
            activeOpacity={0.7}
          >
            <RefreshCw size={20} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCopy}
            activeOpacity={0.7}
          >
            <Copy size={20} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Job Info */}
        <View style={styles.jobInfo}>
          <Text style={styles.jobTitle}>Senior Software Engineer</Text>
          <Text style={styles.companyName}>Google • Applied Feb 10, 2024</Text>
        </View>

        {/* Cover Letter Content */}
        <View style={styles.contentCard}>
          {isEditing ? (
            <TextInput
              style={styles.editInput}
              value={coverLetter}
              onChangeText={setCoverLetter}
              multiline
              autoFocus
              textAlignVertical="top"
            />
          ) : (
            <Text style={styles.letterContent}>{coverLetter}</Text>
          )}
        </View>

        {/* AI Suggestions */}
        <View style={styles.suggestionsCard}>
          <View style={styles.suggestionsHeader}>
            <Sparkles size={20} color={theme.colors.accent} />
            <Text style={styles.suggestionsTitle}>AI Suggestions</Text>
          </View>
          <Text style={styles.suggestionText}>
            Consider adding specific metrics from your experience. Numbers catch recruiters' attention!
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={handleCopy}
            activeOpacity={0.8}
          >
            <Copy size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Copy to Clipboard</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={handleShare}
            activeOpacity={0.8}
          >
            <Share size={20} color={theme.colors.primary} />
            <Text style={styles.secondaryButtonText}>Share</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  jobInfo: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
  },
  jobTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  companyName: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.textSecondary,
  },
  contentCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    minHeight: 300,
  },
  letterContent: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    lineHeight: 26,
  },
  editInput: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    lineHeight: 26,
    minHeight: 300,
    textAlignVertical: 'top',
  },
  suggestionsCard: {
    backgroundColor: theme.colors.accent + '15',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.lg,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  suggestionsTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  suggestionText: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  actions: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xxxl,
    gap: theme.spacing.md,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary + '15',
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
});
