
import { useQuery } from "@tanstack/react-query";
import { getTenantLease } from "@/data/mockData";

export const useTenantData = () => {
  // Use "tenant-1" as hte mock logged in user
  const tenantId = "tenant-1";

  const { data: leaseData, isLoading: isLeaseLoading } = useQuery({
    queryKey: ['tenant-lease', tenantId],
    queryFn: async () => {
      // Direct mock return
      return getTenantLease(tenantId);
    }
  });

  const { data: paymentsData, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ['tenant-payments', leaseData?.id],
    queryFn: async () => {
      if (!leaseData?.id) {
        return [];
      }
      
      // Mock payments: 24 months of successful rent
      const payments = Array.from({ length: 24 }).map((_, i) => ({
        id: `pay-${i}`,
        amount: leaseData.rentAmount,
        payment_date: new Date(2024, i, 1).toISOString(),
        status: 'completed',
        payment_method: 'M-Pesa'
      }));
      
      return payments.reverse();
    },
    enabled: !!leaseData?.id
  });

  return {
    lease: leaseData,
    payments: paymentsData,
    isLoading: isLeaseLoading || isPaymentsLoading
  };
};
