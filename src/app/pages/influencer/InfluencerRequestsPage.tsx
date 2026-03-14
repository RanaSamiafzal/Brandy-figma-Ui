import { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, X, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DashboardLayout } from '../../components/DashboardLayout';

interface CollaborationRequest {
  id: string;
  brandName: string;
  brandLogo: string;
  campaignName: string;
  budget: string;
  receivedDate: string;
  status: 'new' | 'accepted' | 'rejected';
  description: string;
}

const mockRequests: CollaborationRequest[] = [
  {
    id: '1',
    brandName: 'BeautyBox',
    brandLogo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop',
    campaignName: 'Spring Makeup Line',
    budget: '$500-$700',
    receivedDate: '2024-02-22',
    status: 'new',
    description: 'Promote our new spring makeup collection with tutorial videos'
  },
  {
    id: '2',
    brandName: 'FitLife',
    brandLogo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&h=100&fit=crop',
    campaignName: 'Fitness App Promotion',
    budget: '$1,000-$1,500',
    receivedDate: '2024-02-21',
    status: 'new',
    description: 'Create content showcasing our fitness tracking app features'
  },
  {
    id: '3',
    brandName: 'EcoWear',
    brandLogo: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&h=100&fit=crop',
    campaignName: 'Sustainable Fashion',
    budget: '$600-$900',
    receivedDate: '2024-02-20',
    status: 'accepted',
    description: 'Showcase our eco-friendly clothing line'
  }
];

export function InfluencerRequestsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'accepted' | 'rejected'>('all');

  const filteredRequests = statusFilter === 'all'
    ? mockRequests
    : mockRequests.filter(req => req.status === statusFilter);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'success';
      case 'accepted': return 'default';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Johnson"
      notificationCount={8}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Collaboration Requests</h1>
          <p className="text-[#6b7280] mt-1">Manage collaboration requests from brands</p>
        </div>

        {/* Status Filters */}
        <div className="mb-6 flex gap-2">
          {(['all', 'new', 'accepted', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${
                statusFilter === status
                  ? 'bg-[#3b82f6] text-white'
                  : 'bg-white text-[#6b7280] border border-[#e5e7eb]'
              }`}
            >
              {status}
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-[#f3f4f6]">
                {status === 'all' ? mockRequests.length : mockRequests.filter(r => r.status === status).length}
              </span>
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex items-start gap-4">
                <img src={request.brandLogo} alt={request.brandName} className="w-16 h-16 rounded-lg" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-[#111827]">{request.brandName}</h3>
                    <Badge variant={getStatusVariant(request.status)}>
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-[#6b7280] mb-2">{request.campaignName}</p>
                  <p className="text-sm text-[#374151] mb-3">{request.description}</p>
                  <div className="flex gap-4 text-sm text-[#6b7280]">
                    <span>Budget: {request.budget}</span>
                    <span>•</span>
                    <span>Received: {new Date(request.receivedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                {request.status === 'new' && (
                  <div className="flex gap-2">
                    <Button variant="success" size="sm">
                      <CheckCircle className="w-4 h-4 mr-1" />Accept
                    </Button>
                    <Button variant="danger" size="sm">
                      <X className="w-4 h-4 mr-1" />Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}