import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Gift, Share2, Copy, Check } from 'lucide-react';

const PRIZES = [
  { code: 'CHOWFREE', title: 'Free Delivery', description: 'Available on all meals above ₱550', badge: '🎉 Lucky Star' },
  { code: 'HALOHALO20', title: '₱20 Off Halo-Halo', description: 'Sweet treats on the hot season!', badge: '🍨 Imperial Treat' },
  { code: 'CHOWFAMILY', title: '10% Family Discount', description: 'Valid on regular Family Feast Platter plans', badge: '🥢 Feast Bonus' }
];

export default function ScratchCard({ onClaim }: { onClaim?: (code: string) => void }) {
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [selectedPrize] = useState(() => PRIZES[Math.floor(Math.random() * PRIZES.length)]);
  const [copied, setCopied] = useState(false);

  const triggerReveal = () => {
    if (isRevealed) return;
    setScratchedPercent(100);
    setIsRevealed(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(selectedPrize.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="chow-scratchcard" className="max-w-md mx-auto bg-slate-950/80 border border-yellow-500/30 p-6 rounded-3xl shadow-2xl relative overflow-hidden text-center">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-400/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 border border-red-500/40 text-[10px] uppercase tracking-wider text-yellow-300 font-bold mb-4">
          <Sparkles size={11} className="animate-pulse text-yellow-400" />
          Interactive Red Packet Promo
        </span>

        <h3 className="text-xl font-bold font-sans text-slate-100 tracking-tight">Chow-Kin lucky Scratch</h3>
        <p className="text-xs text-slate-400 mt-1 mb-6 max-w-xs mx-auto text-center leading-relaxed">
          Scratch or reveal the golden imperial card to claim your instant dining blessing!
        </p>

        {/* The Card Container */}
        <div className="relative w-full aspect-[5/3] bg-gradient-to-br from-red-800 to-amber-950 rounded-2xl border-2 border-yellow-400/40 shadow-inner overflow-hidden flex items-center justify-center p-4">
          
          {/* Underlay (The prize content) */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4 bg-gradient-to-br from-red-950 to-amber-900">
            <span className="text-[10px] text-yellow-300 tracking-widest font-black uppercase bg-red-900/60 px-2.5 py-1 rounded border border-yellow-500/20 mb-2">
              {selectedPrize.badge}
            </span>
            <span className="text-2xl font-black text-slate-100 uppercase tracking-tight">
              {selectedPrize.title}
            </span>
            <p className="text-[11px] text-slate-300 mt-1 mb-3.5 max-w-[200px]">
              {selectedPrize.description}
            </p>

            <div className="flex items-center gap-1 bg-black/40 border border-yellow-500/30 px-3.5 py-1.5 rounded-xl">
              <span className="font-mono text-xs font-black text-yellow-400 tracking-widest">
                {selectedPrize.code}
              </span>
              <button 
                onClick={copyCode}
                className="ml-2 p-1 hover:bg-slate-800 rounded text-slate-300 transition-colors cursor-pointer"
                title="Copy promo code"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </div>

          {/* Overlay scratch foil - animate dissolve */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.div
                id="scratch-foil"
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 flex flex-col justify-center items-center text-red-950 p-4 cursor-pointer hover:brightness-110 transition-all select-none"
                onClick={triggerReveal}
              >
                {/* Chinese Cloud/Prosperity graphic details */}
                <div className="absolute top-2 left-2 w-8 h-8 opacity-25 border-t-2 border-l-2 border-red-950 rounded-tl-xl" />
                <div className="absolute bottom-2 right-2 w-8 h-8 opacity-25 border-b-2 border-r-2 border-red-950 rounded-br-xl" />

                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-12 h-12 bg-red-700/10 border border-red-900/20 rounded-full flex items-center justify-center mb-2"
                >
                  <Gift size={24} className="text-red-900" />
                </motion.div>
                
                <span className="font-sans font-black text-sm tracking-wide uppercase text-red-950">
                  Tap to Scratch!
                </span>
                <span className="text-[10px] font-bold text-red-900/70 mt-1">
                  Reveals Instant Discount
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex gap-2.5 justify-center">
          {isRevealed ? (
            <>
              <button
                onClick={() => {
                  if (onClaim) onClaim(selectedPrize.code);
                }}
                className="flex-1 max-w-[200px] bg-red-600 hover:bg-red-700 text-yellow-300 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide uppercase cursor-pointer border border-yellow-500/30 transition-colors shadow-lg"
              >
                Apply code to Order
              </button>
              <button
                onClick={() => window.open(`https://twitter.com/intent/tweet?text=I got ${selectedPrize.title} at Chowking!`)}
                className="bg-slate-900 hover:bg-slate-800 text-slate-300 py-2.5 px-3.5 rounded-xl text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
              >
                <Share2 size={15} />
              </button>
            </>
          ) : (
            <p className="text-[10px] text-slate-500 italic mt-1 font-bold">
              *Exclusive single-use customer appreciation promo key.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
