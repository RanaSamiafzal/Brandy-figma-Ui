import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Users, FileText, CheckCircle, Clock } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardHeader, ProfileCard } from '../../components/common/Cards';
import { Button } from '../../components/common/Button';
import { logout } from '../../redux/slices/authSlice';
import { fetchProfile } from '../../redux/slices/userSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const mockInfluencers = [
    {
      name: 'Sara_Lifestyle',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
      platform: 'Instagram',
      followers: '50k',
      category: 'Lifestyle',
      verified: true,
    },
    {
      name: 'DanTechGeek',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      platform: 'Youtube',
      followers: '120k',
      category: 'Technology',
      verified: true,
    },
    {
      name: 'FitWithMaya',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
      platform: 'Instagram',
      followers: '75k',
      category: 'Fitness',
      verified: true,
    },
  ];

  const stats = [
    {
      icon: FileText,
      label: 'Total Requests',
      value: profile?.stats?.totalRequests || '24',
      color: 'text-[#3b82f6]',
      bgColor: 'bg-[#eff6ff]',
      onClick: () => navigate('/brand/collaboration-requests'),
    },
    {
      icon: CheckCircle,
      label: 'Active Campaigns',
      value: profile?.stats?.activeCampaigns || '8',
      color: 'text-[#10b981]',
      bgColor: 'bg-[#d1fae5]',
      onClick: () => navigate('/brand/active-campaigns'),
    },
    {
      icon: Clock,
      label: 'Pending Approvals',
      value: profile?.stats?.pendingApprovals || '3',
      color: 'text-[#f59e0b]',
      bgColor: 'bg-[#fef3c7]',
      onClick: () => navigate('/brand/pending-campaigns'),
    },
    {
      icon: Users,
      label: 'Influencers Found',
      value: profile?.stats?.influencersFound || '156',
      color: 'text-[#6b7280]',
      bgColor: 'bg-[#f3f4f6]',
      onClick: () => navigate('/search'),
    },
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'success',
      text: 'EllaStyle accepted your collaboration request',
      time: '2 hours ago',
      color: 'bg-[#10b981]'
    },
    {
      id: '2',
      type: 'info',
      text: 'New influencer match found for your campaign',
      time: '5 hours ago',
      color: 'bg-[#3b82f6]'
    },
    {
      id: '3',
      type: 'warning',
      text: 'TechGuruMike is reviewing your request',
      time: '1 day ago',
      color: 'bg-[#f59e0b]'
    },
    {
      id: '4',
      type: 'info',
      text: 'Your campaign "Spring Vibes" is now active',
      time: '2 days ago',
      color: 'bg-[#3b82f6]'
    },
    {
      id: '5',
      type: 'success',
      text: 'Weekly performance report is ready',
      time: '3 days ago',
      color: 'bg-[#10b981]'
    },
    {
      id: '6',
      type: 'info',
      text: 'New message from Brandly Support',
      time: '4 days ago',
      color: 'bg-[#3b82f6]'
    }
  ];

  const displayActivities = recentActivities.slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <div className="flex pt-[73px]">
        <Sidebar 
          userRole={user?.role?.toLowerCase() || 'brand'} 
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#111827] mb-1 sm:mb-2">
                Welcome, {profile?.name || user?.name || 'User'}!
              </h2>
              <p className="text-sm sm:text-base text-[#6b7280]">Here's what's happening with your campaigns today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card 
                    key={stat.label} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={stat.onClick}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm text-[#6b7280] truncate">{stat.label}</p>
                        <p className="text-xl sm:text-2xl font-bold text-[#111827]">{stat.value}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Recommended Influencers */}
            <Card>
              <CardHeader
                title="Recommended Influencers"
                action={
                  <Button variant="outline" size="sm" onClick={() => navigate('/search')}>
                    View All
                  </Button>
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {mockInfluencers.map((influencer) => (
                  <ProfileCard
                    key={influencer.name}
                    {...influencer}
                    onViewProfile={() => navigate(`/influencer/${influencer.name}`)}
                  />
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader 
                title="Recent Activity" 
                action={
                  <Button variant="outline" size="sm" onClick={() => navigate('/notifications')}>
                    View More
                  </Button>
                }
              />
              <div className="space-y-3 sm:space-y-4">
                {displayActivities.map((activity, index) => (
                  <div 
                    key={activity.id} 
                    className={`flex items-start gap-3 sm:gap-4 ${index !== displayActivities.length - 1 ? 'pb-3 sm:pb-4 border-b border-[#e5e7eb]' : ''}`}
                  >
                    <div className={`w-2 h-2 ${activity.color} rounded-full mt-2 flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-[#111827]">
                        {activity.text}
                      </p>
                      <p className="text-[10px] sm:text-xs text-[#6b7280]">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

