import { useState } from 'react';
import { TrendingUp, Users, DollarSign, Briefcase, Eye, Heart, MessageCircle, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export function InfluencerDashboardPage() {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Active Collaborations',
      value: '5',
      change: '+2 this month',
      icon: Briefcase,
      color: 'bg-[#dbeafe]',
      iconColor: 'text-[#3b82f6]'
    },
    {
      label: 'Total Earnings',
      value: '$12,450',
      change: '+$2,100 this month',
      icon: DollarSign,
      color: 'bg-[#d1fae5]',
      iconColor: 'text-[#10b981]'
    },
    {
      label: 'Total Reach',
      value: '425K',
      change: '+15% this month',
      icon: Eye,
      color: 'bg-[#fef3c7]',
      iconColor: 'text-[#f59e0b]'
    },
    {
      label: 'Engagement Rate',
      value: '6.8%',
      change: '+0.5% this month',
      icon: Heart,
      color: 'bg-[#fee2e2]',
      iconColor: 'text-[#ef4444]'
    }
  ];

  const activeCollaborations = [
    {
      id: '1',
      brandName: 'FashionHub',
      brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
      campaignName: 'Summer Collection Launch',
      deadline: '2024-03-15',
      payment: '$800',
      status: 'in_progress',
      progress: 65
    },
    {
      id: '2',
      brandName: 'TechGear Pro',
      brandLogo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
      campaignName: 'Product Review Series',
      deadline: '2024-03-20',
      payment: '$1,200',
      status: 'in_progress',
      progress: 40
    },
    {
      id: '3',
      brandName: 'WellnessLife',
      brandLogo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
      campaignName: 'Wellness Challenge',
      deadline: '2024-03-25',
      payment: '$600',
      status: 'pending_review',
      progress: 90
    }
  ];

  const recentRequests = [
    {
      id: '1',
      brandName: 'BeautyBox',
      brandLogo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop',
      campaignName: 'Spring Makeup Line',
      budget: '$500-$700',
      receivedDate: '2024-02-22',
      status: 'new'
    },
    {
      id: '2',
      brandName: 'FitLife',
      brandLogo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop',
      campaignName: 'Fitness App Promotion',
      budget: '$1,000-$1,500',
      receivedDate: '2024-02-21',
      status: 'new'
    }
  ];

  const upcomingDeliverables = [
    {
      id: '1',
      campaignName: 'Summer Collection Launch',
      deliverable: '3 Instagram Posts',
      dueDate: '2024-02-28',
      priority: 'high'
    },
    {
      id: '2',
      campaignName: 'Product Review Series',
      deliverable: '1 YouTube Video',
      dueDate: '2024-03-05',
      priority: 'medium'
    },
    {
      id: '3',
      campaignName: 'Wellness Challenge',
      deliverable: '5 Instagram Stories',
      dueDate: '2024-03-01',
      priority: 'high'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
              <p className="text-[#6b7280] mt-1">Welcome back! Here's your performance overview</p>
            </div>
            <Button onClick={() => navigate('/influencer/search-brands')}>
              Find Brands
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </div>
              <p className="text-sm text-[#6b7280] mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-[#111827] mb-2">{stat.value}</p>
              <p className="text-xs text-[#10b981]">{stat.change}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Active Collaborations */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#111827]">Active Collaborations</h2>
              <Button variant="outline" size="sm" onClick={() => navigate('/influencer/collaborations')}>
                View All
              </Button>
            </div>
            <div className="space-y-4">
              {activeCollaborations.map((collab) => (
                <Card key={collab.id} className="p-5 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={collab.brandLogo}
                      alt={collab.brandName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#111827] mb-1">{collab.campaignName}</h3>
                      <p className="text-sm text-[#6b7280] mb-2">{collab.brandName}</p>
                      <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Due: {new Date(collab.deadline).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {collab.payment}
                        </span>
                      </div>
                    </div>
                    <Badge variant={collab.status === 'in_progress' ? 'warning' : 'default'}>
                      {collab.status === 'in_progress' ? 'In Progress' : 'Pending Review'}
                    </Badge>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#6b7280]">Progress</span>
                      <span className="font-medium text-[#111827]">{collab.progress}%</span>
                    </div>
                    <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                      <div
                        className="bg-[#3b82f6] h-2 rounded-full"
                        style={{ width: `${collab.progress}%` }}
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Deliverables */}
          <div>
            <h2 className="text-lg font-semibold text-[#111827] mb-4">Upcoming Deliverables</h2>
            <Card className="p-5">
              <div className="space-y-4">
                {upcomingDeliverables.map((item) => (
                  <div key={item.id} className="pb-4 border-b border-[#e5e7eb] last:border-0 last:pb-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-[#111827]">{item.deliverable}</h4>
                      <Badge variant={item.priority === 'high' ? 'danger' : 'warning'} className="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#6b7280] mb-1">{item.campaignName}</p>
                    <p className="text-xs text-[#6b7280] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due: {new Date(item.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* New Collaboration Requests */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#111827]">New Collaboration Requests</h2>
            <Button variant="outline" size="sm" onClick={() => navigate('/influencer/requests-page')}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentRequests.map((request) => (
              <Card key={request.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={request.brandLogo}
                    alt={request.brandName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#111827]">{request.brandName}</h3>
                      <Badge variant="success" className="text-xs">New</Badge>
                    </div>
                    <p className="text-sm text-[#6b7280] mb-2">{request.campaignName}</p>
                    <div className="flex items-center gap-4 text-sm text-[#6b7280]">
                      <span>{request.budget}</span>
                      <span>•</span>
                      <span>{new Date(request.receivedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Accept
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}