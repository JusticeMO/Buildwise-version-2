
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, CreditCard, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import Card from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import { toast } from 'sonner';

const formSchema = z.object({
  propertyName: z.string().min(2, { message: "Property name must be at least 2 characters" }),
  propertyType: z.string({ required_error: "Please select a property type" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  numberOfUnits: z.string(),
  description: z.string().optional(),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters" }),
  contactPhone: z.string().min(10, { message: "Please enter a valid phone number" }),
  contactEmail: z.string().email({ message: "Please enter a valid email address" }),
  paymentMethod: z.string({ required_error: "Please select a payment method" }),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
  mpesaPhone: z.string().optional(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions" })
});

type FormValues = z.infer<typeof formSchema>;

const PropertyRegistrationForm = () => {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(0);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: '',
      numberOfUnits: '1',
      paymentMethod: '',
      acceptTerms: false
    }
  });

  const { watch } = form;
  const numberOfUnits = watch('numberOfUnits');
  const paymentMethod = watch('paymentMethod');
  
  // New pricing calculation based on requirements
  const calculatePrice = (units: number) => {
    if (units <= 0) return 0;
    
    let totalPrice = 0;
    let remainingUnits = units;
    let tierPrice = 2500;
    
    while (remainingUnits > 0) {
      const unitsInTier = Math.min(remainingUnits, 10);
      totalPrice += tierPrice;
      remainingUnits -= unitsInTier;
      
      // Reduce price by 500 for next tier, minimum 500
      tierPrice = Math.max(tierPrice - 500, 500);
    }
    
    return totalPrice;
  };

  const getPrice = () => {
    const units = parseInt(numberOfUnits || '0', 10);
    return calculatePrice(units);
  };

  const getAllPlans = () => {
    const units = parseInt(numberOfUnits || '0', 10);
    const plans = [];
    
    // Generate plans for different unit ranges
    const ranges = [
      { min: 1, max: 10, name: 'Basic Plan' },
      { min: 11, max: 20, name: 'Standard Plan' },
      { min: 21, max: 50, name: 'Professional Plan' },
      { min: 51, max: 100, name: 'Enterprise Plan' }
    ];
    
    ranges.forEach(range => {
      if (units >= range.min && units <= range.max) {
        plans.push({
          name: range.name,
          price: calculatePrice(units),
          units: units,
          description: `For properties with ${units} units`
        });
      }
    });
    
    // If no exact match, show the plan for current units
    if (plans.length === 0) {
      plans.push({
        name: units <= 10 ? 'Basic Plan' : units <= 20 ? 'Standard Plan' : units <= 50 ? 'Professional Plan' : 'Enterprise Plan',
        price: calculatePrice(units),
        units: units,
        description: `For properties with ${units} units`
      });
    }
    
    return plans;
  };

  const plans = getAllPlans();
  const currentPlan = plans[selectedPlanIndex] || plans[0];

  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    toast.success('Property registered successfully!', {
      description: `${data.propertyName} has been registered with ${data.numberOfUnits} units.`
    });
  };

  const navigatePlan = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && selectedPlanIndex > 0) {
      setSelectedPlanIndex(selectedPlanIndex - 1);
    } else if (direction === 'next' && selectedPlanIndex < plans.length - 1) {
      setSelectedPlanIndex(selectedPlanIndex + 1);
    }
  };

  return (
    <div id="property-registration">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Register Your Property</h2>
        <p className="text-muted-foreground">
          Complete the form below to start managing your property with e-Caretaker
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card padding="lg">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Property Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Building2 size={20} className="text-primary" />
                    Property Details
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Westlands Apartments" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">Apartment Building</SelectItem>
                              <SelectItem value="commercial">Commercial Property</SelectItem>
                              <SelectItem value="residential">Residential Complex</SelectItem>
                              <SelectItem value="mixed">Mixed Use</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Full address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="numberOfUnits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Units</FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            min="1"
                            max="1000"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              setSelectedPlanIndex(0); // Reset to first plan when units change
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          Pricing: KSh 2,500 for first 10 units, then KSh 2,000 for next 10, and so on (minimum KSh 500 per tier)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Briefly describe your property" 
                            className="resize-none" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                {/* Contact Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold pt-2 border-t flex items-center gap-2">
                    <Info size={20} className="text-primary" />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contact Person</FormLabel>
                          <FormControl>
                            <Input placeholder="Full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0712345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                {/* Payment Details Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold pt-2 border-t flex items-center gap-2">
                    <CreditCard size={20} className="text-primary" />
                    Payment Details
                  </h3>
                  
                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Payment Method</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="card" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Credit/Debit Card
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="mpesa" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                M-Pesa
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="bank" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Bank Transfer
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Payment method specific fields */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="cardExpiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="cardCvc"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVC</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  )}
                  
                  {paymentMethod === 'mpesa' && (
                    <FormField
                      control={form.control}
                      name="mpesaPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>M-Pesa Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. 0712345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  
                  {paymentMethod === 'bank' && (
                    <div className="p-4 bg-secondary/30 rounded-md">
                      <p className="text-sm">
                        You will receive our bank details after submitting the form. Please use your property name as the reference.
                      </p>
                    </div>
                  )}
                </div>
                
                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I accept the terms and conditions
                        </FormLabel>
                        <FormDescription>
                          By checking this box, you agree to our Terms of Service and Privacy Policy.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  size="lg" 
                  fullWidth 
                  className="mt-8"
                >
                  Register Property
                </Button>
              </form>
            </Form>
          </Card>
        </div>
        
        <div>
          <div className="sticky top-4">
            <Card variant="outline" padding="lg" className="bg-secondary/10">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Your Selected Plan</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigatePlan('prev')}
                    disabled={selectedPlanIndex === 0}
                    className="p-1 h-8 w-8"
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {selectedPlanIndex + 1} of {plans.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigatePlan('next')}
                    disabled={selectedPlanIndex === plans.length - 1}
                    className="p-1 h-8 w-8"
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="p-4 rounded-md mb-4 border-2 border-primary bg-primary/5">
                <div className="font-bold text-xl mb-1">
                  {currentPlan?.name || 'Basic Plan'}
                </div>
                <div className="text-2xl font-bold mb-2">
                  KSh {(currentPlan?.price || 0).toLocaleString()}/month
                </div>
                <div className="text-sm">
                  {currentPlan?.description || `For properties with ${numberOfUnits || 0} units`}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Plan Features:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Automated rent collection
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Maintenance request tracking
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Tenant communication portal
                  </li>
                  <li className="flex items-start text-sm">
                    <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    Financial reporting & analytics
                  </li>
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="text-sm text-muted-foreground mb-2">
                  Have questions about our plans?
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  fullWidth
                >
                  Contact Sales
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyRegistrationForm;
