import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/auth";

export default function userAuthStatus() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                resolve({ email: user.email, authenticated: true });
            } else {
                resolve({ email: null, authenticated: false });
            }
        });
    });
}
