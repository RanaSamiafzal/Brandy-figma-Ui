import { useState } from 'react';
import { MessageSquare, FileText, ExternalLink, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface Collaboration {
  id: string;
  brandName: string;
  brandLogo: string;
  brandId?: string;
  campaignName: string;
  status: 'ongoing' | 'completed' | 'pending';
  startDate: string;
  endDate: string;
  payment: string;
  deliverables: { total: number; completed: number };
  progress: number;
  nextTask?: {
    name: string;
    priority: 'low' | 'medium' | 'high';
    deadline: string;
  };
  paymentStatus: 'paid' | 'pending' | 'processing';
}

const mockCollaborations: Collaboration[] = [
  {
    id: '1',
    brandName: 'FashionHub',
    brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    brandId: 'fashionhub',
    campaignName: 'Summer Collection Launch',
    status: 'ongoing',
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    payment: '$800',
    deliverables: { total: 6, completed: 4 },
    progress: 67,
    nextTask: {
      name: 'Instagram Story Series',
      priority: 'high',
      deadline: 'Mar 15, 2026'
    },
    paymentStatus: 'processing'
  },
  {
    id: '2',
    brandName: 'TECH BRAND',
    brandLogo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    brandId: 'techgear-pro',
    campaignName: 'Product Review Series',
    status: 'ongoing',
    startDate: '2/1/2026',
    endDate: 'Mar 15, 2026',
    payment: '$420',
    deliverables: { total: 4, completed: 1 },
    progress: 25,
    nextTask: {
      name: 'Initial Contact',
      priority: 'medium',
      deadline: 'TBD'
    },
    paymentStatus: 'pending'
  },
  {
    id: '3',
    brandName: 'WellnessLife',
    brandLogo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    brandId: 'wellnesslife',
    campaignName: 'Wellness Challenge',
    status: 'completed',
    startDate: '2024-01-01',
    endDate: '2024-02-15',
    payment: '$600',
    deliverables: { total: 10, completed: 10 },
    progress: 100,
    paymentStatus: 'paid'
  }
];

export function InfluencerCollaborationsPage() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<'all' | 'ongoing' | 'completed' | 'pending'>('all');

  const filteredCollaborations = statusFilter === 'all'
    ? mockCollaborations
    : mockCollaborations.filter(c => c.status === statusFilter);

  const totalEarnings = mockCollaborations
    .filter(c => c.paymentStatus === 'paid')
    .reduce((sum, c) => sum + parseFloat(c.payment.replace(/[$,]/g, '')), 0);

  const getStatusVariant = (status: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (status) {
      case 'ongoing': return 'warning';
      case 'completed': return 'success';
      case 'pending': return 'default';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string): 'success' | 'warning' | 'danger' | 'default' => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'text-[#10b981]';
      case 'pending': return 'text-[#f59e0b]';
      case 'processing': return 'text-[#3b82f6]';
      default: return 'text-[#6b7280]';
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111827]">MY COLLABORATIONS</h1>
              <p className="text-[#6b7280] mt-1">Track your active and past collaborations with brands</p>
            </div>
            <div className="flex items-center gap-2 bg-[#f9fafb] px-4 py-2 rounded-lg">
              <Receipt className="w-5 h-5 text-[#3b82f6]" />
              <div>
                <p className="text-xs text-[#6b7280] uppercase">Total Earnings</p>
                <p className="text-xl font-bold text-[#111827]">${totalEarnings.toLocaleString()}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {(['all', 'ongoing', 'completed', 'pending'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2 rounded-lg font-medium uppercase text-sm transition-all ${
                statusFilter === status
                  ? 'bg-[#3b82f6] text-white shadow-md'
                  : 'bg-white text-[#6b7280] border border-[#e5e7eb] hover:border-[#3b82f6]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Collaborations List */}
        <div className="space-y-4">
          {filteredCollaborations.map((collab) => (
            <Card 
              key={collab.id} 
              className="p-0 hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
              onClick={() => navigate(`/influencer/collaboration/${collab.id}`)}
            >
              <div className="flex flex-col lg:flex-row">
                {/* Left Section */}
                <div className="flex-1 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={collab.brandLogo}
                      alt={collab.brandName}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-base font-bold text-[#111827] uppercase">{collab.brandName}</h3>
                        <Badge variant={getStatusVariant(collab.status)} className="uppercase text-xs">
                          {collab.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-3">
                        <span>{collab.startDate} - {collab.endDate}</span>
                        <span>•</span>
                        <span>Payment: {collab.payment}</span>
                      </div>
                      
                      {/* Progress Section */}
                      <div>
                        <p className="text-xs font-semibold text-[#6b7280] uppercase mb-2">
                          Deliverables Progress
                        </p>
                        <p className="text-sm font-bold text-[#111827] mb-2">
                          {collab.deliverables.completed} OF {collab.deliverables.total} TASKS COMPLETED
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-[#e5e7eb] rounded-full h-2">
                            <div
                              className="bg-[#3b82f6] h-2 rounded-full transition-all"
                              style={{ width: `${collab.progress}%` }}
                            />
                          </div>
                          <span className="text-lg font-bold text-[#3b82f6] min-w-[48px]">{collab.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="bg-[#f9fafb] p-6 lg:w-80 border-t lg:border-t-0 lg:border-l border-[#e5e7eb]">
                  {collab.nextTask && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#6b7280] uppercase">Next Up</span>
                        <Badge variant={getPriorityVariant(collab.nextTask.priority)} className="uppercase text-xs">
                          {collab.nextTask.priority}
                        </Badge>
                      </div>
                      <p className="font-bold text-[#111827] mb-2">{collab.nextTask.name}</p>
                      <p className="text-xs text-[#6b7280] flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        Deadline: {collab.nextTask.deadline}
                      </p>
                    </div>
                  )}

                  <div className="mb-4 pb-4 border-b border-[#e5e7eb]">
                    <p className={`text-xs font-semibold uppercase flex items-center gap-1 ${getPaymentStatusColor(collab.paymentStatus)}`}>
                      <Receipt className="w-3 h-3" />
                      Payment {collab.paymentStatus}
                    </p>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        /* Chat functionality */
                      }}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/influencer/deliverable-board/${collab.id}`);
                      }}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      Tasks
                    </Button>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/brand/${collab.brandId}`);
                    }}
                    className="text-xs text-[#3b82f6] hover:text-[#2563eb] font-medium flex items-center gap-1 w-full justify-center"
                  >
                    View Brand Profile
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {filteredCollaborations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#6b7280]">No collaborations found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}