
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Shield, Award, Building2, Globe } from 'lucide-react';
import Button from '@/components/shared/Button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-secondary py-20 md:py-28">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Our Mission
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Bridging the gap between <span className="text-kenya-red">diaspora</span> and <span className="text-kenya-green">home builders</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                We're on a mission to transform how Kenyans living abroad manage construction 
                projects back home through transparency, trust, and technology.
              </p>
              <Link to="/projects/create">
                <Button 
                  size="lg"
                  className="group"
                  icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                  iconPosition="right"
                >
                  Start your project
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-kenya-red font-medium">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Born from real diaspora experiences</h2>
                <p className="text-muted-foreground mb-4">
                  BuildWise was founded in 2022 by a team of Kenyan diaspora who experienced firsthand the 
                  challenges of managing construction projects back home from thousands of miles away.
                </p>
                <p className="text-muted-foreground mb-4">
                  After losing money to unreliable contractors and facing countless delays and miscommunications, 
                  our founders decided to create a solution that would bring transparency, accountability, and 
                  peace of mind to the construction process.
                </p>
                <p className="text-muted-foreground">
                  Today, BuildWise has helped over 500 diaspora Kenyans successfully complete their dream 
                  projects with verified contractors and real-time project tracking.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden bg-muted flex items-center justify-center h-80">
                <span className="text-muted-foreground">Company Photo</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center mb-16">
              <span className="text-kenya-green font-medium">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">What drives everything we do</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="text-primary" size={28} />,
                  title: "Trust & Transparency",
                  description: "We verify all contractors and provide real-time updates on your project's progress and how your money is being used."
                },
                {
                  icon: <Globe className="text-primary" size={28} />,
                  title: "Bridging Distances",
                  description: "We use technology to make managing projects from abroad as seamless as if you were right there on site."
                },
                {
                  icon: <Award className="text-primary" size={28} />,
                  title: "Quality Assurance",
                  description: "We hold our contractors to the highest standards and ensure your project meets all quality benchmarks."
                }
              ].map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="text-center mb-16">
              <span className="text-kenya-red font-medium">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Meet the people behind BuildWise</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our diverse team combines expertise in construction, technology, and finance with 
                personal diaspora experiences to create solutions that truly work.
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "James Kimani", role: "Founder & CEO", image: "" },
                { name: "Sarah Njeri", role: "CTO", image: "" },
                { name: "David Omondi", role: "Head of Contractor Relations", image: "" },
                { name: "Grace Wangari", role: "Chief Financial Officer", image: "" }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square rounded-xl bg-muted mb-4 flex items-center justify-center">
                    <span className="text-muted-foreground">Photo</span>
                  </div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-kenya-red/10 to-kenya-green/10">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to build your dream project with confidence?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of diaspora who are successfully managing construction 
                projects back home in Kenya with complete transparency and peace of mind.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/projects/create">
                  <Button 
                    size="lg"
                    className="group"
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                    iconPosition="right"
                  >
                    Get started for free
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button 
                    variant="outline" 
                    size="lg"
                  >
                    Contact us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
