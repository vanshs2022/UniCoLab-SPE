import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/auth";

export default function userAuthStatus() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();
      if (user) {
        const token = await user.getIdToken();
        resolve({
          email: user.email,
          authenticated: true,
          token: token,
        });
      } else {
        resolve({
          email: null,
          authenticated: false,
          token: null,
        });
      }
    });
  });
}
