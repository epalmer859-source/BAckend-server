export interface Product {
  id: number;
  name: string;
  shortName: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  subscriptionPrice?: number;
  size: string;
  sub: string;
  desc: string;
  heroGradient: string;
  badge?: string;
  discountEligible?: boolean;
  subscriptionEligible?: boolean;
  subscriptionInterval?: number; // weeks between refills
  keyBenefits: { icon: string; title: string; desc: string }[];
  howToUse: { steps: string[]; tip: string };
  fullIngredients: string;
  keyActives: { name: string; percent: string; desc: string }[];
  results: {
    timeline: { week: string; result: string }[];
    stat: string;
    statLabel: string;
  };
  reviews: Review[];
  avgRating: string;
  related: number[];
}

export interface Review {
  id: number;
  name: string;
  star: number;
  text: string;
  product: string;
  time: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  isSubscription?: boolean;
}

export interface Subscription {
  id: string;
  product: Product;
  quantity: number;
  startDate: string;
  nextRefillDate: string;
  status: 'active' | 'paused' | 'cancelled';
  notificationMethod: 'email' | 'sms' | 'both';
  email?: string;
  phone?: string;
  refillRequested: boolean;
  refillResponseDeadline?: string;
  lastRefillDate?: string;
}

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}
