# Tracer backend (staged)

Accounts (Supabase), paid plans (Stripe), and server-side waitlist and contact forms.

This folder is **not active**. Next.js only runs code from the real `app/`, `lib/`, `components/`, and root
`proxy.ts`, and this folder is excluded from type-checking and linting. Every file here mirrors its real path, so
activating it is a copy.

## Activate

1. From the repository root, copy everything except this README over the project:

   ```bash
   cp -r backend/. . && git checkout README.md   # restores the root README this copy would not touch anyway
   rm -rf backend
   ```

   Then remove `"backend"` from `exclude` in `tsconfig.json` and `"backend/**"` from `eslint.config.mjs`.

2. Install the Supabase SDKs:

   ```bash
   npm install @supabase/supabase-js@^2.116.0 @supabase/ssr@^0.12.7
   ```

3. Add `!.env.example` below the `.env*` line in `.gitignore` so the example file stays tracked.

4. Check it:

   ```bash
   node --test lib/security.test.mjs
   npm run build
   ```

The site keeps working without environment variables: accounts, the waitlist, the contact form, and checkout show a
"not open yet" message until Supabase and Stripe are configured.

## What's included

| Path | Purpose |
| --- | --- |
| `lib/actions/auth.ts` | Sign up, sign in, sign out (Server Actions) |
| `lib/actions/forms.ts` | Waitlist and contact submissions, validated and rate-limited |
| `lib/actions/billing.ts` | Stripe Checkout and customer portal |
| `app/api/stripe/webhook/route.ts` | Signature-verified webhook; the only place plans change |
| `app/auth/callback/route.ts` | Email confirmation link handler |
| `proxy.ts` | Protects `/billing` and refreshes sessions |
| `lib/guard.ts`, `lib/stripe-signature.ts` | Validation, honeypot, rate limiting, webhook signature check |
| `lib/security.test.mjs` | Unit tests for the above (`node --test`) |
| `lib/supabase/*` | Server, browser, and service-role clients |
| `supabase/schema.sql` | Tables, row level security, profile trigger |
| `app/{login,register,download,contact,billing}/page.tsx`, `components/Header.tsx` | Pages wired to the actions |
| `next.config.ts` | Security headers updated for Supabase and Stripe |
| `.env.example` | Every environment variable |

## Setup

### 1. Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`.
3. From **Project Settings → API**, copy the project URL, anon key, and service role key into `.env.local`.
4. In **Authentication → URL Configuration**, set the Site URL to your domain and add
   `https://YOUR-DOMAIN/auth/callback` and `http://localhost:3000/auth/callback` to the redirect URLs.

### 2. Stripe

1. Create two products, **Basic** and **Pro**, each with a monthly and a yearly recurring USD price
   ($10 / $100 and $20 / $200). Copy the four price IDs into `.env.local`.
2. Copy your secret key from **Developers → API keys**.
3. In **Developers → Webhooks**, add `https://YOUR-DOMAIN/api/stripe/webhook` with the events
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`, and
   `customer.subscription.deleted`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
4. Turn on the **Customer portal** in Stripe's billing settings.

For local testing: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.

### 3. Deploy

Set every variable from `.env.example` in your host and rebuild. `NEXT_PUBLIC_*` values are built into the site.

## Security

- Plans change only through the signature-verified Stripe webhook; the `profiles` table has no update policy.
- `SUPABASE_SERVICE_ROLE_KEY` and all `STRIPE_*` values are server-only.
- `/billing` is protected in `proxy.ts`, and every Server Action checks the session again.
- Public forms use server-side validation, a honeypot field, and rate limiting.

## Not included yet

- The rate limiter is in-memory per server instance; move it to a shared store (e.g. Upstash Redis) before real traffic.
- No "forgot password" flow and no plugin API key generation yet.
- A visitor with JavaScript disabled who joins the waitlist is treated as a bot and not saved.
