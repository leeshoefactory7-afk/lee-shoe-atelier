# Make Order Emails Actually Arrive (FormSubmit)

## What the "Rate limit exceeded" error means

When an order is placed, the site does two things:

1. Saves the order in the database (this works — that is why orders show in the admin panel).
2. Posts the order details to `https://formsubmit.co/ajax/info@leeshoefactory.com` so FormSubmit forwards it to your inbox.

Step 2 is being refused. The server log shows:

```text
[formsubmit] order email failed 429
{"success":false,"message":"Rate limit exceeded. Please try again later."}
```

`429` is the HTTP status for "too many requests". FormSubmit is not rejecting the
content of your order — it is refusing to accept the request at all, so no email
is ever generated.

Why it happens here specifically:

- FormSubmit's free tier throttles **per sending IP address**, not per form or per
  recipient. Right now the request is sent from the app's server (a Cloudflare
  Worker), whose outbound IP is shared with a large number of other sites. Those
  other sites' submissions burn through the quota, so your order hits the limit
  even on your first attempt of the day.
- FormSubmit also expects submissions to look like they came from a real browser
  form on your domain. Server-to-server posts with no real browser origin are
  treated as suspicious traffic and get throttled harder.
- The limit is time-windowed. It clears on its own after a while, which is why an
  occasional email may sneak through and then stop again — it is intermittent by
  nature, not a permanent block.

Important: the failure is silent to the customer. The order still saves and the
success page still shows, so nothing looks broken from the outside.

## Fix

Send the FormSubmit request **from the customer's browser** instead of from the
server. Each customer has their own IP, so the shared-server throttle disappears,
and the request carries a genuine browser origin from your domain.

Flow after the change:

```text
Checkout submit
  -> save order to database (unchanged, still appears in admin panel)
  -> browser posts order details to FormSubmit
       success -> done
       429/failure -> retry once after a short pause
       still failing -> server-side attempt as a backup
  -> redirect to order success page (always, regardless of email outcome)
```

Both paths keep working: the order is always in the admin panel, and the email is
attempted through the path most likely to succeed.

Additionally:

- Record whether the notification succeeded on the order row, and show an
  "email not delivered" flag in the admin orders list so you can spot any order
  that did not reach your inbox instead of finding out by accident.
- Add a "Resend notification" button on the admin order view to re-fire the email
  for any order that failed.

## Technical notes

- Move the FormSubmit call out of `submitOrder` in `src/lib/orders.functions.ts`
  into a small client helper (`src/lib/notify-order.ts`) invoked from
  `src/routes/checkout.tsx` after `submitOrder` resolves.
- Keep the existing payload shape (`_subject`, `_template: "table"`,
  `_captcha: "false"`, flattened `items` string) — that part is already correct.
- Retry policy: one immediate attempt, one retry after ~2s on a 429, then fall
  back to the existing server-side call. Never block the redirect on it.
- Persist the outcome via a small server function updating a new
  `notified_at` / `notify_error` column on `orders` (migration with GRANTs and
  admin-only update policy).

## Longer term

FormSubmit's free tier will always be an unreliable relay for a live store. Once
your sender domain is verified, order emails can go out from
`info@leeshoefactory.com` directly with no third-party throttle and proper
deliverability. This plan does not depend on that — it makes FormSubmit work
today — but it remains the durable option.
