import { useState } from 'react';
import { ArrowLeft, Search, Filter, Star, Users, TrendingUp, MapPin, Heart, Send } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

interface InfluencerMatch {
  id: string;
  name: string;
  avatar: string;
  category: string;
  location: string;
  platforms: {
    name: string;
    followers: string;
    engagement: string;
  }[];
  matchScore: number;
  tags: string[];
  campaigns: string[];
  bio: string;
  isSaved: boolean;
}

const mockInfluencers: InfluencerMatch[] = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    category: 'Fashion & Lifestyle',
    location: 'Los Angeles, CA',
    platforms: [
      { name: 'Instagram', followers: '125K', engagement: '4.5%' },
      { name: 'TikTok', followers: '89K', engagement: '6.2%' }
    ],
    matchScore: 95,
    tags: ['Fashion', 'Lifestyle', 'Beauty'],
    campaigns: ['Summer Fashion Collection'],
    bio: 'Fashion enthusiast sharing daily style inspiration',
    isSaved: true
  },
  {
    id: 'mike-johnson',
    name: 'Mike Johnson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    category: 'Tech & Gadgets',
    location: 'San Francisco, CA',
    platforms: [
      { name: 'YouTube', followers: '250K', engagement: '6.2%' },
      { name: 'Instagram', followers: '85K', engagement: '5.1%' }
    ],
    matchScore: 92,
    tags: ['Technology', 'Reviews', 'Gadgets'],
    campaigns: ['Tech Product Launch'],
    bio: 'Tech reviewer helping you make informed decisions',
    isSaved: false
  },
  {
    id: 'emma-davis',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    category: 'Wellness & Fitness',
    location: 'New York, NY',
    platforms: [
      { name: 'Instagram', followers: '180K', engagement: '5.8%' },
      { name: 'YouTube', followers: '95K', engagement: '4.9%' }
    ],
    matchScore: 88,
    tags: ['Wellness', 'Fitness', 'Nutrition'],
    campaigns: ['Wellness Brand Awareness'],
    bio: 'Helping you live your healthiest life',
    isSaved: true
  }
];

export function InfluencerFoundPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [savedFilter, setSavedFilter] = useState<'all' | 'saved'>('all');
  const [influencers, setInfluencers] = useState(mockInfluencers);

  const toggleSaved = (id: string) => {
    setInfluencers(prev => prev.map(inf =>
      inf.id === id ? { ...inf, isSaved: !inf.isSaved } : inf
    ));
  };

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSaved = savedFilter === 'all' || (savedFilter === 'saved' && influencer.isSaved);
    return matchesSearch && matchesSaved;
  });

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-[#10b981]';
    if (score >= 75) return 'text-[#3b82f6]';
    return 'text-[#f59e0b]';
  };

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-[#6b7280] hover:text-[#111827]"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">AI-Matched Influencers</h1>
                <p className="text-[#6b7280] mt-1">Discover perfect influencer matches for your campaigns</p>
              </div>
            </div>
            <Button onClick={() => navigate('/search')}>
              Advanced Search
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search influencers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={savedFilter}
              onChange={(e) => setSavedFilter(e.target.value as any)}
              className="px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            >
              <option value="all">All Influencers</option>
              <option value="saved">Saved Only</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Info Banner */}
        <Card className="p-4 mb-6 bg-[#dbeafe] border-[#93c5fd]">
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-[#3b82f6] mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#111827] mb-1">AI-Powered Matching</h3>
              <p className="text-sm text-[#374151]">
                These influencers are automatically matched to your campaigns based on audience demographics, engagement rates, content style, and past performance.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Total Matches</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">{mockInfluencers.length}</p>
              </div>
              <div className="w-12 h-12 bg-[#dbeafe] rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-[#3b82f6]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Saved</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">
                  {influencers.filter(i => i.isSaved).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-[#fee2e2] rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#ef4444]" />
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b7280]">Avg. Match Score</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">92%</p>
              </div>
              <div className="w-12 h-12 bg-[#d1fae5] rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#10b981]" />
              </div>
            </div>
          </Card>
        </div>

        {/* Influencers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInfluencers.map((influencer) => (
            <Card key={influencer.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#111827] mb-1">{influencer.name}</h3>
                    <p className="text-sm text-[#6b7280] mb-2">{influencer.category}</p>
                    <div className="flex items-center gap-1 text-sm text-[#6b7280]">
                      <MapPin className="w-4 h-4" />
                      {influencer.location}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSaved(influencer.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    influencer.isSaved
                      ? 'bg-[#fee2e2] text-[#ef4444]'
                      : 'bg-[#f3f4f6] text-[#6b7280] hover:bg-[#e5e7eb]'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${influencer.isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Match Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#6b7280]">Match Score</span>
                  <span className={`text-lg font-bold ${getMatchScoreColor(influencer.matchScore)}`}>
                    {influencer.matchScore}%
                  </span>
                </div>
                <div className="w-full bg-[#e5e7eb] rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#3b82f6] to-[#10b981] h-2 rounded-full"
                    style={{ width: `${influencer.matchScore}%` }}
                  />
                </div>
              </div>

              {/* Bio */}
              <p className="text-sm text-[#6b7280] mb-4">{influencer.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {influencer.tags.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>

              {/* Platforms */}
              <div className="space-y-2 mb-4">
                {influencer.platforms.map((platform) => (
                  <div key={platform.name} className="flex items-center justify-between text-sm">
                    <span className="text-[#6b7280]">{platform.name}</span>
                    <div className="flex items-center gap-4">
                      <span className="text-[#111827] font-medium">{platform.followers}</span>
                      <span className="text-[#10b981]">{platform.engagement} eng.</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Matched Campaigns */}
              {influencer.campaigns.length > 0 && (
                <div className="mb-4 p-3 bg-[#f9fafb] rounded-lg">
                  <p className="text-xs text-[#6b7280] mb-1">Matched for campaigns:</p>
                  {influencer.campaigns.map((campaign) => (
                    <p key={campaign} className="text-sm font-medium text-[#111827]">{campaign}</p>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-[#e5e7eb]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/influencer/${influencer.id}`)}
                  className="flex-1"
                >
                  View Profile
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredInfluencers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-[#d1d5db] mx-auto mb-4" />
            <p className="text-[#6b7280] mb-4">No influencers found</p>
            <Button onClick={() => navigate('/search')}>
              Search Influencers
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}