import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Shield, 
  ChevronDown, 
  Search, 
  Target, 
  TrendingUp, 
  Award, 
  Users, 
  Briefcase, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Menu, 
  X, 
  ChevronRight,
  Bell,
  LogOut,
  User
} from 'lucide-react';
import { Button } from '../common/Button';
import { logout } from '../../redux/slices/authSlice';
import { fetchProfile } from '../../redux/slices/userSlice';
import { NotificationPanel } from './NotificationPanel';

export function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.user);
  const isAuthenticated = !!token;
  
  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(fetchProfile());
    }
  }, [isAuthenticated, profile, dispatch]);
  
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileDropdown = (menu) => {
    setMobileDropdownOpen(mobileDropdownOpen === menu ? null : menu);
  };

  const handleMobileNavigate = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  const forBrandsMenu = [
    { icon: Search, label: 'Find Influencers', description: 'Discover perfect matches', route: '/features/find-matches' },
    { icon: Target, label: 'Campaign Management', description: 'Manage your campaigns', route: '/features/campaign-management' },
    { icon: TrendingUp, label: 'Analytics', description: 'Track performance', route: '/features/analytics' },
  ];

  const forInfluencersMenu = [
    { icon: Briefcase, label: 'Find Opportunities', description: 'Browse brand collaborations', route: '/register' },
    { icon: Award, label: 'Get Verified', description: 'Build your credibility', route: '/features/verified-profiles' },
    { icon: Users, label: 'Grow Your Brand', description: 'Expand your reach', route: '/register' },
  ];

  const featuresMenu = [
    { icon: Search, label: 'Find Perfect Matches', route: '/features/find-matches' },
    { icon: Target, label: 'Campaign Management', route: '/features/campaign-management' },
    { icon: TrendingUp, label: 'Real-time Analytics', route: '/features/analytics' },
    { icon: Award, label: 'Verified Profiles', route: '/features/verified-profiles' },
  ];

  const resourcesMenu = [
    { icon: BookOpen, label: 'Blog', route: '/blog' },
    { icon: HelpCircle, label: 'Help Center', route: '/help-center' },
    { icon: FileText, label: 'Case Studies', route: '/case-studies' },
    { icon: Users, label: 'About Us', route: '/about' },
    { icon: Shield, label: 'Privacy Policy', route: '/privacy-policy' },
    { icon: HelpCircle, label: 'Contact Us', route: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-[#e5e7eb] z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <Shield className="w-8 h-8 text-[#3b82f6]" />
              <span className="text-xl font-bold text-[#111827]">Brandly</span>
            </div>

            {/* Desktop Navigation - All items on right */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Navigation Menu */}
              <div className="flex items-center gap-1">
                {/* For Brands Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('brands')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-[#6b7280] hover:text-[#111827] font-medium transition-colors">
                    For Brands
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'brands' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'brands' && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-2">
                      {forBrandsMenu.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigate(item.route)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-[#3b82f6]" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#111827] mb-1">{item.label}</div>
                            <div className="text-sm text-[#6b7280]">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* For Influencers Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('influencers')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-[#6b7280] hover:text-[#111827] font-medium transition-colors">
                    For Influencers
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'influencers' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'influencers' && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-2">
                      {forInfluencersMenu.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigate(item.route)}
                          className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors text-left"
                        >
                          <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center flex-shrink-0">
                            <item.icon className="w-5 h-5 text-[#3b82f6]" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#111827] mb-1">{item.label}</div>
                            <div className="text-sm text-[#6b7280]">{item.description}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Features Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('features')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-[#6b7280] hover:text-[#111827] font-medium transition-colors">
                    Features
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'features' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'features' && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-2">
                      {featuresMenu.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigate(item.route)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors text-left"
                        >
                          <item.icon className="w-5 h-5 text-[#3b82f6]" />
                          <span className="font-medium text-[#111827]">{item.label}</span>
                        </button>
                      ))}
                      <div className="border-t border-[#e5e7eb] my-2" />
                      <button
                        onClick={() => navigate('/features')}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-[#eff6ff] transition-colors text-[#3b82f6] font-semibold"
                      >
                        <span>View All Features</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Resources Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => handleMouseEnter('resources')}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-[#6b7280] hover:text-[#111827] font-medium transition-colors">
                    Resources
                    <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === 'resources' ? 'rotate-180' : ''}`} />
                  </button>
                  {openDropdown === 'resources' && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#e5e7eb] p-2">
                      {resourcesMenu.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => navigate(item.route)}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-[#f9fafb] transition-colors text-left"
                        >
                          <item.icon className="w-5 h-5 text-[#6b7280]" />
                          <span className="font-medium text-[#111827]">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center gap-4">
                {isAuthenticated ? (
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <button 
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                        className="relative p-2 text-[#6b7280] hover:text-[#111827] transition-colors"
                      >
                        <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ef4444] rounded-full border-2 border-white"></span>
                      </button>
                      
                      <NotificationPanel 
                        isOpen={isNotificationOpen} 
                        onClose={() => setIsNotificationOpen(false)} 
                      />
                    </div>
                    
                    <div className="relative">
                      <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white shadow-sm rounded-full overflow-hidden bg-[#3b82f6]">
                          {profile?.image ? (
                            <img src={profile.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white font-bold text-sm">
                              {user?.name?.charAt(0) || <User className="w-5 h-5" />}
                            </div>
                          )}
                        </div>
                        <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {isProfileOpen && (
                        <>
                          <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                          <div className="absolute top-full right-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] overflow-hidden z-50">
                            {/* Profile Header with Cover */}
                            <div className="relative h-24">
                              <img 
                                src={profile?.coverImage || 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=200&fit=crop'} 
                                alt="" 
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-black/20" />
                              <div className="absolute -bottom-6 left-4">
                                <div className="w-16 h-16 rounded-xl border-4 border-white shadow-lg overflow-hidden bg-white">
                                  {profile?.image ? (
                                    <img src={profile.image} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#3b82f6] text-white text-2xl font-bold">
                                      {user?.name?.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                              </div>
                            </div>

                            <div className="pt-8 px-4 pb-4">
                              <div className="mb-4">
                                <h3 className="text-lg font-bold text-[#111827] leading-tight">{profile?.name || user?.name}</h3>
                                <p className="text-xs text-[#6b7280] truncate">{profile?.email || user?.email}</p>
                              </div>

                              <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="bg-[#f9fafb] p-2 rounded-xl border border-[#e5e7eb]">
                                  <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-semibold mb-0.5">Status</p>
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                    <span className="text-xs font-bold text-[#111827]">Active Now</span>
                                  </div>
                                </div>
                                <div className="bg-[#f9fafb] p-2 rounded-xl border border-[#e5e7eb]">
                                  <p className="text-[10px] uppercase tracking-wider text-[#9ca3af] font-semibold mb-0.5">Role</p>
                                  <span className="text-xs font-bold text-[#111827] capitalize">{user?.role || 'Guest'}</span>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <button
                                  onClick={() => { navigate('/profile'); setIsProfileOpen(false); }}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#4b5563] hover:bg-[#eff6ff] hover:text-[#3b82f6] rounded-xl transition-all group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                                    <User className="w-4 h-4" />
                                  </div>
                                  <div className="text-left">
                                    <p className="font-semibold text-[#111827]">Profile Settings</p>
                                    <p className="text-[10px] text-[#9ca3af]">Manage account details</p>
                                  </div>
                                </button>
                                
                                <button
                                  onClick={() => { dispatch(logout()); navigate('/login'); setIsProfileOpen(false); }}
                                  className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-[#ef4444] hover:bg-red-50 rounded-xl transition-all group"
                                >
                                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center group-hover:bg-white transition-colors">
                                    <LogOut className="w-4 h-4" />
                                  </div>
                                  <div className="text-left">
                                    <p className="font-semibold text-[#b91c1c]">Logout</p>
                                    <p className="text-[10px] text-red-300">Sign out of session</p>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => navigate('/login')}
                      className="text-[#6b7280] hover:text-[#111827] font-medium transition-colors"
                    >
                      Log in
                    </button>
                    <Button variant="primary" onClick={() => navigate('/register')}>
                      Join now
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              className="lg:hidden p-2 text-[#6b7280] hover:text-[#111827]"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-80 max-w-sm bg-white z-50 lg:hidden overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#e5e7eb]">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#3b82f6]" />
                <span className="text-base sm:text-lg font-bold text-[#111827]">Brandly</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-[#6b7280] hover:text-[#111827]"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Menu Items */}
            <div className="p-3 sm:p-4">
              {/* For Brands */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileDropdown('brands')}
                  className="w-full flex items-center justify-between p-3 text-sm sm:text-base text-[#111827] font-medium hover:bg-[#f9fafb] rounded-lg"
                >
                  For Brands
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${mobileDropdownOpen === 'brands' ? 'rotate-90' : ''}`} />
                </button>
                {mobileDropdownOpen === 'brands' && (
                  <div className="ml-2 sm:ml-4 mt-2 space-y-1">
                    {forBrandsMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMobileNavigate(item.route)}
                        className="w-full flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#f9fafb] text-left"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-[#111827]">{item.label}</div>
                          <div className="text-[10px] sm:text-xs text-[#6b7280]">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* For Influencers */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileDropdown('influencers')}
                  className="w-full flex items-center justify-between p-3 text-sm sm:text-base text-[#111827] font-medium hover:bg-[#f9fafb] rounded-lg"
                >
                  For Influencers
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${mobileDropdownOpen === 'influencers' ? 'rotate-90' : ''}`} />
                </button>
                {mobileDropdownOpen === 'influencers' && (
                  <div className="ml-2 sm:ml-4 mt-2 space-y-1">
                    {forInfluencersMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMobileNavigate(item.route)}
                        className="w-full flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#f9fafb] text-left"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs sm:text-sm font-medium text-[#111827]">{item.label}</div>
                          <div className="text-[10px] sm:text-xs text-[#6b7280]">{item.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileDropdown('features')}
                  className="w-full flex items-center justify-between p-3 text-sm sm:text-base text-[#111827] font-medium hover:bg-[#f9fafb] rounded-lg"
                >
                  Features
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${mobileDropdownOpen === 'features' ? 'rotate-90' : ''}`} />
                </button>
                {mobileDropdownOpen === 'features' && (
                  <div className="ml-2 sm:ml-4 mt-2 space-y-1">
                    {featuresMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMobileNavigate(item.route)}
                        className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#f9fafb] text-left"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#3b82f6]" />
                        <span className="text-xs sm:text-sm font-medium text-[#111827]">{item.label}</span>
                      </button>
                    ))}
                    <div className="border-t border-[#e5e7eb] my-2" />
                    <button
                      onClick={() => handleMobileNavigate('/features')}
                      className="w-full flex items-center justify-center gap-2 p-3 rounded-lg hover:bg-[#eff6ff] transition-colors text-[#3b82f6] font-semibold"
                    >
                      <span>View All Features</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Resources */}
              <div className="mb-2">
                <button
                  onClick={() => toggleMobileDropdown('resources')}
                  className="w-full flex items-center justify-between p-3 text-sm sm:text-base text-[#111827] font-medium hover:bg-[#f9fafb] rounded-lg"
                >
                  Resources
                  <ChevronRight className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform ${mobileDropdownOpen === 'resources' ? 'rotate-90' : ''}`} />
                </button>
                {mobileDropdownOpen === 'resources' && (
                  <div className="ml-2 sm:ml-4 mt-2 space-y-1">
                    {resourcesMenu.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleMobileNavigate(item.route)}
                        className="w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-[#f9fafb] text-left"
                      >
                        <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#6b7280]" />
                        <span className="text-xs sm:text-sm font-medium text-[#111827]">{item.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="my-4 border-t border-[#e5e7eb]" />

              {/* Auth Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleMobileNavigate('/login')}
                  className="w-full px-4 py-3 text-sm sm:text-base text-[#6b7280] hover:text-[#111827] font-medium text-center hover:bg-[#f9fafb] rounded-lg transition-colors"
                >
                  Log in
                </button>
                <Button 
                  variant="primary" 
                  className="w-full text-sm sm:text-base"
                  onClick={() => handleMobileNavigate('/register')}
                >
                  Join now
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
