
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-secondary py-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
              <p className="text-muted-foreground">Last updated: June 1, 2023</p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto prose">
              <p>
                At BuildWise TrustFlow ("BuildWise", "we", "us", "our"), we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Personal Information</h3>
              <p>
                We may collect personal identification information from users in various ways, including, but not limited to, when users visit our site, register on the site, place an order, fill out a form, and in connection with other activities, services, features or resources we make available on our site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, credit card information, and other relevant details.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Non-Personal Information</h3>
              <p>
                We may collect non-personal identification information about users whenever they interact with our site. Non-personal identification information may include the browser name, the type of computer and technical information about users' means of connection to our site, such as the operating system and the Internet service providers utilized and other similar information.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
              
              <p>
                We may use the information we collect from you in the following ways:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>To personalize your experience and to deliver content and product offerings relevant to your interests.</li>
                <li>To improve our website in order to better serve you.</li>
                <li>To allow us to better service you in responding to your customer service requests.</li>
                <li>To administer a contest, promotion, survey or other site feature.</li>
                <li>To quickly process your transactions.</li>
                <li>To verify contractor credentials and past work.</li>
                <li>To facilitate communication between clients and contractors.</li>
                <li>To send periodic emails regarding your projects or other products and services.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Protect Your Information</h2>
              
              <p>
                We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our site.
              </p>
              
              <p>
                Sensitive and private data exchange between the site and its users happens over a SSL secured communication channel and is encrypted and protected with digital signatures. Our site is also in compliance with PCI vulnerability standards in order to create as secure of an environment as possible for users.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Sharing Your Personal Information</h2>
              
              <p>
                We do not sell, trade, or rent users' personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above.
              </p>
              
              <p>
                We may share your information with contractors you choose to connect with through our platform. This information sharing is necessary to facilitate the services we provide.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Third-Party Websites</h2>
              
              <p>
                Users may find advertising or other content on our site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our site, is subject to that website's own terms and policies.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights</h2>
              
              <p>
                You have the right to access, update, or delete your personal information at any time. You can do this by accessing your account settings or by contacting us directly. You also have the right to:
              </p>
              
              <ul className="list-disc pl-6 space-y-2">
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing of your personal data.</li>
                <li>Request transfer of your personal data.</li>
                <li>Withdraw consent where we are relying on consent to process your personal data.</li>
              </ul>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
              
              <p>
                BuildWise has the discretion to update this privacy policy at any time. When we do, we will revise the updated date at the top of this page. We encourage users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Your Acceptance of These Terms</h2>
              
              <p>
                By using this site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our site. Your continued use of the site following the posting of changes to this policy will be deemed your acceptance of those changes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Contact Us</h2>
              
              <p>
                If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:
              </p>
              
              <p>
                Email: privacy@buildwise-trustflow.com<br />
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

export default Privacy;
