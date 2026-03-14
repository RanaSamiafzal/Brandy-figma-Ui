import { useState } from 'react';
import { ArrowLeft, Search, CheckCircle, X, Eye, User, Building } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface VerificationRequest {
  id: string;
  type: 'influencer' | 'brand';
  name: string;
  email: string;
  avatar?: string;
  submittedDate: string;
  status: 'pending' | 'approved' | 'rejected';
  documents: string[];
  details: {
    followers?: string;
    category?: string;
    industry?: string;
    website?: string;
  };
}

const mockRequests: VerificationRequest[] = [
  {
    id: '1',
    type: 'influencer',
    name: 'Sarah Chen',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    submittedDate: '2024-02-22',
    status: 'pending',
    documents: ['ID Verification', 'Social Media Screenshots'],
    details: {
      followers: '125K',
      category: 'Fashion & Lifestyle'
    }
  },
  {
    id: '2',
    type: 'brand',
    name: 'TechGear Pro',
    email: 'contact@techgear.com',
    avatar: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    submittedDate: '2024-02-21',
    status: 'pending',
    documents: ['Business License', 'Tax Documents'],
    details: {
      industry: 'Technology',
      website: 'www.techgear.com'
    }
  },
  {
    id: '3',
    type: 'influencer',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    submittedDate: '2024-02-20',
    status: 'approved',
    documents: ['ID Verification', 'Social Media Screenshots'],
    details: {
      followers: '250K',
      category: 'Tech & Gadgets'
    }
  }
];

export function AdminVerificationsPage() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState<'all' | 'influencer' | 'brand'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  const filteredRequests = mockRequests.filter(request => {
    const matchesType = typeFilter === 'all' || request.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesType && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-[#6b7280] hover:text-[#111827]"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#111827]">Verifications</h1>
              <p className="text-[#6b7280] mt-1">Review and approve verification requests</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Pending</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockRequests.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Influencers</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockRequests.filter(r => r.type === 'influencer').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Brands</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockRequests.filter(r => r.type === 'brand').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#e0e7ff] rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-[#6366f1]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Approved</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {mockRequests.filter(r => r.status === 'approved').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              className="px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="all">All Types</option>
              <option value="influencer">Influencers</option>
              <option value="brand">Brands</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="relative">
                    {request.avatar ? (
                      <img
                        src={request.avatar}
                        alt={request.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#e5e7eb] flex items-center justify-center">
                        {request.type === 'influencer' ? (
                          <User className="w-8 h-8 text-[#6b7280]" />
                        ) : (
                          <Building className="w-8 h-8 text-[#6b7280]" />
                        )}
                      </div>
                    )}
                    <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      request.type === 'influencer' ? 'bg-[#3b82f6]' : 'bg-[#6366f1]'
                    }`}>
                      {request.type === 'influencer' ? (
                        <User className="w-3 h-3 text-white" />
                      ) : (
                        <Building className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[#111827]">{request.name}</h3>
                      <Badge variant={
                        request.status === 'pending' ? 'warning' :
                        request.status === 'approved' ? 'success' : 'danger'
                      }>
                        {request.status}
                      </Badge>
                      <Badge variant="default" className="capitalize">
                        {request.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6b7280] mb-3">{request.email}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-[#6b7280]">Submitted</p>
                        <p className="text-sm font-medium text-[#111827]">
                          {new Date(request.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      {request.details.followers && (
                        <div>
                          <p className="text-xs text-[#6b7280]">Followers</p>
                          <p className="text-sm font-medium text-[#111827]">
                            {request.details.followers}
                          </p>
                        </div>
                      )}
                      {request.details.category && (
                        <div>
                          <p className="text-xs text-[#6b7280]">Category</p>
                          <p className="text-sm font-medium text-[#111827]">
                            {request.details.category}
                          </p>
                        </div>
                      )}
                      {request.details.industry && (
                        <div>
                          <p className="text-xs text-[#6b7280]">Industry</p>
                          <p className="text-sm font-medium text-[#111827]">
                            {request.details.industry}
                          </p>
                        </div>
                      )}
                      {request.details.website && (
                        <div>
                          <p className="text-xs text-[#6b7280]">Website</p>
                          <p className="text-sm font-medium text-[#3b82f6]">
                            {request.details.website}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {request.documents.map((doc) => (
                        <Badge key={doc} variant="default">{doc}</Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {request.status === 'pending' && (
                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button variant="success" size="sm">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Approve
                    </Button>
                    <Button variant="danger" size="sm">
                      <X className="w-4 h-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}

          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6b7280]">No verification requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}