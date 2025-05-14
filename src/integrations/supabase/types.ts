export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          id: string
          published_at: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category: string
          content: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          id?: string
          published_at?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contractors: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          description: string | null
          id: string
          location: string | null
          name: string
          rating: number | null
          reviews_count: number | null
          specialization: string[] | null
          updated_at: string
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name: string
          rating?: number | null
          reviews_count?: number | null
          specialization?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          description?: string | null
          id?: string
          location?: string | null
          name?: string
          rating?: number | null
          reviews_count?: number | null
          specialization?: string[] | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      financing_applications: {
        Row: {
          amount: number
          application_data: Json | null
          created_at: string
          id: string
          offer_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          application_data?: Json | null
          created_at?: string
          id?: string
          offer_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          application_data?: Json | null
          created_at?: string
          id?: string
          offer_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "financing_applications_offer_id_fkey"
            columns: ["offer_id"]
            isOneToOne: false
            referencedRelation: "financing_offers"
            referencedColumns: ["id"]
          },
        ]
      }
      financing_offers: {
        Row: {
          bank_name: string
          created_at: string
          highlights: string[] | null
          id: string
          interest_rate: number
          max_amount: number
          min_deposit_percent: number
          offer_name: string
          special_terms: string | null
          term_years: number
          updated_at: string
          url: string | null
        }
        Insert: {
          bank_name: string
          created_at?: string
          highlights?: string[] | null
          id?: string
          interest_rate: number
          max_amount: number
          min_deposit_percent: number
          offer_name: string
          special_terms?: string | null
          term_years: number
          updated_at?: string
          url?: string | null
        }
        Update: {
          bank_name?: string
          created_at?: string
          highlights?: string[] | null
          id?: string
          interest_rate?: number
          max_amount?: number
          min_deposit_percent?: number
          offer_name?: string
          special_terms?: string | null
          term_years?: number
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      leases: {
        Row: {
          created_at: string | null
          deposit_amount: number | null
          end_date: string
          id: string
          rent_amount: number
          start_date: string
          tenant_id: string
          unit_id: string
        }
        Insert: {
          created_at?: string | null
          deposit_amount?: number | null
          end_date: string
          id?: string
          rent_amount: number
          start_date: string
          tenant_id: string
          unit_id: string
        }
        Update: {
          created_at?: string | null
          deposit_amount?: number | null
          end_date?: string
          id?: string
          rent_amount?: number
          start_date?: string
          tenant_id?: string
          unit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "leases_unit_id_fkey"
            columns: ["unit_id"]
            isOneToOne: false
            referencedRelation: "units"
            referencedColumns: ["id"]
          },
        ]
      }
      materials: {
        Row: {
          category: string
          created_at: string
          description: string | null
          id: string
          name: string
          specifications: Json | null
          supplier_id: string | null
          unit_price: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          specifications?: Json | null
          supplier_id?: string | null
          unit_price: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          specifications?: Json | null
          supplier_id?: string | null
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "materials_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          lease_id: string
          payment_date: string
          payment_method: string | null
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          lease_id: string
          payment_date: string
          payment_method?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          lease_id?: string
          payment_date?: string
          payment_method?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_lease_id_fkey"
            columns: ["lease_id"]
            isOneToOne: false
            referencedRelation: "leases"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          role: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_contractors: {
        Row: {
          amount: number | null
          contractor_id: string
          created_at: string
          end_date: string | null
          project_id: string
          role: string
          start_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          amount?: number | null
          contractor_id: string
          created_at?: string
          end_date?: string | null
          project_id: string
          role: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number | null
          contractor_id?: string
          created_at?: string
          end_date?: string | null
          project_id?: string
          role?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_contractors_contractor_id_fkey"
            columns: ["contractor_id"]
            isOneToOne: false
            referencedRelation: "contractors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_contractors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_materials: {
        Row: {
          created_at: string
          material_id: string
          project_id: string
          quantity: number
          unit_price: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          material_id: string
          project_id: string
          quantity: number
          unit_price: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          material_id?: string
          project_id?: string
          quantity?: number
          unit_price?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_materials_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          budget: number | null
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          location: string | null
          owner_id: string
          specifications: Json | null
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          owner_id: string
          specifications?: Json | null
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          location?: string | null
          owner_id?: string
          specifications?: Json | null
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string
          created_at: string | null
          description: string | null
          id: string
          landlord_id: string
          rent_amount: number
          title: string
          units_count: number | null
        }
        Insert: {
          address: string
          created_at?: string | null
          description?: string | null
          id?: string
          landlord_id: string
          rent_amount: number
          title: string
          units_count?: number | null
        }
        Update: {
          address?: string
          created_at?: string | null
          description?: string | null
          id?: string
          landlord_id?: string
          rent_amount?: number
          title?: string
          units_count?: number | null
        }
        Relationships: []
      }
      units: {
        Row: {
          created_at: string | null
          floor_plan: string | null
          id: string
          property_id: string
          rent_amount: number
          status: string | null
          unit_number: string
        }
        Insert: {
          created_at?: string | null
          floor_plan?: string | null
          id?: string
          property_id: string
          rent_amount: number
          status?: string | null
          unit_number: string
        }
        Update: {
          created_at?: string | null
          floor_plan?: string | null
          id?: string
          property_id?: string
          rent_amount?: number
          status?: string | null
          unit_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "units_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      contractor_status: "active" | "inactive" | "pending_approval"
      contractor_type: "general" | "specialized" | "supplier"
      financing_status: "pending" | "approved" | "rejected" | "disbursed"
      financing_type: "mortgage" | "construction_loan" | "personal_loan"
      lease_status: "active" | "pending" | "ended"
      payment_status: "pending" | "completed" | "failed" | "refunded"
      project_status: "planning" | "in_progress" | "completed" | "on_hold"
      project_type: "residential" | "commercial" | "industrial" | "retail"
      unit_status: "available" | "occupied" | "maintenance" | "reserved"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      contractor_status: ["active", "inactive", "pending_approval"],
      contractor_type: ["general", "specialized", "supplier"],
      financing_status: ["pending", "approved", "rejected", "disbursed"],
      financing_type: ["mortgage", "construction_loan", "personal_loan"],
      lease_status: ["active", "pending", "ended"],
      payment_status: ["pending", "completed", "failed", "refunded"],
      project_status: ["planning", "in_progress", "completed", "on_hold"],
      project_type: ["residential", "commercial", "industrial", "retail"],
      unit_status: ["available", "occupied", "maintenance", "reserved"],
    },
  },
} as const
