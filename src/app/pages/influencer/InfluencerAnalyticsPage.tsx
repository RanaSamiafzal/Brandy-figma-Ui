import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Users, DollarSign, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';

export function InfluencerAnalyticsPage() {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const stats = [
    { label: 'Total Reach', value: '425K', change: '+15%', trend: 'up' as const, icon: Eye, color: 'bg-[#dbeafe]', iconColor: 'text-[#3b82f6]' },
    { label: 'Engagement Rate', value: '6.8%', change: '+0.5%', trend: 'up' as const, icon: Heart, color: 'bg-[#fee2e2]', iconColor: 'text-[#ef4444]' },
    { label: 'Total Earnings', value: '$12,450', change: '+18%', trend: 'up' as const, icon: DollarSign, color: 'bg-[#d1fae5]', iconColor: 'text-[#10b981]' },
    { label: 'New Followers', value: '+5.2K', change: '+12%', trend: 'up' as const, icon: Users, color: 'bg-[#fef3c7]', iconColor: 'text-[#f59e0b]' }
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/influencer/dashboard')} className="text-[#6b7280] hover:text-[#111827]">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Analytics</h1>
                <p className="text-[#6b7280] mt-1">Track your performance metrics</p>
              </div>
            </div>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 border border-[#d1d5db] rounded-lg"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${stat.trend === 'up' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-sm text-[#6b7280] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#111827]">{stat.value}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}