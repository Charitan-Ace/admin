import { HeadlessChart } from '@/components/reusable/chart/HeadlessChart'
import { useChart } from '@/components/reusable/chart/hooks/useChart'

interface ComparisonChartProps {
  data: Array<{ name: string; [key: string]: number | string }>
  category1: string
  category2: string
  region1: string
  region2: string
}

export default function ComparisonChart({ data, category1, category2, region1, region2 }: ComparisonChartProps) {
  const chartData = [
    {
      name: region1,
      [category1]: data.find(item => item.name === region1)?.[category1] || 0,
      [category2]: data.find(item => item.name === region1)?.[category2] || 0,
    },
    {
      name: region2,
      [category1]: data.find(item => item.name === region2)?.[category1] || 0,
      [category2]: data.find(item => item.name === region2)?.[category2] || 0,
    },
  ]

  const { chartType, seriesConfig, visibleSeries } = useChart({
    data: chartData,
    type: 'bar',
    xAxis: 'name',
    series: [
      { key: category1, name: category1, color: "hsl(var(--chart-1))" },
      { key: category2, name: category2, color: "hsl(var(--chart-2))" }
    ]
  });

  return (
    <div className="min-h-[400px]">
      <HeadlessChart
        data={chartData}
        type={chartType}
        xAxisKey="name"
        series={seriesConfig}
        visibleSeries={visibleSeries}
        className="min-h-[400px]"
      />
    </div>
  )
}
