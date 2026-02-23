import { EmailAuthProvider, linkWithCredential } from "firebase/auth";

export const upgradeAccount = async (email, password) => {
  const credential = EmailAuthProvider.credential(email, password);
  
  try {
    // This connects the current 'Guest' ID to the new Email/Password
    const userCredential = await linkWithCredential(auth.currentUser, credential);
    alert("Account upgraded! Your scan history is now saved.");
  } catch (error) {
    console.error("Upgrade failed", error);
  }
};