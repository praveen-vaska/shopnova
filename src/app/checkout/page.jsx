'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { 
  ChevronRight, 
  Check, 
  MapPin, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  Smartphone
} from 'lucide-react';
import { formatCurrency } from '@/utils/format';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartSubtotal, cartDiscount, cartShipping, cartTotal, appliedCoupon, placeOrder, user, showToast } = useShop();

  const [step, setStep] = useState(1); // 1: Address, 2: Delivery, 3: Payment, 4: Review
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    addressLine1: user?.addresses?.[0]?.addressLine1 || '',
    addressLine2: user?.addresses?.[0]?.addressLine2 || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || '',
    postalCode: user?.addresses?.[0]?.postalCode || '',
    addressType: 'Home'
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard'); // 'standard' | 'express'
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'COD'
  const [upiId, setUpiId] = useState(user?.email ? `${user.email.split('@')[0]}@okhdfcbank` : '');
  const [cardData, setCardData] = useState({
    number: '',
    name: user?.name || '',
    expiry: '',
    cvv: ''
  });

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto">
        <h2 className="font-heading font-bold text-2xl text-primary mb-2">No items to checkout</h2>
        <p className="text-sm text-mutedText mb-6">Your shopping bag is empty.</p>
        <Link href="/shop" className="btn-primary px-6 py-2.5 rounded text-xs font-bold">
          Browse Store
        </Link>
      </div>
    );
  }

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim() || !formData.addressLine1.trim() || !formData.city.trim() || !formData.postalCode.trim()) {
        showToast('Please fill in all mandatory delivery fields.', 'error');
        return;
      }
      const cleanPhone = formData.phone.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }
      const cleanPin = formData.postalCode.replace(/[^0-9]/g, '');
      if (cleanPin.length !== 6) {
        showToast('Please enter a valid 6-digit Indian PIN Code.', 'error');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        showToast('Please enter a valid email address for order notifications.', 'error');
        return;
      }
    }
    setStep(step + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = () => {
    if (isSubmitting) return; // Prevent duplicate payment trigger
    setPaymentError('');
    setIsSubmitting(true);

    // Payment simulation with failure handling support
    setTimeout(() => {
      // If user tests simulated failure
      if (paymentMethod === 'UPI' && (upiId.toLowerCase().includes('fail') || upiId.toLowerCase().includes('decline'))) {
        setIsSubmitting(false);
        setPaymentError('Payment Failed: UPI transaction was declined by issuing bank. Please retry or choose another payment method.');
        showToast('Payment Failed. Transaction declined.', 'error');
        return;
      }

      if (paymentMethod === 'Card' && cardData.number.endsWith('0000')) {
        setIsSubmitting(false);
        setPaymentError('Payment Failed: Card declined due to authorization failure. Please retry.');
        showToast('Card authorization failed.', 'error');
        return;
      }

      try {
        const order = placeOrder({
          shippingAddress: formData,
          deliveryMethod,
          paymentMethod
        });
        setIsSubmitting(false);
        router.push(`/order-success/${order.orderId}`);
      } catch (err) {
        setIsSubmitting(false);
        setPaymentError('An unexpected error occurred during order generation. Please try again.');
        showToast('Order processing failed.', 'error');
      }
    }, 1200);
  };

  return (
    <div className="bg-secondary/40 min-h-screen py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header matching Image 2 */}
        <div className="bg-white border border-borderSubtle rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, title: 'Address', icon: MapPin },
              { num: 2, title: 'Delivery', icon: Truck },
              { num: 3, title: 'Payment', icon: CreditCard },
              { num: 4, title: 'Review', icon: CheckCircle2 }
            ].map((s, idx, arr) => (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-heading font-bold text-xs sm:text-sm transition-all ${
                      step > s.num
                        ? 'bg-success text-white'
                        : step === s.num
                        ? 'bg-accent text-white shadow-md'
                        : 'bg-surface text-mutedText border border-borderSubtle'
                    }`}
                  >
                    {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-heading font-semibold hidden md:inline ${
                      step >= s.num ? 'text-darkText' : 'text-mutedText'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {idx < arr.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 sm:mx-4 transition-colors ${
                      step > s.num ? 'bg-success' : 'bg-borderSubtle'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Two-Column Grid: Step Form (Left) & Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 cols) */}
          <div className="lg:col-span-8 bg-white border border-borderSubtle rounded-xl p-6 sm:p-8 shadow-sm">
            {/* STEP 1: ADDRESS */}
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>1. Delivery Address</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1.5">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-darkText block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-darkText block mb-1.5">Flat / House No. / Building *</label>
                  <input
                    type="text"
                    required
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    placeholder="e.g. Flat B-204, Green Valley Apartments"
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-darkText block mb-1.5">Street Address / Landmark</label>
                  <input
                    type="text"
                    value={formData.addressLine2}
                    onChange={(e) => setFormData({ ...formData, addressLine2: e.target.value })}
                    placeholder="Near Outer Ring Road, Bellandur"
                    className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1.5">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1.5">State *</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-darkText block mb-1.5">PIN Code *</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-8">
                  {['Home', 'Work', 'Other'].map((type) => (
                    <label key={type} className="flex items-center gap-2 text-xs font-semibold text-darkText cursor-pointer">
                      <input
                        type="radio"
                        name="addrType"
                        checked={formData.addressType === type}
                        onChange={() => setFormData({ ...formData, addressType: type })}
                        className="text-accent focus:ring-accent"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Continue to Delivery Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* STEP 2: DELIVERY METHOD */}
            {step === 2 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-accent" />
                  <span>2. Select Delivery Speed</span>
                </h2>

                <div className="space-y-4 mb-8">
                  <label
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === 'standard'
                        ? 'border-accent bg-secondary/50'
                        : 'border-borderSubtle hover:border-darkText'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'standard' ? 'border-accent' : 'border-gray-300'}`}>
                        {deliveryMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-darkText">Standard Delivery (3-5 Business Days)</h4>
                        <p className="text-xs text-mutedText">Complimentary express shipping on all domestic orders</p>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm text-success uppercase">Free</span>
                  </label>

                  <label
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between cursor-pointer transition-all ${
                      deliveryMethod === 'express'
                        ? 'border-accent bg-secondary/50'
                        : 'border-borderSubtle hover:border-darkText'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${deliveryMethod === 'express' ? 'border-accent' : 'border-gray-300'}`}>
                        {deliveryMethod === 'express' && <div className="w-2 h-2 rounded-full bg-accent" />}
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-sm text-darkText">Priority Air Express (24-48 Hours)</h4>
                        <p className="text-xs text-mutedText">Guaranteed next-day dispatch via dedicated courier</p>
                      </div>
                    </div>
                    <span className="font-heading font-bold text-sm text-darkText">₹99</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-borderSubtle text-xs font-heading font-semibold rounded hover:bg-surface"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: PAYMENT METHOD */}
            {step === 3 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-accent" />
                  <span>3. Payment Method</span>
                </h2>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['UPI', 'Card', 'Cash on Delivery'].map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPaymentMethod(pm)}
                      className={`p-3 rounded-lg border-2 text-xs font-heading font-bold text-center transition-all ${
                        paymentMethod === pm ? 'border-accent bg-secondary' : 'border-borderSubtle hover:border-darkText'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>

                {/* UPI Sub-form */}
                {paymentMethod === 'UPI' && (
                  <div className="p-4 bg-surface rounded-md border border-borderSubtle mb-8 space-y-3">
                    <span className="text-xs font-semibold text-darkText block">
                      Pay via any UPI App (Google Pay, PhonePe, Paytm, CRED)
                    </span>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="e.g. yourname@okhdfcbank"
                      className="w-full px-3.5 py-2.5 text-xs rounded border border-borderSubtle bg-white outline-none focus:border-accent"
                    />
                    <p className="text-[11px] text-mutedText">
                      A payment request will be sent to your UPI app for instant one-click approval.
                    </p>
                  </div>
                )}

                {/* Card Sub-form */}
                {paymentMethod === 'Card' && (
                  <div className="p-4 bg-surface rounded-md border border-borderSubtle mb-8 space-y-3">
                    <div>
                      <label className="text-xs font-semibold text-darkText block mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-darkText block mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-darkText block mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="w-full px-3 py-2 text-xs rounded border border-borderSubtle bg-white outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* COD Sub-form */}
                {paymentMethod === 'Cash on Delivery' && (
                  <div className="p-4 bg-surface rounded-md border border-borderSubtle mb-8 text-xs text-mutedText leading-relaxed">
                    Pay securely in cash or via digital UPI QR code upon doorstep delivery.
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-borderSubtle text-xs font-heading font-semibold rounded hover:bg-surface"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white font-heading font-bold text-xs rounded transition-all flex items-center justify-center gap-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ORDER REVIEW */}
            {step === 4 && (
              <div>
                <h2 className="font-heading font-bold text-xl text-primary mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span>4. Final Order Review</span>
                </h2>

                {/* Shipping & Payment summary pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-surface border border-borderSubtle mb-6 text-xs">
                  <div>
                    <span className="font-bold text-darkText uppercase tracking-wider block mb-1">Deliver To:</span>
                    <p className="font-semibold text-darkText">{formData.name} ({formData.phone})</p>
                    <p className="text-mutedText">{formData.addressLine1}, {formData.city}, {formData.postalCode}</p>
                  </div>
                  <div>
                    <span className="font-bold text-darkText uppercase tracking-wider block mb-1">Payment Method:</span>
                    <p className="font-semibold text-darkText">{paymentMethod}</p>
                    <p className="text-mutedText">Estimated arrival: Within 3 business days</p>
                  </div>
                </div>

                {/* Items preview */}
                <div className="divide-y divide-borderSubtle border border-borderSubtle rounded-md mb-8">
                  {cart.map((item) => (
                    <div key={item.cartItemId} className="p-3.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={item.product.images[0]} alt="" className="w-12 h-14 object-cover rounded bg-surface" />
                        <div>
                          <p className="font-semibold text-darkText">{item.product.name}</p>
                          <p className="text-mutedText">Qty: {item.quantity} • {item.selectedColor}</p>
                        </div>
                      </div>
                      <span className="font-heading font-bold text-darkText">
                        {formatCurrency(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Payment Error Alert */}
                {paymentError && (
                  <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-error text-xs font-medium animate-fade-in flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-error shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold mb-0.5">Payment Could Not Be Completed</p>
                      <p>{paymentError}</p>
                    </div>
                  </div>
                )}

                {/* Place Order CTA */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent hover:bg-accent-hover active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed text-white font-heading font-bold text-sm rounded shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Securing payment & generating order...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Confirm & Place Order ({formatCurrency(cartTotal)})</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Right Order Summary Column (4 cols) */}
          <div className="lg:col-span-4 bg-white border border-borderSubtle rounded-xl p-6 shadow-sm space-y-5">
            <h3 className="font-heading font-bold text-base text-primary pb-3 border-b border-borderSubtle">
              Summary ({cart.length} items)
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-mutedText">
                <span>Items Subtotal</span>
                <span className="font-semibold text-darkText">{formatCurrency(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span className="font-semibold">-{formatCurrency(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-mutedText">
                <span>Shipping</span>
                <span className="font-semibold text-darkText">
                  {cartShipping === 0 ? <span className="text-success uppercase">Free</span> : formatCurrency(cartShipping)}
                </span>
              </div>
              <div className="pt-2 border-t border-borderSubtle flex justify-between font-heading font-bold text-base text-darkText">
                <span>Grand Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>

            <div className="p-3 bg-secondary rounded text-[11px] text-mutedText flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
              <span>Razorpay verified demo gateway simulation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
