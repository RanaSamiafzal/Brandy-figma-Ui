import { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';

interface ProfileDropdownProps {
  userName: string;
  userEmail: string;
  userImage?: string;
  userRole: 'brand' | 'influencer' | 'admin';
  onLogout: () => void;
}

export function ProfileDropdown({ userName, userEmail, userImage, userRole, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getRoleLabel = () => {
    switch (userRole) {
      case 'brand':
        return 'BRAND';
      case 'influencer':
        return 'INFLUENCER';
      case 'admin':
        return 'ADMIN';
      default:
        return 'USER';
    }
  };

  const getSettingsPath = () => {
    switch (userRole) {
      case 'brand':
        return '/brand/settings';
      case 'influencer':
        return '/influencer/settings';
      case 'admin':
        return '/admin/settings';
      default:
        return '/settings';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="relative">
          {userImage ? (
            <img
              src={userImage}
              alt={userName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#10b981] border-2 border-white rounded-full"></div>
        </div>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-bold text-[#111827]">{userName}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#3b82f6] uppercase">{getRoleLabel()}</span>
            <span className="text-xs text-[#6b7280] truncate max-w-[120px]">{userEmail}</span>
          </div>
        </div>
        <ChevronDown className={`w-4 h-4 text-[#6b7280] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-[#e5e7eb] overflow-hidden z-50">
          {/* Header with Blue Background */}
          <div className="bg-gradient-to-r from-[#3b82f6] to-[#2563eb] h-24"></div>
          
          {/* Profile Section */}
          <div className="px-6 -mt-12">
            <div className="relative inline-block">
              {userImage ? (
                <img
                  src={userImage}
                  alt={userName}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#10b981] border-2 border-white rounded-full"></div>
            </div>
            
            <div className="mt-4 mb-6">
              <h3 className="text-xl font-bold text-[#111827]">{userName}</h3>
              <p className="text-sm text-[#3b82f6] mb-3 break-all">{userEmail}</p>
              
              {/* Status and Role */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#f9fafb] rounded-lg p-3 border border-[#e5e7eb]">
                  <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Status</p>
                  <p className="text-sm font-bold text-[#10b981] flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#10b981] rounded-full"></span>
                    Active Now
                  </p>
                </div>
                <div className="bg-[#f9fafb] rounded-lg p-3 border border-[#e5e7eb]">
                  <p className="text-xs font-semibold text-[#6b7280] uppercase mb-1">Role</p>
                  <p className="text-sm font-bold text-[#111827] capitalize">{userRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-[#e5e7eb]"></div>

          {/* Menu Items */}
          <div className="p-4">
            <button
              onClick={() => {
                navigate(getSettingsPath());
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#f9fafb] rounded-lg transition-colors group"
            >
              <div className="w-10 h-10 bg-[#eff6ff] rounded-lg flex items-center justify-center group-hover:bg-[#dbeafe]">
                <User className="w-5 h-5 text-[#3b82f6]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-[#111827]">Profile Settings</p>
                <p className="text-xs text-[#6b7280]">Manage account details</p>
              </div>
            </button>

            <button
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-4 px-4 py-3 hover:bg-[#fef2f2] rounded-lg transition-colors group mt-2"
            >
              <div className="w-10 h-10 bg-[#fee2e2] rounded-lg flex items-center justify-center group-hover:bg-[#fecaca]">
                <LogOut className="w-5 h-5 text-[#ef4444]" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-[#ef4444]">Logout</p>
                <p className="text-xs text-[#6b7280]">Sign out of session</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
