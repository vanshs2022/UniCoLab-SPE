import { signOut } from "firebase/auth";
import { auth } from "@/utils/auth";

export function logoutUser() {
    signOut(auth)
        .then(() => {
            console.log("User logged out successfully");
        })
        .catch((error) => {
            console.error("Error logging out: ", error);
        });
}