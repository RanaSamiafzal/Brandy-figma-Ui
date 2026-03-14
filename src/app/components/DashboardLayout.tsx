import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Settings, 
  Bell, 
  LogOut,
  Shield,
  Users,
  BarChart,
  Menu,
  X,
  Target,
  Handshake,
  Building2
} from 'lucide-react';
import { cn } from './ui/utils';
import { NotificationPanel } from './NotificationPanel';
import { ProfileDropdown } from './ProfileDropdown';

interface DashboardLayoutProps {
  userRole: 'brand' | 'influencer' | 'admin';
  userName: string;
  userEmail?: string;
  userImage?: string;
  notificationCount?: number;
  onLogout: () => void;
  children: React.ReactNode;
}

export function DashboardLayout({
  userRole,
  userName,
  userEmail = 'user@example.com',
  userImage,
  notificationCount = 0,
  onLogout,
  children,
}: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const brandNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Search Influencers', path: '/search' },
    { icon: FileText, label: 'My Requests', path: '/brand/collaboration-requests' },
    { icon: Handshake, label: 'Collaborations', path: '/brand/collaborations' },
    { icon: Target, label: 'Campaigns', path: '/brand/campaign-hub' },
    { icon: Settings, label: 'Profile Settings', path: '/brand/settings' },
  ];

  const influencerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/influencer/dashboard' },
    { icon: Building2, label: 'Search Brands', path: '/influencer/search-brands' },
    { icon: FileText, label: 'Collaboration Requests', path: '/influencer/requests-page' },
    { icon: Handshake, label: 'Collaborations', path: '/influencer/collaborations-page' },
    { icon: Settings, label: 'Edit Profile', path: '/influencer/settings' },
  ];

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Shield, label: 'Verifications', path: '/admin/verifications' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: BarChart, label: 'Reports', path: '/admin/reports' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const navItems =
    userRole === 'admin'
      ? adminNavItems
      : userRole === 'brand'
      ? brandNavItems
      : influencerNavItems;

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      {/* Header */}
      <header className="bg-white border-b border-[#e5e7eb] sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-[#6b7280] hover:text-[#111827] p-1"
            >
              {isSidebarOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#3b82f6]" />
              <h1 className="text-base sm:text-xl font-bold text-[#111827]">
                {userRole === 'admin' ? 'Admin Panel' : 
                 userRole === 'brand' ? 'Brand Dashboard' : 
                 'Influencer Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => setIsNotificationOpen(true)} 
              className="relative p-1.5 sm:p-2 text-[#6b7280] hover:text-[#111827]"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-[#ef4444] text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <ProfileDropdown
              userName={userName}
              userEmail={userEmail}
              userImage={userImage}
              userRole={userRole}
              onLogout={onLogout}
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#e5e7eb] transform transition-transform lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full",
            "top-[57px] sm:top-[73px] lg:top-0"
          )}
        >
          <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-[#6b7280] hover:bg-[#eff6ff] hover:text-[#3b82f6] rounded-lg transition-colors text-sm sm:text-base"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-[#ef4444] hover:bg-[#fee2e2] rounded-lg transition-colors text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {children}
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Notification Panel */}
      <NotificationPanel 
        isOpen={isNotificationOpen} 
        onClose={() => setIsNotificationOpen(false)} 
      />
    </div>
  );
}