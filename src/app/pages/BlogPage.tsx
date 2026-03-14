import React from 'react';
import { useNavigate } from 'react-router';
import { LandingNavbar } from '../components/LandingNavbar';
import { InfluButton } from '../components/InfluButton';
import { Calendar, User, ArrowRight, TrendingUp, Users, Target } from 'lucide-react';

export function BlogPage() {
  const navigate = useNavigate();

  const featuredPost = {
    title: 'The Ultimate Guide to Influencer Marketing in 2026',
    excerpt: 'Discover the latest trends, strategies, and best practices for successful influencer marketing campaigns in the modern digital landscape.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop',
    author: 'Sarah Johnson',
    date: 'February 15, 2026',
    category: 'Marketing Strategy',
    readTime: '8 min read',
  };

  const blogPosts = [
    {
      title: 'How to Measure ROI from Influencer Campaigns',
      excerpt: 'Learn the key metrics and strategies to track and measure the return on investment from your influencer marketing efforts.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
      author: 'Michael Chen',
      date: 'February 12, 2026',
      category: 'Analytics',
      readTime: '6 min read',
    },
    {
      title: '10 Tips for Finding the Perfect Brand Partnerships',
      excerpt: 'Influencers, discover how to identify and secure brand partnerships that align with your values and audience.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop',
      author: 'Emma Davis',
      date: 'February 10, 2026',
      category: 'Influencer Tips',
      readTime: '5 min read',
    },
    {
      title: 'The Rise of Micro-Influencers: Why Small Can Be Better',
      excerpt: 'Explore why micro-influencers are becoming increasingly valuable for brands seeking authentic connections.',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&h=500&fit=crop',
      author: 'David Martinez',
      date: 'February 8, 2026',
      category: 'Trends',
      readTime: '7 min read',
    },
    {
      title: 'Building Long-Term Influencer Relationships',
      excerpt: 'Discover strategies for nurturing lasting partnerships that benefit both brands and influencers.',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop',
      author: 'Lisa Anderson',
      date: 'February 5, 2026',
      category: 'Partnerships',
      readTime: '6 min read',
    },
    {
      title: 'Content Authenticity: The Key to Influencer Success',
      excerpt: 'Learn why authenticity matters more than ever and how to maintain genuine connections with your audience.',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=500&fit=crop',
      author: 'James Wilson',
      date: 'February 3, 2026',
      category: 'Content Strategy',
      readTime: '5 min read',
    },
    {
      title: 'Navigating FTC Guidelines for Influencer Marketing',
      excerpt: 'A comprehensive guide to understanding and complying with FTC disclosure requirements.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop',
      author: 'Rachel Green',
      date: 'February 1, 2026',
      category: 'Legal & Compliance',
      readTime: '8 min read',
    },
  ];

  const categories = [
    { name: 'Marketing Strategy', count: 24, icon: Target },
    { name: 'Analytics', count: 18, icon: TrendingUp },
    { name: 'Influencer Tips', count: 32, icon: Users },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#eff6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#111827] mb-6">
            Brandly Blog
          </h1>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            Insights, tips, and trends in influencer marketing to help you succeed
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white border border-[#e5e7eb] rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#3b82f6] text-white px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-sm text-[#3b82f6] font-semibold mb-2">
                  {featuredPost.category}
                </div>
                <h2 className="text-3xl font-bold text-[#111827] mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-[#6b7280] mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-[#6b7280] mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {featuredPost.author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {featuredPost.date}
                  </div>
                  <div>{featuredPost.readTime}</div>
                </div>
                <InfluButton variant="primary">
                  Read Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </InfluButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#111827]">Latest Articles</h2>
            <div className="flex items-center gap-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 text-sm font-medium text-[#6b7280] hover:text-[#111827] hover:bg-[#f9fafb] rounded-lg transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-[#3b82f6] font-semibold mb-2">
                    {post.category}
                  </div>
                  <h3 className="text-xl font-bold text-[#111827] mb-3 group-hover:text-[#3b82f6] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#6b7280] mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                    <div>{post.readTime}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6b7280] mt-2">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <InfluButton variant="outline" size="lg">
              Load More Articles
            </InfluButton>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to our newsletter for the latest insights and tips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
            />
            <InfluButton variant="outline" className="bg-white text-[#3b82f6] hover:bg-[#f9fafb] border-white">
              Subscribe
            </InfluButton>
          </div>
        </div>
      </section>
    </div>
  );
}
