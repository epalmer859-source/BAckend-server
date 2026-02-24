import { FadeIn } from '@/components/FadeIn';
import { Stars } from '@/components/Icons';
import { products, ALL_REVIEWS } from '@/data/products';
import { RefreshCw, Truck, ArrowRight } from 'lucide-react';

interface ShopPageProps {
  setPage: (page: string) => void;
}

export function ShopPage({ setPage }: ShopPageProps) {
  const getReviewCount = (shortName: string) => 
    ALL_REVIEWS.filter(r => r.product === shortName).length;

  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <FadeIn className="text-center mb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl mb-3" style={{ fontFamily: 'var(--header)' }}>
          Shop
        </h2>
        <p className="text-white text-base">
          Clinical-grade acne control. Built for men who perform.
        </p>
      </FadeIn>

      {/* Subscribe & Save Box */}
      <FadeIn className="mb-12">
        <div className="glass-card border-green-500/30 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--header)' }}>
                Subscribe & Save
              </h3>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm">
                <span className="flex items-center gap-1 text-green-400">
                  <Truck className="w-4 h-4" /> FREE shipping on refills
                </span>
                <span className="text-white/60">•</span>
                <span className="text-white/80">Save $4 per phase</span>
                <span className="text-white/60">•</span>
                <span className="text-white/80">Save $12 on Full System</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
        {products.map((product) => (
          <FadeIn key={product.id}>
            <div 
              className="glass-card flex flex-col h-full relative group cursor-pointer hover:border-[#D4A574]/50 transition-all"
              onClick={() => { setPage(`Product:${product.id}`); window.scrollTo(0,0); }}
            >
              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between z-10">
                {product.id === 4 && (
                  <span className="px-2 py-1 bg-[#D4A574] text-black text-[10px] font-bold rounded-full">
                    BEST VALUE
                  </span>
                )}
                {product.subscriptionEligible && (
                  <span className="px-2 py-1 bg-green-500 text-black text-[10px] font-bold rounded-full flex items-center gap-1 ml-auto">
                    SAVE ${product.price - (product.subscriptionPrice || 0)}
                  </span>
                )}
              </div>

              {/* Product Image */}
              <div 
                className="h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-lg border border-white/10 mb-5 flex items-center justify-center transition-all group-hover:border-[#D4A574]/50"
              >
                <div className="text-center">
                  <div className="text-xs tracking-widest font-bold" style={{ fontFamily: 'var(--header)' }}>ASCEND</div>
                  <div className="text-lg text-[#D4A574] mt-1" style={{ fontFamily: 'var(--header)' }}>{product.shortName}</div>
                </div>
              </div>

              {/* Product Info */}
              <h3 
                className="text-lg font-medium mb-1"
                style={{ fontFamily: 'var(--header)' }}
              >
                {product.name}
              </h3>
              <p className="text-[#D4A574] text-sm italic mb-1">{product.sub}</p>
              <p className="text-white text-sm mb-1">{product.desc.split('.')[0]}.</p>
              <p className="text-white/50 text-xs mb-3">{product.size}</p>

              <div className="flex items-center gap-2 mb-4">
                <Stars count={5} />
                <span className="text-xs text-white/60">({getReviewCount(product.shortName)})</span>
              </div>

              {/* Pricing */}
              <div className="mt-auto">
                {product.subscriptionEligible && product.subscriptionPrice ? (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-green-400">${product.subscriptionPrice}</span>
                      <span className="text-xs text-green-400/70">/refill</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white">${product.price}</span>
                      <span className="text-xs text-white/50">single purchase</span>
                    </div>
                  </div>
                ) : (
                  <span className="text-xl font-bold">${product.price}</span>
                )}
                
                {/* View Details CTA */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <span className="text-[#D4A574] text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Details <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Why 90% Subscribe */}
      <FadeIn>
        <div className="glass-card max-w-5xl mx-auto border-green-500/20">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-2" style={{ fontFamily: 'var(--header)' }}>
              Why 90% of Our Customers Subscribe
            </h3>
            <p className="text-green-400">Save money. Never run out. Free shipping on refills.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold text-lg">$4</span>
              </div>
              <h4 className="font-medium mb-1">Save Per Phase</h4>
              <p className="text-white/60 text-sm">$23 instead of $27 on every refill</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 font-bold text-lg">$12</span>
              </div>
              <h4 className="font-medium mb-1">Save on System</h4>
              <p className="text-white/60 text-sm">$69 instead of $81 on Full System</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium mb-1">Free Shipping</h4>
              <p className="text-white/60 text-sm">Never pay shipping on refills again</p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-3">
                <RefreshCw className="w-6 h-6 text-green-400" />
              </div>
              <h4 className="font-medium mb-1">Full Control</h4>
              <p className="text-white/60 text-sm">Pause, delay, or cancel anytime</p>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-500/10 rounded-lg text-center">
            <p className="text-white/80 text-sm">
              <strong className="text-green-400">How it works:</strong> Subscribe now, pay shipping once. 
              After 5 weeks, we'll notify you. You have 5 days to respond — refill now, delay, or we'll auto-ship. 
              <strong className="text-green-400"> All refills ship FREE.</strong>
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
