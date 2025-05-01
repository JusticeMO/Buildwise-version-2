
import React from 'react';
import { Bell, CreditCard, PieChart, FileText, Calendar, ChevronRight, Building2, CheckCircle, Clock, XCircle, BarChart3, Wallet } from 'lucide-react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import Button from '@/components/shared/Button';
import FeatureListItem from './FeatureListItem';
import { rentFeatures } from '@/data/rentFeatures';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface RentManagementTabProps {
  onOpenDialog: () => void;
}

const RentManagementTab = ({ onOpenDialog }: RentManagementTabProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h3 className="text-2xl font-bold mb-4">Streamlined Rent Collection & Management</h3>
        <p className="text-muted-foreground mb-6">
          Our comprehensive rent management system eliminates payment headaches with automated reminders, flexible payment options, and real-time tracking—all accessible from any device.
        </p>
        
        <ul className="space-y-4 mb-6">
          {rentFeatures.map((feature, idx) => (
            <FeatureListItem 
              key={idx} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </ul>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="mt-4" onClick={onOpenDialog}>
              Explore Rent Management
              <ChevronRight size={16} />
            </Button>
          </DialogTrigger>
        </Dialog>
      </div>
      
      <div className="bg-muted rounded-lg p-6 relative overflow-hidden">
        {/* Dashboard-style UI based on uploaded images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Card className="bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-md bg-blue-50">
                <Building2 size={18} className="text-blue-600" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">Summary</span>
            </div>
            <h4 className="font-bold text-xl">24</h4>
            <p className="text-sm text-muted-foreground">Total Units</p>
          </Card>
          
          <Card className="bg-white p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-md bg-green-50">
                <CheckCircle size={18} className="text-green-600" />
              </div>
              <span className="text-xs font-medium text-emerald-600">20/24</span>
            </div>
            <h4 className="font-bold text-xl">83%</h4>
            <p className="text-sm text-muted-foreground">Paid on Time</p>
          </Card>
        </div>
        
        <Card className="bg-white p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">Payment Status</h4>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Paid</span>
                <span className="font-medium text-emerald-600">20</span>
              </div>
              <Progress value={83} className="h-2 bg-secondary" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pending</span>
                <span className="font-medium text-amber-600">3</span>
              </div>
              <Progress value={12.5} className="h-2 bg-secondary" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Overdue</span>
                <span className="font-medium text-red-600">1</span>
              </div>
              <Progress value={4.5} className="h-2 bg-secondary" />
            </div>
          </div>
        </Card>
        
        <Card className="bg-white p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Recent Payments</h4>
            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
              View All
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm py-1 border-b">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-green-50 mr-2">
                  <CheckCircle size={14} className="text-green-600" />
                </div>
                <span>Unit 305</span>
              </div>
              <div className="font-medium">KES 25,000</div>
            </div>
            
            <div className="flex items-center justify-between text-sm py-1 border-b">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-green-50 mr-2">
                  <CheckCircle size={14} className="text-green-600" />
                </div>
                <span>Unit 204</span>
              </div>
              <div className="font-medium">KES 18,000</div>
            </div>
            
            <div className="flex items-center justify-between text-sm py-1">
              <div className="flex items-center">
                <div className="p-1 rounded-full bg-amber-50 mr-2">
                  <Clock size={14} className="text-amber-600" />
                </div>
                <span>Unit 401</span>
              </div>
              <div className="font-medium">KES 30,000</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RentManagementTab;
