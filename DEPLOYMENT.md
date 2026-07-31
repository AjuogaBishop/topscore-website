# Topscore Learning deployment runbook

This runbook covers the corporate website at `topscorelearning.com`. It does not deploy the future PEER application or `peer.topscorelearning.com`.

## Current readiness

- Vercel project configuration: repository-ready
- Vite production build: passing
- Serverless enquiry endpoint: repository-ready
- Form provider: Resend adapter implemented; credentials required
- Cloudflare nameservers: active
- Apex and `www` website records: not currently published
- Mail exchange records: not currently published
- Git repository: not yet initialised in this workspace

## 1. Create and connect the repository

Create the `topscore-website` repository in the approved GitHub account or organisation. Initialise Git locally, review the complete file set, commit intentionally, and push a non-production branch first.

Import that repository into Vercel with:

```text
Framework preset: Vite
Build command: npm run build
Output directory: dist
Node.js: 20 or later
```

Use three environments:

- Local: developer `.env.local`
- Preview: Vercel preview environment variables and generated `vercel.app` URLs
- Production: `topscorelearning.com` configuration and production-only credentials

## 2. Configure form delivery

The launch adapter uses the Resend HTTP API. In Resend:

1. Add and verify the intended sending domain.
2. Copy the exact DNS verification records supplied by Resend into Cloudflare.
3. Keep verification records DNS-only.
4. Create a restricted production API key.
5. Use a verified sender such as `Topscore Learning <website@topscorelearning.com>`.

Do not publish the `hello@topscorelearning.com` contact address until inbound email routing exists. Resend delivery handles outbound form notifications; it does not by itself create an inbox for replies.

Required production variables:

```text
VITE_SITE_URL=https://topscorelearning.com
FORM_DELIVERY_PROVIDER=resend
RESEND_API_KEY=<secret>
FORM_FROM_EMAIL=Topscore Learning <website@topscorelearning.com>
FORM_RECIPIENT_GENERAL=<confirmed inbox>
FORM_RECIPIENT_PEER=<confirmed inbox>
FORM_RECIPIENT_ACADEMY=<confirmed inbox>
FORM_RECIPIENT_CONSULTING=<confirmed inbox>
```

Optional Turnstile variables must be configured as a pair:

```text
VITE_TURNSTILE_SITE_KEY=<public site key>
TURNSTILE_SECRET_KEY=<secret>
```

Run `npm run check:deployment` in a production-equivalent environment. Never place `RESEND_API_KEY`, delivery tokens, recipient secrets or the Turnstile secret in a `VITE_` variable.

## 3. Create a preview deployment

Deploy the branch to a Vercel preview URL. Before connecting the public domain, verify:

- Every navigation route and deep link loads directly.
- `/api/enquiry` returns `405` for GET.
- Invalid form data returns `400` with field errors.
- A controlled valid enquiry is received at the configured inbox.
- Reply-to points to the visitor’s supplied address.
- Honeypot and rate-limit behavior is preserved.
- No credential appears in client assets or browser logs.
- Security headers do not block Turnstile or the selected analytics provider.

## 4. Add domains in Vercel

Add both domains to the same Vercel project:

```text
topscorelearning.com
www.topscorelearning.com
```

Set `topscorelearning.com` as primary and configure `www.topscorelearning.com` to redirect permanently to the apex. Use Vercel’s domain inspection output as the authoritative source for DNS values.

Vercel’s current general-purpose records are:

```text
@     A       76.76.21.21
www   CNAME   cname.vercel-dns-0.com
```

Your linked project may provide a project-specific CNAME or verification TXT record. Use those exact values when they differ.

## 5. Configure Cloudflare DNS

The zone is currently delegated to:

```text
pranab.ns.cloudflare.com
penny.ns.cloudflare.com
```

At the time of the Phase 6 audit, the public zone returned no apex A record, `www` CNAME, or MX record.

In Cloudflare DNS:

1. Add the exact apex A record requested by Vercel.
2. Add the exact `www` CNAME requested by Vercel.
3. Add any Vercel ownership-verification TXT record exactly as supplied.
4. Begin with Vercel records set to DNS-only while domain ownership and certificate issuance are verified.
5. Preserve all Resend and future mail-provider TXT, DKIM, SPF, DMARC and MX records.
6. Do not create records for `peer`, `api`, `academy` or other future applications in this deployment.

If Cloudflare proxying is enabled later, retest certificates, redirects, headers, forms and caching end to end. Use Full (strict) TLS and avoid duplicating redirects at both Cloudflare and Vercel.

## 6. Verify DNS and HTTPS

Use the exact values shown by `vercel domains inspect` and verify public resolution:

```bash
dig +short A topscorelearning.com
dig +short CNAME www.topscorelearning.com
curl -I https://topscorelearning.com
curl -I https://www.topscorelearning.com
```

Expected outcomes:

- Apex resolves to the Vercel-provided target.
- `https://topscorelearning.com` returns a successful HTTPS response.
- The certificate is valid for the apex domain.
- `www` redirects once to `https://topscorelearning.com`.
- There are no redirect loops or mixed-content warnings.

## 7. Final production checks

Test at 320, 375, 768, 1024 and 1440 pixels in Chrome, Safari, Firefox and Edge.

Check:

- Header, mobile menu, Products submenu and footer navigation
- Keyboard-only use, focus order, Escape behavior and 200% zoom
- Home, PEER, About, Products, Research, Academy, Consulting and Contact
- All research detail URLs and branded 404 behavior
- General, PEER, Academy and Consulting forms
- Consent, validation, success, failure, honeypot, rate-limit and Turnstile states
- Page titles, canonical URLs, descriptions, social previews and JSON-LD
- `robots.txt`, `sitemap.xml`, favicon and social card
- Core Web Vitals and absence of console errors
- Privacy, terms and cookie wording after legal approval
- Correct company details, credentials, inboxes and approved brand assets

## 8. Release and rollback

Promote the tested preview deployment to production. Keep the previously healthy Vercel deployment available for immediate rollback. If form delivery fails, leave the email fallback visible and roll back before changing DNS or weakening validation controls.
