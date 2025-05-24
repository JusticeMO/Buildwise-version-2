
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VendorProfileSetup from '@/components/vendor/VendorProfileSetup';

const VendorProfileSetupPage = () => {
  const { vendorId } = useParams<{ vendorId: string }>();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 py-8">
        <div className="container px-4">
          <VendorProfileSetup vendorId={vendorId || ''} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorProfileSetupPage;
