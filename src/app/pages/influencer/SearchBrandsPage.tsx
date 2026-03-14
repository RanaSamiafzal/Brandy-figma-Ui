import { useState } from 'react';
import { Search, Filter, MapPin, DollarSign, Users, TrendingUp, Send, Heart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { DashboardLayout } from '../../components/DashboardLayout';

interface Brand {
  id: string;
  name: string;
  logo: string;
  industry: string;
  location: string;
  activeCampaigns: number;
  avgBudget: string;
  rating: number;
  description: string;
  tags: string[];
}

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'FashionHub',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    industry: 'Fashion & Lifestyle',
    location: 'New York, NY',
    activeCampaigns: 5,
    avgBudget: '$500-$1,000',
    rating: 4.8,
    description: 'Leading fashion brand looking for lifestyle influencers',
    tags: ['Fashion', 'Lifestyle', 'Clothing']
  },
  {
    id: '2',
    name: 'TechGear Pro',
    logo: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=100&h=100&fit=crop',
    industry: 'Technology',
    location: 'San Francisco, CA',
    activeCampaigns: 8,
    avgBudget: '$1,000-$2,500',
    rating: 4.9,
    description: 'Tech company seeking reviewers and tech enthusiasts',
    tags: ['Technology', 'Gadgets', 'Reviews']
  },
  {
    id: '3',
    name: 'WellnessLife',
    logo: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop',
    industry: 'Health & Wellness',
    location: 'Los Angeles, CA',
    activeCampaigns: 6,
    avgBudget: '$400-$800',
    rating: 4.7,
    description: 'Wellness brand promoting healthy lifestyle',
    tags: ['Wellness', 'Health', 'Fitness']
  }
];

export function SearchBrandsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const toggleSaved = (id: string) => {
    const newSaved = new Set(saved);
    if (newSaved.has(id)) {
      newSaved.delete(id);
    } else {
      newSaved.add(id);
    }
    setSaved(newSaved);
  };

  const filteredBrands = mockBrands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
          <h1 className="text-2xl font-bold text-[#111827]">Search Brands</h1>
          <p className="text-[#6b7280] mt-1">Find brands to collaborate with</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Brand Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBrands.map((brand) => (
            <Card key={brand.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <img src={brand.logo} alt={brand.name} className="w-16 h-16 rounded-lg object-cover" />
                <button
                  onClick={() => toggleSaved(brand.id)}
                  className={`p-2 rounded-lg ${saved.has(brand.id) ? 'bg-[#fee2e2] text-[#ef4444]' : 'bg-[#f3f4f6] text-[#6b7280]'}`}
                >
                  <Heart className={`w-5 h-5 ${saved.has(brand.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-[#111827] mb-1">{brand.name}</h3>
              <p className="text-sm text-[#6b7280] mb-3">{brand.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {brand.tags.map((tag) => (
                  <Badge key={tag} variant="default">{tag}</Badge>
                ))}
              </div>
              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center gap-2 text-[#6b7280]">
                  <MapPin className="w-4 h-4" />
                  {brand.location}
                </div>
                <div className="flex items-center gap-2 text-[#6b7280]">
                  <DollarSign className="w-4 h-4" />
                  {brand.avgBudget}
                </div>
                <div className="flex items-center gap-2 text-[#6b7280]">
                  <Users className="w-4 h-4" />
                  {brand.activeCampaigns} active campaigns
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Profile</Button>
                <Button variant="primary" size="sm" className="flex-1">
                  <Send className="w-4 h-4 mr-1" />
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}