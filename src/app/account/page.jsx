'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { users as initialDemoUsers } from '@/data/users';
import {
  User,
  Package,
  MapPin,
  Heart,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Check,
  Edit3,
  Plus,
  Truck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  AlertTriangle,
  Loader2,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';

export default function AccountPage() {
  const router = useRouter();
  const { user, updateUser, orders, wishlist, showToast } = useShop();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'orders' | 'profile' | 'addresses'

  // Editable Profile
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Sync profile form when user changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  // Auth Form State (when user is not logged in)
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [showAuthPassword, setShowAuthPassword] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // New Address form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    postalCode: '',
    type: 'Home'
  });

  // User orders calculation (HOOK IS AT TOP LEVEL, BEFORE ANY CONDITIONAL RETURNS)
  const userOrders = useMemo(() => {
    if (!user) return [];
    return orders.filter(
      (o) =>
        o.customer?.email?.toLowerCase() === user.email?.toLowerCase() ||
        o.customer?.name?.toLowerCase() === user.name?.toLowerCase()
    );
  }, [orders, user]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser({ ...user, ...profileForm });
    showToast("Profile details updated successfully!", "success");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.addressLine1 || !newAddr.city || !newAddr.postalCode) return;
    const updated = {
      ...user,
      addresses: [
        ...(user.addresses || []),
        { id: `addr-${Date.now()}`, name: user.name, phone: user.phone, ...newAddr, isDefault: false }
      ]
    };
    updateUser(updated);
    setShowAddressModal(false);
    setNewAddr({ addressLine1: '', addressLine2: '', city: '', state: '', postalCode: '', type: 'Home' });
    showToast("New address saved to your account!", "success");
  };

  const handleLogout = () => {
    updateUser(null);
    localStorage.removeItem('shipflux_user_token');
    showToast("Logged out successfully.", "info");
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = authMode === 'login'
      ? { email: authEmail.trim(), password: authPassword }
      : {
        name: authName.trim(),
        email: authEmail.trim(),
        password: authPassword,
        phone: authPhone.trim()
      };

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
        showToast(data.message || 'Authenticated successfully!', 'success');
      } else {
        setAuthError(data.message || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setAuthError('Failed to communicate with authentication service. Please check your connection.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleQuickDemo = (demoAccount) => {
    updateUser(demoAccount);
    showToast(`Signed in as ${demoAccount.name}`, 'success');
  };

  // IF NOT LOGGED IN: Render modern user login / signup card
  if (!user) {
    return (
      <div className="bg-secondary/40 min-h-screen py-12 sm:py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl border border-borderSubtle shadow-xl p-6 sm:p-8 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover transition-colors">
                <ShoppingBag className="w-5 h-5 text-accent" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-primary">
                Shipflux
              </span>
            </Link>
            <h1 className="font-heading font-extrabold text-2xl text-primary">
              {authMode === 'login' ? 'Customer Sign In' : 'Create Customer Account'}
            </h1>
            <p className="text-xs text-mutedText mt-1.5">
              {authMode === 'login'
                ? 'Sign in to access your orders, track shipments and manage addresses.'
                : 'Register to unlock customized recommendations, saved addresses & express checkout.'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="grid grid-cols-2 p-1 bg-surface rounded-lg mb-6 text-xs font-heading font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setAuthError(''); }}
              className={`py-2 rounded-md transition-all ${authMode === 'login' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
                }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('register'); setAuthError(''); }}
              className={`py-2 rounded-md transition-all ${authMode === 'register' ? 'bg-white text-primary shadow-sm' : 'text-mutedText hover:text-darkText'
                }`}
            >
              Register
            </button>
          </div>

          {/* Error Banner */}
          {authError && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-error text-xs font-medium flex items-start gap-2.5 animate-fade-in">
              <AlertTriangle className="w-4 h-4 text-error shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4 text-xs">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-darkText block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-darkText block mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-semibold text-darkText block mb-1.5">Email Address *</label>
              <input
                type="email"
                required
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-darkText">Password *</label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => showToast("Password reset link has been dispatched to your email.", "info")}
                    className="text-[11px] text-accent hover:underline font-semibold"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <input
                  type={showAuthPassword ? 'text' : 'password'}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder={authMode === 'register' ? 'At least 6 characters' : 'Enter your password'}
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-borderSubtle outline-none focus:border-accent font-medium"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowAuthPassword(!showAuthPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-mutedText hover:text-darkText p-1"
                >
                  {showAuthPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isAuthLoading}
              className="w-full py-3.5 mt-2 bg-primary hover:bg-primary-hover active:scale-[0.99] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isAuthLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-accent" />
                  <span>{authMode === 'login' ? 'Sign In to Account' : 'Complete Registration'}</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Login Pill for Customer Testing */}
          <div className="mt-8 pt-5 border-t border-borderSubtle">
            <span className="text-[11px] font-bold uppercase tracking-wider text-mutedText block text-center mb-3">
              One-Click Customer Demo Testing
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo(initialDemoUsers[0])}
                className="p-2.5 rounded-lg border border-borderSubtle hover:border-accent bg-surface hover:bg-white text-left transition-all group"
              >
                <p className="font-heading font-bold text-[11px] text-darkText group-hover:text-accent">
                  Aarav Sharma
                </p>
                <p className="text-[10px] text-mutedText truncate">aarav.sharma@example.com</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo(initialDemoUsers[1])}
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

  return (
    <div className="bg-secondary/40 min-h-screen py-10 px-4">
      <div className="max-w-[1240px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-mutedText mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-darkText font-semibold">Account Dashboard</span>
        </nav>

        {/* Dashboard Grid: Sidebar (4 cols) & Content (8 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sidebar */}
          <aside className="lg:col-span-4 bg-white rounded-xl border border-borderSubtle p-6 shadow-sm space-y-6">
            {/* User Profile Info Card */}
            <div className="flex items-center gap-4 pb-6 border-b border-borderSubtle">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />
              <div>
                <h2 className="font-heading font-bold text-base text-primary">{user.name}</h2>
                <p className="text-xs text-mutedText">{user.email}</p>
                <span className="inline-block px-2 py-0.5 rounded-full bg-accent/15 text-accent text-[10px] font-bold mt-1.5 uppercase tracking-wider">
                  Gold Member
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="space-y-1 text-xs font-heading font-semibold">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'orders', label: `My Orders (${userOrders.length})`, icon: Package },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
                { id: 'profile', label: 'Edit Profile', icon: Edit3 },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md transition-colors text-left ${isActive ? 'bg-primary text-white shadow-sm' : 'text-darkText hover:bg-surface'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <Link
                href="/wishlist"
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-darkText hover:bg-surface transition-colors"
              >
                <Heart className="w-4 h-4 text-error" />
                <span>My Wishlist ({wishlist.length})</span>
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-md text-error hover:bg-error-bg transition-colors pt-4 border-t border-borderSubtle"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </aside>

          {/* Main Content Area (8 cols) */}
          <main className="lg:col-span-8 bg-white rounded-xl border border-borderSubtle p-6 sm:p-8 shadow-sm">
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-primary mb-1">
                    Welcome back, {user.name}!
                  </h3>
                  <p className="text-xs text-mutedText">
                    Here's a snapshot of your recent transactions and account status.
                  </p>
                </div>

                {/* 3 Metric Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-surface border border-borderSubtle">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">
                      Orders Placed
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-primary">
                      {userOrders.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-surface border border-borderSubtle">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">
                      Wishlist Items
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-accent">
                      {wishlist.length}
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-surface border border-borderSubtle">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">
                      Saved Addresses
                    </span>
                    <span className="font-heading font-extrabold text-2xl text-darkText">
                      {user.addresses?.length || 2}
                    </span>
                  </div>
                </div>

                {/* Recent Orders Sneak Peek */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-heading font-bold text-base text-primary">Recent Orders</h4>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-heading font-semibold text-accent hover:underline"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {userOrders.slice(0, 2).map((order) => (
                      <div
                        key={order.orderId}
                        className="p-4 rounded-lg border border-borderSubtle flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-heading font-bold text-sm text-darkText block">
                            {order.orderId}
                          </span>
                          <span className="text-mutedText">
                            {formatDate(order.date)} • {order.items.length} item(s)
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-heading font-bold text-sm text-darkText block">
                            {formatCurrency(order.pricing?.total)}
                          </span>
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-success-bg text-success uppercase">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-primary mb-1">
                    My Order History
                  </h3>
                  <p className="text-xs text-mutedText">
                    Track shipments, view itemized receipts, and check delivery timelines.
                  </p>
                </div>

                <div className="space-y-4">
                  {userOrders.map((order) => (
                    <div
                      key={order.orderId}
                      className="border border-borderSubtle rounded-lg p-5 bg-white space-y-4 hover:border-accent transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-borderSubtle">
                        <div>
                          <span className="font-heading font-bold text-base text-primary">
                            Order {order.orderId}
                          </span>
                          <p className="text-xs text-mutedText">
                            Placed on {formatDate(order.date)} • Payment via {order.paymentMethod}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent text-white">
                            {order.status}
                          </span>
                          <Link
                            href={`/track-order?orderId=${order.orderId}`}
                            className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded flex items-center gap-1 hover:bg-primary-hover"
                          >
                            <Truck className="w-3 h-3" /> Track
                          </Link>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-borderSubtle">
                        {order.items.map((it, i) => (
                          <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-3">
                              {it.image && (
                                <img src={it.image} alt="" className="w-10 h-12 object-cover rounded bg-surface" />
                              )}
                              <div>
                                <p className="font-semibold text-darkText">{it.name}</p>
                                <p className="text-mutedText">Qty: {it.quantity} {it.selectedColor && `• Color: ${it.selectedColor}`}</p>
                              </div>
                            </div>
                            <span className="font-heading font-bold text-darkText">
                              {formatCurrency(it.price * it.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center text-xs border-t border-borderSubtle">
                        <span className="text-mutedText">Total Order Amount</span>
                        <span className="font-heading font-extrabold text-base text-darkText">
                          {formatCurrency(order.pricing?.total)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl text-primary mb-1">
                      Saved Addresses
                    </h3>
                    <p className="text-xs text-mutedText">
                      Manage delivery destinations for fast checkout.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="px-4 py-2 bg-primary text-white text-xs font-bold rounded flex items-center gap-1.5 hover:bg-primary-hover"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Address
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(user.addresses || []).map((addr) => (
                    <div
                      key={addr.id}
                      className="p-4 rounded-lg border border-borderSubtle bg-white relative space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-surface font-bold text-[10px] uppercase text-darkText">
                          {addr.type}
                        </span>
                        {addr.isDefault && (
                          <span className="text-[10px] text-accent font-bold">Default</span>
                        )}
                      </div>
                      <h4 className="font-heading font-bold text-sm text-darkText">{addr.name}</h4>
                      <p className="text-mutedText leading-relaxed">
                        {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}
                        {addr.city}, {addr.state} - {addr.postalCode}
                      </p>
                      <p className="text-mutedText">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>

                {/* Add Address Form Modal */}
                {showAddressModal && (
                  <div className="p-5 border border-accent rounded-lg bg-surface/50 space-y-4">
                    <h4 className="font-heading font-bold text-sm text-primary">New Address Details</h4>
                    <form onSubmit={handleAddAddress} className="space-y-3">
                      <input
                        type="text"
                        required
                        placeholder="House / Flat / Building *"
                        value={newAddr.addressLine1}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine1: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Street / Landmark"
                        value={newAddr.addressLine2}
                        onChange={(e) => setNewAddr({ ...newAddr, addressLine2: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          placeholder="City *"
                          value={newAddr.city}
                          onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                          className="px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          placeholder="State *"
                          value={newAddr.state}
                          onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                          className="px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                        />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          placeholder="PIN Code *"
                          value={newAddr.postalCode}
                          onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                          className="px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                        />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          type="submit"
                          className="px-5 py-2 bg-primary text-white text-xs font-bold rounded"
                        >
                          Save Address
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowAddressModal(false)}
                          className="px-4 py-2 border border-borderSubtle text-xs rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-primary mb-1">
                    Edit Personal Information
                  </h3>
                  <p className="text-xs text-mutedText">
                    Keep your contact email and phone up to date for shipping alerts.
                  </p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
