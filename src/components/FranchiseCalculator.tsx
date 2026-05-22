import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, TrendingUp, DollarSign, Clock, HelpCircle, FileDown, CheckCircle, Send } from 'lucide-react';

interface FormatConfig {
  name: string;
  investment: number;
  ticketSize: number;
  operatingMargin: number; // e.g. 76 means 76% goes to expenses, 24% is net profit
  description: string;
}

const FORMATS: Record<string, FormatConfig> = {
  foodcourt: {
    name: 'Foodcourt Express Counter',
    investment: 8000000,
    ticketSize: 155,
    operatingMargin: 77,
    description: 'Perfect for high-density metropolitan shopping malls. Compact kitchen layout with rapid assembly structures.'
  },
  dinein: {
    name: 'Standard Dine-In Store',
    investment: 12000000,
    ticketSize: 190,
    operatingMargin: 75,
    description: 'Our staple community layout. High seating comfort paired with premium Chinese-inspired architectural designs.'
  },
  drivethru: {
    name: 'Deluxe Drive-Thru Store',
    investment: 15000000,
    ticketSize: 235,
    operatingMargin: 73,
    description: 'Maximizes high-converting vehicular traffic. Dual order-assembly lanes with extended 24-hour service possibilities.'
  }
};

export default function FranchiseCalculator() {
  const [selectedFormatKey, setSelectedFormatKey] = useState<string>('dinein');
  const [dailyCustomers, setDailyCustomers] = useState<number>(450);
  
  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [capital, setCapital] = useState('10M-15M');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const activeFormat = FORMATS[selectedFormatKey];

  // Calculations
  const dailyGross = dailyCustomers * activeFormat.ticketSize;
  const yearlyGross = dailyGross * 365;
  const netProfitMargin = 100 - activeFormat.operatingMargin;
  const yearlyNetProfit = yearlyGross * (netProfitMargin / 100);
  const paybackPeriodYears = activeFormat.investment / yearlyNetProfit;

  // Formatting Pesos
  const formatPesos = (val: number) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !city) return;
    setFormSubmitted(true);
  };

  return (
    <div id="franchise-calculator-container" className="space-y-8 text-left">
      
      {/* Upper Grid: Sliders & Outputs */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Input variables */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-[10px] bg-yellow-400 font-black text-red-950 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Empire ROI Planner 2026
            </span>
            <h3 className="text-xl font-bold font-sans text-slate-100 tracking-tight mt-3">
              Investment Blueprint Simulator
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mt-1">
              Select your desired branch template and expected daily traffic parameters to simulate operational net yields.
            </p>
          </div>

          {/* Format selection */}
          <div className="space-y-2">
            <label className="block text-[11px] font-black uppercase text-slate-400 tracking-widest">
              1. Store format selection
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(FORMATS).map(([key, f]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedFormatKey(key)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                    selectedFormatKey === key
                      ? 'border-red-500 bg-red-900/15 text-red-100 font-bold'
                      : 'border-slate-800 bg-slate-950/45 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Landmark className={`mb-1.5 ${selectedFormatKey === key ? 'text-red-500' : 'text-slate-500'}`} size={16} />
                  <span className="text-[10px] tracking-tight truncate w-full">{f.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Description of template */}
          <div className="p-3 bg-slate-950/80 border border-slate-850 rounded-xl text-[11px] text-slate-300 leading-relaxed italic">
            <strong>{activeFormat.name}:</strong> {activeFormat.description}
          </div>

          {/* Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">
                2. Expected Daily Foot Traffic
              </label>
              <span className="font-mono text-yellow-300 font-bold bg-slate-950 px-2.5 py-0.5 rounded border border-slate-800">
                {dailyCustomers} Visitors/Day
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="1000"
              step="25"
              value={dailyCustomers}
              onChange={(e) => setDailyCustomers(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-red-650"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
              <span>150 (Quiet)</span>
              <span>600 (Healthy average)</span>
              <span>1,000 (Prime area)</span>
            </div>
          </div>
        </div>

        {/* Dynamic Financial Outputs */}
        <div className="lg:col-span-6 bg-slate-950 border border-slate-850 p-6 rounded-2xl flex flex-col justify-between h-full space-y-6">
          <div className="space-y-4">
            <h4 className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
              Simulated Financial Yields
            </h4>

            {/* Total Capital Investment */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 text-xs">
              <span className="text-slate-400 font-medium">Estimated Capital Required</span>
              <span className="font-mono font-black text-rose-400">{formatPesos(activeFormat.investment)}</span>
            </div>

            {/* Estimated Ticket value average */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 text-xs">
              <span className="text-slate-400 font-medium">Average Meal Receipt</span>
              <span className="font-mono font-bold text-slate-200">₱{activeFormat.ticketSize}</span>
            </div>

            {/* Estimated Annual Gross */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 text-xs">
              <span className="text-slate-400 font-medium">Annual Gross Revenues</span>
              <span className="font-mono font-bold text-slate-300">{formatPesos(yearlyGross)}</span>
            </div>

            {/* Projected Net profit */}
            <div className="flex justify-between items-center border-b border-slate-850 pb-3 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                Projected Annual Net Profit
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-bold px-1.5 py-0.5 rounded">
                  {netProfitMargin}% Margin
                </span>
              </div>
              <span className="font-mono font-black text-emerald-400 text-sm">{formatPesos(yearlyNetProfit)}</span>
            </div>
          </div>

          {/* ROI Metric block */}
          <div className="bg-slate-900 border border-slate-850/80 p-4.5 rounded-xl flex items-center justify-between">
            <div className="text-left font-sans">
              <span className="text-[9px] uppercase font-black text-slate-500 tracking-wider">
                Predicted Payback Speed
              </span>
              <div className="text-lg font-black text-yellow-300 mt-1">
                {paybackPeriodYears.toFixed(1)} Academic Years
              </div>
              <p className="text-[10px] text-slate-400 leading-snug mt-0.5">
                Approximate duration to fully amortize investment principal.
              </p>
            </div>
            <div className="w-12 h-12 bg-red-650/15 border border-red-500/25 rounded-full flex items-center justify-center text-red-500">
              <Clock size={20} />
            </div>
          </div>
        </div>

      </div>

      {/* Lower Grid: Lead Capture Inquiry Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8">
        <AnimatePresence mode="wait">
          {!formSubmitted ? (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-left font-sans">
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                  Phase 1 - Inquiry Form
                </span>
                <h4 className="text-lg font-black text-slate-100 mt-2 tracking-tight">Request Full Prospectus Package</h4>
                <p className="text-xs text-slate-400 mt-0.5 max-w-xl">
                  Submit this preliminary inquiry to download the high-density confidential financial portfolio brochure and schedule a call with our JFC Franchise Team.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Full Professional Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Robert Kuan Jr."
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-250 placeholder:text-slate-600"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Business Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. r.kuan@empireholdings.ph"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-250 placeholder:text-slate-600"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Contact / Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +63 917 123 4567"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-250 placeholder:text-slate-600"
                  />
                </div>

                {/* Location target */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Proposed Franchise Location City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Iloilo City, Cebu, Baguio"
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-250 placeholder:text-slate-600"
                  />
                </div>

                {/* Available capital dropdown */}
                <div className="md:col-span-2 space-y-2">
                  <label className="block text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Liquid Capital Available for Investment
                  </label>
                  <select
                    value={capital}
                    onChange={(e) => setCapital(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl p-3 text-xs text-slate-300"
                  >
                    <option value="below-8M">Below ₱8 Million</option>
                    <option value="8M-12M">₱8 Million - ₱12 Million (Foodcourt standard)</option>
                    <option value="12M-15M">₱12 Million - ₱15 Million (Dine-In standard)</option>
                    <option value="above-15M">Above ₱15 Million (Drive-Thru deluxe)</option>
                  </select>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-700 hover:brightness-110 text-yellow-300 font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer border border-yellow-500/20 shadow-lg shadow-red-950/50 flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  Submit Formal Proposal and Request Call
                </button>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-4 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-emerald-950 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto scale-110">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-bold tracking-tight text-slate-100">Proposal Lodged Successfully!</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
                Mabuhay, {fullName}! Your preliminary franchise proposal has been safely submitted to the Jollibee Foods Corporation (JFC) franchising hub. A local account manager will contact you at <strong>{phone}</strong> inside 48 hours.
              </p>
              
              {/* Fake Download Brochure */}
              <div className="pt-4">
                <button
                  onClick={() => alert('Simulating PDF Brochure Download representing official Chowking 2026 franchising conditions...')}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-400 hover:bg-yellow-500 text-red-950 font-black rounded-xl text-xs uppercase tracking-wide cursor-pointer transition-colors shadow-lg"
                >
                  <FileDown size={15} />
                  Download Complete Prospectus (PDF)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
