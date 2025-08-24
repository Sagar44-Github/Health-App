export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      ai_conversations: {
        Row: {
          conversation_type: string;
          created_at: string;
          feedback_comment: string | null;
          feedback_rating: number | null;
          id: string;
          message_content: string;
          message_metadata: Json | null;
          message_role: string;
          response_time_ms: number | null;
          session_id: string;
          user_id: string;
        };
        Insert: {
          conversation_type: string;
          created_at?: string;
          feedback_comment?: string | null;
          feedback_rating?: number | null;
          id?: string;
          message_content: string;
          message_metadata?: Json | null;
          message_role: string;
          response_time_ms?: number | null;
          session_id: string;
          user_id: string;
        };
        Update: {
          conversation_type?: string;
          created_at?: string;
          feedback_comment?: string | null;
          feedback_rating?: number | null;
          id?: string;
          message_content?: string;
          message_metadata?: Json | null;
          message_role?: string;
          response_time_ms?: number | null;
          session_id?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      appointments: {
        Row: {
          appointment_date: string;
          appointment_type: string;
          cancellation_reason: string | null;
          consultation_id: string | null;
          created_at: string;
          doctor_id: string | null;
          doctor_name: string;
          duration_minutes: number | null;
          facility_name: string | null;
          id: string;
          location: string | null;
          notes: string | null;
          preparation_instructions: string | null;
          reminder_sent: boolean;
          specialty: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          appointment_date: string;
          appointment_type: string;
          cancellation_reason?: string | null;
          consultation_id?: string | null;
          created_at?: string;
          doctor_id?: string | null;
          doctor_name: string;
          duration_minutes?: number | null;
          facility_name?: string | null;
          id?: string;
          location?: string | null;
          notes?: string | null;
          preparation_instructions?: string | null;
          reminder_sent?: boolean;
          specialty?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          appointment_date?: string;
          appointment_type?: string;
          cancellation_reason?: string | null;
          consultation_id?: string | null;
          created_at?: string;
          doctor_id?: string | null;
          doctor_name?: string;
          duration_minutes?: number | null;
          facility_name?: string | null;
          id?: string;
          location?: string | null;
          notes?: string | null;
          preparation_instructions?: string | null;
          reminder_sent?: boolean;
          specialty?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "appointments_consultation_id_fkey";
            columns: ["consultation_id"];
            isOneToOne: false;
            referencedRelation: "consultations";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "appointments_doctor_id_fkey";
            columns: ["doctor_id"];
            isOneToOne: false;
            referencedRelation: "doctors";
            referencedColumns: ["id"];
          }
        ];
      };
      consultations: {
        Row: {
          chief_complaint: string | null;
          consultation_fee: number | null;
          consultation_type: string;
          created_at: string;
          diagnosis: string | null;
          doctor_id: string;
          duration_minutes: number | null;
          ended_at: string | null;
          follow_up_date: string | null;
          follow_up_required: boolean;
          id: string;
          meeting_link: string | null;
          notes: string | null;
          payment_status: string;
          prescription_id: string | null;
          recommendations: string | null;
          scheduled_at: string;
          session_recording_url: string | null;
          started_at: string | null;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          chief_complaint?: string | null;
          consultation_fee?: number | null;
          consultation_type: string;
          created_at?: string;
          diagnosis?: string | null;
          doctor_id: string;
          duration_minutes?: number | null;
          ended_at?: string | null;
          follow_up_date?: string | null;
          follow_up_required?: boolean;
          id?: string;
          meeting_link?: string | null;
          notes?: string | null;
          payment_status?: string;
          prescription_id?: string | null;
          recommendations?: string | null;
          scheduled_at: string;
          session_recording_url?: string | null;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          chief_complaint?: string | null;
          consultation_fee?: number | null;
          consultation_type?: string;
          created_at?: string;
          diagnosis?: string | null;
          doctor_id?: string;
          duration_minutes?: number | null;
          ended_at?: string | null;
          follow_up_date?: string | null;
          follow_up_required?: boolean;
          id?: string;
          meeting_link?: string | null;
          notes?: string | null;
          payment_status?: string;
          prescription_id?: string | null;
          recommendations?: string | null;
          scheduled_at?: string;
          session_recording_url?: string | null;
          started_at?: string | null;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "consultations_doctor_id_fkey";
            columns: ["doctor_id"];
            isOneToOne: false;
            referencedRelation: "doctors";
            referencedColumns: ["id"];
          }
        ];
      };
      doctors: {
        Row: {
          available_hours: Json | null;
          avatar_url: string | null;
          bio: string | null;
          certifications: string[] | null;
          consultation_fee: number | null;
          created_at: string;
          education: string[] | null;
          email: string | null;
          experience_years: number;
          full_name: string;
          hospital_affiliation: string | null;
          id: string;
          is_active: boolean;
          is_verified: boolean;
          languages: string[] | null;
          license_number: string;
          rating: number | null;
          specialty: string;
          total_reviews: number;
          updated_at: string;
        };
        Insert: {
          available_hours?: Json | null;
          avatar_url?: string | null;
          bio?: string | null;
          certifications?: string[] | null;
          consultation_fee?: number | null;
          created_at?: string;
          education?: string[] | null;
          email?: string | null;
          experience_years?: number;
          full_name: string;
          hospital_affiliation?: string | null;
          id?: string;
          is_active?: boolean;
          is_verified?: boolean;
          languages?: string[] | null;
          license_number: string;
          rating?: number | null;
          specialty: string;
          total_reviews?: number;
          updated_at?: string;
        };
        Update: {
          available_hours?: Json | null;
          avatar_url?: string | null;
          bio?: string | null;
          certifications?: string[] | null;
          consultation_fee?: number | null;
          created_at?: string;
          education?: string[] | null;
          email?: string | null;
          experience_years?: number;
          full_name?: string;
          hospital_affiliation?: string | null;
          id?: string;
          is_active?: boolean;
          is_verified?: boolean;
          languages?: string[] | null;
          license_number?: string;
          rating?: number | null;
          specialty?: string;
          total_reviews?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      emergency_contacts: {
        Row: {
          address: string | null;
          created_at: string;
          email: string | null;
          id: string;
          is_primary: boolean;
          name: string;
          phone: string;
          priority_order: number;
          relationship: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_primary?: boolean;
          name: string;
          phone: string;
          priority_order?: number;
          relationship: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string | null;
          created_at?: string;
          email?: string | null;
          id?: string;
          is_primary?: boolean;
          name?: string;
          phone?: string;
          priority_order?: number;
          relationship?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          allergies: string[] | null;
          avatar_url: string | null;
          blood_type: string | null;
          created_at: string;
          current_medications: string[] | null;
          date_of_birth: string | null;
          emergency_contact_name: string | null;
          emergency_contact_phone: string | null;
          emergency_contact_relationship: string | null;
          full_name: string | null;
          gender: string | null;
          height_cm: number | null;
          id: string;
          insurance_policy_number: string | null;
          insurance_provider: string | null;
          medical_conditions: string[] | null;
          preferred_language: string | null;
          profile_completed: boolean;
          timezone: string | null;
          updated_at: string;
          user_id: string;
          weight_kg: number | null;
        };
        Insert: {
          allergies?: string[] | null;
          avatar_url?: string | null;
          blood_type?: string | null;
          created_at?: string;
          current_medications?: string[] | null;
          date_of_birth?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          full_name?: string | null;
          gender?: string | null;
          height_cm?: number | null;
          id?: string;
          insurance_policy_number?: string | null;
          insurance_provider?: string | null;
          medical_conditions?: string[] | null;
          preferred_language?: string | null;
          profile_completed?: boolean;
          timezone?: string | null;
          updated_at?: string;
          user_id: string;
          weight_kg?: number | null;
        };
        Update: {
          allergies?: string[] | null;
          avatar_url?: string | null;
          blood_type?: string | null;
          created_at?: string;
          current_medications?: string[] | null;
          date_of_birth?: string | null;
          emergency_contact_name?: string | null;
          emergency_contact_phone?: string | null;
          emergency_contact_relationship?: string | null;
          full_name?: string | null;
          gender?: string | null;
          height_cm?: number | null;
          id?: string;
          insurance_policy_number?: string | null;
          insurance_provider?: string | null;
          medical_conditions?: string[] | null;
          preferred_language?: string | null;
          profile_completed?: boolean;
          timezone?: string | null;
          updated_at?: string;
          user_id?: string;
          weight_kg?: number | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
