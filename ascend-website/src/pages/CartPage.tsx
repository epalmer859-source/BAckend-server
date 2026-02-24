import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { FadeIn } from '@/components/FadeIn';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, RefreshCw, Bell, Truck, Sparkles } from 'lucide-react';

interface CartPageProps {
  setPage: (page: string) => void;
}

export function CartPage({ setPage }: CartPageProps) {
  const { items, removeFromCart, updateQuantity, subtotal, discount, total, discountCode, applyDiscountCode, removeDiscountCode } = useCart();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');
    
    if (!promoInput.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    const success = applyDiscountCode(promoInput);
    if (success) {
      setPromoSuccess(`Code ${promoInput.toUpperCase()} applied! You saved $10.`);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try WELCOME10');
    }
  };

  const handleRemovePromo = () => {
    removeDiscountCode();
    setPromoSuccess('');
    setPromoError('');
  };

  // Separate subscription and one-time items
  const subscriptionItems = items.filter(item => item.isSubscription);
  const oneTimeItems = items.filter(item => !item.isSubscription);
  
  // Calculate shipping
  const hasOneTimeItems = oneTimeItems.length > 0;
  const hasSubscriptions = subscriptionItems.length > 0;
  const shippingCost = hasOneTimeItems ? 6.99 : 0; // Shipping only for one-time purchases
  const finalTotal = total + shippingCost;

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <FadeIn>
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-[#D4A574]" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
              Your Cart is Empty
            </h1>
            <p className="text-white/60 mb-8 text-lg">
              Ready to start your journey to clear skin?
            </p>
            <button 
              onClick={() => { setPage('Shop'); window.scrollTo(0,0); }}
              className="btn-gold"
            >
              Shop Products <ArrowRight className="w-5 h-5" />
            </button>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <h1 className="text-3xl sm:text-4xl font-semibold mb-2" style={{ fontFamily: 'var(--header)' }}>
            Shopping Cart
          </h1>
          <p className="text-white/60 mb-8">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Items */}
            {subscriptionItems.length > 0 && (
              <FadeIn>
                <div className="glass-card border-green-500/30">
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles className="w-5 h-5 text-green-400" />
                    <h2 className="text-lg font-semibold" style={{ fontFamily: 'var(--header)' }}>
                      Subscription Items
                    </h2>
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                      <Truck className="w-3 h-3" /> FREE shipping on refills
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {subscriptionItems.map((item) => (
                      <div key={`sub-${item.product.id}`} className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        {/* Product Image */}
                        <div 
                          className="cart-item-image w-full sm:w-28 h-28 cursor-pointer"
                          onClick={() => { setPage(`Product:${item.product.id}`); window.scrollTo(0,0); }}
                        >
                          <div className="text-center">
                            <div className="text-xs tracking-widest" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                            <div className="text-sm text-green-400" style={{ fontFamily: 'var(--header)' }}>{item.product.shortName}</div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <h3 
                                className="text-lg font-medium cursor-pointer hover:text-green-400 transition-colors"
                                onClick={() => { setPage(`Product:${item.product.id}`); window.scrollTo(0,0); }}
                                style={{ fontFamily: 'var(--header)' }}
                              >
                                {item.product.name}
                              </h3>
                              <p className="text-green-400 text-sm italic flex items-center gap-1">
                                <RefreshCw className="w-3 h-3" /> Subscription
                              </p>
                              <p className="text-white/50 text-sm mt-1">{item.product.size}</p>
                              <p className="text-green-400/70 text-xs mt-1">
                                Refill every {item.product.subscriptionInterval} weeks
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-green-400">
                                ${(item.product.subscriptionPrice || item.product.price) * item.quantity}
                              </p>
                              {item.quantity > 1 && (
                                <p className="text-white/50 text-sm">
                                  ${item.product.subscriptionPrice || item.product.price} each
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Control */}
                            <div className="quantity-control">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, true)}
                                className="hover:text-green-400"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, true)}
                                className="hover:text-green-400"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button 
                              onClick={() => removeFromCart(item.product.id, true)}
                              className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Subscription Benefits */}
                  <div className="mt-4 p-4 bg-green-500/10 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Bell className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-white mb-1">Subscription Benefits</p>
                        <ul className="text-white/70 space-y-1">
                          <li>• Save ${subscriptionItems.reduce((sum, item) => sum + (item.product.price - (item.product.subscriptionPrice || item.product.price)) * item.quantity, 0)} on this order</li>
                          <li>• <strong className="text-green-400">FREE shipping</strong> on all future refills</li>
                          <li>• Refill reminders via email or text</li>
                          <li>• 5-day response window — refill, delay, or auto-ship</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* One-time Items */}
            {oneTimeItems.length > 0 && (
              <FadeIn>
                <div className="glass-card">
                  <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'var(--header)' }}>
                    Single Purchase
                  </h2>
                  
                  <div className="space-y-4">
                    {oneTimeItems.map((item) => (
                      <div key={`onetime-${item.product.id}`} className="flex flex-col sm:flex-row gap-4 pb-4 border-b border-white/10 last:border-0 last:pb-0">
                        {/* Product Image */}
                        <div 
                          className="cart-item-image w-full sm:w-28 h-28 cursor-pointer"
                          onClick={() => { setPage(`Product:${item.product.id}`); window.scrollTo(0,0); }}
                        >
                          <div className="text-center">
                            <div className="text-xs tracking-widest" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                            <div className="text-sm text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>{item.product.shortName}</div>
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                            <div>
                              <h3 
                                className="text-lg font-medium cursor-pointer hover:text-[#D4A574] transition-colors"
                                onClick={() => { setPage(`Product:${item.product.id}`); window.scrollTo(0,0); }}
                                style={{ fontFamily: 'var(--header)' }}
                              >
                                {item.product.name}
                              </h3>
                              <p className="text-[#D4A574] text-sm italic">{item.product.sub}</p>
                              <p className="text-white/50 text-sm mt-1">{item.product.size}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">${item.product.price * item.quantity}</p>
                              {item.quantity > 1 && (
                                <p className="text-white/50 text-sm">${item.product.price} each</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Control */}
                            <div className="quantity-control">
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1, false)}
                                className="hover:text-[#D4A574]"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1, false)}
                                className="hover:text-[#D4A574]"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button 
                              onClick={() => removeFromCart(item.product.id, false)}
                              className="flex items-center gap-2 text-white/50 hover:text-red-400 transition-colors text-sm"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Single Purchase Notice */}
                  <div className="mt-4 p-3 bg-white/5 rounded-lg">
                    <p className="text-white/60 text-sm flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Shipping applies to single purchases. <button onClick={() => setPage('Shop')} className="text-green-400 hover:underline">Subscribe</button> for free shipping on refills.
                    </p>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <FadeIn>
              <div className="glass-card sticky top-28">
                <h2 className="text-lg font-semibold mb-6" style={{ fontFamily: 'var(--header)' }}>
                  Order Summary
                </h2>

                {/* Promo Code */}
                {!discountCode ? (
                  <div className="mb-6">
                    <label className="text-sm text-white/60 mb-2 block">Promo Code</label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Enter code"
                          className="pl-10"
                          onKeyPress={(e) => e.key === 'Enter' && handleApplyPromo()}
                        />
                      </div>
                      <button 
                        onClick={handleApplyPromo}
                        className="px-4 py-2 border border-[#D4A574] text-[#D4A574] rounded-lg hover:bg-[#D4A574] hover:text-black transition-all text-sm font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    {promoError && (
                      <p className="text-red-400 text-xs mt-2">{promoError}</p>
                    )}
                    {promoSuccess && (
                      <p className="text-green-400 text-xs mt-2">{promoSuccess}</p>
                    )}
                  </div>
                ) : (
                  <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-medium">{discountCode}</span>
                      </div>
                      <button 
                        onClick={handleRemovePromo}
                        className="text-white/50 hover:text-white text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-green-400 text-xs mt-1">$10 discount applied</p>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="order-summary-row">
                    <span className="text-white/60">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="order-summary-row discount">
                      <span>Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {/* Shipping */}
                  <div className="order-summary-row">
                    <span className="text-white/60">Shipping</span>
                    {hasOneTimeItems ? (
                      <span>${shippingCost.toFixed(2)}</span>
                    ) : (
                      <span className="text-green-400">FREE</span>
                    )}
                  </div>
                  
                  {/* Shipping Note */}
                  {hasSubscriptions && !hasOneTimeItems && (
                    <div className="text-xs text-green-400/70">
                      Subscription orders ship FREE
                    </div>
                  )}
                  {hasSubscriptions && hasOneTimeItems && (
                    <div className="text-xs text-white/50">
                      Shipping charged for single purchases only
                    </div>
                  )}
                  
                  <div className="order-summary-row">
                    <span className="text-white/60">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="gold-divider mb-6" />

                <div className="order-summary-row total mb-6">
                  <span>Total</span>
                  <span className="text-[#D4A574]">${finalTotal.toFixed(2)}</span>
                </div>

                {/* Subscription Note */}
                {hasSubscriptions && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-400 text-xs flex items-start gap-2">
                      <Truck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span>
                        <strong>All future refills ship FREE.</strong> You'll choose notification preferences during checkout.
                      </span>
                    </p>
                  </div>
                )}

                <button 
                  onClick={() => { setPage('Checkout'); window.scrollTo(0,0); }}
                  className="w-full btn-gold justify-center"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>

                <button 
                  onClick={() => { setPage('Shop'); window.scrollTo(0,0); }}
                  className="w-full mt-3 text-white/50 hover:text-[#D4A574] transition-colors text-sm"
                >
                  Continue Shopping
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}
