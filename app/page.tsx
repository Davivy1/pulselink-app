'use client';

import Link from 'next/link';
import { Navbar } from '@/components/landing/Navbar';
import { ArrowRight, Building2, Smartphone, ShieldCheck, Activity, Trophy, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-pulselink-navy text-white flex flex-col">
      <Navbar />

      <main className="grow">
        {/* Section 1: Hero */}
        <section id="hero" className="relative overflow-hidden px-6 pt-16 pb-20 text-center lg:pt-24 lg:pb-28">
          {/* Radial crimson pulse blur */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-pulselink-crimson/15 rounded-full blur-[130px] pointer-events-none" />

          <div className="relative max-w-4xl mx-auto space-y-6">
            {/*<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pulselink-surface border border-pulselink-border text-xs text-pulselink-cyan font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-pulselink-emerald" />
              Geofenced Emergency Health Infrastructure
            </div>*/}

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              Geofenced Emergency <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-pulselink-crimson via-red-400 to-pulselink-amber">
                Blood Response Network
              </span>
            </h1>

            <p className="max-w-2xl mx-auto text-slate-400 text-base sm:text-lg leading-relaxed">
              Connecting hospital emergency rooms directly to verified campus donors within minutes. 
              Eliminating critical shortage gaps through real-time geofenced broadcasts and gamified health wallets.
            </p>

            {/* Role Launch CTAs */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/hospital"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-pulselink-crimson hover:bg-pulselink-crimson-hover font-bold text-white shadow-pulse-glow transition-all"
              >
                <Building2 className="w-4 h-4" />
                <span>Hospital Command Center</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/donor"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-pulselink-surface hover:bg-pulselink-border font-bold text-white border border-pulselink-border transition-all"
              >
                <Smartphone className="w-4 h-4 text-pulselink-emerald" />
                <span>Donor Mobile App</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Network Stats Bar */}
        <section className="border-y border-pulselink-border bg-pulselink-surface/50 py-12 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-xl bg-pulselink-navy/60 border border-pulselink-border">
              <span className="block text-3xl font-extrabold text-white">1,240+</span>
              <span className="text-xs text-slate-400 font-medium">Verified Campus Donors</span>
            </div>
            <div className="p-4 rounded-xl bg-pulselink-navy/60 border border-pulselink-border">
              <span className="block text-3xl font-extrabold text-pulselink-emerald">11.4 min</span>
              <span className="text-xs text-slate-400 font-medium">Avg Response Time</span>
            </div>
            <div className="p-4 rounded-xl bg-pulselink-navy/60 border border-pulselink-border">
              <span className="block text-3xl font-extrabold text-pulselink-crimson">5 km</span>
              <span className="text-xs text-slate-400 font-medium">Active Geofence Radius</span>
            </div>
            <div className="p-4 rounded-xl bg-pulselink-navy/60 border border-pulselink-border">
              <span className="block text-3xl font-extrabold text-pulselink-amber">100%</span>
              <span className="text-xs text-slate-400 font-medium">Verified Clinic Check-ins</span>
            </div>
          </div>
        </section>

        {/* Section 3: How It Works */}
        <section id="how-it-works" className="max-w-5xl mx-auto py-20 px-6 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">How PulseLink Works</h2>
            <p className="text-sm text-slate-400">Zero latency emergency dispatch pipeline.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pulselink-crimson/15 text-pulselink-crimson flex items-center justify-center font-extrabold">
                1
              </div>
              <h3 className="font-bold text-lg">Hospital Dispatch</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Medical staff specify blood group, units, and urgency level to initiate a 5 km geofenced donor scan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pulselink-amber/15 text-pulselink-amber flex items-center justify-center font-extrabold">
                2
              </div>
              <h3 className="font-bold text-lg">Geofenced Alert</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nearby verified donors receive high-priority crimson alerts with distance and 3-minute acceptance timers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pulselink-emerald/15 text-pulselink-emerald flex items-center justify-center font-extrabold">
                3
              </div>
              <h3 className="font-bold text-lg">Fast-Track Check-In</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Donors navigate to the hospital and present a dynamic QR code token for instant arrival verification.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: About Section */}
        <section id="about" className="py-20 px-6 border-t border-pulselink-border bg-pulselink-surface/30">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold">About PulseLink</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm leading-relaxed">
                PulseLink eliminates critical blood bank delays during trauma and surgical emergencies by bridging hospital triage units directly with nearby eligible campus donors.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-3">
                <Activity className="w-8 h-8 text-pulselink-crimson" />
                <h3 className="font-bold text-lg">Zero-Latency Emergency Alerts</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When seconds dictate trauma outcomes, geofenced broadcasts notify verified donors within a 5 km radius instantly.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-3">
                <ShieldCheck className="w-8 h-8 text-pulselink-emerald" />
                <h3 className="font-bold text-lg">Verified Arrival Check-Ins</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Dynamic QR codes and OTP check-in tokens guarantee secure donor verification and instant status updates for medical staff.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Campus Impact Preview */}
        <section id="impact" className="py-20 px-6 border-t border-pulselink-border">
          <div className="max-w-5xl mx-auto space-y-10">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pulselink-surface border border-pulselink-border text-xs text-pulselink-amber font-semibold">
                <Trophy className="w-3.5 h-3.5" />
                Campus Micro-Community Retention
              </div>
              <h2 className="text-3xl font-extrabold">Campus Impact Leaderboard</h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                Engaging university departments through friendly competition, life-saved points, and health wallet badges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-2 text-center">
                <span className="text-2xl font-extrabold text-pulselink-amber">1st Place</span>
                <h3 className="font-bold text-lg">Engineering Dept</h3>
                <p className="text-xs text-pulselink-emerald font-semibold">142 Units Donated</p>
              </div>

              <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-2 text-center">
                <span className="text-2xl font-extrabold text-slate-300">2nd Place</span>
                <h3 className="font-bold text-lg">Medical Sciences</h3>
                <p className="text-xs text-pulselink-emerald font-semibold">128 Units Donated</p>
              </div>

              <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-2 text-center">
                <span className="text-2xl font-extrabold text-amber-600">3rd Place</span>
                <h3 className="font-bold text-lg">Biological Sciences</h3>
                <p className="text-xs text-pulselink-emerald font-semibold">94 Units Donated</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-pulselink-border bg-pulselink-surface/30 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} PulseLink. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-slate-300 transition-colors">Home</a>
            <a href="#how-it-works" className="hover:text-slate-300 transition-colors">How It Works</a>
            <a href="#about" className="hover:text-slate-300 transition-colors">About</a>
            <a href="#impact" className="hover:text-slate-300 transition-colors">Campus Impact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}