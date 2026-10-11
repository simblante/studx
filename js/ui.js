// Shared UI helpers: header, toast, friendly errors, form submit wrapper.
import { auth, db } from "../../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { logout } from "./auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

let toastTimer;
export function toast(message) {
  let el = document.getElementById("toast");
  if (!el) { el = document.createElement("div"); el.id = "toast"; el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 3000);
}

// Never show technical errors to normal users.
export function friendlyError(err) {
  const map = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/wrong-password": "Email or password is incorrect.",
    "auth/user-not-found": "Email or password is incorrect.",
    "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
    "auth/weak-password": "Password is too weak. Use at least 8 characters.",
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/network-request-failed": "No internet connection. Check your network and try again.",
    "auth/too-many-requests": "Too many attempts. Please wait a few minutes and try again.",
    "permission-denied": "You don't have permission to do that."
  };
  console.error(err);
  return map[err && (err.code || "")] || "Something went wrong. Please try again.";
}

// Runs an async action with a disabled button and error message area.
// Also prevents double-submits while the action is in flight.
let submitInFlight = false;
export async function handleSubmit(form, action) {
  // Prevent double-submit if another submit is already running on this form.
  if (form.dataset.submitting === "true") return;
  form.dataset.submitting = "true";

  const btn = form.querySelector("button[type=submit]");
  const msg = form.querySelector(".form-msg");

  // Guard: form-msg may not exist on every form.
  if (msg) { msg.textContent = ""; msg.className = "form-msg"; }

  // Guard: button may not exist (rare, but prevents a crash).
  const originalLabel = btn ? btn.textContent : "";
  if (btn) {
    btn.disabled = true;
    btn.textContent = "Please wait...";
  }

  try {
    await action();
  } catch (err) {
    const text = err.userMessage || friendlyError(err);
    if (msg) {
      msg.textContent = text;
      msg.classList.add("error");
    } else {
      // Fall back to a toast if the form has no message area.
      toast(text);
    }
  } finally {
    // Small delay so the button state visibly settles before re-enabling.
    setTimeout(() => {
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalLabel;
      }
      form.dataset.submitting = "false";
    }, 250);
  }
}

// ---------- Basic abuse limits ----------
// Client-side limits to prevent accidental spam. These are NOT a security
// boundary — the real limits should be enforced by Cloud Functions and
// Firestore security rules. This is a UX guard only.

const actionTimestamps = {};  // { key: [timestamp, ...] }

export function checkRateLimit(key, maxPerMinute = 10) {
  const now = Date.now();
  const windowStart = now - 60 * 1000;
  const arr = (actionTimestamps[key] || []).filter(t => t > windowStart);
  if (arr.length >= maxPerMinute) {
    return "You're doing that too fast. Please wait a moment.";
  }
  arr.push(now);
  actionTimestamps[key] = arr;
  return null;
}

// ---------- Header ----------

// SVG logo — identical to the one in index.html so the brand is consistent.
const LOGO_SVG = `
  <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#2F7BFF"/>
    <path d="M16 6 5 11l11 5 11-5-11-5Z" fill="#fff"/>
    <path d="M9 15v5c0 2 3.5 4 7 4s7-2 7-4v-5l-7 3-7-3Z" fill="#fff" opacity=".8"/>
  </svg>
`;

// ---------- ABSOLUTE PATH HELPERS ----------
// These make every header link work from ANY page in the app.
// Root-relative paths (starting with "/") always resolve from the site root,
// so /pages/profile.html is ALWAYS the same file no matter where you are.
const P = {
  home:          "/index.html",
  login:         "/pages/auth/login.html",
  register:      "/pages/auth/register.html",
  profile:       "/pages/profile.html",
  admin:         "/pages/admin.html",
  marketplace:   "/pages/marketplace/marketplace.html",
  services:      "/pages/services/services.html",
  smartmatch:    "/pages/smartmatch.html",
  swaps:         "/pages/transactions/swaps.html",
  transactions:  "/pages/transactions/transactions.html",
  messages:      "/pages/social/messages.html",
  sustainability:"/pages/sustainability.html"
};

export function renderHeader() {
  const nav = document.getElementById("siteHeader");
  if (!nav) return;   // Pages without a header (rare) shouldn't crash.

  nav.className = "nav";
  nav.innerHTML = `
    <a class="logo" href="${P.home}" aria-label="STUDX home">
      ${LOGO_SVG}
      <span style="color: white;">STUD<b>X</b></span>
    </a>
    <div class="nav-cta" id="navAuth"></div>
  `;
  const box = nav.querySelector("#navAuth");

  onAuthStateChanged(auth, async user => {
    if (!user) {
      box.innerHTML = `<a class="btn btn-ghost" href="${P.login}">Log in</a><a class="btn btn-primary" href="${P.register}">Join STUDX</a>`;
      renderBottomNav(false);
      return;
    }

    // ---------- Single profile fetch ----------
    // We fetch the user's profile ONCE and reuse it for both the auto-verify
    // check and the admin check. This avoids two identical Firestore reads.
    let profileData = null;
    try {
      const snap = await getDoc(doc(db, "users", user.uid));
      profileData = snap.exists() ? snap.data() : null;
    } catch (e) {
      console.warn("Could not load profile for header:", e);
    }

    // ---------- Auto-verify student status when email is verified ----------
    // Once the @ctu.edu.ph email is verified, the student status becomes VERIFIED.
    // This runs on every page load (but only writes when needed).
    if (user.emailVerified && profileData?.verificationStatus === "PENDING") {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          verificationStatus: "VERIFIED"
        });
        // Keep the local copy in sync so the admin check below is accurate.
        profileData.verificationStatus = "VERIFIED";
      } catch (e) {
        // Ignore — auto-verify is best-effort. Don't break the header.
        console.warn("Auto-verify skipped:", e);
      }
    }

    const isAdmin = profileData?.role === "admin";
    renderAuthNav(box, isAdmin);
    renderBottomNav(true);
  });
}

