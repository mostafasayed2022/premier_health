# GTM Setup Guide — Premier Health Clinics
## Container ID: `GTM-NHV29W2S`

> **CLIENT / MEDIA BUYER ACTION REQUIRED**: All configuration below must be configured inside the Google Tag Manager container `GTM-NHV29W2S`.
> The Next.js frontend pushes clean business events with deduplication IDs to `window.dataLayer`. GTM consumes these events and triggers GA4, Meta Pixel, and Snapchat Pixel tags.

---

## 1. GTM Container Summary

| Parameter | Configuration |
|---|---|
| Container ID | `GTM-NHV29W2S` (configurable via `NEXT_PUBLIC_GTM_ID`) |
| Container Type | Web |
| Frontend Status | ✅ Mounted globally in `src/app/[locale]/layout.tsx` |
| Zero-PII Policy | ✅ Enforced: All PII blocked before entering dataLayer |
| Deduplication Key | `event_id` (matches server-side Meta CAPI & Snapchat CAPI) |

---

## 2. Data Layer Variables

In GTM, navigate to **Variables → User-Defined Variables → New → Data Layer Variable** and create:

| Variable Name in GTM | Data Layer Variable Name | Description |
|---|---|---|
| `dlv.event_id` | `event_id` | Deduplication key (`booking_123` or `purchase_XYZ`) |
| `dlv.price` | `price` | Price/value of service or booking |
| `dlv.value` | `value` | Monetary value |
| `dlv.currency` | `currency` | Currency code (default: `EGP`) |
| `dlv.service_id` | `service_id` | Service ID |
| `dlv.service_name` | `service_name` | Service title |
| `dlv.service_category`| `service_category` | Service department or category |
| `dlv.branch_id` | `branch_id` | Branch ID |
| `dlv.branch_name` | `branch_name` | Branch location title |
| `dlv.booking_id` | `booking_id` | Confirmed booking ID |
| `dlv.transaction_id` | `transaction_id` | Payment gateway transaction ID |
| `dlv.booking_source` | `booking_source` | Entry funnel or wizard origin |
| `dlv.lead_type` | `lead_type` | Lead categorization |
| `dlv.cta_position` | `cta_position` | Button position (e.g. `sticky_mobile`, `footer`, `nav_topbar`) |
| `dlv.phone_type` | `phone_type` | Contact destination |
| `dlv.page_path` | `page_path` | Relative URL path |
| `dlv.location` | `location` | URL or section location |

> ⚠️ **Zero-PII Rule**: NEVER create GTM variables for `name`, `email`, `phone`, `diagnosis`, or medical history.

---

## 3. Custom Event Triggers

In GTM, navigate to **Triggers → New → Custom Event**:

| Trigger Name | Event Name | Use Case |
|---|---|---|
| `CE - view_service` | `view_service` | User views service details |
| `CE - select_branch` | `select_branch` | User chooses a clinic branch |
| `CE - view_branch` | `view_branch` | User views branch page |
| `CE - click_map` | `click_map` | User clicks map navigation |
| `CE - click_whatsapp` | `click_whatsapp` | User clicks WhatsApp CTA |
| `CE - click_call` | `click_call` | User clicks Phone/Call CTA |
| `CE - start_booking` | `start_booking` | User advances into booking flow |
| `CE - submit_lead` | `submit_lead` | User reaches contact lead step |
| `CE - booking_complete` | `booking_complete` | Booking API returns success (201) |
| `CE - appointment_attended` | `appointment_attended` | Patient physically attended |
| `CE - purchase` | `purchase` | Confirmed payment success |

---

## 4. Snapchat Pixel Setup

### A. Snapchat Base Tag (All Pages)
- **Tag Type**: Custom HTML
- **Tag Name**: `Snapchat - Base Code`
- **Trigger**: `All Pages` (or `Initialization - All Pages`)
- **Pixel ID**: `0c1fb0ef-dbcf-48b6-8a15-755fe9799e2d`
- **HTML Code**:
```html
<!-- Snap Pixel Code -->
<script type="text/javascript">
(function(e,t,n){
  if(e.snaptr)return;
  var a=e.snaptr=function(){
    a.handleRequest
      ? a.handleRequest.apply(a,arguments)
      : a.queue.push(arguments)
  };
  a.queue=[];

  var s='script';
  var r=t.createElement(s);
  r.async=!0;
  r.src=n;

  var u=t.getElementsByTagName(s)[0];
  u.parentNode.insertBefore(r,u);
})(window,document,'https://sc-static.net/scevent.min.js');

snaptr('init', '0c1fb0ef-dbcf-48b6-8a15-755fe9799e2d');

snaptr('track', 'PAGE_VIEW');
</script>
<!-- End Snap Pixel Code -->
```

