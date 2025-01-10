import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'

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

  return (
    <ChartContainer
      config={{
        [category1]: {
          label: category1,
          color: "hsl(var(--chart-1))",
        },
        [category2]: {
          label: category2,
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-[400px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey={category1} fill="var(--color-category1)" />
          <Bar dataKey={category2} fill="var(--color-category2)" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

