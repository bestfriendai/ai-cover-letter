import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [coverLetter, setCoverLetter] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState('');
  const [savedLetters, setSavedLetters] = useState<Array<{id: string; company: string; position: string; letter: string; date: string}>>([]);

  useEffect(() => {
    // Simulate AI generation
    if (params.resume && params.jobDesc) {
      generateCoverLetter();
    }
  }, []);

  const generateCoverLetter = () => {
    const resume = params.resume as string;
    const jobDesc = params.jobDesc as string;
    const company = params.company as string || 'the company';
    const position = params.position as string || 'the position';
    
    // Simulated AI-generated cover letter
    const letter = `Dear Hiring Manager,

I am writing to express my strong interest in the ${position} position at ${company}. With my background and skills aligned with your requirements, I am confident that I would be a valuable addition to your team.

${extractRelevantExperience(resume, jobDesc)}

What excites me most about ${company} is ${extractWhyInterest(jobDesc)}. I am particularly drawn to your company's commitment to innovation and would welcome the opportunity to contribute to your continued success.

I would love to discuss how my background and skills would benefit your team. Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]`;

    setCoverLetter(letter);
    setEditedLetter(letter);
  };

  const extractRelevantExperience = (resume: string, jobDesc: string) => {
    // Simple keyword matching simulation
    const keywords = jobDesc.toLowerCase().split(/[\s,]+/).filter(w => w.length > 4);
    const resumeLines = resume.split('\n').filter(line => 
      keywords.some(kw => line.toLowerCase().includes(kw))
    );
    
    if (resumeLines.length > 0) {
      return `Based on your requirements for this role, my experience in ${resumeLines.slice(0, 2).join(' and ')} directly aligns with what you're seeking.`;
    }
    
    return "Throughout my career, I have developed a strong set of skills that I believe would be valuable in this role.";
  };

  const extractWhyInterest = (jobDesc: string) => {
    if (jobDesc.toLowerCase().includes('innovat')) return 'your innovative approach';
    if (jobDesc.toLowerCase().includes('growth')) return 'your commitment to growth';
    if (jobDesc.toLowerCase().includes('lead')) return 'your leadership in the industry';
    return 'your company's mission and values';
  };

  const handleSave = () => {
    const newLetter = {
      id: Date.now().toString(),
      company: params.company as string || 'Unknown',
      position: params.position as string || 'Unknown',
      letter: editedLetter,
      date: new Date().toLocaleDateString()
    };
    setSavedLetters([newLetter, ...savedLetters]);
    Alert.alert('Saved!', 'Your cover letter has been saved.');
  };

  const handleCopy = () => {
    Alert.alert('Copied!', 'Cover letter copied to clipboard.');
  };

  const handleRegenerate = () => {
    setIsEditing(false);
    generateCoverLetter();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Cover Letter</Text>
          <Text style={styles.subtitle}>
            {params.company ? `${params.position} at ${params.company}` : 'Generated for you'}
          </Text>
        </View>

        <View style={styles.content}>
          {isEditing ? (
            <View>
              <Text style={styles.sectionTitle}>Edit Your Letter</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={editedLetter}
                onChangeText={setEditedLetter}
                multiline
                numberOfLines={20}
                textAlignVertical="top"
              />
              <View style={styles.editButtons}>
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    setEditedLetter(coverLetter);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.saveEditButton}
                  onPress={() => {
                    setCoverLetter(editedLetter);
                    setIsEditing(false);
                    Alert.alert('Updated!', 'Your changes have been saved.');
                  }}
                >
                  <Text style={styles.saveEditButtonText}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={styles.letterText}>{coverLetter}</Text>
              
              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton} onPress={() => setIsEditing(true)}>
                  <Text style={styles.actionIcon}>✏️</Text>
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
                  <Text style={styles.actionIcon}>📋</Text>
                  <Text style={styles.actionText}>Copy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleRegenerate}>
                  <Text style={styles.actionIcon}>🔄</Text>
                  <Text style={styles.actionText}>Regenerate</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save to Library</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {savedLetters.length > 0 && (
          <View style={styles.savedSection}>
            <Text style={styles.savedTitle}>Saved Letters</Text>
            {savedLetters.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.savedItem}
                onPress={() => setCoverLetter(item.letter)}
              >
                <Text style={styles.savedCompany}>{item.company}</Text>
                <Text style={styles.savedPosition}>{item.position}</Text>
                <Text style={styles.savedDate}>{item.date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.premiumButton}
          onPress={() => router.push('/paywall')}
        >
          <Text style={styles.premiumButtonText}>⭐ Upgrade to Premium for More Features</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 16,
    backgroundColor: '#4F46E5',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#C7D2FE',
    marginTop: 4,
  },
  content: {
    padding: 20,
    marginTop: -12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  letterText: {
    fontSize: 15,
    color: '#374151',
    lineHeight: 26,
    fontFamily: 'Georgia',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 300,
  },
  textArea: {
    minHeight: 300,
    fontFamily: 'Georgia',
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  saveEditButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
  },
  saveEditButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    alignItems: 'center',
    padding: 12,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  savedSection: {
    padding: 20,
    marginTop: 8,
  },
  savedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  savedItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  savedCompany: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  savedPosition: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  savedDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
  },
  premiumButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  premiumButtonText: {
    color: '#92400E',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
