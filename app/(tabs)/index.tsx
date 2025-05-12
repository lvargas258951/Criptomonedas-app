import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  RefreshControl, 
  TouchableOpacity,
  Switch, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { DollarSign, TrendingUp, Bitcoin } from 'lucide-react-native';
import { useCryptocurrencies } from '@/hooks';
import { ApiService } from '@/services';
import { GlobalData, Cryptocurrency } from '@/models';
import { useTheme, useFavorites, useLanguage } from '@/contexts';
import { 
  CryptoListItem, 
  SearchBar, 
  LoadingIndicator, 
  ErrorMessage, 
  StatisticItem 
} from '@/components/ui';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants';

/**
 * Home screen component
 */
export default function HomeScreen() {
  const router = useRouter();
  const { theme, isDarkMode } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [globalData, setGlobalData] = useState<GlobalData | null>(null);
  const [isLoadingGlobal, setIsLoadingGlobal] = useState(true);
  const [globalError, setGlobalError] = useState<string | null>(null);

  const { 
    cryptocurrencies, 
    isLoading, 
    error, 
    fetchMore, 
    refreshData, 
    filteredCryptocurrencies 
  } = useCryptocurrencies();

  // Fetch global market data
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        setIsLoadingGlobal(true);
        setGlobalError(null);
        const data = await ApiService.getGlobalData();
        setGlobalData(data);
      } catch (error) {
        setGlobalError('Failed to load global market data');
        console.error('Error fetching global data:', error);
      } finally {
        setIsLoadingGlobal(false);
      }
    };

    fetchGlobalData();
  }, []);

  // Handle search input
  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
  };

  // Navigate to cryptocurrency detail
  const handleCryptoPress = (crypto: Cryptocurrency) => {
    router.push(`/detail/${crypto.id}`);
  };

  // Get filtered and/or favorites-only cryptocurrencies
  const getDisplayedCryptocurrencies = () => {
    const filtered = filteredCryptocurrencies(searchQuery);
    
    if (showFavoritesOnly) {
      return filtered.filter((crypto) => isFavorite(crypto.id));
    }
    
    return filtered;
  };

  // Render market overview section
  const renderMarketOverview = () => {
    if (isLoadingGlobal) {
      return (
        <View style={styles.overviewCard}>
          <Text style={[
            styles.overviewTitle,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('home.marketOverview')}
          </Text>
          <LoadingIndicator size="small" />
        </View>
      );
    }

    if (globalError || !globalData) {
      return null;
    }

    return (
      <View style={[
        styles.overviewCard,
        isDarkMode && { backgroundColor: Colors.dark.card }
      ]}>
        <Text style={[
          styles.overviewTitle,
          isDarkMode && { color: Colors.dark.text }
        ]}>
          {t('home.marketOverview')}
        </Text>
        
        <View style={styles.statsContainer}>
          <StatisticItem
            label={t('home.totalMarketCap')}
            value={globalData.formattedTotalMarketCap}
            icon={<DollarSign size={16} color={Colors.primary.main} />}
          />
          
          <StatisticItem
            label={t('home.totalVolume')}
            value={globalData.formattedTotalVolume}
            icon={<TrendingUp size={16} color={Colors.accent.main} />}
          />
          
          <StatisticItem
            label={t('home.btcDominance')}
            value={`${globalData.btc_d.toFixed(2)}%`}
            icon={<Bitcoin size={16} color={Colors.accent.dark} />}
          />
        </View>
      </View>
    );
  };

  // Render list header
  const renderListHeader = () => {
    return (
      <View>
        <View style={[
          styles.header,
          isDarkMode && { backgroundColor: Colors.dark.background }
        ]}>
          <Text style={[
            styles.title,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('home.title')}
          </Text>
          <Text style={[
            styles.subtitle,
            isDarkMode && { color: Colors.dark.textSecondary }
          ]}>
            {t('home.subtitle')}
          </Text>
        </View>
        
        <SearchBar
          placeholder={t('home.searchPlaceholder')}
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={clearSearch}
        />
        
        <View style={styles.filtersContainer}>
          <Text style={[
            styles.filterLabel,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('home.filterByFavorites')}
          </Text>
          <Switch
            value={showFavoritesOnly}
            onValueChange={setShowFavoritesOnly}
            thumbColor={Platform.OS === 'android' ? (showFavoritesOnly ? Colors.primary.main : Colors.neutral.light) : ''}
            trackColor={{
              false: Colors.neutral.light,
              true: Platform.OS === 'ios' ? Colors.primary.main : Colors.primary.light,
            }}
          />
        </View>
        
        {renderMarketOverview()}
      </View>
    );
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

    if (showFavoritesOnly && favorites.length === 0) {
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
    }

    if (searchQuery && getDisplayedCryptocurrencies().length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={[
            styles.emptyText,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('common.noResults')}
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && { backgroundColor: Colors.dark.background }
    ]}>
      <FlatList
        data={getDisplayedCryptocurrencies()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CryptoListItem
            crypto={item}
            isFavorite={isFavorite(item.id)}
            onPress={handleCryptoPress}
            onToggleFavorite={toggleFavorite}
          />
        )}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={isLoading && cryptocurrencies.length > 0}
            onRefresh={refreshData}
            colors={[Colors.primary.main]}
            tintColor={isDarkMode ? Colors.neutral.lighter : Colors.primary.main}
            title={t('home.pullToRefresh')}
            titleColor={isDarkMode ? Colors.neutral.lighter : Colors.neutral.dark}
          />
        }
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
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  subtitle: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.dark,
    marginTop: Spacing.xs,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xxl,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  filterLabel: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.dark,
  },
  overviewCard: {
    backgroundColor: Colors.light.card,
    margin: Spacing.md,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
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
  overviewTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginBottom: Spacing.sm,
  },
  statsContainer: {
    marginTop: Spacing.sm,
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