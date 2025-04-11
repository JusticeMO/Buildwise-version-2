
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';
import { Calculator, Check, ChevronRight, CreditCard, ExternalLink, Home, Percent, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const BankFinancing = () => {
  const [activeTab, setActiveTab] = useState('mortgages');
  
  const mortgageOffers = [
    {
      bank: "Kenya Commercial Bank",
      name: "Diaspora Home Solution",
      interestRate: "11.5%",
      termYears: "Up to 25",
      maxAmount: "KES 50M",
      minDeposit: "10%",
      highlights: ["Foreign income accepted", "Online application", "Fixed rates available"],
      special: "No processing fees for diaspora clients until June 2025",
      url: "https://ke.kcbgroup.com/mortgage-loans"
    },
    {
      bank: "Equity Bank",
      name: "Equity Diaspora Mortgage",
      interestRate: "11.9%",
      termYears: "Up to 20",
      maxAmount: "KES 60M",
      minDeposit: "15%",
      highlights: ["USD/GBP payment options", "Property search assistance", "Pre-approval in 48 hours"],
      url: "https://equitygroupholdings.com/ke/borrow/equity-mortgages"
    },
    {
      bank: "Cooperative Bank",
      name: "Co-op Diaspora Home Financing",
      interestRate: "11.7%",
      termYears: "Up to 25",
      maxAmount: "KES 40M",
      minDeposit: "10%",
      highlights: ["No collateral options", "Discounted legal fees", "Flexible repayment options"],
      special: "0.5% discount for Co-op customers",
      url: "https://www.co-opbank.co.ke/personal-banking/borrowing/mortgages/"
    },
    {
      bank: "Absa Bank",
      name: "Absa Diaspora Home Loan",
      interestRate: "10.9%",
      termYears: "Up to 25",
      maxAmount: "KES 70M",
      minDeposit: "15%",
      highlights: ["Fast approval process", "Property valuation included", "Local representative option"],
      special: "New customers get 1% cashback on approved loans over KES 10M",
      url: "https://www.absabank.co.ke/personal/borrow/home-loans/"
    }
  ];
  
  const constructionLoans = [
    {
      bank: "Kenya Commercial Bank",
      name: "Diaspora Build Solution",
      interestRate: "12.5%",
      termYears: "Up to 20",
      maxAmount: "KES 30M",
      minDeposit: "20%",
      highlights: ["Phased disbursement", "Project management support", "Flexible collateral options"],
      url: "https://ke.kcbgroup.com/mortgage-loans"
    },
    {
      bank: "DTB Bank",
      name: "Diaspora Construction Advance",
      interestRate: "12.3%",
      termYears: "Up to 15",
      maxAmount: "KES 25M",
      minDeposit: "25%",
      highlights: ["Construction milestone financing", "Technical assistance", "Land purchase option"],
      special: "Free property insurance for first year",
      url: "https://dtbk.dtbafrica.com/personal-banking/loans-financing/mortgage/"
    },
    {
      bank: "NCBA Bank",
      name: "NCBA Construction Financing",
      interestRate: "12.0%",
      termYears: "Up to 15",
      maxAmount: "KES 40M",
      minDeposit: "20%",
      highlights: ["Construction expertise", "Project oversight", "Customized payment schedule"],
      url: "https://ke.ncbagroup.com/personal-banking/loans/"
    }
  ];
  
  const renovationLoans = [
    {
      bank: "Equity Bank",
      name: "Home Improvement Loan",
      interestRate: "14.5%",
      termYears: "Up to 7",
      maxAmount: "KES 10M",
      minDeposit: "None",
      highlights: ["No collateral for existing customers", "Quick approval", "Flexible use of funds"],
      url: "https://equitygroupholdings.com/ke/"
    },
    {
      bank: "Cooperative Bank",
      name: "Home Renovate",
      interestRate: "14.0%",
      termYears: "Up to 5",
      maxAmount: "KES 7M",
      minDeposit: "None",
      highlights: ["Unsecured options available", "Fixed payments", "Early repayment option"],
      url: "https://www.co-opbank.co.ke/personal-banking/borrowing/"
    }
  ];
  
  const promotions = [
    {
      title: "First-Time Buyer Discount",
      description: "0.5% interest rate discount for first-time property buyers",
      bank: "Equity Bank",
      validUntil: "December 31, 2025",
      code: "FIRST2025"
    },
    {
      title: "Legal Fee Cashback",
      description: "Get up to KES 100,000 cashback on legal fees when taking a mortgage above KES 10M",
      bank: "KCB",
      validUntil: "September 30, 2025",
      code: "KCBLEGAL100"
    },
    {
      title: "Diaspora Special",
      description: "No arrangement fees for diaspora customers",
      bank: "Absa Bank",
      validUntil: "August 15, 2025",
      code: "DIASPORABUILD"
    },
    {
      title: "Green Building Discount",
      description: "0.75% interest rate discount for eco-friendly construction projects",
      bank: "DTB Bank",
      validUntil: "May 31, 2026",
      code: "GREENBUILDDTB"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 sm:py-20">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Financing Solutions for Your Kenyan Project</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Compare the latest mortgage and construction loan offers from leading Kenyan banks with exclusive rates for diaspora clients.
              </p>
              <div className="inline-flex items-center gap-2 bg-secondary/80 px-4 py-2 rounded-full">
                <Shield size={20} className="text-primary" />
                <span className="text-sm font-medium">BuildWise verified bank partners</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Home className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mortgages</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure financing for your dream home in Kenya with competitive rates tailored for diaspora clients.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Up to 90% financing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Terms up to 25 years</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Foreign income accepted</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <CreditCard className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Construction Loans</h3>
                  <p className="text-muted-foreground mb-4">
                    Fund your building project with flexible disbursement options based on construction milestones.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Phased disbursement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Project management support</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Technical assistance</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="p-6">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Percent className="text-primary" size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Special Promotions</h3>
                  <p className="text-muted-foreground mb-4">
                    Take advantage of exclusive offers and discounts from our banking partners for BuildWise clients.
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Discounted interest rates</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Reduced processing fees</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Special diaspora packages</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Loan Offers Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Compare Financing Options</h2>
            
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8 w-full max-w-xl mx-auto">
                <TabsTrigger value="mortgages">Mortgages</TabsTrigger>
                <TabsTrigger value="construction">Construction</TabsTrigger>
                <TabsTrigger value="renovation">Renovation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mortgages">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mortgageOffers.map((offer, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{offer.name}</CardTitle>
                        <CardDescription>{offer.bank}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Interest Rate</span>
                          <span className="font-bold">{offer.interestRate}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Term</span>
                          <span>{offer.termYears} years</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Max Amount</span>
                          <span>{offer.maxAmount}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Min Deposit</span>
                          <span>{offer.minDeposit}</span>
                        </div>
                        <div className="space-y-2">
                          {offer.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Check size={16} className="text-green-500" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        {offer.special && (
                          <div className="bg-primary/10 rounded-md p-2 text-sm">
                            <span className="font-medium">Special offer:</span> {offer.special}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <a href={offer.url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button 
                            className="w-full"
                            icon={<ExternalLink size={16} />}
                            iconPosition="right"
                          >
                            Apply Now
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="construction">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {constructionLoans.map((offer, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{offer.name}</CardTitle>
                        <CardDescription>{offer.bank}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Interest Rate</span>
                          <span className="font-bold">{offer.interestRate}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Term</span>
                          <span>{offer.termYears} years</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Max Amount</span>
                          <span>{offer.maxAmount}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Min Deposit</span>
                          <span>{offer.minDeposit}</span>
                        </div>
                        <div className="space-y-2">
                          {offer.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Check size={16} className="text-green-500" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                        {offer.special && (
                          <div className="bg-primary/10 rounded-md p-2 text-sm">
                            <span className="font-medium">Special offer:</span> {offer.special}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <a href={offer.url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button 
                            className="w-full"
                            icon={<ExternalLink size={16} />}
                            iconPosition="right"
                          >
                            Apply Now
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="renovation">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {renovationLoans.map((offer, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{offer.name}</CardTitle>
                        <CardDescription>{offer.bank}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-4">
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Interest Rate</span>
                          <span className="font-bold">{offer.interestRate}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Term</span>
                          <span>{offer.termYears} years</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Max Amount</span>
                          <span>{offer.maxAmount}</span>
                        </div>
                        <div className="flex justify-between items-center border-b pb-2">
                          <span className="text-sm text-muted-foreground">Min Deposit</span>
                          <span>{offer.minDeposit}</span>
                        </div>
                        <div className="space-y-2">
                          {offer.highlights.map((highlight, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <Check size={16} className="text-green-500" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <a href={offer.url} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button 
                            className="w-full"
                            icon={<ExternalLink size={16} />}
                            iconPosition="right"
                          >
                            Apply Now
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Special Promotions */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-2">Special Promotions</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Exclusive discounts and offers for BuildWise clients
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {promotions.map((promo, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{promo.title}</h3>
                    <Badge variant="outline">{promo.bank}</Badge>
                  </div>
                  <p className="text-muted-foreground mb-4 flex-grow">{promo.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div>
                      <span className="font-medium">Valid until:</span> {promo.validUntil}
                    </div>
                    <div className="bg-secondary/50 px-3 py-1 rounded font-mono">
                      {promo.code}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Calculator CTA */}
        <section className="py-16 bg-white">
          <div className="container px-4 mx-auto">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/20 rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-2/3">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Need help calculating your financing?</h2>
                  <p className="text-muted-foreground mb-6">
                    Use our mortgage calculator to estimate monthly payments, total interest costs, and find the best financing option for your needs.
                  </p>
                  <Link to="/mortgage-calculator">
                    <Button 
                      size="lg"
                      icon={<Calculator size={18} />}
                      iconPosition="left"
                    >
                      Mortgage Calculator
                    </Button>
                  </Link>
                </div>
                <div className="bg-white rounded-xl p-6 md:w-1/3 shadow-md">
                  <div className="space-y-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Loan Amount</span>
                      <span className="font-bold">KES 10,000,000</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Interest Rate</span>
                      <span className="font-bold">11.5%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground">Monthly Payment</span>
                      <span className="font-bold text-xl text-primary">KES 115,250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Advisory Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Need personalized advice?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Speak with our financial advisors who specialize in diaspora investments and can help you navigate the Kenyan property market
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg">Book a Consultation</Button>
              <Link to="/contact">
                <Button variant="outline" size="lg">Contact Us</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BankFinancing;
