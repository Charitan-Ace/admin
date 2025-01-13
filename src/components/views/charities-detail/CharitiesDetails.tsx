import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeadlessChart } from '@/components/reusable/chart/HeadlessChart'
import { useChart } from '@/components/reusable/chart/hooks/useChart'
// import charitiesApiClient from '../charities/services/CharitiesMockApi';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  goal: number;
  raised: number;
}

// Mock data for the donation history
const donationData = [
  { month: 'Jan', amount: 5000 },
  { month: 'Feb', amount: 7500 },
  { month: 'Mar', amount: 10000 },
  { month: 'Apr', amount: 12500 },
  { month: 'May', amount: 15000 },
  { month: 'Jun', amount: 20000 },
]

export default function CharitiesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [charity, setCharity] = useState({
    id,
    name: '',
    description: '',
    email: '',
    website: '',
    logoUrl: '',
    category: '',
    videoUrl: '', // Add video URL field
    projects: [] as Project[],
  });

  const { chartType, seriesConfig, visibleSeries } = useChart({
    data: donationData,
    type: 'bar',
    xAxis: 'month',
    series: [
      { key: 'amount', name: 'Received Donations', color: 'hsl(var(--chart-1))' }
    ]
  });

  useEffect(() => {
    const fetchCharityDetails = async () => {
      try {
        setLoading(true);
        setCharity({
          id:  "1",
          name: "Charity Name",
          description:  "Test Description",
          email:  'N/A',
          website:  'N/A',
          logoUrl:  'https://example.com/charity-logo.jpg',
          category:  'N/A',
          videoUrl: 'https://example.com/sample-video.mp4', // Add mock video URL
          projects: [
            {
              id: '1',
              name: 'Clean Water Initiative',
              description: 'Providing clean water to rural communities',
              status: 'active',
              goal: 50000,
              raised: 35000,
            },
            {
              id: '2',
              name: 'Education for All',
              description: 'Building schools in underprivileged areas',
              status: 'completed',
              goal: 75000,
              raised: 75000,
            },
            {
              id: '3',
              name: 'Healthcare Access',
              description: 'Mobile medical clinics for remote areas',
              status: 'pending',
              goal: 100000,
              raised: 15000,
            },
          ] as Project[],
        });
      } catch (err) {
        console.error('Error fetching charity:', err);
        setError('Failed to fetch charity details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharityDetails();
    }
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const renderContent = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="container mx-auto p-4">
        <Button variant="ghost" onClick={handleBack} className="mb-4">
          ← Back to Charities
        </Button>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Charity Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-64 h-64">
                <AvatarImage src={charity.logoUrl} alt={charity.name} />
                <AvatarFallback>{charity.name[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <p><strong>Name:</strong> {charity.name}</p>
                <p><strong>Category:</strong> {charity.category}</p>
                <p><strong>Email:</strong> {charity.email}</p>
                <p><strong>Website:</strong> <a href={charity.website} className="text-blue-500 hover:underline">{charity.website}</a></p>
                <p><strong>Description:</strong> {charity.description}</p>
              </div>
            </div>
            
            {/* Add Video Player Section */}
            {charity.videoUrl && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Charity Video</h3>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster={charity.logoUrl}
                  >
                    <source src={charity.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            )}

            {/* Projects Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Projects</h3>
              <div className="grid gap-4">
                {charity.projects.map((project) => (
                  <div
                    key={project.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((project.raised / project.goal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(project.raised / project.goal) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>${project.raised.toLocaleString()}</span>
                        <span>${project.goal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Donation History</h3>
              <div className="h-[200px]">
                <HeadlessChart
                  data={donationData}
                  type={chartType}
                  xAxisKey="month"
                  series={seriesConfig}
                  visibleSeries={visibleSeries}
                  className="w-full h-full"
                />
              </div>
            </div>
          </CardContent>
         
        </Card>
      </div>
    );
  };

  return renderContent();
}
