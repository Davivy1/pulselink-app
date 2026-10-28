{/*'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEmergencyStore } from '@/store/useEmergencyStore';

export function DemoRoleSwitcher() {
  const pathname = usePathname();
  const { activeAlert, resetState } = useEmergencyStore();

  const navLinks = [
    { name: 'Landing Page', href: '/' },
    { name: 'Hospital Portal', href: '/hospital' },
    { name: 'Donor App', href: '/donor' },
    { name: 'Campus Impact', href: '/donor/impact' },
    { name: 'Tracking View', href: '/tracking/PL-8942' },
    { name: 'Dev Telemetry', href: '/dev' },
  ];

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-pulselink-border bg-pulselink-navy px-4 py-2 text-xs">
      <div className="flex items-center gap-3">
        <span className="font-extrabold uppercase tracking-wider text-pulselink-crimson">
          PulseLink Pitch Demo
        </span>
        {activeAlert && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-pulselink-crimson/15 px-2.5 py-0.5 text-[10px] font-bold text-pulselink-crimson border border-pulselink-crimson/30 animate-pulse">
            <span className="h-1.5 w-1.5 rounded-full bg-pulselink-crimson"></span>
            ACTIVE DISPATCH ({activeAlert.bloodType})
          </span>
        )}
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                isActive
                  ? 'bg-pulselink-surface font-bold text-white border border-pulselink-border'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          );
        })}

        <button
          onClick={resetState}
          className="ml-2 rounded-lg bg-red-950/40 px-2.5 py-1 text-[11px] font-semibold text-red-400 hover:bg-red-900/60 border border-red-800/40"
          title="Reset active dispatch state"
        >
          Reset Demo
        </button>
      </nav>
    </header>
  );
} */}