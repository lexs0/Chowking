import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { X, Star, Flame, ShoppingBag, Check } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface ProductDetailModalProps {
  item: MenuItem;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function ProductDetailModal({ item, onClose, onAddToCart }: ProductDetailModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(
    item.sizeOptions ? item.sizeOptions[0].name : 'Regular'
  );
  const [selectedAddons, setSelectedAddons] = useState<{ id: string; name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);

  // Find price adjustments
  const sizeAdjustment = item.sizeOptions?.find(s => s.name === selectedSize)?.priceAdjustment || 0;
  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const basePrice = item.price + sizeAdjustment + addonsTotal;
  const finalPrice = basePrice * quantity;

  const handleToggleAddon = (addon: { id: string; name: string; price: number }) => {
    setSelectedAddons(prev => {
      const exists = prev.find(a => a.id === addon.id);
      if (exists) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cartItem: CartItem = {
      id: `${item.id}-${selectedSize}-${selectedAddons.map(a => a.id).sort().join('-')}`,
      menuItem: item,
      quantity,
      selectedSize,
      selectedAddons,
      specialInstructions
    };
    onAddToCart(cartItem);
    setAddedSuccessfully(true);
    setTimeout(() => {
      setAddedSuccessfully(false);
      onClose();
    }, 1200);
  };

  return (
    <div id="product-modal-backdrop" className="fixed inset-0 z-50 overflow-y-auto bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-slate-900 border border-slate-800 text-slate-100 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        {/* Left Side: Product Shot */}
        <div className="relative w-full md:w-[45%] h-64 md:h-auto min-h-[280px]">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 left-4 md:hidden p-2 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Floaters on Image */}
          <div className="absolute bottom-4 left-4 right-4 text-left">
            {item.isBestSeller && (
              <span className="bg-yellow-400 text-red-950 font-black text-[10px] uppercase px-2 py-0.5 rounded tracking-wider mb-2 inline-block">
                ★ Best Seller
              </span>
            )}
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-1 drop-shadow-md">
              {item.name}
            </h2>
            <div className="flex items-center gap-2 text-xs text-yellow-300 font-bold">
              <span className="flex items-center gap-0.5">
                <Star size={13} className="fill-yellow-300" />
                {item.rating} ({item.reviewsCount} reviews)
              </span>
              <span>•</span>
              <span className="text-slate-300 font-mono">{item.calories} kCal</span>
            </div>
          </div>
        </div>

        {/* Right Side: Configuration Form */}
        <form onSubmit={handleFormSubmit} className="flex-1 p-6 md:p-8 flex flex-col justify-between tracking-tight text-left text-sm max-h-[85vh] md:max-h-[650px] overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 hidden md:flex p-2 rounded-full bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          <div>
            <p className="text-slate-300 leading-relaxed text-xs mb-5">
              {item.description}
            </p>

            {/* Sizes Box */}
            {item.sizeOptions && (
              <div className="mb-5">
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                  Choose Serving Format / Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {item.sizeOptions.map((opt) => (
                    <button
                      key={opt.name}
                      type="button"
                      onClick={() => setSelectedSize(opt.name)}
                      className={`p-3 rounded-xl border flex flex-col text-left transition-all cursor-pointer ${
                        selectedSize === opt.name
                          ? 'border-red-500 bg-red-900/25 text-red-100 font-bold shadow-md'
                          : 'border-slate-800 bg-slate-950/40 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xs">{opt.name}</span>
                      <span className="text-[11px] text-slate-400 mt-1">
                        {opt.priceAdjustment === 0 ? 'Standard price' : `+ ₱${opt.priceAdjustment}`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Addons Section */}
            {item.addonOptions && item.addonOptions.length > 0 && (
              <div className="mb-5">
                <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-2">
                  Add Premium Treats (Optional)
                </label>
                <div className="space-y-2">
                  {item.addonOptions.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => handleToggleAddon(addon)}
                        className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-yellow-500 bg-yellow-500/10 text-yellow-300'
                            : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-xs font-medium flex items-center gap-2">
                          <span className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${isSelected ? 'bg-yellow-500 border-yellow-500 text-slate-950' : 'border-slate-700 bg-slate-900 text-transparent'}`}>✓</span>
                          {addon.name}
                        </span>
                        <span className="font-mono text-xs">+ ₱{addon.price}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Special Instructions */}
            <div className="mb-6">
              <label className="block text-[11px] font-black uppercase text-slate-400 tracking-wider mb-1.5">
                Kitchen Instructions (e.g., no egg, extra chili oil)
              </label>
              <textarea
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Write your wishes for the chef here..."
                className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-200 placeholder:text-slate-600 resize-none h-16"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="border-t border-slate-800 pt-5 mt-auto">
            {/* Quantity Controls and Pricing */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-7 h-7 text-xs font-bold bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  -
                </button>
                <span className="mx-2.5 font-mono font-bold text-slate-100">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-7 h-7 text-xs font-bold bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-0.5">Total Amount</span>
                <span className="text-2xl font-black text-red-650 font-mono">₱{finalPrice}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={addedSuccessfully}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                addedSuccessfully
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-yellow-300 shadow-lg shadow-red-900/40 border border-yellow-500/20'
              }`}
            >
              {addedSuccessfully ? (
                <>
                  <Check size={16} /> Added to Tray
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Order Tray
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
