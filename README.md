# Mummy Ka Yummy Tiffin

Production-ready Next.js website for a subscription-based homemade tiffin service in Vadodara.

## Scope

- Public marketing website
- Customer login and dashboard
- Admin panel and CMS
- Weekly menu
- Meal customization
- Mini and full platter ordering
- Subscription plans, discounts and deposit rules
- WhatsApp order workflow
- Order and payment status management
- Gallery, testimonials, FAQ and contact pages
- SEO metadata, Schema.org JSON-LD, sitemap, robots and security headers
- Supabase schema for authentication, CMS, orders and role based access
- Real launch details for Mummy Ka Yummy Tiffin: phone, WhatsApp, email, Instagram, map link,
  delivery timing, pickup rules and service-radius rules

Future mobile apps, inventory, AI, delivery tracking, kitchen ERP, loyalty, referrals and nutrition modules are intentionally not implemented.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` into `.env.local` and set:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- `AUTH_SECRET`
- `ADMIN_LOGIN_ID`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

Customer login uses email. Admin routes are protected by a signed HTTP-only cookie and require
`ADMIN_LOGIN_ID` plus `ADMIN_PASSWORD`. For local development, the fallback admin credentials are
`admin` / `Admin@7383344746`; set real environment variables before production deployment.

Without Supabase variables, CMS edits are browser-local preview only. Gallery Add New is wired to
`/api/admin/gallery` and persists to Supabase when database credentials are configured.

## Database

Run `supabase/schema.sql` in Supabase SQL editor. It creates:

- profiles and roles
- subscription plans
- meal items
- weekly menus
- orders and order items
- gallery, testimonials and FAQs
- CMS settings
- delivery areas
- audit logs
- row level security policies

## Deploy

Deploy to Vercel as a standard Next.js app. Configure the environment variables above, then connect Supabase Auth and Storage or Cloudinary for production media.
