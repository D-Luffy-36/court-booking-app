// features/court/types/court.types.ts
import { Database } from '@/types/database.types'

// Export database types
export type Court = Database['public']['Tables']['courts']['Row']
export type NewCourt = Database['public']['Tables']['courts']['Insert']
export type UpdateCourt = Database['public']['Tables']['courts']['Update']