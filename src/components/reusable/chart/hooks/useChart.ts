import { useState, useCallback } from 'react';

export type ChartType = 'bar' | 'line' | 'pie';

export interface SeriesConfig<T> {
  key: keyof T;
  name: string;
  color?: string;
}

export interface UseChartProps<T> {
  data: T[];
  type: ChartType;
  xAxis?: keyof T;
  yAxis?: keyof T;
  series?: SeriesConfig<T>[];
}

export interface UseChartReturn<T> {
  chartData: T[];
  chartType: ChartType;
  setChartType: (type: ChartType) => void;
  xAxisKey?: keyof T;
  yAxisKey?: keyof T;
  seriesConfig: Array<SeriesConfig<T> & { color: string }>;
  toggleSeries: (key: keyof T) => void;
  visibleSeries: Set<keyof T>;
}

const DEFAULT_COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', 
  '#8884D8', '#82CA9D', '#FDB462', '#B3DE69'
];

function useChart<T extends Record<string, any>>({
  data,
  type,
  xAxis,
  yAxis,
  series = []
}: UseChartProps<T>): UseChartReturn<T> {
  const [chartType, setChartType] = useState<ChartType>(type);
  const [visibleSeries, setVisibleSeries] = useState<Set<keyof T>>(
    new Set(series.map(s => s.key))
  );

  const seriesConfig = series.map((s, index) => ({
    ...s,
    color: s.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length]
  }));

  const toggleSeries = useCallback((key: keyof T) => {
    setVisibleSeries(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  return {
    chartData: data,
    chartType,
    setChartType,
    xAxisKey: xAxis,
    yAxisKey: yAxis,
    seriesConfig,
    toggleSeries,
    visibleSeries
  };
}

export { useChart };
export default useChart;