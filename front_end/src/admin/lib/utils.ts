// admin/lib/utils.ts

/**
 * Format raw model field names and schema labels into polished, professional titles.
 */
export function formatFieldLabel(name: string, label: string): string {
  const mapping: Record<string, string> = {
    id: "ID",
    name: "Name",
    name_ar: "Name (Arabic)",
    title: "Title",
    title_ar: "Title (Arabic)",
    description: "Description",
    description_ar: "Description (Arabic)",
    category: "Category",
    category_ar: "Category (Arabic)",
    image_url: "Image URL",
    video_url: "Video URL",
    is_active: "Is Active",
    role: "Role",
    role_ar: "Role (Arabic)",
    text: "Review Content",
    text_ar: "Review Content (Arabic)",
    rating: "Rating (Stars)",
    slug: "Slug URL",
    price: "Price ($)",
    duration_minutes: "Duration (Minutes)",
    default_fee: "Default Fee ($)",
    fee_override: "Fee Override ($)",
    license_number: "Medical License Number",
    phone_number: "Phone Number",
    date_of_birth: "Date of Birth",
    medical_history: "Medical History",
    weekday: "Weekday",
    start_time: "Start Time",
    end_time: "End Time",
    slot_duration_minutes: "Slot Duration (Minutes)",
    customerName: "Customer Name",
    customerPhone: "Customer Phone",
    paymentStatus: "Payment Status",
    paymentMethod: "Payment Method",
    is_verified: "Is Verified Account",
    is_staff: "Is System Staff",
    username: "Username",
    email: "Email Address",
    first_name: "First Name",
    last_name: "Last Name",
    city: "City",
    url: "Google Maps URL",
    address: "Address",
    address_ar: "Address (Arabic)",
    phone: "Phone Number",
    // ── Marketing & Attribution Tracking ──
    utm_source: "UTM Source",
    utm_medium: "UTM Medium",
    utm_campaign: "UTM Campaign",
    utm_content: "UTM Content",
    utm_term: "UTM Term",
    campaign_id: "Campaign ID",
    adset_id: "AdSet ID",
    ad_id: "Ad ID",
    gclid: "Google Click ID (GCLID)",
    gbraid: "GBRAID (iOS App)",
    wbraid: "WBRAID (iOS Web)",
    fbclid: "Facebook Click ID (FBCLID)",
    ttclid: "TikTok Click ID (TTCLID)",
    scclid: "Snapchat Click ID",
    sc_click_id: "Snapchat Click ID",
    landing_page: "Landing Page",
    referrer: "Referrer URL",
  };

  const exactMatch = mapping[name];
  if (exactMatch) return exactMatch;

  const caseMatch = mapping[name.toLowerCase()];
  if (caseMatch) return caseMatch;

  return label || name;
}
