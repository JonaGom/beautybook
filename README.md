# 💄 BeautyBook — Guía completa para Jonathan

## ¿Qué es esto?
Tu app web para reservar turnos en centros de estética con pago anticipado.
Construida con Next.js + Tailwind CSS + Supabase + Stripe.

---

## 🚀 PASO 1 — Abrir en VS Code

1. Abrí VS Code
2. Arrastrá la carpeta `beautybook` al ícono de VS Code
3. Abrí la terminal integrada: `Ver > Terminal` (o Ctrl + `)

---

## 📦 PASO 2 — Instalar dependencias

En la terminal, escribí:
```bash
npm install
```
Esperá que termine (puede tardar 1-2 minutos).

---

## ⚙️ PASO 3 — Crear archivo de configuración

1. Copiá el archivo `.env.local.example` y renombralo `.env.local`
2. Por ahora podés dejarlo así para ver la app sin base de datos
3. Más adelante completás las claves de Supabase y Stripe

---

## 👀 PASO 4 — Ver la app en tu navegador

```bash
npm run dev
```
Abrí tu navegador en: **http://localhost:3000**

¡Ya podés ver tu app funcionando! 🎉

---

## 📝 PASO 5 — Personalizar los datos del negocio

Abrí el archivo `lib/datos-ejemplo.ts` y modificá:

```typescript
export const NEGOCIO = {
  nombre: 'Lumière Estética',     // 👈 Nombre del negocio
  telefono: '+54 11 1234-5678',   // 👈 Teléfono
  whatsapp: '5491112345678',      // 👈 WhatsApp (sin + ni espacios)
  email: 'turnos@negocio.com',    // 👈 Email
  direccion: 'Tu dirección',      // 👈 Dirección
  horario: 'Lun a Vie 9-20hs',   // 👈 Horario
}
```

Y más abajo, modificá `SERVICIOS_EJEMPLO` con los servicios reales.

---

## 🌐 PASO 6 — Publicar en internet (Vercel)

1. Creá una cuenta en [github.com](https://github.com) si no tenés
2. Subí la carpeta como repositorio nuevo
3. Entrá a [vercel.com](https://vercel.com)
4. Conectá tu cuenta de GitHub
5. Importá el repositorio → Deploy automático 🚀

---

## 🗄️ PASO 7 — Base de datos real (Supabase)

1. Creá cuenta en [supabase.com](https://supabase.com)
2. Creá un proyecto nuevo
3. Copiá las claves en `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Creá las tablas: `usuarios`, `servicios`, `turnos`

---

## 💳 PASO 8 — Pagos reales (Stripe)

1. Creá cuenta en [stripe.com](https://stripe.com)
2. Copiá las claves en `.env.local`
3. Activá tu cuenta para recibir pagos reales

---

## 📁 Estructura de archivos

```
beautybook/
├── app/
│   ├── page.tsx              → Página principal
│   ├── servicios/page.tsx    → Todos los servicios
│   ├── reservar/page.tsx     → Flujo de reserva
│   ├── login/page.tsx        → Login
│   ├── registro/page.tsx     → Registro
│   ├── cliente/reservas/     → Mis turnos
│   └── admin/dashboard/      → Panel admin
├── components/
│   ├── layout/Navbar.tsx     → Barra de navegación
│   ├── layout/Footer.tsx     → Pie de página
│   └── cliente/ServicioCard  → Tarjeta de servicio
└── lib/
    ├── datos-ejemplo.ts      → ⭐ ACÁ MODIFICÁS LOS DATOS
    └── supabase.ts           → Conexión a base de datos
```

---

## 🆘 Si algo no funciona

Escribile a Claude y pegá el error que aparece en la terminal.
Claude te ayuda a resolverlo paso a paso.

---

## 💰 Modelo de monetización sugerido

- Cobrá al negocio una **suscripción mensual** (ej: $15.000-$30.000/mes ARS)
- Ofrecé el primer mes gratis para que lo prueben
- Empezá con 1 negocio, aprendés, mejorás, escalás

---

Hecho con ❤️ para Jonathan Gabriel Gómez
```
