
// ============================================================================
// SHARED MOCK DATA — Single source of truth for Tenant ↔ Landlord state
// ============================================================================

// ─── Service Provider Directory ──────────────────────────────────────────────

export interface ServiceProvider {
  id: string;
  name: string;
  category: 'plumber' | 'electrician' | 'painter' | 'carpenter' | 'cleaner' | 'locksmith' | 'hvac' | 'general';
  phone: string;
  email: string;
  location: string;
  rating: number; // 1-5
  completedJobs: number;
  availability: 'available' | 'busy' | 'offline';
  hourlyRate: number; // in KES
  specialties: string[];
}

export const serviceProviders: ServiceProvider[] = [
  {
    id: 'sp-1', name: 'David Kamau', category: 'plumber',
    phone: '0712 345 678', email: 'david.k@email.com', location: 'Westlands',
    rating: 4.8, completedJobs: 142, availability: 'available',
    hourlyRate: 1500, specialties: ['Pipe repair', 'Water heater', 'Drain cleaning']
  },
  {
    id: 'sp-2', name: 'Peter Otieno', category: 'electrician',
    phone: '0723 456 789', email: 'peter.o@email.com', location: 'Kilimani',
    rating: 4.6, completedJobs: 98, availability: 'available',
    hourlyRate: 2000, specialties: ['Wiring', 'Circuit breakers', 'Solar installation']
  },
  {
    id: 'sp-3', name: 'James Mwangi', category: 'plumber',
    phone: '0734 567 890', email: 'james.m@email.com', location: 'Parklands',
    rating: 4.3, completedJobs: 67, availability: 'busy',
    hourlyRate: 1200, specialties: ['Toilet repair', 'Pipe installation', 'Valve replacement']
  },
  {
    id: 'sp-4', name: 'Grace Wanjiku', category: 'cleaner',
    phone: '0745 678 901', email: 'grace.w@email.com', location: 'Westlands',
    rating: 4.9, completedJobs: 210, availability: 'available',
    hourlyRate: 800, specialties: ['Deep cleaning', 'Move-in/out cleaning', 'Carpet cleaning']
  },
  {
    id: 'sp-5', name: 'Samuel Odera', category: 'carpenter',
    phone: '0756 789 012', email: 'samuel.o@email.com', location: 'Karen',
    rating: 4.5, completedJobs: 55, availability: 'available',
    hourlyRate: 1800, specialties: ['Door repair', 'Cabinet installation', 'Furniture assembly']
  },
  {
    id: 'sp-6', name: 'Nancy Akinyi', category: 'painter',
    phone: '0767 890 123', email: 'nancy.a@email.com', location: 'Lavington',
    rating: 4.7, completedJobs: 88, availability: 'available',
    hourlyRate: 1000, specialties: ['Interior painting', 'Exterior painting', 'Wall texturing']
  },
  {
    id: 'sp-7', name: 'John Njoroge', category: 'locksmith',
    phone: '0778 901 234', email: 'john.n@email.com', location: 'Westlands',
    rating: 4.4, completedJobs: 120, availability: 'available',
    hourlyRate: 1500, specialties: ['Lock replacement', 'Key duplication', 'Smart lock install']
  },
  {
    id: 'sp-8', name: 'Philip Wafula', category: 'hvac',
    phone: '0789 012 345', email: 'philip.w@email.com', location: 'Kilimani',
    rating: 4.2, completedJobs: 45, availability: 'busy',
    hourlyRate: 2500, specialties: ['AC repair', 'AC installation', 'Ventilation']
  },
  {
    id: 'sp-9', name: 'Martin Kibet', category: 'electrician',
    phone: '0790 123 456', email: 'martin.k@email.com', location: 'Westlands',
    rating: 4.8, completedJobs: 175, availability: 'available',
    hourlyRate: 1800, specialties: ['Emergency repairs', 'Panel upgrades', 'Lighting']
  },
  {
    id: 'sp-10', name: 'Kevin Onyango', category: 'general',
    phone: '0701 234 567', email: 'kevin.o@email.com', location: 'Parklands',
    rating: 4.1, completedJobs: 30, availability: 'available',
    hourlyRate: 1000, specialties: ['Handyman', 'Minor repairs', 'Assembly']
  },
];

