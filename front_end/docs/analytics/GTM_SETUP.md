# GTM Setup Guide — Premier Health Clinics
## Container: GTM-NHV29W2S

> **CLIENT ACTION REQUIRED**: All configuration below must be done inside the GTM account by the client. The frontend code pushes events to `window.dataLayer`. GTM must be configured to consume these events and fire the appropriate tags.

---

## 1. GTM Container

| Setting | Value |
|---|---|
| Container ID | `GTM-NHV29W2S` |
| Container Type | Web |
| Frontend Status | ✅ Already installed (one install, `[locale]/layout.tsx`) |

---

## 2. Data Layer Variables

Create these **Data Layer Variables** in GTM (**Variables → User-Defined Variables → Data Layer Variable**):

| Variable Name | Data Layer Key | Type |
|---|---|---|
| `dlv.event` | `event` | Data Layer Variable |
| `dlv.service_id` | `service_id` | Data Layer Variable |
| `dlv.service_name` | `service_name` | Data Layer Variable |
| `dlv.service_category` | `service_category` | Data Layer Variable |
| `dlv.branch_id` | `branch_id` | Data Layer Variable |
| `dlv.branch_name` | `branch_name` | Data Layer Variable |
| `dlv.booking_id` | `booking_id` | Data Layer Variable |
| `dlv.value` | `value` | Data Layer Variable |
| `dlv.currency` | `currency` | Data Layer Variable |
| `dlv.location` | `location` | Data Layer Variable |
| `dlv.page_path` | `page_path` | Data Layer Variable |
| `dlv.phone_type` | `phone_type` | Data Layer Variable |
| `dlv.cta_position` | `cta_position` | Data Layer Variable |
| `dlv.booking_source` | `booking_source` | Data Layer Variable |
| `dlv.lead_type` | `lead_type` | Data Layer Variable |
| `dlv.transaction_id` | `transaction_id` | Data Layer Variable |

> ⚠️ **DO NOT** create variables for: name, email, phone, address, or any PII fields.

---

## 3. Custom Event Triggers

Create **Custom Event Triggers** for each event (**Triggers → New → Custom Event**):

| Trigger Name | Event Name | Fires On |
|---|---|---|
| `CE - view_service` | `view_service` | All Custom Events |
| `CE - select_branch` | `select_branch` | All Custom Events |
| `CE - view_branch` | `view_branch` | All Custom Events |
| `CE - click_map` | `click_map` | All Custom Events |
| `CE - click_whatsapp` | `click_whatsapp` | All Custom Events |
| `CE - click_call` | `click_call` | All Custom Events |
| `CE - start_booking` | `start_booking` | All Custom Events |
| `CE - submit_lead` | `submit_lead` | All Custom Events |
| `CE - booking_complete` | `booking_complete` | All Custom Events |
| `CE - appointment_attended` | `appointment_attended` | All Custom Events |
| `CE - purchase` | `purchase` | All Custom Events |

---

## 4. GA4 Event Tags

> **CLIENT ACTION REQUIRED**: Configure GA4 Measurement ID in GTM.

For each event, create a **GA4 Event tag** with the corresponding trigger:

### view_service → GA4 view_item
```
Tag Type: Google Analytics: GA4 Event
Event Name: view_item
Parameters:
  items: [{ item_id: {{dlv.service_id}}, item_name: {{dlv.service_name}}, item_category: {{dlv.service_category}} }]
Trigger: CE - view_service
```

### click_whatsapp → GA4 click_whatsapp
```
Tag Type: Google Analytics: GA4 Event
Event Name: click_whatsapp
Parameters:
  cta_position: {{dlv.cta_position}}
  phone_type: {{dlv.phone_type}}
  page_path: {{dlv.page_path}}
Trigger: CE - click_whatsapp
```

### click_call → GA4 click_call
```
Tag Type: Google Analytics: GA4 Event
Event Name: click_call
Parameters:
  cta_position: {{dlv.cta_position}}
  phone_type: {{dlv.phone_type}}
  page_path: {{dlv.page_path}}
Trigger: CE - click_call
```

### start_booking → GA4 begin_checkout
```
Tag Type: Google Analytics: GA4 Event
Event Name: begin_checkout
Parameters:
  booking_source: {{dlv.booking_source}}
  service_name: {{dlv.service_name}}
Trigger: CE - start_booking
```

### submit_lead → GA4 generate_lead
```
Tag Type: Google Analytics: GA4 Event
Event Name: generate_lead
Parameters:
  lead_type: {{dlv.lead_type}}
  service_name: {{dlv.service_name}}
Trigger: CE - submit_lead
```

### booking_complete → GA4 booking_complete
```
Tag Type: Google Analytics: GA4 Event
Event Name: booking_complete
Parameters:
  booking_id: {{dlv.booking_id}}
  service_name: {{dlv.service_name}}
  value: {{dlv.value}}
  currency: {{dlv.currency}}
Trigger: CE - booking_complete
```

### purchase → GA4 purchase
```
Tag Type: Google Analytics: GA4 Event
Event Name: purchase
Parameters:
  transaction_id: {{dlv.transaction_id}}
  value: {{dlv.value}}
  currency: {{dlv.currency}}
Trigger: CE - purchase
```

