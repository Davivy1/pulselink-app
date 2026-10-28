'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEmergencyStore } from '@/store/useEmergencyStore';
import { 
  ShieldCheck, 
  Zap, 
  Radio, 
  CheckCircle2, 
  QrCode, 
  X, 
  AlertTriangle, 
  ChevronDown, 
  Smartphone, 
  Terminal, 
  LogOut,
  Activity
} from 'lucide-react';

export default function HospitalCommandCenter() {
  const { activeAlert, fulfillment, dispatchAlert, verifyQrCode, resetState } = useEmergencyStore();

  // Local State
  const [bloodType, setBloodType] = useState('O-');
  const [units, setUnits] = useState(2);
  const [urgency, setUrgency] = useState<'CRITICAL' | 'HIGH'>('CRITICAL');
  const [radiusKm, setRadiusKm] = useState(5);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Modal State
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [inputQrToken, setInputQrToken] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  // Map radius selection to dynamic active donor counts for the pitch demo
  const donorCountsByRadius: Record<number, number> = {
    3: 18,
    5: 42,
    10: 114,
  };

  // Form Submit Handler
  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatchAlert({
      hospitalId: 'H101',
      hospitalName: 'Federal Medical Centre Owerri',
      bloodType,
      units,
      urgency,
      radiusKm,
    });
  };

  // QR Verification Handler
  const handleVerifyToken = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');
    const success = verifyQrCode(inputQrToken.trim());
    if (success) {
      setVerificationSuccess(true);
      setTimeout(() => {
        setIsQrModalOpen(false);
        setVerificationSuccess(false);
        setInputQrToken('');
      }, 2000);
    } else {
      setVerificationError('Invalid or expired QR token. Try "PL-8890" or active donor token.');
    }
  };

  return (
    <div className="min-h-screen bg-pulselink-navy text-white flex flex-col">
      {/* Hospital Workspace Dedicated Header */}
      <header className="sticky top-0 z-40 w-full border-b border-pulselink-border bg-pulselink-surface/90 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand & Workspace Identity */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-3 group" title="Return to Landing Page">
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
                    // Fallback to vector icon if image fails to load
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <Activity className="w-4 h-4 text-pulselink-crimson relative z-10 hidden fallback-icon" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-pulselink-crimson transition-colors">
                  Pulse<span className="text-pulselink-crimson">Link</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-pulselink-crimson tracking-wider -mt-1">
                  HOSPITAL COMMAND CENTER
                </span>
              </div>
            </Link>
          </div>

          {/* Portal Switcher & Exit Workspace Action */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-pulselink-navy hover:bg-pulselink-border text-slate-300 hover:text-white border border-pulselink-border text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Switch Portal</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-pulselink-surface border border-pulselink-border p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Jump To Role
                  </div>

                  <Link
                    href="/donor"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-pulselink-navy text-xs font-bold text-white transition-colors"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <Smartphone className="w-4 h-4 text-pulselink-emerald" />
                    <span>Donor Mobile App</span>
                  </Link>

                  <Link
                    href="/dev"
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-pulselink-navy text-xs font-bold text-white transition-colors"
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-pulselink-crimson/15 hover:bg-pulselink-crimson/25 text-pulselink-crimson border border-pulselink-crimson/30 text-xs font-bold transition-all"
              title="Exit Workspace to Home Page"
            >
              <span>Exit Workspace</span>
              <LogOut className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </header>

      {/* Main Workspace Body */}
      <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hospital Identity Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-pulselink-crimson/15 border border-pulselink-crimson/40 text-pulselink-crimson flex items-center justify-center font-black text-xl">
              FMC
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold">Federal Medical Centre Owerri</h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-pulselink-emerald/15 text-pulselink-emerald text-xs font-semibold border border-pulselink-emerald/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Clinic
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Emergency Triage & Blood Dispatch Command Unit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-pulselink-navy border border-pulselink-border text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pulselink-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pulselink-emerald"></span>
              </span>
              <span className="text-slate-300 font-medium">
                {donorCountsByRadius[radiusKm] || 42} Active Donors in {radiusKm}km
              </span>
            </div>

            <button
              onClick={() => setIsQrModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pulselink-emerald hover:bg-emerald-500 font-bold text-slate-950 text-xs shadow-emerald-glow transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>Verify Donor Check-In</span>
            </button>
          </div>
        </div>

        {/* Command Center Grid Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Section A: Emergency Dispatch Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-6">
              <div className="flex items-center justify-between border-b border-pulselink-border pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-pulselink-crimson" />
                  Emergency Dispatch Form
                </h2>
                <span className="text-[11px] font-semibold text-slate-400">Step 1 of 2</span>
              </div>

              <form onSubmit={handleDispatch} className="space-y-5">
                {/* Target Blood Group Dropdown */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Target Blood Group Needed</label>
                  <select
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-pulselink-navy border border-pulselink-border text-white text-sm focus:border-pulselink-crimson focus:outline-none transition-colors"
                  >
                    <option value="O-">O Negative (Universal Donor)</option>
                    <option value="O+">O Positive</option>
                    <option value="A-">A Negative</option>
                    <option value="A+">A Positive</option>
                    <option value="B-">B Negative</option>
                    <option value="B+">B Positive</option>
                    <option value="AB-">AB Negative</option>
                    <option value="AB+">AB Positive</option>
                  </select>
                </div>

                {/* Units Required & Geofence Radius */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">Units Needed</label>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-pulselink-navy border border-pulselink-border text-white text-sm focus:border-pulselink-crimson focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-300">Geofence Radius</label>
                    <select
                      value={radiusKm}
                      onChange={(e) => setRadiusKm(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl bg-pulselink-navy border border-pulselink-border text-white text-sm focus:border-pulselink-crimson focus:outline-none transition-colors"
                    >
                      <option value={3}>3 km (Immediate)</option>
                      <option value={5}>5 km (Campus Core)</option>
                      <option value={10}>10 km (Metropolitan)</option>
                    </select>
                  </div>
                </div>

                {/* Urgency Level Options */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">Urgency Level</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setUrgency('CRITICAL')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        urgency === 'CRITICAL'
                          ? 'bg-pulselink-crimson/20 border-pulselink-crimson text-white shadow-pulse-glow'
                          : 'bg-pulselink-navy border-pulselink-border text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-pulselink-crimson">⚡ CRITICAL</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Trauma / Surgery</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setUrgency('HIGH')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        urgency === 'HIGH'
                          ? 'bg-pulselink-amber/20 border-pulselink-amber text-white'
                          : 'bg-pulselink-navy border-pulselink-border text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-pulselink-amber">🔴 HIGH</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">Scheduled Bank</div>
                    </button>
                  </div>
                </div>

                {/* Broadcast Emergency Alert CTA */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-pulselink-crimson hover:bg-pulselink-crimson-hover font-bold text-white text-sm shadow-pulse-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>BROADCAST EMERGENCY ALERT</span>
                </button>
              </form>
            </div>
          </div>

          {/* Section B: Live Radar Scan View & Telemetry Status */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-2xl bg-pulselink-surface border border-pulselink-border space-y-6 flex flex-col justify-between min-h-115">
              <div className="flex items-center justify-between border-b border-pulselink-border pb-4">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Radio className="w-5 h-5 text-pulselink-cyan" />
                  Live Geofence Radar View ({radiusKm} km)
                </h2>
                {activeAlert && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pulselink-crimson/20 border border-pulselink-crimson/40 text-pulselink-crimson text-xs font-bold animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-pulselink-crimson"></span>
                    DISPATCH ACTIVE ({activeAlert.status})
                  </span>
                )}
              </div>

              {/* Radar Visualization Container */}
              <div className="relative w-full h-64 rounded-2xl bg-pulselink-navy/80 border border-pulselink-border/80 overflow-hidden flex items-center justify-center">
                {/* Radar Grid Rings */}
                <div className="absolute w-56 h-56 rounded-full border border-pulselink-border/50" />
                <div className="absolute w-40 h-40 rounded-full border border-pulselink-border/70" />
                <div className="absolute w-24 h-24 rounded-full border border-pulselink-cyan/30" />

                {/* Animated Pulsing Radar Ring */}
                <div className="absolute w-48 h-48 rounded-full border border-pulselink-crimson/40 animate-ping opacity-30" />

                {/* Center Hospital Beacon */}
                <div className="relative z-10 w-6 h-6 rounded-full bg-pulselink-crimson shadow-pulse-glow flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                </div>

                {/* Simulated Available Donor Dots */}
                <div className="absolute top-16 left-24 w-3 h-3 rounded-full bg-pulselink-emerald shadow-emerald-glow animate-pulse" title="Donor 1 (O-)" />
                <div className="absolute bottom-16 right-28 w-3 h-3 rounded-full bg-pulselink-emerald shadow-emerald-glow animate-pulse" title="Donor 2 (O-)" />
                <div className="absolute top-20 right-20 w-2.5 h-2.5 rounded-full bg-pulselink-cyan/80" title="Donor 3 (A+)" />
                <div className="absolute bottom-20 left-20 w-2.5 h-2.5 rounded-full bg-pulselink-cyan/80" title="Donor 4 (B+)" />

                {/* Radar Telemetry Tag */}
                <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-pulselink-surface/90 border border-pulselink-border text-[11px] text-slate-300 font-medium">
                  Scan Mode: <span className="text-pulselink-cyan font-bold">{radiusKm} km Radius ({donorCountsByRadius[radiusKm] || 42} Donors)</span>
                </div>
              </div>

              {/* Live Dispatch Telemetry Panel */}
              <div className="p-4 rounded-xl bg-pulselink-navy border border-pulselink-border space-y-3">
                {activeAlert ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-pulselink-crimson uppercase tracking-wider">Active Emergency Dispatch</span>
                      <span className="text-xs text-slate-400">{activeAlert.alertId}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="p-2 rounded-lg bg-pulselink-surface border border-pulselink-border">
                        <span className="block text-[10px] text-slate-400">Target Type</span>
                        <span className="text-sm font-extrabold text-pulselink-crimson">{activeAlert.bloodType}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-pulselink-surface border border-pulselink-border">
                        <span className="block text-[10px] text-slate-400">Units Needed</span>
                        <span className="text-sm font-extrabold text-white">{activeAlert.units} Units</span>
                      </div>
                      <div className="p-2 rounded-lg bg-pulselink-surface border border-pulselink-border">
                        <span className="block text-[10px] text-slate-400">Status</span>
                        <span className={`text-xs font-bold ${activeAlert.status === 'ACCEPTED' ? 'text-pulselink-emerald' : activeAlert.status === 'FULFILLED' ? 'text-pulselink-cyan' : 'text-pulselink-amber'}`}>
                          {activeAlert.status}
                        </span>
                      </div>
                    </div>

                    {fulfillment && (
                      <div className="pt-2 flex items-center justify-between text-xs text-pulselink-emerald border-t border-pulselink-border/60">
                        <span className="font-semibold">Donor Assigned: {fulfillment.donorName}</span>
                        <span className="font-bold">ETA: {fulfillment.donorEta}</span>
                      </div>
                    )}

                    <button
                      onClick={resetState}
                      className="w-full mt-2 py-2 rounded-lg bg-red-950/40 text-red-400 text-xs font-semibold hover:bg-red-900/50 border border-red-800/40 transition-colors cursor-pointer"
                    >
                      Clear Active Dispatch
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-2 text-slate-400 text-xs">
                    No active emergency broadcast. Fill in dispatch parameters above and click <span className="text-pulselink-crimson font-bold">"Broadcast Emergency Alert"</span>.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* QR Code Verification Modal */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl bg-pulselink-surface border border-pulselink-border p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-xl bg-pulselink-emerald/15 text-pulselink-emerald mx-auto flex items-center justify-center">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Hospital Check-In Verification</h3>
              <p className="text-xs text-slate-400">
                Enter or scan the donor's 4-digit check-in token (`PL-8890` or active token) to verify arrival.
              </p>
            </div>

            {verificationSuccess ? (
              <div className="p-4 rounded-xl bg-pulselink-emerald/15 border border-pulselink-emerald text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-pulselink-emerald mx-auto" />
                <div className="text-sm font-bold text-pulselink-emerald">Arrival Verified Successfully!</div>
                <div className="text-xs text-slate-300">Status set to FULFILLED. 100 points awarded to donor.</div>
              </div>
            ) : (
              <form onSubmit={handleVerifyToken} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Check-In Token / QR Code</label>
                  <input
                    type="text"
                    placeholder="e.g. PL-8890"
                    value={inputQrToken}
                    onChange={(e) => setInputQrToken(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-pulselink-navy border border-pulselink-border text-white text-sm focus:border-pulselink-emerald focus:outline-none uppercase tracking-wider"
                    required
                  />
                </div>

                {verificationError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-300 text-xs">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{verificationError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-pulselink-emerald hover:bg-emerald-500 font-bold text-slate-950 text-sm shadow-emerald-glow transition-all cursor-pointer"
                >
                  Confirm Arrival Verification
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}