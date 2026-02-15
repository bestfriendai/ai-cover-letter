import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../src/theme';
import { Settings as SettingsIcon, User, FileText, Bell, Shield, HelpCircle, Star, ChevronRight } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [haptics, setHaptics] = useState(true);

  const handleClearData = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Clear All Data',
      'This will delete all your saved cover letters and resumes. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            Alert.alert('Done', 'All data has been cleared.');
          }
        },
      ]
    );
  };

  const handleRateApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // In production, link to App Store
    Alert.alert('Rate App', 'Thank you for your support!');
  };

  const handleContact = () => {
    Linking.openURL('mailto:support@startupstartup.app');
  };

  const handlePrivacy = () => {
    Linking.openURL('https://startupstartup.app/privacy');
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.headerTitle}>Settings</Text>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} activeOpacity={0.7}>
              <View style={styles.rowIcon}>
                <User size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Resume & Profile</Text>
                <Text style={styles.rowSubtitle}>Manage your resume data</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, styles.lastRow]} activeOpacity={0.7}>
              <View style={styles.rowIcon}>
                <FileText size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Saved Templates</Text>
                <Text style={styles.rowSubtitle}>Customize your letter style</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowIcon}>
                <Bell size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Notifications</Text>
                <Text style={styles.rowSubtitle}>Job alerts and updates</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
                thumbColor={theme.colors.background}
              />
            </View>

            <View style={[styles.row, styles.lastRow]}>
              <View style={styles.rowIcon}>
                <SettingsIcon size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Haptic Feedback</Text>
                <Text style={styles.rowSubtitle}>Vibration on interactions</Text>
              </View>
              <Switch
                value={haptics}
                onValueChange={setHaptics}
                trackColor={{ false: theme.colors.border, true: theme.colors.primaryLight }}
                thumbColor={theme.colors.background}
              />
            </View>
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={handleRateApp} activeOpacity={0.7}>
              <View style={styles.rowIcon}>
                <Star size={20} color={theme.colors.accent} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Rate App</Text>
                <Text style={styles.rowSubtitle}>Help us improve</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.row} onPress={handleContact} activeOpacity={0.7}>
              <View style={styles.rowIcon}>
                <HelpCircle size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Contact Support</Text>
                <Text style={styles.rowSubtitle}>Get help with the app</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.row, styles.lastRow]} onPress={handlePrivacy} activeOpacity={0.7}>
              <View style={styles.rowIcon}>
                <Shield size={20} color={theme.colors.primary} />
              </View>
              <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>Privacy Policy</Text>
                <Text style={styles.rowSubtitle}>How we handle your data</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.card}>
            <TouchableOpacity 
              style={[styles.row, styles.lastRow, styles.dangerRow]} 
              onPress={handleClearData}
              activeOpacity={0.7}
            >
              <View style={[styles.rowIcon, styles.dangerIcon]}>
                <Shield size={20} color={theme.colors.error} />
              </View>
              <View style={styles.rowContent}>
                <Text style={[styles.rowTitle, styles.dangerText]}>Clear All Data</Text>
                <Text style={styles.rowSubtitle}>Delete all saved data</Text>
              </View>
              <ChevronRight size={20} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* App Info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>AI Cover Letter v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ by StartupStartup</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  scrollView: {
    flex: 1,
  },
  headerTitle: {
    fontSize: theme.fontSize.largeTitle,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  section: {
    marginTop: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.caption,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  card: {
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    backgroundColor: theme.colors.background,
    gap: theme.spacing.md,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: theme.colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
  },
  rowSubtitle: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  dangerRow: {
    backgroundColor: theme.colors.error + '08',
  },
  dangerIcon: {
    backgroundColor: theme.colors.error + '15',
  },
  dangerText: {
    color: theme.colors.error,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxxl,
    gap: theme.spacing.sm,
  },
  footerText: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textTertiary,
  },
});
