'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react';
import { users } from '@/data/users';

export default function AuthPage() {
  const router = useRouter();
  const { updateUser, showToast } = useShop();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      const found = users.find(u => u.email.toLowerCase() === email.toLowerCase()) || users[0];
      updateUser(found);
      showToast(`Welcome back, ${found.name}!`, 'success');
      router.push('/account');
    } else {
      const newUser = {
        id: `user-${Date.now()}`,
        name: name || 'ShopNova Member',
        email,
        phone: '+91 99999 00000',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
        role: 'customer',
        joinedDate: 'Nov 2026',
        addresses: []
      };
      updateUser(newUser);
      showToast("Account created successfully!", "success");
      router.push('/account');
    }
  };

  const handleQuickDemoLogin = () => {
    updateUser(users[0]);
    showToast("Logged in as Aarav Sharma (Customer)", "success");
    router.push('/account');
  };

  return (
    <div className="bg-secondary/40 min-h-screen py-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl border border-borderSubtle shadow-xl p-8">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-accent">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-heading font-extrabold text-2xl tracking-tight text-primary">
              ShopNova
            </span>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-primary mt-1">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-mutedText mt-1">
            {mode === 'login'
              ? 'Access orders, wishlist and saved delivery addresses.'
              : 'Join ShopNova for exclusive curated drops and express delivery.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-surface rounded-lg mb-6 text-xs font-heading font-bold">
          <button
            onClick={() => setMode('login')}
            className={`py-2 rounded-md transition-all ${
              mode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setMode('register')}
            className={`py-2 rounded-md transition-all ${
              mode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-xs font-semibold text-darkText block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-darkText block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-darkText">Password</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast("Password reset link sent to your email!", "info")}
                  className="text-[11px] text-accent hover:underline"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-darkText"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded shadow-sm transition-all"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* 1-Click Fast Demo Login for Customer */}
        <div className="mt-8 pt-6 border-t border-borderSubtle space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mutedText block text-center mb-2">
            One-Click Demo Customer Access
          </span>
          <button
            onClick={handleQuickDemoLogin}
            className="w-full py-2.5 px-3.5 bg-surface hover:bg-secondary border border-borderSubtle rounded text-xs font-semibold text-darkText flex items-center justify-between transition-colors"
          >
            <span>Demo Customer (Aarav Sharma)</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>
      </div>
    </div>
  );
}
