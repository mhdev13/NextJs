"use client";

// import Link component from next/link
import Link from "next/link";

// import icon dari lucide-react
import { Landmark, Users, CalendarDays, HeartHandshake, FileText } from 'lucide-react';

export default function Navbar() {

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <nav className="border-b border-green-200/70 bg-white/80 backdrop-blur">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Brand & Menu */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="group inline-flex items-center gap-2">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-xs font-bold text-white shadow-sm">
                                <Landmark className="h-5 w-5 text-white transition group-hover:scale-110" />
                            </span>
                            <span className="text-base font-extrabold tracking-wide text-green-700">
                                Masjidku App
                            </span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}
