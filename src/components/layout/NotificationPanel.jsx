import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, X, CheckCircle, AlertCircle, Info, Clock } from 'lucide-react';
import { Button } from '../common/Button';

export function NotificationPanel({ isOpen, onClose }) {
  const navigate = useNavigate();

  const mockNotifications = [
    {
      id: '1',
      type: 'success',
      title: 'New Collaboration Request',
      message: 'You have received a collaboration request from FashionHub',
      time: '5 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Campaign Update',
      message: 'Summer Collection Launch campaign has been updated',
      time: '2 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Deliverable Due Soon',
      message: 'You have 2 deliverables due in 3 days',
      time: '1 day ago',
      read: true
    }
  ];

  if (!isOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-[#10b981]" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-[#f59e0b]" />;
      case 'info': return <Info className="w-5 h-5 text-[#3b82f6]" />;
      default: return <Bell className="w-5 h-5 text-[#6b7280]" />;
    }
  };

  return (
    <>
      <div 
        className="fixed inset-0 z-40 lg:absolute lg:inset-auto lg:z-auto" 
        onClick={onClose}
      />
      <div className="fixed top-14 sm:top-20 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-96 bg-white rounded-xl shadow-2xl border border-[#e5e7eb] z-50 flex flex-col max-h-[calc(100vh-100px)]">
        {/* Header */}
        <div className="p-4 border-b border-[#e5e7eb] flex items-center justify-between bg-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-[#111827]">Notifications</h3>
            <span className="bg-[#ef4444] text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-[#6b7280]" />
          </button>
        </div>

        {/* List */}
        <div className="overflow-y-auto flex-1 divide-y divide-[#e5e7eb]">
          {mockNotifications.map((n) => (
            <div 
              key={n.id} 
              className={`p-4 hover:bg-[#f9fafb] cursor-pointer transition-colors ${!n.read ? 'bg-[#f0f9ff]/50' : ''}`}
              onClick={() => {
                // Handle notification click
                onClose();
              }}
            >
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className={`text-sm font-semibold text-[#111827] ${!n.read ? '' : 'text-[#6b7280]'}`}>{n.title}</p>
                    {!n.read && <span className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                  <p className="text-xs text-[#6b7280] mb-2 line-clamp-2">{n.message}</p>
                  <div className="flex items-center gap-1 text-[10px] text-[#9ca3af]">
                    <Clock className="w-3 h-3" />
                    {n.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-[#e5e7eb] bg-gray-50 rounded-b-xl">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full text-xs"
            onClick={() => {
              navigate('/notifications');
              onClose();
            }}
          >
            View All Notifications
          </Button>
        </div>
      </div>
    </>
  );
}

