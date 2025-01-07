import { 
  getAuth, 
  signOut,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { db, auth } from '../config/firebase';

export const authService = {
  // Request OTP
  requestOTP: async (phoneNumber, recaptchaVerifier) => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier
      );
      return verificationId;
    } catch (error) {
      throw error;
    }
  },

  // Verify OTP and sign in
  verifyOTP: async (verificationId, otp) => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const userCredential = await signInWithCredential(auth, credential);
      
      // Create or update user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        phoneNumber: userCredential.user.phoneNumber,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }, { merge: true });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  }
}; 