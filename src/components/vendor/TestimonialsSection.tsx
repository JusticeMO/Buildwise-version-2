
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "BuildWise has transformed my business. I've seen a 40% increase in high-quality leads since joining the platform.",
      author: "James Kamau",
      role: "Interior Designer, Nairobi"
    },
    {
      quote: "The verification process gives clients confidence in my services. I've closed more deals with less effort.",
      author: "Sarah Omondi",
      role: "General Contractor, Mombasa"
    },
    {
      quote: "As a materials supplier, I've expanded my customer base beyond my local area to all across Kenya.",
      author: "Daniel Kipchoge",
      role: "Building Materials Supplier, Nakuru"
    }
  ];

  return (
    <div className="mt-20 border-t pt-12">
      <h2 className="text-2xl font-bold text-center mb-10">
        Contractors & Suppliers Love BuildWise
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <div key={i} className="border rounded-xl p-6 bg-secondary/30">
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <blockquote className="text-muted-foreground mb-4">"{testimonial.quote}"</blockquote>
            <div>
              <p className="font-medium">{testimonial.author}</p>
              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
