
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Cookies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-white to-secondary py-10">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Cookie Policy</h1>
              <p className="text-muted-foreground">Last updated: June 1, 2023</p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto prose">
              <p>
                This Cookie Policy explains how BuildWise TrustFlow ("BuildWise", "we", "us", "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">What are cookies?</h2>
              
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <p>
                Cookies set by the website owner (in this case, BuildWise) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Why do we use cookies?</h2>
              
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for analytics and other purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Types of cookies we use</h2>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Essential cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Performance and functionality cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Analytics cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you. We use analytics cookies provided by Google Analytics and similar services.
              </p>
              
              <h3 className="text-xl font-bold mt-6 mb-3">Social media cookies</h3>
              <p>
                These cookies are used to enable you to share pages and content that you find interesting on our website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">How can you control cookies?</h2>
              
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided below.
              </p>
              
              <p>
                You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Changes to this Cookie Policy</h2>
              
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              
              <h2 className="text-2xl font-bold mt-8 mb-4">Contact us</h2>
              
              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default Cookies;