// ─── Team & RBAC Management ──────────────────────────────────────────────────

export type UserRole = 'owner' | 'manager' | 'maintenance' | 'accountant' | 'security';

export interface PermissionSet {
  canViewOverview: boolean;
  canManageProperties: boolean;
  canManageTenants: boolean;
  canManageMaintenance: boolean;
  canManagePayments: boolean;
  canManageMessages: boolean;
  canViewReports: boolean;
  canManageTeam: boolean;
  canManageUtilities: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: PermissionSet;
  status: 'active' | 'pending';
  joinedAt?: string;
}

let _teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'James Smith',
    email: 'james@jengasafe.com',
    role: 'owner',
    status: 'active',
    joinedAt: '2023-01-01',
    permissions: {
      canViewOverview: true,
      canManageProperties: true,
      canManageTenants: true,
      canManageMaintenance: true,
      canManagePayments: true,
      canManageMessages: true,
      canViewReports: true,
      canManageTeam: true,
      canManageUtilities: true,
    }
  },
  {
    id: 'team-2',
    name: 'Sarah Wilson',
    email: 'sarah@jengasafe.com',
    role: 'manager',
    status: 'active',
    joinedAt: '2023-03-15',
    permissions: {
      canViewOverview: true,
      canManageProperties: true,
      canManageTenants: true,
      canManageMaintenance: true,
      canManagePayments: true,
      canManageMessages: true,
      canViewReports: true,
      canManageTeam: false,
      canManageUtilities: true,
    }
  },
  {
    id: 'team-3',
    name: 'Tom Baker',
    email: 'tom@jengasafe.com',
    role: 'maintenance',
    status: 'active',
    joinedAt: '2023-05-20',
    permissions: {
      canViewOverview: false,
      canManageProperties: false,
      canManageTenants: false,
      canManageMaintenance: true,
      canManagePayments: false,
      canManageMessages: true,
      canViewReports: false,
      canManageTeam: false,
      canManageUtilities: false,
    }
  }
];

export const getTeamMembers = () => [..._teamMembers];

export const inviteTeamMember = (member: Omit<TeamMember, 'id' | 'status'>) => {
  const newMember: TeamMember = {
    ...member,
    id: `team-${Date.now()}`,
    status: 'pending',
  };
  _teamMembers = [..._teamMembers, newMember];
  return newMember;
};

export const updateMemberPermissions = (memberId: string, permissions: PermissionSet) => {
  _teamMembers = _teamMembers.map(m => 
    m.id === memberId ? { ...m, permissions } : m
  );
};

export const removeTeamMember = (memberId: string) => {
  _teamMembers = _teamMembers.filter(m => m.id !== memberId);
};

// ─── Tenant Marketplace Access ───────────────────────────────────────────────

export interface TenantContext {
  id: string;
  hasAccessFeePaid: boolean;
}

const _tenantContext: TenantContext = {
  id: 'tenant-1',
  hasAccessFeePaid: false, // Default is false to show the payment wall
};

export const getTenantContext = () => ({ ..._tenantContext });

export const markAccessFeePaid = () => {
  _tenantContext.hasAccessFeePaid = true;
};

// ─── Tenancy Notices (shared) ────────────────────────────────────────────────

export interface TenancyNotice {
  id: string;
  tenantId: string;
  tenantName: string;
  unitLabel: string;
  vacateDate: string;
  submittedAt: string;
  status: 'active' | 'acknowledged' | 'withdrawn';
}

let _notices: TenancyNotice[] = [];

export const getNotices = () => [..._notices];

