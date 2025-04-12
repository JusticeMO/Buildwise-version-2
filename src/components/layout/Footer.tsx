
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="mb-4">
              <Link to="/" className="text-xl font-bold flex items-center gap-2">
                <span className="text-kenya-red">Jenga</span>
                <span className="text-kenya-green">Safe</span>
              </Link>
            </div>
            <p className="text-muted-foreground mb-4">
              Empowering diaspora to build back home with confidence and transparency.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground smooth-transition"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground smooth-transition"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground smooth-transition"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  to="/contractors" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Find Contractors
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/help" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Construction Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-muted-foreground hover:text-foreground smooth-transition"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h4 className="font-medium text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  info@jengasafe.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  +254 712 345 678
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">
                  Westlands, Nairobi, Kenya
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Jenga Safe. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link 
                to="/terms" 
                className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
              >
                Terms
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
              >
                Privacy
              </Link>
              <Link 
                to="/cookies" 
                className="text-sm text-muted-foreground hover:text-foreground smooth-transition"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
