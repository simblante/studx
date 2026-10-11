// validate.js
// Centralized validation helpers for STUDX forms.
// All functions return `null` if the value is valid, or a user-facing string if not.

// ---------- Email / Auth ----------

// Set this to match ALLOWED_EMAIL_SUFFIX in auth.js.
// Kept separate so validate.js has no dependency on auth.js.
const ALLOWED_EMAIL_SUFFIX = "@ctu.edu.ph";

export function validateEmail(email) {
  const v = String(email || "").trim().toLowerCase();
  if (!v) return "Please enter your school email.";
  // Simple, friendly email shape check.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "That email address doesn't look right.";
  if (!v.endsWith(ALLOWED_EMAIL_SUFFIX))
    return "Use your school email (it should end in " + ALLOWED_EMAIL_SUFFIX + ").";
  return null;
}

export function validatePassword(pw) {
  const v = String(pw || "");
  if (!v) return "Please enter a password.";
  if (v.length < 8) return "Password must be at least 8 characters.";
  if (v.length > 128) return "Password is too long.";
  return null;
}

export function validateConfirmPassword(pw, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (pw !== confirm) return "Passwords do not match.";
  return null;
}

// ---------- Listings / Services ----------

export function validateTitle(title) {
  const v = sanitizeText(title);
  if (!v) return "Please enter a title.";
  if (v.length < 4) return "Title is too short (min 4 characters).";
  if (v.length > 80) return "Title is too long (max 80 characters).";
  return null;
}

export function validateDescription(desc) {
  const v = sanitizeText(desc);
  if (!v) return "Please enter a description.";
  if (v.length < 15) return "Description should be at least 15 characters.";
  if (v.length > 600) return "Description is too long (max 600 characters).";
  return null;
}

export function validatePrice(price) {
  const n = Number(price);
  if (price === "" || isNaN(n)) return "Please enter a valid price.";
  if (n < 0) return "Price cannot be negative.";
  if (n > 1000000) return "Price is too high (max ₱1,000,000).";
  return null;
}

export function validateQuantity(qty) {
  const n = Number(qty);
  if (qty === "" || isNaN(n)) return "Please enter a quantity.";
  if (!Number.isInteger(n)) return "Quantity must be a whole number.";
  if (n < 1) return "Quantity must be at least 1.";
  if (n > 100) return "Quantity is too high (max 100).";
  return null;
}

export function validateCampus(campus) {
  const v = sanitizeText(campus);
  if (!v) return "Please enter your campus.";
  if (v.length < 2) return "Campus name is too short.";
  if (v.length > 80) return "Campus name is too long.";
  return null;
}

export function validateLocation(loc) {
  const v = sanitizeText(loc);
  if (!v) return "Please enter an approximate location.";
  if (v.length < 2) return "Location is too short.";
  if (v.length > 120) return "Location is too long.";
  return null;
}

export function validateAvailability(avail) {
  const v = sanitizeText(avail);
  if (!v) return "Please enter your availability.";
  if (v.length < 2) return "Availability is too short.";
  if (v.length > 80) return "Availability is too long.";
  return null;
}

export function validateCategory(cat) {
  const v = String(cat || "").trim();
  if (!v) return "Please select a category.";
  return null;
}

export function validateCondition(cond) {
  const v = String(cond || "").trim();
  if (!v) return "Please select a condition.";
  return null;
}

export function validatePriceUnit(unit) {
  const v = String(unit || "").trim();
  if (!v) return "Please select a price unit.";
  return null;
}

// ---------- Free text ----------

export function validateMessage(msg, max = 800) {
  const v = String(msg || "");
  if (v.length > max) return "Message is too long (max " + max + " characters).";
  return null;
}

export function validateComment(comment, max = 400) {
  const v = String(comment || "");
  if (v.length > max) return "Comment is too long (max " + max + " characters).";
  return null;
}

export function validateRating(n) {
  const v = Number(n);
  if (isNaN(v)) return "Please choose a rating.";
  if (v < 1 || v > 5) return "Rating must be between 1 and 5.";
  return null;
}

// ---------- Sanitization ----------

// Trims, collapses extra whitespace, and removes null bytes.
// This is NOT a full XSS sanitizer — we rely on textContent in the UI
// (never innerHTML for user data). This just normalizes input.
export function sanitizeText(text) {
  return String(text || "")
    .replace(/\u0000/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Detects a few obvious profanity / spam patterns.
// Used as a soft signal — not a hard block. Admins still moderate.
const BLOCKED_WORDS = [
  "bobo", "tanga", "gago", "ulol", "lintik", // Filipino
  "fuck", "shit", "bitch", "asshole"           // English
];

export function containsProfanity(text) {
  const v = String(text || "").toLowerCase();
  return BLOCKED_WORDS.some(w => v.includes(w));
}

// ---------- Composite validators ----------
// Handy wrappers for common form combinations.

export function validateListingForm(v) {
  return (
    validateTitle(v.title) ||
    validateDescription(v.description) ||
    validateCategory(v.category) ||
    validatePrice(v.price) ||
    validateCondition(v.condition) ||
    validateQuantity(v.quantity) ||
    validateCampus(v.campus) ||
    validateLocation(v.location)
  );
}

export function validateServiceForm(v) {
  return (
    validateTitle(v.title) ||
    validateDescription(v.description) ||
    validateCategory(v.category) ||
    validatePrice(v.price) ||
    validatePriceUnit(v.priceUnit) ||
    validateAvailability(v.availability)
  );
}