export const submitNotice = (notice: Omit<TenancyNotice, 'id' | 'submittedAt' | 'status'>) => {
  const newNotice: TenancyNotice = {
    ...notice,
    id: `notice-${Date.now()}`,
    submittedAt: new Date().toISOString().split('T')[0],
    status: 'active',
  };
  _notices = [newNotice, ..._notices];
  return newNotice;
};

// ─── Maintenance Requests (shared) ───────────────────────────────────────────

export type MaintenanceStatus = 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high' | 'emergency';

export interface MaintenanceRequest {
  id: string;
  tenantId: string;
  tenantName: string;
  unitId: string;
  unitLabel: string;
  propertyName: string;
  title: string;
  description: string;
  category: string;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  createdAt: string;
  updatedAt: string;
  assignedProviderId?: string;
  assignedManagerNote?: string;
  estimatedCost?: number;
  completionDate?: string;
}

let _maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'maint-1', tenantId: 'tenant-1', tenantName: 'John Doe',
    unitId: 'unit-1', unitLabel: 'Unit 3B', propertyName: 'Westlands Heights',
    title: 'Leaking kitchen faucet', description: 'The kitchen faucet has been dripping constantly, wasting water and creating a puddle on the counter.',
    category: 'plumbing', priority: 'medium', status: 'assigned',
    createdAt: '2024-06-15', updatedAt: '2024-06-16',
    assignedProviderId: 'sp-1', assignedManagerNote: 'Assigned to David Kamau — top rated plumber in Westlands.',
    estimatedCost: 3000
  },
  {
    id: 'maint-2', tenantId: 'tenant-1', tenantName: 'John Doe',
    unitId: 'unit-1', unitLabel: 'Unit 3B', propertyName: 'Westlands Heights',
    title: 'Broken window latch - Bedroom', description: 'The latch on the bedroom window is broken and the window does not close securely.',
    category: 'carpentry', priority: 'low', status: 'pending',
    createdAt: '2024-06-20', updatedAt: '2024-06-20'
  },
  {
    id: 'maint-3', tenantId: 'tenant-1', tenantName: 'John Doe',
    unitId: 'unit-1', unitLabel: 'Unit 3B', propertyName: 'Westlands Heights',
    title: 'AC not cooling properly', description: 'The air conditioning unit is running but not producing cold air. Needs servicing.',
    category: 'hvac', priority: 'high', status: 'completed',
    createdAt: '2024-06-10', updatedAt: '2024-06-12',
    assignedProviderId: 'sp-8', estimatedCost: 5000, completionDate: '2024-06-12'
  },
];

export const getMaintenanceRequests = () => [..._maintenanceRequests];

export const getMaintenanceByTenant = (tenantId: string) =>
  _maintenanceRequests.filter(r => r.tenantId === tenantId);

export const getMaintenanceByProperty = (propertyName: string) =>
  _maintenanceRequests.filter(r => r.propertyName === propertyName);

