import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { HeartIcon } from 'lucide-react-native';
import { Cryptocurrency } from '@/models';
import { Spacing, BorderRadius, Colors, Typography } from '@/constants';

interface CryptoListItemProps {
  crypto: Cryptocurrency;
  isFavorite: boolean;
  onPress: (crypto: Cryptocurrency) => void;
  onToggleFavorite: (id: string) => void;
}

/**
 * Component for displaying a cryptocurrency item in a list
 */
const CryptoListItem = ({
  crypto,
  isFavorite,
  onPress,
  onToggleFavorite,
}: CryptoListItemProps) => {
  // Determine the color based on price change
  const changeColor = crypto.isPositiveChange
    ? Colors.success.main
    : Colors.error.main;

  // Handle favoriting with preventing event propagation
  const handleFavoritePress = (event: any) => {
    // Prevent the parent TouchableOpacity from being triggered
    event.stopPropagation?.();
    onToggleFavorite(crypto.id);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(crypto)}
      activeOpacity={0.7}
    >
      <View style={styles.rankContainer}>
        <Text style={styles.rankText}>{crypto.rank}</Text>
      </View>
      
      <View style={styles.nameContainer}>
        <Text style={styles.symbolText}>{crypto.symbol}</Text>
        <Text style={styles.nameText}>{crypto.name}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{crypto.formattedPrice}</Text>
        <Text style={[styles.changeText, { color: changeColor }]}>
          {crypto.formattedPercentChange24h}
        </Text>
      </View>
      
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <HeartIcon
          size={22}
          color={isFavorite ? Colors.error.main : Colors.neutral.medium}
          fill={isFavorite ? Colors.error.main : 'transparent'}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    marginVertical: Spacing.xs,
    marginHorizontal: Spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: Colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        shadowColor: Colors.neutral.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.neutral.lighter,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  rankText: {
    fontWeight: Typography.fontWeights.medium as any,
    fontSize: Typography.fontSizes.xs,
    color: Colors.neutral.darker,
  },
  nameContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  symbolText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  nameText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral.dark,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
    marginRight: Spacing.md,
  },
  priceText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  changeText: {
    fontSize: Typography.fontSizes.sm,
    marginTop: 2,
  },
  favoriteButton: {
    padding: Spacing.xs,
  },
});

// Use React.memo to prevent unnecessary re-renders
export default memo(CryptoListItem);