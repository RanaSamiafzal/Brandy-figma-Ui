import { useState } from 'react';
import { ArrowLeft, Search, Filter, Clock, Calendar, Edit, Trash2, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface PendingCampaign {
  id: string;
  name: string;
  description: string;
  budget: string;
  targetInfluencers: number;
  startDate: string;
  endDate: string;
  platform: string[];
  createdDate: string;
  status: 'draft' | 'pending_approval' | 'scheduled';
}

const mockPendingCampaigns: PendingCampaign[] = [
  {
    id: '1',
    name: 'Fall Fashion Lookbook',
    description: 'Showcase our fall collection through fashion influencers',
    budget: '$4,000',
    targetInfluencers: 10,
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    platform: ['Instagram', 'Pinterest'],
    createdDate: '2024-02-20',
    status: 'draft'
  },
  {
    id: '2',
    name: 'Fitness App Launch',
    description: 'Launch our new fitness tracking app',
    budget: '$8,000',
    targetInfluencers: 15,
    startDate: '2024-03-15',
    endDate: '2024-05-15',
    platform: ['YouTube', 'Instagram', 'TikTok'],
    createdDate: '2024-02-18',
    status: 'pending_approval'
  },
  {
    id: '3',
    name: 'Eco-Friendly Product Line',
    description: 'Promote our sustainable products',
    budget: '$6,000',
    targetInfluencers: 8,
    startDate: '2024-03-25',
    endDate: '2024-04-25',
    platform: ['Instagram', 'YouTube'],
    createdDate: '2024-02-15',
    status: 'scheduled'
  }
];

export function PendingCampaignsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'pending_approval' | 'scheduled'>('all');

  const filteredCampaigns = mockPendingCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'pending_approval': return 'Pending Approval';
      case 'scheduled': return 'Scheduled';
      default: return status;
    }
  };

  const getStatusVariant = (status: string): 'default' | 'warning' | 'success' => {
    switch (status) {
      case 'draft': return 'default';
      case 'pending_approval': return 'warning';
      case 'scheduled': return 'success';
      default: return 'default';
    }
  };

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
                <h1 className="text-2xl font-bold text-[#111827]">Pending Campaigns</h1>
                <p className="text-[#6b7280] mt-1">Draft and scheduled campaigns</p>
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
              <option value="draft">Draft</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Drafts</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockPendingCampaigns.filter(c => c.status === 'draft').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#f3f4f6] rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-[#6b7280]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Pending Approval</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockPendingCampaigns.filter(c => c.status === 'pending_approval').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Scheduled</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockPendingCampaigns.filter(c => c.status === 'scheduled').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#10b981]" />
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
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {getStatusLabel(campaign.status)}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-3">{campaign.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {campaign.platform.map((platform) => (
                      <Badge key={platform} variant="default">{platform}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Campaign Details */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Budget</p>
                  <p className="font-semibold text-[#111827]">{campaign.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Target Influencers</p>
                  <p className="font-semibold text-[#111827]">{campaign.targetInfluencers}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Start Date</p>
                  <p className="font-semibold text-[#111827]">
                    {new Date(campaign.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] mb-1">Created</p>
                  <p className="font-semibold text-[#111827]">
                    {new Date(campaign.createdDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-[#e5e7eb]">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                {campaign.status === 'draft' && (
                  <Button variant="primary" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Submit for Approval
                  </Button>
                )}
                {campaign.status === 'scheduled' && (
                  <Button variant="outline" size="sm">
                    View Schedule
                  </Button>
                )}
                <Button variant="outline" size="sm" className="text-[#ef4444] hover:bg-[#fee2e2] ml-auto">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))}

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Clock className="w-16 h-16 text-[#d1d5db] mx-auto mb-4" />
              <p className="text-[#6b7280] mb-4">No pending campaigns found</p>
              <Button onClick={() => navigate('/create-campaign')}>
                Create Your First Campaign
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}