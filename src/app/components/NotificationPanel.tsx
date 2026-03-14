import { useState } from 'react';
import { Bell, X, CheckCircle, AlertCircle, Info, TrendingUp } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'default';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
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
  },
  {
    id: '4',
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $800 has been processed',
    time: '2 days ago',
    read: true
  }
];

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-[#10b981]" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-[#f59e0b]" />;
      case 'info': return <Info className="w-5 h-5 text-[#3b82f6]" />;
      default: return <Bell className="w-5 h-5 text-[#6b7280]" />;
    }
  };

  return (
    <>
      {/* Dropdown Panel */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <div className="fixed top-14 sm:top-20 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-96 max-w-md bg-white rounded-lg shadow-lg border border-[#e5e7eb] z-50 max-h-[calc(100vh-80px)] sm:max-h-[600px] flex flex-col">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-[#e5e7eb] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-[#111827]">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="danger" className="text-[10px] sm:text-xs">{unreadCount}</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[10px] sm:text-xs text-[#3b82f6] hover:text-[#2563eb] px-1 sm:px-2"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-[#6b7280] hover:text-[#111827] p-1"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-6 sm:p-8 text-center">
                  <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-[#d1d5db] mx-auto mb-2" />
                  <p className="text-sm sm:text-base text-[#6b7280]">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-[#e5e7eb]">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={`p-3 sm:p-4 hover:bg-[#f9fafb] cursor-pointer transition-colors ${
                        !notification.read ? 'bg-[#f0f9ff]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="mt-0.5 flex-shrink-0">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="font-medium text-[#111827] text-xs sm:text-sm">
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#3b82f6] rounded-full mt-1.5 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-[#6b7280] mb-1 sm:mb-2 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-[10px] sm:text-xs text-[#9ca3af]">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-2 sm:p-3 border-t border-[#e5e7eb]">
              <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm">
                View All Notifications
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}