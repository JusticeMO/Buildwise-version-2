
import React, { useState } from 'react';
import { CreditCard, Upload, CheckCircle, ShieldAlert, AlertCircle, History } from 'lucide-react';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Button from '@/components/shared/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { confirmPayment, getPaymentConfirmations } from '@/data/sharedMockData';

const TenantPayments = () => {
  const [paymentTab, setPaymentTab] = useState('make-payment');
  const [showMpesaPrompt, setShowMpesaPrompt] = useState(false);
  const [mpesaProgress, setMpesaProgress] = useState(0);
  
  // Manual form state
  const [reference, setReference] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const history = getPaymentConfirmations().filter(p => p.tenantId === 'tenant-1');
  
  const handleMpesaPayment = () => {
    setShowMpesaPrompt(true);
    setMpesaProgress(10);
    
    const interval = setInterval(() => {
      setMpesaProgress(prev => (prev >= 100 ? 100 : prev + 20));
    }, 600);

    setTimeout(() => {
      clearInterval(interval);
      setShowMpesaPrompt(false);
      
      // Sync with shared data
      confirmPayment({
        tenantId: 'tenant-1',
        tenantName: 'John Doe',
        amount: 25000,
        reference: `MP-${Math.random().toString(36).substring(7).toUpperCase()}`,
        date: new Date().toISOString().split('T')[0],
      });

      toast.success("Payment Received! Your landlord has been notified via the institutional ledger.");
      setPaymentTab('history');
    }, 4000);
  };

  const handleManualSubmit = () => {
    if (!reference || !amount) {
      toast.error("Please fill in reference and amount.");
      return;
    }

    confirmPayment({
      tenantId: 'tenant-1',
      tenantName: 'John Doe',
      amount: Number(amount),
      reference: reference,
      date: date,
    });

    toast.success("Manual confirmation submitted. Landlord will verify against bank records.");
    setReference('');
    setAmount('');
    setPaymentTab('history');
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Financial Ledger</h2>
        <p className="text-sm text-muted-foreground">Manage your rent payments and view your verified institutional billing history.</p>
      </div>
      
      <Tabs value={paymentTab} onValueChange={setPaymentTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="make-payment" className="text-xs font-bold uppercase tracking-wider">M-Pesa Express</TabsTrigger>
          <TabsTrigger value="upload-confirmation" className="text-xs font-bold uppercase tracking-wider">Manual Upload</TabsTrigger>
          <TabsTrigger value="history" className="text-xs font-bold uppercase tracking-wider">Billing History</TabsTrigger>
          <TabsTrigger value="payment-plans" className="text-xs font-bold uppercase tracking-wider">Plans</TabsTrigger>
        </TabsList>
        
        <TabsContent value="make-payment">
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                    <History className="text-primary" size={18} />
                    Current Billing Period
                  </h3>
                  <div className="p-4 bg-secondary/20 rounded-xl border border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase mb-1">July 2024 Rent</p>
                    <p className="text-3xl font-black text-foreground">KES 25,000</p>
                    <div className="mt-4 flex items-center justify-between text-xs font-medium">
                      <span className="text-muted-foreground">Due Date:</span>
                      <span className="text-kenya-red font-bold">July 05, 2024</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
                  <ShieldAlert className="text-blue-600 shrink-0" size={18} />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    Payments made via M-Pesa Express are instantly verified and updated on the property ledger.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6 pt-2">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">M-Pesa Details</h4>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-muted-foreground">Phone Number</label>
                    <Input placeholder="e.g. 0712 345 678" className="h-12 text-base font-medium" />
                  </div>
                  <Button className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-base shadow-lg shadow-green-200" onClick={handleMpesaPayment}>
                    Pay KES 25,000 Now
                  </Button>
                  <p className="text-[10px] text-center text-muted-foreground">
                    Secured by Safaricom M-Pesa • System Generated Receipt
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="upload-confirmation">
          <div className="bg-card border border-border p-8 rounded-xl shadow-sm">
            <h3 className="text-lg font-bold mb-2">Manual Transaction Verification</h3>
            <p className="text-sm text-muted-foreground mb-8">
              Submit proof for bank transfers or offline payments for manual landlord verification.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground font-black">Ref Code (MPESA/Bank)</label>
                  <Input 
                    placeholder="e.g. RK920XXX41" 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground font-black">Amount Confirmed</label>
                  <Input 
                    placeholder="e.g. 25000" 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase text-muted-foreground font-black">Date of Payment</label>
                  <Input 
                    type="date" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer hover:bg-secondary/20 transition-all group">
                  <Upload className="mx-auto text-muted-foreground group-hover:text-primary transition-colors mb-3" size={24} />
                  <p className="text-xs font-bold">Attach Proof of Payment</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Institutional Ledger requirement: JPG/PDF</p>
                </div>
                
                <Button className="w-full h-12 font-bold" onClick={handleManualSubmit}>
                  Confirm Payment Submission
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-secondary/30 border-b">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Date</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Reference</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Amount</th>
                  <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {history.map((pay) => (
                  <tr key={pay.id} className="hover:bg-secondary/10 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{pay.date}</td>
                    <td className="px-6 py-4 text-xs font-mono text-muted-foreground">{pay.reference}</td>
                    <td className="px-6 py-4 text-sm font-bold">KES {pay.amount.toLocaleString()}</td>
                    <td className="px-6 py-4 text-sm text-right">
                      <Badge className={pay.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}>
                        {pay.status === 'verified' ? 'Verified' : 'Pending Verification'}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {history.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-muted-foreground italic text-sm">
                      No payment history found in this portal.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="payment-plans">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border-border/60">
              <h3 className="font-bold text-lg mb-2">Split Bill</h3>
              <p className="text-sm text-muted-foreground mb-6">Pay in two installments (1st and 15th) for an additional KES 500 processing fee.</p>
              <Button variant="outline" className="w-full h-11 font-bold" onClick={() => toast.success('Split bill plan submitted for review.')}>Apply for Split Bill</Button>
            </Card>
            <Card className="p-6 border-border/60">
              <h3 className="font-bold text-lg mb-2">Pay-As-You-Earn</h3>
              <p className="text-sm text-muted-foreground mb-6">Custom weekly micro-payments for gig economy workers. Requires income verification.</p>
              <Button variant="outline" className="w-full h-11 font-bold" onClick={() => toast.info('Income verification module coming soon.')}>Verify Income</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* M-Pesa Overlay */}
      <Dialog open={showMpesaPrompt}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="text-green-600" />
              Verifying Payment...
            </DialogTitle>
            <DialogDescription>
              We are waiting for the STK response from Safaricom. Please do not close this window.
            </DialogDescription>
          </DialogHeader>
          <div className="py-8">
            <Progress value={mpesaProgress} className="h-2" />
            <p className="text-[10px] text-center mt-4 text-muted-foreground animate-pulse">
              Communicating with M-Pesa Gateway...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Card = ({ children, className }: any) => (
  <div className={`bg-card rounded-xl border p-6 ${className}`}>
    {children}
  </div>
);

export default TenantPayments;
