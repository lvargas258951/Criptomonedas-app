import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Moon, Sun, Globe } from 'lucide-react-native';
import { useTheme, useLanguage } from '@/contexts';
import { Colors, Spacing, BorderRadius, Typography, LANGUAGES } from '@/constants';

/**
 * Settings screen component
 */
export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  // Set language to English
  const setEnglish = () => {
    setLanguage(LANGUAGES.ENGLISH);
  };

  // Set language to Spanish
  const setSpanish = () => {
    setLanguage(LANGUAGES.SPANISH);
  };

  return (
    <SafeAreaView style={[
      styles.container,
      isDarkMode && { backgroundColor: Colors.dark.background }
    ]}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('settings.title')}
          </Text>
        </View>

        {/* Theme Section */}
        <View style={[
          styles.section,
          isDarkMode && { backgroundColor: Colors.dark.card }
        ]}>
          <Text style={[
            styles.sectionTitle,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('settings.theme')}
          </Text>
          
          <View style={styles.themeContainer}>
            <View style={styles.themeOption}>
              <Sun 
                size={20} 
                color={isDarkMode ? Colors.neutral.medium : Colors.primary.main} 
              />
              <Text style={[
                styles.optionText,
                isDarkMode && { color: Colors.dark.text }
              ]}>
                {t('settings.themeLight')}
              </Text>
            </View>
            
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              thumbColor={isDarkMode ? Colors.primary.main : Colors.neutral.white}
              trackColor={{
                false: Colors.neutral.light,
                true: Colors.primary.light,
              }}
            />
            
            <View style={styles.themeOption}>
              <Moon 
                size={20} 
                color={isDarkMode ? Colors.primary.main : Colors.neutral.medium} 
              />
              <Text style={[
                styles.optionText,
                isDarkMode && { color: Colors.dark.text }
              ]}>
                {t('settings.themeDark')}
              </Text>
            </View>
          </View>
        </View>

        {/* Language Section */}
        <View style={[
          styles.section,
          isDarkMode && { backgroundColor: Colors.dark.card }
        ]}>
          <Text style={[
            styles.sectionTitle,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('settings.language')}
          </Text>
          
          <TouchableOpacity
            style={[
              styles.languageOption,
              language === LANGUAGES.ENGLISH && styles.selectedLanguage,
              isDarkMode && language === LANGUAGES.ENGLISH && { 
                backgroundColor: Colors.primary.dark 
              }
            ]}
            onPress={setEnglish}
          >
            <Globe 
              size={20} 
              color={language === LANGUAGES.ENGLISH ? Colors.light.background : (isDarkMode ? Colors.dark.text : Colors.neutral.darkest)} 
            />
            <Text style={[
              styles.languageText,
              language === LANGUAGES.ENGLISH && styles.selectedLanguageText,
              isDarkMode && language !== LANGUAGES.ENGLISH && { color: Colors.dark.text }
            ]}>
              {t('settings.languageEnglish')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[
              styles.languageOption,
              language === LANGUAGES.SPANISH && styles.selectedLanguage,
              isDarkMode && language === LANGUAGES.SPANISH && { 
                backgroundColor: Colors.primary.dark 
              }
            ]}
            onPress={setSpanish}
          >
            <Globe 
              size={20} 
              color={language === LANGUAGES.SPANISH ? Colors.light.background : (isDarkMode ? Colors.dark.text : Colors.neutral.darkest)} 
            />
            <Text style={[
              styles.languageText,
              language === LANGUAGES.SPANISH && styles.selectedLanguageText,
              isDarkMode && language !== LANGUAGES.SPANISH && { color: Colors.dark.text }
            ]}>
              {t('settings.languageSpanish')}
            </Text>
          </TouchableOpacity>
        </View>

        {/* About Section */}
        <View style={[
          styles.section,
          isDarkMode && { backgroundColor: Colors.dark.card }
        ]}>
          <Text style={[
            styles.sectionTitle,
            isDarkMode && { color: Colors.dark.text }
          ]}>
            {t('settings.about')}
          </Text>
          
          <View style={styles.aboutItem}>
            <Text style={[
              styles.aboutLabel,
              isDarkMode && { color: Colors.dark.textSecondary }
            ]}>
              {t('settings.version')}
            </Text>
            <Text style={[
              styles.aboutValue,
              isDarkMode && { color: Colors.dark.text }
            ]}>
              1.0.0
            </Text>
          </View>
          
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>
              {t('settings.privacyPolicy')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>
              {t('settings.termsOfService')}
            </Text>
          </TouchableOpacity>
        </View>
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
    padding: Spacing.md,
    paddingTop: Spacing.xl,
  },
  title: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  section: {
    backgroundColor: Colors.light.card,
    margin: Spacing.md,
    marginBottom: 0,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
    marginBottom: Spacing.md,
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: Spacing.xs,
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.darkest,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    backgroundColor: Colors.neutral.lighter,
  },
  selectedLanguage: {
    backgroundColor: Colors.primary.main,
  },
  languageText: {
    marginLeft: Spacing.sm,
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.darkest,
  },
  selectedLanguageText: {
    color: Colors.neutral.white,
    fontWeight: Typography.fontWeights.medium as any,
  },
  aboutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  aboutLabel: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.dark,
  },
  aboutValue: {
    fontSize: Typography.fontSizes.md,
    color: Colors.neutral.darkest,
    fontWeight: Typography.fontWeights.medium as any,
  },
  link: {
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral.lighter,
  },
  linkText: {
    fontSize: Typography.fontSizes.md,
    color: Colors.primary.main,
  },
});