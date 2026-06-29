// ============================================================
// DATOS DE EJEMPLO - Modificá estos datos con los del negocio real
// ============================================================

export const NEGOCIO = {
  nombre: 'Lumière Estética', // 👈 Cambiá esto
  slogan: 'Tu bienestar, nuestra pasión',
  descripcion: 'Centro de estética profesional especializado en tratamientos faciales, corporales y relajación. Más de 10 años cuidando tu piel.',
  telefono: '+54 11 1234-5678', // 👈 Cambiá esto
  whatsapp: '5491112345678', // 👈 Cambiá esto (sin + ni espacios)
  email: 'turnos@lumierestetica.com', // 👈 Cambiá esto
  direccion: 'Av. Santa Fe 1234, CABA', // 👈 Cambiá esto
  horario: 'Lun a Vie 9:00 - 20:00 | Sáb 9:00 - 17:00',
  instagram: 'lumierestetica',
}

export const SERVICIOS_EJEMPLO = [
  {
    id: '1',
    nombre: 'Facial Hidratante Profundo',
    descripcion: 'Tratamiento facial completo con productos premium. Incluye limpieza, exfoliación, mascarilla hidratante y masaje relajante.',
    duracion_minutos: 60,
    precio: 8500,
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar sin maquillaje. Evitar exposición solar el día previo.',
    cuidados_posteriores: 'No maquillarse durante 4 horas. Usar protector solar al salir.',
    activo: true,
  },
  {
    id: '2',
    nombre: 'Depilación Láser — Piernas completas',
    descripcion: 'Sesión de depilación láser diodo para piernas completas. Tecnología de última generación, indolora y efectiva.',
    duracion_minutos: 45,
    precio: 15000,
    precio_promocional: 12000,
    imagen_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
    indicaciones_previas: 'Afeitar la zona 24hs antes. No depilar con cera en los 30 días previos.',
    cuidados_posteriores: 'Evitar sol, sauna y pileta por 48 horas.',
    activo: true,
  },
  {
    id: '3',
    nombre: 'Limpieza de Cutis',
    descripcion: 'Limpieza profunda con extracción manual, vapor y alta frecuencia. Ideal para piel grasa o con impurezas.',
    duracion_minutos: 50,
    precio: 6500,
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    indicaciones_previas: 'No usar cremas ni maquillaje el día del turno.',
    cuidados_posteriores: 'No exponer al sol. Aplicar crema calmante las primeras 24 horas.',
    activo: true,
  },
  {
    id: '4',
    nombre: 'Masaje Relajante Cuerpo Completo',
    descripcion: 'Masaje sueco de cuerpo completo con aceites esenciales. Ideal para liberar tensiones y reconectar con tu bienestar.',
    duracion_minutos: 60,
    precio: 9000,
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    indicaciones_previas: 'No comer abundantemente 2 horas antes. Llegar 5 minutos antes.',
    cuidados_posteriores: 'Tomar mucha agua. Evitar actividad física intensa por 24 horas.',
    activo: true,
  },
  {
    id: '5',
    nombre: 'Tratamiento Antiage Express',
    descripcion: 'Sesión intensiva con ultasonido, vitamina C y colágeno. Resultados visibles desde la primera sesión.',
    duracion_minutos: 75,
    precio: 12000,
    precio_promocional: 10000,
    imagen_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    indicaciones_previas: 'Suspender retinol y ácidos 3 días antes.',
    cuidados_posteriores: 'Uso de protector solar obligatorio. Hidratación extra por 48 horas.',
    activo: true,
  },
  {
    id: '6',
    nombre: 'Manicura + Pedicura Completa',
    descripcion: 'Manicura y pedicura completa con esmaltado semipermanente. Incluye exfoliación y humectación.',
    duracion_minutos: 90,
    precio: 7500,
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop',
    indicaciones_previas: 'No es necesaria ninguna preparación especial.',
    cuidados_posteriores: 'Evitar remojar las manos y pies por 24 horas.',
    activo: true,
  },
]

// Horarios disponibles del negocio - Modificá según el negocio real
export const HORARIOS_DISPONIBLES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30',
]

// Días que NO trabaja (0=domingo, 6=sábado)
export const DIAS_CERRADO = [0] // Solo domingo cerrado

export const formatPrecio = (precio: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(precio)
}

export const formatDuracion = (minutos: number) => {
  if (minutos < 60) return `${minutos} min`
  const horas = Math.floor(minutos / 60)
  const mins = minutos % 60
  return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`
}
