
import React from 'react';
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
          <ServicesBanner onEnterHub={() => onNavigate?.('utilities')} />
          <div className="mt-6">
            <ActivityLog lease={lease} />
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
