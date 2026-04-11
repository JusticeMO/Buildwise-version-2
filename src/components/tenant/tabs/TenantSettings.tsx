
import React from 'react';
import { User, Bell, Lock, Palette } from 'lucide-react';
import { toast } from 'sonner';

const TenantSettings = () => {
  const sections = [
    { icon: <User size={20} />, title: 'Profile Information', description: 'Update your name, phone number and email address' },
    { icon: <Bell size={20} />, title: 'Notification Preferences', description: 'Choose which notifications you want to receive' },
    { icon: <Lock size={20} />, title: 'Security & Password', description: 'Change your password and manage login sessions' },
    { icon: <Palette size={20} />, title: 'Appearance', description: 'Customize theme and display preferences' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground text-sm">Manage your account preferences</p>
      </div>

      <div className="space-y-3">
        {sections.map((section, idx) => (
          <button
            key={idx}
            onClick={() => toast.info(`${section.title} settings coming soon`)}
            className="w-full bg-white border border-border rounded-lg p-4 flex items-center gap-4 hover:shadow-sm transition-shadow text-left"
          >
            <div className="p-2 rounded-lg bg-secondary/30 text-primary">{section.icon}</div>
            <div>
              <p className="font-medium text-sm">{section.title}</p>
              <p className="text-xs text-muted-foreground">{section.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TenantSettings;
