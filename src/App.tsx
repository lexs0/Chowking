import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag, Menu, X, ArrowUpRight, ChefHat, Instagram, Facebook, Twitter, Smartphone, Clock, Mail, CheckCircle, HelpCircle
} from 'lucide-react';
import { MenuItem, CartItem, OrderStatus } from './types';
import { HomeView, MenuView, PromosView, LocationsView, AboutView, FranchiseView, CareersView, ContactView, PrivacyView } from './components/Views';
import Chatbot from './components/Chatbot';
import ProductDetailModal from './components/ProductDetailModal';
import CartCheckout from './components/CartCheckout';
import OrderTracker from './components/OrderTracker';

export default function App() {
  const [activeView, setActiveView] = useState<string>('home');
  const [menuFilter, setMenuFilter] = useState<string>(''); // For filtering category directly from home redirects
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activePromoCode, setActivePromoCode] = useState<string>('');
  
  // Overlays
  const [activeProduct, setActiveProduct] = useState<MenuItem | null>(null);
  const [activeOrder, setActiveOrder] = useState<OrderStatus | null>(null);
  
  // Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Auto scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Cart operations
  const handleAddToCart = (cartItem: CartItem) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === cartItem.id);
      if (exists) {
        return prev.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity + cartItem.quantity }
            : item
        );
      }
      return [...prev, cartItem];
    });
    setIsCartOpen(true); // Open sidebar automatically for high conversions
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (view: string, filterCategory: string = '') => {
    setMenuFilter(filterCategory);
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail('');
    }, 3000);
  };

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none antialiased scrollbar-thin scrollbar-thumb-red-800">
      
      {/* 1. STICKY GLASSMORPHIC HEADER */}
      <header className="sticky top-0 z-45 bg-slate-950/85 backdrop-blur-md border-b border-slate-900/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Brand Logo Group */}
          <div 
            onClick={() => handleNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-2xl bg-red-650 flex items-center justify-center text-yellow-300 font-extrabold text-lg border border-yellow-500/25 shadow-lg group-hover:scale-105 transition-transform">
              🥢
            </div>
            <div className="text-left font-sans">
              <span className="text-xl font-black tracking-tight block text-slate-100">Chowking</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-[#D9262E] -mt-1 block">Digital Imperial</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-black uppercase tracking-wider text-slate-400">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Menu' },
              { id: 'promos', label: 'Promos' },
              { id: 'locations', label: 'Locations' },
              { id: 'franchise', label: 'Franchise' },
              { id: 'about', label: 'About Brand' },
              { id: 'careers', label: 'Careers' },
              { id: 'contact', label: 'Contact' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                className={`transition-colors cursor-pointer hover:text-red-650 ${
                  activeView === link.id ? 'text-red-650 font-black relative after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2px] after:bg-red-650 rounded-sm' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Utility Buttons */}
          <div className="flex items-center gap-3">
            {/* Dynamic Sticky Order Tray button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-xl hover:text-red-650 cursor-pointer transition-colors"
              title="View Cart Drawer"
            >
              <ShoppingBag size={18} className="text-red-650" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-650 text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-md border border-white/20">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-red-650 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* 2. MOBILE MENU DRAWER */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-slate-900 border-b border-slate-800 text-left overflow-hidden relative z-40"
          >
            <div className="p-4 space-y-3 flex flex-col text-xs uppercase font-black tracking-widest text-slate-300">
              {[
                { id: 'home', label: 'Home Pages' },
                { id: 'menu', label: 'Food Menu' },
                { id: 'promos', label: 'Special Promos' },
                { id: 'locations', label: 'Branch Finder' },
                { id: 'franchise', label: 'Franchise ROI' },
                { id: 'about', label: 'Brand Timeline' },
                { id: 'careers', label: 'Careers Port' },
                { id: 'contact', label: 'Reach Support' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavigate(link.id)}
                  className={`py-2 text-left hover:text-red-650 tracking-widest cursor-pointer ${
                    activeView === link.id ? 'text-red-650 font-extrabold border-l-2 border-red-650 pl-2' : ''
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. DYNAMIC VIEWS SWITCHBOARD CONTAINER */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView + (activeOrder ? '-order' : '-normal')}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full relative"
          >
            {/* Check if deep redirect order tracker is active */}
            {activeOrder ? (
              <div className="py-16 px-4">
                <OrderTracker order={activeOrder} onReset={() => setActiveOrder(null)} />
              </div>
            ) : (
              /* Normal views mapping */
              <>
                {activeView === 'home' && (
                  <HomeView 
                    onNavigate={handleNavigate} 
                    onOpenProduct={setActiveProduct} 
                  />
                )}
                {activeView === 'menu' && (
                  <MenuView 
                    onOpenProduct={setActiveProduct} 
                    activeCategory={menuFilter} 
                  />
                )}
                {activeView === 'promos' && (
                  <PromosView 
                    onClaimDiscount={(code) => {
                      setActivePromoCode(code);
                      setIsCartOpen(true);
                    }} 
                  />
                )}
                {activeView === 'locations' && <LocationsView />}
                {activeView === 'about' && <AboutView />}
                {activeView === 'franchise' && <FranchiseView />}
                {activeView === 'careers' && <CareersView />}
                {activeView === 'contact' && <ContactView />}
                {activeView === 'privacy' && <PrivacyView />}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. DUAL SIDED PRODUCT DETAILS CONFIG MODAL OVERLAY */}
      <AnimatePresence>
        {activeProduct && (
          <ProductDetailModal
            item={activeProduct}
            onClose={() => setActiveProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* 5. SLIDE-OUT SHOPPING TRAY SIDEBAR DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <div 
              onClick={() => setIsCartOpen(false)} 
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            {/* Drawer body */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-[420px] max-w-full bg-slate-950 shadow-2xl flex flex-col justify-between border-l border-slate-900"
            >
              <div className="p-4 bg-slate-900 border-b border-slate-850 flex justify-between items-center text-xs">
                <span className="font-sans font-black text-slate-100 uppercase tracking-widest flex items-center gap-2">
                  <ChefHat size={16} className="text-yellow-400" />
                  Your Delivery Configuration
                </span>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-slate-500 hover:text-red-650 rounded bg-slate-850 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="flex-1 overflow-hidden">
                <CartCheckout
                  cart={cart}
                  onUpdateQty={handleUpdateQty}
                  onRemove={handleRemoveItem}
                  onClearCart={handleClearCart}
                  onTriggerOrder={(order) => {
                    setActiveOrder(order);
                    setIsCartOpen(false);
                  }}
                  activePromoCode={activePromoCode}
                  onApplyPromoCode={(code) => setActivePromoCode(code)}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. SYSTEM COMPILATION PERSISTENT FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-xs text-slate-400 tracking-tight">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-10 items-start text-left">
          
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-650 flex items-center justify-center text-yellow-300 font-bold border border-yellow-500/25">🥢</div>
              <span className="font-extrabold text-sm tracking-tight text-white font-sans uppercase">Chowking Philippines</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-500">
              Upholding authentic high pressure wok mastery across 600 national outlets. Part of the world-class Jollibee Foods Corporation (JFC) culinary collective since 2000.
            </p>
            {/* Social flags */}
            <div className="flex gap-2.5 pt-2 text-slate-500 hover:text-white">
              <button className="p-2 bg-slate-900 border border-slate-850 hover:text-white rounded-xl cursor-pointer">
                <Facebook size={14} />
              </button>
              <button className="p-2 bg-slate-900 border border-slate-850 hover:text-white rounded-xl cursor-pointer">
                <Instagram size={14} />
              </button>
              <button className="p-2 bg-slate-900 border border-slate-850 hover:text-white rounded-xl cursor-pointer">
                <Twitter size={14} />
              </button>
            </div>
          </div>

          {/* Links Quick Col */}
          <div className="col-span-1 md:col-span-2 space-y-3 font-sans">
            <h5 className="font-black text-slate-300 uppercase tracking-wider text-[10px]">Dining Services</h5>
            <ul className="space-y-2 text-[11px] font-medium text-slate-500">
              <li><button onClick={() => handleNavigate('menu')} className="hover:text-slate-200 cursor-pointer text-left">Wok-fired Menu</button></li>
              <li><button onClick={() => handleNavigate('promos')} className="hover:text-slate-200 cursor-pointer text-left">Scratch Coupons</button></li>
              <li><button onClick={() => handleNavigate('locations')} className="hover:text-slate-200 cursor-pointer text-left">Branch Locator</button></li>
              <li><button onClick={() => handleNavigate('franchise')} className="hover:text-slate-200 cursor-pointer text-left">Franchising ROI</button></li>
            </ul>
          </div>

          {/* Links Corporate Col */}
          <div className="col-span-1 md:col-span-2 space-y-3 font-sans">
            <h5 className="font-black text-slate-300 uppercase tracking-wider text-[10px]">Corporate Hub</h5>
            <ul className="space-y-2 text-[11px] font-medium text-slate-500">
              <li><button onClick={() => handleNavigate('about')} className="hover:text-slate-200 cursor-pointer text-left">Our Heritage</button></li>
              <li><button onClick={() => handleNavigate('careers')} className="hover:text-slate-200 cursor-pointer text-left">Careers Desk</button></li>
              <li><button onClick={() => handleNavigate('contact')} className="hover:text-slate-200 cursor-pointer text-left">Feedback & FAQ</button></li>
              <li><button onClick={() => handleNavigate('privacy')} className="hover:text-slate-200 cursor-pointer text-left">Privacy Policy</button></li>
            </ul>
          </div>

          {/* Newsletter / Campaign Col */}
          <div className="col-span-1 md:col-span-4 space-y-4">
            <h5 className="font-black text-slate-300 uppercase tracking-wider text-[10px]">Imperial Mail Digest</h5>
            <p className="text-[11px] text-slate-500 leading-normal.">
              Register your workspace mailbox to receive instant seasonal discount bulletins and new platter launches.
            </p>

            <AnimatePresence mode="wait">
              {!newsletterSubscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2.5">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Type work email address..."
                    className="flex-1 bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl text-[11px] px-3.5 py-2.5 text-slate-200 placeholder:text-slate-500"
                  />
                  <button
                    type="submit"
                    className="p-3 bg-red-650 hover:bg-red-700 text-yellow-300 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-pointer transition-colors border border-yellow-500/10"
                  >
                    Subscribe
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 font-bold rounded-xl text-[10px] flex items-center gap-2"
                >
                  <CheckCircle size={14} /> Subscription successful! Check inbox shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Outer Legal Line */}
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-6.5 border-t border-slate-900 text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Chowking Foods Inc. All rights reserved matching Jollibee Foods Corporation (JFC) guidelines.</p>
          <div className="flex gap-4 font-bold">
            <button onClick={() => handleNavigate('privacy')} className="hover:underline cursor-pointer">Sitemap Map</button>
            <button onClick={() => handleNavigate('privacy')} className="hover:underline cursor-pointer">Allergen Declarations</button>
          </div>
        </div>
      </footer>

      {/* 7. CHEF CHOW DYNAMIC FLOATING CHATBOT CLIENT */}
      <Chatbot />

    </div>
  );
}
