
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Users, UserPlus, Mail, Shield, ShieldCheck, ShieldAlert, MoreVertical, Trash2, CheckSquare, Square, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { getTeamMembers, inviteTeamMember, removeTeamMember, TeamMember, PermissionSet, UserRole } from '@/data/sharedMockData';

const LandlordTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>(getTeamMembers());
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteData, setInviteData] = useState({
    name: '',
    email: '',
    role: 'manager' as UserRole
  });
  const [permissions, setPermissions] = useState<PermissionSet>({
    canViewOverview: true,
    canManageProperties: false,
    canManageTenants: false,
    canManageMaintenance: true,
    canManagePayments: false,
    canManageMessages: true,
    canViewReports: false,
    canManageTeam: false,
  });

  // Check if current user (simulated as Owner) has permission to manage team
  // In a real app, this would come from a useAuth hook
  const currentUserPermissions = { canManageTeam: true }; 

  const handleInvite = () => {
    if (!inviteData.name || !inviteData.email) {
      toast.error("Please provide both name and email.");
      return;
    }

    inviteTeamMember({
      name: inviteData.name,
      email: inviteData.email,
      role: inviteData.role,
      permissions: { ...permissions }
    });

    setMembers(getTeamMembers());
    setIsInviteOpen(false);
    toast.success(`Invite sent to ${inviteData.email}`);
    setInviteData({ name: '', email: '', role: 'manager' });
  };

  const handleRemove = (id: string) => {
    removeTeamMember(id);
    setMembers(getTeamMembers());
    toast.success("Team member removed.");
  };

  const togglePermission = (key: keyof PermissionSet) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'owner': return <Badge className="bg-purple-100 text-purple-700 border-none">Owner</Badge>;
      case 'manager': return <Badge className="bg-blue-100 text-blue-700 border-none">Manager</Badge>;
      case 'maintenance': return <Badge className="bg-amber-100 text-amber-700 border-none">Maintenance</Badge>;
      default: return <Badge className="bg-slate-100 text-slate-700 border-none capitalize">{role}</Badge>;
    }
  };

  const PermissionItem = ({ label, value, id }: { label: string, value: boolean, id: keyof PermissionSet }) => (
    <div 
      className={`flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${value ? 'border-primary/50 bg-primary/5' : 'border-border bg-white'}`}
      onClick={() => togglePermission(id)}
    >
      <div className="flex items-center gap-3">
        {value ? <CheckSquare className="text-primary" size={18} /> : <Square className="text-muted-foreground" size={18} />}
        <span className={`text-sm font-medium ${value ? 'text-primary' : 'text-foreground'}`}>{label}</span>
      </div>
      {id === 'canManageTeam' && value && <ShieldCheck className="text-amber-500" size={14} title="Administrative Privileges" />}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Team Management</h2>
          <p className="text-sm text-muted-foreground">Invite managers and staff to help manage your properties with granular access control.</p>
        </div>
        <Button 
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow-lg shadow-primary/20"
          onClick={() => setIsInviteOpen(true)}
          disabled={!currentUserPermissions.canManageTeam}
        >
          <UserPlus size={18} /> Invite Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          {members.map((member) => (
            <Card key={member.id} className="p-5 hover:shadow-md transition-all border-border/60 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center text-primary font-bold text-lg">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base">{member.name}</h4>
                      {getRoleBadge(member.role)}
                      {member.status === 'pending' && <Badge variant="outline" className="text-[10px] uppercase tracking-tighter text-amber-600 border-amber-200">Pending Invite</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Mail size={12} /> {member.email}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 bg-secondary/30 rounded-full border border-border">
                    <Shield size={12} className="text-muted-foreground" />
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">
                      {Object.values(member.permissions).filter(Boolean).length} Permissions
                    </span>
                  </div>
                  
                  {currentUserPermissions.canManageTeam && member.role !== 'owner' && (
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-red-600 hover:bg-red-50" onClick={() => handleRemove(member.id)}>
                        <Trash2 size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground">
                        <MoreVertical size={18} />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                {Object.entries(member.permissions).map(([key, value]) => {
                  if (!value) return null;
                  return (
                    <div key={key} className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-medium">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {key.replace('can', '').replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
              <ShieldAlert className="text-amber-400" size={18} />
              Security Logic
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-amber-400 mb-1">Hierarchical RBAC</p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Sub-users granted the <span className="text-white font-bold">"Manage Team"</span> permission inherit the ability to invite and restrict other sub-users.
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs font-bold text-blue-400 mb-1">Email Invitations</p>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Invited members receive a unique institutional link. Access is locked to the specific email address provided.
                </p>
              </div>
            </div>
          </Card>

          <div className="bg-card border border-border p-5 rounded-xl text-center">
            <Users size={32} className="mx-auto text-primary mb-3 opacity-40" />
            <h4 className="font-bold text-sm uppercase tracking-wider mb-1">Audit Log</h4>
            <p className="text-[11px] text-muted-foreground italic">All team changes are permanently recorded in the system audit trail.</p>
            <Button variant="outline" size="sm" className="mt-4 w-full text-[11px] h-8" onClick={() => toast.info('System audit log coming in next version')}>
              View Team History
            </Button>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="text-primary" />
              Invite Team Member
            </DialogTitle>
            <DialogDescription>
              Assign a role and granular permissions for the new sub-user.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">Full Name</Label>
                <Input 
                  placeholder="e.g. Robert Mwangi" 
                  value={inviteData.name}
                  onChange={(e) => setInviteData({ ...inviteData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">Email Address</Label>
                <Input 
                  type="email" 
                  placeholder="robert@example.com" 
                  value={inviteData.email}
                  onChange={(e) => setInviteData({ ...inviteData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-wider">Default Role</Label>
                <Select 
                  value={inviteData.role} 
                  onValueChange={(val: any) => setInviteData({ ...inviteData, role: val })}
                >
                  <SelectTrigger className="mt-1.5 h-10">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager">Property Manager</SelectItem>
                    <SelectItem value="maintenance">Maintenance Staff</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="security">Security Officer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase tracking-wider">Access Checklist</Label>
              <div className="grid grid-cols-1 gap-2">
                <PermissionItem label="Full Overview" id="canViewOverview" value={permissions.canViewOverview} />
                <PermissionItem label="Property Mgmt" id="canManageProperties" value={permissions.canManageProperties} />
                <PermissionItem label="Tenant Mgmt" id="canManageTenants" value={permissions.canManageTenants} />
                <PermissionItem label="Maintenance" id="canManageMaintenance" value={permissions.canManageMaintenance} />
                <PermissionItem label="Payment Mgmt" id="canManagePayments" value={permissions.canManagePayments} />
                <PermissionItem label="Messages" id="canManageMessages" value={permissions.canManageMessages} />
                <PermissionItem label="Manage Team" id="canManageTeam" value={permissions.canManageTeam} />
              </div>
            </div>
          </div>

          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleInvite}>
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Select = ({ value, onValueChange, children }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div 
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="capitalize">{value || "Select role"}</span>
        <ChevronRight className={`transition-transform ${open ? 'rotate-90' : ''}`} size={16} />
      </div>
      {open && (
        <div className="absolute top-11 z-50 w-full rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in zoom-in-95 overflow-hidden">
          {children}
        </div>
      )}
    </div>
  );
};

const SelectTrigger = ({ className, children }: any) => <div className={className}>{children}</div>;
const SelectValue = ({ placeholder, children }: any) => <span>{children || placeholder}</span>;
const SelectContent = ({ children }: any) => <div className="p-1">{children}</div>;
const SelectItem = ({ value, children, onClick }: any) => (
  <div 
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    onClick={() => {
      // Note: This is a simplified mockup component
      // In a real app we would use shadcn/ui Select
    }}
  >
    {children}
  </div>
);

export default LandlordTeam;
