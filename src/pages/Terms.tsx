
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-secondary py-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
              <p className="text-muted-foreground">Last updated: June 1, 2023</p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto prose">
              <p>
                Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the BuildWise TrustFlow website and platform operated by BuildWise Ltd.
              </p>
              
              <p>
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Accounts</h2>
              
              <p>
                When you create an account with us, you must provide accurate, complete, and up-to-date information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
              </p>
              
              <p>
                You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
              </p>
              
              <p>
                You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Contractor Verification and Projects</h2>
              
              <p>
                While BuildWise makes every effort to verify contractors, we cannot guarantee the quality of their work or their performance. Users agree that BuildWise acts as a platform connecting clients with contractors, but is not responsible for the actions or inactions of contractors.
              </p>
              
              <p>
                Project milestones, payment terms, and other details must be agreed upon between clients and contractors. BuildWise provides tools to facilitate these agreements but is not responsible for disputes arising from project execution.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Payment Protection and Fees</h2>
              
              <p>
                BuildWise offers payment protection services through our platform. We charge a 5% service fee on all project costs to maintain our verification processes, platform services, and payment protection features.
              </p>
              
              <p>
                Funds held in escrow are only released upon verification of milestone completion. Users agree to our milestone verification process as outlined in our service documentation.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
              
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of BuildWise Ltd and its licensors. The Service is protected by copyright, trademark, and other laws of both Kenya and foreign countries.
              </p>
              
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of BuildWise Ltd.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
              
              <p>
                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
              
              <p>
                Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Limitation of Liability</h2>
              
              <p>
                In no event shall BuildWise Ltd, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Governing Law</h2>
              
              <p>
                These Terms shall be governed and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
              </p>
              
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Changes</h2>
              
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.
              </p>
              
              <p>
                By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
              
              <p>
                If you have any questions about these Terms, please contact us at:
              </p>
              
              <p>
                Email: legal@buildwise-trustflow.com<br />
                Phone: +254 712 345 678<br />
                Address: Westlands Business Park, Nairobi, Kenya
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
