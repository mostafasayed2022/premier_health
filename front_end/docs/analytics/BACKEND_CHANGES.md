# Backend Changes & Deployment Guide — Premier Health Clinics Analytics

## Overview

A dedicated, modular Django application `backend/analytics` has been created.
It handles:
- **Meta Conversions API (CAPI)** with SHA-256 PII hashing.
- **Snapchat Conversions API (CAPI)** with `client_dedup_id`.
- **Event Deduplication** matching browser `event_id`.
- **Offline Conversion Tracking** via `OfflineConversion` model.
- **UTM & Click ID Attribution** on Bookings.

---

## 1. Add `analytics` to `INSTALLED_APPS`

In `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    "rest_framework",
    "analytics",  # Add analytics app
    # ...
]
```

---

## 2. Environment Variables & Settings

Add the following to your backend `.env` file or `settings.py`:

```env
# ─── Meta Conversions API ───
META_PIXEL_ID="YOUR_META_PIXEL_ID"
META_CAPI_ACCESS_TOKEN="YOUR_META_SYSTEM_USER_TOKEN"
# Optional test event code from Meta Events Manager "Test Events" tab:
META_TEST_EVENT_CODE=""

# ─── Snapchat Conversions API ───
SNAP_PIXEL_ID="0c1fb0ef-dbcf-48b6-8a15-755fe9799e2d"
SNAP_CAPI_TOKEN="YOUR_SNAPCHAT_CONVERSIONS_API_TOKEN"
# Optional test event code from Snap Events Manager:
SNAP_TEST_EVENT_CODE=""

# ─── Model Configuration ───
BOOKING_MODEL="client.Booking"  # Point to your active Booking model
```

In `settings.py`:

```python
import os

META_PIXEL_ID = os.environ.get("META_PIXEL_ID", "")
META_CAPI_ACCESS_TOKEN = os.environ.get("META_CAPI_ACCESS_TOKEN", "")
META_TEST_EVENT_CODE = os.environ.get("META_TEST_EVENT_CODE", None)

SNAP_PIXEL_ID = os.environ.get("SNAP_PIXEL_ID", "0c1fb0ef-dbcf-48b6-8a15-755fe9799e2d")
SNAP_CAPI_TOKEN = os.environ.get("SNAP_CAPI_TOKEN", "")
SNAP_TEST_EVENT_CODE = os.environ.get("SNAP_TEST_EVENT_CODE", None)

BOOKING_MODEL = "client.Booking"
```

---

## 3. Booking Model — Add Attribution Fields

In your existing `Booking` model (`client/models.py` or `bookings/models.py`), inherit from `BookingTrackingMixin` or add the fields directly:

```python
from analytics.models import BookingTrackingMixin

class Booking(BookingTrackingMixin, models.Model):
    # Your existing booking fields (patient, doctor, service, branch, date, status, fee, etc.)
    pass
```

Or add the fields manually:

```python
# ─── Attribution & Platform Click IDs ───
utm_source = models.CharField(max_length=255, blank=True, null=True, db_index=True)
utm_medium = models.CharField(max_length=255, blank=True, null=True)
utm_campaign = models.CharField(max_length=255, blank=True, null=True, db_index=True)
utm_content = models.CharField(max_length=255, blank=True, null=True)
utm_term = models.CharField(max_length=255, blank=True, null=True)

campaign_id = models.CharField(max_length=150, blank=True, null=True)
adset_id = models.CharField(max_length=150, blank=True, null=True)
ad_id = models.CharField(max_length=150, blank=True, null=True)

gclid = models.CharField(max_length=255, blank=True, null=True, db_index=True)
gbraid = models.CharField(max_length=255, blank=True, null=True)
wbraid = models.CharField(max_length=255, blank=True, null=True)
fbclid = models.CharField(max_length=255, blank=True, null=True, db_index=True, help_text="Meta / Facebook Click ID")
ttclid = models.CharField(max_length=255, blank=True, null=True, help_text="TikTok Click ID")
sc_click_id = models.CharField(max_length=255, blank=True, null=True, db_index=True, help_text="Snapchat Click ID (sc_click_id / sccid)")

landing_page = models.CharField(max_length=2000, blank=True, null=True)
referrer = models.CharField(max_length=2000, blank=True, null=True)
```

---

## 4. Booking Serializer

In your booking serializer (`client/serializers.py`):

```python
from analytics.serializers import BookingTrackingSerializerMixin, AttributionSerializer

class BookingCreateSerializer(BookingTrackingSerializerMixin, serializers.ModelSerializer):
    # Optional nested attribution object accepted from frontend
    attribution = AttributionSerializer(required=False, write_only=True)

    class Meta:
        model = Booking
        fields = [
            "id", "doctor", "service", "branch", "date", "start_time",
            "payment_method", "fee", "status",
            "attribution",
            # ... your other fields
        ]
```

---

## 5. Run Database Migrations

Run in the backend project directory:

```bash
python manage.py makemigrations analytics
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Verification & Server-Side Conversions Test

After creating a booking in the frontend:
1. Check Django logs:
   ```
   [INFO] Meta CAPI event 'Purchase' sent successfully (event_id=booking_123)
   [INFO] Snapchat CAPI event 'PURCHASE' sent successfully (client_dedup_id=booking_123)
   ```
2. Check Django Admin under **Offline Conversions**:
   - Verify entry exists with `event_name = booking_complete` and `status = sent`.
3. In **Meta Events Manager** and **Snapchat Events Manager**:
   - Both browser event and server event will be merged under the same conversion using `event_id = booking_123`.
