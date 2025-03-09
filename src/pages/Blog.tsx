
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    {
      title: "5 Tips for Managing Construction Projects from Abroad",
      excerpt: "Managing a construction project remotely can be challenging. Learn our top tips for ensuring success even when you're thousands of miles away.",
      author: "James Kimani",
      date: "June 15, 2023",
      category: "Project Management",
      image: ""
    },
    {
      title: "Understanding Construction Costs in Kenya: 2023 Guide",
      excerpt: "A comprehensive breakdown of construction costs in Kenya, from materials to labor, and how they've changed in recent years.",
      author: "Sarah Njeri",
      date: "May 22, 2023",
      category: "Budgeting",
      image: ""
    },
    {
      title: "How to Verify Your Contractor's Credentials",
      excerpt: "Don't fall victim to unqualified contractors. Here's how to properly verify credentials and past work to ensure you're hiring the right person.",
      author: "David Omondi",
      date: "April 10, 2023",
      category: "Contractor Selection",
      image: ""
    },
    {
      title: "The Best Construction Materials for Durability in Kenyan Climate",
      excerpt: "Kenya's varied climate poses unique challenges for construction. Discover the best materials for longevity and durability in different regions.",
      author: "Grace Wangari",
      date: "March 5, 2023",
      category: "Materials",
      image: ""
    },
    {
      title: "Legal Requirements for Construction Projects in Kenya",
      excerpt: "Navigate the complex world of permits, approvals, and regulations when building in Kenya with this straightforward guide.",
      author: "Peter Mwangi",
      date: "February 18, 2023",
      category: "Legal",
      image: ""
    },
    {
      title: "Sustainable Building Practices for the Eco-Conscious Homeowner",
      excerpt: "Learn how to incorporate eco-friendly elements into your construction project, from solar power to water conservation systems.",
      author: "Lucy Wambui",
      date: "January 30, 2023",
      category: "Sustainability",
      image: ""
    }
  ];

  const categories = [
    "All Categories",
    "Project Management",
    "Budgeting",
    "Contractor Selection",
    "Materials",
    "Legal",
    "Sustainability"
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-secondary py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Construction Blog</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Insights, tips, and guides for managing construction projects in Kenya
              </p>
              <div className="relative max-w-xl mx-auto">
                <Input 
                  placeholder="Search articles..." 
                  className="pl-12 py-6 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories */}
        <section className="pt-12 pb-6">
          <div className="container px-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    index === 0 
                      ? 'bg-primary text-white hover:bg-primary/90' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12">
          <div className="container px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-video bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground">Featured Image</span>
                  </div>
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2.5 py-0.5 rounded">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 hover:text-primary transition-colors">
                      <Link to={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User size={16} className="mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar size={16} className="mr-1" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            <div className="flex justify-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="group"
                icon={<ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />}
                iconPosition="right"
              >
                Load more articles
              </Button>
            </div>
          </div>
        </section>
        
        {/* Newsletter */}
        <section className="py-16 bg-gradient-to-br from-kenya-red/10 to-kenya-green/10">
          <div className="container px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay updated with our newsletter</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest construction tips, trends, and news delivered directly to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input 
                  placeholder="Your email address" 
                  className="flex-grow"
                />
                <Button>
                  Subscribe
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

export default Blog;
