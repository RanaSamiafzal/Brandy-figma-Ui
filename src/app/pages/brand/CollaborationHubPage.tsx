import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  MessageSquare, 
  Plus, 
  Calendar, 
  ExternalLink,
  CheckCircle,
  Clock,
  FileText,
  Upload,
  User
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { InfluButton } from '../../components/InfluButton';
import { Card } from '../../components/Cards';
import { StatusBadge } from '../../components/StatusBadge';

interface Deliverable {
  id: string;
  title: string;
  dueDate: string;
  status: 'delivered' | 'in-progress' | 'pending';
}

export function CollaborationHubPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCreateDeliverable, setShowCreateDeliverable] = useState(false);

  // Mock data - in a real app, this would be fetched based on the collaboration ID
  const collaboration = {
    id: id || '1',
    partnerName: 'FAWAD - TECH',
    influencer: {
      name: 'FAWAD',
      status: 'AVAILABLE' as const,
      role: 'INFLUENCER',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      influencerId: 'fawad-tech'
    },
    deliverables: [
      {
        id: '1',
        title: 'RECORD VIDEO',
        dueDate: '3/10/2025',
        status: 'delivered' as const,
      },
      {
        id: '2',
        title: 'EDITING',
        dueDate: '3/12/2025',
        status: 'in-progress' as const,
      },
      {
        id: '3',
        title: 'VIDEO COLOR GRADE',
        dueDate: '3/13/2025',
        status: 'in-progress' as const,
      },
      {
        id: '4',
        title: 'REEL',
        dueDate: '4/2/2025',
        status: 'in-progress' as const,
      },
    ],
    resources: []
  };

  const completedCount = collaboration.deliverables.filter(d => d.status === 'delivered').length;
  const pendingCount = collaboration.deliverables.filter(d => d.status !== 'delivered').length;
  const totalCount = collaboration.deliverables.length;
  const progressPercentage = Math.round((completedCount / totalCount) * 100);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#10b981]">
            <CheckCircle className="w-3.5 h-3.5" />
            DELIVERED
          </div>
        );
      case 'in-progress':
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#f59e0b]">
            <Clock className="w-3.5 h-3.5" />
            IN PROGRESS
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#6b7280]">
            <Clock className="w-3.5 h-3.5" />
            PENDING
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-[#d1fae5]';
      case 'in-progress':
        return 'bg-[#fef3c7]';
      case 'pending':
        return 'bg-[#f3f4f6]';
      default:
        return 'bg-[#f3f4f6]';
    }
  };

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-white to-[#f0f9ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button
            onClick={() => navigate('/brand/collaborations')}
            className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            BACK TO COLLABORATIONS
          </button>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#3b82f6] rounded-xl flex items-center justify-center">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#111827]">COLLABORATION HUB</h1>
                <p className="text-sm text-[#6b7280] mt-1">PARTNER: {collaboration.partnerName}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <InfluButton
                variant="outline"
                className="bg-white border-[#d1d5db]"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                OPEN CHAT
              </InfluButton>
              <InfluButton
                variant="primary"
                onClick={() => setShowCreateDeliverable(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                CREATE DELIVERABLE
              </InfluButton>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Deliverables */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Section */}
              <Card>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-semibold text-[#6b7280] uppercase tracking-wide">
                      Total Deliverables Progress
                    </h3>
                    <span className="text-2xl font-bold text-[#111827]">{progressPercentage}%</span>
                  </div>
                  <div className="w-full bg-[#e5e7eb] rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#3b82f6] h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[#6b7280]">
                      <span className="font-semibold text-[#111827]">{completedCount}</span> COMPLETED
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#f59e0b]" />
                    <span className="text-[#6b7280]">
                      <span className="font-semibold text-[#111827]">{pendingCount}</span> PENDING
                    </span>
                  </div>
                </div>
              </Card>

              {/* Campaign Deliverables */}
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#3b82f6]" />
                    <h3 className="font-bold text-[#111827]">CAMPAIGN DELIVERABLES</h3>
                  </div>
                  <span className="text-sm text-[#6b7280]">{totalCount} TOTAL</span>
                </div>

                <div className="space-y-3">
                  {collaboration.deliverables.map((deliverable, index) => (
                    <div
                      key={deliverable.id}
                      className={`p-4 rounded-xl border border-[#e5e7eb] ${getStatusColor(deliverable.status)} hover:shadow-md transition-all cursor-pointer group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          deliverable.status === 'delivered' 
                            ? 'bg-[#10b981] text-white' 
                            : 'bg-white text-[#6b7280] border border-[#d1d5db]'
                        }`}>
                          {deliverable.status === 'delivered' ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-sm text-[#111827] mb-1">
                            {deliverable.title}
                          </h4>
                          <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              DUE: {deliverable.dueDate}
                            </div>
                            {getStatusBadge(deliverable.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Influencer Details */}
              <div className="bg-gradient-to-br from-[#3b82f6] to-[#2563eb] rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wide opacity-90">
                    INFLUENCER DETAILS
                  </h3>
                  <User className="w-4 h-4 opacity-90" />
                </div>
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={collaboration.influencer.avatar}
                    alt={collaboration.influencer.name}
                    className="w-14 h-14 rounded-full border-2 border-white/30 object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{collaboration.influencer.name}</h4>
                    <p className="text-xs text-white/80 uppercase tracking-wide">
                      {collaboration.influencer.role} - {collaboration.influencer.status}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/influencer/${collaboration.influencer.influencerId}`)}
                  className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-medium py-2.5 px-4 rounded-lg transition-all flex items-center justify-center gap-2 group"
                >
                  VIEW PROFILE
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* Campaign Resources */}
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-[#111827]">CAMPAIGN RESOURCES</h3>
                  <button className="w-8 h-8 bg-[#3b82f6] hover:bg-[#2563eb] rounded-lg flex items-center justify-center transition-colors">
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
                <div className="text-center py-12 border-2 border-dashed border-[#e5e7eb] rounded-xl">
                  <Upload className="w-10 h-10 text-[#d1d5db] mx-auto mb-3" />
                  <p className="text-xs font-medium text-[#6b7280] uppercase tracking-wide mb-1">
                    NO RESOURCES ADDED
                  </p>
                  <p className="text-xs text-[#9ca3af]">
                    Add notes or links for influencer here
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
