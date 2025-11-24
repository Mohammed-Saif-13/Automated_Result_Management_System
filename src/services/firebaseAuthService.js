import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/config/firebase";

export const firebaseAuthService = {
  signInWithGoogle: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return {
        success: true,
        user: {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          photo: result.user.photoURL,
          emailVerified: result.user.emailVerified,
        },
        token: await result.user.getIdToken(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  signInWithEmail: async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      return {
        success: true,
        user: {
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.displayName,
          emailVerified: result.user.emailVerified,
        },
        token: await result.user.getIdToken(),
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error.code),
      };
    }
  },

  registerWithEmail: async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: displayName,
      });

      await sendEmailVerification(result.user);

      return {
        success: true,
        user: {
          uid: result.user.uid,
          email: result.user.email,
          name: displayName,
          emailVerified: false,
        },
        token: await result.user.getIdToken(),
      };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error.code),
      };
    }
  },

  sendVerificationEmail: async () => {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return { success: true };
      }
      return { success: false, error: "No user logged in" };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: getErrorMessage(error.code),
      };
    }
  },

  logout: async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  },

  getCurrentUser: () => {
    return auth.currentUser;
  },
};

const getErrorMessage = (errorCode) => {
  const errors = {
    "auth/email-already-in-use": "Email already registered",
    "auth/invalid-email": "Invalid email address",
    "auth/user-not-found": "User not found",
    "auth/wrong-password": "Incorrect password",
    "auth/weak-password": "Password should be at least 6 characters",
    "auth/too-many-requests": "Too many attempts. Try again later",
    "auth/network-request-failed": "Network error. Check your connection",
  };

  return errors[errorCode] || "An error occurred. Please try again";
};
