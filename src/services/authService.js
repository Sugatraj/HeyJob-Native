import { 
  getAuth, 
  signOut,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { db, auth } from '../config/firebase';
import { Platform } from 'react-native';

export const authService = {
  // Request OTP
  requestOTP: async (phoneNumber, recaptchaVerifier) => {
    try {
      if (Platform.OS === 'web') {
        // For web, we use signInWithPhoneNumber directly with the web recaptcha verifier
        try {
          await recaptchaVerifier.render();
        } catch (error) {
          // Ignore if already rendered
        }
        const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
        return confirmationResult;
      } else {
        // For mobile, we return the verification ID
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
          phoneNumber,
          recaptchaVerifier
        );
        return verificationId;
      }
    } catch (error) {
      console.error('Error in requestOTP:', error);
      throw error;
    }
  },

  // Verify OTP and sign in
  verifyOTP: async (verificationId, otp) => {
    try {
      let userCredential;

      if (Platform.OS === 'web') {
        // For web, verificationId is actually the confirmationResult
        userCredential = await verificationId.confirm(otp);
      } else {
        // For mobile, create and sign in with credential
        const credential = PhoneAuthProvider.credential(verificationId, otp);
        userCredential = await signInWithCredential(auth, credential);
      }
      
      // Create or update user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        phoneNumber: userCredential.user.phoneNumber,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
      }, { merge: true });

      return userCredential.user;
    } catch (error) {
      console.error('Error in verifyOTP:', error);
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