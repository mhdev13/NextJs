"use client";

// import Link component from next/link
import Link from "next/link";

// import usePathname
import { usePathname } from "next/navigation";

// import icon dari lucide-react
import { LayoutDashboard, Users, LogOut, CalendarDays, HeartHandshake, FileText } from "lucide-react";

// import action logoutAction
import { logoutAction } from "@/app/actions/auth/sign-in";

export default function Sidebar() {

    // hooks get pathname
    const pathname = usePathname();

    // helper untuk cek menu aktif
    const active = (href: string) =>
        pathname === href || pathname.startsWith(href + "/");

    // helper class menu
    const itemClass = (isActive: boolean) =>
        `flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
            isActive
                ? "bg-green-600 text-white shadow"
                : "text-green-700 hover:bg-green-50"
        }`;

    // logout handler
    const handleLogout = async () => {
        await logoutAction();
    };

    return (
        <aside className="w-full md:w-64 shrink-0 rounded-3xl bg-white p-4 shadow-lg border border-green-100">
            <div className="flex h-full flex-col">
                {/* Brand */}
                <div className="mb-3 flex items-center gap-3 px-2 border-b border-green-200 pb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-xs font-extrabold text-white shadow-lg">
                        <span className="text-lg">🕌</span>
                    </div>
                    <span className="text-base font-extrabold text-green-700">
                        Masjidku Admin
                    </span>
                </div>

                {/* Menu */}
                <nav className="flex flex-1 flex-col gap-1">
                    <Link
                        href="/dashboard"
                        className={itemClass(active("/dashboard"))}
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/jamaah"
                        className={itemClass(active("/jamaah"))}
                    >
                        <Users className="h-4 w-4" />
                        Data Jamaah
                    </Link>
                    <Link
                        href="/keuangan"
                        className={itemClass(active("/keuangan"))}
                    >
                        <FileText className="h-4 w-4" />
                        Keuangan Masjid
                    </Link>
                    <Link
                        href="/jadwal"
                        className={itemClass(active("/jadwal"))}
                    >
                        <CalendarDays className="h-4 w-4" />
                        Jadwal Kegiatan
                    </Link>
                    <Link
                        href="/donasi-zakat"
                        className={itemClass(active("/donasi-zakat"))}
                    >
                        <HeartHandshake className="h-4 w-4" />
                        Donasi & Zakat
                    </Link>
                    <Link
                        href="/laporan"
                        className={itemClass(active("/laporan"))}
                    >
                        <FileText className="h-4 w-4" />
                        Laporan Masjid
                    </Link>
                </nav>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                >
                    <LogOut className="h-4 w-4" />
                    Keluar
                </button>
            </div>
        </aside>
    );
}
