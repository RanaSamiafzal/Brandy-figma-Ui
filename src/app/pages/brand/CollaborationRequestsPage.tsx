import { useState } from 'react';
import { ArrowLeft, Search, Filter, MessageSquare, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DashboardLayout } from '../../components/DashboardLayout';

interface CollaborationRequest {
  id: string;
  influencerId: string;
  influencerName: string;
  influencerAvatar: string;
  campaignName: string;
  platform: string;
  followers: string;
  engagement: string;
  requestedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
}

const mockRequests: CollaborationRequest[] = [
  {
    id: '1',
    influencerId: 'sarah-chen',
    influencerName: 'Sarah Chen',
    influencerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    campaignName: 'Summer Fashion Collection',
    platform: 'Instagram',
    followers: '125K',
    engagement: '4.5%',
    requestedDate: '2024-02-20',
    status: 'pending',
    message: 'I would love to collaborate on your summer fashion collection. My audience is very engaged with fashion content.'
  },
  {
    id: '2',
    influencerId: 'mike-johnson',
    influencerName: 'Mike Johnson',
    influencerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    campaignName: 'Tech Product Launch',
    platform: 'YouTube',
    followers: '250K',
    engagement: '6.2%',
    requestedDate: '2024-02-19',
    status: 'pending',
    message: 'I specialize in tech reviews and would be perfect for your product launch campaign.'
  },
  {
    id: '3',
    influencerId: 'emma-davis',
    influencerName: 'Emma Davis',
    influencerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    campaignName: 'Wellness Brand Awareness',
    platform: 'Instagram',
    followers: '180K',
    engagement: '5.8%',
    requestedDate: '2024-02-18',
    status: 'accepted',
    message: 'My wellness-focused content aligns perfectly with your brand values.'
  }
];

export function CollaborationRequestsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRequests = mockRequests.filter(request => {
    const matchesTab = activeTab === 'all' || request.status === activeTab;
    const matchesSearch = request.influencerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.campaignName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'accepted': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Collaboration Requests</h1>
          <p className="text-[#6b7280] mt-1">Manage incoming collaboration requests</p>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search requests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-[#e5e7eb]">
            <div className="flex gap-8">
              {(['all', 'pending', 'accepted', 'rejected'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-[#3b82f6] text-[#3b82f6]'
                      : 'border-transparent text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  {tab}
                  <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-[#f3f4f6]">
                    {tab === 'all' ? mockRequests.length : mockRequests.filter(r => r.status === tab).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Requests List */}
          <div className="space-y-4">
            {filteredRequests.map((request) => (
              <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left: Influencer Info */}
                  <div className="flex items-start gap-4">
                    <img
                      src={request.influencerAvatar}
                      alt={request.influencerName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-[#111827]">{request.influencerName}</h3>
                        <Badge variant={getStatusBadgeVariant(request.status)}>{request.status}</Badge>
                      </div>
                      <p className="text-sm text-[#6b7280] mb-2">
                        Campaign: <span className="font-medium text-[#111827]">{request.campaignName}</span>
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-[#6b7280]">
                        <span>{request.platform}</span>
                        <span>•</span>
                        <span>{request.followers} followers</span>
                        <span>•</span>
                        <span>{request.engagement} engagement</span>
                        <span>•</span>
                        <span>Requested: {new Date(request.requestedDate).toLocaleDateString()}</span>
                      </div>
                      {request.message && (
                        <div className="mt-3 p-3 bg-[#f3f4f6] rounded-lg">
                          <p className="text-sm text-[#374151]">{request.message}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/influencer/${request.influencerId}`)}
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                    {request.status === 'pending' && (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            ))}

            {filteredRequests.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6b7280]">No requests found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}