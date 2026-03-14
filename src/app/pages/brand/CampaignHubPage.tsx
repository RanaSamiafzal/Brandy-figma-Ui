import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Plus, 
  Search, 
  MoreVertical,
  Users,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/Cards';
import { InfluButton } from '../../components/InfluButton';

interface Campaign {
  id: string;
  name: string;
  image: string;
  createdDate: string;
  status: 'active' | 'pending' | 'completed';
  target: string;
  platforms: string[];
  budgetMin: number;
  budgetMax: number;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'TECH',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    createdDate: 'Invalid Date',
    status: 'active',
    target: 'Tech',
    platforms: ['Instagram', 'Youtube', 'Tiktok'],
    budgetMin: 300,
    budgetMax: 400
  }
];

export function CampaignHubPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'completed'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.target.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = campaign.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const totalCampaigns = mockCampaigns.length;
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;
  const pendingCampaigns = mockCampaigns.filter(c => c.status === 'pending').length;
  const completedCampaigns = mockCampaigns.filter(c => c.status === 'completed').length;

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#111827]">Campaign Hub</h1>
              <p className="text-[#6b7280] mt-1">Manage and track your brand's marketing campaigns.</p>
            </div>
            <InfluButton
              variant="primary"
              onClick={() => navigate('/create-campaign')}
              className="shadow-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Campaign
            </InfluButton>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wide mb-1">
                    Total Campaigns
                  </p>
                  <p className="text-2xl font-bold text-[#111827]">{totalCampaigns}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#10b981]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wide mb-1">
                    Active
                  </p>
                  <p className="text-2xl font-bold text-[#111827]">{activeCampaigns}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wide mb-1">
                    Pending
                  </p>
                  <p className="text-2xl font-bold text-[#111827]">{pendingCampaigns}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#e5e7eb] rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#6b7280]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-medium uppercase tracking-wide mb-1">
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-[#111827]">{completedCampaigns}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs and Search */}
          <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex gap-1 bg-[#f9fafb] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('active')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'active'
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'pending'
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'completed'
                      ? 'bg-white text-[#111827] shadow-sm'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Campaigns List */}
          <div className="space-y-4">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col sm:flex-row gap-4 p-6">
                  {/* Campaign Image */}
                  <div className="w-full sm:w-24 h-24 rounded-xl overflow-hidden bg-gradient-to-br from-[#fbbf24] to-[#f59e0b] flex-shrink-0">
                    <img
                      src={campaign.image}
                      alt={campaign.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Campaign Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#3b82f6] mb-1">{campaign.name}</h3>
                        <p className="text-xs text-[#6b7280] mb-4">
                          Created on {campaign.createdDate}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          {/* Status */}
                          <div>
                            <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1.5">
                              STATUS
                            </p>
                            <div className="flex items-center gap-1.5">
                              <div className={`w-2 h-2 rounded-full ${
                                campaign.status === 'active' ? 'bg-[#10b981]' :
                                campaign.status === 'pending' ? 'bg-[#f59e0b]' :
                                'bg-[#6b7280]'
                              }`} />
                              <span className="text-sm font-medium text-[#111827] capitalize">
                                {campaign.status}
                              </span>
                            </div>
                          </div>

                          {/* Target */}
                          <div>
                            <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1.5">
                              TARGET
                            </p>
                            <p className="text-sm font-medium text-[#111827]">{campaign.target}</p>
                          </div>

                          {/* Platforms */}
                          <div>
                            <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1.5">
                              PLATFORMS
                            </p>
                            <p className="text-sm font-medium text-[#111827]">
                              {campaign.platforms.join(', ')}
                            </p>
                          </div>

                          {/* Budget */}
                          <div>
                            <p className="text-xs text-[#6b7280] uppercase tracking-wide mb-1.5">
                              BUDGET
                            </p>
                            <p className="text-sm font-medium text-[#111827]">
                              ${campaign.budgetMin} - ${campaign.budgetMax}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions Menu */}
                      <button className="text-[#6b7280] hover:text-[#111827] p-1 rounded-lg hover:bg-[#f3f4f6] transition-colors">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#f3f4f6] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-[#9ca3af]" />
                </div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">No campaigns found</h3>
                <p className="text-sm text-[#6b7280] mb-6">
                  {activeTab === 'active' && "You don't have any active campaigns yet."}
                  {activeTab === 'pending' && "You don't have any pending campaigns."}
                  {activeTab === 'completed' && "You don't have any completed campaigns."}
                </p>
                <InfluButton
                  variant="primary"
                  onClick={() => navigate('/create-campaign')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Campaign
                </InfluButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
