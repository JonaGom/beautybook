'use client'
import { MessageCircle } from 'lucide-react'
import { NEGOCIO } from '@/lib/datos-ejemplo'

export default function WhatsappFlotante() {
  return (
    <a
      href={`https://wa.me/${NEGOCIO.whatsapp}?text=Hola! Quiero consultar sobre un turno.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-[#25D366] rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-200"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" strokeWidth={1.5} />
      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
    </a>
  )
}
