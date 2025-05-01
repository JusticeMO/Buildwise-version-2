
import React, { useState } from 'react';
import { ShoppingCart, ChevronRight, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import CartItem from './CartItem';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Monthly Garbage Collection',
    price: 500,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Water Bill Payment',
    price: 1200,
    quantity: 1,
  }
];

const CartSection = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('delivery');
  
  const handleIncreaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  
  const handleDecreaseQuantity = (id: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };
  
  const handleRemoveItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };
  
  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryFee = 100; // Example delivery fee
    return subtotal + deliveryFee;
  };
  
  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    setIsCheckoutOpen(false);
    setCartItems([]);
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="text-primary" />
          <h2 className="text-2xl font-bold">Your Cart</h2>
        </div>
        <span className="bg-primary text-white px-2 py-1 rounded-full text-xs">
          {cartItems.length} items
        </span>
      </div>
      
      {cartItems.length > 0 ? (
        <>
          <div className="space-y-2">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                {...item}
                onIncrease={handleIncreaseQuantity}
                onDecrease={handleDecreaseQuantity}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Subtotal</span>
              <span>KES {calculateSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Processing Fee</span>
              <span>KES 100</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>KES {calculateTotal().toLocaleString()}</span>
            </div>
            
            <Button 
              className="w-full mt-4" 
              size="lg"
              onClick={() => setIsCheckoutOpen(true)}
            >
              Proceed to Checkout
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          
          <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Complete Your Order</DialogTitle>
                <DialogDescription>
                  Enter delivery details and payment information
                </DialogDescription>
              </DialogHeader>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                </TabsList>
                
                <TabsContent value="delivery" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Full Name</label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number</label>
                      <Input placeholder="+254 XXX XXX XXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Delivery Address</label>
                      <Textarea placeholder="Enter your full address" rows={3} />
                    </div>
                    <div className="flex items-center">
                      <MapPin size={18} className="mr-2 text-primary" />
                      <span className="text-sm text-muted-foreground">Use current location</span>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => setActiveTab('payment')}
                    >
                      Continue to Payment
                      <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="payment" className="mt-4">
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3 bg-secondary/10 flex items-center space-x-2">
                      <CreditCard className="text-primary" size={20} />
                      <div>
                        <p className="font-medium">M-Pesa Express</p>
                        <p className="text-xs text-muted-foreground">Pay directly through M-Pesa</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone Number for M-Pesa</label>
                      <Input placeholder="07XX XXX XXX" />
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="font-medium mb-2">Order Summary</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Items ({cartItems.length})</span>
                          <span>KES {calculateSubtotal().toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Processing Fee</span>
                          <span>KES 100</span>
                        </div>
                        <div className="flex justify-between text-base font-bold pt-2">
                          <span>Total</span>
                          <span>KES {calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full" onClick={handleCheckout}>
                      Complete Payment
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center mb-4">
            <ShoppingCart className="text-muted-foreground" size={20} />
          </div>
          <h3 className="text-lg font-medium mb-1">Your cart is empty</h3>
          <p className="text-sm text-muted-foreground mb-4">Looks like you haven't added any items to your cart yet</p>
          <Button>Browse Services</Button>
        </div>
      )}
    </div>
  );
};

export default CartSection;
