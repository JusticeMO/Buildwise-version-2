
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Button from '@/components/shared/Button';
import { Calculator, ChevronLeft, Landmark, Download, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatCurrency } from '@/lib/utils';

// Create the formatCurrency utility function in utils.ts if it doesn't exist
interface CalculatorInputs {
  loanAmount: number;
  interestRate: number;
  loanTerm: number;
  downPayment: number;
}

interface MortgageResults {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  monthlyBreakdown: {
    principal: number;
    interest: number;
    insurance: number;
  };
}

const MortgageCalculator = () => {
  const [formValues, setFormValues] = useState<CalculatorInputs>({
    loanAmount: 10000000, // KES 10M
    interestRate: 11.5,
    loanTerm: 20,
    downPayment: 10,
  });
  
  const [results, setResults] = useState<MortgageResults>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
    monthlyBreakdown: {
      principal: 0,
      interest: 0,
      insurance: 0,
    },
  });
  
  // Calculate mortgage results whenever form values change
  useEffect(() => {
    calculateMortgage();
  }, [formValues]);
  
  const calculateMortgage = () => {
    const { loanAmount, interestRate, loanTerm, downPayment } = formValues;
    
    // Calculate loan amount after down payment
    const downPaymentAmount = (loanAmount * downPayment) / 100;
    const principalAmount = loanAmount - downPaymentAmount;
    
    // Convert annual interest rate to monthly and convert percentage to decimal
    const monthlyRate = interestRate / 100 / 12;
    
    // Convert years to months
    const loanTermMonths = loanTerm * 12;
    
    // Calculate monthly payment using the mortgage formula
    const x = Math.pow(1 + monthlyRate, loanTermMonths);
    const monthlyPayment = (principalAmount * x * monthlyRate) / (x - 1);
    
    // Calculate total payment and total interest
    const totalPayment = monthlyPayment * loanTermMonths;
    const totalInterest = totalPayment - principalAmount;
    
    // Calculate monthly breakdown
    // Assuming insurance is approximately 0.5% of the loan amount annually
    const monthlyInsurance = (principalAmount * 0.005) / 12;
    const monthlyPrincipalAndInterest = monthlyPayment - monthlyInsurance;
    const monthlyInterest = principalAmount * monthlyRate;
    const monthlyPrincipal = monthlyPrincipalAndInterest - monthlyInterest;
    
    setResults({
      monthlyPayment,
      totalPayment,
      totalInterest,
      monthlyBreakdown: {
        principal: monthlyPrincipal,
        interest: monthlyInterest,
        insurance: monthlyInsurance,
      },
    });
  };
  
  const handleChange = (name: keyof CalculatorInputs, value: number) => {
    setFormValues(prev => ({ ...prev, [name]: value }));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = parseFloat(value);
    
    if (!isNaN(numValue)) {
      handleChange(name as keyof CalculatorInputs, numValue);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-12 bg-secondary/10">
        <div className="container px-4">
          {/* Back to financing link */}
          <Link to="/financing" className="inline-flex items-center gap-2 mb-8 text-sm font-medium hover:underline">
            <ChevronLeft size={16} />
            Back to financing options
          </Link>
          
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mortgage Calculator</h1>
            <p className="text-muted-foreground text-lg">
              Calculate monthly payments and see the breakdown of your mortgage costs
            </p>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8">
            {/* Calculator inputs - 7 columns on medium screens and larger */}
            <div className="md:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator size={20} />
                    <span>Mortgage Parameters</span>
                  </CardTitle>
                  <CardDescription>
                    Adjust the values to calculate your estimated mortgage payments
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Loan Amount */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loanAmount">Property Value (KES)</Label>
                      <div className="font-medium">{formValues.loanAmount.toLocaleString()}</div>
                    </div>
                    <Input
                      id="loanAmount"
                      name="loanAmount"
                      type="number"
                      value={formValues.loanAmount}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Slider
                      id="loanAmount-slider"
                      min={1000000}
                      max={100000000}
                      step={500000}
                      value={[formValues.loanAmount]}
                      onValueChange={(value) => handleChange('loanAmount', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>KES 1M</span>
                      <span>KES 100M</span>
                    </div>
                  </div>
                  
                  {/* Down Payment */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="downPayment" className="flex items-center gap-1">
                        <span>Down Payment (%)</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Info size={14} className="text-muted-foreground cursor-pointer" />
                          </PopoverTrigger>
                          <PopoverContent className="w-72">
                            <div className="space-y-2 text-sm">
                              <p>The down payment amount is {(formValues.loanAmount * formValues.downPayment / 100).toLocaleString()} KES</p>
                              <p>Most Kenyan banks require a minimum down payment of 10-20% of the property value.</p>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </Label>
                      <div className="font-medium">{formValues.downPayment}%</div>
                    </div>
                    <Input
                      id="downPayment"
                      name="downPayment"
                      type="number"
                      value={formValues.downPayment}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Slider
                      id="downPayment-slider"
                      min={0}
                      max={90}
                      step={5}
                      value={[formValues.downPayment]}
                      onValueChange={(value) => handleChange('downPayment', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>90%</span>
                    </div>
                  </div>
                  
                  {/* Interest Rate */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="interestRate">Interest Rate (%)</Label>
                      <div className="font-medium">{formValues.interestRate}%</div>
                    </div>
                    <Input
                      id="interestRate"
                      name="interestRate"
                      type="number"
                      step="0.1"
                      value={formValues.interestRate}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Slider
                      id="interestRate-slider"
                      min={5}
                      max={20}
                      step={0.1}
                      value={[formValues.interestRate]}
                      onValueChange={(value) => handleChange('interestRate', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>20%</span>
                    </div>
                  </div>
                  
                  {/* Loan Term */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                      <div className="font-medium">{formValues.loanTerm} years</div>
                    </div>
                    <Input
                      id="loanTerm"
                      name="loanTerm"
                      type="number"
                      value={formValues.loanTerm}
                      onChange={handleInputChange}
                      className="mb-2"
                    />
                    <Slider
                      id="loanTerm-slider"
                      min={1}
                      max={30}
                      step={1}
                      value={[formValues.loanTerm]}
                      onValueChange={(value) => handleChange('loanTerm', value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>30 years</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Results - 5 columns on medium screens and larger */}
            <div className="md:col-span-5 space-y-6">
              {/* Monthly Payment Card */}
              <Card className="bg-primary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="text-center">Estimated Monthly Payment</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-4xl font-bold mb-4">
                    {!isNaN(results.monthlyPayment) 
                      ? `KES ${Math.round(results.monthlyPayment).toLocaleString()}`
                      : 'KES 0'}
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="opacity-80">Principal & Interest</div>
                      <div className="font-medium">
                        KES {Math.round(results.monthlyBreakdown.principal + results.monthlyBreakdown.interest).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-80">Insurance</div>
                      <div className="font-medium">
                        KES {Math.round(results.monthlyBreakdown.insurance).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="opacity-80">Down Payment</div>
                      <div className="font-medium">
                        KES {Math.round((formValues.loanAmount * formValues.downPayment) / 100).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Loan Summary Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Loan Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">Loan Amount</span>
                    <span className="font-medium">
                      KES {Math.round(formValues.loanAmount - (formValues.loanAmount * formValues.downPayment / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">Total Interest</span>
                    <span className="font-medium">
                      KES {Math.round(results.totalInterest).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="text-muted-foreground">Total Cost</span>
                    <span className="font-bold">
                      KES {Math.round(results.totalPayment + (formValues.loanAmount * formValues.downPayment / 100)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-4">
                    <Button 
                      className="w-full"
                      icon={<Download size={18} />}
                      iconPosition="left"
                    >
                      Download Amortization Schedule
                    </Button>
                    
                    <Link to="/financing" className="w-full">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        icon={<Landmark size={18} />}
                        iconPosition="left"
                      >
                        View Available Lenders
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
              
              {/* Banking Partners */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-lg font-bold mb-4">Partner Banking Institutions</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {["Kenya Commercial Bank", "Equity Bank", "Cooperative Bank", "Absa Bank", "DTB Bank", "NCBA Bank"].map((bank, index) => (
                    <div key={index} className="text-center">
                      <div className="bg-primary/5 h-12 rounded flex items-center justify-center mb-2">
                        <Landmark size={20} className="text-primary" />
                      </div>
                      <div className="text-xs font-medium">{bank}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MortgageCalculator;
