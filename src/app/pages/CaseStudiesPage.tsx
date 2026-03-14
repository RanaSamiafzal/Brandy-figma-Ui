import React from 'react';
import { useNavigate } from 'react-router';
import { LandingNavbar } from '../components/LandingNavbar';
import { InfluButton } from '../components/InfluButton';
import { TrendingUp, Target, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';

export function CaseStudiesPage() {
  const navigate = useNavigate();

  const caseStudies = [
    {
      company: 'FashionForward',
      industry: 'Fashion & Retail',
      logo: '👗',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=500&fit=crop',
      challenge: 'Struggling to reach younger demographics and increase online sales during seasonal launches.',
      solution: 'Partnered with 50+ micro-influencers across Instagram and TikTok to create authentic content showcasing their new collection.',
      results: [
        { metric: 'Sales Increase', value: '285%' },
        { metric: 'Engagement Rate', value: '8.2%' },
        { metric: 'New Customers', value: '12,500+' },
        { metric: 'ROI', value: '420%' },
      ],
      testimonial: 'Brandly helped us connect with the perfect influencers. The results exceeded our expectations!',
      author: 'Jennifer Martinez, CMO',
      color: 'from-[#ec4899] to-[#8b5cf6]',
    },
    {
      company: 'TechGear Pro',
      industry: 'Technology & Electronics',
      logo: '💻',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=500&fit=crop',
      challenge: 'Low brand awareness and difficulty standing out in a crowded tech accessories market.',
      solution: 'Collaborated with tech reviewers and lifestyle influencers to create detailed product reviews and unboxing videos.',
      results: [
        { metric: 'Brand Awareness', value: '+340%' },
        { metric: 'Video Views', value: '2.5M' },
        { metric: 'Website Traffic', value: '+180%' },
        { metric: 'Conversion Rate', value: '6.8%' },
      ],
      testimonial: 'The platform made it incredibly easy to find tech-savvy influencers who truly understood our products.',
      author: 'David Chen, Marketing Director',
      color: 'from-[#3b82f6] to-[#06b6d4]',
    },
    {
      company: 'HealthyBites',
      industry: 'Food & Beverage',
      logo: '🍎',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=500&fit=crop',
      challenge: 'Needed to build trust and credibility for their new organic meal kit subscription service.',
      solution: 'Engaged wellness influencers and nutritionists to share their genuine experiences with the meal kits through recipe videos and reviews.',
      results: [
        { metric: 'Subscriptions', value: '+425%' },
        { metric: 'Social Mentions', value: '15,000+' },
        { metric: 'Customer Retention', value: '89%' },
        { metric: 'Revenue Growth', value: '+520%' },
      ],
      testimonial: 'Working with authentic health-focused influencers was key to our success. Brandly made it seamless.',
      author: 'Sarah Thompson, Founder & CEO',
      color: 'from-[#10b981] to-[#059669]',
    },
    {
      company: 'TravelExplore',
      industry: 'Travel & Tourism',
      logo: '✈️',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=500&fit=crop',
      challenge: 'Post-pandemic recovery needed to rebuild traveler confidence and bookings.',
      solution: 'Partnered with travel bloggers and adventure influencers to showcase destinations through immersive content.',
      results: [
        { metric: 'Bookings', value: '+380%' },
        { metric: 'Reach', value: '5M+' },
        { metric: 'Engagement', value: '12.5%' },
        { metric: 'Brand Sentiment', value: '+95%' },
      ],
      testimonial: 'The influencer content created wanderlust and trust that brought customers back to travel.',
      author: 'Michael Roberts, VP Marketing',
      color: 'from-[#f59e0b] to-[#d97706]',
    },
    {
      company: 'BeautyBloom',
      industry: 'Beauty & Cosmetics',
      logo: '💄',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=500&fit=crop',
      challenge: 'Launching a new skincare line in a saturated market with limited budget.',
      solution: 'Focused on nano and micro-influencers with highly engaged communities interested in clean beauty.',
      results: [
        { metric: 'Launch Sales', value: '$850K' },
        { metric: 'UGC Content', value: '3,200+' },
        { metric: 'Social Growth', value: '+245%' },
        { metric: 'Customer LTV', value: '+165%' },
      ],
      testimonial: 'Brandly\'s platform helped us find authentic beauty enthusiasts who became brand advocates.',
      author: 'Emily Watson, Brand Manager',
      color: 'from-[#ec4899] to-[#f43f5e]',
    },
    {
      company: 'FitLife Active',
      industry: 'Fitness & Wellness',
      logo: '💪',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop',
      challenge: 'Needed to differentiate from competitors and build a loyal fitness community.',
      solution: 'Created an ambassador program with fitness influencers who shared workout routines and transformation stories.',
      results: [
        { metric: 'App Downloads', value: '125K+' },
        { metric: 'Active Users', value: '+420%' },
        { metric: 'Community Size', value: '85K' },
        { metric: 'Retention Rate', value: '76%' },
      ],
      testimonial: 'Our influencer ambassadors created a movement that transformed our brand into a community.',
      author: 'Alex Turner, Head of Growth',
      color: 'from-[#8b5cf6] to-[#6366f1]',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#eff6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#3b82f6] rounded-2xl mb-6">
            <Award className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-[#111827] mb-6">
            Success Stories
          </h1>
          <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
            See how brands are achieving remarkable results with influencer marketing on Brandly
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Successful Campaigns' },
              { value: '$50M+', label: 'Revenue Generated' },
              { value: '380%', label: 'Average ROI' },
              { value: '98%', label: 'Client Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#3b82f6] mb-2">{stat.value}</div>
                <div className="text-[#6b7280]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-6 bg-[#f9fafb]">
        <div className="max-w-7xl mx-auto space-y-20">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${study.color} p-8 text-white`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{study.logo}</div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1">{study.company}</h2>
                    <p className="text-white/90">{study.industry}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Image */}
                  <div className="order-2 lg:order-1">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="w-full h-64 lg:h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Challenge & Solution */}
                  <div className="order-1 lg:order-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#111827] mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#3b82f6]" />
                        The Challenge
                      </h3>
                      <p className="text-[#6b7280] leading-relaxed">{study.challenge}</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#111827] mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-[#10b981]" />
                        The Solution
                      </h3>
                      <p className="text-[#6b7280] leading-relaxed">{study.solution}</p>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#111827] mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
                    The Results
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="text-center p-4 bg-[#f9fafb] rounded-xl">
                        <div className="text-3xl font-bold text-[#3b82f6] mb-2">
                          {result.value}
                        </div>
                        <div className="text-sm text-[#6b7280]">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-[#f9fafb] p-6 rounded-xl border-l-4 border-[#3b82f6]">
                  <p className="text-[#111827] italic mb-3">"{study.testimonial}"</p>
                  <p className="text-[#6b7280] font-medium">— {study.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join these successful brands and start achieving remarkable results with influencer marketing
          </p>
          <InfluButton 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/signup')}
            className="bg-white text-[#3b82f6] hover:bg-[#f9fafb] border-white"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </InfluButton>
        </div>
      </section>
    </div>
  );
}
