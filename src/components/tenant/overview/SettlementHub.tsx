
import React, { useState } from 'react';
import { Send, CreditCard, Clock, RefreshCw, History } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SettlementHubProps {
  lease: any;
}

const SettlementHub: React.FC<SettlementHubProps> = ({ lease }) => {
  const [phone, setPhone] = useState('');
  const baseRent = lease?.rentAmount || 25000;
  const serviceCharges = 1700;
  const totalDue = baseRent + serviceCharges;
  const totalPaid = 600000;
  const lastPayment = baseRent;

  const handlePay = () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    toast.success("Payment request sent. Check your phone for the M-Pesa prompt.");
  };

  return (
    <div className="space-y-4">
      {/* Settlement Hub */}
      <div className="bg-card rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">Settlement Hub</h3>
          <Send size={16} className="text-muted-foreground" />
        </div>

        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">Amount Currently Due</p>
        <p className="text-2xl font-bold mb-1">Ksh {totalDue.toLocaleString()}</p>
        <div className="flex gap-3 text-xs mb-5">
          <span className="text-muted-foreground">Base: Ksh {baseRent.toLocaleString()}</span>
          <span className="text-amber-600 font-medium">Services: KES {serviceCharges.toLocaleString()}</span>
        </div>

        <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-2">Phone Number</p>
        <Input
          placeholder="+254 7XX XXX XXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mb-3"
        />

        <button
          onClick={handlePay}
          className="w-full bg-foreground text-primary-foreground py-3 rounded-lg font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <CreditCard size={16} /> Pay Now
        </button>
      </div>

      {/* Capital Registry */}
      <div className="bg-card rounded-xl border border-border p-5">
        <h3 className="text-[10px] uppercase tracking-widest font-bold mb-3">Payment Summary</h3>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Total Rent Paid</p>
        <p className="text-xl font-bold text-amber-600 mb-4">Ksh {totalPaid.toLocaleString()}</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="border border-border rounded-lg p-3">
            <Clock size={14} className="text-amber-500 mb-1" />
            <p className="text-[10px] uppercase tracking-widest font-bold">Last</p>
            <p className="text-sm text-amber-600">Ksh {(lastPayment / 1000).toFixed(0)}k</p>
          </div>
          <div className="border border-border rounded-lg p-3">
            <History size={14} className="text-muted-foreground mb-1" />
            <p className="text-[10px] uppercase tracking-widest font-bold">History</p>
            <p className="text-sm text-muted-foreground">24 entries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettlementHub;
