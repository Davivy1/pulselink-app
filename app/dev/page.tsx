'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEmergencyStore } from '@/store/useEmergencyStore';
import { 
  ShieldCheck, 
  Zap, 
  ChevronDown, 
  Building2, 
  Terminal, 
  LogOut, 
  Sun, 
  Moon, 
  Activity,
  CheckCircle2,
  Clock,
  RefreshCw,
  FileText
} from 'lucide-react';

export default function SystemTelemetryView() {
  const { activeAlert } = useEmergencyStore();

  // Local Theme & UI State
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock Verification Queue State
  const [verificationQueue, setVerificationQueue] = useState([
    { id: 1, name: 'John Doe', matric: 'FUTO / 20210943', doc: 'Student_Matric_ID.pdf', status: 'PENDING' },
    { id: 2, name: 'Amina Youssef', matric: 'UNILAG / 20221102', doc: 'National_ID_NIN.pdf', status: 'PENDING' },
  ]);

  const handleApproveTier = (id: number) => {
    setVerificationQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'VERIFIED' } : item))
    );
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-pulselink-navy text-white' : 'bg-slate-100 text-slate-900'}`}>
      
      {/* Workspace Header Bar */}
      <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-md px-4 sm:px-8 py-3 ${isDarkMode ? 'bg-pulselink-surface/90 border-pulselink-border' : 'bg-white/90 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-pulselink-navy border border-pulselink-cyan/30 shadow-pulse-glow transition-all group-hover:border-pulselink-cyan">
              <span className="absolute inset-0 rounded-xl bg-pulselink-cyan/20 animate-pulse pointer-events-none" />
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
              <Activity className="w-4 h-4 text-pulselink-cyan relative z-10 hidden fallback-icon" />
            </div>
            <div className="flex flex-col">
              <span className={`text-base font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-white group-hover:text-pulselink-cyan' : 'text-slate-900 group-hover:text-pulselink-cyan'}`}>
                Pulse<span className="text-pulselink-cyan">Link</span>
              </span>
              <span className="text-[10px] font-mono font-bold text-pulselink-cyan tracking-wider -mt-1">
                SYSTEM TELEMETRY & CONTROL
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
      <main className="grow max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        
        {/* Top Control Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className={`text-2xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              System Control Engine
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Platform health monitoring, NDPR privacy shields & real-time dispatch telemetry
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pulselink-emerald/15 border border-pulselink-emerald text-pulselink-emerald text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-pulselink-emerald animate-pulse" />
            SYSTEM HEALTH: 99.98% ACTIVE
          </div>
        </div>

        {/* System Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Active Dispatches</span>
            <span className="text-2xl font-black text-pulselink-crimson">{activeAlert ? 1 : 0}</span>
            <span className="text-[10px] text-slate-400 block">5 km Active Geofence</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Verified Donors</span>
            <span className="text-2xl font-black text-white">1,240</span>
            <span className="text-[10px] text-slate-400 block">Tier 2 ID & Tier 3 Med Verified</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">Avg Response ETA</span>
            <span className="text-2xl font-black text-pulselink-emerald">11.4 Mins</span>
            <span className="text-[10px] text-slate-400 block">Target Threshold &lt; 15 Mins</span>
          </div>

          <div className={`p-4 rounded-2xl border space-y-1 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
            <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">NDPR Privacy Shield</span>
            <span className="text-2xl font-black text-pulselink-cyan">Active</span>
            <span className="text-[10px] text-slate-400 block">Anonymized Distance Vectors</span>
          </div>
        </div>

        {/* Main Content Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Verification Queue Table */}
          <div className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center justify-between border-b border-pulselink-border/60 pb-3">
              <div>
                <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Donor ID Verification Queue
                </h2>
                <p className="text-[11px] text-slate-400">Review student matric IDs & national NIN docs</p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-pulselink-amber/15 text-pulselink-amber text-[10px] font-bold">
                {verificationQueue.filter(i => i.status === 'PENDING').length} Pending
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-pulselink-border/40 text-[10px] font-mono uppercase text-slate-400">
                    <th className="pb-2">Donor</th>
                    <th className="pb-2">Institution / ID</th>
                    <th className="pb-2">Document</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pulselink-border/40">
                  {verificationQueue.map((item) => (
                    <tr key={item.id}>
                      <td className="py-2.5 font-bold">{item.name}</td>
                      <td className="py-2.5 text-slate-400 font-mono text-[11px]">{item.matric}</td>
                      <td className="py-2.5 text-pulselink-cyan flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        <span className="text-[11px] cursor-pointer hover:underline">{item.doc}</span>
                      </td>
                      <td className="py-2.5 text-right">
                        {item.status === 'PENDING' ? (
                          <button
                            onClick={() => handleApproveTier(item.id)}
                            className="px-2.5 py-1 rounded-lg bg-pulselink-emerald hover:bg-emerald-600 text-white font-bold text-[10px] transition-all cursor-pointer"
                          >
                            Approve Tier 2
                          </button>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-pulselink-emerald text-[10px] font-bold">
                            <ShieldCheck className="w-3 h-3" /> Verified ✓
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Real-time Emergency Dispatch Telemetry Stream */}
          <div className={`p-6 rounded-3xl border space-y-4 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
           <div className="flex items-center justify-between border-b border-pulselink-border/60 pb-3">
            <div>
              <h2 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Emergency Dispatch Stream
              </h2>
              <p className="text-[11px] text-slate-400">Live event bus telemetry across partner hospitals</p>
            </div>
             <Terminal className="w-4 h-4 text-pulselink-cyan" />
          </div>

          <div className="space-y-3 font-mono text-xs">
            {/* Dynamic Store-Connected Active Log Item */}
            {activeAlert ? (
              <div className={`p-3 rounded-xl border space-y-1 transition-colors ${
                activeAlert.status === 'FULFILLED' 
                  ? 'bg-pulselink-emerald/10 border-pulselink-emerald' 
                  : activeAlert.status === 'ACCEPTED'
                  ? 'bg-pulselink-amber/10 border-pulselink-amber'
                  : 'bg-pulselink-navy border-pulselink-crimson/40'
            }`}>
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className={`font-bold flex items-center gap-1 ${
                  activeAlert.status === 'FULFILLED' ? 'text-pulselink-emerald' : 
                  activeAlert.status === 'ACCEPTED' ? 'text-pulselink-amber' : 
                  'text-pulselink-crimson'
               }`}>
                 <Zap className="w-3 h-3 animate-pulse" /> LIVE STREAM LOG
               </span>
                <span>JUST NOW</span>
            </div>

            <p className="text-white text-[11px]">
              <strong>{activeAlert.hospitalName || 'Federal Medical Centre Owerri'}</strong> dispatch for{' '}
              <span className="text-pulselink-crimson font-bold">{activeAlert.bloodType || 'O-'}</span> ({activeAlert.units || 2} Units).
            </p>

            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
             <span>
              Status:{' '}
              <strong className={`px-2 py-0.5 rounded-full text-[10px] ${
                activeAlert.status === 'FULFILLED' ? 'bg-pulselink-emerald/20 text-pulselink-emerald' :
                activeAlert.status === 'ACCEPTED' ? 'bg-pulselink-amber/20 text-pulselink-amber' :
                'bg-pulselink-crimson/20 text-pulselink-crimson'
             }`}>
               {activeAlert.status}
             </strong>
           </span>
            <span>Token: {activeAlert.checkInToken || 'PL-8890'}</span>
         </div>
       </div>
     ) : (
       <div className="p-3 rounded-xl bg-pulselink-navy border border-pulselink-border text-slate-400 text-[11px] text-center">
         Idle Stream — Waiting for hospital broadcast trigger...
       </div>
     )}

     {/* Historical Log Entry */}
     <div className="p-3 rounded-xl bg-pulselink-navy/60 border border-pulselink-border/50 space-y-1">
       <div className="flex items-center justify-between text-[10px] text-slate-400">
         <span>HISTORICAL ENTRY</span>
         <span>14:22 WAT</span>
       </div>
       <p className="text-slate-300 text-[11px]">
         <strong>FMC Owerri</strong> broadcasted <strong>O- Negative</strong> (2 Units).
       </p>
       <span className="text-pulselink-emerald text-[10px] font-bold block">
         Status: FULFILLED ✓
               </span>
              </div>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}