### B. Snapchat Event Tags

#### 1. Snap View Content
- **Tag Type**: Custom HTML
- **Trigger**: `CE - view_service`
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'VIEW_CONTENT', {
      item_ids: [{{dlv.service_id}}],
      item_category: {{dlv.service_category}},
      price: {{dlv.price}},
      currency: {{dlv.currency}} || 'EGP'
    });
  }
</script>
```

#### 2. Snap Start Checkout
- **Tag Type**: Custom HTML
- **Trigger**: `CE - start_booking`
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'START_CHECKOUT', {
      item_ids: [{{dlv.service_id}}]
    });
  }
</script>
```

#### 3. Snap Lead (Sign Up)
- **Tag Type**: Custom HTML
- **Trigger**: `CE - submit_lead`
- **Standard Event**: `SIGN_UP` (Official Snapchat standard event for booking forms / leads)
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'SIGN_UP', {
      item_ids: [{{dlv.service_id}}]
    });
  }
</script>
```

#### 4. Snap Purchase (Booking Complete) — With Deduplication
- **Tag Type**: Custom HTML
- **Trigger**: `CE - booking_complete`
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'PURCHASE', {
      price: {{dlv.price}} || {{dlv.value}} || 0,
      currency: {{dlv.currency}} || 'EGP',
      transaction_id: String({{dlv.booking_id}}),
      client_dedup_id: String({{dlv.event_id}})
    });
  }
</script>
```

#### 5. Snap Purchase (Paid Checkout)
- **Tag Type**: Custom HTML
- **Trigger**: `CE - purchase`
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'PURCHASE', {
      price: {{dlv.value}} || {{dlv.price}} || 0,
      currency: {{dlv.currency}} || 'EGP',
      transaction_id: String({{dlv.transaction_id}}),
      client_dedup_id: String({{dlv.event_id}})
    });
  }
</script>
```

#### 6. Snap Contact (WhatsApp & Phone Call)
- **Tag Type**: Custom HTML
- **Trigger**: `CE - click_whatsapp`, `CE - click_call`
- **HTML**:
```html
<script>
  if (window.snaptr) {
    window.snaptr('track', 'CUSTOM_EVENT_1', {
      event_tag: {{dlv.cta_position}} || 'contact'
    });
  }
</script>
```

---

## 5. Meta (Facebook) Pixel Setup

### A. Meta Base Tag (All Pages)
- **Tag Type**: Custom HTML
- **Tag Name**: `Meta Pixel - Base Code`
- **Trigger**: `All Pages`
- **HTML**:
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_META_PIXEL_ID');
fbq('track', 'PageView');
</script>
<!-- End Meta Pixel Code -->
```

### B. Meta Event Tags (With Deduplication)

#### 1. Meta ViewContent
- **Tag Type**: Custom HTML
- **Trigger**: `CE - view_service`
- **HTML**:
```html
<script>
  if (window.fbq) {
    fbq('track', 'ViewContent', {
      content_ids: [{{dlv.service_id}}],
      content_name: {{dlv.service_name}},
      content_type: 'service',
      value: {{dlv.price}},
      currency: {{dlv.currency}} || 'EGP'
    });
  }
</script>
```

#### 2. Meta InitiateCheckout
- **Tag Type**: Custom HTML
- **Trigger**: `CE - start_booking`
- **HTML**:
```html
<script>
  if (window.fbq) {
    fbq('track', 'InitiateCheckout', {
      content_ids: [{{dlv.service_id}}],
      content_type: 'service'
    });
  }
</script>
```

#### 3. Meta Lead
- **Tag Type**: Custom HTML
- **Trigger**: `CE - submit_lead`
- **HTML**:
```html
<script>
  if (window.fbq) {
    fbq('track', 'Lead', {
      content_ids: [{{dlv.service_id}}],
      content_category: {{dlv.lead_type}}
    });
  }
</script>
```

#### 4. Meta Purchase (Booking Complete) — Deduplicated
- **Tag Type**: Custom HTML
- **Trigger**: `CE - booking_complete`
- **HTML**:
```html
<script>
  if (window.fbq) {
    fbq('track', 'Purchase', {
      value: {{dlv.price}} || {{dlv.value}} || 0,
      currency: {{dlv.currency}} || 'EGP',
      content_type: 'service',
      content_ids: [{{dlv.service_id}}],
      order_id: String({{dlv.booking_id}})
    }, {
      eventID: String({{dlv.event_id}})
    });
  }
</script>
```

