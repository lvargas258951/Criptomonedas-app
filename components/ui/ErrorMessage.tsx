import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RefreshCcwIcon, AlertCircleIcon } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Reusable error message component with optional retry action
 */
const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <View style={styles.container}>
      <AlertCircleIcon
        size={48}
        color={Colors.error.main}
        style={styles.icon}
      />
      
      <Text style={styles.message}>{message}</Text>
      
      {onRetry && (
        <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
          <RefreshCcwIcon size={16} color={Colors.light.background} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  icon: {
    marginBottom: Spacing.md,
  },
  message: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.dark,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.main,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  retryText: {
    marginLeft: Spacing.xs,
    color: Colors.light.background,
    fontWeight: Typography.fontWeights.medium as any,
  },
});

export default ErrorMessage;