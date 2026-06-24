# Domain Migration: IONOS → INWX

Goal: move the **registration** of `simon-stieber.de` from IONOS to **INWX**.
This is a registrar-only change. Hosting and DNS are unaffected.

> ✅ **STATUS: domain transfer COMPLETE (2026-06-24).** INWX received the ACK
> from IONOS (€4,65 paid). Post-transfer verification passed: nameservers still
> Cloudflare, apex/`www`/MX/`walchensee` records intact, site returns HTTP 200.
>
> ✅ **IONOS email cancellation CONFIRMED (2026-06-24).** Contract
> **85864439 (IONOS Mail Basic 1)** cancelled by phone; IONOS confirmed in
> writing, effective **21.07.2026**. (Self-service was blocked: online wizard
> looped even incognito, `vertrag@ionos.de` bounced, chat refused — phone-only.)
> Before 21.07.2026: download any needed invoices from mein.ionos.de/invoices
> (access lost afterward). Migration fully complete.

> Target registrar: **INWX** (existing account; `s1st.de` already registered
> there since 2025-05-31). INWX is a German registrar with full `.de` support.

## Current setup (as of 2026-06-24)

| Layer | Provider | Notes |
|-------|----------|-------|
| Domain registration | **IONOS** | the only thing being moved |
| DNS (nameservers) | **Cloudflare** | `chance.ns.cloudflare.com`, `kallie.ns.cloudflare.com` |
| Web hosting | **GitHub Pages** | repo `s1st`, custom domain pinned via `CNAME` |
| Email | **Cloudflare Email Routing** | `route1/2/3.mx.cloudflare.net` |

Because DNS already lives at **Cloudflare** (not IONOS), the DNS zone does **not**
move and nothing needs to be recreated. The subdomain
`walchensee.simon-stieber.de` (Walchensee Oracle, on Google Cloud Run) is also
served from this same Cloudflare zone and is likewise unaffected.

### Live DNS inventory (snapshot)

```
# Nameservers
chance.ns.cloudflare.com
kallie.ns.cloudflare.com

# Apex A records (GitHub Pages)
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153

# Apex AAAA records (GitHub Pages)
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153

# www
www  CNAME  s1st.github.io.

# Mail (Cloudflare Email Routing)
MX  9   route1.mx.cloudflare.net.
MX  22  route2.mx.cloudflare.net.
MX  97  route3.mx.cloudflare.net.

# TXT
"v=spf1 include:_spf.mx.cloudflare.net ~all"
"google-site-verification=8YDXwI2qywoinZONtWChhVySehV2DDhPuI9bsKDCj8U"
```

(These are managed at Cloudflare and stay in place through the transfer.)

## Migration steps (registrar transfer only)

1. **At IONOS (losing registrar):**
   - Unlock the domain for transfer.
   - Request the **AuthInfo code** (DENIC auth code for `.de`).
   - Confirm the registrant (owner) contact email is current — DENIC/registrar
     may send a confirmation there.
2. **At INWX (gaining registrar):**
   - Start the transfer (Domains → Transfer) with the domain + AuthInfo code;
     pay the fee (usually includes +1 year).
   - `.de` transfers are typically fast (hours) once the code is accepted.
   - **Set/keep the nameservers to Cloudflare** (`chance.ns.cloudflare.com` /
     `kallie.ns.cloudflare.com`). Do not let INWX apply its own default NS, or
     DNS + email will break. INWX lets you set external nameservers per domain.
3. **After transfer:**
   - Confirm nameservers still point to Cloudflare.
   - Spot-check: site loads over HTTPS, `walchensee.simon-stieber.de` resolves,
     test email delivery.

## IONOS email products (dormant — verify before canceling)

The IONOS account still has **paid email products** configured, but they are
**dormant**: the live MX points to Cloudflare (`route1/2/3.mx.cloudflare.net`),
not IONOS, so incoming mail to `@simon-stieber.de` is handled by **Cloudflare
Email Routing** — not these IONOS settings.

**Verified state (2026-06-24).** Cloudflare Email Routing for `simon-stieber.de`
is Enabled; live routing rules:
- `hi@simon-stieber.de` → `simon.stieber@gmail.com` — **Active** ✅
- `info@simon-stieber.de` → `simon.stieber@gmail.com` — **Active** ✅
- Catch-all → Drop — **Disabled**

The IONOS `mail@` (Mail Basic mailbox) and `wohnung@` (forwarding) are **not**
mirrored in Cloudflare. Because MX points only to Cloudflare and catch-all is
disabled (Drop), mail to `mail@`/`wohnung@` is already rejected — they have been
dead since MX moved to Cloudflare. These were **leftovers from an earlier,
unfinished migration attempt** and are intentionally not needed.

Conclusion: **canceling the IONOS email products breaks nothing that works** —
all live mail (`hi@`, `info@`) already flows through Cloudflare. No Cloudflare
changes required. The only thing cancellation destroys is any old mail still in
the IONOS `mail@` mailbox; not wanted here, so no export needed.

These email products are **separate subscriptions** from the domain — canceling
them is independent of the domain transfer and likely saves money.

### Recommended order

1. ~~Verify Cloudflare Email Routing rules~~ — done (2026-06-24): `hi@`/`info@`
   covered; `mail@`/`wohnung@` intentionally dropped. No action needed.
2. ~~Export the `mail@` IONOS mailbox~~ — not wanted.
3. Transfer the domain to INWX (AuthCode; no cancellation needed — see above).
4. Cancel the IONOS email products (and any leftover IONOS package contract).

## What does NOT change

- The `CNAME` file in this repo (`simon-stieber.de`) — leave as-is.
- `.github/workflows/static.yml` — GitHub Pages deploy is unaffected.
- The Cloudflare DNS zone — no records to recreate.

## Gotchas

- Don't transfer within 60 days of the last registration/transfer.
- Don't transfer right before expiry.
- A registrar transfer does **not** move the Cloudflare zone; that's a separate
  thing and you are not changing it.
