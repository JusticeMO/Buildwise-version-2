
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Calendar, User, ArrowRight, Search, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Button from '@/components/shared/Button';
import { Link, useParams, useNavigate } from 'react-router-dom';

const BlogCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  
  const formattedCategory = category 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : '';
  
  // This would typically come from an API based on the category
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
  ].filter(post => 
    post.category.toLowerCase().replace(/\s+/g, '-') === category
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-secondary py-16">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="mb-4">
                <button 
                  onClick={() => navigate('/blog')}
                  className="flex items-center text-primary hover:underline"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Back to all categories
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{formattedCategory} Articles</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Expert insights and guides on {formattedCategory.toLowerCase()} for your construction projects
              </p>
              <div className="relative max-w-xl mx-auto">
                <Input 
                  placeholder={`Search ${formattedCategory} articles...`}
                  className="pl-12 py-6 text-lg"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        <section className="py-12">
          <div className="container px-4">
            {blogPosts.length > 0 ? (
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
            ) : (
              <div className="text-center py-12">
                <h3 className="text-2xl font-medium mb-4">No articles found for this category</h3>
                <p className="text-muted-foreground mb-6">Try browsing other categories or check back later.</p>
                <Button variant="outline" onClick={() => navigate('/blog')}>
                  Back to all articles
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogCategory;
