import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { DashboardLayout } from '../components/DashboardLayout';
import { Card } from '../components/Cards';
import { InfluButton } from '../components/InfluButton';
import { StatusBadge } from '../components/StatusBadge';
import { 
  Instagram, 
  Youtube, 
  Twitter, 
  Users, 
  MapPin, 
  Calendar, 
  Mail, 
  ExternalLink,
  MessageSquare,
  BarChart3,
  Award,
  Globe,
  TrendingUp
} from 'lucide-react';

export function InfluencerProfilePage() {
  const { name } = useParams();
  const navigate = useNavigate();

  // Mock data for the influencer - in a real app, this would be fetched based on the ID/Name
  const influencer = {
    name: name || 'HealthMika',
    handle: '@mika_wellness',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1200&h=400&fit=crop',
    platform: 'Instagram' as const,
    followers: '50.2k',
    engagement: '4.8%',
    category: 'Health & Wellness',
    location: 'Los Angeles, CA',
    joinedDate: 'Joined March 2023',
    verified: true,
    bio: 'Helping you live your best life through mindful eating and daily movement. Yoga instructor and certified nutritionist. Featured in Vogue Health and Wellness Weekly.',
    stats: [
      { label: 'Avg Likes', value: '2.4k' },
      { label: 'Avg Comments', value: '156' },
      { label: 'Reels Views', value: '15k - 40k' },
      { label: 'Completion Rate', value: '92%' },
    ],
    recentPosts: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=300&fit=crop',
      'https://images.unsplash.com/photo-1545201071-75f058a69418?w=300&h=300&fit=crop',
    ],
    audienceDemographics: {
      age: [
        { label: '18-24', percentage: 25 },
        { label: '25-34', percentage: 45 },
        { label: '35-44', percentage: 20 },
        { label: '45+', percentage: 10 },
      ],
      gender: [
        { label: 'Female', percentage: 72 },
        { label: 'Male', percentage: 25 },
        { label: 'Other', percentage: 3 },
      ],
      topCountries: [
        { name: 'USA', percentage: 65 },
        { name: 'UK', percentage: 12 },
        { name: 'Canada', percentage: 8 },
        { name: 'Australia', percentage: 5 },
      ]
    }
  };

  const platformIcons = {
    Instagram: Instagram,
    Youtube: Youtube,
    Twitter: Twitter,
    TikTok: Users,
  };

  const PlatformIcon = platformIcons[influencer.platform] || Users;

  return (
    <DashboardLayout
      userRole="brand"
      userName="BravoTech"
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 md:h-64 rounded-2xl overflow-hidden bg-gray-200">
            <img 
              src={influencer.coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-16 left-8 flex items-end gap-6">
            <div className="relative">
              <img 
                src={influencer.image} 
                alt={influencer.name} 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover bg-white"
              />
              {influencer.verified && (
                <div className="absolute bottom-2 right-2">
                  <StatusBadge status="verified" />
                </div>
              )}
            </div>
            <div className="mb-4 hidden md:block">
              <h1 className="text-3xl font-bold text-white drop-shadow-md">{influencer.name}</h1>
              <p className="text-white/90 font-medium drop-shadow-md">{influencer.handle}</p>
            </div>
          </div>
          <div className="absolute bottom-4 right-8 flex gap-3">
            <InfluButton variant="outline" className="bg-white/90 backdrop-blur-sm border-none hover:bg-white text-[#111827]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </InfluButton>
            <InfluButton variant="primary" className="shadow-lg">
              <Calendar className="w-4 h-4 mr-2" />
              Send Collab Request
            </InfluButton>
          </div>
        </div>

        {/* Name & Title for Mobile */}
        <div className="pt-12 md:hidden">
          <h1 className="text-2xl font-bold text-[#111827]">{influencer.name}</h1>
          <p className="text-[#6b7280] font-medium">{influencer.handle}</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
          
          {/* Left Column: Info & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <h3 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#3b82f6]" />
                About Influencer
              </h3>
              <p className="text-[#4b5563] text-sm leading-relaxed mb-6">
                {influencer.bio}
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-[#6b7280]">
                  <PlatformIcon className="w-4 h-4 mr-3 text-[#3b82f6]" />
                  <span className="font-medium text-[#111827] mr-2">Platform:</span> {influencer.platform}
                </div>
                <div className="flex items-center text-sm text-[#6b7280]">
                  <Globe className="w-4 h-4 mr-3 text-[#3b82f6]" />
                  <span className="font-medium text-[#111827] mr-2">Niche:</span> {influencer.category}
                </div>
                <div className="flex items-center text-sm text-[#6b7280]">
                  <MapPin className="w-4 h-4 mr-3 text-[#3b82f6]" />
                  <span className="font-medium text-[#111827] mr-2">Location:</span> {influencer.location}
                </div>
                <div className="flex items-center text-sm text-[#6b7280]">
                  <Calendar className="w-4 h-4 mr-3 text-[#3b82f6]" />
                  {influencer.joinedDate}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#e5e7eb]">
                <h4 className="text-sm font-semibold text-[#111827] mb-4">External Links</h4>
                <div className="flex flex-wrap gap-2">
                  <a href="#" className="flex items-center px-3 py-1.5 rounded-lg bg-[#eff6ff] text-[#3b82f6] text-xs font-medium hover:bg-[#dbeafe] transition-colors">
                    <Instagram className="w-3.5 h-3.5 mr-1.5" />
                    Instagram Profile
                    <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                  </a>
                  <a href="#" className="flex items-center px-3 py-1.5 rounded-lg bg-[#f9fafb] text-[#4b5563] text-xs font-medium hover:bg-[#f3f4f6] transition-colors">
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Media Kit
                    <ExternalLink className="w-3 h-3 ml-1.5 opacity-50" />
                  </a>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-bold text-[#111827] mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#3b82f6]" />
                Audience Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {influencer.stats.map((stat, i) => (
                  <div key={i} className="p-3 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]">
                    <div className="text-xs text-[#6b7280] mb-1">{stat.label}</div>
                    <div className="text-lg font-bold text-[#111827]">{stat.value}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#111827] mb-1.5">
                    <span>Gender: Female</span>
                    <span>72%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#3b82f6]" style={{ width: '72%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-medium text-[#111827] mb-1.5">
                    <span>Engagement Rate</span>
                    <span>4.8%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#10b981]" style={{ width: '65%' }} />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Content & Analytics */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#111827] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#3b82f6]" />
                  Recent Performance
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#3b82f6]" />
                    <span className="text-xs text-[#6b7280]">Engagement</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#10b981]" />
                    <span className="text-xs text-[#6b7280]">Reach</span>
                  </div>
                </div>
              </div>
              
              {/* Mock Chart Area */}
              <div className="h-64 w-full bg-[#f9fafb] rounded-xl border border-dashed border-[#d1d5db] flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-10 h-10 text-[#d1d5db] mx-auto mb-2" />
                  <p className="text-sm text-[#9ca3af]">Performance analytics chart visualization</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-[#111827]">Recent Content</h3>
                <button className="text-sm text-[#3b82f6] font-medium hover:underline">View all posts</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {influencer.recentPosts.map((post, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden group relative cursor-pointer">
                    <img 
                      src={post} 
                      alt={`Post ${i+1}`} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-xs font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Analysis
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <h3 className="font-bold text-[#111827] mb-4">Audience Age</h3>
                <div className="space-y-4">
                  {influencer.audienceDemographics.age.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#4b5563]">{item.label}</span>
                        <span className="font-bold text-[#111827]">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#3b82f6] rounded-full" 
                          style={{ width: `${item.percentage}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="font-bold text-[#111827] mb-4">Top Countries</h3>
                <div className="space-y-4">
                  {influencer.audienceDemographics.topCountries.map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#4b5563]">{item.name}</span>
                        <span className="font-bold text-[#111827]">{item.percentage}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#10b981] rounded-full" 
                          style={{ width: `${item.percentage}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}