
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '../shared/Card';
import { cn } from '@/lib/utils';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  location: string;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "BuildWise has transformed how I manage my construction project in Nairobi while living in London. The transparent milestone tracking and regular photo updates give me peace of mind knowing my investment is in good hands.",
    author: "James Mwangi",
    role: "Software Engineer",
    location: "London, UK"
  },
  {
    quote: "After two failed attempts at building my retirement home in Kenya, I found BuildWise. Their verified contractors and escrow payment system ensure that my money is only released when actual work is completed.",
    author: "Sarah Wanjiku",
    role: "Nurse",
    location: "Toronto, Canada"
  },
  {
    quote: "The AI cost estimation tool helped me budget accurately for my project in Kisumu. I saved nearly 20% on material costs thanks to their supplier network, and the inspector verifications gave me confidence in the quality.",
    author: "David Otieno",
    role: "Accountant",
    location: "Sydney, Australia"
  },
  {
    quote: "Building remotely from the US was always a challenge until I discovered BuildWise. Their platform provided complete transparency, and the milestone-based payment system kept the project on track and within budget.",
    author: "Jane Kamau",
    role: "Healthcare Administrator",
    location: "Boston, USA"
  }
];

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Auto-advance testimonials
    intervalRef.current = setInterval(handleNext, 8000);
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section className="py-20 bg-secondary overflow-hidden">
      <div className="container px-4">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4 opacity-0 animate-fade-in">
            Trusted by diaspora builders worldwide
          </h2>
          <p className="text-muted-foreground opacity-0 animate-fade-in" style={{ animationDelay: '100ms' }}>
            See how BuildWise has helped people around the world successfully manage their construction projects back home in Kenya.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-6 -left-6 text-primary/10">
            <Quote size={80} />
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className={cn(
                "transition-all duration-500 ease-in-out flex",
                isAnimating ? 'opacity-0' : 'opacity-100'
              )}
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full flex-shrink-0"
                >
                  <Card variant="glass" padding="lg" className="h-full">
                    <p className="text-lg md:text-xl mb-6 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      {testimonial.avatar ? (
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          className="w-12 h-12 rounded-full mr-4"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-4">
                          {testimonial.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium">{testimonial.author}</h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.location}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-primary w-6" : "bg-muted"
                )}
                onClick={() => {
                  setActiveIndex(index);
                  if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = setInterval(handleNext, 8000);
                  }
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-background/80 shadow-sm flex items-center justify-center text-foreground pointer-events-auto smooth-transition hover:bg-background"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-background/80 shadow-sm flex items-center justify-center text-foreground pointer-events-auto smooth-transition hover:bg-background"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
