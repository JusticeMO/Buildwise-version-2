
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Search, ArrowRight, FileText, MessageCircle, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const Help = () => {
  const faqs = [
    {
      question: "How does BuildWise verify contractors?",
      answer: "We have a rigorous vetting process that includes background checks, license verification, reference checks from past clients, and portfolio reviews. Only contractors meeting our high standards are verified on our platform."
    },
    {
      question: "How does the payment protection work?",
      answer: "We use an escrow system that holds your payments until pre-defined project milestones are completed and verified. This ensures your money is only released when work is completed satisfactorily."
    },
    {
      question: "What happens if there's a dispute with my contractor?",
      answer: "Our platform includes a dispute resolution process. Our team will mediate between you and the contractor to find a fair solution based on project documentation, milestones, and our terms of service."
    },
    {
      question: "Can I use BuildWise if I'm not in the diaspora?",
      answer: "Yes! While we designed BuildWise primarily for Kenyans living abroad, anyone looking to build in Kenya can use our platform to find reliable contractors and manage their construction projects."
    },
    {
      question: "What fees does BuildWise charge?",
      answer: "BuildWise charges a 5% service fee on project costs to cover our verification processes, payment protection, and project management tools. This fee is transparently shown during project setup."
    },
    {
      question: "How can I monitor my project's progress from abroad?",
      answer: "Our platform provides real-time updates, including photos and videos from the site, milestone tracking, and scheduled video calls with your contractor. You can access all these features through your dashboard."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-secondary py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">How can we help you?</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find answers to common questions or contact our support team
              </p>
              <div className="relative max-w-xl mx-auto">
                <Input 
                  placeholder="Search for answers..." 
                  className="pl-12 py-6 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Help Categories */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Documentation",
                  description: "Browse our guides and documentation to learn how to use BuildWise effectively.",
                  icon: <FileText className="text-primary" size={24} />,
                  link: "/help/docs"
                },
                {
                  title: "Live Chat Support",
                  description: "Chat with our support team for immediate assistance with your questions.",
                  icon: <MessageCircle className="text-primary" size={24} />,
                  link: "#chat"
                },
                {
                  title: "Contact Support",
                  description: "Can't find what you're looking for? Contact our dedicated support team.",
                  icon: <Phone className="text-primary" size={24} />,
                  link: "/contact"
                }
              ].map((category, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Link to={category.link}>
                    <Button variant="outline" className="w-full">
                      {category.title === "Live Chat Support" ? "Start Chat" : "Explore"}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQs Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Find quick answers to our most common questions
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* Still Need Help Section */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Still need help?</h2>
              <p className="text-muted-foreground mb-8">
                Our support team is always ready to assist you with any questions or concerns
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button 
                    size="lg"
                    className="group"
                    icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                    iconPosition="right"
                  >
                    Contact Support
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                >
                  Schedule a Call
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Help;
