import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ChevronLeft, 
  Heart, 
  TrendingUp, 
  TrendingDown, 
  DollarSign 
} from 'lucide-react-native';
import { useCryptocurrencyDetails } from '@/hooks';
import { useTheme, useFavorites, useLanguage } from '@/contexts';
import { 
  LoadingIndicator, 
  ErrorMessage, 
  PriceChart, 
  CurrencyConverter,
  StatisticItem 
} from '@/components/ui';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants';

/**
 * Detail screen component
 */
export default function DetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { theme, isDarkMode } = useTheme();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { t } = useLanguage();
  
  const { 
    cryptocurrency, 
    isLoading, 
    error, 
    refreshData, 
    chartData 
  } = useCryptocurrencyDetails(id);

  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    if (cryptocurrency) {
      toggleFavorite(cryptocurrency.id);
    }
  };

  // Check if id is valid
  useEffect(() => {
    if (!id) {
      router.back();
    }
  }, [id, router]);

  // Render content based on loading state
  if (isLoading && !cryptocurrency) {
    return (
      <SafeAreaView style={[
        styles.container,
        isDarkMode && { backgroundColor: Colors.dark.background }
      ]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft 
              size={24} 
              color={isDarkMode ? Colors.dark.text : Colors.neutral.darkest} 
            />
          </TouchableOpacity>
        </View>
        <LoadingIndicator message={t('common.loading')} />
      </SafeAreaView>
    );
  }

  // Render error state
  if (error) {
    return (
      <SafeAreaView style={[
        styles.container,
        isDarkMode && { backgroundColor: Colors.dark.background }
      ]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft 
              size={24} 
              color={isDarkMode ? Colors.dark.text : Colors.neutral.darkest} 
            />
          </TouchableOpacity>
        </View>
        <ErrorMessage
          message={t('detail.errorMessage')}
          onRetry={refreshData}
        />
      </SafeAreaView>
    );
  }

  // If no cryptocurrency data, return null
  if (!cryptocurrency) {
    return null;
  }

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && { backgroundColor: Colors.dark.background }
    ]}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refreshData}
            colors={[Colors.primary.main]}
            tintColor={isDarkMode ? Colors.neutral.lighter : Colors.primary.main}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <ChevronLeft 
              size={24} 
              color={isDarkMode ? Colors.dark.text : Colors.neutral.darkest} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
            <Heart
              size={24}
              color={
                isFavorite(cryptocurrency.id)
                  ? Colors.error.main
                  : isDarkMode
                  ? Colors.dark.text
                  : Colors.neutral.dark
              }
              fill={isFavorite(cryptocurrency.id) ? Colors.error.main : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        {/* Title section */}
        <View style={styles.titleSection}>
          <View style={styles.symbolContainer}>
            <Text style={[
              styles.symbolText,
              isDarkMode && { color: Colors.dark.text }
            ]}>
              {cryptocurrency.symbol}
            </Text>
            <View style={[
              styles.rankBadge,
              isDarkMode && { backgroundColor: Colors.primary.dark }
            ]}>
              <Text style={styles.rankText}>
                #{cryptocurrency.rank}
              </Text>
            </View>
          </View>
          
          <Text style={[
            styles.nameText,
            isDarkMode && { color: Colors.dark.textSecondary }
          ]}>
            {cryptocurrency.name}
          </Text>
          
          <Text style={[
            styles.priceText,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {cryptocurrency.formattedPrice}
          </Text>
          
          <View style={[
            styles.changeBadge,
            { backgroundColor: cryptocurrency.isPositiveChange ? Colors.success.light : Colors.error.light }
          ]}>
            {cryptocurrency.isPositiveChange ? (
              <TrendingUp size={16} color={Colors.success.main} style={styles.changeIcon} />
            ) : (
              <TrendingDown size={16} color={Colors.error.main} style={styles.changeIcon} />
            )}
            <Text style={[
              styles.changeText,
              { color: cryptocurrency.isPositiveChange ? Colors.success.main : Colors.error.main }
            ]}>
              {cryptocurrency.formattedPercentChange24h}
            </Text>
          </View>
        </View>
        
        {/* Price Chart */}
        <PriceChart
          data={chartData}
          isPositive={cryptocurrency.isPositiveChange}
          title={t('detail.priceChart')}
          subtitle={`${cryptocurrency.symbol}/USD`}
        />
        
        {/* Stats Section */}
        <View style={[
          styles.statsSection,
          isDarkMode && { backgroundColor: Colors.dark.card }
        ]}>
          <Text style={[
            styles.sectionTitle,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('common.details')}
          </Text>
          
          <StatisticItem
            label={t('detail.marketCap')}
            value={cryptocurrency.formattedMarketCap}
            icon={<DollarSign size={16} color={Colors.primary.main} />}
          />
          
          <StatisticItem
            label={t('detail.volume')}
            value={new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              notation: 'compact',
              maximumFractionDigits: 2
            }).format(cryptocurrency.volume24)}
          />
          
          <StatisticItem
            label={t('detail.priceChange1h')}
            value={`${cryptocurrency.percentChange1h > 0 ? '+' : ''}${cryptocurrency.percentChange1h.toFixed(2)}%`}
            valueColor={cryptocurrency.percentChange1h > 0 ? Colors.success.main : Colors.error.main}
          />
          
          <StatisticItem
            label={t('detail.priceChange24h')}
            value={`${cryptocurrency.percentChange24h > 0 ? '+' : ''}${cryptocurrency.percentChange24h.toFixed(2)}%`}
            valueColor={cryptocurrency.percentChange24h > 0 ? Colors.success.main : Colors.error.main}
          />
          
          <StatisticItem
            label={t('detail.priceChange7d')}
            value={`${cryptocurrency.percentChange7d > 0 ? '+' : ''}${cryptocurrency.percentChange7d.toFixed(2)}%`}
            valueColor={cryptocurrency.percentChange7d > 0 ? Colors.success.main : Colors.error.main}
          />
          
          <StatisticItem
            label={t('detail.circulatingSupply')}
            value={new Intl.NumberFormat('en-US', { 
              notation: 'compact',
              maximumFractionDigits: 2
            }).format(cryptocurrency.csupply)}
          />
          
          {cryptocurrency.tsupply && (
            <StatisticItem
              label={t('detail.totalSupply')}
              value={new Intl.NumberFormat('en-US', { 
                notation: 'compact',
                maximumFractionDigits: 2
              }).format(cryptocurrency.tsupply)}
            />
          )}
          
          {cryptocurrency.msupply && (
            <StatisticItem
              label={t('detail.maxSupply')}
              value={new Intl.NumberFormat('en-US', { 
                notation: 'compact',
                maximumFractionDigits: 2
              }).format(cryptocurrency.msupply)}
            />
          )}
        </View>
        
        {/* Currency Converter */}
        <CurrencyConverter crypto={cryptocurrency} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
  },
  backButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.neutral.lightest,
  },
  favoriteButton: {
    padding: Spacing.sm,
    borderRadius: BorderRadius.round,
    backgroundColor: Colors.neutral.lightest,
  },
  titleSection: {
    padding: Spacing.md,
    alignItems: 'center',
  },
  symbolContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  symbolText: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginRight: Spacing.sm,
  },
  rankBadge: {
    backgroundColor: Colors.primary.main,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  rankText: {
    color: Colors.neutral.white,
    fontSize: Typography.fontSizes.xs,
    fontWeight: Typography.fontWeights.bold as any,
  },
  nameText: {
    fontSize: Typography.fontSizes.lg,
    color: Colors.neutral.dark,
    marginBottom: Spacing.md,
  },
  priceText: {
    fontSize: Typography.fontSizes.xxxl,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginBottom: Spacing.sm,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success.light,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.md,
  },
  changeIcon: {
    marginRight: Spacing.xs,
  },
  changeText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: Typography.fontWeights.medium as any,
  },
  statsSection: {
    backgroundColor: Colors.light.card,
    margin: Spacing.md,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginBottom: Spacing.md,
  },
});