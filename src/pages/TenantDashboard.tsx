
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Button from '@/components/shared/Button';
import { 
  Home, Menu, LogOut, CreditCard, FileText, MessageSquare, Droplet,
  Trash2, History, Bell, Calendar, ChevronRight, Upload, CheckCircle, AlertCircle 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Tenant Dashboard component
const TenantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate('/tenant/login');
  };
  
  return (
    <div className="min-h-screen flex">
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="fixed bottom-4 right-4 lg:hidden z-50">
          <Button size="icon" variant="outline" className="rounded-full h-12 w-12 shadow-lg">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <TenantSidebar onLogout={handleLogout} onNavChange={setActiveTab} activeTab={activeTab} />
        </SheetContent>
      </Sheet>
      
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white border-r min-h-screen">
        <TenantSidebar onLogout={handleLogout} onNavChange={setActiveTab} activeTab={activeTab} />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 bg-secondary/10">
        <header className="bg-white shadow-sm py-4 px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">Tenant Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome John Doe</p>
            </div>
            <div className="flex items-center gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative">
                    <Bell size={20} />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Notifications</DialogTitle>
                  <div className="space-y-3 mt-4">
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="text-amber-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">Rent due in 3 days</p>
                          <p className="text-xs text-muted-foreground">Your monthly rent of KES 25,000 is due on July 1st</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Droplet className="text-blue-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">Water bill updated</p>
                          <p className="text-xs text-muted-foreground">Your water bill for June is KES 1,200</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-secondary/20 p-3 rounded-lg">
                      <div className="flex items-start gap-2">
                        <FileText className="text-green-500 mt-0.5" size={18} />
                        <div>
                          <p className="text-sm font-medium">New message from property manager</p>
                          <p className="text-xs text-muted-foreground">Regarding your maintenance request</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              
              <button 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </header>
        
        <div className="p-6">
          {activeTab === 'overview' && <TenantOverview />}
          {activeTab === 'payments' && <TenantPayments />}
          {activeTab === 'messages' && <TenantMessages />}
          {activeTab === 'water' && <TenantWaterUsage />}
          {activeTab === 'garbage' && <TenantGarbageServices />}
          {activeTab === 'history' && <TenantHistory />}
        </div>
      </div>
    </div>
  );
};

