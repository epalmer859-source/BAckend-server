import { useState } from 'react';
import { FadeIn } from '@/components/FadeIn';
import { Stars } from '@/components/Icons';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { ArrowLeft, ArrowRight, Plus, Minus, ShoppingCart, Check, RefreshCw, Bell, Truck, Sparkles } from 'lucide-react';

interface ProductPageProps {
  productId: number;
  setPage: (page: string) => void;
}

export function ProductPage({ productId, setPage }: ProductPageProps) {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'benefits' | 'howToUse' | 'ingredients' | 'results'>('benefits');
  const [quantity, setQuantity] = useState(1);
  const [purchaseType, setPurchaseType] = useState<'subscription' | 'onetime'>('subscription');

  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return (
      <div className="min-h-screen pt-32 px-6 text-center">
        <h1 className="text-2xl mb-4">Product not found</h1>
        <button onClick={() => setPage('Shop')} className="btn-gold">
          Back to Shop
        </button>
      </div>
    );
  }

  const relatedProducts = product.related.map(id => products.find(p => p.id === id)).filter(Boolean);
  
  const currentPrice = purchaseType === 'subscription' && product.subscriptionPrice 
    ? product.subscriptionPrice 
    : product.price;
  
  const savings = product.subscriptionPrice ? product.price - product.subscriptionPrice : 0;

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div 
          className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(ellipse, rgba(212,165,116,0.1) 0%, transparent 60%)',
            filter: 'blur(60px)'
          }}
        />

        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => setPage('Shop')} 
            className="flex items-center gap-2 text-white/50 hover:text-[#D4A574] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </button>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">
            {/* Product Image */}
            <FadeIn>
              <div className="relative">
                {product.badge && (
                  <div className="absolute -top-4 right-10 bg-[#D4A574] text-black text-xs font-bold px-4 py-2 rounded-full z-10">
                    {product.badge}
                  </div>
                )}
                {purchaseType === 'subscription' && product.subscriptionEligible && (
                  <div className="absolute -top-4 left-10 bg-green-500 text-black text-xs font-bold px-4 py-2 rounded-full z-10 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> MOST POPULAR
                  </div>
                )}
                <div 
                  className="h-80 lg:h-[450px] rounded-2xl border border-white/10 flex items-center justify-center"
                  style={{ 
                    background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
                  }}
                >
                  <div className="text-center">
                    <div className="text-sm tracking-[0.15em] font-bold mb-3" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                    <div className="text-4xl lg:text-5xl text-[#D4A574] mb-4" style={{ fontFamily: 'var(--header)' }}>{product.shortName}</div>
                    <div className="w-20 h-0.5 bg-[#D4A574] mx-auto" />
                    {purchaseType === 'subscription' && product.subscriptionPrice && (
                      <div className="mt-4 px-4 py-2 bg-green-500/20 rounded-full inline-block">
                        <span className="text-green-400 text-sm font-medium">Save ${savings} every refill</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Product Info */}
            <FadeIn>
              <div>
                <p className="text-[#D4A574] text-sm tracking-widest mb-3">{product.sub}</p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl mb-2 leading-tight" style={{ fontFamily: 'var(--header)' }}>
                  {product.name}
                </h1>
                <p className="text-[#D4A574] italic text-lg mb-5">{product.tagline}</p>

                <div className="flex items-center gap-3 mb-5">
                  <Stars count={5} />
                  <span className="text-[#D4A574] font-bold">{product.avgRating}</span>
                  <span className="text-white/60 text-sm">({product.reviews.length} reviews)</span>
                </div>

                <p className="text-white text-base leading-relaxed mb-6">{product.desc}</p>

                {/* Purchase Type Selection - SUBSCRIBE & SAVE FIRST */}
                {product.subscriptionEligible && (
                  <div className="mb-6">
                    <label className="block text-sm text-white/60 mb-3">Choose Your Plan</label>
                    <div className="grid grid-cols-2 gap-3">
                      {/* SUBSCRIBE & SAVE - FIRST OPTION */}
                      <button
                        onClick={() => setPurchaseType('subscription')}
                        className={`p-4 rounded-xl border-2 transition-all text-left relative ${
                          purchaseType === 'subscription'
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="absolute -top-2 left-3 bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
                          RECOMMENDED
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <RefreshCw className="w-4 h-4 text-green-400" />
                          <span className="font-medium text-green-400">Subscribe & Save</span>
                        </div>
                        <div className="text-2xl font-bold text-green-400">${product.subscriptionPrice}</div>
                        <div className="text-xs text-green-400/70 mt-1">per refill</div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full">
                            Save ${savings}
                          </span>
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-[10px] rounded-full flex items-center gap-1">
                            <Truck className="w-3 h-3" /> FREE shipping on refills
                          </span>
                        </div>
                      </button>
                      
                      {/* ONE-TIME PURCHASE - SECOND OPTION */}
                      <button
                        onClick={() => setPurchaseType('onetime')}
                        className={`p-4 rounded-xl border-2 transition-all text-left ${
                          purchaseType === 'onetime'
                            ? 'border-[#D4A574] bg-[#D4A574]/10'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="font-medium mb-2 text-white/70">Single Purchase</div>
                        <div className="text-2xl font-bold">${product.price}</div>
                        <div className="text-xs text-white/50 mt-1">one-time</div>
                        <div className="mt-2">
                          <span className="px-2 py-0.5 bg-white/10 text-white/50 text-[10px] rounded-full">
                            + shipping
                          </span>
                        </div>
                      </button>
                    </div>
                    
                    {/* Subscription Benefits Banner */}
                    {purchaseType === 'subscription' && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-green-400" />
                          <span className="font-semibold text-green-400">Subscription Benefits</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-white/80">
                            <Check className="w-4 h-4 text-green-400" />
                            <span>Save ${savings} every {product.subscriptionInterval} weeks</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Truck className="w-4 h-4 text-green-400" />
                            <span><strong className="text-green-400">FREE shipping</strong> on all refills</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <Bell className="w-4 h-4 text-green-400" />
                            <span>Refill reminders via email or text</span>
                          </div>
                          <div className="flex items-center gap-2 text-white/80">
                            <RefreshCw className="w-4 h-4 text-green-400" />
                            <span>Pause or cancel anytime</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* One-time Shipping Notice */}
                    {purchaseType === 'onetime' && (
                      <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-2 text-white/60 text-sm">
                          <Truck className="w-4 h-4" />
                          <span>Standard shipping applies to single purchases. Subscribe for free shipping on refills.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-4 mb-7">
                  <span className="text-3xl font-bold">${currentPrice}</span>
                  {purchaseType === 'subscription' && product.subscriptionPrice && (
                    <span className="text-white/40 line-through text-xl">${product.price}</span>
                  )}
                  <span className="text-white/50 text-sm">{product.size}</span>
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex gap-4 mb-6">
                  <div className="quantity-control">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button 
                    onClick={() => { 
                      for(let i=0; i<quantity; i++) addToCart(product, 1, purchaseType === 'subscription');
                      setPage('Cart');
                    }}
                    className={`flex-1 justify-center ${purchaseType === 'subscription' ? 'bg-green-500 hover:bg-green-400 text-black' : 'btn-gold'}`}
                  >
                    <ShoppingCart className="w-5 h-5" /> 
                    {purchaseType === 'subscription' ? 'Subscribe Now' : 'Add to Cart'}
                    <span className="ml-2">— ${currentPrice * quantity}</span>
                  </button>
                </div>

                <div className="flex gap-6 text-xs text-white/50">
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Dermatologist-tested</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Cruelty-free</span>
                  <span className="flex items-center gap-1"><Check className="w-3 h-3" /> 30-day guarantee</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Subscription How It Works Section */}
      {product.subscriptionEligible && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-green-500/5 border-y border-green-500/20">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'var(--header)' }}>
                  How ASCEND Subscriptions Work
                </h2>
                <p className="text-green-400">Never run out. Always save. Complete control.</p>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-xl font-bold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Subscribe Today</h4>
                  <p className="text-white/60 text-sm">Save ${savings} on your first order. Pay shipping once.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-xl font-bold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">We Notify You</h4>
                  <p className="text-white/60 text-sm">After {product.subscriptionInterval} weeks, get a refill reminder via email or text.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-xl font-bold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2 flex items-center justify-center gap-1">
                    <Truck className="w-4 h-4 text-green-400" /> FREE Shipping
                  </h4>
                  <p className="text-white/60 text-sm"><strong className="text-green-400">All refills ship FREE.</strong> No shipping costs ever again.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-green-400 text-xl font-bold">4</span>
                  </div>
                  <h4 className="font-semibold mb-2">You're in Control</h4>
                  <p className="text-white/60 text-sm">5 days to respond. Refill, delay, or we'll auto-ship.</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Tab Navigation */}
      <section className="border-t border-b border-white/10 bg-[var(--bg2)]">
        <div className="max-w-6xl mx-auto flex justify-center">
          {['benefits', 'howToUse', 'ingredients', 'results'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-6 sm:px-8 py-5 text-sm tracking-widest uppercase transition-all border-b-2 ${
                activeTab === tab 
                  ? 'text-[#D4A574] border-[#D4A574]' 
                  : 'text-white border-transparent hover:text-[#D4A574]'
              }`}
              style={{ fontFamily: 'var(--header)' }}
            >
              {tab === 'howToUse' ? 'How To Use' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {activeTab === 'benefits' && (
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--header)' }}>Key Benefits</h2>
              <p className="text-[#D4A574] italic">Engineered for performance. Built for results.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {product.keyBenefits.map((benefit, i) => (
                <div key={i} className="glass-card text-center">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-lg mb-3" style={{ fontFamily: 'var(--header)' }}>{benefit.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        )}

        {activeTab === 'howToUse' && (
          <FadeIn>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl mb-6" style={{ fontFamily: 'var(--header)' }}>How To Use</h2>
                <div className="space-y-4">
                  {product.howToUse.steps.map((step, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full border border-[#D4A574] flex items-center justify-center text-sm text-[#D4A574] flex-shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-white text-base pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div 
                className="glass-card"
                style={{ background: 'linear-gradient(145deg, rgba(212,165,116,0.08), rgba(212,165,116,0.02))' }}
              >
                <div className="text-[#D4A574] text-xs tracking-widest mb-3">PRO TIP</div>
                <p className="text-white text-base leading-relaxed italic">{product.howToUse.tip}</p>
              </div>
            </div>
          </FadeIn>
        )}

        {activeTab === 'ingredients' && (
          <FadeIn>
            <div className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--header)' }}>Key Actives</h2>
              <p className="text-[#D4A574] italic">Every ingredient chosen for a specific purpose.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {product.keyActives.map((active, i) => (
                <div key={i} className="glass-card">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg" style={{ fontFamily: 'var(--header)' }}>{active.name}</h3>
                    {active.percent && <span className="text-[#D4A574] text-sm font-semibold">{active.percent}</span>}
                  </div>
                  <div className="gold-divider w-16 mb-3" />
                  <p className="text-white/80 text-sm leading-relaxed">{active.desc}</p>
                </div>
              ))}
            </div>
            <div className="glass-card">
              <h3 className="text-base mb-4 text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>FULL INGREDIENT LIST</h3>
              <p className="text-white/70 text-sm leading-7">{product.fullIngredients}</p>
            </div>
          </FadeIn>
        )}

        {activeTab === 'results' && (
          <FadeIn>
            <div className="text-center mb-12">
              <div 
                className="inline-block px-14 py-10 rounded-2xl border border-[#D4A574]/30"
                style={{ background: 'linear-gradient(145deg, rgba(212,165,116,0.1), rgba(212,165,116,0.02))' }}
              >
                <div className="text-6xl sm:text-7xl font-bold text-[#D4A574] leading-none" style={{ fontFamily: 'var(--header)' }}>
                  {product.results.stat}
                </div>
                <p className="text-white text-base mt-3">{product.results.statLabel}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {product.results.timeline.map((item, i) => (
                <div key={i} className="glass-card text-center relative">
                  {i < 3 && (
                    <div 
                      className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5"
                      style={{ background: 'linear-gradient(90deg, #D4A574, transparent)' }}
                    />
                  )}
                  <div className="text-[#D4A574] text-xs tracking-widest mb-3">{item.week}</div>
                  <p className="text-white text-sm leading-relaxed">{item.result}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        )}
      </section>

      {/* Reviews Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--bg2)] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl mb-3" style={{ fontFamily: 'var(--header)' }}>Customer Reviews</h2>
            <div className="flex items-center justify-center gap-3">
              <Stars count={5} />
              <span className="text-[#D4A574] text-2xl font-bold">{product.avgRating}</span>
              <span className="text-white">Based on {product.reviews.length} reviews</span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.reviews.slice(0, 6).map((review, i) => (
              <FadeIn key={i}>
                <div className="glass-card">
                  <div className="flex justify-between mb-3">
                    <div>
                      <strong className="text-sm">{review.name}</strong>
                      {review.verified && <span className="text-xs text-[#D4A574] ml-2">✓ Verified</span>}
                    </div>
                    <span className="text-xs text-white/60">{review.time}</span>
                  </div>
                  <Stars count={review.star} />
                  <p className="text-white/80 text-sm leading-relaxed mt-3">{review.text}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {product.reviews.length > 6 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => { setPage('Reviews'); window.scrollTo(0,0); }}
                className="btn-outline"
              >
                See All {product.reviews.length} Reviews <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-10">
            <h2 className="text-2xl mb-2" style={{ fontFamily: 'var(--header)' }}>Complete Your Routine</h2>
            <p className="text-[#D4A574] italic">Products that work better together.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((related, i) => related && (
              <FadeIn key={i}>
                <div 
                  className="glass-card cursor-pointer hover:border-[#D4A574]/30 transition-colors"
                  onClick={() => { setPage(`Product:${related.id}`); window.scrollTo(0,0); }}
                >
                  <div 
                    className="h-36 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-white/10 mb-4 flex items-center justify-center"
                  >
                    <div className="text-center">
                      <div className="text-xs tracking-widest" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                      <div className="text-base text-[#D4A574]" style={{ fontFamily: 'var(--header)' }}>{related.shortName}</div>
                    </div>
                  </div>
                  <h3 className="text-base mb-1" style={{ fontFamily: 'var(--header)' }}>{related.name}</h3>
                  <p className="text-[#D4A574] text-sm">${related.price}</p>
                  {related.subscriptionEligible && (
                    <p className="text-green-400 text-xs mt-1 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3" /> or ${related.subscriptionPrice}/refill
                    </p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
