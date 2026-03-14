import { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router';
import {
  ArrowLeft,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  MessageSquare,
  Paperclip,
  User,
  Filter,
  Search,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';

interface Deliverable {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'delivered' | 'approved' | 'revision-requested';
  assignee: string;
  assigneeAvatar: string;
  attachments: number;
  comments: number;
  priority: 'low' | 'medium' | 'high';
  submittedFiles?: string[];
  submittedUrl?: string;
  submittedNotes?: string;
}

const mockDeliverables: Deliverable[] = [
  {
    id: '1',
    title: 'Instagram Feed Post #1',
    description: 'Create engaging post showcasing summer collection',
    dueDate: '2024-02-10',
    status: 'approved',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 3,
    comments: 5,
    priority: 'high'
  },
  {
    id: '2',
    title: 'Instagram Stories Series',
    description: '5-part story series highlighting product features',
    dueDate: '2024-02-15',
    status: 'approved',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 8,
    comments: 3,
    priority: 'high'
  },
  {
    id: '3',
    title: 'TikTok Reel #1',
    description: 'Trending audio + product showcase',
    dueDate: '2024-02-20',
    status: 'delivered',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 2,
    comments: 1,
    priority: 'medium'
  },
  {
    id: '4',
    title: 'Instagram Feed Post #2',
    description: 'User-generated content style post',
    dueDate: '2024-02-25',
    status: 'in-progress',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 1,
    comments: 2,
    priority: 'medium'
  },
  {
    id: '5',
    title: 'TikTok Reel #2',
    description: 'Behind-the-scenes content',
    dueDate: '2024-03-05',
    status: 'in-progress',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 0,
    comments: 0,
    priority: 'low'
  },
  {
    id: '6',
    title: 'Final Campaign Report',
    description: 'Comprehensive analytics and insights report',
    dueDate: '2024-03-31',
    status: 'pending',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 0,
    comments: 1,
    priority: 'high'
  },
  {
    id: '7',
    title: 'Product Photography',
    description: 'High-quality product shots for website',
    dueDate: '2024-02-28',
    status: 'pending',
    assignee: 'Sarah Chen',
    assigneeAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    attachments: 0,
    comments: 0,
    priority: 'medium'
  }
];

export function DeliverableBoardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [deliverables] = useState<Deliverable[]>(mockDeliverables);

  // Detect user role from URL path
  const isInfluencer = location.pathname.includes('/influencer/');
  const userRole = isInfluencer ? 'influencer' : 'brand';
  const userName = isInfluencer ? 'Sarah Chen' : 'BravoTech';
  const backPath = isInfluencer
    ? `/influencer/collaboration/${id}`
    : `/brand/collaboration/${id}`;

  const columns = [
    { id: 'pending', title: 'To Do', status: 'pending' as const },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress' as const },
    { id: 'delivered', title: 'Delivered', status: 'delivered' as const },
    { id: 'approved', title: 'Approved', status: 'approved' as const },
  ];

  const getColumnDeliverables = (status: string) => {
    return deliverables.filter(d => d.status === status &&
      (d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       d.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const getPriorityColor = (priority: string): string => {
    switch (priority) {
      case 'high': return 'bg-[#fee2e2] text-[#ef4444]';
      case 'medium': return 'bg-[#fef3c7] text-[#f59e0b]';
      case 'low': return 'bg-[#dbeafe] text-[#3b82f6]';
      default: return 'bg-[#f3f4f6] text-[#6b7280]';
    }
  };

  const getColumnColor = (status: string): string => {
    switch (status) {
      case 'pending': return 'border-t-[#6b7280]';
      case 'in-progress': return 'border-t-[#f59e0b]';
      case 'delivered': return 'border-t-[#3b82f6]';
      case 'approved': return 'border-t-[#10b981]';
      default: return 'border-t-[#6b7280]';
    }
  };

  const getColumnIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertCircle className="w-4 h-4" />;
      case 'delivered': return <FileText className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTotalStats = () => {
    return {
      total: deliverables.length,
      pending: deliverables.filter(d => d.status === 'pending').length,
      inProgress: deliverables.filter(d => d.status === 'in-progress').length,
      delivered: deliverables.filter(d => d.status === 'delivered').length,
      approved: deliverables.filter(d => d.status === 'approved').length,
    };
  };

  const getDueDateColor = (dueDate: string, status: string): string => {
    if (status === 'approved') return 'text-[#10b981]';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'text-[#ef4444]'; // Overdue
    if (diffDays <= 2) return 'text-[#f59e0b]'; // Due soon
    return 'text-[#6b7280]'; // Normal
  };

  const getDueDateLabel = (dueDate: string, status: string): string => {
    if (status === 'approved') return 'Completed';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due Today';
    if (diffDays === 1) return 'Due Tomorrow';
    if (diffDays <= 7) return `Due in ${diffDays} days`;
    return `Due ${due.toLocaleDateString()}`;
  };

  const stats = getTotalStats();

  return (
    <DashboardLayout
      userRole={userRole}
      userName={userName}
      notificationCount={isInfluencer ? 5 : 3}
      onLogout={() => navigate('/login')}
    >
      <div className="min-h-screen bg-[#f9fafb]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-6">
            <button
              onClick={() => navigate(backPath)}
              className="flex items-center gap-2 text-sm text-[#6b7280] hover:text-[#111827] mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Collaboration Details
            </button>

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#111827] mb-2">Deliverable Board</h1>
                <p className="text-[#6b7280]">Track and manage all campaign deliverables</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                {!isInfluencer && (
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Deliverable
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card className="p-4">
              <p className="text-sm text-[#6b7280] mb-1">Total Tasks</p>
              <p className="text-2xl font-bold text-[#111827]">{stats.total}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-[#6b7280] mb-1">To Do</p>
              <p className="text-2xl font-bold text-[#6b7280]">{stats.pending}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-[#6b7280] mb-1">In Progress</p>
              <p className="text-2xl font-bold text-[#f59e0b]">{stats.inProgress}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-[#6b7280] mb-1">Delivered</p>
              <p className="text-2xl font-bold text-[#3b82f6]">{stats.delivered}</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-[#6b7280] mb-1">Approved</p>
              <p className="text-2xl font-bold text-[#10b981]">{stats.approved}</p>
            </Card>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Search deliverables..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] bg-white"
              />
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => {
              const columnDeliverables = getColumnDeliverables(column.status);

              return (
                <div key={column.id} className="flex flex-col">
                  {/* Column Header */}
                  <div className={`bg-white rounded-t-lg border-t-4 ${getColumnColor(column.status)} p-4 mb-2`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getColumnIcon(column.status)}
                        <h3 className="font-semibold text-[#111827]">{column.title}</h3>
                      </div>
                      <Badge variant="outline" className="rounded-full">
                        {columnDeliverables.length}
                      </Badge>
                    </div>
                  </div>

                  {/* Column Content */}
                  <div className="flex-1 space-y-3 min-h-[500px]">
                    {columnDeliverables.map((deliverable) => (
                      <Card
                        key={deliverable.id}
                        className="p-4 hover:shadow-lg transition-all cursor-pointer group"
                      >
                        {/* Priority Badge */}
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={`${getPriorityColor(deliverable.priority)} border-0 text-xs uppercase`}>
                            {deliverable.priority}
                          </Badge>
                          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4 text-[#6b7280]" />
                          </button>
                        </div>

                        {/* Title & Description */}
                        <h4 className="font-semibold text-[#111827] mb-2">{deliverable.title}</h4>
                        <p className="text-sm text-[#6b7280] mb-3 line-clamp-2">{deliverable.description}</p>

                        {/* Due Date - Highlighted */}
                        <div className={`rounded-lg px-3 py-2 mb-3 bg-gradient-to-r from-[#f9fafb] to-white border ${
                          getDueDateColor(deliverable.dueDate, deliverable.status) === 'text-[#ef4444]' 
                            ? 'border-[#ef4444] bg-[#fef2f2]' 
                            : getDueDateColor(deliverable.dueDate, deliverable.status) === 'text-[#f59e0b]'
                            ? 'border-[#f59e0b] bg-[#fffbeb]'
                            : 'border-[#e5e7eb]'
                        }`}>
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${getDueDateColor(deliverable.dueDate, deliverable.status)}`} />
                            <span className={`text-sm font-semibold ${getDueDateColor(deliverable.dueDate, deliverable.status)}`}>
                              {getDueDateLabel(deliverable.dueDate, deliverable.status)}
                            </span>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#e5e7eb]">
                          {/* Assignee */}
                          <div className="flex items-center gap-2">
                            <img
                              src={deliverable.assigneeAvatar}
                              alt={deliverable.assignee}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="text-xs text-[#6b7280]">{deliverable.assignee.split(' ')[0]}</span>
                          </div>

                          {/* Meta Info */}
                          <div className="flex items-center gap-3 text-xs text-[#6b7280]">
                            {deliverable.attachments > 0 && (
                              <span className="flex items-center gap-1">
                                <Paperclip className="w-3 h-3" />
                                {deliverable.attachments}
                              </span>
                            )}
                            {deliverable.comments > 0 && (
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {deliverable.comments}
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}

                    {/* Add Card Button - Only for Brands */}
                    {!isInfluencer && (
                      <button className="w-full p-4 border-2 border-dashed border-[#e5e7eb] rounded-lg text-[#6b7280] hover:border-[#3b82f6] hover:text-[#3b82f6] transition-colors flex items-center justify-center gap-2">
                        <Plus className="w-4 h-4" />
                        <span className="text-sm font-medium">Add Task</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}