export const addMaintenanceRequest = (request: Omit<MaintenanceRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
  const newReq: MaintenanceRequest = {
    ...request,
    id: `maint-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  _maintenanceRequests = [newReq, ..._maintenanceRequests];
  return newReq;
};

export const assignMaintenanceProvider = (
  requestId: string,
  providerId: string,
  managerNote: string,
  estimatedCost: number
) => {
  _maintenanceRequests = _maintenanceRequests.map(r =>
    r.id === requestId
      ? { ...r, assignedProviderId: providerId, assignedManagerNote: managerNote, estimatedCost, status: 'assigned' as MaintenanceStatus, updatedAt: new Date().toISOString().split('T')[0] }
      : r
  );
};

export const updateMaintenanceStatus = (requestId: string, status: MaintenanceStatus) => {
  _maintenanceRequests = _maintenanceRequests.map(r =>
    r.id === requestId
      ? { ...r, status, updatedAt: new Date().toISOString().split('T')[0], ...(status === 'completed' ? { completionDate: new Date().toISOString().split('T')[0] } : {}) }
      : r
  );
};

// ─── Shared Messages ─────────────────────────────────────────────────────────

export interface SharedMessage {
  id: string;
  threadId: string;
  from: { id: string; name: string; role: 'tenant' | 'landlord' | 'system' };
  to: { id: string; name: string; role: 'tenant' | 'landlord' };
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  relatedTo?: 'maintenance' | 'payment' | 'notice' | 'general';
}

let _messages: SharedMessage[] = [
  {
    id: 'msg-1', threadId: 'thread-1',
    from: { id: 'landlord-1', name: 'James Smith (Property Manager)', role: 'landlord' },
    to: { id: 'tenant-1', name: 'John Doe', role: 'tenant' },
    subject: 'Rent Reminder',
    content: 'This is a friendly reminder that your rent payment of KES 25,000 is due on July 1st. Please ensure timely payment to avoid late fees.',
    timestamp: '2024-06-28T10:00:00', read: false, relatedTo: 'payment'
  },
  {
    id: 'msg-2', threadId: 'thread-2',
    from: { id: 'system', name: 'Maintenance Team', role: 'system' },
    to: { id: 'tenant-1', name: 'John Doe', role: 'tenant' },
    subject: 'Scheduled Water Maintenance',
    content: 'Please be informed that there will be scheduled water maintenance on July 5th from 9 AM to 11 AM. We recommend storing water for use during this period.',
    timestamp: '2024-06-25T09:00:00', read: false, relatedTo: 'maintenance'
  },
  {
    id: 'msg-3', threadId: 'thread-1',
    from: { id: 'landlord-1', name: 'James Smith (Property Manager)', role: 'landlord' },
    to: { id: 'tenant-1', name: 'John Doe', role: 'tenant' },
    subject: 'June Payment Confirmed',
    content: 'Thank you for your June rent payment of KES 25,000. This email serves as confirmation that your payment has been received and processed.',
    timestamp: '2024-06-01T14:00:00', read: true, relatedTo: 'payment'
  },
  {
    id: 'msg-4', threadId: 'thread-3',
    from: { id: 'tenant-1', name: 'John Doe', role: 'tenant' },
    to: { id: 'landlord-1', name: 'James Smith', role: 'landlord' },
    subject: 'Kitchen Faucet Issue',
    content: 'Hi, I reported a leaking kitchen faucet. Could you please update me on when the repair crew will arrive? Thank you.',
    timestamp: '2024-06-17T11:00:00', read: true, relatedTo: 'maintenance'
  },
  {
    id: 'msg-5', threadId: 'thread-3',
    from: { id: 'landlord-1', name: 'James Smith (Property Manager)', role: 'landlord' },
    to: { id: 'tenant-1', name: 'John Doe', role: 'tenant' },
    subject: 'Re: Kitchen Faucet Issue',
    content: 'Hi John, David Kamau (our top-rated plumber) has been assigned to your request and will visit tomorrow between 10 AM and 12 PM. Please ensure someone is home.',
    timestamp: '2024-06-17T14:00:00', read: false, relatedTo: 'maintenance'
  },
];

export const getMessagesForUser = (userId: string) =>
  _messages.filter(m => m.to.id === userId || m.from.id === userId);

export const getMessagesForTenant = (tenantId: string) =>
  _messages.filter(m => m.to.id === tenantId || m.from.id === tenantId);

export const getMessagesForLandlord = (landlordId: string) =>
  _messages.filter(m => m.to.id === landlordId || m.from.id === landlordId);

export const getUnreadCount = (userId: string) =>
  _messages.filter(m => m.to.id === userId && !m.read).length;

export const sendMessage = (msg: Omit<SharedMessage, 'id' | 'timestamp' | 'read'>) => {
  const newMsg: SharedMessage = {
    ...msg,
    id: `msg-${Date.now()}`,
    timestamp: new Date().toISOString(),
    read: false,
  };
  _messages = [newMsg, ..._messages];
  return newMsg;
};

export const markMessageRead = (messageId: string) => {
  _messages = _messages.map(m =>
    m.id === messageId ? { ...m, read: true } : m
  );
};

// ─── Shared Complaints ──────────────────────────────────────────────────────

export interface Complaint {
  id: string;
  tenantId: string;
  tenantName: string;
  unitLabel: string;
  propertyName: string;
  type: string;
  subject: string;
  description: string;
  urgency: 'low' | 'medium' | 'high' | 'emergency';
  status: 'submitted' | 'reviewing' | 'in-progress' | 'resolved' | 'closed';
  createdAt: string;
  updatedAt: string;
  landlordResponse?: string;
}

let _complaints: Complaint[] = [
  {
    id: 'comp-1', tenantId: 'tenant-1', tenantName: 'John Doe',
    unitLabel: 'Unit 3B', propertyName: 'Westlands Heights',
    type: 'maintenance', subject: 'Water Leakage in Bathroom',
    description: 'Water is leaking from the bathroom ceiling onto the floor.',
    urgency: 'high', status: 'in-progress',
    createdAt: '2024-06-15', updatedAt: '2024-06-16',
    landlordResponse: 'We have dispatched a plumber to investigate. ETA: Tomorrow morning.'
  },
  {
    id: 'comp-2', tenantId: 'tenant-1', tenantName: 'John Doe',
    unitLabel: 'Unit 3B', propertyName: 'Westlands Heights',
    type: 'security', subject: 'Broken Window Lock',
    description: 'The window lock in the master bedroom is broken and needs replacement.',
    urgency: 'medium', status: 'resolved',
    createdAt: '2024-05-23', updatedAt: '2024-05-28',
    landlordResponse: 'Lock has been replaced. Please confirm everything is working.'
  },
];

export const getComplaints = () => [..._complaints];
export const getComplaintsByTenant = (tenantId: string) => _complaints.filter(c => c.tenantId === tenantId);
export const getComplaintsByProperty = (propertyName: string) => _complaints.filter(c => c.propertyName === propertyName);

export const addComplaint = (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
  const newComplaint: Complaint = {
    ...complaint,
    id: `comp-${Date.now()}`,
    status: 'submitted',
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
  };
  _complaints = [newComplaint, ..._complaints];
  return newComplaint;
};

export const respondToComplaint = (complaintId: string, response: string, newStatus: Complaint['status']) => {
  _complaints = _complaints.map(c =>
    c.id === complaintId
      ? { ...c, landlordResponse: response, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
      : c
  );
};



// ─── Shared Payment Confirmations ───────────────────────────────────────────

export interface PaymentConfirmation {
  id: string;
  tenantId: string;
  tenantName: string;
  amount: number;
  reference: string;
  date: string;
  status: 'pending' | 'verified';
}

let _paymentConfirmations: PaymentConfirmation[] = [];

export const getPaymentConfirmations = () => [..._paymentConfirmations];

export const confirmPayment = (payment: Omit<PaymentConfirmation, 'id' | 'status'>) => {
  const newPayment: PaymentConfirmation = {
    ...payment,
    id: `pay-${Date.now()}`,
    status: 'pending',
  };
  _paymentConfirmations = [newPayment, ..._paymentConfirmations];
  
  // Also send a system message
  sendMessage({
    threadId: `pay-thread-${Date.now()}`,
    from: { id: 'system', name: 'JengaSafe Payments', role: 'system' },
    to: { id: 'landlord-1', name: 'James Smith', role: 'landlord' },
    subject: `New Payment Confirmation: ${payment.reference}`,
    content: `${payment.tenantName} has confirmed a payment of KES ${payment.amount.toLocaleString()}. Reference: ${payment.reference}. Please verify in your bank statement.`,
    relatedTo: 'payment'
  });

  return newPayment;
};

// Helper to get service providers by category
export const getProvidersByCategory = (category: ServiceProvider['category']) =>
  serviceProviders.filter(p => p.category === category).sort((a, b) => b.rating - a.rating);

export const getProviderById = (id: string) =>
  serviceProviders.find(p => p.id === id);
