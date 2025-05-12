import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SearchIcon, XCircleIcon } from 'lucide-react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants';

interface SearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

/**
 * Reusable search bar component with clear functionality
 */
const SearchBar = ({ placeholder, value, onChangeText, onClear }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
    >
      <SearchIcon
        size={20}
        color={isFocused ? Colors.primary.main : Colors.neutral.medium}
        style={styles.searchIcon}
      />
      
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.neutral.medium}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        clearButtonMode="never"
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearButton}>
          <XCircleIcon
            size={20}
            color={Colors.neutral.medium}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.lightest,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? Spacing.sm : 0,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.neutral.light,
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
  containerFocused: {
    borderColor: Colors.primary.main,
    backgroundColor: Colors.neutral.white,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.darkest,
  },
  clearButton: {
    padding: Spacing.xs,
  },
});

export default SearchBar;