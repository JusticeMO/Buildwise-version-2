
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Button from '@/components/shared/Button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';

const TenantPayments = () => {
  const [paymentTab, setPaymentTab] = useState('make-payment');
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  
  const handleMpesaPayment = () => {
    setShowMpesaPrompt(true);
    setTimeout(() => {
      setShowMpesaPrompt(false);
      toast.success("Payment initiated! Check your phone for M-Pesa prompt");
    }, 2000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Rent Payments</h2>
      
      <Tabs value={paymentTab} onValueChange={setPaymentTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="make-payment">Make Payment</TabsTrigger>
          <TabsTrigger value="upload-confirmation">Upload Confirmation</TabsTrigger>
          <TabsTrigger value="payment-plans">Payment Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="make-payment">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Payment Details</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Property</label>
                  <div className="text-sm p-2 bg-secondary/20 rounded">Savannah Apartments, Unit 305</div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Payment Period</label>
                  <div className="text-sm p-2 bg-secondary/20 rounded">July 2023</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Amount Due</label>
                <div className="text-3xl font-bold">KES 25,000</div>
                <p className="text-xs text-muted-foreground mt-1">Due by July 1, 2023</p>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Choose Payment Method</h4>
                
                <div>
                  <div className="border rounded-lg p-4 mb-4 cursor-pointer bg-secondary/10">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700">
                        <CreditCard />
                      </div>
                      <div>
                        <p className="font-medium">M-Pesa Express</p>
                        <p className="text-sm text-muted-foreground">Pay directly through M-Pesa STK push</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t">
                    <label className="text-sm font-medium mb-2 block">Phone Number for M-Pesa</label>
                    <Input placeholder="e.g. 07XX XXX XXX" className="mb-4" />
                    
                    <Dialog open={showMpesaPrompt}>
                      <DialogContent className="sm:max-w-md">
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 mb-4">
                            <CreditCard size={32} />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
                          <p className="text-center text-muted-foreground mb-4">
                            Please check your phone for the M-Pesa prompt to complete payment
                          </p>
                          <Progress value={65} className="w-full" />
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button className="w-full" onClick={handleMpesaPayment}>
                      Pay KES 25,000 via M-Pesa
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload-confirmation">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Upload Payment Confirmation</h3>
            <p className="text-sm text-muted-foreground mb-6">
              If you've made a payment through bank transfer or other methods, upload the confirmation here
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Transaction Reference</label>
                <Input placeholder="e.g. MPESA confirmation code or bank reference" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Amount Paid</label>
                <Input placeholder="e.g. 25000" type="number" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Payment Date</label>
                <Input type="date" />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Upload Screenshot/Receipt</label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/20 transition-colors">
                  <Upload className="mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Click or drag files to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG and PDF up to 5MB</p>
                </div>
              </div>
              
              <Button className="w-full">
                Submit Payment Confirmation
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payment-plans">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Payment Plan Options</h3>
              <Badge>Available</Badge>
            </div>
            
            <p className="text-sm text-muted-foreground mb-6">
              If you need flexibility in your payment schedule, you can apply for a payment plan
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Split Payment (Bi-Weekly)</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay your rent in two installments per month
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">KES 12,500 × 2</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Weekly Payments</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Pay your rent in four weekly installments
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">KES 6,250 × 4</span>
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Custom Payment Plan</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Request a custom payment schedule tailored to your needs
                </p>
                <Button variant="outline" size="sm">Request Custom Plan</Button>
              </div>
            </div>
            
            <div className="bg-secondary/20 p-4 rounded-lg">
              <p className="text-sm">
                <strong>Note:</strong> Payment plans are subject to approval by your property manager.
                Additional fees may apply for certain payment plans.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TenantPayments;
