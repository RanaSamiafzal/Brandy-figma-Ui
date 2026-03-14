import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  MessageSquare,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Download,
  ExternalLink,
  User,
  Mail,
  Phone,
  MapPin,
  Target,
  BarChart3,
  Edit,
  Trash2,
  MoreVertical,
  X,
  XCircle,
  Image as ImageIcon,
  Video,
  File,
  Link as LinkIcon,
  Paperclip
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

export function CollaborationDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  // Mock data - would be fetched based on collaboration ID
  const collaboration = {
    id: id || '1',
    brandName: 'FashionHub',
    brandLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    brandContactEmail: 'contact@fashionhub.com',
    influencerId: 'sarah-chen',
    influencerName: 'Sarah Chen',
    influencerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    influencerContactEmail: 'sarah@example.com',
    campaignName: 'Summer Fashion Collection',
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
        submittedDate: '2024-02-08',
        submittedUrl: 'https://instagram.com/p/ABC123',
        submittedNotes: 'Posted with summer vibes theme. Used product placement naturally in lifestyle shot.',
        submittedFiles: ['summer-post-1.jpg', 'summer-post-1-analytics.pdf']
      },
      {
        id: '2',
        title: 'Instagram Stories Series',
        dueDate: '2024-02-15',
        status: 'approved' as const,
        submittedDate: '2024-02-14',
        submittedUrl: 'https://instagram.com/stories/highlights/789',
        submittedNotes: 'Created 5-part story series with swipe-up links to product pages.',
        submittedFiles: ['stories-series-1.mp4', 'stories-series-2.mp4']
      },
      {
        id: '3',
        title: 'TikTok Reel #1',
        dueDate: '2024-02-20',
        status: 'delivered' as const,
        submittedDate: '2024-02-19',
        submittedUrl: 'https://tiktok.com/@user/video/456',
        submittedNotes: 'Used trending audio "Summer Nights". Video got 50K views in first 6 hours!',
        submittedFiles: ['tiktok-reel-1.mp4', 'tiktok-analytics.png']
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
    budget: '$800',
    paymentStatus: 'partial' as const,
    paymentMilestones: [
      { id: '1', amount: '$400', description: 'Initial Payment', dueDate: '2024-02-01', status: 'paid' as const },
      { id: '2', amount: '$400', description: 'Final Payment', dueDate: '2024-03-31', status: 'pending' as const },
    ],
    metrics: {
      reach: 125000,
      engagement: 8500,
      impressions: 450000,
      clicks: 3200,
      conversions: 145
    },
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
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/brand/collaborations')}
              className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collaborations
            </button>

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex items-start gap-4">
                <img
                  src={collaboration.influencerAvatar}
                  alt={collaboration.influencerName}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-[#111827] mb-2">{collaboration.campaignName}</h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[#6b7280]">with {collaboration.influencerName}</span>
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
                  onClick={() => navigate(`/brand/deliverable-board/${id}`)}
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
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                    <h3 className="text-lg font-bold text-[#111827] mb-4">Progress</h3>
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
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-[#111827]">{deliverable.title}</h4>
                            <Badge className={`${getDeliverableStatusColor(deliverable.status)} border-0 uppercase`}>
                              {deliverable.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-[#6b7280]">
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
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedDeliverable(deliverable);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedDeliverable(deliverable);
                              setShowDeleteConfirm(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-[#ef4444]" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Action buttons for delivered deliverables */}
                      {deliverable.status === 'delivered' && (
                        <div className="flex gap-2 pt-4 border-t border-[#e5e7eb]">
                          <Button
                            size="sm"
                            onClick={() => {
                              // Handle approve
                              console.log('Approve deliverable:', deliverable.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Handle request revision
                              console.log('Request revision:', deliverable.id);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Request Revision
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // Handle view submission
                              console.log('View submission:', deliverable.id);
                              setShowSubmissionModal(true);
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Submission
                          </Button>
                        </div>
                      )}
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="analytics">
                  <Card className="p-6">
                    <h3 className="text-lg font-bold text-[#111827] mb-6">Campaign Analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-[#f9fafb] rounded-lg">
                        <p className="text-sm text-[#6b7280] mb-1">Total Reach</p>
                        <p className="text-2xl font-bold text-[#111827]">
                          {collaboration.metrics?.reach?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-[#f9fafb] rounded-lg">
                        <p className="text-sm text-[#6b7280] mb-1">Engagement</p>
                        <p className="text-2xl font-bold text-[#111827]">
                          {collaboration.metrics?.engagement?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-[#f9fafb] rounded-lg">
                        <p className="text-sm text-[#6b7280] mb-1">Impressions</p>
                        <p className="text-2xl font-bold text-[#111827]">
                          {collaboration.metrics?.impressions?.toLocaleString()}
                        </p>
                      </div>
                      <div className="p-4 bg-[#f9fafb] rounded-lg">
                        <p className="text-sm text-[#6b7280] mb-1">Conversions</p>
                        <p className="text-2xl font-bold text-[#111827]">
                          {collaboration.metrics?.conversions?.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Influencer Info */}
            <div className="space-y-6">
              {/* Influencer Card */}
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-[#6b7280] mb-4 uppercase">Influencer Details</h3>
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={collaboration.influencerAvatar}
                    alt={collaboration.influencerName}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-[#111827]">{collaboration.influencerName}</h4>
                    <p className="text-sm text-[#6b7280]">@{collaboration.influencerId}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                    <Mail className="w-4 h-4" />
                    <span>{collaboration.influencerContactEmail}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => navigate(`/influencer/${collaboration.influencerId}`)}
                >
                  <User className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </Card>
            </div>
          </div>

          {/* Edit Deliverable Modal */}
          {showEditModal && selectedDeliverable && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowEditModal(false);
                setSelectedDeliverable(null);
              }}
            >
              <div
                className="bg-white rounded-2xl max-w-lg w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-[#e5e7eb]">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#111827]">Edit Deliverable</h2>
                    <button
                      onClick={() => {
                        setShowEditModal(false);
                        setSelectedDeliverable(null);
                      }}
                      className="w-10 h-10 rounded-lg hover:bg-[#f3f4f6] flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-[#6b7280]" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedDeliverable.title}
                      className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      defaultValue={selectedDeliverable.dueDate}
                      className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#111827] mb-2">
                      Status
                    </label>
                    <select
                      defaultValue={selectedDeliverable.status}
                      className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="delivered">Delivered</option>
                      <option value="approved">Approved</option>
                      <option value="revision-requested">Revision Requested</option>
                    </select>
                  </div>
                </div>

                <div className="p-6 border-t border-[#e5e7eb] flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedDeliverable(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      // Handle save
                      console.log('Save deliverable changes');
                      setShowEditModal(false);
                      setSelectedDeliverable(null);
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && selectedDeliverable && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowDeleteConfirm(false);
                setSelectedDeliverable(null);
              }}
            >
              <div
                className="bg-white rounded-2xl max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-[#fee2e2] flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-6 h-6 text-[#ef4444]" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#111827] text-center mb-2">
                    Delete Deliverable
                  </h2>
                  <p className="text-[#6b7280] text-center mb-6">
                    Are you sure you want to delete "{selectedDeliverable.title}"? This action cannot be undone.
                  </p>
                </div>

                <div className="p-6 border-t border-[#e5e7eb] flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDeleteConfirm(false);
                      setSelectedDeliverable(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[#ef4444] hover:bg-[#dc2626]"
                    onClick={() => {
                      // Handle delete
                      console.log('Delete deliverable:', selectedDeliverable.id);
                      setShowDeleteConfirm(false);
                      setSelectedDeliverable(null);
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* View Submission Modal */}
          {showSubmissionModal && selectedDeliverable && (
            <div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => {
                setShowSubmissionModal(false);
                setSelectedDeliverable(null);
              }}
            >
              <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b border-[#e5e7eb] sticky top-0 bg-white z-10">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-[#111827]">Deliverable Submission</h2>
                      <p className="text-sm text-[#6b7280] mt-1">{selectedDeliverable.title}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowSubmissionModal(false);
                        setSelectedDeliverable(null);
                      }}
                      className="w-10 h-10 rounded-lg hover:bg-[#f3f4f6] flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5 text-[#6b7280]" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Submission Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#f9fafb] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Status</p>
                      <Badge className={`${getDeliverableStatusColor(selectedDeliverable.status)} border-0 uppercase`}>
                        {selectedDeliverable.status}
                      </Badge>
                    </div>
                    <div className="bg-[#f9fafb] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Submitted Date</p>
                      <p className="text-sm font-medium text-[#111827]">
                        {selectedDeliverable.submittedDate && new Date(selectedDeliverable.submittedDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-[#f9fafb] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Due Date</p>
                      <p className="text-sm font-medium text-[#111827]">
                        {new Date(selectedDeliverable.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-[#f9fafb] rounded-lg p-4">
                      <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Submitted By</p>
                      <p className="text-sm font-medium text-[#111827]">{collaboration.influencerName}</p>
                    </div>
                  </div>

                  {/* Content URL */}
                  {selectedDeliverable.submittedUrl && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#111827] mb-3">Content URL</h3>
                      <div className="flex items-center gap-3 p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                        <LinkIcon className="w-5 h-5 text-[#3b82f6] flex-shrink-0" />
                        <a
                          href={selectedDeliverable.submittedUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#3b82f6] hover:underline text-sm break-all flex-1"
                        >
                          {selectedDeliverable.submittedUrl}
                        </a>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => window.open(selectedDeliverable.submittedUrl, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Open
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Submitted Files */}
                  {selectedDeliverable.submittedFiles && selectedDeliverable.submittedFiles.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#111827] mb-3">Attached Files</h3>
                      <div className="space-y-2">
                        {selectedDeliverable.submittedFiles.map((file: string, index: number) => {
                          const isImage = file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg');
                          const isVideo = file.endsWith('.mp4') || file.endsWith('.mov');
                          const isPDF = file.endsWith('.pdf');
                          
                          return (
                            <div
                              key={index}
                              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#e5e7eb] hover:border-[#3b82f6] hover:shadow-sm transition-all"
                            >
                              <div className="w-10 h-10 rounded-lg bg-[#f9fafb] flex items-center justify-center flex-shrink-0">
                                {isImage && <ImageIcon className="w-5 h-5 text-[#3b82f6]" />}
                                {isVideo && <Video className="w-5 h-5 text-[#f59e0b]" />}
                                {isPDF && <FileText className="w-5 h-5 text-[#ef4444]" />}
                                {!isImage && !isVideo && !isPDF && <File className="w-5 h-5 text-[#6b7280]" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[#111827] truncate">{file}</p>
                                <p className="text-xs text-[#6b7280]">
                                  {isImage && 'Image File'}
                                  {isVideo && 'Video File'}
                                  {isPDF && 'PDF Document'}
                                  {!isImage && !isVideo && !isPDF && 'File'}
                                </p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Submission Notes */}
                  {selectedDeliverable.submittedNotes && (
                    <div>
                      <h3 className="text-sm font-semibold text-[#111827] mb-3">Notes from Influencer</h3>
                      <div className="p-4 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                        <p className="text-sm text-[#111827] whitespace-pre-wrap">{selectedDeliverable.submittedNotes}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-[#e5e7eb] flex gap-3 sticky bottom-0 bg-white">
                  {selectedDeliverable.status === 'delivered' && (
                    <>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          // Handle approve
                          console.log('Approve deliverable:', selectedDeliverable.id);
                          setShowSubmissionModal(false);
                          setSelectedDeliverable(null);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          // Handle request revision
                          console.log('Request revision:', selectedDeliverable.id);
                          setShowSubmissionModal(false);
                          setSelectedDeliverable(null);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Request Revision
                      </Button>
                    </>
                  )}
                  <Button
                    variant={selectedDeliverable.status === 'delivered' ? 'outline' : 'default'}
                    onClick={() => {
                      setShowSubmissionModal(false);
                      setSelectedDeliverable(null);
                    }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}