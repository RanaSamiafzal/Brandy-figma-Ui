import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Settings, 
  CheckCircle, 
  Search, 
  Info, 
  Clock, 
  Check,
  Bell
} from 'lucide-react';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { Card } from '../../components/common/Cards';
import { Button } from '../../components/common/Button';
import { logout } from '../../redux/slices/authSlice';

export default function Notifications() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('unread');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user } = useSelector((state) => state.auth);

  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Collaboration Request ACCEPTED',
      description: 'A collaboration request for Shoe Collection was accepted.',
      category: 'SYSTEM',
      time: '18 hours ago',
      read: false,
      type: 'success'
    },
    {
      id: '2',
      title: 'Collaboration Request ACCEPTED',
      description: 'A collaboration request for Shoe Collection was accepted.',
      category: 'SYSTEM',
      time: '18 hours ago',
      read: false,
      type: 'success'
    }
  ]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         n.description.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'unread') return matchesSearch && !n.read;
    if (activeTab === 'read') return matchesSearch && n.read;
    return matchesSearch;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <Navbar />
      <div className="flex pt-[73px]">
        <Sidebar 
          userRole={user?.role?.toLowerCase() || 'brand'} 
          onLogout={handleLogout}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Notifications</h1>
                <p className="text-sm text-[#6b7280]">
                  Stay updated with your collaboration activities. <span className="text-[#3b82f6] font-medium">{unreadCount} unread</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="p-2 text-[#6b7280] hover:bg-gray-100 rounded-lg transition-colors border border-gray-200">
                  <Settings className="w-5 h-5" />
                </button>
                <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={markAllAsRead}
                    className="flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 text-[#3b82f6]" />
                  Mark All Read
                </Button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-[#e5e7eb] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent bg-white"
                />
              </div>
              
              <div className="flex p-1 bg-white border border-[#e5e7eb] rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'all'
                      ? 'bg-[#f3f4f6] text-[#111827]'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('unread')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'unread'
                      ? 'bg-[#f3f4f6] text-[#111827]'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  Unread ({unreadCount})
                </button>
                <button
                  onClick={() => setActiveTab('read')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === 'read'
                      ? 'bg-[#f3f4f6] text-[#111827]'
                      : 'text-[#6b7280] hover:text-[#111827]'
                  }`}
                >
                  Read
                </button>
              </div>
            </div>

            {/* Notifications List */}
            <Card className="!p-0 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-4 sm:p-6 transition-colors hover:bg-gray-50 flex items-start gap-4 ${!n.read ? 'bg-white' : 'bg-gray-50/50'}`}
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Info className="w-5 h-5 text-gray-500" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className={`text-sm sm:text-base font-semibold text-[#111827] truncate ${!n.read ? '' : 'opacity-70'}`}>
                              {n.title}
                            </h3>
                            {!n.read && <span className="w-2 h-2 bg-[#3b82f6] rounded-full flex-shrink-0" />}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            {n.time}
                          </div>
                        </div>
                        
                        <p className={`text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 ${!n.read ? '' : 'opacity-70'}`}>
                          {n.description}
                        </p>
                        
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 uppercase tracking-wider">
                          {n.category}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications found</h3>
                    <p className="text-gray-500">You're all caught up!</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}

