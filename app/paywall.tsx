import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { theme } from '../src/theme';
import { Check, X, Sparkles, Crown, ArrowLeft } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

const { width } = Dimensions.get('window');

const FREE_FEATURES = [
  { text: 'Generate 3 cover letters/month', included: true },
  { text: 'Basic templates', included: true },
  { text: 'Manual editing', included: true },
  { text: 'Copy to clipboard', included: true },
];

const PREMIUM_FEATURES = [
  { text: 'Unlimited cover letters', included: true },
  { text: 'AI-powered tailoring', included: true },
  { text: '20+ professional templates', included: true },
  { text: 'ATS-optimized formatting', included: true },
  { text: 'Export to PDF', included: true },
  { text: 'Priority support', included: true },
  { text: 'Job market insights', included: true },
];

export default function PaywallScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('annual');
  
  // RevenueCat configuration - User must configure these
  const MONTHLY_PRICE = '$4.99';
  const ANNUAL_PRICE = '$39.99';
  const ANNUAL_SAVINGS = '33%';

  const handleSubscribe = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // RevenueCat purchase logic would go here
    // For now, we'll simulate a successful purchase
    router.back();
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleRestore = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // RevenueCat restore logic would go here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <ArrowLeft size={24} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Upgrade to Premium</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Premium Badge */}
        <View style={styles.premiumBadge}>
          <Crown size={24} color={theme.colors.accent} />
          <Text style={styles.premiumTitle}>Unlock Your Career Potential</Text>
          <Text style={styles.premiumSubtitle}>
            Get unlimited AI-powered cover letters that get you hired
          </Text>
        </View>

        {/* Plan Selector */}
        <View style={styles.planSelector}>
          <TouchableOpacity
            style={[
              styles.planOption,
              selectedPlan === 'monthly' && styles.planOptionActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedPlan('monthly');
            }}
          >
            <Text style={[
              styles.planText,
              selectedPlan === 'monthly' && styles.planTextActive,
            ]}>Monthly</Text>
            <Text style={styles.planPrice}>{MONTHLY_PRICE}/mo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.planOption,
              styles.planOptionAnnual,
              selectedPlan === 'annual' && styles.planOptionActive,
            ]}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setSelectedPlan('annual');
            }}
          >
            <View style={styles.savingsBadge}>
              <Text style={styles.savingsText}>Save {ANNUAL_SAVINGS}</Text>
            </View>
            <Text style={[
              styles.planText,
              selectedPlan === 'annual' && styles.planTextActive,
            ]}>Annual</Text>
            <Text style={styles.planPrice}>{ANNUAL_PRICE}/yr</Text>
          </TouchableOpacity>
        </View>

        {/* Features Comparison */}
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          
          {/* Free Features */}
          <View style={styles.featureGroup}>
            <Text style={styles.featureGroupTitle}>Free Plan</Text>
            {FREE_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                {feature.included ? (
                  <Check size={18} color={theme.colors.success} />
                ) : (
                  <X size={18} color={theme.colors.textTertiary} />
                )}
                <Text style={[
                  styles.featureText,
                  !feature.included && styles.featureTextDisabled,
                ]}>
                  {feature.text}
                </Text>
              </View>
            ))}
          </View>

          {/* Premium Features */}
          <View style={styles.featureGroup}>
            <View style={styles.premiumHeader}>
              <Sparkles size={18} color={theme.colors.accent} />
              <Text style={styles.featureGroupTitle}>Premium</Text>
            </View>
            {PREMIUM_FEATURES.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Check size={18} color={theme.colors.success} />
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Testimonial */}
        <View style={styles.testimonial}>
          <Text style={styles.testimonialText}>
            "I got 3 interviews in my first week using AI Cover Letter. The tailored applications made all the difference!"
          </Text>
          <Text style={styles.testimonialAuthor}>— Sarah M., Marketing Manager</Text>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={handleSubscribe}
          activeOpacity={0.8}
        >
          <Sparkles size={20} color="#FFFFFF" />
          <Text style={styles.subscribeButtonText}>
            {selectedPlan === 'monthly' 
              ? `Subscribe for ${MONTHLY_PRICE}/month` 
              : `Subscribe for ${ANNUAL_PRICE}/year`
            }
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Subscription automatically renews. Cancel anytime.
        </Text>
      </View>
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
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  scrollView: {
    flex: 1,
  },
  premiumBadge: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.lg,
  },
  premiumTitle: {
    fontSize: theme.fontSize.largeTitle,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  premiumSubtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  planSelector: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  planOption: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  planOptionAnnual: {
    position: 'relative',
    overflow: 'visible',
  },
  planOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + '10',
  },
  savingsBadge: {
    position: 'absolute',
    top: -12,
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  savingsText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: theme.fontWeight.bold,
  },
  planText: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  planTextActive: {
    color: theme.colors.primary,
  },
  planPrice: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
  },
  featuresSection: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.title,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  featureGroup: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  featureGroupTitle: {
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
  },
  featureText: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.text,
    flex: 1,
  },
  featureTextDisabled: {
    color: theme.colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  testimonial: {
    backgroundColor: theme.colors.primary + '10',
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xxxl,
  },
  testimonialText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  testimonialAuthor: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  bottomContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    paddingTop: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  subscribeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  subscribeButtonText: {
    color: '#FFFFFF',
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.semibold,
  },
  restoreButton: {
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  restoreText: {
    fontSize: theme.fontSize.subhead,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  termsText: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.textTertiary,
    textAlign: 'center',
  },
});
