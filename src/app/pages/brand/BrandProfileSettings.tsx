import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../../components/DashboardLayout';
import { Card, CardHeader } from '../../components/Cards';
import { Input, Select, Textarea } from '../../components/FormComponents';
import { InfluButton } from '../../components/InfluButton';
import { Camera, Save, X } from 'lucide-react';
import { toast } from 'sonner';

export function BrandProfileSettings() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop');
  const [activeTab, setActiveTab] = useState<'profile' | 'social' | 'security'>('profile');

  const [profileData, setProfileData] = useState({
    name: 'BravoTech',
    email: 'contact@bravotech.com',
    phone: '+1 (555) 123-4567',
    website: 'https://bravotech.com',
    industry: 'technology',
    location: 'San Francisco, CA',
    description: 'Leading technology brand focused on innovative solutions for modern businesses.',
  });

  const [socialLinks, setSocialLinks] = useState({
    instagram: 'https://instagram.com/bravotech',
    youtube: 'https://youtube.com/@bravotech',
    twitter: 'https://twitter.com/bravotech',
    tiktok: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSocialLinks({
      ...socialLinks,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    toast.success('Brand profile updated successfully!');
  };

  const handleSaveSocial = () => {
    toast.success('Social links updated successfully!');
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters!');
      return;
    }
    toast.success('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const tabs = [
    { id: 'profile', label: 'Brand Information' },
    { id: 'social', label: 'Social Media' },
    { id: 'security', label: 'Security' },
  ];

  return (
    <DashboardLayout
      userRole="brand"
      userName={profileData.name}
      notificationCount={3}
      onLogout={() => navigate('/login')}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#111827] mb-2">Brand Profile Settings</h2>
          <p className="text-[#6b7280]">Manage your brand account settings and preferences.</p>
        </div>

        {/* Tabs */}
        <Card>
          <div className="flex gap-2 border-b border-[#e5e7eb]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-3 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#3b82f6]'
                    : 'text-[#6b7280] hover:text-[#111827]'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6]"></div>
                )}
              </button>
            ))}
          </div>
        </Card>

        {/* Profile Information Tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader title="Brand Information" />
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="Brand Logo"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#e5e7eb]"
                  />
                  <label className="absolute bottom-0 right-0 w-8 h-8 bg-[#3b82f6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2563eb] transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827] mb-1">Brand Logo</h3>
                  <p className="text-sm text-[#6b7280] mb-2">
                    Upload your brand logo. Recommended size: 400x400px
                  </p>
                  <label className="cursor-pointer">
                    <span className="text-sm text-[#3b82f6] hover:underline">Upload new image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Brand Name"
                  name="name"
                  value={profileData.name}
                  onChange={handleProfileChange}
                  required
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  required
                />
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                />
                <Input
                  label="Website"
                  type="url"
                  name="website"
                  value={profileData.website}
                  onChange={handleProfileChange}
                />
                <Select
                  label="Industry"
                  name="industry"
                  value={profileData.industry}
                  onChange={handleProfileChange}
                  options={[
                    { value: 'technology', label: 'Technology' },
                    { value: 'fashion', label: 'Fashion' },
                    { value: 'beauty', label: 'Beauty' },
                    { value: 'fitness', label: 'Fitness' },
                    { value: 'food', label: 'Food & Beverage' },
                    { value: 'travel', label: 'Travel' },
                    { value: 'lifestyle', label: 'Lifestyle' },
                    { value: 'gaming', label: 'Gaming' },
                  ]}
                />
                <Input
                  label="Location"
                  name="location"
                  value={profileData.location}
                  onChange={handleProfileChange}
                />
              </div>

              <Textarea
                label="Company Description"
                name="description"
                value={profileData.description}
                onChange={handleProfileChange}
                rows={4}
              />

              <div className="flex gap-3">
                <InfluButton variant="primary" onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </InfluButton>
                <InfluButton variant="outline" onClick={() => navigate('/dashboard')}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </InfluButton>
              </div>
            </div>
          </Card>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <Card>
            <CardHeader title="Social Media Links" />
            <div className="space-y-6">
              <p className="text-sm text-[#6b7280]">
                Add your brand's social media profiles to increase visibility.
              </p>

              <div className="space-y-4">
                <Input
                  label="Instagram Profile"
                  name="instagram"
                  value={socialLinks.instagram}
                  onChange={handleSocialChange}
                  placeholder="https://instagram.com/yourbrand"
                />
                <Input
                  label="YouTube Channel"
                  name="youtube"
                  value={socialLinks.youtube}
                  onChange={handleSocialChange}
                  placeholder="https://youtube.com/@yourbrand"
                />
                <Input
                  label="Twitter/X Profile"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialChange}
                  placeholder="https://twitter.com/yourbrand"
                />
                <Input
                  label="TikTok Profile"
                  name="tiktok"
                  value={socialLinks.tiktok}
                  onChange={handleSocialChange}
                  placeholder="https://tiktok.com/@yourbrand"
                />
              </div>

              <div className="flex gap-3">
                <InfluButton variant="primary" onClick={handleSaveSocial}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Social Links
                </InfluButton>
                <InfluButton variant="outline" onClick={() => navigate('/dashboard')}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </InfluButton>
              </div>
            </div>
          </Card>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader title="Change Password" />
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <Input
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
                <p className="text-sm text-[#6b7280]">
                  Password must be at least 8 characters long and include letters and numbers.
                </p>
                <InfluButton variant="primary" onClick={handleChangePassword}>
                  Update Password
                </InfluButton>
              </div>
            </Card>

            <Card>
              <CardHeader title="Account Settings" />
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-[#e5e7eb]">
                  <div>
                    <p className="font-medium text-[#111827]">Email Notifications</p>
                    <p className="text-sm text-[#6b7280]">Receive email updates about your activity</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-[#e5e7eb]">
                  <div>
                    <p className="font-medium text-[#111827]">Marketing Communications</p>
                    <p className="text-sm text-[#6b7280]">Receive tips, updates, and promotional content</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#d1d5db] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#93c5fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e5e7eb] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3b82f6]"></div>
                  </label>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold text-[#111827] mb-2">Danger Zone</h4>
                  <div className="border border-[#ef4444] rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-[#111827] mb-1">Delete Account</p>
                        <p className="text-sm text-[#6b7280]">
                          Permanently delete your brand account and all associated data. This action cannot be undone.
                        </p>
                      </div>
                      <InfluButton variant="danger" size="sm">
                        Delete
                      </InfluButton>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
