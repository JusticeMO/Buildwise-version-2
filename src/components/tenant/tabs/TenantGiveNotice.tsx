
import React, { useState } from 'react';
import { Calendar, ChevronRight, AlertCircle, CheckCircle2, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTenantData } from '@/hooks/useTenantData';
import { submitNotice } from '@/data/sharedMockData';
import { toast } from 'sonner';

const TenantGiveNotice = () => {
  const { lease } = useTenantData();
  const [step, setStep] = useState(1);
  const [noticeType, setNoticeType] = useState<'30-day' | 'specific' | null>(null);
  const [vacateDate, setVacateDate] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleNextStep = () => {
    if (noticeType === '30-day') {
      const today = new Date();
      const thirtyDaysLater = new Date(today.setDate(today.getDate() + 30));
      setVacateDate(thirtyDaysLater.toISOString().split('T')[0]);
    }
    setStep(2);
  };

  const handleSubmit = () => {
    if (!isConfirmed) {
      toast.error("Please confirm you are sure you intend to leave.");
      return;
    }
    
    if (!vacateDate) {
      toast.error("Please specify a vacate date.");
      return;
    }

    submitNotice({
      tenantId: lease.tenant?.id || 'tenant-1',
      tenantName: lease.tenant?.name || 'John Doe',
      unitLabel: `Apartment ${lease.unit.unitNumber}`,
      vacateDate: vacateDate,
    });
    
    toast.success("Notice of vacating has been submitted successfully.");
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center">
        <CheckCircle2 size={64} className="mx-auto text-green-600 mb-6" />
        <h2 className="text-2xl font-bold mb-4">Notice Submitted Successfully</h2>
        <p className="text-muted-foreground mb-8">
          Your intent to vacate on <span className="font-bold text-foreground">{new Date(vacateDate).toLocaleDateString()}</span> has been recorded. 
          Your unit is now listed as available for the next tenant from that date.
        </p>
        <div className="bg-secondary/30 px-6 py-4 rounded-lg inline-block text-left text-sm border border-border">
          <p className="font-bold mb-1">Next Steps:</p>
          <ul className="list-disc ml-4 space-y-1 text-muted-foreground">
            <li>Ensure all final bills are settled before departure.</li>
            <li>Coordinate a final inspection with your landlord.</li>
            <li>Return all keys to the management office.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">Vacating Notice</h2>
        <p className="text-muted-foreground text-sm">Initiate the process to officially give notice to vacate your current property.</p>
      </div>

      {/* Progress Steps */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex flex-col gap-2">
            <div className={`h-1 w-full rounded-full ${step >= s ? 'bg-primary' : 'bg-secondary'}`} />
            <p className="text-xs font-semibold text-muted-foreground">Step {s}: {s === 1 ? 'Notice Details' : 'Final Confirmation'}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
        {step === 1 ? (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-sm">Select Notice Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setNoticeType('30-day')}
                  className={`p-5 border-2 rounded-xl text-left transition-all ${
                    noticeType === '30-day' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <Calendar className="mb-3 text-primary" size={24} />
                  <p className="font-bold mb-1 text-sm">30-Day Notice</p>
                  <p className="text-xs text-muted-foreground">Standard notice period as per most agreements.</p>
                </button>
                <button
                  onClick={() => setNoticeType('specific')}
                  className={`p-5 border-2 rounded-xl text-left transition-all ${
                    noticeType === 'specific' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <ChevronRight className="mb-3 text-muted-foreground" size={24} />
                  <p className="font-bold mb-1 text-sm">Choose Specific Date</p>
                  <p className="text-xs text-muted-foreground">Specify a particular date you intend to vacate.</p>
                </button>
              </div>
            </div>

            {noticeType === 'specific' && (
              <div className="space-y-3 animate-fade-in">
                <label className="text-xs font-semibold text-muted-foreground">Intended Vacate Date</label>
                <Input
                  type="date"
                  value={vacateDate}
                  onChange={(e) => setVacateDate(e.target.value)}
                  className="max-w-xs"
                />
              </div>
            )}

            <div className="bg-secondary/30 p-4 rounded-lg flex gap-3 text-xs leading-relaxed border border-border">
              <AlertCircle size={18} className="shrink-0 text-muted-foreground" />
              <p>
                <strong>Note:</strong> Your notice period is defined by the terms and conditions in your specific contract agreement.
                Submitting this notice is a legally binding intent to vacate.
              </p>
            </div>

            <Button
              disabled={!noticeType || (noticeType === 'specific' && !vacateDate)}
              onClick={handleNextStep}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
            >
              Continue to Confirmation
            </Button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-secondary/20 border border-border rounded-lg p-6 space-y-4">
              <h3 className="font-bold text-sm mb-2">Notice Summary</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div className="text-muted-foreground">Property:</div>
                <div className="font-bold flex items-center gap-1.5"><Home size={14} /> {lease.unit.property.title}</div>
                <div className="text-muted-foreground">Unit:</div>
                <div className="font-bold">Apartment {lease.unit.unitNumber}</div>
                <div className="text-muted-foreground">Vacate Date:</div>
                <div className="font-bold text-primary">{new Date(vacateDate).toLocaleDateString()}</div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <input
                  type="checkbox"
                  id="confirm-vacate"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="confirm-vacate" className="text-sm leading-relaxed cursor-pointer select-none">
                  I agree that I am sure I intend to leave and vacate the premises on the date stated above. 
                  I understand this triggers the unit availability status update.
                </label>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!isConfirmed}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex-1"
                >
                  Submit Intent to Leave
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TenantGiveNotice;
