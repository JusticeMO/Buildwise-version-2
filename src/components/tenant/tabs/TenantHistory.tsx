
import React from 'react';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/shared/Button';

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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
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
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
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

export default TenantHistory;
