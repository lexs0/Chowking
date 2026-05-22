import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Star, Shield, Play, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { OrderStatus } from '../types';

export default function OrderTracker({ order, onReset }: { order: OrderStatus; onReset?: () => void }) {
  const [secondsRemaining, setSecondsRemaining] = useState(order.estimatedDeliveryMinutes * 60);
  const [currentStep, setCurrentStep] = useState<'received' | 'preparing' | 'dispatched' | 'arrived'>('received');

  // Trigger stage transitions based on time
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCurrentStep('arrived');
          return 0;
        }

        // Simulating step progressions proportionally
        const ratio = prev / (order.estimatedDeliveryMinutes * 60);
        if (ratio < 0.25) {
          setCurrentStep('dispatched');
        } else if (ratio < 0.75) {
          setCurrentStep('preparing');
        } else {
          setCurrentStep('received');
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [order]);

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const steps = [
    { key: 'received', title: 'Order Received', desc: 'Securely lodged at local wok station' },
    { key: 'preparing', title: 'Wok Master Cooking', desc: 'Crafting hot Chao Fan with high heat' },
    { key: 'dispatched', title: 'Out for Dispatch', desc: 'Rider speed-bound on hot motorcycle' },
    { key: 'arrived', title: 'Arrived Outdoors', desc: 'Mabuhay! Your comfort food has safely landed' }
  ];

  const getStepIndex = (key: string) => {
    const table: Record<string, number> = { received: 0, preparing: 1, dispatched: 2, arrived: 3 };
    return table[key];
  };

  const currentStepIndex = getStepIndex(currentStep);

  return (
    <div id="order-tracker-screen" className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl text-left font-sans">
      
      {/* Top row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-5 mb-6">
        <div>
          <span className="text-[10px] bg-red-950 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
            Live Delivery Radar
          </span>
          <h3 className="text-lg font-black text-slate-100 mt-2 tracking-tight">Order #{order.id}</h3>
          <p className="text-xs text-slate-400 mt-0.5">Destined for: <strong className="text-slate-300">{order.address}</strong></p>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-500 uppercase font-black block mb-1">Time to Arrival</span>
          <span className="font-mono text-3xl font-black text-yellow-300 animate-pulse tracking-tight">
            {formatTime(secondsRemaining)}
          </span>
        </div>
      </div>

      {/* Progress timeline visual (Standard styled bars) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {steps.map((st, i) => {
          const isCompleted = i < currentStepIndex;
          const isActive = i === currentStepIndex;
          return (
            <div
              key={st.key}
              className={`p-3.5 rounded-xl border transition-all ${
                isActive
                  ? 'border-red-500 bg-red-900/10'
                  : isCompleted
                  ? 'border-emerald-500 bg-emerald-900/10 text-emerald-200'
                  : 'border-slate-800 bg-slate-950 opacity-55'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                  isCompleted 
                    ? 'bg-emerald-500 text-slate-950' 
                    : isActive 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isCompleted ? '✓' : i + 1}
                </span>
                <span className="text-xs tracking-tight">{st.title}</span>
              </div>
              <p className="text-[9px] text-slate-400 leading-normal">{st.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Grid: Map vector simulation & Rider Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Dynamic Road Vector Track */}
        <div className="h-44 rounded-2xl relative overflow-hidden bg-slate-950 border border-slate-850 p-4">
          <span className="absolute top-2 left-2 text-[9px] text-slate-500 uppercase font-black tracking-widest">
            Simulated GPS Track overlay
          </span>
          
          {/* Radial streets */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ef4444_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* S-curve road segment */}
          <svg className="absolute inset-0 w-full h-full text-slate-800" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 20,120 Q 150,30 200,90 T 300,40"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Dashed line inside */}
            <path
              d="M 20,120 Q 150,30 200,90 T 300,40"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="5,5"
              className="opacity-70 animate-[dash_10s_linear_infinite]"
            />
          </svg>

          {/* Rider Position indicator */}
          <div className="absolute left-[54%] top-[45%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="w-8 h-8 rounded-full bg-red-650 text-yellow-300 border border-yellow-400 flex items-center justify-center shadow-lg shadow-red-950 animate-bounce">
              🛵
            </span>
            <span className="bg-black/90 border border-red-500/20 text-[8px] font-sans px-1.5 py-0.5 rounded text-white mt-1 uppercase font-bold tracking-wider">
              Kuya Jojo (1.2 km away)
            </span>
          </div>

          {/* Delivery Target marker */}
          <div className="absolute right-[10%] top-[25%]">
            <div className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center text-xs animate-pulse">
              🏠
            </div>
          </div>
        </div>

        {/* Rider profile and Delivery Details card */}
        <div className="bg-slate-950 border border-slate-850 p-5 rounded-2xl flex flex-col justify-between h-44">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-11 h-11 bg-slate-800 border border-slate-700 rounded-full overflow-hidden shrink-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                alt="Rider"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Stats */}
            <div className="text-left font-sans flex-1">
              <span className="text-[8px] uppercase tracking-wider font-extrabold text-slate-500 block">Assigned Rider</span>
              <h4 className="text-xs font-black text-slate-200 mt-0.5">Kuya Jojo Santos</h4>
              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
                <span className="flex items-center gap-0.5 text-yellow-500">
                  <Star size={10} className="fill-yellow-500" /> 4.9
                </span>
                <span>•</span>
                <span>Red Honda TM-125</span>
              </div>
            </div>

            {/* Dial Button */}
            <button
              onClick={() => alert('Simulating smartphone secure call proxy routing to Jojo Santos...')}
              className="p-2.5 bg-red-950 border border-red-500/30 text-yellow-400 hover:text-white rounded-xl shadow cursor-pointer transition-colors"
              title="Call Rider"
            >
              <Phone size={14} />
            </button>
          </div>

          <div className="mt-4 pt-3.5 border-t border-slate-850 text-[10px] text-slate-400 flex justify-between items-center bg-slate-900/30 -mx-5 px-5 py-2 -mb-5 rounded-b-2xl">
            <span className="flex items-center gap-1">
              <Shield size={12} className="text-emerald-500" /> Perfect safety records compliant
            </span>
            <span className="text-yellow-400 text-[9px] uppercase font-bold">Warm insulated box loaded</span>
          </div>
        </div>

      </div>

      {/* Footer Return action */}
      {onReset && (
        <div className="mt-8 flex justify-center border-t border-slate-800 pt-5">
          <button
            onClick={onReset}
            className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw size={13} /> Close and return to Home
          </button>
        </div>
      )}

    </div>
  );
}
