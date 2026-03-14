import { useState } from 'react';
import { ArrowLeft, Search, Filter, Users, TrendingUp, Calendar, MoreVertical, Pause, Play, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface Campaign {
  id: string;
  name: string;
  description: string;
  budget: string;
  startDate: string;
  endDate: string;
  influencersCount: number;
  reach: string;
  engagement: string;
  status: 'active' | 'paused';
  platform: string[];
  progress: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Fashion Collection 2024',
    description: 'Promote our new summer collection through lifestyle influencers',
    budget: '$5,000',
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    influencersCount: 8,
    reach: '850K',
    engagement: '4.2%',
    status: 'active',
    platform: ['Instagram', 'TikTok'],
    progress: 65
  },
  {
    id: '2',
    name: 'Tech Product Launch',
    description: 'Launch our new smartphone with tech reviewers',
    budget: '$10,000',
    startDate: '2024-02-15',
    endDate: '2024-04-15',
    influencersCount: 5,
    reach: '1.2M',
    engagement: '6.8%',
    status: 'active',
    platform: ['YouTube', 'Instagram'],
    progress: 45
  },
  {
    id: '3',
    name: 'Wellness Brand Awareness',
    description: 'Build brand awareness in the wellness community',
    budget: '$3,500',
    startDate: '2024-01-20',
    endDate: '2024-03-20',
    influencersCount: 12,
    reach: '600K',
    engagement: '5.1%',
    status: 'paused',
    platform: ['Instagram', 'YouTube'],
    progress: 80
  }
];

export function ActiveCampaignsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Active Campaigns</h1>
                <p className="text-[#6b7280] mt-1">Monitor and manage your running campaigns</p>
              </div>
            </div>
            <Button onClick={() => navigate('/create-campaign')}>
              Create Campaign
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Active</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockCampaigns.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Influencers</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockCampaigns.reduce((acc, c) => acc + c.influencersCount, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Reach</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">2.6M</p>
              </div>
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Avg. Engagement</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">5.4%</p>
              </div>
              <div className="w-12 h-12 bg-[#e0e7ff] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#6366f1]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          {filteredCampaigns.map((campaign) => (
            <Card key={campaign.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-[#111827]">{campaign.name}</h3>
                    <Badge variant={campaign.status === 'active' ? 'success' : 'warning'}>
                      {campaign.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-3">{campaign.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {campaign.platform.map((platform) => (
                      <Badge key={platform} variant="default">{platform}</Badge>
                    ))}
                  </div>
                </div>
                <button className="text-[#6b7280] hover:text-[#111827]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6b7280]">Campaign Progress</span>
                  <span className="font-medium text-[#111827]">{campaign.progress}%</span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div
                    className="bg-[#3b82f6] h-2 rounded-full transition-all"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Budget</p>
                  <p className="font-semibold text-[#111827]">{campaign.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Influencers</p>
                  <p className="font-semibold text-[#111827]">{campaign.influencersCount}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Reach</p>
                  <p className="font-semibold text-[#111827]">{campaign.reach}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Engagement</p>
                  <p className="font-semibold text-[#111827]">{campaign.engagement}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Duration</p>
                  <p className="font-semibold text-[#111827]">
                    <Calendar className="w-3 h-3 inline mr-1" />
                    {new Date(campaign.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(campaign.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-[#e5e7eb]">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  {campaign.status === 'active' ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  View Influencers
                </Button>
              </div>
            </Card>
          ))}

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6b7280]">No campaigns found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}