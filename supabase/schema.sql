create extension if not exists "pgcrypto";

create type public.user_role as enum ('customer', 'admin');
create type public.order_status as enum ('Pending', 'Paid', 'Confirmed', 'Completed', 'Rejected');
create type public.payment_status as enum ('Pending', 'Paid', 'Failed', 'Refunded');
create type public.gallery_category as enum ('Food', 'Kitchen', 'Packaging', 'Behind the Scenes');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'customer',
  full_name text not null,
  phone text,
  address text,
  area text,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.subscription_plans (
  id text primary key,
  name text not null,
  duration_days integer not null check (duration_days > 0),
  discount_percent numeric(5,2) not null default 0,
  deposit_required boolean not null default false,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.meal_items (
  id text primary key,
  category text not null,
  name text not null,
  description text not null default '',
  price numeric(10,2) not null check (price >= 0),
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.weekly_menus (
  id uuid primary key default gen_random_uuid(),
  day_of_week integer not null check (day_of_week between 1 and 7),
  day_name text not null,
  lunch_items text[] not null default '{}',
  dinner_items text[] not null default '{}',
  is_closed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (day_of_week)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_code text not null unique,
  customer_id uuid references public.profiles(id),
  customer_name text not null,
  phone text not null,
  delivery_address text not null,
  start_date date not null,
  meal_label text not null,
  plan_id text references public.subscription_plans(id),
  fulfillment text not null default 'delivery' check (fulfillment in ('delivery', 'pickup')),
  distance_km numeric(6,2) not null default 0,
  meal_total numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  delivery_charge numeric(10,2) not null default 0,
  deposit_amount numeric(10,2) not null default 0,
  total_payable numeric(10,2) not null default 0,
  payment_status public.payment_status not null default 'Pending',
  order_status public.order_status not null default 'Pending',
  payment_screenshot_url text,
  special_instructions text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  meal_item_id text references public.meal_items(id),
  item_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(10,2) not null default 0
);

create table public.gallery (
  id uuid primary key default gen_random_uuid(),
  category public.gallery_category not null,
  title text not null,
  alt_text text not null,
  image_url text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  source text not null default 'Google',
  reviewer_name text not null,
  reviewer_role text,
  rating integer not null check (rating between 1 and 5),
  quote text not null,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_published boolean not null default true,
  updated_at timestamptz not null default now()
);

create table public.cms_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create table public.delivery_areas (
  id uuid primary key default gen_random_uuid(),
  area_name text not null,
  city text not null default 'Vadodara',
  free_delivery_radius_km numeric(6,2) not null default 3,
  service_radius_km numeric(6,2) not null default 5,
  extra_charge_per_km numeric(10,2) not null default 20,
  is_active boolean not null default true
);

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id text,
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and archived_at is null
  );
$$;

alter table public.profiles enable row level security;
alter table public.subscription_plans enable row level security;
alter table public.meal_items enable row level security;
alter table public.weekly_menus enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.gallery enable row level security;
alter table public.testimonials enable row level security;
alter table public.faqs enable row level security;
alter table public.cms_settings enable row level security;
alter table public.delivery_areas enable row level security;
alter table public.audit_logs enable row level security;

create policy "profiles can read own profile"
on public.profiles for select
using (id = auth.uid() or public.is_admin());

create policy "admins manage profiles"
on public.profiles for all
using (public.is_admin())
with check (public.is_admin());

create policy "public read active subscription plans"
on public.subscription_plans for select
using (is_active = true);

create policy "public read active meal items"
on public.meal_items for select
using (is_active = true);

create policy "public read weekly menus"
on public.weekly_menus for select
using (true);

create policy "public read published gallery"
on public.gallery for select
using (is_published = true);

create policy "public read published testimonials"
on public.testimonials for select
using (is_published = true);

create policy "public read published faqs"
on public.faqs for select
using (is_published = true);

create policy "public read delivery areas"
on public.delivery_areas for select
using (is_active = true);

create policy "customers read own orders"
on public.orders for select
using (customer_id = auth.uid() or public.is_admin());

create policy "admins manage content"
on public.subscription_plans for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage meal items"
on public.meal_items for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage weekly menus"
on public.weekly_menus for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage orders"
on public.orders for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage order items"
on public.order_items for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage gallery"
on public.gallery for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage testimonials"
on public.testimonials for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage faqs"
on public.faqs for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage cms settings"
on public.cms_settings for all using (public.is_admin()) with check (public.is_admin());
create policy "admins manage delivery areas"
on public.delivery_areas for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read audit logs"
on public.audit_logs for select using (public.is_admin());
