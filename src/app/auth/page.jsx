'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { ShoppingBag, Eye, EyeOff, ArrowRight, ShieldCheck, Loader2, AlertTriangle } from 'lucide-react';
import { users } from '@/data/users';

export default function AuthPage() {
  const router = useRouter();
  const { updateUser, showToast } = useShop();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login'
      ? { email: email.trim(), password }
      : { name: name.trim(), email: email.trim(), password, phone: phone.trim() };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        updateUser(data.user);
        if (data.token) {
          localStorage.setItem('shipflux_user_token', data.token);
        }
        showToast(data.message || 'Signed in successfully!', 'success');
        router.push('/account');
      } else {
        setAuthError(data.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setAuthError('Failed to communicate with authentication service. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = (demoAccount) => {
    updateUser(demoAccount || users[0]);
    showToast(`Logged in as ${(demoAccount || users[0]).name}`, 'success');
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
              Shipflux
            </span>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl text-primary mt-1">
            {mode === 'login' ? 'Sign In to Your Account' : 'Create Your Account'}
          </h1>
          <p className="text-xs text-mutedText mt-1">
            {mode === 'login'
              ? 'Access orders, wishlist and saved delivery addresses.'
              : 'Join Shipflux for exclusive curated drops and express delivery.'}
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="grid grid-cols-2 p-1 bg-surface rounded-lg mb-6 text-xs font-heading font-bold">
          <button
            onClick={() => { setMode('login'); setAuthError(''); }}
            className={`py-2 rounded-md transition-all ${mode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setAuthError(''); }}
            className={`py-2 rounded-md transition-all ${mode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
              }`}
          >
            Register
          </button>
        </div>

        {authError && (
          <div className="mb-5 p-3 rounded-md bg-red-50 border border-red-200 text-error text-xs font-medium animate-fade-in">
            {authError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <label className="text-xs font-semibold text-darkText block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-darkText block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-darkText block mb-1">Email Address *</label>
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
              <label className="text-xs font-semibold text-darkText">Password *</label>
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
                placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'}
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
            disabled={isLoading}
            className="w-full py-3.5 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white text-xs font-heading font-bold rounded shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{mode === 'login' ? 'Sign In to Account' : 'Create Account'}</span>
            )}
          </button>
        </form>

        {/* 1-Click Fast Demo Login for Customer */}
        <div className="mt-8 pt-6 border-t border-borderSubtle space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-mutedText block text-center mb-2">
            One-Click Customer Demo Testing
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin(users[0])}
              className="p-2.5 rounded-lg border border-borderSubtle hover:border-accent bg-surface hover:bg-white text-left transition-all group"
            >
              <p className="font-heading font-bold text-[11px] text-darkText group-hover:text-accent">
                Aarav Sharma
              </p>
              <p className="text-[10px] text-mutedText truncate">aarav.sharma@example.com</p>
            </button>
            <button
              onClick={() => handleQuickDemoLogin(users[1])}
              className="p-2.5 rounded-lg border border-borderSubtle hover:border-accent bg-surface hover:bg-white text-left transition-all group"
            >
              <p className="font-heading font-bold text-[11px] text-darkText group-hover:text-accent">
                Pooja Hegde
              </p>
              <p className="text-[10px] text-mutedText truncate">pooja.h@example.com</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
