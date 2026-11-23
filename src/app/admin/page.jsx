'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import ProductImagePicker from '@/components/admin/ProductImagePicker';
import { categories as initialCategories } from '@/data/categories';
import { banners as initialBanners } from '@/data/banners';
import { users as initialCustomers } from '@/data/users';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Layers, 
  ShoppingBag, 
  Users, 
  Ticket, 
  Image as ImageIcon, 
  BarChart3, 
  Settings, 
  ArrowLeft, 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Menu, 
  X,
  Calendar,
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/format';

export default function AdminDashboardPage() {
  const {
    products,
    orders,
    coupons,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrderStatus,
    addCoupon,
    toggleCouponStatus,
    showToast
  } = useShop();

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('admin@shipflux.com');
  const [adminPass, setAdminPass] = useState('••••••••••••');

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // Load admin session
  React.useEffect(() => {
    try {
      const session = localStorage.getItem('shipflux_admin_session');
      if (session === 'true') {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {}
  }, []);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (!adminEmail) return;
    setIsAdminLoggedIn(true);
    localStorage.setItem('shipflux_admin_session', 'true');
    showToast('Admin Console Authenticated. Welcome!', 'success');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('shipflux_admin_session');
    showToast('Admin session locked.', 'info');
  };

  // Modals
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddCouponModal, setShowAddCouponModal] = useState(false);

  // New Product Form State
  const [newProd, setNewProd] = useState({
    name: '',
    brand: 'NovaStyle',
    category: 'fashion',
    price: '',
    originalPrice: '',
    stock: 25,
    description: '',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
  });

  // New Coupon Form State
  const [newCp, setNewCp] = useState({
    code: '',
    description: '',
    discountPercent: 15,
    minOrderAmount: 1499,
    maxDiscount: 750,
    isActive: true
  });

  // Calculate Metrics
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.pricing?.total || 0), 0) + 1248320;
  }, [orders]);

  const totalOrdersCount = orders.length + 1228;
  const lowStockProducts = products.filter((p) => p.stock < 15);

  // Handle Add Product Submit
  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) return;
    const priceNum = Number(newProd.price);
    const origNum = newProd.originalPrice ? Number(newProd.originalPrice) : Math.round(priceNum * 1.3);
    const discountNum = Math.round(((origNum - priceNum) / origNum) * 100);

    addProduct({
      name: newProd.name,
      brand: newProd.brand,
      category: newProd.category,
      price: priceNum,
      originalPrice: origNum,
      discount: discountNum > 0 ? discountNum : 0,
      stock: Number(newProd.stock),
      description: newProd.description || 'Premium curated collection item.',
      rating: 4.8,
      reviewCount: 1,
      images: [newProd.image],
      colors: [{ name: "Charcoal", hex: "#171717" }, { name: "Ivory", hex: "#F7F5F0" }],
      sizes: ["S", "M", "L", "XL"],
      isFeatured: false,
      isBestSeller: false,
      isNewArrival: true
    });

    setShowAddProductModal(false);
    setNewProd({
      name: '',
      brand: 'NovaStyle',
      category: 'fashion',
      price: '',
      originalPrice: '',
      stock: 25,
      description: '',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop'
    });
  };

  // Handle Edit Product Submit
  const handleUpdateProductSubmit = (e) => {
    e.preventDefault();
    if (!editingProduct) return;
    const prodImg = editingProduct.image || editingProduct.images?.[0];
    updateProduct(editingProduct.id, {
      name: editingProduct.name,
      price: Number(editingProduct.price),
      originalPrice: Number(editingProduct.originalPrice),
      stock: Number(editingProduct.stock),
      brand: editingProduct.brand,
      category: editingProduct.category,
      ...(prodImg ? { image: prodImg, images: [prodImg] } : {})
    });
    setEditingProduct(null);
  };

  // Handle Quick Stock Adjust in Inventory Tab
  const handleAdjustStock = (prodId, delta) => {
    const prod = products.find(p => p.id === prodId);
    if (!prod) return;
    const newStock = Math.max(0, prod.stock + delta);
    updateProduct(prodId, { stock: newStock });
  };

  // Handle Add Coupon Submit
  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!newCp.code) return;
    addCoupon({
      code: newCp.code.toUpperCase(),
      description: newCp.description,
      discountPercent: Number(newCp.discountPercent),
      maxDiscount: Number(newCp.maxDiscount),
      minOrderAmount: Number(newCp.minOrderAmount),
      isActive: true,
      usageCount: 0,
      usageLimit: 500
    });
    setShowAddCouponModal(false);
    setNewCp({ code: '', description: '', discountPercent: 15, minOrderAmount: 1499, maxDiscount: 750, isActive: true });
  };

  // Filtered Products for Products Tab
  const filteredAdminProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    }
    return true;
  });

  // Filtered Orders for Orders Tab
  const filteredAdminOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    return true;
  });

  const navMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: products.length },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'inventory', label: 'Inventory', icon: Layers, badge: lowStockProducts.length > 0 ? `${lowStockProducts.length} Low` : null },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.length },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons', icon: Ticket },
    { id: 'banners', label: 'Banners', icon: ImageIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center p-4 selection:bg-accent selection:text-white">
        <div className="w-full max-w-md bg-[#202020] border border-[#2E2E2E] rounded-2xl p-8 shadow-2xl text-white">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-primary font-bold mx-auto mb-4 shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-white tracking-tight">
              Shipflux Admin Portal
            </h1>
            <p className="text-xs text-[#999999] mt-1.5">
              Secure Operations, Inventory & Fulfillment Console
            </p>
            <span className="inline-block mt-3 px-3 py-1 rounded-full bg-error/15 border border-error/30 text-error text-[10px] font-bold uppercase tracking-wider">
              Restricted Area • Separate Admin URL
            </span>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Admin Console ID / Email
              </label>
              <input
                type="email"
                required
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@shipflux.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#3A3A3A] bg-[#161616] text-white outline-none focus:border-accent font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                Secure Passkey / Credential
              </label>
              <input
                type="password"
                required
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#3A3A3A] bg-[#161616] text-white outline-none focus:border-accent font-medium tracking-widest"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 bg-accent hover:bg-accent-hover text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate & Enter Console</span>
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-[#2E2E2E] text-center">
            <Link
              href="/"
              className="text-xs font-semibold text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-accent" />
              <span>Return to Public Storefront</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row font-body">
      {/* Collapsible Dark Admin Sidebar matching Image 2 */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-primary text-white flex flex-col justify-between z-50 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-18 p-5 border-b border-[#2A2A2A] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-primary font-bold">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-heading font-extrabold text-lg text-white block leading-tight">
                  Shipflux
                </span>
                <span className="text-[10px] text-accent uppercase font-bold tracking-widest">
                  Admin Control
                </span>
              </div>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-heading font-semibold transition-colors ${
                    isActive
                      ? 'bg-accent text-white shadow-sm font-bold'
                      : 'text-[#A0A0A0] hover:text-white hover:bg-[#222222]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        String(item.badge).includes('Low')
                          ? 'bg-error text-white'
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#2A2A2A] text-gray-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#2A2A2A] space-y-2">
          <button
            onClick={handleAdminLogout}
            className="w-full flex items-center gap-2 text-xs font-heading font-semibold text-error hover:text-red-400 transition-colors py-1"
          >
            <X className="w-4 h-4" />
            <span>Lock Admin Session</span>
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-heading font-semibold text-[#A0A0A0] hover:text-white transition-colors py-1"
          >
            <ArrowLeft className="w-4 h-4 text-accent" />
            <span>Return to Storefront</span>
          </Link>
        </div>
      </aside>

      {/* Main Admin Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Topbar matching Image 2 */}
        <header className="h-16 bg-white border-b border-borderSubtle px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded hover:bg-surface text-darkText"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-heading font-bold text-base sm:text-lg text-primary leading-tight">
                Welcome back, Admin!
              </h1>
              <p className="text-[11px] text-mutedText hidden sm:block">
                Shipflux Commercial Operations Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-borderSubtle text-xs font-semibold text-darkText">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Last 30 Days</span>
              <ChevronDown className="w-3.5 h-3.5 text-mutedText" />
            </div>

            <Link
              href="/"
              target="_blank"
              className="px-3 py-1.5 bg-primary text-white text-xs font-heading font-bold rounded flex items-center gap-1 hover:bg-primary-hover shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-accent" />
              <span>Live Site</span>
            </Link>
          </div>
        </header>

        {/* Sub-view Content Body */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* 4 Metric KPI Cards matching Image 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                      Total Revenue
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success-bg text-success flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +18.2%
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-primary block my-1">
                    {formatCurrency(totalRevenue)}
                  </span>
                  <span className="text-[11px] text-mutedText">₹4,52,000 peak week</span>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                      Total Orders
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success-bg text-success flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +12.5%
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-primary block my-1">
                    {totalOrdersCount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] text-mutedText">98.4% fulfillment rate</span>
                </div>

                {/* Total Products */}
                <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                      Catalog Products
                    </span>
                    <span className="text-[10px] font-bold text-accent">Active Catalog</span>
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-primary block my-1">
                    {products.length}
                  </span>
                  <span className="text-[11px] text-mutedText">Across 8 categories</span>
                </div>

                {/* Total Customers */}
                <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-mutedText">
                      Total Customers
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-success-bg text-success flex items-center gap-0.5">
                      <TrendingUp className="w-3 h-3" /> +8.4%
                    </span>
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-primary block my-1">
                    10,482
                  </span>
                  <span className="text-[11px] text-mutedText">74% repeat purchasers</span>
                </div>
              </div>

              {/* Charts & Category Breakdown Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Revenue Overview Trend Graphic (8 cols) */}
                <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-borderSubtle shadow-subtle">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-heading font-bold text-base text-primary">Revenue Overview</h3>
                      <p className="text-xs text-mutedText">Monthly trajectory & seasonal performance</p>
                    </div>
                    <span className="font-heading font-extrabold text-lg text-accent">
                      {formatCurrency(totalRevenue)}
                    </span>
                  </div>

                  {/* Aesthetic Simulated SVG Area Chart */}
                  <div className="h-64 w-full relative flex items-end justify-between gap-2 pt-6 pb-2 px-2 border-b border-borderSubtle">
                    {[
                      { month: "Jun", rev: "₹1.8L", height: "42%" },
                      { month: "Jul", rev: "₹2.4L", height: "55%" },
                      { month: "Aug", rev: "₹2.9L", height: "64%" },
                      { month: "Sep", rev: "₹3.5L", height: "78%" },
                      { month: "Oct", rev: "₹4.1L", height: "88%" },
                      { month: "Nov", rev: "₹4.5L", height: "100%" }
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                        <span className="text-[10px] font-bold text-mutedText opacity-0 group-hover:opacity-100 transition-opacity">
                          {bar.rev}
                        </span>
                        <div
                          className="w-full bg-accent/20 group-hover:bg-accent rounded-t transition-all duration-300 relative"
                          style={{ height: bar.height }}
                        >
                          <div className="absolute inset-x-0 top-0 h-1 bg-accent rounded-t" />
                        </div>
                        <span className="text-xs font-semibold text-mutedText">{bar.month}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Category Sales Breakdown (4 cols) */}
                <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-borderSubtle shadow-subtle">
                  <h3 className="font-heading font-bold text-base text-primary mb-1">Sales by Category</h3>
                  <p className="text-xs text-mutedText mb-5">Share of sales revenue</p>

                  <div className="space-y-4">
                    {[
                      { name: "Fashion & Apparel", share: "36%", color: "bg-primary" },
                      { name: "Electronics & Audio", share: "28%", color: "bg-accent" },
                      { name: "Home & Living", share: "18%", color: "bg-[#777777]" },
                      { name: "Beauty & Wellness", share: "10%", color: "bg-[#23865B]" },
                      { name: "Footwear & Shoes", share: "8%", color: "bg-[#D94A4A]" }
                    ].map((cat) => (
                      <div key={cat.name} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-darkText">
                          <span>{cat.name}</span>
                          <span>{cat.share}</span>
                        </div>
                        <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                          <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.share }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders Snapshot & Low Stock Warnings */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Orders (8 cols) */}
                <div className="lg:col-span-8 bg-white rounded-xl border border-borderSubtle shadow-subtle overflow-hidden">
                  <div className="p-5 border-b border-borderSubtle flex items-center justify-between">
                    <h3 className="font-heading font-bold text-base text-primary">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-accent hover:underline"
                    >
                      View All Orders ({orders.length}) →
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-surface text-mutedText uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3.5 font-bold">Order ID</th>
                          <th className="p-3.5 font-bold">Customer</th>
                          <th className="p-3.5 font-bold">Date</th>
                          <th className="p-3.5 font-bold">Amount</th>
                          <th className="p-3.5 font-bold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-borderSubtle">
                        {orders.slice(0, 5).map((o) => (
                          <tr key={o.orderId} className="hover:bg-surface/50">
                            <td className="p-3.5 font-bold text-primary">{o.orderId}</td>
                            <td className="p-3.5 font-medium text-darkText">{o.customer?.name}</td>
                            <td className="p-3.5 text-mutedText">{formatDate(o.date)}</td>
                            <td className="p-3.5 font-bold text-darkText">{formatCurrency(o.pricing?.total)}</td>
                            <td className="p-3.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-accent/15 text-accent">
                                {o.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Low Stock Alerts (4 cols) */}
                <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="w-4 h-4 text-warning" />
                    <h3 className="font-heading font-bold text-base text-primary">Low-Stock Alerts</h3>
                  </div>

                  <div className="space-y-3">
                    {lowStockProducts.slice(0, 4).map((p) => (
                      <div key={p.id} className="p-3 bg-warning-bg/40 border border-warning/30 rounded flex items-center justify-between text-xs">
                        <div className="min-w-0 pr-2">
                          <p className="font-bold text-darkText truncate">{p.name}</p>
                          <p className="text-[11px] text-mutedText">{p.brand} • {p.category}</p>
                        </div>
                        <span className="font-bold text-error bg-white px-2 py-1 rounded shadow-xs">
                          {p.stock} left
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveTab('inventory')}
                    className="w-full mt-4 py-2 border border-borderSubtle rounded text-xs font-heading font-semibold text-darkText hover:bg-surface text-center block"
                  >
                    Manage Inventory →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCT MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative w-full sm:w-64">
                    <Search className="w-4 h-4 text-mutedText absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search products by title, ID or brand..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="py-2 px-3 text-xs rounded border border-borderSubtle bg-white font-semibold cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {initialCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setShowAddProductModal(true)}
                  className="px-4 py-2.5 bg-primary hover:bg-primary-hover text-white text-xs font-heading font-bold rounded flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4 text-accent" />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-xl border border-borderSubtle shadow-subtle overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface text-mutedText uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5 font-bold">Product</th>
                        <th className="p-3.5 font-bold">Category</th>
                        <th className="p-3.5 font-bold">Price</th>
                        <th className="p-3.5 font-bold">Discount</th>
                        <th className="p-3.5 font-bold">Stock</th>
                        <th className="p-3.5 font-bold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-borderSubtle">
                      {filteredAdminProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-surface/50">
                          <td className="p-3.5">
                            <div className="flex items-center gap-3">
                              <img src={p.images[0]} alt="" className="w-11 h-12 object-cover rounded bg-surface" />
                              <div>
                                <p className="font-bold text-darkText truncate max-w-xs">{p.name}</p>
                                <p className="text-[11px] text-mutedText">{p.brand} • {p.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-3.5 font-medium capitalize text-mutedText">{p.category}</td>
                          <td className="p-3.5 font-bold text-darkText">{formatCurrency(p.price)}</td>
                          <td className="p-3.5">
                            {p.discount > 0 ? (
                              <span className="text-error font-bold">{p.discount}% Off</span>
                            ) : (
                              <span className="text-mutedText">—</span>
                            )}
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              p.stock === 0 ? 'bg-error-bg text-error' : p.stock < 15 ? 'bg-warning-bg text-warning' : 'bg-success-bg text-success'
                            }`}>
                              {p.stock} units
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1.5 text-mutedText hover:text-primary transition-colors"
                                title="Edit product"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete ${p.name}?`)) {
                                    deleteProduct(p.id);
                                  }
                                }}
                                className="p-1.5 text-mutedText hover:text-error transition-colors"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORIES MANAGEMENT */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-borderSubtle shadow-subtle">
                <h3 className="font-heading font-bold text-lg text-primary mb-2">Category Architecture</h3>
                <p className="text-xs text-mutedText mb-6">Manage all 8 official marketplace retail divisions.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {initialCategories.map((c) => (
                    <div key={c.id} className="p-4 rounded-lg border border-borderSubtle bg-surface flex flex-col justify-between">
                      <div className="aspect-[4/3] rounded overflow-hidden mb-3 bg-white">
                        <img src={c.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <h4 className="font-heading font-bold text-sm text-darkText">{c.name}</h4>
                      <p className="text-xs text-mutedText line-clamp-1 mt-0.5 mb-2">{c.description}</p>
                      <span className="text-[11px] font-bold text-accent">
                        {products.filter(p => p.category === c.id).length} Active Products
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: INVENTORY MANAGEMENT */}
          {activeTab === 'inventory' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary">Warehouse Stock Adjuster</h3>
                  <p className="text-xs text-mutedText">Increment or decrement live inventory. Changes sync immediately with the storefront.</p>
                </div>
                <div className="flex gap-4 text-xs font-bold">
                  <span className="text-error">{products.filter(p => p.stock === 0).length} Out of Stock</span>
                  <span className="text-warning">{products.filter(p => p.stock > 0 && p.stock < 15).length} Low Stock</span>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-borderSubtle shadow-subtle overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface text-mutedText uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5 font-bold">Product Item</th>
                      <th className="p-3.5 font-bold">Current Stock</th>
                      <th className="p-3.5 font-bold">Status</th>
                      <th className="p-3.5 font-bold text-right">Quick Stock Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderSubtle">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-surface/50">
                        <td className="p-3.5">
                          <div className="flex items-center gap-3">
                            <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded bg-surface" />
                            <div>
                              <p className="font-bold text-darkText">{p.name}</p>
                              <p className="text-[11px] text-mutedText">{p.brand} • {formatCurrency(p.price)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-3.5 font-heading font-bold text-sm text-darkText">{p.stock}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.stock === 0 ? 'bg-error-bg text-error' : p.stock < 15 ? 'bg-warning-bg text-warning' : 'bg-success-bg text-success'
                          }`}>
                            {p.stock === 0 ? 'Out of Stock' : p.stock < 15 ? 'Low Stock' : 'Optimal'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="inline-flex items-center border border-borderSubtle rounded bg-white">
                            <button
                              onClick={() => handleAdjustStock(p.id, -1)}
                              className="w-8 h-8 flex items-center justify-center font-bold text-darkText hover:bg-surface"
                              title="Decrease stock by 1"
                            >
                              -
                            </button>
                            <span className="w-10 text-center font-bold text-xs">{p.stock}</span>
                            <button
                              onClick={() => handleAdjustStock(p.id, +5)}
                              className="px-2.5 h-8 flex items-center justify-center font-bold text-xs text-accent hover:bg-surface"
                              title="Add 5 units"
                            >
                              +5
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: ORDER MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle">
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary">Order Fulfillment Center</h3>
                  <p className="text-xs text-mutedText">Change status below to simulate live customer tracking timeline transitions.</p>
                </div>
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="py-2 px-3 text-xs rounded border border-borderSubtle bg-white font-semibold cursor-pointer"
                >
                  <option value="all">All Orders ({orders.length})</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div className="bg-white rounded-xl border border-borderSubtle shadow-subtle overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface text-mutedText uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5 font-bold">Order ID</th>
                      <th className="p-3.5 font-bold">Customer Details</th>
                      <th className="p-3.5 font-bold">Items</th>
                      <th className="p-3.5 font-bold">Payment</th>
                      <th className="p-3.5 font-bold">Total</th>
                      <th className="p-3.5 font-bold">Update Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderSubtle">
                    {filteredAdminOrders.map((o) => (
                      <tr key={o.orderId} className="hover:bg-surface/50">
                        <td className="p-3.5">
                          <span className="font-bold text-primary block">{o.orderId}</span>
                          <span className="text-[11px] text-mutedText">{formatDate(o.date)}</span>
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-darkText">{o.customer?.name}</p>
                          <p className="text-[11px] text-mutedText">{o.customer?.phone}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-darkText">{o.items.length} items</span>
                          <p className="text-[11px] text-mutedText truncate max-w-xs">{o.items[0]?.name}</p>
                        </td>
                        <td className="p-3.5">
                          <span className="font-medium text-darkText">{o.paymentMethod}</span>
                          <span className={`block text-[10px] font-bold ${o.paymentStatus === 'Paid' ? 'text-success' : 'text-warning'}`}>
                            {o.paymentStatus}
                          </span>
                        </td>
                        <td className="p-3.5 font-heading font-bold text-darkText">
                          {formatCurrency(o.pricing?.total)}
                        </td>
                        <td className="p-3.5">
                          <select
                            value={o.status}
                            onChange={(e) => updateOrderStatus(o.orderId, e.target.value)}
                            className="py-1 px-2.5 rounded border border-borderSubtle text-xs font-bold text-primary bg-white focus:border-accent cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Packed">Packed</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: CUSTOMERS MANAGEMENT */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle">
                <h3 className="font-heading font-bold text-lg text-primary mb-1">Customer CRM</h3>
                <p className="text-xs text-mutedText mb-6">Directory of verified shoppers, contact info, and lifetime expenditure.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {initialCustomers.map((cust) => (
                    <div key={cust.id} className="p-5 rounded-lg border border-borderSubtle bg-surface flex items-start gap-4">
                      <img src={cust.avatar} alt="" className="w-12 h-12 rounded-full object-cover border border-borderSubtle" />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-heading font-bold text-sm text-darkText">{cust.name}</h4>
                        <p className="text-xs text-mutedText truncate">{cust.email}</p>
                        <p className="text-xs text-mutedText mt-0.5">{cust.phone}</p>
                        <div className="mt-3 pt-3 border-t border-borderSubtle/60 flex justify-between text-xs">
                          <span className="text-mutedText">Orders: <strong className="text-darkText">{cust.ordersCount}</strong></span>
                          <span className="font-bold text-accent">{formatCurrency(cust.totalSpent)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: COUPONS MANAGEMENT */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-borderSubtle shadow-subtle flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-lg text-primary">Promotions & Coupons</h3>
                  <p className="text-xs text-mutedText">Configure discount vouchers, threshold requirements, and status.</p>
                </div>
                <button
                  onClick={() => setShowAddCouponModal(true)}
                  className="px-4 py-2 bg-primary text-white text-xs font-bold rounded flex items-center gap-1.5 hover:bg-primary-hover"
                >
                  <Plus className="w-4 h-4 text-accent" />
                  <span>Create Coupon</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {coupons.map((c) => (
                  <div key={c.code} className="p-5 bg-white border border-borderSubtle rounded-xl shadow-subtle space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-accent tracking-wide">{c.code}</span>
                      <button
                        onClick={() => toggleCouponStatus(c.code)}
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          c.isActive ? 'bg-success-bg text-success' : 'bg-surface text-mutedText'
                        }`}
                      >
                        {c.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </div>
                    <p className="text-xs text-darkText font-medium">{c.description}</p>
                    <div className="text-[11px] text-mutedText space-y-1 pt-2 border-t border-borderSubtle">
                      <p>Min Order: ₹{c.minOrderAmount}</p>
                      <p>Usage: {c.usageCount} / {c.usageLimit} claims</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 8: BANNERS MANAGEMENT */}
          {activeTab === 'banners' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-borderSubtle shadow-subtle">
                <h3 className="font-heading font-bold text-lg text-primary mb-1">Storefront Promotional Banners</h3>
                <p className="text-xs text-mutedText mb-6">Manage hero announcements, seasonal edits, and collection highlights.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {initialBanners.map((b) => (
                    <div key={b.id} className="rounded-lg border border-borderSubtle overflow-hidden bg-white shadow-sm flex flex-col justify-between">
                      <div className="aspect-[16/9] w-full bg-surface overflow-hidden">
                        <img src={b.image} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 space-y-2">
                        <span className="text-[10px] font-bold text-accent uppercase tracking-wider">{b.badge}</span>
                        <h4 className="font-heading font-bold text-sm text-darkText">{b.title}</h4>
                        <p className="text-xs text-mutedText">{b.subtitle}</p>
                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs font-semibold text-primary">CTA: {b.ctaText}</span>
                          <span className="text-[10px] bg-success-bg text-success px-2 py-0.5 rounded font-bold">Active</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl border border-borderSubtle shadow-subtle">
                <h3 className="font-heading font-bold text-lg text-primary mb-1">Executive Analytics Summary</h3>
                <p className="text-xs text-mutedText mb-6">Omnichannel store metrics, cart abandonment, and conversion rates.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">Conversion Rate</span>
                    <span className="font-heading font-extrabold text-2xl text-success">3.82%</span>
                    <span className="text-[11px] text-mutedText block mt-1">+0.4% vs industry average</span>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">Average Order Value (AOV)</span>
                    <span className="font-heading font-extrabold text-2xl text-primary">₹2,840</span>
                    <span className="text-[11px] text-mutedText block mt-1">+₹320 with bundle promos</span>
                  </div>
                  <div className="p-4 bg-surface rounded-lg">
                    <span className="text-xs font-bold text-mutedText uppercase tracking-wider block mb-1">Customer Return Rate</span>
                    <span className="font-heading font-extrabold text-2xl text-accent">1.4%</span>
                    <span className="text-[11px] text-mutedText block mt-1">Exceptional quality control</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ADD PRODUCT MODAL */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-borderSubtle max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-borderSubtle mb-5">
              <h3 className="font-heading font-bold text-base text-primary">Add New Product to Shipflux</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-mutedText hover:text-darkText">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-darkText block mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Wool Blend Trench Coat"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-darkText block mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={newProd.brand}
                    onChange={(e) => setNewProd({ ...newProd, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle bg-white font-semibold outline-none focus:border-accent cursor-pointer"
                  >
                    {initialCategories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-darkText block mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    placeholder="2499"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Original Price</label>
                  <input
                    type="number"
                    placeholder="3499"
                    value={newProd.originalPrice}
                    onChange={(e) => setNewProd({ ...newProd, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProd.stock}
                    onChange={(e) => setNewProd({ ...newProd, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
              </div>

              <ProductImagePicker
                value={newProd.image}
                onChange={(img) => setNewProd({ ...newProd, image: img })}
              />

              <div>
                <label className="font-bold text-darkText block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Detail materials, tailoring, and care instructions..."
                  className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>

              <div className="pt-3 border-t border-borderSubtle flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 border border-borderSubtle rounded font-semibold text-mutedText hover:text-darkText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary hover:bg-primary-hover text-white font-bold rounded shadow-sm"
                >
                  Publish Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-borderSubtle max-w-lg w-full p-6 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-borderSubtle mb-4">
              <h3 className="font-heading font-bold text-base text-primary">Edit Product: {editingProduct.name}</h3>
              <button onClick={() => setEditingProduct(null)} className="text-mutedText hover:text-darkText">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-darkText block mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-darkText block mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Original Price</label>
                  <input
                    type="number"
                    value={editingProduct.originalPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Stock</label>
                  <input
                    type="number"
                    value={editingProduct.stock}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
              </div>

              <ProductImagePicker
                value={editingProduct.image || editingProduct.images?.[0] || ''}
                onChange={(img) => setEditingProduct({ ...editingProduct, image: img, images: [img] })}
              />

              <div className="flex justify-end gap-2 pt-3 border-t border-borderSubtle">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-borderSubtle rounded font-semibold text-mutedText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white font-bold rounded shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD COUPON MODAL */}
      {showAddCouponModal && (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-borderSubtle max-w-md w-full p-6 animate-fade-in text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-borderSubtle mb-4">
              <h3 className="font-heading font-bold text-base text-primary">Create New Promotion</h3>
              <button onClick={() => setShowAddCouponModal(false)} className="text-mutedText hover:text-darkText">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateCoupon} className="space-y-4">
              <div>
                <label className="font-bold text-darkText block mb-1">Coupon Code (e.g. FESTIVE25)</label>
                <input
                  type="text"
                  required
                  placeholder="NOVA50"
                  value={newCp.code}
                  onChange={(e) => setNewCp({ ...newCp, code: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-borderSubtle uppercase font-bold outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="font-bold text-darkText block mb-1">Description</label>
                <input
                  type="text"
                  required
                  placeholder="Flat 25% off on seasonal items"
                  value={newCp.description}
                  onChange={(e) => setNewCp({ ...newCp, description: e.target.value })}
                  className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-darkText block mb-1">Discount %</label>
                  <input
                    type="number"
                    value={newCp.discountPercent}
                    onChange={(e) => setNewCp({ ...newCp, discountPercent: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="font-bold text-darkText block mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    value={newCp.minOrderAmount}
                    onChange={(e) => setNewCp({ ...newCp, minOrderAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-borderSubtle">
                <button
                  type="button"
                  onClick={() => setShowAddCouponModal(false)}
                  className="px-4 py-2 border border-borderSubtle rounded font-semibold text-mutedText"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white font-bold rounded shadow-sm"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
