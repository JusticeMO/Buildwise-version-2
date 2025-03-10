
import React from 'react';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "How do I get started as a vendor or contractor?",
      answer: "Sign up for an account, select your membership plan, complete your business profile with certifications and portfolio items, and our team will verify your credentials within 48 hours."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. For annual plans, we offer prorated refunds based on the remaining time on your contract."
    },
    {
      question: "How does the lead generation work?",
      answer: "When clients post projects that match your skills and location, you'll receive notifications. You can then submit quotes and proposals directly through our platform."
    },
    {
      question: "What's the verification process like?",
      answer: "We verify your business registration, professional certifications, and past work. This helps build trust with potential clients and gives you a competitive edge."
    }
  ];

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold text-center mb-10">
        Frequently Asked Questions
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
