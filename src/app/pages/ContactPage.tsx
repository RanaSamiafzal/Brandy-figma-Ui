import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { LandingNavbar } from '../components/LandingNavbar';
import { InfluButton } from '../components/InfluButton';
import { MessageSquare, Send, ChevronDown } from 'lucide-react';

export function ContactPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const faqs = [
    {
      question: 'How do I get started with Brandly?',
      answer: 'Getting started is easy! Simply click the "Join now" button, choose whether you\'re a brand or influencer, and complete your profile. Our onboarding process will guide you through setting up your account.',
    },
    {
      question: 'What are the pricing plans?',
      answer: 'Brandly offers flexible pricing plans for both brands and influencers. We have a free tier to get started, as well as premium plans with advanced features. Contact our sales team for custom enterprise solutions.',
    },
    {
      question: 'How does the verification process work?',
      answer: 'Our verification process includes identity verification, social media authentication, and portfolio review. It typically takes 2-3 business days. You\'ll receive an email notification once your profile is verified.',
    },
    {
      question: 'Can I manage multiple campaigns simultaneously?',
      answer: 'Yes! Brandly allows you to manage multiple campaigns at once. Our dashboard provides a comprehensive view of all your active campaigns, making it easy to track progress and communicate with influencers.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For enterprise accounts, we also offer invoice-based payment options.',
    },
    {
      question: 'How do I contact an influencer?',
      answer: 'Once you find an influencer you\'d like to work with, simply click on their profile and use the "Send Collaboration Request" button. You can include your campaign details and budget in your initial message.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, Brandly is available as a web application optimized for both desktop and mobile browsers. We\'re working on native mobile apps for iOS and Android, coming soon!',
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer 24/7 email support, live chat during business hours, and a comprehensive help center with tutorials and guides. Premium users also have access to dedicated account managers.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-6 bg-gradient-to-br from-[#eff6ff] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-[#3b82f6] rounded-2xl mb-4 sm:mb-6">
            <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#111827] mb-4 sm:mb-6">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#6b7280] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white border border-[#e5e7eb] rounded-2xl p-6 sm:p-8 lg:p-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111827] mb-4 sm:mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-[#111827] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-[#111827] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-[#111827] mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-[#111827] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>
              <InfluButton type="submit" variant="primary" size="lg" className="w-full md:w-auto">
                Send Message
                <Send className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </InfluButton>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-[#f9fafb]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-[#6b7280]">
              Find quick answers to common questions about Brandly
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-[#f9fafb] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold text-[#111827] pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-[#6b7280] flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-sm sm:text-base text-[#6b7280] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-[#6b7280] mb-4">Still have questions?</p>
            <InfluButton variant="outline" onClick={() => navigate('/help-center')}>
              Visit Help Center
            </InfluButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#111827] mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-[#6b7280] mb-8">
            Join thousands of brands and influencers building successful partnerships on Brandly
          </p>
          <div className="flex items-center justify-center gap-4">
            <InfluButton variant="primary" size="lg" onClick={() => navigate('/signup')}>
              Join now
            </InfluButton>
            <InfluButton variant="outline" size="lg" onClick={() => navigate('/login')}>
              Log in
            </InfluButton>
          </div>
        </div>
      </section>
    </div>
  );
}