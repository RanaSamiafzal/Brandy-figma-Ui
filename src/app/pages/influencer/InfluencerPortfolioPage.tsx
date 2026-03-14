import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Eye, Heart, MessageCircle, Share2, Instagram, Youtube, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface PortfolioPost {
  id: string;
  title: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  thumbnail: string;
  campaignName: string;
  brandName: string;
  date: string;
  stats: {
    views: string;
    likes: string;
    comments: string;
    shares: string;
  };
  tags: string[];
}

const mockPosts: PortfolioPost[] = [
  {
    id: '1',
    title: 'Summer Fashion Lookbook 2024',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop',
    campaignName: 'Summer Collection Launch',
    brandName: 'FashionHub',
    date: '2024-02-15',
    stats: {
      views: '125K',
      likes: '8.5K',
      comments: '342',
      shares: '156'
    },
    tags: ['Fashion', 'Summer', 'Lifestyle']
  },
  {
    id: '2',
    title: 'Tech Review: Latest Smartphone',
    platform: 'YouTube',
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    campaignName: 'Product Review Series',
    brandName: 'TechGear Pro',
    date: '2024-02-10',
    stats: {
      views: '250K',
      likes: '12K',
      comments: '856',
      shares: '423'
    },
    tags: ['Technology', 'Review', 'Gadgets']
  },
  {
    id: '3',
    title: 'Morning Wellness Routine',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop',
    campaignName: 'Wellness Challenge',
    brandName: 'WellnessLife',
    date: '2024-02-05',
    stats: {
      views: '98K',
      likes: '6.2K',
      comments: '245',
      shares: '98'
    },
    tags: ['Wellness', 'Lifestyle', 'Health']
  },
  {
    id: '4',
    title: 'Makeup Tutorial: Natural Look',
    platform: 'Instagram',
    thumbnail: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop',
    campaignName: 'Beauty Campaign',
    brandName: 'BeautyBox',
    date: '2024-01-28',
    stats: {
      views: '156K',
      likes: '11.2K',
      comments: '523',
      shares: '267'
    },
    tags: ['Beauty', 'Makeup', 'Tutorial']
  },
  {
    id: '5',
    title: 'Fitness Journey Update',
    platform: 'YouTube',
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop',
    campaignName: 'Fitness App Promotion',
    brandName: 'FitLife',
    date: '2024-01-20',
    stats: {
      views: '180K',
      likes: '9.8K',
      comments: '412',
      shares: '189'
    },
    tags: ['Fitness', 'Health', 'Motivation']
  },
  {
    id: '6',
    title: 'Travel Vlog: Beach Paradise',
    platform: 'YouTube',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop',
    campaignName: 'Travel Campaign',
    brandName: 'TravelMore',
    date: '2024-01-15',
    stats: {
      views: '320K',
      likes: '15.6K',
      comments: '987',
      shares: '543'
    },
    tags: ['Travel', 'Vlog', 'Lifestyle']
  }
];

export function InfluencerPortfolioPage() {
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'Instagram' | 'YouTube' | 'TikTok'>('all');

  const filteredPosts = selectedPlatform === 'all'
    ? mockPosts
    : mockPosts.filter(post => post.platform === selectedPlatform);

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram': return Instagram;
      case 'YouTube': return Youtube;
      default: return Instagram;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/influencer/dashboard')}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Portfolio</h1>
                <p className="text-[#6b7280] mt-1">Showcase your best work and collaborations</p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Posts</p>
                <p className="text-3xl font-bold text-[#111827] mt-1">{mockPosts.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Views</p>
                <p className="text-3xl font-bold text-[#111827] mt-1">1.1M</p>
              </div>
              <div className="w-12 h-12 bg-[#fef3c7] rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-[#f59e0b]" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Likes</p>
                <p className="text-3xl font-bold text-[#111827] mt-1">63.3K</p>
              </div>
              <div className="w-12 h-12 bg-[#fee2e2] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Avg. Engagement</p>
                <p className="text-3xl font-bold text-[#111827] mt-1">6.8%</p>
              </div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex gap-2">
            {(['all', 'Instagram', 'YouTube', 'TikTok'] as const).map((platform) => (
              <button
                key={platform}
                onClick={() => setSelectedPlatform(platform)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedPlatform === platform
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-white text-[#6b7280] hover:bg-[#f3f4f6] border border-[#e5e7eb]'
                }`}
              >
                {platform === 'all' ? 'All Platforms' : platform}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const PlatformIcon = getPlatformIcon(post.platform);
            return (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                {/* Thumbnail */}
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="default" className="bg-white/90 backdrop-blur-sm">
                      <PlatformIcon className="w-3 h-3 mr-1" />
                      {post.platform}
                    </Badge>
                  </div>
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur-sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-[#111827] mb-1 line-clamp-1">{post.title}</h3>
                  <p className="text-sm text-[#6b7280] mb-2">{post.brandName}</p>
                  <p className="text-xs text-[#6b7280] mb-3 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="default" className="text-xs">{tag}</Badge>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#e5e7eb]">
                    <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                      <Eye className="w-3 h-3" />
                      {post.stats.views}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                      <Heart className="w-3 h-3" />
                      {post.stats.likes}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                      <MessageCircle className="w-3 h-3" />
                      {post.stats.comments}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#6b7280]">
                      <Share2 className="w-3 h-3" />
                      {post.stats.shares}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <Eye className="w-16 h-16 text-[#d1d5db] mx-auto mb-4" />
            <p className="text-[#6b7280] mb-4">No portfolio items found</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Post
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}