#### 5. Meta Contact (WhatsApp & Call)
- **Tag Type**: Custom HTML
- **Trigger**: `CE - click_whatsapp`, `CE - click_call`
- **HTML**:
```html
<script>
  if (window.fbq) {
    fbq('track', 'Contact', {
      content_name: {{dlv.cta_position}}
    });
  }
</script>
```

---

## 6. GA4 Event Tags

| Event Name | GA4 Standard Event | Parameters | Trigger |
|---|---|---|---|
| `view_service` | `view_item` | `items`: `[{ item_id: {{dlv.service_id}}, item_name: {{dlv.service_name}}, price: {{dlv.price}} }]` | `CE - view_service` |
| `select_branch` | `select_content` | `content_type`: `'branch'`, `item_id`: `{{dlv.branch_id}}` | `CE - select_branch` |
| `click_whatsapp` | `click_whatsapp` | `cta_position`: `{{dlv.cta_position}}`, `phone_type`: `{{dlv.phone_type}}` | `CE - click_whatsapp` |
| `click_call` | `click_call` | `cta_position`: `{{dlv.cta_position}}`, `phone_type`: `{{dlv.phone_type}}` | `CE - click_call` |
| `start_booking` | `begin_checkout` | `booking_source`: `{{dlv.booking_source}}`, `items`: `[{ item_id: {{dlv.service_id}} }]` | `CE - start_booking` |
| `submit_lead` | `generate_lead` | `lead_type`: `{{dlv.lead_type}}`, `source`: `booking_wizard` | `CE - submit_lead` |
| `booking_complete` | `booking_complete` | `booking_id`: `{{dlv.booking_id}}`, `value`: `{{dlv.price}}`, `currency`: `{{dlv.currency}}` | `CE - booking_complete` |
| `purchase` | `purchase` | `transaction_id`: `{{dlv.transaction_id}}`, `value`: `{{dlv.value}}`, `currency`: `{{dlv.currency}}` | `CE - purchase` |

---

## 7. How Deduplication Works (Browser + Server)

For every confirmed conversion:
1. **Frontend (Browser)**:
   - When API returns 201 Created with booking ID (e.g. `83921`), `booking_complete` is pushed to `dataLayer` with `event_id: "booking_83921"`.
   - GTM Meta Tag sends `Purchase` with `{ eventID: "booking_83921" }`.
   - GTM Snap Tag sends `PURCHASE` with `{ client_dedup_id: "booking_83921" }`.
2. **Django Backend (Server)**:
   - When booking is committed to the database, `ConversionService.send_booking_conversion` triggers.
   - Meta CAPI sends `Purchase` with `"event_id": "booking_83921"`.
   - Snapchat CAPI sends `PURCHASE` with `"client_dedup_id": "booking_83921"`.
3. **Ad Platforms Matching**:
   - Meta Events Manager detects identical `event_name` and `eventID`, merging the browser event and server event into **1 single conversion**.
   - Snapchat Events Manager detects identical `client_dedup_id` and dedupes automatically.

---

## 8. Verification Checklist

1. **GTM Preview**:
   - Enable GTM Preview mode.
   - Navigate to `/gcc/iv-therapy/ar?utm_source=snapchat&utm_medium=cpc&utm_campaign=summer&sc_click_id=test_123`.
   - Verify `Snapchat - Base Code` fires `PAGE_VIEW`.
2. **View Service**:
   - Navigate to any service page.
   - Verify `view_service` fires in dataLayer with `service_id`, `price`, `currency`.
   - Verify Meta `ViewContent` and Snap `VIEW_CONTENT` tags fire.
3. **Submit Booking**:
   - Complete booking wizard.
   - Verify `booking_complete` fires ONLY on 201 success.
   - Check `event_id` is formatted as `booking_<ID>`.
   - Verify Meta `Purchase` and Snap `PURCHASE` tags fire with `event_id`.
4. **Server Verification**:
   - Check Django logs for `Meta CAPI event 'Purchase' sent successfully` and `Snapchat CAPI event 'PURCHASE' sent successfully`.
   - In Meta Events Manager → Test Events tab: confirm deduplication badge shows **"Browser + Server"** merged.
