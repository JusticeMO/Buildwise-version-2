
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import CartSection from '@/components/cart/CartSection';
import { useIsMobile } from '@/hooks/use-mobile';

const Cart = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
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
        
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-primary h-7 w-7" />
            <h1 className="text-2xl font-bold">Your Cart</h1>
          </div>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">Review and manage your cart items before checkout</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <CartSection />
          </div>
          
          <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
              <h2 className="font-bold mb-4">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>KES 1,700</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Processing Fee</span>
                  <span>KES 100</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>KES 1,800</span>
                </div>
              </div>
              <Button className="w-full mt-4">
                Proceed to Checkout
              </Button>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 md:p-6">
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
