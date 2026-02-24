import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { FadeIn } from '@/components/FadeIn';
import { Check, ChevronRight, CreditCard, Truck, Package, Lock, ArrowLeft, RefreshCw, Mail, Phone, Bell } from 'lucide-react';
import type { ShippingInfo, PaymentInfo } from '@/types';

interface CheckoutPageProps {
  setPage: (page: string) => void;
}

type CheckoutStep = 'shipping' | 'payment' | 'review' | 'confirmation';
type PaymentMethod = 'card' | 'paypal' | 'googlepay' | 'applepay' | 'venmo';
type NotificationMethod = 'email' | 'sms' | 'both';

// Payment method icons as SVG components
const PayPalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.558 6.082H9.63l-1.496 9.478h2.79c.457 0 .85-.334.922-.788l.04-.19.73-4.627.047-.255a.933.933 0 0 1 .922-.788h.58c3.76 0 6.704-1.528 7.565-5.946.318-1.63.196-2.987-.507-3.69z"/>
  </svg>
);

const GooglePayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.3-.9 2.4-1.9 3.1l3.1 2.4c1.8-1.7 2.9-4.2 2.9-7.1 0-.7-.1-1.4-.2-2H12z"/>
    <path fill="#4285F4" d="M5.3 14.3l-.7.5-2.4 1.9C3.9 20.1 7.7 23 12 23c3.2 0 5.9-1.1 7.8-2.9l-3.8-2.9c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.7-5z"/>
    <path fill="#FBBC05" d="M2.2 8.4C1.4 10.1 1 12 1 14s.4 3.9 1.2 5.6l4.1-3.2c-.4-1.1-.6-2.3-.6-3.6s.2-2.5.6-3.6L2.2 8.4z"/>
    <path fill="#34A853" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.9 1.1 15.2 0 12 0 7.7 0 3.9 2.9 2.2 6.9l4.1 3.2c1-3 3.6-5.3 6.7-5.3z"/>
  </svg>
);

const ApplePayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.72 9.73c-.04-1.54.63-2.71 2.01-3.57-.77-1.1-1.93-1.71-3.46-1.83-1.45-.12-3.05.85-3.64.85-.62 0-2.09-.81-3.24-.81C6.58 4.42 4 6.39 4 9.41c0 .92.17 1.87.51 2.86.45 1.35 2.1 4.65 3.82 4.6 1.03-.02 1.76-.74 3.1-.74 1.31 0 1.98.74 3.14.72 1.97-.03 3.29-2.73 3.72-4.08-2.37-1.12-2.78-4.14-2.57-5.04zM14.94 3.5c.98-1.18.88-2.26.86-2.5-1.01.06-2.17.7-2.85 1.5-.86 1.01-1.2 2.23-1.07 3.41 1.14.09 2.17-.51 3.06-1.41z"/>
  </svg>
);

const VenmoIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M3.95 3.18c.17 1.12.12 2.51-.44 4.26L1.21 15.4c-.55 1.74-.35 3.08.6 3.08 1.24 0 2.85-1.57 4.26-4.58.47-1.02.88-2.15 1.2-3.32l-.02.02c-.13.5-.2 1.02-.2 1.56 0 2.6 1.55 4.62 4.27 4.62 2.16 0 3.8-1.3 4.73-3.27l.02-.04c.13-.28.25-.56.35-.86l2.15-11.65h-4.38l-1.43 9.1zM19.5 1.5h-3l-2.1 11.4c.65-1.37 1.6-2.32 2.9-2.77l1.2-6.33c.35-1.8.35-2.3 0-2.3z"/>
  </svg>
);

const paymentMethods = [
  { id: 'card' as PaymentMethod, name: 'Credit Card', icon: CreditCard, color: 'bg-white/10' },
  { id: 'paypal' as PaymentMethod, name: 'PayPal', icon: PayPalIcon, color: 'bg-[#003087]/30' },
  { id: 'googlepay' as PaymentMethod, name: 'Google Pay', icon: GooglePayIcon, color: 'bg-white/10' },
  { id: 'applepay' as PaymentMethod, name: 'Apple Pay', icon: ApplePayIcon, color: 'bg-white/10' },
  { id: 'venmo' as PaymentMethod, name: 'Venmo', icon: VenmoIcon, color: 'bg-[#008CFF]/30' },
];

