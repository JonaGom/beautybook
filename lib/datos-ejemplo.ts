// ============================================================
// DATOS DEL NEGOCIO - T.C Estética
// ============================================================

export const NEGOCIO = {
  nombre: 'T.C Estética',
  slogan: 'Tu bienestar, nuestra pasión',
  descripcion: 'Centro de estética profesional en Lomas de Zamora. Especialistas en tratamientos faciales, corporales, depilación láser y bienestar holístico.',
  telefono: '+54 9 11 7151-8339',
  whatsapp: '5491100000000',    // 👈 Actualizar con WhatsApp real
  email: 'turnos@tcstetica.com', // 👈 Actualizar con email real
  direccion: 'José Verdi 88, Lomas de Zamora',
  horario: 'Lun a Vie con turno previo | Viernes tratamientos corporales | Láser 2 días al mes',
  instagram: 'tcstetica', // 👈 Actualizar con Instagram real
}

export const SERVICIOS_EJEMPLO = [
  // ─── DEPILACIÓN LÁSER ───────────────────────────────────────
  {
    id: '1',
    nombre: 'Depilación Definitiva Láser — Método Soprano Platinum',
    descripcion: 'La tecnología más avanzada en depilación definitiva. El método Soprano Platinum es prácticamente indoloro y efectivo en todo tipo de piel y vello. Sesiones disponibles solo 2 días al mes.',
    duracion_minutos: 45,
    precio: 0, // 👈 Agregar precio cuando esté disponible
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=300&fit=crop',
    indicaciones_previas: 'Afeitar la zona 24hs antes. No depilar con cera en los 30 días previos. No exponerse al sol 48hs antes.',
    cuidados_posteriores: 'Evitar sol, sauna y pileta por 48 horas. Aplicar crema calmante en la zona tratada.',
    activo: true,
    nota: 'Disponible solo 2 días al mes. Consultá fechas disponibles.',
  },

  // ─── TRATAMIENTOS CORPORALES ────────────────────────────────
  {
    id: '2',
    nombre: 'Velaslim + Mío Up — Tratamiento Corporal',
    descripcion: 'Tratamiento corporal de última generación que combina Velaslim y Mío Up para reducción de medidas, mejora de la circulación y tonificación. Resultados visibles desde la primera sesión.',
    duracion_minutos: 20,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar bien hidratada. Evitar comidas abundantes 2 horas antes.',
    cuidados_posteriores: 'Tomar abundante agua. Evitar actividad física intensa por 24 horas.',
    activo: true,
    nota: 'Disponible solo los días viernes. Duración 20 min por zona.',
  },

  // ─── TRATAMIENTOS FACIALES ──────────────────────────────────
  {
    id: '3',
    nombre: 'Radiofrecuencia Facial',
    descripcion: 'Tratamiento facial con radiofrecuencia para estimular la producción de colágeno, reducir arrugas y tensar la piel. Efecto lifting natural y duradero.',
    duracion_minutos: 60,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar sin maquillaje. Suspender retinol y ácidos 3 días antes.',
    cuidados_posteriores: 'Protector solar obligatorio. Hidratación extra por 48 horas.',
    activo: true,
    nota: 'Todos los días con turno previo.',
  },
  {
    id: '4',
    nombre: 'Limpieza Facial Profunda',
    descripcion: 'Limpieza facial profunda con extracción de impurezas, vapor, exfoliación y alta frecuencia. Ideal para piel grasa, mixta o con puntos negros. Deja la piel radiante y purificada.',
    duracion_minutos: 60,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar sin maquillaje. No usar cremas con ácidos el día anterior.',
    cuidados_posteriores: 'No exponerse al sol. Aplicar crema calmante las primeras 24 horas.',
    activo: true,
    nota: 'Todos los días con turno previo.',
  },
  {
    id: '5',
    nombre: 'Dermaplaning',
    descripcion: 'Técnica de exfoliación mecánica que elimina el vello facial fino y células muertas con una cuchilla especial. Deja la piel suave, luminosa y potencia la absorción de los activos cosméticos.',
    duracion_minutos: 60,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar sin maquillaje. No usar retinol ni ácidos 5 días antes.',
    cuidados_posteriores: 'Protector solar obligatorio. Evitar maquillaje por 24 horas.',
    activo: true,
    nota: 'Todos los días con turno previo.',
  },

  // ─── MASAJES ────────────────────────────────────────────────
  {
    id: '6',
    nombre: 'Masajes Relajantes y Descontracturantes',
    descripcion: 'Masajes terapéuticos para liberar tensiones musculares, reducir el estrés y recuperar el equilibrio del cuerpo. Podés elegir entre técnica relajante suave o descontracturante profunda según tus necesidades.',
    duracion_minutos: 60,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=300&fit=crop',
    indicaciones_previas: 'No comer abundantemente 2 horas antes. Llegar 5 minutos antes.',
    cuidados_posteriores: 'Tomar mucha agua. Evitar actividad física intensa por 24 horas.',
    activo: true,
    nota: 'Todos los días con turno previo.',
  },

  // ─── HOLÍSTICA ──────────────────────────────────────────────
  {
    id: '7',
    nombre: 'Barras de Acceso — Sección Holística',
    descripcion: 'Las Barras de Acceso son una técnica de terapia energética que trabaja con 32 puntos en la cabeza. Libera bloqueos mentales, reduce el estrés y promueve el bienestar integral del ser. Una experiencia única de relajación profunda.',
    duracion_minutos: 60,
    precio: 0, // 👈 Agregar precio
    precio_promocional: null,
    imagen_url: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=400&h=300&fit=crop',
    indicaciones_previas: 'Llegar con ropa cómoda. Mente abierta y disposición al descanso.',
    cuidados_posteriores: 'Tomar agua. Permitirse descansar después de la sesión.',
    activo: true,
    nota: 'Todos los días con turno previo.',
  },
]

// Horarios disponibles
export const HORARIOS_DISPONIBLES = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30',
]

// Días cerrados (0=domingo, 6=sábado)
export const DIAS_CERRADO = [0]

export const formatPrecio = (precio: number) => {
  if (precio === 0) return 'Consultar precio'
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
