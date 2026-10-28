'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Building2, Smartphone, Terminal, Menu, X, Activity } from 'lucide-react';

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-pulselink-border/80 bg-pulselink-navy/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo with Red Pulse Glow */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-pulselink-surface border border-pulselink-crimson/30 shadow-pulse-glow transition-all group-hover:border-pulselink-crimson">
            <span className="absolute inset-0 rounded-xl bg-pulselink-crimson/20 animate-pulse pointer-events-none" />
            <Image
              src="/assets/pulselink-favico.png"
              alt="PulseLink Logo"
              width={26}
              height={26}
              className="object-contain relative z-10"
              priority      
              onError={(e) => {
                // Fallback to vector icon if PNG is missing
                e.currentTarget.style.display = 'none';
              }}
            />
            <Activity className="w-5 h-5 text-pulselink-crimson relative z-10 hidden fallback-icon" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-pulselink-crimson transition-colors">
            Pulse<span className="text-pulselink-crimson">Link</span>
          </span>
        </a>

        {/* Desktop Single-Page Scroll Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#hero" className="hover:text-white transition-colors">Home</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#impact" className="hover:text-white transition-colors">Campus Impact</a>
        </nav>

        {/* Launch App Portals Dropdown */}
        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pulselink-crimson hover:bg-pulselink-crimson-hover text-white text-xs font-bold shadow-pulse-glow transition-all cursor-pointer"
            >
              <span>Launch App Portals</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-pulselink-surface border border-pulselink-border p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Select User Experience
                </div>

                <Link
                  href="/hospital"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-pulselink-navy transition-colors group"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Building2 className="w-5 h-5 text-pulselink-crimson mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-pulselink-crimson">Hospital Command Center</div>
                    <div className="text-[11px] text-slate-400">Emergency dispatch & radar tracking</div>
                  </div>
                </Link>

                <Link
                  href="/donor"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-pulselink-navy transition-colors group"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Smartphone className="w-5 h-5 text-pulselink-emerald mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-pulselink-emerald">Donor Mobile App</div>
                    <div className="text-[11px] text-slate-400">Geofenced alerts & QR navigation</div>
                  </div>
                </Link>

                <Link
                  href="/dev"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-pulselink-navy transition-colors group"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Terminal className="w-5 h-5 text-pulselink-cyan mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white group-hover:text-pulselink-cyan">System Telemetry</div>
                    <div className="text-[11px] text-slate-400">Platform health & ID queue</div>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-pulselink-border bg-pulselink-surface px-4 py-4 space-y-3">
          <a href="#hero" className="block text-sm text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#how-it-works" className="block text-sm text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="#about" className="block text-sm text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#impact" className="block text-sm text-slate-200 py-1" onClick={() => setMobileMenuOpen(false)}>Campus Impact</a>

          <div className="pt-3 border-t border-pulselink-border space-y-2">
            <Link
              href="/hospital"
              className="block w-full py-2.5 text-center text-xs font-bold bg-pulselink-crimson text-white rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hospital Portal
            </Link>
            <Link
              href="/donor"
              className="block w-full py-2.5 text-center text-xs font-bold bg-pulselink-navy border border-pulselink-border text-white rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              Donor Mobile App
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}