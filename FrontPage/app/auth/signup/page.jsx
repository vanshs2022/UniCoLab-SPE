"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/utils/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function page() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const handleGoogleLogin = async () => {
        try{
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = result.user.getIdToken();
            
            await fetch("http://localhost:5000/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: result.user.displayName, email: result.user.email }),
            });

            alert("User authenticated");
            router.push("/");
        }
        catch (error) {
            console.error("Error signing in with Google:", error);
            alert("Error signing in with Google");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password!=confirmPassword){
            alert("Password do not match!");
            return;
        }

        try{
            const user = await createUserWithEmailAndPassword(auth, username, password);
            await updateProfile(user.user, {
                displayName: name,
            });

            const token = await user.user.getIdToken();

            await fetch("https://localhost:5000/api/auth",{
                method : "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-type": "application/json",
                },
                body : JSON.stringify({
                    user : username,
                })
            });

            alert("Signup Successful");
            router.push("/");
        }
        catch(error){
            console.log(error);
            alert(error);
        }
    }

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="signup-button">Sign Up</button>
                </form>
    
                <button onClick={handleGoogleLogin} className="google-signin-button" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google Icon" width="20" height="20" />
                    Sign in with Google
                </button>
    
                <p className="login-link">Already have an account? <Link href="/auth/login">Login</Link></p>
            </div>
        </div>
    );
    
}