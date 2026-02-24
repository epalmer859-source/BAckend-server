import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Product, CartItem, Subscription } from '@/types';

interface CartContextType {
  items: CartItem[];
  subscriptions: Subscription[];
  addToCart: (product: Product, quantity?: number, isSubscription?: boolean) => void;
  removeFromCart: (productId: number, isSubscription?: boolean) => void;
  updateQuantity: (productId: number, quantity: number, isSubscription?: boolean) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  subscriptionTotal: number;
  discount: number;
  total: number;
  discountCode: string | null;
  applyDiscountCode: (code: string) => boolean;
  removeDiscountCode: () => void;
  // Subscription management
  addSubscription: (subscription: Omit<Subscription, 'id' | 'status' | 'refillRequested'>) => void;
  updateSubscription: (id: string, updates: Partial<Subscription>) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  respondToRefill: (id: string, response: 'refill' | 'delay') => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [discountCode, setDiscountCode] = useState<string | null>(null);

  const addToCart = useCallback((product: Product, quantity = 1, isSubscription = false) => {
    setItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.isSubscription === isSubscription);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.isSubscription === isSubscription
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isSubscription }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number, isSubscription = false) => {
    setItems(prev => prev.filter(item => !(item.product.id === productId && item.isSubscription === isSubscription)));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number, isSubscription = false) => {
    if (quantity <= 0) {
      removeFromCart(productId, isSubscription);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.isSubscription === isSubscription
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    setDiscountCode(null);
  }, []);

  const applyDiscountCode = useCallback((code: string): boolean => {
    const validCodes = ['WELCOME10', 'ASCEND10', 'SAVE10'];
    if (validCodes.includes(code.toUpperCase())) {
      setDiscountCode(code.toUpperCase());
      return true;
    }
    return false;
  }, []);

  const removeDiscountCode = useCallback(() => {
    setDiscountCode(null);
  }, []);

  // Subscription management
  const addSubscription = useCallback((subscriptionData: Omit<Subscription, 'id' | 'status' | 'refillRequested'>) => {
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: `SUB-${Date.now().toString(36).toUpperCase()}`,
      status: 'active',
      refillRequested: false,
    };
    setSubscriptions(prev => [...prev, newSubscription]);
  }, []);

  const updateSubscription = useCallback((id: string, updates: Partial<Subscription>) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, ...updates } : sub)
    );
  }, []);

  const pauseSubscription = useCallback((id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'paused' } : sub)
    );
  }, []);

  const resumeSubscription = useCallback((id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'active' } : sub)
    );
  }, []);

  const cancelSubscription = useCallback((id: string) => {
    setSubscriptions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, status: 'cancelled' } : sub)
    );
  }, []);

  const respondToRefill = useCallback((id: string, response: 'refill' | 'delay') => {
    setSubscriptions(prev =>
      prev.map(sub => {
        if (sub.id !== id) return sub;
        
        if (response === 'refill') {
          // Process refill - update dates
          const now = new Date();
          const nextRefill = new Date();
          nextRefill.setDate(now.getDate() + (sub.product.subscriptionInterval || 5) * 7);
          
          return {
            ...sub,
            lastRefillDate: now.toISOString(),
            nextRefillDate: nextRefill.toISOString(),
            refillRequested: false,
            refillResponseDeadline: undefined,
          };
        } else {
          // Delay - ask again in 7 days
          const nextCheck = new Date();
          nextCheck.setDate(nextCheck.getDate() + 7);
          
          return {
            ...sub,
            nextRefillDate: nextCheck.toISOString(),
            refillRequested: false,
            refillResponseDeadline: undefined,
          };
        }
      })
    );
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Calculate subtotal - use subscription price if available
  const subtotal = items.reduce((sum, item) => {
    const price = item.isSubscription && item.product.subscriptionPrice 
      ? item.product.subscriptionPrice 
      : item.product.price;
    return sum + price * item.quantity;
  }, 0);
  
  // Calculate subscription total separately
  const subscriptionTotal = items
    .filter(item => item.isSubscription)
    .reduce((sum, item) => {
      const price = item.product.subscriptionPrice || item.product.price;
      return sum + price * item.quantity;
    }, 0);
  
  // Apply $10 discount if code is valid and subtotal >= $30
  const discount = discountCode && subtotal >= 30 ? 10 : 0;
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        items,
        subscriptions,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        subscriptionTotal,
        discount,
        total,
        discountCode,
        applyDiscountCode,
        removeDiscountCode,
        addSubscription,
        updateSubscription,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        respondToRefill,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
