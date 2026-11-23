'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '@/data/products';
import { orders as initialOrders } from '@/data/orders';
import { coupons as initialCoupons } from '@/data/coupons';
import { users } from '@/data/users';

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  // Persistence state
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [coupons, setCoupons] = useState(initialCoupons);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(users[0]); // Default logged in as Aarav Sharma for demo
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  
  // UI States
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [toasts, setToasts] = useState([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('shipflux_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('shipflux_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));

      const storedUser = localStorage.getItem('shipflux_user');
      if (storedUser) setUser(JSON.parse(storedUser));

      const storedOrders = localStorage.getItem('shipflux_orders');
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      const storedProducts = localStorage.getItem('shipflux_products');
      if (storedProducts) setProducts(JSON.parse(storedProducts));

      const storedCoupons = localStorage.getItem('shipflux_coupons');
      if (storedCoupons) setCoupons(JSON.parse(storedCoupons));
    } catch (e) {
      console.error("Failed to load local state", e);
    }
  }, []);

  // Save to LocalStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('shipflux_cart', JSON.stringify(newCart));
  };

  const updateWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem('shipflux_wishlist', JSON.stringify(newWishlist));
  };

  const updateUser = (newUser) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('shipflux_user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('shipflux_user');
    }
  };

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    const color = selectedColor || (product.colors && product.colors[0]?.name) || "Standard";
    const size = selectedSize || (product.sizes && product.sizes[0]) || "Standard";
    const cartItemId = `${product.id}-${color}-${size}`;

    const existingIndex = cart.findIndex((item) => item.cartItemId === cartItemId);
    let newCart;
    if (existingIndex > -1) {
      newCart = [...cart];
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart = [
        ...cart,
        {
          cartItemId,
          product,
          quantity,
          selectedColor: color,
          selectedSize: size
        }
      ];
    }

    updateCart(newCart);
    showToast(`Added "${product.name}" to your bag!`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    const item = cart.find(i => i.cartItemId === cartItemId);
    const newCart = cart.filter((item) => item.cartItemId !== cartItemId);
    updateCart(newCart);
    if (item) {
      showToast(`Removed "${item.product.name}" from your bag`, 'info');
    }
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const newCart = cart.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
    );
    updateCart(newCart);
  };

  const clearCart = () => {
    updateCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    let newWishlist;
    if (exists) {
      newWishlist = wishlist.filter((item) => item.id !== product.id);
      showToast(`Removed "${product.name}" from Wishlist`, 'info');
    } else {
      newWishlist = [...wishlist, product];
      showToast(`Saved "${product.name}" to Wishlist!`, 'success');
    }
    updateWishlist(newWishlist);
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product, 1);
    updateWishlist(wishlist.filter((item) => item.id !== product.id));
  };

  const moveAllWishlistToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((prod) => {
      addToCart(prod, 1);
    });
    updateWishlist([]);
    showToast("Moved all wishlist items to your bag!", "success");
    setIsCartDrawerOpen(true);
  };

  // Coupon verification
  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (!found) {
      showToast("Invalid coupon code.", "error");
      return false;
    }
    if (!found.isActive) {
      showToast("This promo code has expired.", "error");
      return false;
    }
    if (cartSubtotal < found.minOrderAmount) {
      showToast(`Minimum order amount of ₹${found.minOrderAmount} required for this code.`, "error");
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${cleanCode}" applied successfully!`, "success");
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.", "info");
  };

  // Pricing calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let cartDiscount = 0;
  let isFreeShippingCoupon = false;

  if (appliedCoupon) {
    if (appliedCoupon.isFreeShipping) {
      isFreeShippingCoupon = true;
    } else if (appliedCoupon.flatDiscount) {
      cartDiscount = appliedCoupon.flatDiscount;
    } else if (appliedCoupon.discountPercent) {
      const calculated = Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100);
      cartDiscount = appliedCoupon.maxDiscount ? Math.min(calculated, appliedCoupon.maxDiscount) : calculated;
    }
  }

  const freeShippingThreshold = 999;
  const isFreeDelivery = cartSubtotal >= freeShippingThreshold || isFreeShippingCoupon;
  const cartShipping = cart.length === 0 ? 0 : isFreeDelivery ? 0 : 99;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  // Order Placement
  const placeOrder = (orderData) => {
    const newOrderId = `SN-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder = {
      orderId: newOrderId,
      date: new Date().toISOString(),
      customer: {
        name: orderData.shippingAddress.name,
        email: orderData.shippingAddress.email || user?.email || "customer@example.com",
        phone: orderData.shippingAddress.phone
      },
      shippingAddress: orderData.shippingAddress,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        selectedColor: item.selectedColor,
        selectedSize: item.selectedSize,
        image: item.product.images[0]
      })),
      pricing: {
        subtotal: cartSubtotal,
        discount: cartDiscount,
        couponApplied: appliedCoupon?.code || null,
        shipping: cartShipping,
        tax: 0,
        total: cartTotal
      },
      deliveryMethod: orderData.deliveryMethod || "standard",
      paymentMethod: orderData.paymentMethod || "UPI",
      paymentStatus: orderData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      status: "Confirmed",
      trackingTimeline: [
        { step: "Order Placed", date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), completed: true },
        { step: "Confirmed", date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }), completed: true },
        { step: "Packed", date: "Pending", completed: false },
        { step: "Shipped", date: "Pending", completed: false },
        { step: "Out for Delivery", date: "Pending", completed: false },
        { step: "Delivered", date: "Pending", completed: false }
      ],
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updatedOrders = [newOrder, ...orders];
    setOrders(updatedOrders);
    localStorage.setItem('shipflux_orders', JSON.stringify(updatedOrders));
    clearCart();
    return newOrder;
  };

  // Admin Management Functions
  const addProduct = (newProduct) => {
    const id = `prod-${Date.now()}`;
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const created = { ...newProduct, id, slug };
    const updated = [created, ...products];
    setProducts(updated);
    localStorage.setItem('shipflux_products', JSON.stringify(updated));
    showToast(`Product "${created.name}" created successfully!`, 'success');
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(updated);
    localStorage.setItem('shipflux_products', JSON.stringify(updated));
    showToast("Product updated successfully!", 'success');
  };

  const deleteProduct = (id) => {
    const prod = products.find(p => p.id === id);
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem('shipflux_products', JSON.stringify(updated));
    showToast(`Product "${prod?.name || id}" removed`, 'info');
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) => {
      if (ord.orderId === orderId) {
        const steps = ["Order Placed", "Confirmed", "Packed", "Shipped", "Out for Delivery", "Delivered"];
        const statusIdx = steps.indexOf(newStatus);
        const updatedTimeline = (ord.trackingTimeline || []).map((t) => {
          const tIdx = steps.indexOf(t.step);
          return {
            ...t,
            completed: tIdx <= statusIdx,
            date: tIdx <= statusIdx && t.date === "Pending" ? new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : t.date
          };
        });
        return { ...ord, status: newStatus, trackingTimeline: updatedTimeline };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem('shipflux_orders', JSON.stringify(updated));
    showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
  };

  const addCoupon = (newCoupon) => {
    const updated = [...coupons, newCoupon];
    setCoupons(updated);
    localStorage.setItem('shipflux_coupons', JSON.stringify(updated));
    showToast(`Coupon "${newCoupon.code}" created!`, 'success');
  };

  const toggleCouponStatus = (code) => {
    const updated = coupons.map(c => c.code === code ? { ...c, isActive: !c.isActive } : c);
    setCoupons(updated);
    localStorage.setItem('shipflux_coupons', JSON.stringify(updated));
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        orders,
        coupons,
        cart,
        wishlist,
        user,
        appliedCoupon,
        isCartDrawerOpen,
        isSearchOpen,
        isAuthModalOpen,
        authMode,
        toasts,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        cartItemCount,
        freeShippingThreshold,
        freeShippingRemaining,
        freeShippingProgress,
        setIsCartDrawerOpen,
        setIsSearchOpen,
        setIsAuthModalOpen,
        setAuthMode,
        showToast,
        removeToast,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        moveAllWishlistToCart,
        applyCoupon,
        removeCoupon,
        placeOrder,
        updateUser,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addCoupon,
        toggleCouponStatus
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
