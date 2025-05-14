
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTenantData = () => {
  const { data: leaseData, isLoading: isLeaseLoading } = useQuery({
    queryKey: ['tenant-lease'],
    queryFn: async () => {
      const user = await supabase.auth.getUser();
      const userId = user?.data?.user?.id;

      if (!userId) {
        return null;
      }

      const { data, error } = await supabase
        .from('leases')
        .select(`
          *,
          unit:units(
            *,
            property:properties(*)
          )
        `)
        .eq('tenant_id', userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    }
  });

  const { data: paymentsData, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ['tenant-payments'],
    queryFn: async () => {
      if (!leaseData?.id) {
        return [];
      }

      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('lease_id', leaseData.id)
        .order('payment_date', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!leaseData?.id
  });

  return {
    lease: leaseData,
    payments: paymentsData,
    isLoading: isLeaseLoading || isPaymentsLoading
  };
};
