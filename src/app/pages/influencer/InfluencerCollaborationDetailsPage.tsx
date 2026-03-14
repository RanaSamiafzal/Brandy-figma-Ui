import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  Target,
  Upload,
  Building2,
  X,
  Link as LinkIcon,
  Paperclip,
  FileText,
  MoreVertical
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export function InfluencerCollaborationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);

  // Mock data - would be fetched based on collaboration ID
  const collaboration = {
    id: id || '1',
    brandName: 'FashionHub',
    brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    brandContactEmail: 'contact@fashionhub.com',
    brandId: 'fashionhub',
    campaignName: 'Summer Collection Launch',
    campaignDescription: 'Promote our new summer collection through engaging Instagram content and stories',
    campaignObjectives: [
      'Increase brand awareness among 18-35 age group',
      'Drive traffic to e-commerce site',
      'Generate 50+ user-generated content pieces'
    ],
    platforms: ['Instagram', 'TikTok'],
    contentTypes: ['Posts', 'Stories', 'Reels'],
    status: 'ongoing' as const,
    startDate: '2024-02-01',
    endDate: '2024-03-31',
    createdAt: '2024-01-15',
    lastActivity: '2 hours ago',
    deliverables: [
      {
        id: '1',
        title: 'Instagram Feed Post #1',
        dueDate: '2024-02-10',
        status: 'approved' as const,
        submittedDate: '2024-02-08'
      },
      {
        id: '2',
        title: 'Instagram Stories Series',
        dueDate: '2024-02-15',
        status: 'approved' as const,
        submittedDate: '2024-02-14'
      },
      {
        id: '3',
        title: 'TikTok Reel #1',
        dueDate: '2024-02-20',
        status: 'delivered' as const,
        submittedDate: '2024-02-19'
      },
      {
        id: '4',
        title: 'Instagram Feed Post #2',
        dueDate: '2024-02-25',
        status: 'in-progress' as const
      },
      {
        id: '5',
        title: 'TikTok Reel #2',
        dueDate: '2024-03-05',
        status: 'pending' as const
      },
      {
        id: '6',
        title: 'Final Campaign Report',
        dueDate: '2024-03-31',
        status: 'pending' as const
      },
    ],
    progress: 67,
    payment: '$800',
    paymentStatus: 'partial' as const,
    paymentMilestones: [
      { id: '1', amount: '$400', description: 'Initial Payment', dueDate: '2024-02-01', status: 'paid' as const },
      { id: '2', amount: '$400', description: 'Final Payment', dueDate: '2024-03-31', status: 'pending' as const },
    ],
    unreadCount: 2
  };

  const completedDeliverables = collaboration.deliverables.filter(d =>
    d.status === 'approved' || d.status === 'delivered'
  ).length;

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'ongoing': return 'bg-[#fef3c7] text-[#f59e0b]';
      case 'completed': return 'bg-[#d1fae5] text-[#10b981]';
      case 'pending': return 'bg-[#e0e7ff] text-[#6366f1]';
      case 'cancelled': return 'bg-[#fee2e2] text-[#ef4444]';
      case 'on-hold': return 'bg-[#f3f4f6] text-[#6b7280]';
      default: return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  const getDeliverableStatusColor = (status: string): string => {
    switch (status) {
      case 'approved': return 'bg-[#d1fae5] text-[#10b981]';
      case 'delivered': return 'bg-[#dbeafe] text-[#3b82f6]';
      case 'in-progress': return 'bg-[#fef3c7] text-[#f59e0b]';
      case 'pending': return 'bg-[#f3f4f6] text-[#6b7280]';
      case 'revision-requested': return 'bg-[#fee2e2] text-[#ef4444]';
      default: return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  const getPaymentStatusColor = (status: string): string => {
    switch (status) {
      case 'paid': return 'bg-[#d1fae5] text-[#10b981]';
      case 'partial': return 'bg-[#fef3c7] text-[#f59e0b]';
      case 'pending': return 'bg-[#f3f4f6] text-[#6b7280]';
      case 'cancelled': return 'bg-[#fee2e2] text-[#ef4444]';
      default: return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  return (
    <DashboardLayout
      userRole="influencer"
      userName="Sarah Chen"
      notificationCount={5}
      onLogout={() => navigate('/login')}
    >
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/influencer/collaborations-page')}
              className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to My Collaborations
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={collaboration.brandLogo}
                  alt={collaboration.brandName}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-[#111827] mb-2">{collaboration.campaignName}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#6b7280]">by {collaboration.brandName}</span>
                    <Badge className={`${getStatusColor(collaboration.status)} border-0 uppercase`}>
                      {collaboration.status}
                    </Badge>
                    <Badge className={`${getPaymentStatusColor(collaboration.paymentStatus)} border-0 uppercase`}>
                      Payment: {collaboration.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/influencer/deliverable-board/${id}`)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Tasks
                </Button>
                <Button variant="outline">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="deliverables">My Tasks</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Campaign Overview */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-[#111827] mb-4">Campaign Overview</h3>
                    <p className="text-[#6b7280] mb-4">{collaboration.campaignDescription}</p>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-semibold text-[#111827] mb-2">Campaign Objectives</h4>
                        <ul className="space-y-2">
                          {collaboration.campaignObjectives.map((objective, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-[#6b7280]">
                              <Target className="w-4 h-4 text-[#3b82f6] mt-0.5 flex-shrink-0" />
                              {objective}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e5e7eb]">
                        <div>
                          <p className="text-sm text-[#6b7280] mb-1">Platforms</p>
                          <div className="flex gap-2">
                            {collaboration.platforms.map((platform) => (
                              <Badge key={platform} variant="outline">{platform}</Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-[#6b7280] mb-1">Content Types</p>
                          <div className="flex gap-2 flex-wrap">
                            {collaboration.contentTypes.map((type) => (
                              <Badge key={type} variant="outline">{type}</Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#e5e7eb]">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#6b7280]" />
                          <span className="text-[#6b7280]">Start:</span>
                          <span className="font-medium text-[#111827]">
                            {new Date(collaboration.startDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-[#6b7280]" />
                          <span className="text-[#6b7280]">End:</span>
                          <span className="font-medium text-[#111827]">
                            {new Date(collaboration.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Progress Timeline */}
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-[#111827] mb-4">My Progress</h3>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-[#6b7280]">Overall Progress</span>
                        <span className="font-medium text-[#111827]">{collaboration.progress}%</span>
                      </div>
                      <div className="w-full bg-[#e5e7eb] rounded-full h-3">
                        <div
                          className="bg-[#3b82f6] h-3 rounded-full transition-all"
                          style={{ width: `${collaboration.progress}%` }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-[#6b7280]">Last activity: {collaboration.lastActivity}</p>
                  </Card>
                </TabsContent>

                <TabsContent value="deliverables" className="space-y-4">
                  {collaboration.deliverables.map((deliverable) => (
                    <Card key={deliverable.id} className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-[#111827]">{deliverable.title}</h4>
                        <Badge className={`${getDeliverableStatusColor(deliverable.status)} border-0 uppercase`}>
                          {deliverable.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Due: {new Date(deliverable.dueDate).toLocaleDateString()}
                        </span>
                        {deliverable.submittedDate && (
                          <span className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Submitted: {new Date(deliverable.submittedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      {(deliverable.status === 'pending' || deliverable.status === 'in-progress') && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedDeliverable(deliverable);
                            setShowSubmitModal(true);
                          }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit Deliverable
                        </Button>
                      )}
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Brand Info */}
            <div className="space-y-6">
              {/* Brand Card */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-[#6b7280] mb-4 uppercase">Brand Details</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={collaboration.brandLogo}
                    alt={collaboration.brandName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#111827]">{collaboration.brandName}</h4>
                    <p className="text-sm text-[#6b7280]">@{collaboration.brandId}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                    <Mail className="w-4 h-4" />
                    <span>{collaboration.brandContactEmail}</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  <Building2 className="w-4 h-4 mr-2" />
                  View Brand Profile
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Submit Deliverable Modal */}
        {showSubmitModal && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowSubmitModal(false);
              setSelectedDeliverable(null);
            }}
          >
            <div
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-[#e5e7eb]">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-[#111827]">Submit Deliverable</h2>
                    <p className="text-sm text-[#6b7280] mt-1">{selectedDeliverable?.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSubmitModal(false);
                      setSelectedDeliverable(null);
                    }}
                    className="w-10 h-10 rounded-lg hover:bg-[#f3f4f6] flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5 text-[#6b7280]" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Upload Section */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Upload Files
                  </label>
                  <div className="border-2 border-dashed border-[#d1d5db] rounded-xl p-8 text-center hover:border-[#3b82f6] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-[#6b7280] mx-auto mb-3" />
                    <p className="text-sm font-medium text-[#111827] mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-[#6b7280]">
                      PNG, JPG, PDF, MP4 up to 100MB
                    </p>
                  </div>
                </div>

                {/* Content URL */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Content URL (Optional)
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
                    <input
                      type="url"
                      placeholder="https://instagram.com/p/..."
                      className="w-full pl-10 pr-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    />
                  </div>
                  <p className="text-xs text-[#6b7280] mt-1">
                    Add link to your published content (Instagram post, TikTok, etc.)
                  </p>
                </div>

                {/* Description/Notes */}
                <div>
                  <label className="block text-sm font-semibold text-[#111827] mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Add any notes or comments about this deliverable..."
                    className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
                  />
                </div>

                {/* Deliverable Info */}
                <div className="bg-[#f9fafb] rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7280]">Due Date:</span>
                    <span className="font-medium text-[#111827]">
                      {selectedDeliverable && new Date(selectedDeliverable.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-[#e5e7eb] flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setShowSubmitModal(false);
                    setSelectedDeliverable(null);
                  }}
                >
                  Cancel
                </Button>
                <Button className="flex-1">
                  <Upload className="w-4 h-4 mr-2" />
                  Submit for Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
