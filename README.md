# STUDX | Buy. Sell. Swap. Earn.

**STUDX** is a verified, student-only marketplace designed to make campus transactions safe, affordable, and sustainable. Built as an MVP for the **Philippine Startup Challenge XI**.


## The Problem & Our Solution
Students often rely on informal Facebook groups or messaging apps to buy and sell items. These platforms are unverified, prone to scams, and lack structure. 

**STUDX solves this by providing:**
*   **Verified Student-Only Community:** Requires a school email and admin-reviewed student ID.
*   **Campus-First Approach:** Meetups are localized within the campus for safety.
*   **SmartMatch:** A transparent, rule-based algorithm that scores listings based on relevance, price, distance, rating, and verification.
*   **Circular Campus:** A sustainability tracker that monitors items reused, swapped, and resold, supporting SDG 12 (Responsible Consumption).
*   **Earn & Learn:** A safe space for students to offer legitimate services (tutoring, programming, design) supporting SDG 8 (Decent Work).


## Key Features
*   **Authentication & Verification:** Secure login with email verification and admin-approved student badges.
*   **Marketplace:** Post, edit, and search listings with image uploads (powered by Cloudinary).
*   **Swap System:** Trade items directly without cash.
*   **Transactions:** Request to buy, track order status (Pending, Accepted, Completed).
*   **In-App Messaging:** Real-time chat for buyers and sellers.
*   **Trust Score:** Dynamic rating system based on completed deals, reviews, and verification.
*   **Admin Dashboard:** Tools for managing student verifications, reports, and listings.
*   **Mobile-First UI:** Responsive design with bottom navigation for a seamless app-like experience.

## 🛠️ Tech Stack
*   **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6 Modules)
*   **Backend / Database:** Firebase (Firestore, Authentication)
*   **Image Hosting:** Cloudinary (Unsigned Upload Preset)
*   **Security:** Strict Firestore Security Rules (Role-based access control)
*   **Hosting:** GitHub Pages

## 🔒 Security Highlights
*   **Strict Firestore Rules:** Users cannot elevate their own roles (e.g., change from student to admin).
*   **Private Subcollections:** Student IDs are stored in `users/{uid}/private` and are unreadable by other users.
*   **Anti-Spam:** Client-side rate limiting on actions.
*   **No Exposed PII:** Phone numbers and exact addresses are not required or displayed.


## ⚙️ Local Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/simblante/studx.git
cd studx
```

2. **Configure Firebase:**
* Create a project on [Firebase Console](https://console.firebase.google.com/).
* Enable **Authentication** (Email/Password) and **Firestore Database**.
* Copy your web app credentials.
* Rename `js/firebase-config.example.js` to `js/firebase-config.js` and paste your credentials inside.

3. **Configure Cloudinary:**
* Create an account on [Cloudinary](https://cloudinary.com/).
* Create an **Unsigned** Upload Preset.
* Open `js/cloudinary.js` and update `CLOUD_NAME` and `UPLOAD_PRESET`.

4. **Run Locally:**
* Use a local server like VS Code Live Server, or run `python -m http.server` in your terminal.
* Open `http://localhost:8000` (or the port provided by your server) in your browser.


## SDG Alignment
*   **SDG 8: Decent Work and Economic Growth** — Empowering students to monetize their skills and items.
*   **SDG 12: Responsible Consumption and Production** — Promoting a circular economy through campus swaps and resales.


## Author
**Developed by:** James Simblante
*   GitHub: [@simblante](https://github.com/simblante)

---
*Disclaimer: STUDX does not process payments. It serves as a connection platform for students to arrange meetups and transactions safely. Academic dishonesty (doing graded work for others) is strictly prohibited.*