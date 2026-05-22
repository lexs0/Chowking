import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles, Star, Flame, Trophy, MapPin, Landmark, Clock, FileDown, AlertTriangle, Check, Mail, Send, CheckCircle2,
  Users, Briefcase, ChevronRight, HelpCircle, Shield, PhoneCall, Info, ArrowUpRight, Search, Zap, Heart, ChefHat
} from 'lucide-react';
import { MenuItem, Branch, JobPost, Review } from '../types';
import { MENU_ITEMS, BRANCHES, REVIEWS, JOB_POSTS, FAQS, BRANDS_TIMELINE } from '../data';
import ScratchCard from './ScratchCard';
import BranchMap from './BranchMap';
import FranchiseCalculator from './FranchiseCalculator';

/* ============================================================================
   1. HERO / HOME VIEW
   ============================================================================ */
export function HomeView({
  onNavigate,
  onOpenProduct
}: {
  onNavigate: (view: string, filter?: string) => void;
  onOpenProduct: (item: MenuItem) => void;
}) {
  const stats = [
    { value: '600+', label: 'Stores Nationwide' },
    { value: '98%', label: 'Happy Customers' },
    { value: '30m', label: 'Average Delivery' },
    { value: '1985', label: 'Comfort Since' }
  ];

  const featuredItems = MENU_ITEMS.filter(item => item.isBestSeller).slice(0, 4);

  return (
    <div id="home-view-wrap" className="space-y-20 pb-16">
      
      {/* Dynamic Immersive Hero Section */}
      <section className="relative px-4 pt-12 pb-16">
        <div className="absolute top-0 left-0 w-full h-[60%] bg-[#FDFCFB]/50 pointer-events-none" />
        <div className="max-w-7xl mx-auto rounded-[32px] overflow-hidden bg-gradient-to-br from-[#D9262E] to-[#8B181C] p-8 sm:p-14 relative shadow-2xl shadow-red-200/50">
          
          {/* Decorative Pattern overlay */}
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100"><path d="M0 0h100v100H0z" fill="none"/><path d="M10 10h80v80H10zM20 20h60v60H20z" stroke="white" fill="none" strokeWidth="2"/></svg>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10 w-full text-left">
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-white col-span-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] text-yellow-300 font-extrabold uppercase tracking-widest leading-none">
                <Sparkles size={11} className="text-yellow-300 animate-pulse" />
                Filipino-Chinese Imperial Feast
              </span>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.0] text-white font-sans uppercase">
                Cravings Satisfied <br/>
                <span className="text-yellow-300">
                  Ultra-Fast.
                </span>
              </h1>

              <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-lg font-medium">
                Indulge in deep, wok-hei rich fried <strong className="text-yellow-200 font-bold">Pork Chao Fan</strong>, juices of Chinese-style fried chicken, and our ultimate sweet cooling <strong className="text-yellow-100 font-bold">Super Sangkap Halo-Halo</strong>. Hot comfort dishes delivered directly to your doorstep.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onNavigate('menu')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-red-950 text-xs tracking-wider uppercase font-black px-7 py-3 rounded-full transition-all cursor-pointer shadow-lg shadow-yellow-500/10 active:scale-95"
                >
                  Order Online Now
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="bg-white/10 hover:bg-white/15 text-white text-xs tracking-wider uppercase font-bold px-6 py-3 rounded-full transition-all cursor-pointer border border-white/20 active:scale-95"
                >
                  View Full Menu
                </button>
              </div>

              {/* Float statistics bar */}
              <div className="grid grid-cols-4 gap-4 border-t border-white/20 pt-6 mt-4">
                {stats.map((s, i) => (
                  <div key={i} className="text-left">
                    <div className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{s.value}</div>
                    <div className="text-[10px] uppercase font-bold text-white/60 tracking-wider mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Right Cinematic Food Hero Shot */}
            <div className="lg:col-span-6 relative flex items-center justify-center col-span-1">
              {/* Central Premium graphic container */}
              <div className="relative w-[280px] sm:w-[380px] aspect-square rounded-full border-4 border-white/10 overflow-hidden shadow-2xl scale-100 hover:scale-[1.02] transition-transform duration-500 bg-white/5 backdrop-blur-md p-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-white/15">
                  <img
                    src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&q=80&w=800"
                    alt="Wok Chao Fan Hero"
                    className="w-full h-full object-cover select-none rounded-full"
                  />
                </div>
              </div>

              {/* floating Badge 1 */}
              <div className="absolute -left-2 top-[20%] bg-white text-red-950 p-2.5 rounded-2xl flex items-center gap-2 shadow-xl border border-gray-100/60 max-w-[200px]">
                <div className="w-9 h-9 bg-yellow-400 text-red-950 font-black rounded-lg flex items-center justify-center font-mono text-xs shrink-0 shadow-sm">
                  ₱139
                </div>
                <div className="text-left text-[10px] font-sans">
                  <span className="font-extrabold text-slate-900 block truncate">Wok Pork Chao Fan</span>
                  <span className="text-slate-500 block truncate font-medium">Warm with Siomai</span>
                </div>
              </div>

              {/* floating Badge 2 */}
              <div className="absolute -right-2 bottom-[20%] bg-white text-red-950 p-2.5 rounded-2xl flex items-center gap-2 shadow-xl border border-gray-100/60 max-w-[200px]">
                <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-sm shrink-0">
                  🥢
                </div>
                <div className="text-left text-[10px] font-sans">
                  <span className="font-extrabold text-slate-900 block truncate">30min Guarantee</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-wide text-[8px] block">Fast Active Route</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ICON FILTERS CARDS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center md:text-left font-sans mb-10">
          <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">Browse Imperial Pantry</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mt-1">Explore Signature Cravings</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { id: 'lauriat', label: 'Lauriat Meals', emoji: '🍱', color: 'from-orange-600/10 to-transparent' },
            { id: 'chaofan', label: 'Chao Fan Fried Rice', emoji: '🥡', color: 'from-yellow-600/10 to-transparent' },
            { id: 'dimsum', label: 'Dim Sum Bites', emoji: '🥟', color: 'from-red-600/10 to-transparent' },
            { id: 'noodles', label: 'Hearty Mami Noodles', emoji: '🍜', color: 'from-emerald-600/10 to-transparent' },
            { id: 'siopao', label: 'Fluffy Siopao Buns', emoji: '🫓', color: 'from-amber-600/10 to-transparent' },
            { id: 'halohalo', label: 'Super Halo-Halo', emoji: '🍧', color: 'from-sky-600/10 to-transparent' },
            { id: 'milktea', label: 'Cooler Milk Tea', emoji: '🧋', color: 'from-purple-600/10 to-transparent' },
            { id: 'family', label: 'Family Bundles', emoji: '🥢', color: 'from-rose-600/10 to-transparent' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigate('menu', cat.id)}
              className="group p-5 bg-slate-900 border border-slate-900 hover:border-red-500/40 rounded-2xl text-center transition-all cursor-pointer relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              <span className="text-3xl inline-block group-hover:scale-110 transition-transform mb-3">{cat.emoji}</span>
              <h4 className="text-slate-300 group-hover:text-white text-xs font-black tracking-tight leading-tight">{cat.label}</h4>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED / BEST SELLER SECTION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end text-center sm:text-left mb-10 gap-4">
          <div>
            <span className="text-[10px] text-red-650 tracking-widest font-black uppercase">Top Demanded Selections</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mt-1">Chowking Bestselling Icons</h2>
          </div>
          <button
            onClick={() => onNavigate('menu')}
            className="text-xs font-black uppercase text-red-650 hover:text-red-700 flex items-center justify-center gap-1 cursor-pointer transition-colors"
          >
            See All Menu Entries <ChevronRight size={14} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenProduct(item)}
              className="bg-slate-900 border border-slate-870 hover:border-slate-800 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 bg-yellow-400 text-red-950 font-black text-[9px] uppercase px-2 py-0.5 rounded tracking-wider">
                  ★ Popular
                </div>
                {item.originalPrice && (
                  <div className="absolute top-2.5 right-2.5 bg-red-650 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded">
                    Promo Price
                  </div>
                )}
              </div>

              <div className="p-4.5 space-y-3.5 text-left flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="font-extrabold text-sm text-slate-200 line-clamp-1 group-hover:text-red-650 transition-colors">
                      {item.name}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-850">
                  <div className="flex items-baseline gap-1.5 font-mono">
                    <span className="text-lg font-black text-red-650">₱{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-xs text-slate-500 line-through">₱{item.originalPrice}</span>
                    )}
                  </div>
                  <button className="py-2 px-3 bg-red-650 hover:bg-red-700 text-yellow-300 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-yellow-500/10">
                    Order Choice
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO SCRATCHCARD INTRO BANNER */}
      <section className="max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-red-950 via-slate-900 to-slate-950 border border-yellow-500/20 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-1 space-y-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-yellow-400 border border-yellow-500/20 bg-yellow-400/5 px-2.5 py-1 rounded">
              Lucky Pack Reveal
            </span>
            <h3 className="text-2xl font-black text-slate-100 tracking-tight leading-none sm:text-3xl">Play the Golden Scratch!</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Feeling lucky? Tap on our digital imperial scratch envelope to reveal secret promo keys including <strong className="text-slate-300 font-bold">Free Deliveries</strong> or discount multipliers off Halo-Halo desserts.
            </p>
            <button
              onClick={() => onNavigate('promos')}
              className="py-2.5 px-5 bg-yellow-400 hover:bg-yellow-500 text-red-950 text-xs font-black rounded-lg uppercase tracking-wider cursor-pointer transition-colors shadow"
            >
              Scratch My Card
            </button>
          </div>

          <div className="w-full max-w-[280px]">
            <ScratchCard />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF / REVIEWS SECTION */}
      <section className="max-w-7xl mx-auto px-4 bg-slate-950/40 py-10 rounded-3xl border border-slate-900">
        <div className="text-center mb-10">
          <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">Loved Across Islands</span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight mt-1">Comfort Food Stories</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="p-5.5 bg-slate-900/60 border border-slate-850 rounded-2xl flex flex-col justify-between text-left space-y-4">
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex gap-0.5 text-yellow-400">
                  {Array.from({ length: rev.rating }).map((_, idx) => (
                    <Star key={idx} size={13} className="fill-yellow-400" />
                  ))}
                </div>
                
                <p className="text-slate-300 text-xs leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-850/60">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-800">
                  <img src={rev.avatar} alt={rev.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-xs">{rev.name}</h4>
                  <span className="text-[9px] text-slate-500 block">Ordered: {rev.itemBought}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

/* ============================================================================
   2. DETAILED MENU GRID VIEW
   ============================================================================ */
export function MenuView({
  onOpenProduct,
  activeCategory = ''
}: {
  onOpenProduct: (item: MenuItem) => void;
  activeCategory?: string;
}) {
  const [selectedCat, setSelectedCat] = useState<string>(activeCategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [spiceFilter, setSpiceFilter] = useState<number | 'all'>('all');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'lauriat', label: 'Lauriat' },
    { id: 'chaofan', label: 'Chao Fan' },
    { id: 'dimsum', label: 'Dim Sum' },
    { id: 'noodles', label: 'Noodles' },
    { id: 'siopao', label: 'Siopao' },
    { id: 'halohalo', label: 'Halo-Halo' },
    { id: 'milktea', label: 'Milk Tea' },
    { id: 'family', label: 'Family platters' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpice = spiceFilter === 'all' || item.spiceLevel === spiceFilter;
    return matchesCat && matchesSearch && matchesSpice;
  });

  return (
    <div id="menu-view" className="max-w-7xl mx-auto px-4 pb-16 space-y-8 text-left">
      <div>
        <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">Piping-Hot Choices</span>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight mt-1">Chowking Digital Menu</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Crafted with raw wok heaters, high precision recipes, and freshest national ingredients. Filter your lunch bundles below.
        </p>
      </div>

      {/* Search and Filters row */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Search input field */}
        <div className="md:col-span-8 relative">
          <Search className="absolute left-3.5 top-3.5 text-slate-500" size={15} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our delicious flavors (e.g. Chao Fan, Siomai, Sweet & Sour)..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 placeholder:text-slate-550"
          />
        </div>

        {/* Spice index dropdown */}
        <div className="md:col-span-4 select-container">
          <select
            value={spiceFilter}
            onChange={(e) => setSpiceFilter(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-350 cursor-pointer"
          >
            <option value="all">Any Spice Level</option>
            <option value="0">Mild / Non-Spicy</option>
            <option value="1">Mildly Hot (1 Chili)</option>
            <option value="2">Medium Kick (2 Chilis)</option>
            <option value="3">Extreme Spice (3 Chilis)</option>
          </select>
        </div>
      </div>

      {/* Flat Category Filter Badges */}
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap py-1.5 scrollbar-none border-b border-slate-900">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCat(c.id)}
            className={`px-4.5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              selectedCat === c.id
                ? 'bg-red-600 text-yellow-300 border border-red-500/35 shadow shadow-red-950'
                : 'bg-slate-900/60 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenProduct(item)}
            className="bg-slate-900 border border-slate-870 hover:border-slate-800 rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between group shadow"
          >
            <div className="relative aspect-[16/10] w-full bg-slate-850 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 flex gap-1 items-center">
                {item.isBestSeller && (
                  <span className="bg-yellow-400 text-red-950 font-black text-[9px] uppercase px-2 py-0.5 rounded tracking-wider shadow">
                    ★ bestseller
                  </span>
                )}
                {item.calories < 400 && (
                  <span className="bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-extrabold text-[8px] uppercase px-2 py-0.5 rounded shadow">
                    🥗 light calorie
                  </span>
                )}
              </div>
            </div>

            <div className="p-5.5 space-y-4 text-left flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline gap-2">
                  <h3 className="font-extrabold text-sm text-slate-200 line-clamp-1 group-hover:text-white">
                    {item.name}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-mono tracking-tight font-bold whitespace-nowrap">{item.calories} cal</span>
                </div>
                
                <p className="text-slate-450 text-[11px] leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Stars and Spice markers */}
                <div className="flex items-center gap-3 pt-1 text-[10px]">
                  <span className="flex items-center gap-0.5 text-yellow-400 font-bold">
                    <Star size={11} className="fill-yellow-400" /> {item.rating}
                  </span>
                  <span>•</span>
                  <span className="text-slate-400 font-bold">
                    {item.spiceLevel === 0 ? 'Mild standard' : `🌶️ Level ${item.spiceLevel} spice`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-850">
                <div className="font-mono flex items-baseline gap-1.5">
                  <span className="text-base font-black text-yellow-300">₱{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-[10px] text-slate-500 line-through">₱{item.originalPrice}</span>
                  )}
                </div>
                <button className="py-2 px-3.5 bg-red-650 hover:bg-red-700 text-yellow-300 rounded-lg text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer border border-yellow-500/20">
                  Select Recipe
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full py-16 text-center text-slate-500 italic space-y-2 bg-slate-900 border border-slate-900 rounded-2xl">
            <span className="text-4xl block">🥗</span>
            <p className="text-xs">No food flavors matching your filter target.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCat('all'); setSpiceFilter('all'); }}
              className="text-yellow-400 text-[10px] font-bold uppercase tracking-wider hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

/* ============================================================================
   3. PROMOS VIEW (WITH GAMIFIED SCRATCH)
   ============================================================================ */
export function PromosView({ onClaimDiscount }: { onClaimDiscount?: (code: string) => void }) {
  const promos = [
    { title: 'Chow-Fan Platter Double treats', code: 'CHOWFAMILY', savings: 'Save 10% Off', desc: 'Valid on regular family plats sharing plans, ideal for 4 local members.', tag: 'Family Sundays' },
    { title: 'Free delivery voucher key', code: 'CHOWFREE', savings: 'Save ₱49 Flat', desc: 'Saves whole delivery toll charge on active orders above ₱550 pesos.', tag: 'Delivery Booster' },
    { title: 'Super Sangkap Halo-Halo treat', code: 'HALOHALO20', savings: '₱20 Off cooling', desc: 'Save on our massive ice-cream dessert. Perfect for hot afternoon breaks.', tag: 'Sweet Treats' }
  ];

  return (
    <div id="promos-view" className="max-w-7xl mx-auto px-4 pb-16 space-y-12 text-left">
      <div>
        <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">Prosperity Specials</span>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight mt-1">Limited Dining Promos</h2>
        <p className="text-xs text-slate-400 mt-1">
          Collect golden discount keys to minimize checkout bills. Participate in exclusive rewards.
        </p>
      </div>

      {/* Grid: Scratch envelope and listings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Scratch Envelope */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-5 text-center">
          <div className="text-left">
            <h3 className="text-base font-bold text-slate-200">Lucky Blessing Envelope</h3>
            <p className="text-[11px] text-slate-400 leading-normal.">
              Use your finger or cursor to scratch off the film and claim today's single-use lucky coupon reduction instantly!
            </p>
          </div>
          <ScratchCard onClaim={onClaimDiscount} />
        </div>

        {/* Right column: Promos list */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Available Campaign Codes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promos.map((p, idx) => (
              <div key={idx} className="p-5 bg-slate-900 border border-slate-850 rounded-2xl hover:border-slate-800 flex flex-col justify-between space-y-4 text-left">
                <div className="space-y-1.5">
                  <span className="text-[8px] bg-red-950 border border-red-500/20 text-yellow-300 font-extrabold tracking-widest uppercase px-2 py-0.5 rounded leading-none inline-block">
                    {p.tag}
                  </span>
                  <h4 className="font-extrabold text-slate-200 text-sm">{p.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{p.desc}</p>
                </div>

                <div className="flex items-center justify-between pt-3.5 border-t border-slate-850/80">
                  <div className="text-left">
                    <span className="text-[9px] text-slate-500 font-bold uppercase block">Reduction</span>
                    <span className="text-emerald-400 font-bold text-xs">{p.savings}</span>
                  </div>
                  <div className="bg-black/40 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-mono font-black text-yellow-400 tracking-wider uppercase">
                    {p.code}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ============================================================================
   4. BRANCH FINDER (LOCATIONS LINK)
   ============================================================================ */
export function LocationsView() {
  return (
    <div id="locations-view" className="max-w-7xl mx-auto px-4 pb-16">
      <BranchMap />
    </div>
  );
}

/* ============================================================================
   5. BRAND STORY & TIMELINE (ABOUT LINK)
   ============================================================================ */
export function AboutView() {
  return (
    <div id="about-brand-view" className="max-w-4xl mx-auto px-4 pb-16 space-y-16 text-left font-sans">
      
      {/* Intro block */}
      <div className="space-y-4">
        <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">Filipino Heritage Story</span>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight mt-1">Chowking: Our Flavorful Ascent</h2>
        <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
          Founded on combining the speed of Western quick-service operations with standard authentic Chinese dim-sum wok cooking, Chowking has been grease-firing local flavor memories since Plaza Carriedo Manila opened in 1985.
        </p>
      </div>

      {/* Grid detailing our recipes promise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
          <ChefHat size={24} className="text-yellow-400" />
          <h4 className="font-extrabold text-slate-200 text-sm">Wok-Hei Fire Mastery</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Our wok stations operate on high pressure combustion flames exceeding 500° Fahrenheit. This allows ingredients to crisp instantly while preserving authentic wok-aroma caramelizations inside each grain of Chao Fan.
          </p>
        </div>

        <div className="p-6 bg-slate-900 border border-slate-850 rounded-2xl space-y-3">
          <Users size={24} className="text-red-500" />
          <h4 className="font-extrabold text-slate-200 text-sm">Family & Fiesta Culture</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Filipino meals thrive on sharing. Our platters, family chicken boxes, and multi-ingredient sweet Halo-Halo bowls are crafted precisely to foster family gatherings, local fiestas, and group comfort dining.
          </p>
        </div>
      </div>

      {/* Structured timeline mapping growth milestones */}
      <div className="space-y-6 pt-4">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Milestones Timeline</h3>
        <div className="relative border-l border-slate-800 pl-6 ml-3 space-y-8 text-xs">
          {BRANDS_TIMELINE.map((time, idx) => (
            <div key={idx} className="relative">
              {/* Dot */}
              <span className="absolute -left-9 top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-red-500 flex items-center justify-center font-bold text-[8px] text-slate-100 font-mono">
                {time.year}
              </span>
              <div className="space-y-1 text-left">
                <h4 className="font-black text-slate-200 text-xs">{time.title}</h4>
                <p className="text-slate-405 leading-relaxed text-[11px]">{time.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   6. FRANCHISING INQUIRY PORTAL
   ============================================================================ */
export function FranchiseView() {
  return (
    <div id="franchising-portal" className="max-w-7xl mx-auto px-4 pb-16">
      <FranchiseCalculator />
    </div>
  );
}

/* ============================================================================
   7. CAREERS BULLETIN BOARD
   ============================================================================ */
export function CareersView() {
  const [appliedJob, setAppliedJob] = useState<string | null>(null);

  return (
    <div id="careers-portal" className="max-w-4xl mx-auto px-4 pb-16 space-y-12 text-left">
      <div>
        <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">We Are Hiring National Talents</span>
        <h2 className="text-3xl font-black text-slate-100 tracking-tight mt-1">Join the Chowking Family</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-xl">
          Fuel countrywide comfort food trends. We supply world-class culinary training, competitive insurance plans, and career fast-tracks.
        </p>
      </div>

      {/* Listings of open items */}
      <div className="space-y-4">
        {JOB_POSTS.map((job) => (
          <div key={job.id} className="p-6 bg-slate-900 border border-slate-850 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="text-left font-sans flex-1">
              <span className="text-[8px] bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded font-black tracking-wider uppercase inline-block mb-2">
                {job.department} • {job.type}
              </span>
              <h4 className="text-sm font-black text-slate-250 tracking-tight">{job.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed max-w-2xl">{job.description}</p>
              
              {/* Requirements mini-grid */}
              <div className="mt-3 space-y-1 select-none">
                {job.requirements.slice(0, 2).map((req, rid) => (
                  <span key={rid} className="text-[10px] text-slate-500 flex items-center gap-1">
                    ✓ {req}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setAppliedJob(job.title)}
              className="w-full md:w-auto shrink-0 bg-red-650 hover:bg-red-700 text-yellow-300 font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-colors border border-yellow-500/10 shadow"
            >
              Apply Position
            </button>
          </div>
        ))}
      </div>

      {/* Application Popup Simulator */}
      {appliedJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl max-w-md w-full text-center space-y-4 relative">
            <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h4 className="text-lg font-black text-slate-100">Application Registered!</h4>
            <p className="text-xs text-slate-350 leading-relaxed max-w-sm mx-auto">
              You have successfully submitted your primary profile for the <strong>{appliedJob}</strong> opening. Our Store operations HR team will call you to schedule interviews.
            </p>
            <button
              onClick={() => setAppliedJob(null)}
              className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-200 text-xs font-bold rounded-xl border border-slate-850 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* ============================================================================
   8. CONTACT FORM & FAQ SECTION
   ============================================================================ */
export function ContactView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('order');
  const [body, setBody] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !body) return;
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setName('');
      setEmail('');
      setBody('');
    }, 2500);
  };

  return (
    <div id="contact-faq-wrap" className="max-w-4xl mx-auto px-4 pb-16 space-y-16 text-left font-sans">
      
      {/* Upper section: Contact form details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left detail card */}
        <div className="lg:col-span-5 space-y-5 text-xs text-slate-400">
          <div>
            <span className="text-[10px] text-red-500 tracking-widest font-black uppercase">We value feedback</span>
            <h2 className="text-2xl font-black text-slate-105 tracking-tight mt-1 leading-none">Reach Customer Relations</h2>
            <p className="text-xs text-slate-400 mt-1">
              Have concerns about food delivery times, hygiene, or catering operations? Share your honest review.
            </p>
          </div>

          <div className="divide-y divide-slate-850 pt-3">
            <div className="py-2.5">
              <span className="font-bold text-slate-200 uppercase block">Chowking Customer hotline</span>
              <span className="text-yellow-300 font-mono font-bold block mt-1">+63 2 89-11-11-11</span>
            </div>
            <div className="py-2.5">
              <span className="font-bold text-slate-200 uppercase block">Official Email</span>
              <span className="text-slate-350 block mt-1">feedback@chowking.ph</span>
            </div>
          </div>
        </div>

        {/* Form panel */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between">
          {savedSuccess ? (
            <div className="text-center py-12 space-y-3">
              <span className="text-3xl block">💌</span>
              <h4 className="text-sm font-black text-slate-200">Feedback Transmitted Successfully!</h4>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Thank you for your response. Our corporate team will evaluate your complaint/suggestion and reach out via email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-sm font-black text-slate-200">Submit secure message</h3>
              
              {/* Name */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maria Clara"
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-red-500 focus:outline-none p-2.5 rounded-xl placeholder:text-slate-750"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. maria.clara@outlook.com"
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:border-red-500 focus:outline-none p-2.5 rounded-xl placeholder:text-slate-755"
                />
              </div>

              {/* Subject */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400">Department Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:border-red-500 focus:outline-none p-2.5 rounded-xl"
                >
                  <option value="order">Online Ordering Support Channel</option>
                  <option value="complaint">Food quality complaint / issue</option>
                  <option value="franchise">Franchise application followups</option>
                  <option value="event">Catering & party bookings</option>
                </select>
              </div>

              {/* Body */}
              <div className="space-y-1.5 flex flex-col">
                <label className="text-[10px] uppercase font-bold text-slate-400">Brief Message Body</label>
                <textarea
                  required
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your feedback message here..."
                  className="bg-slate-950 border border-slate-800 text-xs text-slate-205 focus:border-red-500 focus:outline-none p-2.5 rounded-xl resize-none h-24 placeholder:text-slate-750"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-red-650 hover:bg-red-700 text-yellow-300 font-black rounded-xl text-xs uppercase tracking-wide transition-colors cursor-pointer border border-yellow-500/10 shadow"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

      {/* FAQs Section */}
      <div className="space-y-6">
        <h3 className="text-sm font-black uppercase text-slate-400 tracking-wider">Frequently Answered Queries</h3>
        <div className="space-y-3.5 select-none">
          {FAQS.map((faq, idx) => (
            <details key={idx} className="group p-4 bg-slate-900 border border-slate-850 rounded-2xl cursor-pointer text-xs">
              <summary className="font-extrabold text-slate-205 flex justify-between items-center pr-2">
                <span>{faq.question}</span>
                <span className="text-slate-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-slate-400 leading-relaxed text-[11px] mt-2 pt-2 border-t border-slate-850/50">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ============================================================================
   9. CORPORATE LEGAL POLICY VIEW
   ============================================================================ */
export function PrivacyView() {
  return (
    <div id="privacy-document" className="max-w-3xl mx-auto px-4 pb-16 space-y-6 text-left text-xs text-slate-450 leading-relaxed font-sans">
      <div className="space-y-1">
        <span className="text-[9px] text-red-500 font-extrabold uppercase tracking-widest block">Legal Documentation</span>
        <h2 className="text-2xl font-black text-slate-150 tracking-tight">Data privacy Policy</h2>
        <p className="text-[10px] text-slate-500">Effective version updated May 22, 2026</p>
      </div>

      <p className="border-b border-slate-900 pb-4">
        Welcome to Chowking (operated under the umbrella license of Jollibee Foods Corporation - "JFC"). Your digital privacy remains of utmost concern. This privacy manifesto delineates standard data protocols.
      </p>

      <div className="space-y-4">
        <div className="space-y-1">
          <h4 className="font-black text-slate-300 text-xs">1. Data Capture boundaries</h4>
          <p className="text-[11px] text-slate-455">
            We capture phone credentials, delivery destinations, and name profiles when orders are securely lodged. GCash or Credit Card tokens are processed by fully certified PCI-DSS payment gateways and are never stored in plain format on our networks.
          </p>
        </div>

        <div className="space-y-1">
          <h4 className="font-black text-slate-300 text-xs">2. Geolocation Parameters</h4>
          <p className="text-[11px] text-slate-455">
            If you enable Geolocation frame permissions on this web application, browser coordinates are fetched to identify nearby JFC branches and calculate distance approximations for drive-thrus. This is handled strictly on the fly and never stored on persistent storage trackers.
          </p>
        </div>

        <div className="space-y-1">
          <h4 className="font-black text-slate-300 text-xs">3. Security Standards</h4>
          <p className="text-[11px] text-slate-455">
            We operate fully certified HTTPS encryption filters matching industry defense frameworks. For queries regarding erasure of target food purchase histories, reach out to <strong className="text-slate-300">dpo@jollibee.com.ph</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
