import React from 'react';
import { cn } from '../../utils/helpers';
import { Check, Clock, X, Shield } from 'lucide-react';

export function StatusBadge({ status, className }) {
  const badges = {
    verified: {
      bg: 'bg-[#d1fae5]',
      text: 'text-[#10b981]',
      icon: Shield,
      label: 'Verified',
    },
    pending: {
      bg: 'bg-[#fef3c7]',
      text: 'text-[#f59e0b]',
      icon: Clock,
      label: 'Pending',
    },
    rejected: {
      bg: 'bg-[#fee2e2]',
      text: 'text-[#ef4444]',
      icon: X,
      label: 'Rejected',
    },
    accepted: {
      bg: 'bg-[#d1fae5]',
      text: 'text-[#10b981]',
      icon: Check,
      label: 'Accepted',
    },
    blocked: {
      bg: 'bg-[#fee2e2]',
      text: 'text-[#ef4444]',
      icon: X,
      label: 'Blocked',
    },
  };

  const badge = badges[status] || badges.pending;
  const Icon = badge.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
        badge.bg,
        badge.text,
        className
      )}
    >
      <Icon className="w-4 h-4" />
      {badge.label}
    </span>
  );
}

