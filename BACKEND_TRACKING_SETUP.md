# 🚀 دليل إعداد تتبع الحملات والإعلانات المتكامل (UTM, Meta CAPI, Snapchat CAPI & GTM) - Django Backend

يحتوي هذا الملف على التعليمات والخطوات الكاملة لتفعيل تتبع الإعلانات وحملات التسويق (Google Ads, Meta CAPI, Snapchat CAPI, TikTok, UTM Links) مع دعم الـ **Event Deduplication** الكامل وحماية بيانات المرضى (**Zero-PII**) في نظام **Premier Health Clinics**.

---

## 1️⃣ تفعيل تطبيق الـ Analytics في المشروع

تم إنشاء تطبيق Django مستقل وجاهز في المسار:
`backend/analytics/`

يحتوي على:
- `meta_capi.py`: عميل Meta Conversions API (Graph API v21.0) مع تشفير SHA-256 للبيانات.
- `snapchat.py`: عميل Snapchat Conversions API مع دعم `client_dedup_id`.
- `services.py`: خدمة `ConversionService` لإرسال التحويلات المؤكدة فقط وحفظ سجلات التحويل.
- `models.py`: موديل `OfflineConversion` وميكسن `BookingTrackingMixin`.
- `serializers.py`: سيريالايزر `AttributionSerializer` للتحقق وحماية الخصوصية.
- `signals.py`: إشارات تلقائية لإرسال التحويل عند تأكيد الحجز (`confirmed`) أو حضور المريض (`attended`).
- `admin.py`: لوحة تحكم للتحويلات وتحديد مصادر الزيارات بألوان وأيقونات مميزة.

أضف التطبيق إلى `INSTALLED_APPS` في `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    "rest_framework",
    "analytics",  # تطبيق تتبع الإعلانات والتحويلات
    # ...
]
```

---

## 2️⃣ متغيرات البيئة (Environment Variables)

في ملف `.env` الخاص بالباك إند:

```env
# ─── Meta Conversions API ───
META_PIXEL_ID="YOUR_META_PIXEL_ID"
META_CAPI_ACCESS_TOKEN="YOUR_META_SYSTEM_USER_ACCESS_TOKEN"
# كود الاختبار الاختياري من نافذة Test Events في Meta Events Manager:
META_TEST_EVENT_CODE=""

# ─── Snapchat Conversions API ───
SNAP_PIXEL_ID="0c1fb0ef-dbcf-48b6-8a15-755fe9799e2d"
SNAP_CAPI_TOKEN="YOUR_SNAPCHAT_CONVERSIONS_API_TOKEN"
# كود الاختبار الاختياري من Snap Events Manager:
SNAP_TEST_EVENT_CODE=""

# ─── إعداد موديل الحجز ───
BOOKING_MODEL="client.Booking"
```

---

## 3️⃣ تعديل موديل الحجوزات `models.py`

في موديل الحجز (`Booking`)، استخدم `BookingTrackingMixin` أو أضف حقول التتبع:

```python
from django.db import models
from analytics.models import BookingTrackingMixin

class Booking(BookingTrackingMixin, models.Model):
    # الحقول الأساسية للحجز ...
    patient = models.ForeignKey('accounts.Patient', on_delete=models.CASCADE, related_name='bookings')
    doctor = models.ForeignKey('doctors.Doctor', on_delete=models.CASCADE, related_name='bookings')
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE, related_name='bookings')
    branch = models.ForeignKey('branches.Branch', on_delete=models.CASCADE, related_name='bookings')
    date = models.DateField()
    start_time = models.TimeField()
    fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(
        max_length=50,
        choices=[
            ('pending', 'Pending'),
            ('confirmed', 'Confirmed'),
            ('pending_payment', 'Pending Payment'),
            ('cancelled', 'Cancelled'),
            ('completed', 'Completed'),
            ('attended', 'Attended'),
        ],
        default='pending'
    )
```

الحقول المضافة تلقائياً عبر الميكسن:
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `campaign_id`, `adset_id`, `ad_id`
- `gclid`, `gbraid`, `wbraid`, `fbclid`, `ttclid`, `sc_click_id`
- `landing_page`, `referrer`

---

## 4️⃣ تعديل السيريالايزر `serializers.py`

في سيريالايزر إنشاء الحجز:

```python
from rest_framework import serializers
from analytics.serializers import BookingTrackingSerializerMixin, AttributionSerializer
from .models import Booking

class BookingSerializer(BookingTrackingSerializerMixin, serializers.ModelSerializer):
    attribution = AttributionSerializer(required=False, write_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'patient', 'doctor', 'service', 'branch',
            'date', 'start_time', 'end_time', 'status', 'fee',
            'payment_method', 'payment_status',
            'attribution',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at']
```

---

## 5️⃣ آلية منع التكرار (Event Deduplication)

تتم مطابقة الأحداث المرسلة من المتصفح عبر GTM مع الأحداث المرسلة من السيرفر عبر CAPI باستخدام `event_id` موحد:
- في المتصفح (Browser):
  - يتم إرسال `booking_complete` مع `event_id: "booking_123"`.
  - يرسل تاغ Meta في GTM حدث `Purchase` مع `eventID: "booking_123"`.
  - يرسل تاغ Snapchat في GTM حدث `PURCHASE` مع `client_dedup_id: "booking_123"`.
- في السيرفر (Server via CAPI):
  - ترسل دالة `send_booking_conversion` نفس الحدث مع `event_id: "booking_123"` إلى Meta CAPI و Snapchat CAPI.
- النتيجة في المنصات الإعلانية:
  - تقوم خوارزميات Meta و Snapchat بدمج الحدثين تحت تحويل واحد (Merged 1 Conversion)، مما يحسن جودة البيانات ونسبة المطابقة (Event Match Quality) بدون احتساب تحويل مضاعف.

---

## 6️⃣ تطبيق التغييرات في قاعدة البيانات (Migrations)

```bash
python manage.py makemigrations analytics
python manage.py makemigrations
python manage.py migrate
```

---

## 7️⃣ كود تاغ Snapchat Pixel في GTM (Zero-PII)

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
