'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEmergencyStore } from '@/store/useEmergencyStore';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  ChevronDown, 
  Building2, 
  Terminal, 
  LogOut, 
  Sun, 
  Moon, 
  CheckCircle2, 
  MapPin, 
  Activity,
  QrCode,
  Check
} from 'lucide-react';

export default function LiveTrackingView() {
  const params = useParams();
  const router = useRouter();
  const dispatchId = (params?.dispatchId as string) || 'PL-ALERT-101';
  
  const { activeAlert, verifyQrCode, resetStore } = useEmergencyStore();

  // Local Theme State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 12-Minute Countdown Timer State
  const [secondsLeft, setSecondsLeft] = useState(720); // 12 mins = 720 secs
  const [isFulfilled, setIsFulfilled] = useState(false);

  useEffect(() => {
    if (activeAlert?.status === 'FULFILLED') {
      setIsFulfilled(true);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [activeAlert]);

  // Format seconds into MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  // Pitch Demo Check-in Trigger Handler
  const handleSimulateCheckIn = () => {
    const tokenToVerify = activeAlert?.checkInToken || 'PL-8890';
    verifyQrCode(tokenToVerify);
    setIsFulfilled(true);
  };

  // Shared Proximity Dictionary (PRD Section 3 & 5)
  const simulatedDistancesByRadius: Record<number, string> = {
    3: '1.8 km away',
    5: '3.2 km away',
    10: '7.4 km away',
  };

  // Reset Demo State
  const handleResetDemo = () => {
    resetStore();
    router.push('/hospital');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-pulselink-navy text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* Workspace Header Bar */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 sm:px-8 py-3 ${isDarkMode ? 'bg-pulselink-surface/90 border-pulselink-border' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-pulselink-navy border border-pulselink-crimson/30 shadow-pulse-glow transition-all group-hover:border-pulselink-crimson">
              <span className="absolute inset-0 rounded-xl bg-pulselink-crimson/20 animate-pulse pointer-events-none" />
              <Image
                src="/assets/pulselink-favico.png"
                alt="PulseLink Logo"
                width={22}
                height={22}
                className="object-contain relative z-10"
                priority
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Activity className="w-4 h-4 text-pulselink-crimson relative z-10 hidden fallback-icon" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-white group-hover:text-pulselink-crimson' : 'text-slate-900 group-hover:text-pulselink-crimson'}`}>
                Pulse<span className="text-pulselink-crimson">Link</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-pulselink-cyan tracking-wider -mt-1">
                LIVE FULFILLMENT & TRACKING
              </span>
            </div>
          </Link>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border text-amber-400 hover:text-amber-300' : 'bg-slate-100 border-slate-300 text-indigo-600 hover:bg-slate-200'}`}
              title="Toggle Light/Dark Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Portal Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border text-slate-300 hover:text-white' : 'bg-slate-100 border-slate-300 text-slate-700 hover:text-slate-950'}`}
              >
                <span>Switch Portal</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div 
                  className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 shadow-2xl z-50 border ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Jump To Role
                  </div>

                  <Link
                    href="/hospital"
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'hover:bg-pulselink-navy text-white' : 'hover:bg-slate-100 text-slate-900'}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Building2 className="w-4 h-4 text-pulselink-crimson" />
                    <span>Hospital Portal</span>
                  </Link>

                  <Link
                    href="/donor"
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'hover:bg-pulselink-navy text-white' : 'hover:bg-slate-100 text-slate-900'}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Zap className="w-4 h-4 text-pulselink-emerald" />
                    <span>Donor App</span>
                  </Link>

                  <Link
                    href="/dev"
                    className={`flex items-center gap-2.5 p-2 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'hover:bg-pulselink-navy text-white' : 'hover:bg-slate-100 text-slate-900'}`}
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Terminal className="w-4 h-4 text-pulselink-cyan" />
                    <span>System Telemetry</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pulselink-crimson/15 hover:bg-pulselink-crimson/25 text-pulselink-crimson border border-pulselink-crimson/30 text-xs font-bold transition-all"
            >
              <span>Exit</span>
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="grow flex items-center justify-center p-4 sm:p-8">
        <div className={`w-full max-w-3xl rounded-3xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-colors duration-300 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
          
          {/* Tracker Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pulselink-border/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pulselink-emerald animate-pulse" />
                <h1 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Active Fulfillment Tracking</h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Real-time donor navigation & hospital verification feed</p>
            </div>

            {/*<span className="px-3 py-1 rounded-full bg-pulselink-navy border border-pulselink-border text-pulselink-cyan text-xs font-mono font-bold">
              #{dispatchId}
            </span>*/}
          </div>

          {/* Timeline Progress Bar */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative py-2">
            
            {/* Step 1: Broadcasted */}
            <div className="flex flex-col items-center text-center space-y-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-pulselink-emerald text-white flex items-center justify-center font-bold text-xs shadow-pulse-glow">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-pulselink-emerald">Broadcasted</span>
            </div>

            {/* Step 2: Accepted */}
            <div className="flex flex-col items-center text-center space-y-1.5 z-10">
              <div className="w-9 h-9 rounded-full bg-pulselink-emerald text-white flex items-center justify-center font-bold text-xs shadow-pulse-glow">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-pulselink-emerald">Accepted</span>
            </div>

            {/* Step 3: En Route */}
            <div className="flex flex-col items-center text-center space-y-1.5 z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${isFulfilled ? 'bg-pulselink-emerald text-white' : 'bg-pulselink-amber text-slate-950 shadow-pulse-glow animate-pulse'}`}>
                {isFulfilled ? <Check className="w-4 h-4" /> : '🚗'}
              </div>
              <span className={`text-[11px] font-bold ${isFulfilled ? 'text-pulselink-emerald' : 'text-pulselink-amber'}`}>
                {isFulfilled ? 'En Route Done' : 'En Route'}
              </span>
            </div>

            {/* Step 4: Checked In */}
            <div className="flex flex-col items-center text-center space-y-1.5 z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${isFulfilled ? 'bg-pulselink-emerald text-white shadow-pulse-glow' : 'bg-pulselink-navy border border-pulselink-border text-slate-400'}`}>
                {isFulfilled ? <Check className="w-4 h-4" /> : '🏥'}
              </div>
              <span className={`text-[11px] font-bold ${isFulfilled ? 'text-pulselink-emerald' : 'text-slate-400'}`}>
                {isFulfilled ? 'Checked In ✓' : 'Check In'}
              </span>
            </div>

          </div>

          {/* Live ETA Banner Box */}
          <div className={`p-6 rounded-2xl border text-center space-y-2 transition-all ${isFulfilled ? 'bg-pulselink-emerald/10 border-pulselink-emerald' : 'bg-pulselink-navy border-pulselink-border'}`}>
            <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-400">
              {isFulfilled ? 'DISPATCH FULFILLED & VERIFIED' : 'ESTIMATED DONOR ARRIVAL TIME'}
            </span>

            <div className={`text-4xl sm:text-5xl font-black font-mono transition-colors ${isFulfilled ? 'text-pulselink-emerald' : 'text-pulselink-crimson'}`}>
              {isFulfilled ? 'ARRIVED ✓' : formatTime(secondsLeft)}
            </div>

            <p className="text-xs text-slate-300">
              {isFulfilled 
                ? 'John Doe has successfully checked in at FMC Owerri Emergency Surgery Unit.'
                : ` ${activeAlert?.acceptedDonorName || 'John Doe'} is en route to ${activeAlert?.hospitalName || 'Federal Medical Centre Owerri'}.`}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-[10px] text-slate-400 font-semibold"> Hospital</span>
              <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeAlert?.hospitalName || 'Federal Medical Centre Owerri'}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-[10px] text-slate-400 font-semibold">Blood Type Required</span>
              <span className="text-xs font-bold text-pulselink-crimson">
                {activeAlert?.bloodType || 'O-'} Negative ({activeAlert?.units || 2} Units)
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-50 border-slate-200'}`}>
              <span className="block text-[10px] text-slate-400 font-semibold">Assigned Donor</span>
              <span className={`text-xs font-bold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {activeAlert?.acceptedDonorName || 'John Doe'}
                <ShieldCheck className="w-3.5 h-3.5 text-pulselink-emerald" />
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-50 border-slate-200'}`}>
               <span className="block text-[10px] text-slate-400 font-semibold">Proximity</span>
               <span className="text-xs font-bold text-pulselink-cyan flex items-center gap-1">
                   <MapPin className="w-3.5 h-3.5" />
                       {activeAlert?.radiusKm 
                       ? (simulatedDistancesByRadius[activeAlert.radiusKm] || `${activeAlert.radiusKm} km away`)
                       : '3.2 km away'}
                </span>
            </div>
          </div>

          {/* Clinic Verification & Check-In Token Card */}
          <div className={`p-5 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-100 border-slate-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-pulselink-amber" />
                <h3 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Clinic Verification Token
                </h3>
              </div>
             {/* <span className="text-[10px] font-mono text-slate-400">Section 6 PRD Verified</span>*/}
            </div>

            <div className="text-center space-y-2">
              <p className="text-xs text-slate-400">
                Present this 4-digit token or QR payload to emergency triage upon arrival:
              </p>

              {/* Check-In Token Display */}
              <div className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-pulselink-surface border-2 border-pulselink-amber text-pulselink-amber font-mono font-black text-2xl tracking-widest shadow-pulse-glow">
                {activeAlert?.checkInToken || 'PL-8890'}
              </div>
            </div>

            {/* Pitch Presentation Trigger */}
            {!isFulfilled ? (
              <button
                onClick={handleSimulateCheckIn}
                className="w-full py-3 rounded-xl bg-pulselink-emerald hover:bg-emerald-600 font-bold text-white text-xs shadow-pulse-glow transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulate Hospital Check-in Verification</span>
              </button>
            ) : (
              <div className="p-3 rounded-xl bg-pulselink-emerald/15 border border-pulselink-emerald text-center text-pulselink-emerald text-xs font-bold">
                 Verified! {activeAlert?.units || 2} Units of {activeAlert?.bloodType || 'O-'} Blood Received into Emergency Queue.
              </div>
            )}
          </div>

          {/* Reset Demo State Action */}
          <div className="pt-2">
            <button
              onClick={handleResetDemo}
              className="w-full py-2.5 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 font-bold text-xs transition-all cursor-pointer"
            >
              Reset Demo Flow & Return to Hospital Command
            </button>
          </div>

        </div>
      </main>

    </div>
  );
}