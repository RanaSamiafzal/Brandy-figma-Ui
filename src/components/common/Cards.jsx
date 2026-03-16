import React from 'react';
import { Instagram, Youtube, Twitter, Users } from 'lucide-react';
import { cn } from '../../utils/helpers';
import { Button } from './Button';
import { StatusBadge } from './StatusBadge';

export function Card({ children, className, onClick }) {
  return (
    <div 
      className={cn("bg-white rounded-lg border border-[#e5e7eb] p-4 sm:p-6", className)} 
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, action, className }) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4", className)}>
      <h3 className="text-base sm:text-lg font-semibold text-[#111827]">{title}</h3>
      {action}
    </div>
  );
}

export function ProfileCard({
  name,
  image,
  platform,
  followers,
  category,
  verified,
  onViewProfile,
  className,
}) {
  const platformIcons = {
    Instagram: Instagram,
    Youtube: Youtube,
    Twitter: Twitter,
    TikTok: Users,
  };

  const PlatformIcon = platformIcons[platform] || Users;

  return (
    <Card className={cn("hover:shadow-lg transition-shadow", className)}>
      <div className="flex flex-col items-center text-center">
        <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-full object-cover mb-3"
        />
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-semibold text-[#111827]">{name}</h4>
          {verified && <StatusBadge status="verified" />}
        </div>
        <div className="flex items-center gap-1 text-sm text-[#6b7280] mb-1">
          <PlatformIcon className="w-4 h-4" />
          <span>{platform}</span>
        </div>
        <p className="text-sm text-[#6b7280] mb-1">{followers} followers</p>
        {category && (
          <p className="text-sm text-[#9ca3af] mb-3">{category}</p>
        )}
        <Button variant="primary" size="sm" onClick={onViewProfile}>
          View Profile
        </Button>
      </div>
    </Card>
  );
}

