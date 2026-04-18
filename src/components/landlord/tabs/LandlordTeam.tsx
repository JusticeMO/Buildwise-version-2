import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Users, 
  UserPlus, 
  Mail, 
  Shield, 
  ShieldCheck, 
  Trash2, 
  MoreVertical, 
  CheckCircle2, 
  Plus, 
  Settings2,
  Lock,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  getTeamMembers, 
  inviteTeamMember, 
  removeTeamMember, 
  TeamMember, 
  PermissionSet, 
  UserRole,
  getCustomRoles,
  addCustomRole,
  CustomRole
} from '@/data/sharedMockData';

const PermissionToggle = ({ label, value, onChange }: { label: string, value: boolean, onChange: (val: boolean) => void }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
    <span className="text-xs font-semibold text-slate-700">{label}</span>
    <Button 
      variant={value ? "default" : "outline"} 
      size="sm" 
      onClick={() => onChange(!value)}
      className="h-7 text-[10px] px-3 transition-all"
    >
      {value ? "ENABLED" : "RESTRICTED"}
    </Button>
  </div>
);

const LandlordTeam = () => {
  const [activeView, setActiveView] = useState<'members' | 'roles'>('members');
  const [members, setMembers] = useState<TeamMember[]>(getTeamMembers());
  const [roles, setRoles] = useState<CustomRole[]>(getCustomRoles());
  
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: 'role-manager'
  });

  const [isNewRoleOpen, setIsNewRoleOpen] = useState(false);
  const [newRoleData, setNewRoleData] = useState({
    name: '',
    description: '',
    permissions: {
      canViewOverview: true,
      canManageProperties: false,
      canManageTenants: false,
      canManageMaintenance: true,
      canManagePayments: false,
      canManageMessages: true,
      canViewReports: false,
      canManageTeam: false,
      canManageUtilities: false,
    }
  });

  const handleInvite = () => {
    if (!inviteData.name || !inviteData.email) {
      toast.error("Please provide both name and email.");
      return;
    }

    const selectedRoleObj = roles.find(r => r.id === inviteData.role) || roles[1];
    
    inviteTeamMember({
      name: inviteData.name,
      email: inviteData.email,
      role: selectedRoleObj.name.toLowerCase() as UserRole,
      permissions: { ...selectedRoleObj.permissions }
    });

    setMembers(getTeamMembers());
    setIsInviteOpen(false);
    toast.success(`Invite sent to ${inviteData.email}`);
    setInviteData({ name: '', email: '', role: 'role-manager' });
  };

  const handleCreateRole = () => {
    if (!newRoleData.name) {
      toast.error("Role name is required.");
      return;
    }

    addCustomRole({
      name: newRoleData.name,
      description: newRoleData.description,
      permissions: newRoleData.permissions
    });

    setRoles(getCustomRoles());
    setIsNewRoleOpen(false);
    toast.success(`New role "${newRoleData.name}" created.`);
    setNewRoleData({
      name: '',
      description: '',
      permissions: {
        canViewOverview: true,
        canManageProperties: false,
        canManageTenants: false,
        canManageMaintenance: true,
        canManagePayments: false,
        canManageMessages: true,
        canViewReports: false,
        canManageTeam: false,
        canManageUtilities: false,
      }
    });
  };

  const handleRemoveMember = (id: string) => {
    removeTeamMember(id);
    setMembers(getTeamMembers());
    toast.success("Team member access removed.");
  };

  return (
    <div className="space-y-6 animate-fade-in mb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage staff access and define custom organizational roles.</p>
        </div>
        <div className="flex gap-2 p-1 bg-secondary/30 rounded-lg">
          <Button 
            variant={activeView === 'members' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setActiveView('members')}
            className={`rounded-md h-8 text-xs ${activeView !== 'members' ? 'text-muted-foreground' : ''}`}
          >
            Members
          </Button>
          <Button 
            variant={activeView === 'roles' ? 'default' : 'ghost'} 
            size="sm" 
            onClick={() => setActiveView('roles')}
            className={`rounded-md h-8 text-xs ${activeView !== 'roles' ? 'text-muted-foreground' : ''}`}
          >
            Roles
          </Button>
        </div>
      </div>

      {activeView === 'members' ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold text-sm">Authorized Personnel</h3>
            <Button onClick={() => setIsInviteOpen(true)} size="sm" className="flex items-center gap-2">
              <UserPlus size={16} /> Send Invite
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {members.map((member) => (
              <Card key={member.id} className="p-4 bg-white border-border hover:border-primary/30 transition-all flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold text-slate-700">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{member.name}</h4>
                      <Badge variant="secondary" className="text-[10px] uppercase">{member.role}</Badge>
                      {member.status === 'pending' && <Badge className="bg-amber-100 text-amber-700 text-[9px] hover:bg-amber-100 uppercase">Invited</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{member.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden sm:block text-right">
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Permits</p>
                    <p className="text-xs font-medium">{Object.values(member.permissions).filter(Boolean).length} Active</p>
                  </div>
                  
                  {member.role !== 'owner' && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600" onClick={() => handleRemoveMember(member.id)}>
                        <Trash2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <MoreVertical size={16} />
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-border shadow-sm">
            <h3 className="font-semibold text-sm">Defined Role Protocols</h3>
            <Sheet open={isNewRoleOpen} onOpenChange={setIsNewRoleOpen}>
              <SheetTrigger asChild>
                <Button size="sm" className="flex items-center gap-2">
                  <Plus size={16} /> Add Custom Role
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-white">
                <SheetHeader>
                  <SheetTitle>Create Custom Role</SheetTitle>
                  <SheetDescription>
                    Define permissions for a new team role.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="space-y-4 py-6">
                  <div className="space-y-2">
                    <Label className="text-xs">Role Name</Label>
                    <Input 
                      placeholder="e.g. Inspector" 
                      value={newRoleData.name} 
                      onChange={(e) => setNewRoleData({...newRoleData, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Description</Label>
                    <textarea 
                      className="w-full h-20 p-2 border border-input rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="Brief role scope..."
                      value={newRoleData.description}
                      onChange={(e) => setNewRoleData({...newRoleData, description: e.target.value})}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-bold">Permission Set</Label>
                    <div className="space-y-2">
                      <PermissionToggle 
                        label="View Analytics" 
                        value={newRoleData.permissions.canViewOverview} 
                        onChange={(v) => setNewRoleData({...newRoleData, permissions: {...newRoleData.permissions, canViewOverview: v}})} 
                      />
                      <PermissionToggle 
                        label="Manage Properties" 
                        value={newRoleData.permissions.canManageProperties} 
                        onChange={(v) => setNewRoleData({...newRoleData, permissions: {...newRoleData.permissions, canManageProperties: v}})} 
                      />
                      <PermissionToggle 
                        label="Manage Tenants" 
                        value={newRoleData.permissions.canManageTenants} 
                        onChange={(v) => setNewRoleData({...newRoleData, permissions: {...newRoleData.permissions, canManageTenants: v}})} 
                      />
                      <PermissionToggle 
                        label="Manage Maintenance" 
                        value={newRoleData.permissions.canManageMaintenance} 
                        onChange={(v) => setNewRoleData({...newRoleData, permissions: {...newRoleData.permissions, canManageMaintenance: v}})} 
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button onClick={handleCreateRole} className="w-full">Create Role</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <Card key={role.id} className="p-5 bg-white border-border hover:border-primary/20 transition-all relative group">
                {role.isDefault && <Badge variant="outline" className="absolute top-2 right-2 text-[8px] uppercase">Default</Badge>}
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-8 w-8 rounded bg-primary/10 text-primary flex items-center justify-center">
                    <Shield size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm">{role.name}</h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">{role.description}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-auto">
                  {Object.entries(role.permissions).slice(0, 4).map(([k, v]) => (
                    v && <Badge key={k} variant="secondary" className="text-[9px] lowercase bg-slate-50 text-slate-500 font-normal">
                      {k.replace('can', '')}
                    </Badge>
                  ))}
                  {Object.values(role.permissions).filter(Boolean).length > 4 && 
                    <span className="text-[9px] text-muted-foreground ml-1">+{Object.values(role.permissions).filter(Boolean).length - 4} more</span>
                  }
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Assign a role and send an invitation link.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-xs">Full Name</Label>
              <Input 
                placeholder="Team member name" 
                value={inviteData.name} 
                onChange={(e) => setInviteData({...inviteData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Email Address</Label>
              <Input 
                type="email" 
                placeholder="Email to send invite" 
                value={inviteData.email} 
                onChange={(e) => setInviteData({...inviteData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Assigned Role</Label>
              <Select value={inviteData.role} onValueChange={(val) => setInviteData({...inviteData, role: val})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-xl">
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button onClick={handleInvite}>Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LandlordTeam;
