import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { RefreshCcwIcon, ArrowDownIcon } from 'lucide-react-native';
import { Cryptocurrency } from '@/models';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants';

interface CurrencyConverterProps {
  crypto: Cryptocurrency;
}

/**
 * Component for converting between USD and cryptocurrency
 */
const CurrencyConverter = ({ crypto }: CurrencyConverterProps) => {
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');
  const [isFromUSD, setIsFromUSD] = useState(true);

  // Update the conversion when inputs change
  useEffect(() => {
    if (fromValue === '') {
      setToValue('');
      return;
    }

    const numericValue = parseFloat(fromValue.replace(/,/g, ''));
    if (isNaN(numericValue)) {
      setToValue('');
      return;
    }

    if (isFromUSD) {
      // Convert from USD to crypto
      const convertedValue = numericValue / crypto.priceUsd;
      setToValue(convertedValue.toFixed(8));
    } else {
      // Convert from crypto to USD
      const convertedValue = numericValue * crypto.priceUsd;
      setToValue(convertedValue.toFixed(2));
    }
  }, [fromValue, isFromUSD, crypto]);

  // Switch conversion direction
  const handleSwitch = () => {
    setIsFromUSD(!isFromUSD);
    setFromValue(toValue);
    setToValue(fromValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      
      <View style={styles.converterContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{isFromUSD ? 'USD' : crypto.symbol}</Text>
          <TextInput
            style={styles.input}
            value={fromValue}
            onChangeText={setFromValue}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor={Colors.neutral.medium}
          />
        </View>
        
        <TouchableOpacity onPress={handleSwitch} style={styles.switchButton}>
          <ArrowDownIcon size={20} color={Colors.primary.main} />
        </TouchableOpacity>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{isFromUSD ? crypto.symbol : 'USD'}</Text>
          <TextInput
            style={styles.input}
            value={toValue}
            editable={false}
            placeholderTextColor={Colors.neutral.medium}
          />
        </View>
      </View>
      
      <Text style={styles.rateText}>
        1 {crypto.symbol} = {crypto.formattedPrice}
      </Text>
      
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setFromValue('1');
          setIsFromUSD(true);
        }}
      >
        <RefreshCcwIcon size={16} color={Colors.primary.main} />
        <Text style={styles.resetText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    margin: Spacing.md,
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
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginBottom: Spacing.md,
  },
  converterContainer: {
    marginBottom: Spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.lighter,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
  },
  label: {
    padding: Spacing.md,
    width: 60,
    fontWeight: Typography.fontWeights.medium as any,
    color: Colors.neutral.darkest,
  },
  input: {
    flex: 1,
    height: 48,
    padding: Spacing.md,
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.darkest,
  },
  switchButton: {
    alignSelf: 'center',
    padding: Spacing.xs,
    margin: Spacing.xs,
    backgroundColor: Colors.neutral.lightest,
    borderRadius: BorderRadius.round,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
      web: {
        shadowColor: Colors.neutral.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  rateText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral.dark,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
    backgroundColor: Colors.neutral.lightest,
    borderRadius: BorderRadius.md,
  },
  resetText: {
    marginLeft: Spacing.xs,
    color: Colors.primary.main,
    fontWeight: Typography.fontWeights.medium as any,
  },
});

export default CurrencyConverter;