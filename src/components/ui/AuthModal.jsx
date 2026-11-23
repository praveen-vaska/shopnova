'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X, 
  ShoppingBag, 
  Lock, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Loader2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '@/context/ShopContext';
import { users as initialDemoUsers } from '@/data/users';
import { formatCurrency } from '@/utils/format';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    updateUser, 
    showToast,
    pendingCartItem,
    setPendingCartItem
  } = useShop();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsAuthModalOpen(false);
      }
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  // Reset form when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setError('');
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = mode === 'login'
      ? { email: email.trim(), password }
      : { 
          name: name.trim(), 
          email: email.trim(), 
          password, 
          phone: phone.trim() 
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success && data.user) {
        if (data.token) {
          localStorage.setItem('shipflux_user_token', data.token);
        }
        // updateUser automatically fulfills pendingCartItem and opens cart drawer
        updateUser(data.user);
      } else {
        setError(data.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setError('Connection error. Please check your network and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemo = (demoAccount) => {
    updateUser(demoAccount);
  };

  return (
    <div className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-borderSubtle p-6 sm:p-8 animate-fade-in my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface hover:bg-borderSubtle flex items-center justify-center text-mutedText hover:text-darkText transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-5">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm mx-auto mb-3">
            <ShoppingBag className="w-5 h-5 text-accent" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-primary">
            {mode === 'login' ? 'Sign In to Continue' : 'Create Your Account'}
          </h2>
          <p className="text-xs text-mutedText mt-1">
            {pendingCartItem ? (
              <span>Please sign in or create an account to add items to your shopping bag.</span>
            ) : (
              <span>Access your orders, saved addresses and exclusive benefits.</span>
            )}
          </p>
        </div>

        {/* Pending Product Preview Banner */}
        {pendingCartItem?.product && (
          <div className="mb-5 p-3 rounded-xl bg-secondary/80 border border-accent/30 flex items-center gap-3">
            <img
              src={pendingCartItem.product.image || pendingCartItem.product.images?.[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'}
              alt={pendingCartItem.product.name}
              className="w-12 h-14 object-cover rounded bg-white flex-shrink-0 border border-borderSubtle"
            />
            <div className="flex-1 min-w-0 text-left">
              <span className="text-[10px] font-bold text-accent uppercase tracking-wider block">
                Pending Item
              </span>
              <p className="font-heading font-bold text-xs text-darkText truncate">
                {pendingCartItem.product.name}
              </p>
              <p className="text-[11px] text-mutedText">
                Qty: {pendingCartItem.quantity} • {formatCurrency(pendingCartItem.product.price * pendingCartItem.quantity)}
              </p>
            </div>
            <div className="text-[10px] font-bold text-success bg-success/10 px-2 py-1 rounded">
              Auto-Adds
            </div>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-surface rounded-lg mb-5 text-xs font-heading font-bold">
          <button
            type="button"
            onClick={() => { setMode('login'); setError(''); }}
            className={`py-2 rounded-md transition-all ${
              mode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('register'); setError(''); }}
            className={`py-2 rounded-md transition-all ${
              mode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
            }`}
          >
            Register
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-error text-xs font-medium flex items-start gap-2.5 animate-fade-in">
            <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-darkText block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-darkText">Password *</label>
              {mode === 'login' && (
                <button
                  type="button"
                  onClick={() => showToast("Password reset instructions dispatched to your email.", "info")}
                  className="text-[11px] text-accent hover:underline font-semibold"
                >
                  Forgot?
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
                className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-darkText p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-accent" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-accent" />
                <span>{mode === 'login' ? 'Sign In & Continue' : 'Create Account & Continue'}</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Demo Section */}
        <div className="mt-6 pt-4 border-t border-borderSubtle">
          <span className="text-[10px] font-bold uppercase tracking-wider text-mutedText block text-center mb-2.5">
            Instant 1-Click Demo Customer Test
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo(initialDemoUsers[0])}
              className="p-2 rounded-lg border border-borderSubtle hover:border-accent bg-surface hover:bg-white text-left transition-all"
            >
              <p className="font-heading font-bold text-[11px] text-darkText truncate">Aarav Sharma</p>
              <p className="text-[10px] text-mutedText truncate">aarav.sharma@example.com</p>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo(initialDemoUsers[1])}
              className="p-2 rounded-lg border border-borderSubtle hover:border-accent bg-surface hover:bg-white text-left transition-all"
            >
              <p className="font-heading font-bold text-[11px] text-darkText truncate">Pooja Hegde</p>
              <p className="text-[10px] text-mutedText truncate">pooja.h@example.com</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
