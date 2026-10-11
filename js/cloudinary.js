// cloudinary.js
// Client-side image upload to Cloudinary using an unsigned upload preset.
//
// SETUP REQUIRED (see README):
//   1. Create a free Cloudinary account at cloudinary.com
//   2. Create an UNSIGNED upload preset in Settings → Upload → Upload presets
//   3. Fill in CLOUD_NAME and UPLOAD_PRESET below.
//
// SECURITY NOTE:
//   Unsigned uploads are intentionally public — anyone with the preset name
//   could upload to your Cloudinary account. For the STUDX MVP this is fine
//   because we validate file types and sizes on the client. For production,
//   switch to SIGNED uploads via a backend / Cloud Function.

// ---------- Configuration ----------
// Replace these two values with your own from the Cloudinary dashboard.
const CLOUD_NAME = "sfxzxe6w";   // e.g. "dxxxxxxx"
const UPLOAD_PRESET = "studx_unsigned";    // e.g. "studx_unsigned"

// Upload endpoint — Cloudinary accepts unsigned POSTs to this URL.
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

// Max file size in bytes (5 MB). Cloudinary's own limits are higher, but we
// keep it small so student uploads stay fast and cheap.
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed image MIME types.
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// ---------- Validation ----------

// Returns null if the file is a valid image, or a user-facing message if not.
export function validateImage(file) {
  if (!file) return "Please choose an image.";
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG, PNG, WEBP, or GIF images are allowed.";
  }
  if (file.size > MAX_FILE_SIZE) {
    return "Image is too large. Max size is 5 MB.";
  }
  return null;
}

// ---------- Upload ----------

// Uploads a File to Cloudinary and returns the secure URL.
// Throws { userMessage } on validation or network failure.
export async function uploadImage(file) {
  const problem = validateImage(file);
  if (problem) throw { userMessage: problem };

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  let response;
  try {
    response = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData
    });
  } catch (err) {
    console.error("Cloudinary network error:", err);
    throw { userMessage: "Could not upload the image. Check your internet connection and try again." };
  }

  if (!response.ok) {
    let detail = "";
    try {
      const errBody = await response.json();
      detail = errBody?.error?.message || "";
    } catch { /* ignore */ }
    console.error("Cloudinary upload failed:", response.status, detail);
    throw { userMessage: "Image upload failed. Please try a different image." };
  }

  const data = await response.json();
  if (!data || !data.secure_url) {
    throw { userMessage: "Image upload did not return a URL. Please try again." };
  }

  // Return just the secure URL. If you also want the public_id (for deletion),
  // use the object below instead.
  return {
    url: data.secure_url,
    publicId: data.public_id,
    width: data.width,
    height: data.height,
    format: data.format,
    bytes: data.bytes
  };
}

// ---------- Delete (requires a signed request in production) ----------
//
// Deleting from Cloudinary requires an authenticated (signed) request which
// needs the API secret. That is NOT safe to do from the browser.
//
// For the STUDX MVP we simply stop displaying an image by removing its URL
// from the Firestore document. The file stays in Cloudinary storage.
//
// A production version would call a Cloud Function that signs the delete
// request with the API secret.

// ---------- URL helpers ----------

// Build an optimized, responsive URL from a Cloudinary secure URL.
// Inserts transformation parameters into the delivery URL so images are
// resized and served in modern formats automatically.
//
// Example:
//   original: https://res.cloudinary.com/demo/image/upload/v123/studx/photo.jpg
//   optimized: https://res.cloudinary.com/demo/image/upload/c_fill,w_600,h_450,q_auto,f_auto/v123/studx/photo.jpg
export function buildThumbUrl(secureUrl, width = 600, height = 450) {
  if (!secureUrl || typeof secureUrl !== "string") return "";
  // Only rewrite Cloudinary URLs; leave any other URL untouched.
  if (!secureUrl.includes("/image/upload/")) return secureUrl;
  return secureUrl.replace(
    "/image/upload/",
    `/image/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`
  );
}

export function buildHeroUrl(secureUrl, width = 1200) {
  if (!secureUrl || typeof secureUrl !== "string") return "";
  if (!secureUrl.includes("/image/upload/")) return secureUrl;
  return secureUrl.replace(
    "/image/upload/",
    `/image/upload/c_limit,w_${width},q_auto,f_auto/`
  );
}