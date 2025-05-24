
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VendorProfileSetup from '@/components/vendor/VendorProfileSetup';

const VendorProfileSetupPage = () => {
  const { vendorId, providerId } = useParams<{ vendorId?: string; providerId?: string }>();
  
  // Support both vendor and provider ID for backward compatibility
  const serviceProviderId = providerId || vendorId || '';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-8">
        <div className="container px-4">
          <VendorProfileSetup vendorId={serviceProviderId} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorProfileSetupPage;
