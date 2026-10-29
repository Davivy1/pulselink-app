'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
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
  Trophy, 
  Activity,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export default function DonorMobileView() {
  const router = useRouter();
  const { activeAlert, acceptAlert, dispatchAlert } = useEmergencyStore();

  // Local Theme State (Isolated for Donor App)
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Timer State (3 Minute Countdown)
  const [secondsLeft, setSecondsLeft] = useState(60);

  useEffect(() => {
    if (!activeAlert || activeAlert.status !== 'DISPATCHED') return;

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

  // Accept Dispatch Handler
  const handleAccept = () => {
    acceptAlert('D502', 'John Doe');
    const alertId = activeAlert?.alertId || 'PL-ALERT-101';
    router.push(`/tracking/${alertId}`);
  };

  // Pitch Demo Trigger Handler
  const handleSimulateBroadcast = () => {
    dispatchAlert({
      hospitalId: 'H101',
      hospitalName: 'Federal Medical Centre Owerri',
      bloodType: 'O-',
      units: 2,
      urgency: 'CRITICAL',
      radiusKm: 5,
    });
    setSecondsLeft(180);
  };

  // Map hospital dispatch radius to simulated donor proximity for the pitch demo
  const simulatedDistancesByRadius: Record<number, string> = {
       3: '1.8 km away',
       5: '3.2 km away',
       10: '7.4 km away',
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
              <span className="text-[10px] font-mono font-bold text-pulselink-emerald tracking-wider -mt-1">
                DONOR MOBILE APP
              </span>
            </div>
          </Link>

          {/* Action Controls: Theme Toggle + Switcher + Exit */}
          <div className="flex items-center gap-2.5">
            
            {/* Sun/Moon Light-Dark Mode Toggle */}
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
                  className={`absolute right-0 mt-2 w-56 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 border ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}
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

            {/* Exit Workspace CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-pulselink-crimson/15 hover:bg-pulselink-crimson/25 text-pulselink-crimson border border-pulselink-crimson/30 text-xs font-bold transition-all"
              title="Exit Workspace"
            >
              <span>Exit</span>
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Main Viewport Container */}
      <main className="grow flex items-center justify-center sm:p-6 p-0">
        
        {/* Responsive Device Frame (Mockup on Desktop, Native Edge-to-Edge on Mobile) */}
        <div className={`w-full sm:max-w-103 sm:h-185 sm:rounded-[48px] sm:border-10 shadow-none sm:shadow-2xl overflow-hidden relative flex flex-col transition-all duration-300 ${
          isDarkMode 
            ? 'bg-pulselink-navy sm:border-slate-800 shadow-slate-950/80 sm:ring-1 sm:ring-slate-700/50' 
            : 'bg-slate-50 sm:border-slate-300 shadow-slate-400/50 sm:ring-1 sm:ring-slate-300'
        }`}>
          
          {/* Dynamic Island / Top Camera Notch (Desktop pitch mode only) */}
          <div className="hidden sm:flex absolute top-2 left-1/2 -translate-x-1/2 z-50 w-24 h-4 bg-slate-950 rounded-full items-center justify-center gap-2 pointer-events-none shadow-md">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
            <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80" />
          </div>

          <div className="hidden sm:block h-6 shrink-0 bg-transparent" />

          {/* Inner Scrollable Phone Screen Body */}
          <div className="grow flex flex-col overflow-hidden relative">
            
            {/* Native Phone Status Header Bar */}
            <div className={`px-6 py-3 flex items-center justify-between border-b shrink-0 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-pulselink-navy border border-pulselink-crimson/40 text-white font-extrabold text-xs flex items-center justify-center">
                  JD
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h2 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>John Doe</h2>
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.2 rounded-full bg-pulselink-emerald/15 text-pulselink-emerald text-[10px] font-bold">
                      <ShieldCheck className="w-3 h-3" />
                      Tier 2
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">FUTO Campus</p>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-pulselink-crimson/15 border border-pulselink-crimson/30 text-pulselink-crimson font-black text-xs flex items-center justify-center">
                O-
              </div>
            </div>

            {/* Scrollable Mobile App Body */}
            <div className="p-4 space-y-3.5 grow overflow-y-auto">
              
              {/* Donor Availability & Geofence Card */}
              <div className={`p-3.5 rounded-2xl border space-y-2.5 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-400">Donor Status</span>
                  <span className="text-pulselink-emerald flex items-center gap-1 font-bold">
                    <span className="w-2 h-2 rounded-full bg-pulselink-emerald animate-pulse"></span>
                    Ready to Donate
                  </span>
                </div>

                <div className="pt-2 border-t border-pulselink-border/50 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Active Geofence</span>
                  <span className="font-bold flex items-center gap-1 text-pulselink-cyan">
                    <MapPin className="w-3.5 h-3.5" />
                    5 km Radius
                  </span>
                </div>
              </div>

              {/* Pitch Demo Trigger Button */}
              <div className={`p-3.5 rounded-2xl border text-center ${isDarkMode ? 'bg-pulselink-navy/80 border-pulselink-border' : 'bg-slate-200/80 border-slate-300'}`}>
                <button
                  onClick={handleSimulateBroadcast}
                  className="w-full py-2.5 rounded-xl bg-pulselink-surface hover:bg-pulselink-border border border-pulselink-border font-bold text-xs text-pulselink-cyan transition-all cursor-pointer"
                >
                  Trigger Emergency Alert
                </button>
              </div>

              {/* Campus Impact & Leaderboard Widget */}
              <div className={`p-3.5 rounded-2xl border space-y-2.5 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-pulselink-amber" />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Campus Leaderboard</span>
                  </div>
                  <span className="text-[11px] font-bold text-pulselink-amber bg-pulselink-amber/15 px-2 py-0.5 rounded-full">
                    #3 Ranking
                  </span>
                </div>

                <p className="text-[11px] text-slate-400">Computer Science Department</p>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className={`p-2.5 rounded-xl border text-center ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="block text-base font-extrabold text-pulselink-crimson">4</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Lives Saved</span>
                  </div>

                  <div className={`p-2.5 rounded-xl border text-center ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="block text-base font-extrabold text-pulselink-emerald">350</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Impact Points</span>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Tabs */}
              <div className={`flex border-b px-3 pt-2 gap-4 text-xs font-bold ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
                <button 
                  className="pb-2 border-b-2 border-pulselink-crimson text-pulselink-crimson flex items-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>Emergency Dispatches</span>
                </button>

                <Link 
                  href="/donor/impact" 
                  className={`pb-2 border-b-2 border-transparent hover:border-slate-400 flex items-center gap-1.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <Trophy className="w-3.5 h-3.5 text-pulselink-amber" />
                  <span>Campus Impact</span>
                </Link>
              </div>

            </div>

            {/* Incoming High-Urgency Emergency Alert Modal */}
            {activeAlert && activeAlert.status === 'DISPATCHED' && (
              <div className="absolute inset-0 z-50 bg-slate-950/85 backdrop-blur-md p-4 flex flex-col justify-end animate-in slide-in-from-bottom-5">
                <div className="w-full rounded-3xl bg-pulselink-surface border-2 border-pulselink-crimson p-4 space-y-3.5 shadow-pulse-glow">
                  
                  {/* Alert Header */}
                  <div className="flex items-center justify-between border-b border-pulselink-border pb-2.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-pulselink-crimson/20 text-pulselink-crimson text-[10px] font-extrabold uppercase tracking-wider animate-pulse">
                      <Zap className="w-3.5 h-3.5" />
                      CRITICAL EMERGENCY MATCH
                    </span>
                    <span className="text-[10px] font-bold text-pulselink-amber bg-pulselink-amber/15 px-2 py-0.5 rounded-full">
                      {activeAlert?.radiusKm 
                        ? (simulatedDistancesByRadius[activeAlert.radiusKm] || `${activeAlert.radiusKm} km radius`)
                        : '3.2 km away'}
                    </span>
                  </div>

                  {/* Hospital Details */}
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-extrabold text-white">{activeAlert.hospitalName}</h3>
                    <p className="text-[11px] text-slate-400">Emergency Surgery Unit • Owerri</p>
                  </div>

                  {/* Target Match Specs */}
                  <div className="grid grid-cols-2 gap-2.5 p-2.5 rounded-xl bg-pulselink-navy border border-pulselink-border text-center">
                    <div>
                      <span className="block text-[10px] text-slate-400">Blood Type Needed</span>
                      <span className="text-xs font-black text-pulselink-crimson">{activeAlert.bloodType}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400">Units Required</span>
                      <span className="text-xs font-black text-white">{activeAlert.units} Units</span>
                    </div>
                  </div>

                  {/* Live Acceptance Countdown Bar */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-pulselink-amber" />
                        Acceptance Window
                      </span>
                      <span className="text-pulselink-amber font-mono font-extrabold">{formatTime(secondsLeft)}</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-pulselink-navy overflow-hidden">
                      <div 
                        className="h-full bg-pulselink-amber transition-all duration-1000"
                        style={{ width: `${(secondsLeft / 60) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA Action Buttons */}
                  <div className="pt-1">
                    <button
                      onClick={handleAccept}
                      className="w-full py-3 rounded-xl bg-pulselink-crimson hover:bg-pulselink-crimson-hover font-bold text-white text-xs shadow-pulse-glow transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Zap className="w-4 h-4" />
                      <span>ACCEPT DISPATCH & NAVIGATE</span>
                    </button>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Bottom Home Indicator Gesture Bar (Desktop pitch mockup only) */}
          <div className="hidden sm:flex h-5 shrink-0 items-center justify-center bg-transparent pointer-events-none">
            <div className={`w-32 h-1 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
          </div>

        </div>
      </main>

    </div>
  );
}