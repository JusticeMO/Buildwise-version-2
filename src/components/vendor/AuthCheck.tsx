
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { SignIn } from '@clerk/clerk-react';

const AuthCheck: React.FC = () => {
  return (
    <div className="mb-12 max-w-md mx-auto border rounded-xl overflow-hidden shadow-sm">
      <div className="bg-accent/30 p-4 border-b">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-primary shrink-0 mt-1" />
          <div>
            <h3 className="font-medium text-lg">Create an account to apply</h3>
            <p className="text-muted-foreground text-sm">
              Sign up or log in to BuildWise to join as a vendor or contractor.
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <SignIn redirectUrl="/vendor-application" />
      </div>
    </div>
  );
};

export default AuthCheck;