// Tenant Sidebar Component
const TenantSidebar = ({ onLogout, onNavChange, activeTab }: {
  onLogout: () => void;
  onNavChange: (tab: string) => void;
  activeTab: string;
}) => {
  const navItems = [
    { id: 'overview', label: 'Dashboard', icon: <Home size={18} /> },
    { id: 'payments', label: 'Rent Payments', icon: <CreditCard size={18} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={18} /> },
    { id: 'water', label: 'Water Usage', icon: <Droplet size={18} /> },
    { id: 'garbage', label: 'Garbage Services', icon: <Trash2 size={18} /> },
    { id: 'history', label: 'Payment History', icon: <History size={18} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          <span className="text-kenya-red">Build</span>
          <span className="text-kenya-green">Wise</span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Tenant Portal</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onNavChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  activeTab === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-secondary/80'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
};

// Tenant Overview Tab
const TenantOverview = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Rent</p>
          <p className="text-2xl font-bold">KES 25,000</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Due: July 1, 2023</span>
            <Badge variant={new Date() > new Date('2023-07-01') ? 'destructive' : 'outline'}>
              {new Date() > new Date('2023-07-01') ? 'Overdue' : '3 days left'}
            </Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Water Bill</p>
          <p className="text-2xl font-bold">KES 1,200</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Usage: 6 units</span>
            <Badge variant="outline">Current Month</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Garbage Fee</p>
          <p className="text-2xl font-bold">KES 500</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>Monthly Fee</span>
            <Badge variant="success" className="bg-green-100 text-green-800">Paid</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Unread Messages</p>
          <p className="text-2xl font-bold">2</p>
          <div className="mt-2 flex justify-between items-center text-sm">
            <span>From: Property Manager</span>
            <button className="text-primary hover:underline flex items-center gap-1">
              View <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="font-medium mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <CreditCard size={24} />
              <span>Pay Rent</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <Upload size={24} />
              <span>Upload Payment</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <MessageSquare size={24} />
              <span>New Message</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 justify-center h-auto py-6 flex-col border-dashed"
            >
              <FileText size={24} />
              <span>View Receipt</span>
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Recent Activity</h3>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                <CheckCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Rent payment confirmed</p>
                <p className="text-xs text-muted-foreground">June 1, 2023 • KES 25,000</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                <Droplet size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Water bill generated</p>
                <p className="text-xs text-muted-foreground">June 15, 2023 • KES 1,200</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                <Bell size={16} />
              </div>
              <div>
                <p className="text-sm font-medium">Rent reminder sent</p>
                <p className="text-xs text-muted-foreground">June 28, 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tenant Payments Tab
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

// Tenant Messages Tab
const TenantMessages = () => {
  const messages = [
    {
      id: 1,
      sender: 'Property Manager',
      subject: 'Rent Reminder',
      content: 'This is a friendly reminder that your rent payment of KES 25,000 is due on July 1st. Please ensure timely payment to avoid late fees.',
      date: 'June 28, 2023',
      read: false
    },
    {
      id: 2,
      sender: 'Maintenance Team',
      subject: 'Scheduled Water Maintenance',
      content: 'Please be informed that there will be scheduled water maintenance on July 5th from 9 AM to 11 AM. We recommend storing water for use during this period.',
      date: 'June 25, 2023',
      read: false
    },
    {
      id: 3,
      sender: 'Property Manager',
      subject: 'June Payment Confirmed',
      content: 'Thank you for your June rent payment of KES 25,000. This email serves as confirmation that your payment has been received and processed.',
      date: 'June 1, 2023',
      read: true
    }
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Inbox</h3>
          <Button variant="outline" size="sm" className="text-xs">Compose Message</Button>
        </div>
        
        <div className="divide-y">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 hover:bg-secondary/10 cursor-pointer ${!message.read ? 'bg-blue-50' : ''}`}>
              <div className="flex justify-between">
                <p className={`font-medium ${!message.read ? 'font-semibold' : ''}`}>{message.subject}</p>
                <span className="text-xs text-muted-foreground">{message.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">From: {message.sender}</p>
              <p className="text-sm mt-2 line-clamp-2">{message.content}</p>
              {!message.read && (
                <Badge variant="secondary" className="mt-2">Unread</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tenant Water Usage Tab
const TenantWaterUsage = () => {
  const waterData = [
    { month: 'January', units: 5, amount: 1000 },
    { month: 'February', units: 5.5, amount: 1100 },
    { month: 'March', units: 4.8, amount: 960 },
    { month: 'April', units: 5.2, amount: 1040 },
    { month: 'May', units: 5.8, amount: 1160 },
    { month: 'June', units: 6, amount: 1200 }
  ];
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Water Usage</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Month Usage</p>
          <p className="text-2xl font-bold">6 Units</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>June 2023</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Current Bill Amount</p>
          <p className="text-2xl font-bold">KES 1,200</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Due with July Rent</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Average Monthly Usage</p>
          <p className="text-2xl font-bold">5.4 Units</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Last 6 Months</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="font-medium mb-4">Monthly Water Consumption</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {waterData.map((data, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-blue-400 rounded-t-sm"
                style={{ height: `${(data.units / 6) * 180}px` }}
              ></div>
              <p className="text-xs font-medium mt-2">{data.month}</p>
              <p className="text-xs text-muted-foreground">{data.units} units</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Water Usage History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Month</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Units Used</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount (KES)</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {waterData.map((data, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-sm">{data.month} 2023</td>
                  <td className="py-3 px-4 text-sm">{data.units}</td>
                  <td className="py-3 px-4 text-sm">{data.amount}</td>
                  <td className="py-3 px-4">
                    <Badge variant="success" className="bg-green-100 text-green-800">
                      Paid
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Tenant Garbage Services Tab
const TenantGarbageServices = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Garbage Services</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Monthly Fee</p>
          <p className="text-2xl font-bold">KES 500</p>
          <div className="mt-2 text-sm">
            <Badge variant="success" className="bg-green-100 text-green-800">Paid for June</Badge>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Collection Schedule</p>
          <p className="text-2xl font-bold">Tuesday, Friday</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Between 8 AM - 11 AM</span>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-sm text-muted-foreground">Next Collection</p>
          <p className="text-2xl font-bold">July 4, 2023</p>
          <div className="mt-2 text-sm text-muted-foreground">
            <span>Tuesday</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <h3 className="font-medium mb-4">Service Details</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 mt-1">
              <Trash2 size={16} />
            </div>
            <div>
              <p className="font-medium">Regular Waste Collection</p>
              <p className="text-sm text-muted-foreground">
                Household waste collected twice weekly. Please ensure trash is properly bagged and placed
                in the designated collection area by 8 AM on collection days.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 mt-1">
              <Calendar size={16} />
            </div>
            <div>
              <p className="font-medium">Recycling Program</p>
              <p className="text-sm text-muted-foreground">
                Recycling materials (paper, plastic, glass) are collected every Friday. 
                Please sort your recyclables according to the guidelines provided.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 mt-1">
              <AlertCircle size={16} />
            </div>
            <div>
              <p className="font-medium">Special Waste Disposal</p>
              <p className="text-sm text-muted-foreground">
                For large items or hazardous waste, please contact property management to arrange special disposal.
                Additional fees may apply.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="font-medium mb-4">Payment History</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Month</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount (KES)</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Payment Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">June 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">June 3, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">May 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">May 5, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">April 2023</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">April 2, 2023</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">Paid</Badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Tenant Payment History Tab
const TenantHistory = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Payment History</h2>
      
      <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-medium">Recent Transactions</h3>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs">
              Filter
            </Button>
            <Button variant="outline" size="sm" className="text-xs">
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 text-sm font-medium">Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Description</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Amount (KES)</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Method</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium">Receipt</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">June 1, 2023</td>
                <td className="py-3 px-4 text-sm">June 2023 Rent</td>
                <td className="py-3 px-4 text-sm">25,000</td>
                <td className="py-3 px-4 text-sm">M-Pesa</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">June 1, 2023</td>
                <td className="py-3 px-4 text-sm">June 2023 Water Bill</td>
                <td className="py-3 px-4 text-sm">1,200</td>
                <td className="py-3 px-4 text-sm">M-Pesa</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">June 3, 2023</td>
                <td className="py-3 px-4 text-sm">June 2023 Garbage Fee</td>
                <td className="py-3 px-4 text-sm">500</td>
                <td className="py-3 px-4 text-sm">M-Pesa</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">May 2, 2023</td>
                <td className="py-3 px-4 text-sm">May 2023 Rent</td>
                <td className="py-3 px-4 text-sm">25,000</td>
                <td className="py-3 px-4 text-sm">Bank Transfer</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 text-sm">May 2, 2023</td>
                <td className="py-3 px-4 text-sm">May 2023 Water Bill</td>
                <td className="py-3 px-4 text-sm">1,160</td>
                <td className="py-3 px-4 text-sm">Bank Transfer</td>
                <td className="py-3 px-4">
                  <Badge variant="success" className="bg-green-100 text-green-800">
                    Completed
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
