
import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { useTenantData } from '@/hooks/useTenantData';
import LoadingState from '../overview/LoadingState';
import NoLease from '../overview/NoLease';
import TenantProfileHeader from '../overview/TenantProfileHeader';
import PropertyHero from '../overview/PropertyHero';
import PropertyDetailsRow from '../overview/PropertyDetails';
import SettlementHub from '../overview/SettlementHub';
import ServicesBanner from '../overview/ServicesBanner';
import ActivityLog from '../overview/ActivityLog';

interface TenantOverviewProps {
  onNavigate?: (tab: string) => void;
}

const TenantOverview: React.FC<TenantOverviewProps> = ({ onNavigate }) => {
  const { lease, payments, isLoading } = useTenantData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (!lease) {
    return <NoLease />;
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <TenantProfileHeader lease={lease} />
          <PropertyHero lease={lease} />
          <PropertyDetailsRow lease={lease} />

          {/* Give Notice Banner */}
          <div className="bg-foreground rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                <AlertOctagon className="text-amber-500" size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-primary-foreground">Planning to move?</p>
                <p className="text-xs text-primary-foreground/60">
                  Start your formal vacating process as per the terms of your agreement.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate?.('notice')}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              Give Notice
            </button>
          </div>

          <ServicesBanner onEnterHub={() => onNavigate?.('utilities')} />
          <div className="mt-6">
            <ActivityLog lease={lease} onViewAll={() => onNavigate?.('history')} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <SettlementHub lease={lease} />
        </div>
      </div>
    </div>
  );
};

export default TenantOverview;