function renderAuthNav(box, isAdmin) {
  const adminLink = isAdmin ? `<a class="btn btn-ghost" href="${P.admin}">Admin</a>` : "";

  // Recompute on resize so the layout adapts when the window changes.
  function paint() {
    const w = window.innerWidth;

    if (w <= 640) {
      // Mobile: minimal header — logo + profile + logout.
      // The bottom nav handles primary navigation.
      box.innerHTML = `<a class="btn btn-ghost" href="${P.profile}">Profile</a><button class="btn btn-primary" id="logoutBtn">Log out</button>`;
    } else if (w <= 900) {
      // Tablet: condensed desktop nav — most links in a "More" dropdown.
      box.innerHTML = `
        <a class="btn btn-ghost" href="${P.marketplace}">Marketplace</a>
        <a class="btn btn-ghost" href="${P.services}">Services</a>
        <a class="btn btn-ghost" href="${P.smartmatch}">SmartMatch</a>
        <div class="nav-more">
          <button class="btn btn-ghost nav-more-btn" id="navMoreBtn" aria-haspopup="true" aria-expanded="false">More ▾</button>
          <div class="nav-more-menu" id="navMoreMenu" role="menu">
            <a href="${P.swaps}">Swaps</a>
            <a href="${P.transactions}">Transactions</a>
            <a href="${P.messages}">Messages</a>
            <a href="${P.sustainability}">Impact</a>
            <a href="${P.profile}">Profile</a>
            ${isAdmin ? `<a href="${P.admin}">Admin</a>` : ''}
          </div>
        </div>
        <button class="btn btn-primary" id="logoutBtn">Log out</button>
      `;
      // Wire dropdown.
      const moreBtn = document.getElementById("navMoreBtn");
      const moreMenu = document.getElementById("navMoreMenu");
      if (moreBtn && moreMenu) {
        moreBtn.onclick = (e) => {
          e.stopPropagation();
          const open = moreMenu.classList.toggle("open");
          moreBtn.setAttribute("aria-expanded", open ? "true" : "false");
        };
        // Close on outside click.
        document.addEventListener("click", () => {
          moreMenu.classList.remove("open");
          moreBtn.setAttribute("aria-expanded", "false");
        });
      }
    } else {
      // Desktop: full navigation bar.
      box.innerHTML = `
        <a class="btn btn-ghost" href="${P.marketplace}">Marketplace</a>
        <a class="btn btn-ghost" href="${P.services}">Services</a>
        <a class="btn btn-ghost" href="${P.smartmatch}">SmartMatch</a>
        <a class="btn btn-ghost" href="${P.swaps}">Swaps</a>
        <a class="btn btn-ghost" href="${P.transactions}">Transactions</a>
        <a class="btn btn-ghost" href="${P.messages}">Messages</a>
        <a class="btn btn-ghost" href="${P.sustainability}">Impact</a>
        <a class="btn btn-ghost" href="${P.profile}">Profile</a>
        ${adminLink}
        <button class="btn btn-primary" id="logoutBtn">Log out</button>
      `;
    }

    // Wire logout button.
    const out = document.getElementById("logoutBtn");
    if (out) out.onclick = async () => { await logout(); location.href = P.home; };
  }

  paint();
  window.addEventListener("resize", paint);
}

// ---------- Bottom navigation for mobile ----------
function renderBottomNav(loggedIn) {
  // Remove any existing bottom nav (e.g. after logout).
  const old = document.getElementById("bottomNav");
  if (old) old.remove();

  // Show only for logged-in users on mobile (CSS handles the visibility).
  if (!loggedIn) return;

  const currentPage = (location.pathname.split("/").pop() || "index.html");
  const nav = document.createElement("nav");
  nav.id = "bottomNav";
  nav.className = "bottom-nav";
  nav.setAttribute("aria-label", "Mobile navigation");

  const items = [
    { href: P.marketplace,    icon: "🏠", label: "Home",     match: ["marketplace.html", ""] },
    { href: P.smartmatch,     icon: "🔍", label: "Search",   match: ["smartmatch.html"] },
    { href: P.swaps,          icon: "🔄", label: "Swaps",    match: ["swaps.html", "offer-swap.html", "swap.html"] },
    { href: P.messages,       icon: "💬", label: "Messages", match: ["messages.html", "chat.html"] },
    { href: P.profile,        icon: "👤", label: "Profile",  match: ["profile.html", "my-listings.html", "my-services.html"] }
  ];

  items.forEach(it => {
    const a = document.createElement("a");
    a.className = "bottom-nav-item";
    a.href = it.href;
    if (it.match.includes(currentPage)) a.classList.add("active");
    a.innerHTML = `<span class="bottom-nav-icon" aria-hidden="true">${it.icon}</span><span class="bottom-nav-label">${it.label}</span>`;
    nav.append(a);
  });

  document.body.appendChild(nav);
  // Add a class on body so CSS can add bottom padding to prevent overlap.
  document.body.classList.add("has-bottom-nav");
}