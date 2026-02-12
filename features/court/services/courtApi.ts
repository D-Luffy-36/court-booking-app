// features/court/services/courtApi.ts
import { createClient } from '@/app/lib/supabase/client'
import type { Court, NewCourt } from '../types/court.types'

/* =====================================
Service flow:
1. Create Supabase client
2. Execute query
3. Handle error
4. Return data
===================================== */

export const courtApi = {
    // Get all courts
    async getAll(): Promise<Court[]> {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('courts')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching courts:', error)
            throw error
        }

        return data || []
    },

    // Get available courts
    async getAvailable(): Promise<Court[]> {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('courts')
            .select('*')
            .eq('is_available', true)

        if (error) throw error
        return data || []
    },

    // Get court by ID
    async getById(id: string): Promise<Court | null> {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('courts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create court
    async create(court: NewCourt): Promise<Court> {
        const supabase = createClient()

        const { data, error } = await supabase
            .from('courts')
            .insert(court)
            .select()
            .single()

        if (error) throw error
        return data
    },
}