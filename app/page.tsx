// import Link dari next/link
import Link from "next/link";

const features = [
  {
    title: "Data Jamaah",
    icon: <img src="/globe.svg" alt="Jamaah" className="w-8 h-8" />,
  },
  {
    title: "Keuangan Masjid",
    icon: <img src="/file.svg" alt="Keuangan" className="w-8 h-8" />,
  },
  {
    title: "Jadwal Kegiatan",
    icon: <img src="/window.svg" alt="Jadwal" className="w-8 h-8" />,
  },
  {
    title: "Donasi & Zakat",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#FBBF24"/>
        <path d="M16 22c-3-2-6-4-6-7a6 6 0 0 1 12 0c0 3-3 5-6 7z" fill="#fff"/>
        <path d="M16 14a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" fill="#FBBF24"/>
      </svg>
    ),
  },
  {
    title: "Laporan Masjid",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="16" fill="#6366F1"/>
        <rect x="10" y="12" width="12" height="8" rx="2" fill="#fff"/>
        <path d="M14 16h4" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 20h8" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 font-sans overflow-x-hidden">
      {/* background accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-300/40 blur-3xl animate-pulse" />
        <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-blue-300/40 blur-3xl animate-pulse" />
      </div>

      <div className="relative flex pt-20 items-center justify-center px-6">
        <div className="w-full max-w-4xl">
          <div className="rounded-3xl bg-white p-8 shadow-2xl backdrop-blur-md sm:p-12 border border-indigo-100">
            {/* Branding Manajemen Masjid */}
            <div className="mb-8 flex flex-col items-center justify-center">
              <span className="inline-block h-4 w-4 rounded-full bg-green-500 animate-pulse mb-2" />
              <span className="text-2xl font-extrabold text-green-700 tracking-wide">Masjidku App</span>
              <span className="mt-2 rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">Aplikasi Manajemen Masjid Modern</span>
            </div>

            {/* heading */}
            <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 text-center mb-4">
              Mudahkan Pengelolaan & Transparansi Masjid
            </h1>

            {/* description */}
            <p className="mt-2 text-lg leading-relaxed text-zinc-700 text-center max-w-2xl mx-auto">
              Kelola data jamaah, keuangan, jadwal kegiatan, donasi & zakat, serta laporan masjid secara digital, transparan, dan efisien. Didesain untuk kemudahan pengurus dan kenyamanan jamaah.
            </p>

            {/* actions */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row justify-center">
              <Link
                href="/sign-up"
                className="inline-flex items-center justify-center rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/20"
              >
                Coba Gratis
              </Link>

              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center rounded-full border border-green-200 bg-white px-8 py-4 text-lg font-bold text-green-700 transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500/10"
              >
                Login
              </Link>
            </div>

            {/* fitur utama manajemen masjid sebagai card */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-xl bg-green-50 p-6 shadow-md hover:scale-105 transition">
                  <div className="mb-3">{f.icon}</div>
                  <span className="text-sm font-semibold text-green-700 text-center">{f.title}</span>
                </div>
              ))}
            </div>

            {/* testimonial section */}
            <div className="mt-16 max-w-2xl mx-auto">
              <div className="rounded-2xl bg-white shadow-lg p-6 border border-green-100">
                <p className="text-lg text-zinc-700 italic mb-4">“Masjidku App sangat membantu pengurus dalam mengelola keuangan dan kegiatan masjid. Laporan jadi transparan dan mudah diakses jamaah.”</p>
                <div className="flex items-center gap-3">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Pengurus" className="w-10 h-10 rounded-full" />
                  <div>
                    <span className="font-bold text-green-700">Ustadz Ahmad</span>
                    <span className="block text-xs text-zinc-500">Pengurus Masjid Al-Falah</span>
                  </div>
                </div>
              </div>
            </div>

            {/* footer hint */}
            <div className="mt-12 flex flex-wrap items-center gap-2 text-xs text-zinc-500 justify-center">
              <span className="rounded-full bg-green-50 px-3 py-1">Dukungan Pengurus</span>
              <span className="rounded-full bg-green-50 px-3 py-1">Akses Jamaah</span>
              <span className="rounded-full bg-green-50 px-3 py-1">Mobile Friendly</span>
              <span className="ml-auto hidden sm:inline">
                © {new Date().getFullYear()} Masjidku App
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
