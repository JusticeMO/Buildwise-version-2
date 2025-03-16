
export interface BenefitItem {
  number: number;
  title: string;
  description: string;
}

export const propertyOwnerBenefits: BenefitItem[] = [
  {
    number: 1,
    title: "Reduce administrative workload by 50%+",
    description: "Automate repetitive tasks and focus on growing your property portfolio"
  },
  {
    number: 2,
    title: "Improve tenant retention",
    description: "Build stronger relationships through transparent communication"
  },
  {
    number: 3,
    title: "Minimize downtime with proactive maintenance",
    description: "Identify and address issues before they become expensive problems"
  }
];

export const tenantBenefits: BenefitItem[] = [
  {
    number: 1,
    title: "Simplified payments and requests",
    description: "Pay rent and submit maintenance requests from a single dashboard"
  },
  {
    number: 2,
    title: "Voice in community decisions",
    description: "Participate in discussions and contribute to building improvements"
  },
  {
    number: 3,
    title: "Enhanced security and convenience",
    description: "Secure communication and digital records of all interactions"
  }
];
