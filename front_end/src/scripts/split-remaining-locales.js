const fs = require("fs");
const path = require("path");

const MESSAGES_DIR = path.join(process.cwd(), "src", "messages");
const REMAINING_LOCALES = ["de", "es", "it", "tr"];

const DEFAULT_PROFILE_FALLBACK = {
  title: "Patient Profile",
  subtitle: "Manage your personal information & medical bookings",
  personalInfo: "Personal Information",
  myBookings: "My Bookings",
  medicalHistory: "Medical History",
  updateProfile: "Update Profile",
  saving: "Saving...",
  saveSuccess: "Profile updated successfully!",
  noAppointments: "No previous bookings found.",
  statusConfirmed: "Confirmed",
  statusPending: "Pending",
  statusCompleted: "Completed",
  statusCancelled: "Cancelled"
};

function splitRemaining() {
  console.log("✂️ Splitting remaining locales (de, es, it, tr) into modular namespace files...");

  REMAINING_LOCALES.forEach((locale) => {
    const sourceFile = path.join(MESSAGES_DIR, `${locale}.json`);
    if (!fs.existsSync(sourceFile)) {
      console.warn(`File missing: ${sourceFile}`);
      return;
    }

    try {
      const content = JSON.parse(fs.readFileSync(sourceFile, "utf-8"));
      const localeTargetDir = path.join(MESSAGES_DIR, locale);

      if (!fs.existsSync(localeTargetDir)) {
        fs.mkdirSync(localeTargetDir, { recursive: true });
      }

      if (!content.Profile) {
        content.Profile = DEFAULT_PROFILE_FALLBACK;
      }

      let splitCount = 0;
      for (const [key, value] of Object.entries(content)) {
        if (!key || typeof value !== "object" || value === null) continue;

        const targetPath = path.join(localeTargetDir, `${key}.json`);
        fs.writeFileSync(targetPath, JSON.stringify(value, null, 2) + "\n", "utf-8");
        splitCount++;
      }

      console.log(`✅ ${locale}: Created ${splitCount} modular files under src/messages/${locale}/`);
    } catch (err) {
      console.error(`Error processing ${locale}.json:`, err);
    }
  });

  console.log("🎉 All remaining locales split successfully!");
}

splitRemaining();
