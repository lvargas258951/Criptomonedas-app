import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '@/constants';

interface StatisticItemProps {
  label: string;
  value: string;
  valueColor?: string;
  icon?: React.ReactNode;
}

/**
 * Component for displaying a statistic with label and value
 */
const StatisticItem = ({
  label,
  value,
  valueColor = Colors.neutral.darkest,
  icon,
}: StatisticItemProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.value, { color: valueColor }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.lighter,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: Spacing.xs,
  },
  label: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral.dark,
  },
  value: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium as any,
  },
});

export default StatisticItem;