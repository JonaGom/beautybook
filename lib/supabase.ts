import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      usuarios: {
        Row: {
          id: string
          nombre: string
          apellido: string
          email: string
          telefono: string
          rol: 'cliente' | 'admin'
          created_at: string
        }
      }
      servicios: {
        Row: {
          id: string
          nombre: string
          descripcion: string
          duracion_minutos: number
          precio: number
          precio_promocional: number | null
          imagen_url: string | null
          indicaciones_previas: string | null
          cuidados_posteriores: string | null
          activo: boolean
          created_at: string
        }
      }
      turnos: {
        Row: {
          id: string
          usuario_id: string
          servicio_id: string
          fecha: string
          hora_inicio: string
          hora_fin: string
          estado: 'pendiente' | 'confirmado' | 'cancelado' | 'completado'
          monto_total: number
          monto_pagado: number
          stripe_payment_intent_id: string | null
          notas: string | null
          created_at: string
        }
      }
    }
  }
}
