import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { AuthError } from "firebase/auth";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  GithubAuthProvider,
  updateProfile,
} from "firebase/auth";
import { AppDispatch } from "../store";
import { setLoading, setUser, setError, logout } from "../store/authSlice";
interface IUser {
  email: string | null;
  password?: string;
  uid: string;
  displayName: string | null;
  photoURL: string | null;
}

const mapFirebaseUserToIUser = (firebaseUser: FirebaseUser): IUser => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName: firebaseUser.displayName,
  photoURL: firebaseUser.photoURL,
});

const isAuthError = (error: unknown): error is AuthError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
};

export const initializeAuth = (dispatch: AppDispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(mapFirebaseUserToIUser(user)));
    } else {
      dispatch(logout());
    }
  });
};

export const initializeAuthListener = (dispatch: AppDispatch) => {
  dispatch(setLoading(true));

  return onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(mapFirebaseUserToIUser(user)));
    } else {
      dispatch(logout());
    }
    dispatch(setLoading(false));
  });
};

export const signInWithGithub = async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true));
    const result = await signInWithPopup(auth, provider);
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    if (token) {
      const response = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (response.ok) {
        const githubData = await response.json();
        if (!result.user.displayName || !result.user.email) {
          await updateProfile(result.user, {
            displayName: githubData.name || githubData.login,
          });
          await result.user.reload();
        }
      }
    }
    const updatedUser = auth.currentUser;
    console.log("Updated user:", updatedUser);
    if (updatedUser) {
      dispatch(setUser(mapFirebaseUserToIUser(updatedUser)));
    }
  } catch (error: unknown) {
    console.error("Auth error:", error);
    let errorMessage = "An unknown error occurred";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    dispatch(setError(errorMessage));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logoutUser = async (dispatch: AppDispatch) => {
  try {
    await signOut(auth);
    dispatch(logout());
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";

    if (isAuthError(error)) {
      errorMessage = error.message;
    }

    dispatch(setError(errorMessage));
  }
};
