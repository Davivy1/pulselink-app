'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Trophy, 
  ChevronDown, 
  Building2, 
  Terminal, 
  LogOut, 
  Sun, 
  Moon, 
  Zap,
  Award,
  Calendar,
  Activity,
  Heart,
  Flame
} from 'lucide-react';

export default function CampusImpactView() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Mock Leaderboard Data (PRD Section 7)
  const leaderboardData = [
    { rank: 1, dept: 'Engineering', units: 142, points: '1,420 pts', badge: '🥇 1st Place' },
    { rank: 2, dept: 'Medical Sciences', units: 128, points: '1,280 pts', badge: '🥈 2nd Place' },
    { rank: 3, dept: 'Computer Science', units: 94, points: '940 pts', badge: '🥉 Your Dept', isUser: true },
    { rank: 4, dept: 'Biological Sciences', units: 76, points: '760 pts', badge: '' },
    { rank: 5, dept: 'Project Management Technology', units: 58, points: '580 pts', badge: '' },
  ];

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
              <span className="text-[10px] font-mono font-bold text-pulselink-amber tracking-wider -mt-1">
                CAMPUS IMPACT & LEADERBOARD
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

          {/* Inner Mobile App Content Wrapper */}
          <div className="grow flex flex-col overflow-hidden relative">

            {/* Mobile Navigation Tabs */}
            <div className={`flex border-b px-4 pt-3 gap-4 text-xs font-bold shrink-0 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200'}`}>
              <Link 
                href="/donor" 
                className={`pb-2.5 border-b-2 border-transparent hover:border-slate-400 flex items-center gap-1.5 transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                <Zap className="w-3.5 h-3.5 text-pulselink-crimson" />
                <span>Dispatches</span>
              </Link>

              <button 
                className="pb-2.5 border-b-2 border-pulselink-amber text-pulselink-amber flex items-center gap-1.5 cursor-pointer font-bold"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Campus Impact</span>
              </button>
            </div>

            {/* Scrollable Mobile Body */}
            <div className="p-4 space-y-4 grow overflow-y-auto">
              
              {/* Personal Impact Wallet Card (PRD Section 7) */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pulselink-crimson" />
                    <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Personal Impact Wallet</span>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pulselink-emerald/15 text-pulselink-emerald text-[10px] font-bold">
                    <ShieldCheck className="w-3 h-3" />
                    Tier 2 
                  </span>
                </div>

                {/* Stats Counters */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="block text-xl font-extrabold text-pulselink-crimson">4 Units</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Total Donated</span>
                  </div>

                  <div className={`p-3 rounded-xl border text-center ${isDarkMode ? 'bg-pulselink-navy border-pulselink-border' : 'bg-slate-100 border-slate-200'}`}>
                    <span className="block text-xl font-extrabold text-pulselink-amber">350 pts</span>
                    <span className="text-[10px] text-slate-400 font-semibold">Impact Score</span>
                  </div>
                </div>

                {/* Donation Countdown */}
                <div className="pt-2 border-t border-pulselink-border/50 flex items-center justify-between text-xs">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-pulselink-cyan" />
                    Next Eligible Date
                  </span>
                  <span className="font-bold text-pulselink-emerald">Eligible in 42 Days</span>
                </div>
              </div>

              {/* Department Leaderboard Table (PRD Section 7) */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 text-pulselink-amber" />
                    <h3 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>FUTO Campus Leaderboard</h3>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400">Semester 1</span>
                </div>

                {/* Leaderboard List */}
                <div className="space-y-2 pt-1">
                  {leaderboardData.map((item) => (
                    <div
                      key={item.rank}
                      className={`flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all ${
                        item.isUser
                          ? 'bg-pulselink-amber/15 border-pulselink-amber text-white shadow-pulse-glow'
                          : isDarkMode
                          ? 'bg-pulselink-navy border-pulselink-border/80 text-slate-300'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-extrabold text-[11px] ${
                          item.rank === 1 ? 'bg-amber-400 text-slate-950' :
                          item.rank === 2 ? 'bg-slate-300 text-slate-950' :
                          item.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {item.rank}
                        </span>
                        <div>
                          <div className="font-bold">{item.dept}</div>
                          <div className="text-[10px] text-slate-400">{item.units} Units Donated</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono font-extrabold text-pulselink-amber">{item.points}</span>
                        {item.badge && (
                          <div className="text-[9px] font-bold text-pulselink-emerald mt-0.5">{item.badge}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlocked Badges Summary */}
              <div className={`p-4 rounded-2xl border space-y-2 ${isDarkMode ? 'bg-pulselink-surface border-pulselink-border' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-pulselink-emerald" />
                  <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Unlocked Badges</span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-pulselink-emerald/15 text-pulselink-emerald text-[11px] font-bold border border-pulselink-emerald/30">
                    🛡️ Tier 2 
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-pulselink-amber/15 text-pulselink-amber text-[11px] font-bold border border-pulselink-amber/30">
                    🩸 O- Universal Donor
                  </span>
                </div>
              </div>

            </div>

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