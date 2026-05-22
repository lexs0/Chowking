import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Navigation, Clock, Phone, Grid, Eye, Check, Loader2 } from 'lucide-react';
import { BRANCHES } from '../data';
import { Branch } from '../types';

export default function BranchMap() {
  const [cityFilter, setCityFilter] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[1]); // Default to Makati 24/7
  const [hasDineInOnly, setHasDineInOnly] = useState(false);
  const [hasDriveThruOnly, setHasDriveThruOnly] = useState(false);
  const [has24HoursOnly, setHas24HoursOnly] = useState(false);
  
  const [isLocating, setIsLocating] = useState(false);
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Search autocomplete list based on Manila cities we possess
  const uniqueCities = Array.from(new Set(BRANCHES.map(b => b.city)));

  // Filter logic
  const filteredBranches = BRANCHES.filter((branch) => {
    const matchesCity = cityFilter === '' || branch.city.toLowerCase() === cityFilter.toLowerCase() || branch.name.toLowerCase().includes(cityFilter.toLowerCase());
    const matchesDineIn = !hasDineInOnly || branch.hasDineIn;
    const matchesDriveThru = !hasDriveThruOnly || branch.hasDriveThru;
    const matches24H = !has24HoursOnly || branch.is24Hours;
    return matchesCity && matchesDineIn && matchesDriveThru && matches24H;
  });

  const handleSimulateGeolocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      // Simulate proximity to BGC branch (Stopover Plaza)
      setMyLocation({ lat: 14.5562, lng: 121.0435 });
      const bgcBranch = BRANCHES.find(b => b.id === 'br-bgc-stopover') || BRANCHES[0];
      setSelectedBranch(bgcBranch);
    }, 1500);
  };

  return (
    <div id="branch-finder-module" className="bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden p-6 md:p-8 shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid: Filters & Listing */}
        <div className="lg:col-span-5 flex flex-col justify-between h-[520px] text-left">
          <div>
            <h3 className="text-xl font-bold font-sans text-slate-100 flex items-center gap-2">
              <MapPin className="text-red-500 animate-bounce" size={22} />
              Philippine Branch Finder
            </h3>
            <p className="text-xs text-slate-400 mt-1 mb-5">
              Locate the nearest wok-fresh aromas. Supporting national delivery hubs & 24/7 drive-thrus.
            </p>

            {/* Smart Search Field */}
            <div className="relative mb-4">
              <Search className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
              <input
                type="text"
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                placeholder="Search by city (e.g. Makati, BGC, Taft)..."
                className="w-full bg-slate-900 border border-slate-800 focus:border-red-500 focus:outline-none rounded-xl py-3 pl-11 pr-4 text-xs text-slate-200 placeholder:text-slate-500"
              />
              {cityFilter && (
                <button
                  onClick={() => setCityFilter('')}
                  className="absolute right-3.5 top-3.5 text-slate-450 hover:text-white text-xs font-black cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Simulated GPS Quick Access button */}
            <button
              onClick={handleSimulateGeolocation}
              disabled={isLocating}
              className="w-full mb-4 py-2.5 px-4 bg-red-950/40 border border-red-500/20 hover:border-red-500/50 rounded-xl text-yellow-400 hover:text-yellow-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isLocating ? (
                <>
                  <Loader2 className="animate-spin text-yellow-400" size={14} />
                  GPS Georeferencing Active...
                </>
              ) : (
                <>
                  <Navigation size={14} />
                  Use Current Location (GPS)
                </>
              )}
            </button>

            {/* Checkbox Filter Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setHasDineInOnly(!hasDineInOnly)}
                className={`px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  hasDineInOnly 
                    ? 'bg-red-600/20 border-red-500 text-red-200' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                🥢 Dine-In
              </button>
              <button
                onClick={() => setHasDriveThruOnly(!hasDriveThruOnly)}
                className={`px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  hasDriveThruOnly 
                    ? 'bg-red-600/20 border-red-500 text-red-200' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                🚗 Drive-Thru
              </button>
              <button
                onClick={() => setHas24HoursOnly(!has24HoursOnly)}
                className={`px-3 py-1.5 rounded-lg border text-[10px] uppercase font-bold tracking-wider transition-all cursor-pointer ${
                  has24HoursOnly 
                    ? 'bg-red-600/20 border-red-500 text-red-200' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                ⏰ 24 Hours
              </button>
            </div>
          </div>

          {/* Branch List Scroll */}
          <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[220px] scrollbar-thin scrollbar-thumb-slate-800 pr-1 text-xs">
            {filteredBranches.length > 0 ? (
              filteredBranches.map((br) => (
                <div
                  key={br.id}
                  onClick={() => setSelectedBranch(br)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                    selectedBranch.id === br.id
                      ? 'border-red-500 bg-red-900/10'
                      : 'border-slate-900 bg-slate-950 hover:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-slate-200 text-xs">{br.name}</h4>
                    {br.is24Hours && (
                      <span className="bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-[8px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0">24/7</span>
                    )}
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1 line-clamp-1">{br.address}</p>
                  
                  {/* Service badges */}
                  <div className="flex gap-2.5 mt-2.5 text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    {br.hasDriveThru && <span className="text-yellow-500/85">🚗 Drive-Thru</span>}
                    {br.hasDineIn && <span className="text-slate-400">🥢 Dine-In</span>}
                    {br.hasDelivery && <span className="text-red-400/80">🛵 Delivery</span>}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic py-6 text-center">No branches match your current filter settings.</p>
            )}
          </div>
        </div>

        {/* Right Grid: Stylized Vector Interactive Map Canvas */}
        <div className="lg:col-span-7 h-[520px] rounded-2xl relative overflow-hidden bg-slate-900 border border-slate-800 select-none">
          {/* Map canvas container */}
          <div className="absolute inset-0 bg-slate-900">
            {/* Grid gridlines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ef4444_1px,transparent_1px),linear-gradient(to_bottom,#ef4444_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)] bg-[size:200px_200px]" />

            {/* Stylized Street vectors */}
            <svg className="absolute inset-0 w-full h-full opacity-20 text-slate-500" xmlns="http://www.w3.org/2000/svg">
              <line x1="10%" y1="0%" x2="40%" y2="100%" stroke="currentColor" strokeWidth="6" />
              <line x1="0%" y1="70%" x2="100%" y2="80%" stroke="currentColor" strokeWidth="8" strokeDasharray="5,5" />
              <line x1="80%" y1="0%" x2="70%" y2="100%" stroke="currentColor" strokeWidth="4" />
              <line x1="0%" y1="30%" x2="100%" y2="25%" stroke="currentColor" strokeWidth="6" />
              {/* Park representation */}
              <circle cx="50%" cy="50%" r="80" fill="#047857" opacity="0.1" />
              {/* Estero / Water feature representation */}
              <path d="M 0,200 Q 150,150 300,280 T 600,220 T 1000,320" fill="none" stroke="#0284c7" strokeWidth="16" opacity="0.15" />
            </svg>

            {/* Simulated branch radar rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-48 h-48 rounded-full border border-yellow-500/5 animate-ping absolute" />
              <span className="w-80 h-80 rounded-full border border-red-500/5 animate-ping absolute" style={{ animationDelay: '1s' }} />
            </div>

            {/* Pins of other branches */}
            {BRANCHES.map((br) => {
              // Map lat/long delta factors relative to manila average to generate visual scatter on map
              const xPercent = 50 + (br.lng - 121.025) * 850;
              const yPercent = 50 - (br.lat - 14.54) * 850;

              return (
                <button
                  key={br.id}
                  onClick={() => setSelectedBranch(br)}
                  style={{ left: `${Math.min(90, Math.max(10, xPercent))}%`, top: `${Math.min(90, Math.max(10, yPercent))}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                >
                  <div className={`transition-all duration-300 p-2.5 rounded-full flex items-center justify-center ${
                    selectedBranch.id === br.id 
                      ? 'bg-red-600 text-yellow-300 scale-125 z-20 shadow-lg shadow-red-900/60 ring-4 ring-yellow-400/20' 
                      : 'bg-slate-950 text-slate-400 scale-100 z-10 hover:text-white hover:bg-slate-800'
                  }`}>
                    <MapPin size={15} />
                  </div>
                  {/* Mini hover popup name */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-10 pointer-events-none whitespace-nowrap bg-black/90 border border-slate-800 text-[9px] px-1.5 py-0.5 rounded text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    {br.name.replace('Chowking ', '')}
                  </span>
                </button>
              );
            })}

            {/* Current simulated user GPS marker */}
            {myLocation && (
              <div
                style={{ left: '55%', top: '55%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
              >
                <span className="absolute -inset-2 bg-blue-500/40 rounded-full animate-ping pointer-events-none" />
                <div className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center font-bold text-[8px] text-white">
                  Me
                </div>
              </div>
            )}
          </div>

          {/* Bottom Card showing active selected branch info */}
          <div className="absolute bottom-4 left-4 right-4 bg-slate-950/95 border border-slate-850 p-4.5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-xl backdrop-blur-md">
            <div className="text-left font-sans">
              <span className="text-[9px] bg-red-950 text-yellow-400 border border-red-500/20 px-2 py-0.5 rounded font-black uppercase tracking-wider">
                Selected Branch
              </span>
              <h4 className="text-sm font-black text-slate-100 mt-1.5 tracking-tight">{selectedBranch.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug max-w-sm">{selectedBranch.address}</p>
              
              <div className="flex flex-wrap gap-4 mt-3 text-slate-400 text-[11px] leading-none">
                <span className="flex items-center gap-1">
                  <Clock size={12} className="text-yellow-500" />
                  {selectedBranch.hours}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-red-400" />
                  {selectedBranch.phone}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Starting simulated smartphone routing directions to ${selectedBranch.name}`)}
              className="w-full md:w-auto bg-red-650 hover:bg-red-700 text-yellow-300 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer border border-yellow-500/20"
            >
              <Navigation size={13} className="fill-yellow-300" />
              Navigate GPS
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
