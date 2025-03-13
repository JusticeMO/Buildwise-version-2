
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I get started with BuildWise?',
      answer: 'Simply fill out the application form on this page. Our team will review your application and contact you within 48 hours to complete the process.'
    },
    {
      question: 'What types of businesses can join BuildWise?',
      answer: 'We welcome all construction-related businesses including contractors, suppliers, consultants, architects, interior designers, and more.'
    },
    {
      question: 'How much does it cost to join?',
      answer: 'We offer different pricing tiers based on your business needs. Our plans start from KES 500 per month with options for yearly subscriptions at a discount.'
    },
    {
      question: 'Can I upgrade or downgrade my plan later?',
      answer: 'Yes, you can change your plan at any time. The changes will take effect from your next billing cycle.'
    },
    {
      question: 'How do I receive inquiries from clients?',
      answer: "When a client is interested in your services, they can contact you directly through your profile page or request a quote. You'll receive notifications via email and on your BuildWise dashboard."
    },
    {
      question: 'Is there a limit to how many inquiries I can receive?',
      answer: "No, there's no limit to the number of inquiries you can receive. Our goal is to connect you with as many potential clients as possible."
    }
  ];

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Don't see your question? <a href="/contact" className="text-primary hover:underline">Contact us</a> for more information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
