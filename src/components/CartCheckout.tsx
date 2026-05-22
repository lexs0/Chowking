import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Tag, Percent, ArrowRight, ShieldCheck, MapPin, CreditCard, Sparkles } from 'lucide-react';
import { CartItem, OrderStatus, MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface CartCheckoutProps {
  cart: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClearCart: () => void;
  onTriggerOrder: (order: OrderStatus) => void;
  onCloseCart?: () => void;
  activePromoCode?: string;
  onApplyPromoCode?: (code: string) => void;
}

const ADDRESS_SUGGESTIONS = [
  'Gateway Tower, Araneta City, Cubao, Quezon City',
  'Ayala Tower One, Ayala Avenue, Poblacion, Makati City',
  'Pacific Plaza Towers, 31st St, Global City, Taguig',
  'De La Salle University, Taft Ave, Malate, Manila',
  'Symphony Towers, Sgt Esguerra Ave, Diliman, Quezon City'
];

export default function CartCheckout({
  cart,
  onUpdateQty,
  onRemove,
  onClearCart,
  onTriggerOrder,
  onCloseCart,
  activePromoCode = '',
  onApplyPromoCode
}: CartCheckoutProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [address, setAddress] = useState('');
  const [addressQuery, setAddressQuery] = useState('');
  const [addressFocused, setAddressFocused] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  // Custom states
  const [promoInput, setPromoInput] = useState(activePromoCode);
  const [promoError, setPromoError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'gcash' | 'maya' | 'card'>('cod');
  const [riderTip, setRiderTip] = useState<number>(20); // standard ₱20 peso tip

  // Calculators
  const subtotal = cart.reduce((sum, item) => {
    const sizeAdjustment = item.menuItem.sizeOptions?.find(s => s.name === item.selectedSize)?.priceAdjustment || 0;
    const addonsTotal = item.selectedAddons.reduce((aSum, addon) => aSum + addon.price, 0);
    return sum + (item.menuItem.price + sizeAdjustment + addonsTotal) * item.quantity;
  }, 0);

  const deliveryFee = subtotal > 550 && activePromoCode === 'CHOWFREE' ? 0 : 49;
  
  // Promo Deductions
  let discount = 0;
  if (activePromoCode === 'HALOHALO20') {
    // ₱20 discount off Halo-Halo items
    const hasHaloHalo = cart.some(item => item.menuItem.id === 'halohalo-supersangkap');
    if (hasHaloHalo) discount = 20;
  } else if (activePromoCode === 'CHOWFAMILY') {
    // 10% off of food bundles
    discount = Math.round(subtotal * 0.1);
  }

  const finalCartTotal = subtotal + deliveryFee - discount + riderTip;

  const handleValidatePromo = (e: FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoInput.toUpperCase().trim();
    if (code === 'CHOWFREE' || code === 'HALOHALO20' || code === 'CHOWFAMILY') {
      if (onApplyPromoCode) {
        onApplyPromoCode(code);
      }
    } else {
      setPromoError('Invalid coupon code key.');
    }
  };

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!userName || !userPhone || !address) return;

    const mockOrder: OrderStatus = {
      id: Math.floor(100000 + Math.random() * 900000).toString(),
      status: 'received',
      updatedAt: new Date().toLocaleTimeString(),
      estimatedDeliveryMinutes: 30,
      items: cart,
      subtotal,
      deliveryFee,
      discount,
      total: finalCartTotal,
      address,
      paymentMethod: paymentMethod.toUpperCase(),
      riderName: 'Kuya Jojo Santos',
      riderPhone: '+63 918 888 2321',
      riderRating: 4.9
    };

    onTriggerOrder(mockOrder);
    onClearCart();
    setIsCheckingOut(false);
  };

  // Upsell Recommendation Item (e.g. Chao fan missing Siomai, or general Siomai booster card)
  const upsellItem: MenuItem | undefined = MENU_ITEMS.find(item => item.id === 'dimsum-steamed-siomai');

  return (
    <div id="cart-container-section" className="bg-slate-950 border border-slate-905 p-6 rounded-3xl text-left shadow-xl h-full flex flex-col justify-between">
      
      <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800 space-y-6">
        
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-red-500" size={20} />
            <span className="font-sans font-black text-slate-100 uppercase tracking-tight">Your Order Tray</span>
          </div>
          <span className="text-xs bg-red-950 border border-red-500/20 text-yellow-300 font-bold px-2 py-0.5 rounded-full">
            {cart.length} items
          </span>
        </div>

        {/* Conditional Layouts: Cart vs Checkout Forms */}
        <AnimatePresence mode="wait">
          {!isCheckingOut ? (
            /* CART SUMMARY TRAY */
            <motion.div
              key="cart-summaries"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-5"
            >
              {cart.length > 0 ? (
                <div className="space-y-3">
                  {cart.map((item) => {
                    const singleItemBase = item.menuItem.price + (item.menuItem.sizeOptions?.find(s => s.name === item.selectedSize)?.priceAdjustment || 0) + item.selectedAddons.reduce((sum, a) => sum + a.price, 0);
                    return (
                      <div key={item.id} className="p-3.5 bg-slate-900 border border-slate-850 rounded-2xl flex gap-3 text-xs items-start">
                        {/* Img mini */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={item.menuItem.image} alt={item.menuItem.name} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Info details */}
                        <div className="flex-1 text-left">
                          <div className="flex justify-between font-bold text-slate-200">
                            <h4 className="leading-tight line-clamp-1">{item.menuItem.name}</h4>
                            <span className="font-mono text-yellow-300 ml-2">₱{singleItemBase * item.quantity}</span>
                          </div>
                          
                          {/* Options badges */}
                          <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wide">
                            Format: {item.selectedSize}
                          </p>

                          {item.selectedAddons.length > 0 && (
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              Addons: {item.selectedAddons.map(a => a.name).join(', ')}
                            </p>
                          )}

                          {item.specialInstructions && (
                            <p className="text-[10px] text-red-400 italic mt-1 font-medium">
                              "{item.specialInstructions}"
                            </p>
                          )}

                          {/* Action footer */}
                          <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-slate-850/60">
                            <div className="flex items-center gap-1.5 bg-slate-950 px-1.5 py-0.5 rounded-lg border border-slate-800">
                              <button
                                onClick={() => onUpdateQty(item.id, Math.max(1, item.quantity - 1))}
                                className="w-5 h-5 text-[10px] font-sans font-bold text-slate-400 hover:text-white cursor-pointer"
                              >
                                -
                              </button>
                              <span className="font-mono text-slate-200 text-[11px] font-bold px-1">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                className="w-5 h-5 text-[10px] font-sans font-bold text-slate-400 hover:text-white cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemove(item.id)}
                              className="text-slate-500 hover:text-red-450 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 italic space-y-3">
                  <span className="text-3xl inline-block">🍲</span>
                  <p className="text-xs font-medium">Your delicious food tray is currently empty.</p>
                  <p className="text-[10px] text-slate-600">Select any aromatic menu meal to construct your feast!</p>
                </div>
              )}

              {/* Smart Cross-Sell Booster */}
              {cart.length > 0 && upsellItem && (
                <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl flex items-center justify-between text-xs font-sans">
                  <div className="text-left">
                    <span className="text-[8px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-black tracking-wider uppercase">Value Booster</span>
                    <h5 className="font-bold text-slate-200 mt-1">{upsellItem.name}</h5>
                    <p className="text-[10px] text-slate-400">Add to complete your Chinese diner experience only ₱{upsellItem.price}.</p>
                  </div>
                  <button
                    onClick={() => {
                      const upsellCart: CartItem = {
                        id: `${upsellItem.id}-Regular`,
                        menuItem: upsellItem,
                        quantity: 1,
                        selectedSize: 'Regular',
                        selectedAddons: []
                      };
                      onUpdateQty(upsellCart.id, 1);
                      // Fallback just append to cart
                      const hasItem = cart.some(i => i.menuItem.id === upsellItem.id);
                      if (!hasItem) {
                        cart.push(upsellCart);
                      }
                    }}
                    className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-black uppercase tracking-wide transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            /* CHECKOUT DISPATCH DETAIL FORM */
            <motion.form
              key="checkout-forms"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleCreateOrder}
              className="space-y-4 text-xs font-sans"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Recipient Details</span>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-yellow-400 text-[10px] font-bold uppercase transition-all hover:underline cursor-pointer"
                >
                  ← Edit tray
                </button>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-500">Full Name</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Kylie Padilla"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-2.5 text-slate-200 placeholder:text-slate-600"
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-500">Active Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  placeholder="e.g. +63 917 121 2234"
                  className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-2.5 text-slate-200 placeholder:text-slate-600"
                />
              </div>

              {/* Address with autocomplete simulator */}
              <div className="space-y-1.5 relative">
                <label className="block text-[10px] font-black uppercase text-slate-500 flex items-center justify-between">
                  <span>Delivery destination address</span>
                  <span className="text-[9px] text-slate-550 font-normal italic">*Manila delivery area</span>
                </label>
                
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-slate-500" size={14} />
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      setAddressQuery(e.target.value);
                      setAddressFocused(true);
                    }}
                    onFocus={() => setAddressFocused(true)}
                    placeholder="Type address city / office tower name..."
                    className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl py-2.5 pl-9 pr-3 text-slate-200 placeholder:text-slate-600"
                  />
                </div>

                {/* Autocomplete box */}
                {addressFocused && (
                  <div className="absolute left-0 right-0 top-18 bg-slate-950 border border-slate-800 rounded-xl max-h-36 overflow-y-auto z-30 shadow-2xl divide-y divide-slate-900">
                    {ADDRESS_SUGGESTIONS.filter(item => item.toLowerCase().includes(addressQuery.toLowerCase())).map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setAddress(item);
                          setAddressFocused(false);
                        }}
                        className="w-full text-left p-2.5 hover:bg-slate-900 text-[10px] text-slate-300 truncate cursor-pointer block"
                      >
                        📍 {item}
                      </button>
                    ))}
                    {ADDRESS_SUGGESTIONS.filter(item => item.toLowerCase().includes(addressQuery.toLowerCase())).length === 0 && (
                      <div className="p-2.5 text-slate-500 italic text-[9px]">Custom address selection</div>
                    )}
                  </div>
                )}
              </div>

              {/* Payment selection */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black uppercase text-slate-500">Pick Payment Method</label>
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => {setPaymentMethod('cod'); setAddressFocused(false);}}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      paymentMethod === 'cod'
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300 font-bold'
                        : 'border-slate-850 bg-slate-900/60 text-slate-400 hover:border-slate-750'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wide">COD</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {setPaymentMethod('gcash'); setAddressFocused(false);}}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      paymentMethod === 'gcash'
                        ? 'border-blue-500 bg-blue-500/10 text-blue-300 font-bold'
                        : 'border-slate-850 bg-slate-900/60 text-slate-400 hover:border-slate-750'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-blue-400">GCash</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {setPaymentMethod('maya'); setAddressFocused(false);}}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      paymentMethod === 'maya'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 font-bold'
                        : 'border-slate-850 bg-slate-900/60 text-slate-400 hover:border-slate-750'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-wide text-emerald-400">Maya</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {setPaymentMethod('card'); setAddressFocused(false);}}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      paymentMethod === 'card'
                        ? 'border-red-500 bg-red-500/15 text-red-300 font-bold'
                        : 'border-slate-850 bg-slate-900/60 text-slate-400 hover:border-slate-750'
                    }`}
                  >
                    <CreditCard size={11} className="mb-0.5 text-red-400" />
                    <span className="text-[8px] uppercase tracking-tight">DeB/CrD</span>
                  </button>
                </div>
              </div>

              {/* Dispatch Tip Slider */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <label className="font-bold text-slate-500 uppercase">Support Rider Tip</label>
                  <span className="font-mono text-yellow-400 font-black">₱{riderTip}</span>
                </div>
                <div className="flex gap-1.5">
                  {[0, 20, 50, 100].map((tipValue) => (
                    <button
                      key={tipValue}
                      type="button"
                      onClick={() => {setRiderTip(tipValue); setAddressFocused(false);}}
                      className={`flex-1 py-1 rounded border text-[10px] font-mono cursor-pointer transition-all ${
                        riderTip === tipValue
                          ? 'bg-red-950 border-red-500 text-yellow-300 font-bold'
                          : 'bg-slate-900 border-slate-850 text-slate-400 hover:border-slate-800'
                      }`}
                    >
                      {tipValue === 0 ? 'No tip' : `₱${tipValue}`}
                    </button>
                  ))}
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER TOTALS BLOCK & DISPATCH ACTION BUTTON */}
      {cart.length > 0 && (
        <div className="border-t border-slate-850 pt-4 mt-4 space-y-4" onClick={() => setAddressFocused(false)}>
          
          {/* Promo code bar (Only if NOT editing details or can edit anywhere) */}
          <form onSubmit={handleValidatePromo} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-3 text-slate-500" size={13} />
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Enter (e.g. CHOWFREE, HALOHALO20)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl py-2 pl-9 pr-3 text-[10px] font-mono text-slate-200 placeholder:text-slate-600 uppercase"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 bg-slate-850 hover:bg-slate-750 text-slate-200 border border-slate-800 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-colors shrink-0"
            >
              Verify
            </button>
          </form>

          {promoError && <p className="text-[9px] text-red-400 font-bold -mt-2">{promoError}</p>}
          {activePromoCode && (
            <div className="flex items-center gap-1.5 text-[9px] text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
              <Percent size={11} /> Coupon Code `{activePromoCode}` validated successfully!
            </div>
          )}

          {/* Breakouts block */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Cart Subtotal</span>
              <span className="font-mono">₱{subtotal}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>Coupon Deductions</span>
                <span className="font-mono">-₱{discount}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-400">
              <span>Standard Flat Delivery</span>
              <span className="font-mono">₱{deliveryFee}</span>
            </div>
            {riderTip > 0 && (
              <div className="flex justify-between text-slate-400">
                <span>Rider Insulated Care Tip</span>
                <span className="font-mono">₱{riderTip}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-100 font-extrabold text-sm border-t border-slate-900 pt-2.5">
              <span className="flex items-center gap-1">Grand total amount <Sparkles size={11} className="text-yellow-400" /></span>
              <span className="font-mono text-yellow-300 text-lg">₱{finalCartTotal}</span>
            </div>
          </div>

          {/* Core button actions */}
          {!isCheckingOut ? (
            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full bg-red-600 hover:bg-red-700 text-yellow-300 font-black py-3 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border border-yellow-500/20 shadow-lg shadow-red-950/40"
            >
              Configure Delivery details
              <ArrowRight size={14} />
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="py-3 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider border border-slate-800 transition-colors cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleCreateOrder}
                disabled={!userName || !userPhone || !address}
                className="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1 shadow disabled:opacity-65 disabled:cursor-not-allowed"
              >
                <ShieldCheck size={14} />
                Order Now
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
