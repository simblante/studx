// All sign-up / sign-in logic lives here so pages stay small.
import { auth, db } from "../../js/firebase.js";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, sendEmailVerification, updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Change this one line to allow other school email domains.
export const ALLOWED_EMAIL_SUFFIX = "@ctu.edu.ph";

export function validateRegistration(v) {
  if (!v.fullName || !v.email || !v.studentId || !v.school || !v.campus || !v.password || !v.confirm)
    return "Please fill in every field.";
  if (!v.email.toLowerCase().endsWith(ALLOWED_EMAIL_SUFFIX))
    return "Use your school email (it should end in " + ALLOWED_EMAIL_SUFFIX + ").";
  if (v.password.length < 8) return "Password must be at least 8 characters.";
  if (v.password !== v.confirm) return "Passwords do not match.";
  return null;
}

export async function registerStudent(v) {
  const cred = await createUserWithEmailAndPassword(auth, v.email.trim(), v.password);
  const uid = cred.user.uid;
  await updateProfile(cred.user, { displayName: v.fullName.trim() });

  // Public-facing profile. Verification status can only become VERIFIED by an admin.
await setDoc(doc(db, "users", uid), {
  uid, fullName: v.fullName.trim(), email: v.email.trim().toLowerCase(),
  school: v.school.trim(), campus: v.campus.trim(),
  role: "student", verificationStatus: "PENDING", accountStatus: "active",
  photoURL: "", trustScore: 0, ratingAverage: 0, ratingCount: 0,
  listingCount: 0, completedTransactions: 0,
  createdAt: serverTimestamp()
});
  // Student ID goes in a private sub-document so it is never shown on profiles.
  await setDoc(doc(db, "users", uid, "private", "verification"), {
    studentId: v.studentId.trim(), submittedAt: serverTimestamp()
  });
  try { await sendEmailVerification(cred.user); } catch (e) { console.warn(e); }
}

export const loginStudent = (email, password) => signInWithEmailAndPassword(auth, email.trim(), password);
export const sendReset = (email) => sendPasswordResetEmail(auth, email.trim());
export const logout = () => signOut(auth);
export const resendVerification = () => sendEmailVerification(auth.currentUser);
