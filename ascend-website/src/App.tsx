import { useState, useEffect } from 'react';
import { CartProvider } from '@/hooks/useCart';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ChatIcon } from '@/components/Icons';
import { WelcomePage } from '@/pages/WelcomePage';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { SystemPage } from '@/pages/SystemPage';
import { FormulationPage } from '@/pages/FormulationPage';
import { ShopPage } from '@/pages/ShopPage';
import { ProductPage } from '@/pages/ProductPage';
import { ReviewsPage } from '@/pages/ReviewsPage';
import { ContactPage } from '@/pages/ContactPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { SubscriptionsPage } from '@/pages/SubscriptionsPage';

// Add Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Jura:wght@400;500;600;700&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

function AppContent() {
  const [page, setPage] = useState('Welcome');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    // Handle product pages
    if (page.startsWith('Product:')) {
      const productId = parseInt(page.split(':')[1]);
      return <ProductPage productId={productId} setPage={setPage} />;
    }

    switch (page) {
      case 'Welcome':
        return <WelcomePage setPage={setPage} />;
      case 'Home':
        return <HomePage setPage={setPage} />;
      case 'About':
        return <AboutPage setPage={setPage} />;
      case 'Our System':
        return <SystemPage />;
      case 'Our Formulation':
        return <FormulationPage />;
      case 'Shop':
        return <ShopPage setPage={setPage} />;
      case 'Reviews':
        return <ReviewsPage />;
      case 'Contact':
        return <ContactPage />;
      case 'Cart':
        return <CartPage setPage={setPage} />;
      case 'Checkout':
        return <CheckoutPage setPage={setPage} />;
      case 'Subscriptions':
        return <SubscriptionsPage setPage={setPage} />;
      default:
        return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation page={page} setPage={setPage} />
      <main className={page === 'Welcome' ? '' : 'min-h-screen'}>
        {renderPage()}
      </main>
      {page !== 'Welcome' && <Footer setPage={setPage} />}
      {page !== 'Welcome' && <ChatIcon />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
