import React, { memo } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants';

interface PriceChartProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  gradientColor?: string;
  showDots?: boolean;
  showAxes?: boolean;
  title?: string;
  subtitle?: string;
  isPositive?: boolean;
}

/**
 * Component for rendering a price chart
 */
const PriceChart = ({
  data,
  width = Dimensions.get('window').width - Spacing.md * 2,
  height = 180,
  color,
  gradientColor,
  showDots = false,
  showAxes = false,
  title,
  subtitle,
  isPositive = true,
}: PriceChartProps) => {
  // If no data or less than 2 points, return null
  if (!data || data.length < 2) {
    return null;
  }

  // Use provided colors or default to success/error colors based on price change
  const lineColor = color || (isPositive ? Colors.success.main : Colors.error.main);
  const fillColor = gradientColor || (isPositive ? Colors.success.light : Colors.error.light);

  // Find min and max values for scaling
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const valueRange = maxValue - minValue;

  // Calculate points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    // Scale the y value to fit within the height, leaving some padding
    const padding = height * 0.1;
    const y = height - padding - ((value - minValue) / valueRange) * (height - padding * 2);
    return { x, y };
  });

  // Create the SVG path
  const linePath = points.reduce((path, point, index) => {
    const command = index === 0 ? 'M' : 'L';
    return `${path} ${command} ${point.x} ${point.y}`;
  }, '');

  // Create the fill path (area below the line)
  const fillPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;

  return (
    <View style={styles.container}>
      {(title || subtitle) && (
        <View style={styles.header}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
      
      <View style={styles.chartContainer}>
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={fillColor} stopOpacity="0.5" />
              <Stop offset="1" stopColor={fillColor} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          
          {/* Fill area */}
          <Path d={fillPath} fill="url(#gradient)" />
          
          {/* Line */}
          <Path
            d={linePath}
            stroke={lineColor}
            strokeWidth={2}
            fill="none"
          />
          
          {/* Dots at data points */}
          {showDots &&
            points.map((point, index) => (
              <Circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={3}
                fill="white"
                stroke={lineColor}
                strokeWidth={1}
              />
            ))}
        </Svg>
      </View>
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
  header: {
    marginBottom: Spacing.md,
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: Typography.fontWeights.bold as any,
    color: Colors.neutral.darkest,
  },
  subtitle: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.neutral.dark,
    marginTop: Spacing.xs,
  },
  chartContainer: {
    overflow: 'hidden',
  },
});

// Use React.memo to prevent unnecessary re-renders
export default memo(PriceChart);