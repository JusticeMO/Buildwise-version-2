
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useTenantData = () => {
  const { data: leaseData, isLoading: isLeaseLoading } = useQuery({
    queryKey: ['tenant-lease'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leases')
        .select(`
          *,
          unit:units(
            *,
            property:properties(*)
          )
        `)
        .eq('tenant_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (error) throw error;
      return data;
    }
  });

  const { data: paymentsData, isLoading: isPaymentsLoading } = useQuery({
    queryKey: ['tenant-payments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('lease_id', leaseData?.id)
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
