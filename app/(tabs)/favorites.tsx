import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useCryptocurrencies } from '@/hooks';
import { useTheme, useFavorites, useLanguage } from '@/contexts';
import { CryptoListItem, LoadingIndicator, ErrorMessage } from '@/components/ui';
import { Colors, Spacing, Typography } from '@/constants';

/**
 * Favorites screen component
 */
export default function FavoritesScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
  
  const { 
    cryptocurrencies, 
    isLoading, 
    error, 
    refreshData 
  } = useCryptocurrencies();

  // Filter only favorite cryptocurrencies
  const favoriteCryptocurrencies = cryptocurrencies.filter((crypto) => 
    favorites.includes(crypto.id)
  );

  // Navigate to cryptocurrency detail
  const handleCryptoPress = (crypto) => {
    router.push(`/detail/${crypto.id}`);
  };

  // Render empty component
  const renderEmptyComponent = () => {
    if (isLoading) {
      return <LoadingIndicator message={t('common.loading')} />;
    }

    if (error) {
      return (
        <ErrorMessage
          message={t('home.errorMessage')}
          onRetry={refreshData}
        />
      );
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={[
          styles.emptyText,
          isDarkMode && { color: Colors.dark.text }
        ]}>
          {t('favorites.empty')}
        </Text>
        <Text style={[
          styles.emptySubtext,
          isDarkMode && { color: Colors.dark.textSecondary }
        ]}>
          {t('favorites.addSome')}
        </Text>
      </View>
    );
  };

  // Render list header
  const renderListHeader = () => {
    return (
      <View style={styles.header}>
        <Text style={[
          styles.title,
          isDarkMode && { color: Colors.dark.text }
        ]}>
          {t('favorites.title')}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && { backgroundColor: Colors.dark.background }
    ]}>
      <FlatList
        data={favoriteCryptocurrencies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoListItem
            crypto={item}
            isFavorite={true}
            onPress={handleCryptoPress}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
    marginTop: Spacing.xxl,
  },
  emptyText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.medium as any,
    color: Colors.neutral.dark,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.medium,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
});