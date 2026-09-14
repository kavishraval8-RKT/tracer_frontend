# Tracer website

Marketing site, waitlist, and account pages for Tracer, the AI copilot for KiCad.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · Supabase (auth and database) · Stripe (subscriptions)

## Develop

```bash
npm install
cp .env.example .env.local   # optional; see below
npm run dev                   # http://localhost:3000
node --test lib/security.test.mjs
```

The site runs without any environment variables. Until Supabase and Stripe are configured, accounts, the waitlist,
the contact form, and checkout show a clear "not open yet" message instead of failing.

## Backend setup

### 1. Supabase (accounts, waitlist, contact messages)

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run [`supabase/schema.sql`](supabase/schema.sql).
3. From **Project Settings → API**, copy the project URL, anon key, and service role key into `.env.local`.
4. In **Authentication → URL Configuration**, set the Site URL to your domain and add
   `https://YOUR-DOMAIN/auth/callback` and `http://localhost:3000/auth/callback` to the redirect URLs.

Waitlist sign-ups and contact messages appear in the `waitlist` and `contact_messages` tables.

### 2. Stripe (paid plans)

1. Create two products, **Basic** and **Pro**, each with a monthly and a yearly recurring USD price
   ($10 / $100 and $20 / $200). Copy the four price IDs into `.env.local`.
2. Copy your secret key from **Developers → API keys**.
3. In **Developers → Webhooks**, add the endpoint `https://YOUR-DOMAIN/api/stripe/webhook` with these events:
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`,
   `customer.subscription.deleted`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Turn on the **Customer portal** in Stripe's billing settings so customers can change or cancel plans.

For local testing, run `stripe listen --forward-to localhost:3000/api/stripe/webhook` and use the secret it prints.

### 3. Deploy

Set every variable from [`.env.example`](.env.example) in your host. `NEXT_PUBLIC_*` values are built into the site, so
rebuild after changing them.

## Security

- Plans change only through the signature-verified Stripe webhook. The `profiles` table has no update policy, so users
  can't grant themselves a plan.
- `SUPABASE_SERVICE_ROLE_KEY` and all `STRIPE_*` values are server-only.
- `/billing` is protected in `proxy.ts`, and every Server Action checks the session again.
- Public forms are validated on the server and protected by a honeypot field and rate limiting. The rate limiter is
  in-memory per server instance; move it to a shared store before relying on it at scale.
- Security headers (CSP, frame, referrer, permissions, HSTS) are set in `next.config.ts`.
