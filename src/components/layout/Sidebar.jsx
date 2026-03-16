import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  FileText, 
  Settings, 
  LogOut,
  Shield,
  Users,
  BarChart,
  Target,
  Handshake,
  Building2
} from 'lucide-react';
import { cn } from '../../utils/helpers';

export function Sidebar({ userRole = 'brand', onLogout, isOpen, setIsOpen }) {
  const location = useLocation();

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
    <aside
      className={cn(
        "fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-[#e5e7eb] transform transition-transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "top-[57px] sm:top-[73px] lg:top-0"
      )}
    >
      <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors text-sm sm:text-base",
                isActive 
                  ? "bg-[#eff6ff] text-[#3b82f6] font-medium" 
                  : "text-[#6b7280] hover:bg-[#f3f4f6]"
              )}
              onClick={() => setIsOpen(false)}
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
  );
}
