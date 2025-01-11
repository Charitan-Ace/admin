import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeadlessChart } from '@/components/reusable/chart/HeadlessChart'
import { useChart } from '@/components/reusable/chart/hooks/useChart'
import donorsApiClient from "../donors/services/DonorsMockApi";

// Mock data for the donation history
const donationData = [
  { month: 'Jan', amount: 50 },
  { month: 'Feb', amount: 75 },
  { month: 'Mar', amount: 100 },
  { month: 'Apr', amount: 125 },
  { month: 'May', amount: 150 },
  { month: 'Jun', amount: 200 },
]

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [user, setUser] = useState({
    id,
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
  });

  const { chartType, seriesConfig, visibleSeries } = useChart({
    data: donationData,
    type: 'bar',
    xAxis: 'month',
    series: [
      { key: 'amount', name: 'Donation Amount', color: 'hsl(var(--chart-1))' }
    ]
  });

  useEffect(() => {
    const fetchDonorDetails = async () => {
      try {
        setLoading(true);
        const donorData = await donorsApiClient.getById(id as string);
        console.log('Donor details:', donorData);
        setUser({
          id: donorData.id,
          firstName: donorData.name.split(' ')[0], 
          lastName: donorData.name.split(' ')[1],
          email: donorData.email || 'N/A',
          avatarUrl: donorData.avatarUrl || 'https://example.com/avatar.jpg',
        });
      } catch (err) {
        console.error('Error fetching donor:', err);
        setError('Failed to fetch donor details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDonorDetails();
    }
  }, [id]);

  const handleEdit = () => {
    console.log('Edit user');
  };

  const handleDelete = () => {
    console.log('Delete user');
  };

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
          ← Back to Donors
        </Button>
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-64 h-64">
                <AvatarImage src={user.avatarUrl} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
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
          <CardFooter className="flex justify-end space-x-2">
            <Button onClick={handleEdit}>Edit User</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete User</Button>
          </CardFooter>
        </Card>
      </div>
    );
  };

  return renderContent();
}

