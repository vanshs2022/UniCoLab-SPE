import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/auth";

export default function userAuthStatus(){
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            if (user) {
                console.log("User email:", user.email);
            }
            resolve(!!user);
        })
    })
}