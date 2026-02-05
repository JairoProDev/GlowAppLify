import React from 'react';
import { AreaStatus } from '@/lib/types/life-areas';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AreaStatusBadgeProps {
    status: AreaStatus;
    className?: string;
}

const STATUS_CONFIG: Record<AreaStatus, { label: string; color: string }> = {
    principal: { label: '🔥 Principal', color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
    active: { label: '⚡ Active', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
    maintenance: { label: '🔄 Maintenance', color: 'bg-green-500/10 text-green-500 border-green-500/20' },
    inactive: { label: '💤 Inactive', color: 'bg-slate-500/10 text-slate-500 border-slate-500/20' },
};

export const AreaStatusBadge: React.FC<AreaStatusBadgeProps> = ({ status, className }) => {
    const config = STATUS_CONFIG[status];

    return (
        <div className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", config.color, className)}>
            {config.label}
        </div>
    );
};
