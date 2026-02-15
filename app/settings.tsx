import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const router = useRouter();
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Auto-save Letters</Text>
              <Text style={styles.settingDescription}>Automatically save generated letters</Text>
            </View>
            <Switch
              value={autoSave}
              onValueChange={setAutoSave}
              trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
              thumbColor={autoSave ? '#4F46E5' : '#9CA3AF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingLabel}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Get notified about application updates</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#E5E7EB', true: '#C7D2FE' }}
              thumbColor={notifications ? '#4F46E5' : '#9CA3AF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Text style={styles.menuIcon}>👤</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Profile</Text>
              <Text style={styles.menuDescription}>Manage your name and contact info</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => router.push('/paywall')}>
            <Text style={styles.menuIcon}>⭐</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Subscription</Text>
              <Text style={styles.menuDescription}>Manage your premium plan</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Text style={styles.menuIcon}>📧</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Contact Us</Text>
              <Text style={styles.menuDescription}>Get help with any issues</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Text style={styles.menuIcon}>📄</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Privacy Policy</Text>
              <Text style={styles.menuDescription}>How we handle your data</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {}}>
            <Text style={styles.menuIcon}>📋</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Terms of Service</Text>
              <Text style={styles.menuDescription}>Legal information</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          
          <TouchableOpacity 
            style={styles.menuItem} 
            onPress={() => Alert.alert('Export Data', 'Your cover letters will be exported.')}
          >
            <Text style={styles.menuIcon}>📤</Text>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Export Data</Text>
              <Text style={styles.menuDescription}>Download all your saved letters</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, styles.dangerItem]}
            onPress={() => Alert.alert('Clear Data', 'Are you sure? This cannot be undone.', [
              { text: 'Cancel', style: 'cancel' },
              { text: 'Clear', style: 'destructive', onPress: () => {} },
            ])}
          >
            <Text style={styles.menuIcon}>🗑️</Text>
            <View style={styles.menuContent}>
              <Text style={[styles.menuLabel, styles.dangerText]}>Clear All Data</Text>
              <Text style={styles.menuDescription}>Delete all saved cover letters</Text>
            </View>
            <Text style={[styles.chevron, styles.dangerText]}>›</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>AI Cover Letter v1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  settingDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  menuDescription: {
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: '#D1D5DB',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#EF4444',
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: '#9CA3AF',
    marginTop: 32,
    marginBottom: 24,
  },
});
