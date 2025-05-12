import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
  color?: string;
  message?: string;
}

/**
 * Reusable loading indicator component
 */
const LoadingIndicator = ({
  size = 'large',
  color = Colors.primary.main,
  message,
}: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {message && <Text style={styles.message}>{message}</Text>}
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
  message: {
    marginTop: Spacing.md,
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.dark,
    textAlign: 'center',
  },
});

export default LoadingIndicator;