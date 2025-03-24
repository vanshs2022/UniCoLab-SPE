"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function page() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password }), // Fix: use `email`
            });
    
            const data = await res.json();
            if (res.ok) {
                alert("Login successful!");
                router.push("/explore/profile");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };
    

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">Don't have an account? <Link href="/auth/signup">Sign up</Link></p>
            </div>
        </div>
    );
}