---

## 5. Google Ads Conversion Tags

> **CLIENT ACTION REQUIRED**: Provide conversion action IDs from Google Ads account.

### Booking Complete Conversion
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [CLIENT TO PROVIDE]
Conversion Label: [CLIENT TO PROVIDE]
Conversion Value: {{dlv.value}}
Currency Code: {{dlv.currency}}
Trigger: CE - booking_complete
```

### Purchase Conversion
```
Tag Type: Google Ads Conversion Tracking
Conversion ID: [CLIENT TO PROVIDE]
Conversion Label: [CLIENT TO PROVIDE]
Conversion Value: {{dlv.value}}
Currency Code: {{dlv.currency}}
Transaction ID: {{dlv.transaction_id}}
Trigger: CE - purchase
```

---

## 6. Meta Pixel Event Mapping

> **CLIENT ACTION REQUIRED**: Install Meta Pixel via GTM using the Pixel ID from Meta Business Manager.

| Frontend Event | Meta Pixel Event |
|---|---|
| `view_service` | `ViewContent` (content_type: service) |
| `click_whatsapp` | `Contact` |
| `click_call` | `Contact` |
| `start_booking` | `InitiateCheckout` |
| `submit_lead` | `Lead` |
| `booking_complete` | `Schedule` |
| `purchase` | `Purchase` (value, currency) |

> ⚠️ **DO NOT** pass PII (email, phone, name) to Meta Pixel via GTM tags. Use server-side Meta CAPI (Conversions API) for hashed PII matching — this is handled by the backend team.

---

## 7. TikTok Pixel Event Mapping

> **CLIENT ACTION REQUIRED**: Install TikTok Pixel via GTM.

| Frontend Event | TikTok Event |
|---|---|
| `view_service` | `ViewContent` |
| `click_whatsapp` | `Contact` |
| `click_call` | `Contact` |
| `start_booking` | `InitiateCheckout` |
| `submit_lead` | `SubmitForm` |
| `booking_complete` | `CompleteRegistration` |
| `purchase` | `CompletePayment` |

---

## 8. Snapchat Pixel Event Mapping

> **CLIENT ACTION REQUIRED**: Install Snapchat Pixel via GTM.

| Frontend Event | Snapchat Event |
|---|---|
| `view_service` | `VIEW_CONTENT` |
| `click_whatsapp` | `CONTACT` |
| `click_call` | `CONTACT` |
| `start_booking` | `START_CHECKOUT` |
| `submit_lead` | `SUBSCRIBE` |
| `booking_complete` | `PURCHASE` |
| `purchase` | `PURCHASE` |

---

## 9. DataLayer Event Examples

### window.dataLayer after page load (no attribution):
```json
[
  { "gtm.start": 1724000000000, "event": "gtm.js" }
]
```

### After WhatsApp click:
```json
{
  "event": "click_whatsapp",
  "location": "/gcc/iv-theropy/ar",
  "page_path": "/gcc/iv-theropy/ar",
  "cta_position": "sticky_mobile",
  "phone_type": "EG"
}
```

### After booking_complete:
```json
{
  "event": "booking_complete",
  "booking_id": "1234",
  "service_id": "2",
  "service_name": "IV Therapy",
  "branch_id": "1",
  "branch_name": "Fairmont Nile City",
  "value": 1200,
  "currency": "EGP"
}
```

---

## 10. Zero-PII Policy

**The following data must NEVER appear in GTM/dataLayer:**
- `name`, `first_name`, `last_name`, `full_name`
- `email`
- `phone`, `phone_number`, `mobile`
- `address`, `street`
- `diagnosis`, `medical_history`, `medical_notes`
- `password`, `ssn`, `national_id`
- `dob`, `date_of_birth`

The frontend sanitizer in `src/lib/analytics/dataLayer.ts` blocks these keys automatically. GTM variable configuration must also respect this policy.

---

## 11. Backend Actions Required

| Action | Who |
|---|---|
| Apply Django migration for attribution fields | Backend team |
| Create `OfflineConversion` model | Backend team |
| Wire `appointment_attended` signal | Backend team |
| Wire `purchase` conversion from Paymob webhook | Backend team |
| Verify Paymob HMAC validation | Backend team |
| Configure Meta CAPI (server-side) | Backend team + Media buyer |
| Provide Google Ads Conversion IDs | Client |
| Provide Meta Pixel ID | Client |
| Provide TikTok Pixel ID | Client |
| Provide Snapchat Pixel ID | Client |
| Configure GA4 Measurement ID in GTM | Client |

---

## 12. Testing Checklist

```bash
# Frontend: Open browser DevTools console
window.dataLayer

# Should see events after interactions:
# click_whatsapp, click_call, start_booking, booking_complete

# Attribution test:
# Visit: /gcc/iv-theropy/ar?utm_source=google&utm_medium=cpc&utm_campaign=test&gclid=test123
# Then check:
sessionStorage.getItem('premier_first_touch_attribution')
sessionStorage.getItem('premier_utm_attribution')
# Should contain parsed attribution object

# Navigate to booking:
# Verify attribution is preserved throughout wizard
# Verify booking_complete fires once after success
# Verify booking_complete does NOT fire after API failure
```
