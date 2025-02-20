import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeadlessChart } from '@/components/reusable/chart/HeadlessChart'
import { useChart } from '@/components/reusable/chart/hooks/useChart'
import { DonorsAPI } from '../donors/services/DonorsAPI.ts';
import { DonorGetResponse } from '../donors/services/interfaces';
import { apiClient } from '@/lib/api/Client';

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
    address: '',
    assetsKey: '',
  });

  const [processedAvatarUrl, setProcessedAvatarUrl] = useState<string>('');

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
        const donorData = await DonorsAPI.fetchDonorById(id as string);
        console.log('Received donor data:', donorData); // Debug log

        if (!donorData) {
          throw new Error('No donor data received');
        }

        setUser({
          id: donorData?.userId || '',
          firstName: donorData?.firstName || '',
          lastName: donorData?.lastName || '',
          address: donorData?.address || '',
          assetsKey: donorData.assetsKey || 'https://example.com/avatar.jpg',
        });
      } catch (err) {
        console.error('Error fetching donor:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch donor details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDonorDetails();
    }
  }, [id]);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (user.assetsKey) {
        try {
          const processedUrl = await apiClient.assets.fetchImage(user.assetsKey);
          setProcessedAvatarUrl(processedUrl);
        } catch (err) {
          console.error('Error fetching avatar:', err);
        }
      }
    };
    
    fetchAvatar();
  }, [user.assetsKey]);
  console.log(user.assetsKey);
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
                <AvatarImage src={user.assetsKey} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback>{user.firstName[0]}{user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Address:</strong> {user.address}</p>
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

