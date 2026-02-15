import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../src/theme';
import { FileText, Plus, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

// Sample data
const INITIAL_LETTERS = [
  {
    id: '1',
    jobTitle: 'Senior Software Engineer',
    company: 'Google',
    date: '2024-02-10',
    status: 'generated',
  },
  {
    id: '2',
    jobTitle: 'Product Manager',
    company: 'Meta',
    date: '2024-02-08',
    status: 'generated',
  },
  {
    id: '3',
    jobTitle: 'UX Designer',
    company: 'Apple',
    date: '2024-02-05',
    status: 'draft',
  },
];

export default function LettersScreen() {
  const router = useRouter();
  const [letters] = useState(INITIAL_LETTERS);

  const handleLetterPress = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push(`/cover-letter/${id}`);
  };

  const handleCreateNew = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/(tabs)/index');
  };

  const renderLetter = ({ item }: { item: typeof letters[0] }) => (
    <TouchableOpacity 
      style={styles.letterCard}
      onPress={() => handleLetterPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.letterIcon}>
        <FileText size={24} color={theme.colors.primary} />
      </View>
      <View style={styles.letterContent}>
        <Text style={styles.letterTitle}>{item.jobTitle}</Text>
        <Text style={styles.letterCompany}>{item.company}</Text>
        <Text style={styles.letterDate}>{item.date}</Text>
      </View>
      <View style={styles.letterStatus}>
        <Text style={[
          styles.statusText,
          item.status === 'generated' ? styles.statusGenerated : styles.statusDraft
        ]}>
          {item.status === 'generated' ? '✓ Ready' : 'Draft'}
        </Text>
      </View>
      <ChevronRight size={20} color={theme.colors.textTertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cover Letters</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleCreateNew}
          activeOpacity={0.7}
        >
          <Plus size={20} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      {letters.length > 0 ? (
        <FlatList
          data={letters}
          renderItem={renderLetter}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <FileText size={48} color={theme.colors.textTertiary} />
          </View>
          <Text style={styles.emptyTitle}>No Cover Letters Yet</Text>
          <Text style={styles.emptySubtitle}>
            Create your first AI-powered cover letter
          </Text>
          <TouchableOpacity 
            style={styles.emptyButton}
            onPress={handleCreateNew}
            activeOpacity={0.8}
          >
            <Text style={styles.emptyButtonText}>Create Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    backgroundColor: theme.colors.background,
  },
  headerTitle: {
    fontSize: theme.fontSize.largeTitle,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: theme.spacing.lg,
  },
  letterCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  letterIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  letterContent: {
    flex: 1,
  },
  letterTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: 2,
  },
  letterCompany: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.textSecondary,
  },
  letterDate: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textTertiary,
    marginTop: 4,
  },
  letterStatus: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusGenerated: {
    color: theme.colors.success,
    backgroundColor: theme.colors.success + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusDraft: {
    color: theme.colors.warning,
    backgroundColor: theme.colors.warning + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.xxl,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  emptySubtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  emptyButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
});
