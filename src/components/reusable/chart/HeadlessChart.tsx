import { ResponsiveContainer, BarChart, LineChart, PieChart, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { ChartType } from './hooks/useChart';

interface HeadlessChartProps<T> {
  data: T[];
  type: ChartType;
  xAxisKey?: keyof T;
  yAxisKey?: keyof T;
  series: Array<{
    key: keyof T;
    name: string;
    color: string;
  }>;
  visibleSeries: Set<keyof T>;
  className?: string;
}

function HeadlessChart<T extends Record<string, any>>({
  data,
  type,
  xAxisKey,
  yAxisKey,
  series,
  visibleSeries,
  className
}: HeadlessChartProps<T>) {
  const renderChart = () => {
    const visibleSeriesArray = series.filter(s => visibleSeries.has(s.key));

    switch (type) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {xAxisKey && <XAxis dataKey={xAxisKey as string} />}
            {yAxisKey && <YAxis />}
            <Tooltip />
            <Legend />
            {visibleSeriesArray.map(({ key, name, color }) => (
              <Bar key={key as string} dataKey={key as string} name={name} fill={color} />
            ))}
          </BarChart>
        );

      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {xAxisKey && <XAxis dataKey={xAxisKey as string} />}
            {yAxisKey && <YAxis />}
            <Tooltip />
            <Legend />
            {visibleSeriesArray.map(({ key, name, color }) => (
              <Line
                key={key as string}
                type="monotone"
                dataKey={key as string}
                name={name}
                stroke={color}
              />
            ))}
          </LineChart>
        );

      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yAxisKey as string}
              nameKey={xAxisKey as string}
              cx="50%"
              cy="50%"
              outerRadius={100}
              innerRadius={0}
              paddingAngle={2}
              fill="#8884d8"
              label={({ name, value }) => `${name} (${value})`}
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={series[index % series.length].color} 
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer className={className} width="100%" height= "100%">
      {renderChart()}
    </ResponsiveContainer>
  );
}

export default HeadlessChart;
export { HeadlessChart };