
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartSection from '@/components/cart/CartSection';

const Cart = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="container px-4 py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-1" />
          Back
        </Button>
        
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CartSection />
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="font-bold mb-4">Need Help?</h2>
              <p className="text-sm text-muted-foreground mb-4">
                If you're having trouble with your order or have any questions, our support team is here to help.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
