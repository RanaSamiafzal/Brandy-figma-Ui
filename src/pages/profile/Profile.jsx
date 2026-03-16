import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Camera, Save, X } from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card, CardHeader } from '../../components/common/Cards';
import { Input, Select, Textarea } from '../../components/common/FormComponents';
import { Button } from '../../components/common/Button';
import { updateProfile, fetchProfile } from '../../redux/slices/userSlice';
import { logout } from '../../redux/slices/authSlice';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  const { user } = useSelector((state) => state.auth);
  const { profile, loading } = useSelector((state) => state.user);

  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&h=400&fit=crop');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    industry: 'technology',
    location: '',
    description: '',
  });

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        website: profile.website || '',
        industry: profile.industry || 'technology',
        location: profile.location || '',
        description: profile.description || '',
      });
      if (profile.image) setProfileImage(profile.image);
      if (profile.coverImage) setCoverImage(profile.coverImage);
    }
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    dispatch(updateProfile({ ...formData, image: profileImage, coverImage }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile Information' },
    { id: 'security', label: 'Security' },
  ];

  const userRole = user?.role?.toLowerCase() || 'brand';

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <div className="flex pt-[73px]">
        <Sidebar 
          userRole={userRole} 
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">Profile Settings</h2>
              <p className="text-[#6b7280]">Manage your account settings and preferences.</p>
            </div>

            {/* Tabs */}
            <Card className="!p-0 overflow-hidden">
              <div className="flex border-b border-[#e5e7eb]">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
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

            {activeTab === 'profile' && (
              <Card>
                <CardHeader title="Profile Information" />
                <div className="space-y-6">
                  {/* Cover Image */}
                  <div className="relative group">
                    <div className="w-full h-48 rounded-xl overflow-hidden bg-gray-200">
                      <img
                        src={coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <label className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm cursor-pointer hover:bg-white transition-colors flex items-center gap-2 border border-gray-200">
                      <Camera className="w-4 h-4 text-[#3b82f6]" />
                      <span className="text-xs font-medium text-[#111827]">Change Cover</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCoverUpload}
                      />
                    </label>
                  </div>

                  {/* Profile Picture & Info */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12 sm:-mt-16 px-6">
                    <div className="relative">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-md bg-white"
                      />
                      <label className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 bg-[#3b82f6] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2563eb] transition-colors border-2 border-white shadow-sm">
                        <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    </div>
                    <div className="text-center sm:text-left pb-2">
                      <h3 className="text-xl font-bold text-[#111827]">{formData.name || 'Your Name'}</h3>
                      <p className="text-sm text-[#6b7280]">
                        Recommended size: 400x400px
                      </p>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={userRole === 'brand' ? 'Brand Name' : 'Full Name'}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                    <Input
                      label="Website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                    />
                    <Select
                      label={userRole === 'brand' ? 'Industry' : 'Category'}
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
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
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>

                  <Textarea
                    label={userRole === 'brand' ? 'Company Description' : 'Bio'}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />

                  <div className="flex gap-3">
                    <Button variant="primary" onClick={handleSave} isLoading={loading}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/dashboard')}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === 'security' && (
              <Card>
                <CardHeader title="Account Security" />
                <p className="text-[#6b7280]">Manage your password and account security settings here.</p>
                {/* Simplified for this version */}
                <div className="mt-4 space-y-4">
                   <Input label="Current Password" type="password" />
                   <Input label="New Password" type="password" />
                   <Input label="Confirm New Password" type="password" />
                   <Button variant="primary">Update Password</Button>
                </div>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

