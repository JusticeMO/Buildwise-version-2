
import React from 'react';
import { CreditCard, Shield, MessageSquare, BarChart, Users, Home, DollarSign, PieChart } from 'lucide-react';

const DashboardPreview = () => {
  return (
    <div className="mb-16 flex flex-col md:flex-row gap-8 items-center">
      <div className="md:w-1/2">
        <h3 className="text-2xl font-bold mb-4">Powerful Dashboard at Your Fingertips</h3>
        <p className="text-muted-foreground mb-6">
          Say goodbye to manual spreadsheets and missed payments. e-Caretaker automates every aspect of property management, from rent collection to maintenance tracking. With real-time insights and a tenant engagement hub, you'll build stronger relationships while saving time and resources.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <CreditCard size={16} className="text-primary" />
            <span className="text-sm font-medium">Encrypted Payments</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <Shield size={16} className="text-primary" />
            <span className="text-sm font-medium">Data Security</span>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full">
            <MessageSquare size={16} className="text-primary" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 bg-gray-100 rounded-lg p-4 shadow-md">
        <div className="aspect-video bg-white rounded border overflow-hidden relative">
          {/* Dashboard Preview */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-3 p-3">
            <div className="bg-blue-50 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <DollarSign size={16} />
                </div>
                <div className="text-xs font-medium text-blue-600">+12% ↑</div>
              </div>
              <h4 className="text-sm font-medium">Revenue</h4>
              <p className="text-lg font-bold">KES 320,580</p>
            </div>
            <div className="bg-green-50 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Users size={16} />
                </div>
                <div className="text-xs font-medium text-green-600">+5% ↑</div>
              </div>
              <h4 className="text-sm font-medium">Tenants</h4>
              <p className="text-lg font-bold">48</p>
            </div>
            <div className="bg-amber-50 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <Home size={16} />
                </div>
                <div className="text-xs font-medium text-amber-600">100%</div>
              </div>
              <h4 className="text-sm font-medium">Occupancy</h4>
              <p className="text-lg font-bold">100%</p>
            </div>
            <div className="bg-purple-50 rounded-md p-3 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <BarChart size={16} />
                </div>
                <div className="text-xs font-medium text-purple-600">Active</div>
              </div>
              <h4 className="text-sm font-medium">Reports</h4>
              <p className="text-lg font-bold">6 New</p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-slate-50 border-t p-2 flex justify-between items-center">
            <div className="text-xs text-slate-500">Last updated: 2 hours ago</div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-slate-600">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
