import React from 'react';
import { cn } from './ui/utils';
import { InfluButton } from './InfluButton';
import { StatusBadge, BadgeStatus } from './StatusBadge';
import { Instagram, Youtube, Twitter, Users } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div 
      className={cn("bg-white rounded-lg border border-[#e5e7eb] p-4 sm:p-6", className)} 
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export function CardHeader({ title, action, className }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4", className)}>
      <h3 className="text-base sm:text-lg font-semibold text-[#111827]">{title}</h3>
      {action}
    </div>
  );
}

interface ProfileCardProps {
  name: string;
  image: string;
  platform: 'Instagram' | 'Youtube' | 'Twitter' | 'TikTok';
  followers: string;
  category?: string;
  verified?: boolean;
  onViewProfile: () => void;
  className?: string;
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
}: ProfileCardProps) {
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
        <InfluButton variant="primary" size="sm" onClick={onViewProfile}>
          View Profile
        </InfluButton>
      </div>
    </Card>
  );
}

interface RequestCardProps {
  influencerName: string;
  influencerImage: string;
  campaignTitle: string;
  budget: string;
  timeline: string;
  status: BadgeStatus;
  onViewDetails: () => void;
  className?: string;
}

export function RequestCard({
  influencerName,
  influencerImage,
  campaignTitle,
  budget,
  timeline,
  status,
  onViewDetails,
  className,
}: RequestCardProps) {
  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <img
          src={influencerImage}
          alt={influencerName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
            <div className="min-w-0">
              <h4 className="font-semibold text-[#111827] truncate">{influencerName}</h4>
              <p className="text-sm text-[#6b7280] line-clamp-2">{campaignTitle}</p>
            </div>
            <div className="flex-shrink-0">
              <StatusBadge status={status} />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-[#6b7280] mb-3">
            <span className="truncate">Budget: {budget}</span>
            <span className="truncate">Timeline: {timeline}</span>
          </div>
          <InfluButton variant="outline" size="sm" onClick={onViewDetails} className="w-full sm:w-auto">
            View Details
          </InfluButton>
        </div>
      </div>
    </Card>
  );
}