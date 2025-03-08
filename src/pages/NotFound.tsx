
import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '@/components/shared/Button';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-kenya-red mb-6">
          <AlertCircle size={32} />
        </div>
        
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved 
          or doesn't exist.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            icon={<ArrowLeft size={18} />}
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
          
          {/* Replace the Button with as={Link} prop with a styled Link component */}
          <Link to="/">
            <Button
              icon={<Home size={18} />}
            >
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
