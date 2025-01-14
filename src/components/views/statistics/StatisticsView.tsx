import { useState, useEffect } from 'react'
import mockApiClient from './services/MockApi'
import { MockData } from './services/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import HeadlessChart from '@/components/reusable/chart/HeadlessChart'
import useChart from '@/components/reusable/chart/hooks/useChart'
import ComparisonChart from './comparison-chart'
import { StatisticsAPI } from './services/StatisticsAPI'
import { ProjectCategory } from '@/components/views/statistics/services/statistics';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']

export default function StatisticsDashboard() {
  const [timeFilter, setTimeFilter] = useState('week')
  const [comparisonType, setComparisonType] = useState('continent')
  const [category1, setCategory1] = useState('Education')
  const [category2, setCategory2] = useState('Food')
  const [region1, setRegion1] = useState('Africa')
  const [region2, setRegion2] = useState('Asia')
  const [data, setData] = useState<MockData>({
    projects: [],
    newDonors: [],
    continentData: [],
    countryData: []
  })
  const [approvedProjects, setApprovedProjects] = useState<Record<string, number>>({});
  const [categoryDonations, setCategoryDonations] = useState<Record<ProjectCategory, number>>({} as Record<ProjectCategory, number>);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projects, newDonors, continentData, countryData, approved] = await Promise.all([
          mockApiClient.get('projects'),
          // mockApiClient.get('donations'),
          StatisticsAPI.getNewUsers("week"),
          mockApiClient.get('continentData'),
          mockApiClient.get('countryData'),
          StatisticsAPI.getApprovedProjects()
        ]);

        const categoryPromises = Object.values(ProjectCategory).map(async (category) => {
          const projectsByCategory = await StatisticsAPI.getApprovedProjectsByCategory(category);
          const totalForCategory = Object.values(projectsByCategory).reduce((sum, amount) => sum + amount, 0);
          return [category, totalForCategory] as [ProjectCategory, number];
        });

        const categoryResults = await Promise.all(categoryPromises);
        const categoryData = Object.fromEntries(categoryResults) as Record<ProjectCategory, number>;
        
        setData({
          projects,
          newDonors,
          continentData,
          countryData
        });
        setApprovedProjects(approved);
        setCategoryDonations(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalActiveProjects = Object.keys(approvedProjects).length;
  const totalCompletedProjects = data.projects.filter(p => p.status === 'inactive').length;
  const totalDonations = Object.values(approvedProjects).reduce((sum, amount) => sum + amount, 0);
  const totalNewDonors = data.newDonors.length;

  // Configure charts using useChart hook
  const projectsChart = useChart({
    data: [{ period: 'Current', active: totalActiveProjects, completed: totalCompletedProjects }],
    type: 'bar',
    xAxis: 'period',
    series: [
      { key: 'active', name: 'Active Projects', color: '#39ff33' }
    ]
  });

  const donationsChart = useChart({
    data: Object.entries(categoryDonations)
      .filter(([_, value]) => value > 0) // Filter out categories with zero donations
      .map(([category, value]) => ({
        category,
        value
      })),
    type: 'pie',
    xAxis: 'category',
    yAxis: 'value',
    series: Object.entries(categoryDonations)
      .filter(([_, value]) => value > 0) // Filter out categories with zero donations
      .map(([category], i) => ({
        key: 'value',
        name: category,
        color: COLORS[i % COLORS.length]
      }))
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Statistics Dashboard</h1>
        <Select onValueChange={(value) => setTimeFilter(value)} defaultValue={timeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalActiveProjects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Donors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalNewDonors}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="donations">Donations</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Project Statistics</CardTitle>
              <CardDescription>Active vs Completed Projects</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 min-h-[400px]">
              <HeadlessChart
                data={projectsChart.chartData}
                type={projectsChart.chartType}
                xAxisKey={projectsChart.xAxisKey}
                series={projectsChart.seriesConfig}
                visibleSeries={projectsChart.visibleSeries}
                className="min-h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="donations">
          <Card>
            <CardHeader>
              <CardTitle>Donation Statistics</CardTitle>
              <CardDescription>Total donations by category</CardDescription>
            </CardHeader>
            <CardContent className="pt-2 min-h-[400px]">
              <HeadlessChart
                data={donationsChart.chartData}
                type={donationsChart.chartType}
                xAxisKey={donationsChart.xAxisKey}
                yAxisKey={donationsChart.yAxisKey}
                series={donationsChart.seriesConfig}
                visibleSeries={donationsChart.visibleSeries}
                className="min-h-[400px]"
              />
            </CardContent>
          </Card>
        </TabsContent>
      
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Statistics</CardTitle>
              <CardDescription>Compare donation values across categories and regions</CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-wrap gap-4 mb-4">
                <Select onValueChange={setComparisonType} defaultValue={comparisonType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Comparison Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="continent">Continent</SelectItem>
                    <SelectItem value="country">Country</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setCategory1} defaultValue={category1}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category 1" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setCategory2} defaultValue={category2}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category 2" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                  </SelectContent>
                </Select>
                <Select onValueChange={setRegion1} defaultValue={region1}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Region 1" />
                  </SelectTrigger>
                  <SelectContent>
                    {comparisonType === 'continent'
                      ? data.continentData.map(continent => (
                        <SelectItem key={continent.name} value={continent.name}>{continent.name}</SelectItem>
                      ))
                      : data.countryData.map(country => (
                        <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                <Select onValueChange={setRegion2} defaultValue={region2}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Region 2" />
                  </SelectTrigger>
                  <SelectContent>
                    {comparisonType === 'continent'
                      ? data.continentData.map(continent => (
                        <SelectItem key={continent.name} value={continent.name}>{continent.name}</SelectItem>
                      ))
                      : data.countryData.map(country => (
                        <SelectItem key={country.name} value={country.name}>{country.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </div>
              <ComparisonChart
                data={comparisonType === 'continent' ? data.continentData : data.countryData}
                category1={category1}
                category2={category2}
                region1={region1}
                region2={region2}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
