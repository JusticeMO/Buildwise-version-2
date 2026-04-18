
export interface Property {
  id: string;
  title: string;
  address: string;
  imageUrl: string;
  landlordId: string;
}

export interface Unit {
  id: string;
  propertyId: string;
  unitNumber: string;
  rentAmount: number;
  status: 'vacant' | 'occupied' | 'vacating';
  availableFrom?: string;
}

export interface Lease {
  id: string;
  tenantId: string;
  unitId: string;
  startDate: string;
  endDate: string;
  rentAmount: number;
  depositAmount: number;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  role: 'tenant';
}

export interface Landlord {
  id: string;
  name: string;
}

// Mock Database
export const landlords: Landlord[] = [
  { id: 'landlord-1', name: 'James Smith' }
];

export const properties: Property[] = [
  {
    id: 'prop-1',
    title: 'Westlands Heights',
    address: 'Rhapta Road, Westlands, Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
    landlordId: 'landlord-1'
  },
  {
    id: 'prop-2',
    title: 'Sunshine Apartments',
    address: '123 Main Street, Nairobi',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80',
    landlordId: 'landlord-1'
  }
];

export const units: Unit[] = [
  {
    id: 'unit-1',
    propertyId: 'prop-1',
    unitNumber: '3B',
    rentAmount: 25000,
    status: 'occupied'
  },
  {
    id: 'unit-2',
    propertyId: 'prop-2',
    unitNumber: '5A',
    rentAmount: 35000,
    status: 'vacant'
  }
];

export const tenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: 'demo tenant',
    email: 'tenant@example.com',
    role: 'tenant'
  }
];

export const leases: Lease[] = [
  {
    id: 'lease-1',
    tenantId: 'tenant-1',
    unitId: 'unit-1',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentAmount: 25000,
    depositAmount: 25000
  }
];

// Global state for notice submission (in-memory mock)
let activeNotice: { unitId: string; date: string } | null = null;

export const setNotice = (unitId: string, date: string) => {
  activeNotice = { unitId, date };
  const unit = units.find(u => u.id === unitId);
  if (unit) {
    unit.status = 'vacating';
    unit.availableFrom = date;
  }
};

export const getNotice = () => activeNotice;

export const getMarketplaceProperties = () => {
  return properties.map(prop => ({
    ...prop,
    units: units.filter(u => u.propertyId === prop.id)
  }));
};

export const getTenantLease = (tenantId: string) => {
  const lease = leases.find(l => l.tenantId === tenantId);
  if (!lease) return null;
  
  const unit = units.find(u => u.id === lease.unitId);
  if (!unit) return null;

  const property = properties.find(p => p.id === unit.propertyId);
  if (!property) return null;

  return {
    ...lease,
    unit: {
      ...unit,
      property
    }
  };
};
