"use client";

import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // MOCK AUTHENTICATION CHECK
    // TODO: Replace this with a real provider (e.g., NextAuth with a single admin credential, 
    // or Supabase Auth restricted to one email).
    if (email === "admin@neelanjan.com" && password === "admin") {
      login();
    } else {
      setError("Invalid credentials. Try admin@neelanjan.com / admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf6ec] p-4 text-[#2b2118]">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-8 h-8 border border-[#c99a3d] flex items-center justify-center rounded-sm mb-4">
            <span className="text-xs text-[#c99a3d]">Y</span>
          </div>
          <h1 className="font-serif text-2xl">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-[#6b5c47]">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm mb-1 text-[#6b5c47]">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#e6dcc4] bg-transparent focus:outline-none focus:border-[#c99a3d] transition-colors"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-[#2b2118] text-[#faf6ec] py-2 mt-4 hover:bg-[#c99a3d] hover:text-[#2b2118] transition-colors font-medium"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
