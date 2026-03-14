import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Eye, Heart, MessageCircle, Share2, Download, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export function BrandAnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const stats = [
    {
      label: 'Total Reach',
      value: '2.4M',
      change: '+12.5%',
      trend: 'up' as const,
      icon: Eye,
      color: 'bg-[#dbeafe]',
      iconColor: 'text-[#3b82f6]'
    },
    {
      label: 'Engagement Rate',
      value: '5.8%',
      change: '+2.3%',
      trend: 'up' as const,
      icon: Heart,
      color: 'bg-[#fee2e2]',
      iconColor: 'text-[#ef4444]'
    },
    {
      label: 'Active Campaigns',
      value: '8',
      change: '+3',
      trend: 'up' as const,
      icon: Users,
      color: 'bg-[#d1fae5]',
      iconColor: 'text-[#10b981]'
    },
    {
      label: 'Total Spend',
      value: '$24.5K',
      change: '-8.2%',
      trend: 'down' as const,
      icon: DollarSign,
      color: 'bg-[#fef3c7]',
      iconColor: 'text-[#f59e0b]'
    }
  ];

  const campaignPerformance = [
    { name: 'Summer Fashion Collection', reach: '850K', engagement: '4.2%', roi: '320%', budget: '$5,000' },
    { name: 'Tech Product Launch', reach: '1.2M', engagement: '6.8%', roi: '450%', budget: '$10,000' },
    { name: 'Wellness Brand Awareness', reach: '600K', engagement: '5.1%', roi: '280%', budget: '$3,500' }
  ];

  const platformStats = [
    { platform: 'Instagram', posts: 45, reach: '1.2M', engagement: '5.2%', followers: '+15K' },
    { platform: 'YouTube', posts: 12, reach: '800K', engagement: '7.1%', followers: '+8K' },
    { platform: 'TikTok', posts: 38, reach: '400K', engagement: '8.9%', followers: '+22K' }
  ];

  const topInfluencers = [
    {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      reach: '450K',
      engagement: '6.2%',
      campaigns: 3
    },
    {
      name: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      reach: '380K',
      engagement: '7.5%',
      campaigns: 2
    },
    {
      name: 'Emma Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      reach: '320K',
      engagement: '5.8%',
      campaigns: 4
    }
  ];

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
                <h1 className="text-2xl font-bold text-[#111827]">Analytics & Insights</h1>
                <p className="text-[#6b7280] mt-1">Track your campaign performance and ROI</p>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-[#6b7280] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#111827]">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Engagement Chart */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">Engagement Overview</h3>
            <div className="space-y-4">
              {[
                { label: 'Likes', value: 125000, max: 150000, icon: Heart },
                { label: 'Comments', value: 8500, max: 10000, icon: MessageCircle },
                { label: 'Shares', value: 4200, max: 5000, icon: Share2 },
                { label: 'Impressions', value: 2400000, max: 3000000, icon: Eye }
              ].map((metric) => (
                <div key={metric.label}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-4 h-4 text-[#6b7280]" />
                      <span className="text-sm text-[#6b7280]">{metric.label}</span>
                    </div>
                    <span className="text-sm font-medium text-[#111827]">
                      {metric.value.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                    <div
                      className="bg-[#3b82f6] h-2 rounded-full"
                      style={{ width: `${(metric.value / metric.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Influencers */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">Top Performers</h3>
            <div className="space-y-4">
              {topInfluencers.map((influencer, index) => (
                <div key={influencer.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#3b82f6] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#111827] truncate">{influencer.name}</p>
                    <p className="text-xs text-[#6b7280]">{influencer.reach} reach</p>
                  </div>
                  <Badge variant="success" className="text-xs">{influencer.engagement}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Campaign Performance */}
        <Card className="p-6 mb-8">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Campaign Performance</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5e7eb]">
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">Campaign Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">Reach</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">ROI</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">Budget</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-[#6b7280]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaignPerformance.map((campaign) => (
                  <tr key={campaign.name} className="border-b border-[#e5e7eb] hover:bg-[#f9fafb]">
                    <td className="py-4 px-4">
                      <p className="font-medium text-[#111827]">{campaign.name}</p>
                    </td>
                    <td className="py-4 px-4 text-[#374151]">{campaign.reach}</td>
                    <td className="py-4 px-4">
                      <Badge variant="success">{campaign.engagement}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-[#10b981] font-medium">{campaign.roi}</span>
                    </td>
                    <td className="py-4 px-4 text-[#374151]">{campaign.budget}</td>
                    <td className="py-4 px-4">
                      <Button variant="outline" size="sm">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Platform Statistics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[#111827] mb-4">Platform Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {platformStats.map((platform) => (
              <div key={platform.platform} className="border border-[#e5e7eb] rounded-lg p-4">
                <h4 className="font-semibold text-[#111827] mb-4">{platform.platform}</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Total Posts</p>
                    <p className="text-lg font-bold text-[#111827]">{platform.posts}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Total Reach</p>
                    <p className="text-lg font-bold text-[#111827]">{platform.reach}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Engagement Rate</p>
                    <p className="text-lg font-bold text-[#10b981]">{platform.engagement}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#6b7280] mb-1">Followers Gained</p>
                    <p className="text-lg font-bold text-[#3b82f6]">{platform.followers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}