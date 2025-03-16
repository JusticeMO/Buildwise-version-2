
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Building2, CreditCard, Info } from 'lucide-react';
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
  numberOfUnits: z.string().transform(val => parseInt(val, 10)),
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
  const [selectedPlan, setSelectedPlan] = useState<string>('basic');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: '',
      numberOfUnits: '1',
      paymentMethod: '',
      acceptTerms: false
    }
  });

  const { watch, setValue } = form;
  const numberOfUnits = watch('numberOfUnits');
  const paymentMethod = watch('paymentMethod');
  
  // Calculate price based on number of units
  const getPrice = () => {
    const units = parseInt(numberOfUnits || '0');
    
    if (units < 10) {
      return 1000;
    } else if (units <= 20) {
      return 1500;
    } else if (units <= 70) {
      return 2500;
    } else {
      return 3500; // For more than 70 units
    }
  };

  // Get plan name based on number of units
  const getPlanName = () => {
    const units = parseInt(numberOfUnits || '0');
    
    if (units < 10) {
      return 'Basic Plan';
    } else if (units <= 20) {
      return 'Standard Plan';
    } else if (units <= 70) {
      return 'Professional Plan';
    } else {
      return 'Enterprise Plan';
    }
  };

  const onSubmit = (data: FormValues) => {
    // Here you would handle form submission, e.g., send to a backend API
    console.log('Form submitted:', data);
    toast.success('Property registered successfully!', {
      description: `${data.propertyName} has been registered with ${data.numberOfUnits} units.`
    });
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
                            max="100"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              // Update plan when units change
                              const units = parseInt(e.target.value, 10);
                              if (units < 10) {
                                setSelectedPlan('basic');
                              } else if (units <= 20) {
                                setSelectedPlan('standard');
                              } else if (units <= 70) {
                                setSelectedPlan('professional');
                              } else {
                                setSelectedPlan('enterprise');
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          This will determine your pricing plan
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
              <h3 className="text-lg font-semibold mb-3">Your Selected Plan</h3>
              
              <div className={`p-4 rounded-md mb-4 border-2 ${
                selectedPlan === 'basic' 
                  ? 'border-primary bg-primary/5' 
                  : selectedPlan === 'standard'
                  ? 'border-amber-500 bg-amber-50'
                  : selectedPlan === 'professional'
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-purple-500 bg-purple-50'
              }`}>
                <div className="font-bold text-xl mb-1">
                  {getPlanName()}
                </div>
                <div className="text-2xl font-bold mb-2">
                  KSh {getPrice().toLocaleString()}/month
                </div>
                <div className="text-sm">
                  For properties with {parseInt(numberOfUnits || '0')} units
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
                  {(selectedPlan === 'standard' || selectedPlan === 'professional' || selectedPlan === 'enterprise') && (
                    <li className="flex items-start text-sm">
                      <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      Advanced reporting
                    </li>
                  )}
                  {(selectedPlan === 'professional' || selectedPlan === 'enterprise') && (
                    <li className="flex items-start text-sm">
                      <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      Financial analytics
                    </li>
                  )}
                  {selectedPlan === 'enterprise' && (
                    <li className="flex items-start text-sm">
                      <div className="rounded-full bg-emerald-500 text-white p-1 mr-2 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                      API integrations
                    </li>
                  )}
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