export function CheckoutPage({ setPage }: CheckoutPageProps) {
  const { items, subtotal, discount, total, clearCart, addSubscription } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [notificationMethod, setNotificationMethod] = useState<NotificationMethod>('email');
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Get subscription items
  const subscriptionItems = items.filter(item => item.isSubscription);
  const oneTimeItems = items.filter(item => !item.isSubscription);
  const hasSubscriptions = subscriptionItems.length > 0;
  const hasOneTimeItems = oneTimeItems.length > 0;
  
  // Calculate shipping costs
  // Single purchases: $6.99 standard, $12.99 express
  // Subscriptions: FREE shipping on refills (first order pays shipping if only subscriptions)
  const baseShippingCost = hasOneTimeItems 
    ? (shippingMethod === 'standard' ? 6.99 : 12.99)
    : (shippingMethod === 'standard' ? 0 : 12.99);

  // Redirect if cart is empty
  if (items.length === 0 && currentStep !== 'confirmation') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
              Your Cart is Empty
            </h1>
            <p className="text-white/60 mb-8">Add some products to proceed with checkout.</p>
            <button onClick={() => setPage('Shop')} className="btn-gold">
              Shop Now
            </button>
          </FadeIn>
        </div>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Create subscriptions for subscription items
    subscriptionItems.forEach(item => {
      const nextRefill = new Date();
      nextRefill.setDate(nextRefill.getDate() + (item.product.subscriptionInterval || 5) * 7);
      
      addSubscription({
        product: item.product,
        quantity: item.quantity,
        startDate: new Date().toISOString(),
        nextRefillDate: nextRefill.toISOString(),
        notificationMethod,
        email: shippingInfo.email,
        phone: shippingInfo.phone,
      });
    });
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderNumber(`ASC-${Date.now().toString(36).toUpperCase()}`);
    setIsProcessing(false);
    setCurrentStep('confirmation');
    clearCart();
    window.scrollTo(0, 0);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const getPaymentMethodName = () => {
    const method = paymentMethods.find(m => m.id === selectedPaymentMethod);
    return method?.name || 'Credit Card';
  };

  // Step Indicator
  const StepIndicator = () => (
    <div className="step-indicator mb-8">
      {[
        { key: 'shipping', label: 'Shipping', icon: Truck },
        { key: 'payment', label: 'Payment', icon: CreditCard },
        { key: 'review', label: 'Review', icon: Package }
      ].map((step, index) => {
        const StepIcon = step.icon;
        const isActive = currentStep === step.key;
        const isCompleted = 
          (step.key === 'shipping' && (currentStep === 'payment' || currentStep === 'review' || currentStep === 'confirmation')) ||
          (step.key === 'payment' && (currentStep === 'review' || currentStep === 'confirmation'));
        
        return (
          <div key={step.key} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
            <div className="step-number">
              {isCompleted ? <Check className="w-4 h-4" /> : <StepIcon className="w-4 h-4" />}
            </div>
            <span className="hidden sm:inline">{step.label}</span>
            {index < 2 && <ChevronRight className="w-4 h-4 text-white/20" />}
          </div>
        );
      })}
    </div>
  );

  // Shipping Form
  if (currentStep === 'shipping') {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <button 
              onClick={() => setPage('Cart')} 
              className="flex items-center gap-2 text-white/50 hover:text-[#D4A574] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Cart
            </button>
            
            <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--header)' }}>
              Checkout
            </h1>
            <p className="text-white/60 mb-8">Complete your order in just a few steps.</p>
            
            <StepIndicator />
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn>
                <form onSubmit={handleShippingSubmit} className="glass-card">
                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--header)' }}>
                    Shipping Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Email *</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Phone *</label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm text-white/60 mb-2">Address *</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">City *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">State *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                        placeholder="NY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">ZIP Code *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zip}
                        onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                        placeholder="10001"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-white/60 mb-2">Country *</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({...shippingInfo, country: e.target.value})}
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>

                  <h3 className="text-lg font-medium mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Shipping Method
                  </h3>

                  {/* Subscription Shipping Notice */}
                  {hasSubscriptions && (
                    <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <p className="text-green-400 text-sm flex items-center gap-2">
                        <Truck className="w-4 h-4" />
                        <strong>All subscription refills ship FREE.</strong> This order only.
                      </p>
                    </div>
                  )}

                  <div className="space-y-3 mb-6">
                    <label className={`radio-label ${shippingMethod === 'standard' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Standard Shipping</span>
                          {hasOneTimeItems ? (
                            <span className="text-[#D4A574]">$6.99</span>
                          ) : (
                            <span className="text-green-400">FREE</span>
                          )}
                        </div>
                        <p className="text-white/50 text-sm">5-7 business days</p>
                      </div>
                    </label>

                    <label className={`radio-label ${shippingMethod === 'express' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Express Shipping</span>
                          <span className="text-[#D4A574]">$12.99</span>
                        </div>
                        <p className="text-white/50 text-sm">2-3 business days</p>
                      </div>
                    </label>
                  </div>

                  <button type="submit" className="w-full btn-gold justify-center">
                    Continue to Payment <ChevronRight className="w-5 h-5" />
                  </button>
                </form>
              </FadeIn>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="glass-card sticky top-28">
                  <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.isSubscription ? 'sub' : 'ot'}-${item.product.id}`} className="flex justify-between text-sm">
                        <span className="text-white/60 flex items-center gap-1">
                          {item.isSubscription && <RefreshCw className="w-3 h-3 text-green-400" />}
                          {item.product.shortName} × {item.quantity}
                        </span>
                        <span className={item.isSubscription ? 'text-green-400' : ''}>
                          ${((item.isSubscription ? (item.product.subscriptionPrice || item.product.price) : item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="gold-divider mb-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/60">Shipping</span>
                      {baseShippingCost === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        <span className="text-[#D4A574]">${baseShippingCost.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="gold-divider my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#D4A574]">${(total + baseShippingCost).toFixed(2)}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Payment Form
  if (currentStep === 'payment') {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <button 
              onClick={() => setCurrentStep('shipping')} 
              className="flex items-center gap-2 text-white/50 hover:text-[#D4A574] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Shipping
            </button>
            
            <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--header)' }}>
              Checkout
            </h1>
            <p className="text-white/60 mb-8">Choose your preferred payment method.</p>
            
            <StepIndicator />
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn>
                <div className="glass-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 text-sm">Secure SSL Encryption</span>
                  </div>

                  <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'var(--header)' }}>
                    Payment Method
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => setSelectedPaymentMethod(method.id)}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 relative ${
                            selectedPaymentMethod === method.id
                              ? 'border-[#D4A574] bg-[#D4A574]/10'
                              : 'border-white/10 hover:border-white/30 bg-white/5'
                          }`}
                        >
                          <div className={`p-2 rounded-lg ${method.color}`}>
                            <Icon />
                          </div>
                          <span className="text-sm font-medium">{method.name}</span>
                          {selectedPaymentMethod === method.id && (
                            <div className="absolute top-2 right-2 w-5 h-5 bg-[#D4A574] rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-black" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subscription Notification Preferences */}
                  {hasSubscriptions && (
                    <div className="mb-8 p-5 bg-green-500/10 border border-green-500/30 rounded-xl">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ fontFamily: 'var(--header)' }}>
                        <Bell className="w-5 h-5 text-green-400" />
                        Subscription Notifications
                      </h3>
                      <p className="text-white/70 text-sm mb-4">
                        How would you like to be notified when your refill is ready in {subscriptionItems[0]?.product.subscriptionInterval} weeks?
                      </p>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setNotificationMethod('email')}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            notificationMethod === 'email'
                              ? 'border-[#D4A574] bg-[#D4A574]/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Mail className="w-6 h-6" />
                          <span className="text-sm">Email</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNotificationMethod('sms')}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            notificationMethod === 'sms'
                              ? 'border-[#D4A574] bg-[#D4A574]/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Phone className="w-6 h-6" />
                          <span className="text-sm">Text</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setNotificationMethod('both')}
                          className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                            notificationMethod === 'both'
                              ? 'border-[#D4A574] bg-[#D4A574]/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <Bell className="w-6 h-6" />
                          <span className="text-sm">Both</span>
                        </button>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white/5 rounded-lg">
                        <p className="text-xs text-white/60">
                          <strong className="text-white">How it works:</strong> You'll receive a notification when your refill is ready. 
                          You have 5 days to respond with "Refill Now" or "Not Ready". If we don't hear from you, we'll ship automatically.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Credit Card Form (only show if card is selected) */}
                  {selectedPaymentMethod === 'card' && (
                    <form onSubmit={handlePaymentSubmit}>
                      <div className="mb-4">
                        <label className="block text-sm text-white/60 mb-2">Card Number *</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                          <input
                            type="text"
                            required
                            maxLength={19}
                            value={paymentInfo.cardNumber}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: formatCardNumber(e.target.value)})}
                            placeholder="1234 5678 9012 3456"
                            className="pl-12 font-mono"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm text-white/60 mb-2">Cardholder Name *</label>
                        <input
                          type="text"
                          required
                          value={paymentInfo.cardName}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cardName: e.target.value})}
                          placeholder="JOHN DOE"
                          className="uppercase"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm text-white/60 mb-2">Expiry Date *</label>
                          <input
                            type="text"
                            required
                            maxLength={5}
                            value={paymentInfo.expiry}
                            onChange={(e) => setPaymentInfo({...paymentInfo, expiry: formatExpiry(e.target.value)})}
                            placeholder="MM/YY"
                            className="font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-white/60 mb-2">CVV *</label>
                          <input
                            type="text"
                            required
                            maxLength={4}
                            value={paymentInfo.cvv}
                            onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value.replace(/\D/g, '')})}
                            placeholder="123"
                            className="font-mono"
                          />
                        </div>
                      </div>

                      <button type="submit" className="w-full btn-gold justify-center">
                        Review Order <ChevronRight className="w-5 h-5" />
                      </button>
                    </form>
                  )}

                  {/* Alternative Payment Methods */}
                  {selectedPaymentMethod !== 'card' && (
                    <div className="space-y-4">
                      <div className="p-6 bg-white/5 rounded-xl text-center">
                        <div className="mb-4">
                          {selectedPaymentMethod === 'paypal' && (
                            <>
                              <div className="flex justify-center mb-4">
                                <div className="p-4 bg-[#003087]/30 rounded-xl">
                                  <PayPalIcon />
                                </div>
                              </div>
                              <p className="text-white/80 mb-2">You'll be redirected to PayPal to complete your purchase.</p>
                              <p className="text-white/50 text-sm">Securely pay with your PayPal balance, bank account, or card.</p>
                            </>
                          )}
                          {selectedPaymentMethod === 'googlepay' && (
                            <>
                              <div className="flex justify-center mb-4">
                                <div className="p-4 bg-white/10 rounded-xl">
                                  <GooglePayIcon />
                                </div>
                              </div>
                              <p className="text-white/80 mb-2">Pay quickly and securely with Google Pay.</p>
                              <p className="text-white/50 text-sm">Use any card saved to your Google Account.</p>
                            </>
                          )}
                          {selectedPaymentMethod === 'applepay' && (
                            <>
                              <div className="flex justify-center mb-4">
                                <div className="p-4 bg-white/10 rounded-xl">
                                  <ApplePayIcon />
                                </div>
                              </div>
                              <p className="text-white/80 mb-2">Pay with Apple Pay on your Apple devices.</p>
                              <p className="text-white/50 text-sm">Fast, secure checkout with Face ID or Touch ID.</p>
                            </>
                          )}
                          {selectedPaymentMethod === 'venmo' && (
                            <>
                              <div className="flex justify-center mb-4">
                                <div className="p-4 bg-[#008CFF]/30 rounded-xl">
                                  <VenmoIcon />
                                </div>
                              </div>
                              <p className="text-white/80 mb-2">Pay with Venmo.</p>
                              <p className="text-white/50 text-sm">Use your Venmo balance or linked bank account.</p>
                            </>
                          )}
                        </div>
                      </div>

                      <button onClick={handlePaymentSubmit} className="w-full btn-gold justify-center">
                        Continue with {getPaymentMethodName()} <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  <div className="p-4 bg-white/5 rounded-lg mt-6">
                    <p className="text-sm text-white/60 text-center">
                      This is a demo checkout. No actual payment will be processed.
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="glass-card sticky top-28">
                  <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Order Summary
                  </h2>
                  
                  <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={`${item.isSubscription ? 'sub' : 'ot'}-${item.product.id}`} className="flex justify-between text-sm">
                        <span className="text-white/60 flex items-center gap-1">
                          {item.isSubscription && <RefreshCw className="w-3 h-3 text-green-400" />}
                          {item.product.shortName} × {item.quantity}
                        </span>
                        <span className={item.isSubscription ? 'text-green-400' : ''}>
                          ${((item.isSubscription ? (item.product.subscriptionPrice || item.product.price) : item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="gold-divider mb-4" />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/60">Shipping</span>
                      {baseShippingCost === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        <span className="text-[#D4A574]">${baseShippingCost.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <div className="gold-divider my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#D4A574]">${(total + baseShippingCost).toFixed(2)}</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review Order
  if (currentStep === 'review') {
    const finalTotal = total + baseShippingCost;

    return (
      <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <button 
              onClick={() => setCurrentStep('payment')} 
              className="flex items-center gap-2 text-white/50 hover:text-[#D4A574] transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Payment
            </button>
            
            <h1 className="text-3xl font-semibold mb-2" style={{ fontFamily: 'var(--header)' }}>
              Review Your Order
            </h1>
            <p className="text-white/60 mb-8">Please verify all details before placing your order.</p>
            
            <StepIndicator />
          </FadeIn>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Info */}
              <FadeIn>
                <div className="glass-card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--header)' }}>
                      Shipping Address
                    </h3>
                    <button 
                      onClick={() => setCurrentStep('shipping')}
                      className="text-[#D4A574] text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-white/80">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}<br />
                    {shippingInfo.country === 'US' ? 'United States' : shippingInfo.country}
                  </p>
                  <p className="text-white/60 mt-2">{shippingInfo.email}</p>
                  <p className="text-white/60">{shippingInfo.phone}</p>
                </div>
              </FadeIn>

              {/* Payment Info */}
              <FadeIn>
                <div className="glass-card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--header)' }}>
                      Payment Method
                    </h3>
                    <button 
                      onClick={() => setCurrentStep('payment')}
                      className="text-[#D4A574] text-sm hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    {selectedPaymentMethod === 'card' ? (
                      <>
                        <CreditCard className="w-8 h-8 text-[#D4A574]" />
                        <div>
                          <p className="text-white/80">•••• •••• •••• {paymentInfo.cardNumber.slice(-4)}</p>
                          <p className="text-white/60 text-sm">{paymentInfo.cardName}</p>
                          <p className="text-white/60 text-sm">Expires {paymentInfo.expiry}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-2 rounded-lg bg-white/10">
                          {selectedPaymentMethod === 'paypal' && <PayPalIcon />}
                          {selectedPaymentMethod === 'googlepay' && <GooglePayIcon />}
                          {selectedPaymentMethod === 'applepay' && <ApplePayIcon />}
                          {selectedPaymentMethod === 'venmo' && <VenmoIcon />}
                        </div>
                        <div>
                          <p className="text-white/80">{getPaymentMethodName()}</p>
                          <p className="text-white/60 text-sm">You'll complete payment on the next step</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </FadeIn>

              {/* Subscription Info */}
              {hasSubscriptions && (
                <FadeIn>
                  <div className="glass-card border-green-500/30">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: 'var(--header)' }}>
                        <RefreshCw className="w-5 h-5 text-green-400" />
                        Subscription Settings
                      </h3>
                      <button 
                        onClick={() => setCurrentStep('payment')}
                        className="text-[#D4A574] text-sm hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-white/60">Notification Method:</span>
                        <span className="text-green-400 flex items-center gap-1">
                          {notificationMethod === 'email' && <Mail className="w-4 h-4" />}
                          {notificationMethod === 'sms' && <Phone className="w-4 h-4" />}
                          {notificationMethod === 'both' && <Bell className="w-4 h-4" />}
                          {notificationMethod === 'email' && 'Email'}
                          {notificationMethod === 'sms' && 'Text Message'}
                          {notificationMethod === 'both' && 'Email & Text'}
                        </span>
                      </div>
                      <div className="p-3 bg-green-500/10 rounded-lg">
                        <p className="text-sm text-white/70">
                          <strong className="text-white">Your refill schedule:</strong> We'll notify you 
                          after {subscriptionItems[0]?.product.subscriptionInterval} weeks. You'll have 5 days to respond 
                          before automatic shipment.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}

              {/* Items */}
              <FadeIn>
                <div className="glass-card">
                  <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={`${item.isSubscription ? 'sub' : 'ot'}-${item.product.id}`} className="flex gap-4 pb-4 border-b border-white/10 last:border-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-white/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>{item.product.shortName}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium flex items-center gap-2">
                            {item.product.name}
                            {item.isSubscription && (
                              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" /> Subscription
                              </span>
                            )}
                          </h4>
                          <p className="text-white/60 text-sm">{item.product.size}</p>
                          <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                          {item.isSubscription && (
                            <p className="text-green-400/70 text-xs">
                              Refill every {item.product.subscriptionInterval} weeks
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${item.isSubscription ? 'text-green-400' : ''}`}>
                            ${((item.isSubscription ? (item.product.subscriptionPrice || item.product.price) : item.product.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <FadeIn>
                <div className="glass-card sticky top-28">
                  <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Order Total
                  </h2>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-white/60">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-white/60">Shipping</span>
                      {baseShippingCost === 0 ? (
                        <span className="text-green-400">FREE</span>
                      ) : (
                        <span className="text-[#D4A574]">${baseShippingCost.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Tax</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="gold-divider my-4" />

                  <div className="flex justify-between text-xl font-bold mb-6">
                    <span>Total</span>
                    <span className="text-[#D4A574]">${finalTotal.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-full btn-gold justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order <Lock className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-white/40 text-xs mt-4">
                    By placing this order, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Order Confirmation
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <FadeIn>
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
            <Check className="w-12 h-12 text-green-400" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
            Order Confirmed!
          </h1>
          
          <p className="text-white/60 mb-2 text-lg">
            Thank you for your purchase, {shippingInfo.firstName}!
          </p>
          
          <p className="text-white/40 mb-8">
            Your order number is <span className="text-[#D4A574] font-mono">{orderNumber}</span>
          </p>

          <div className="glass-card text-left mb-8">
            <h3 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Order Number</span>
                <span className="font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Email</span>
                <span>{shippingInfo.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Payment Method</span>
                <span>{getPaymentMethodName()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Shipping Method</span>
                <span>{shippingMethod === 'standard' ? 'Standard (5-7 days)' : 'Express (2-3 days)'}</span>
              </div>
              {hasSubscriptions && (
                <div className="flex justify-between">
                  <span className="text-white/60">Subscription Notifications</span>
                  <span className="text-green-400 flex items-center gap-1">
                    {notificationMethod === 'email' && <Mail className="w-3 h-3" />}
                    {notificationMethod === 'sms' && <Phone className="w-3 h-3" />}
                    {notificationMethod === 'both' && <Bell className="w-3 h-3" />}
                    {notificationMethod === 'email' && 'Email'}
                    {notificationMethod === 'sms' && 'Text'}
                    {notificationMethod === 'both' && 'Both'}
                  </span>
                </div>
              )}
              <div className="gold-divider my-3" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-[#D4A574]">${(total + baseShippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {hasSubscriptions && (
            <div className="glass-card border-green-500/30 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-green-400" />
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--header)' }}>
                  Your Subscription is Active
                </h3>
              </div>
              <p className="text-white/70 text-sm mb-4">
                We'll notify you via {notificationMethod === 'email' ? 'email' : notificationMethod === 'sms' ? 'text message' : 'email and text'} 
                when your refill is ready in {subscriptionItems[0]?.product.subscriptionInterval} weeks.
              </p>
              <div className="p-3 bg-green-500/10 rounded-lg">
                <p className="text-xs text-white/60">
                  <strong className="text-white">Remember:</strong> You'll have 5 days to respond. 
                  Choose "Refill Now" to ship immediately, "Not Ready" to delay, or do nothing and we'll ship automatically.
                </p>
              </div>
              <div className="mt-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-xs text-green-400 flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  <strong>All future refills ship FREE.</strong> Never pay shipping on subscription orders again.
                </p>
              </div>
              <button 
                onClick={() => setPage('Subscriptions')}
                className="mt-4 w-full py-3 border border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-black transition-all text-sm font-medium"
              >
                Manage Subscriptions
              </button>
            </div>
          )}

          <p className="text-white/60 mb-8">
            We've sent a confirmation email to {shippingInfo.email} with your order details.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage('Shop')} className="btn-gold">
              Continue Shopping
            </button>
            <button onClick={() => setPage('Home')} className="btn-outline">
              Back to Home
            </button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
