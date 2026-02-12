// features/auth/types/auth.types.ts
import { Database } from '@/types/database.types'
import { User } from "@supabase/supabase-js"

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UpdateProfile = Database['public']['Tables']['profiles']['Update']

export interface RegisterData {
    email: string
    password: string
    full_name: string
}

export interface LoginData {
    email: string
    password: string
}

export type AuthState = {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    userId: string | null
}