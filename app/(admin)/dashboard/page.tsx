// import authIsRequired dari lib/auth/middleware
import { authIsRequired } from '@/lib/auth/middleware'

// import getCurrentUser dari lib/auth/session
import { getCurrentUser } from '@/lib/auth/session'

// import Sidebar component
import Sidebar from '@/app/(admin)/sidebar'

// import PageHeader component
import PageHeader from '@/components/common/page-header'

// import Metadata dari next
import { Metadata } from 'next';

// define metadata untuk halaman sign-in
export const metadata: Metadata = {
  title: 'Dashboard - FullStack Next.js',
  description: 'Admin dashboard overview',
};

export default async function DashboardPage() {

    // pastikan user sudah authenticated
    await authIsRequired()

    // ambil user yang sedang login
    const user = await getCurrentUser()
    
    return (
        <div className="bg-zinc-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
            <div className="flex flex-col gap-6 lg:flex-row">
              {/* Sidebar */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <Sidebar />
              </div>

              {/* Main Content */}
              <main className="flex-1 rounded-3xl bg-white p-5 sm:p-8 shadow-sm">
                {/* Page Header */}
                <PageHeader
                  title="Dashboard"
                  subtitle="Overview Admin Masjid"
                />

                <p className="mt-3 text-sm text-green-700">
                  Assalamu'alaikum, <strong>{user?.name}</strong>! Selamat datang di dashboard admin masjid.
                </p>


                {/* Data dummy summary */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="rounded-2xl bg-green-50 p-5 shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">120</span>
                    <span className="text-xs text-green-600 mt-1">Jamaah Terdaftar</span>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-5 shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">Rp 12.500.000</span>
                    <span className="text-xs text-green-600 mt-1">Saldo Keuangan</span>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-5 shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">8</span>
                    <span className="text-xs text-green-600 mt-1">Kegiatan Bulan Ini</span>
                  </div>
                  <div className="rounded-2xl bg-green-50 p-5 shadow flex flex-col items-center">
                    <span className="text-2xl font-bold text-green-700">Rp 3.200.000</span>
                    <span className="text-xs text-green-600 mt-1">Donasi & Zakat Bulan Ini</span>
                  </div>
                </div>

                {/* Kalender Jadwal Kegiatan Bulan Ini (dummy) */}
                <div className="mt-10 bg-white rounded-2xl shadow p-6">
                  <h4 className="text-lg font-bold text-green-700 mb-4">Kalender Kegiatan Bulan Maret 2026</h4>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {/* Header hari */}
                    {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map(hari => (
                      <div key={hari} className="font-bold text-green-700 py-1">{hari}</div>
                    ))}
                    {/* Dummy tanggal: 1 Maret = Minggu, jadi offset 0 */}
                    {[...Array(31)].map((_, i) => {
                      // Jadwal kegiatan dummy
                      const jadwal = [
                        { tgl: 5, nama: 'Kajian Subuh', jam: '05:00', lokasi: 'Ruang Utama' },
                        { tgl: 6, nama: 'Shalat Jumat', jam: '12:00', lokasi: 'Ruang Utama' },
                        { tgl: 7, nama: 'Pengajian Anak', jam: '15:00', lokasi: 'Ruang Belajar' },
                        { tgl: 8, nama: 'Bakti Sosial', jam: '08:00', lokasi: 'Halaman Masjid' },
                      ];
                      const kegiatan = jadwal.find(j => j.tgl === i+1);
                      return (
                        <div key={i} className={`relative min-h-[60px] border rounded-xl bg-green-50 flex flex-col items-center justify-start p-1 ${kegiatan ? 'border-green-600' : 'border-green-200'}`}>
                          <span className="text-xs font-bold text-green-700">{i+1}</span>
                          {kegiatan && (
                            <div className="mt-1 text-[10px] text-green-800 font-semibold">
                              {kegiatan.nama}<br/>
                              <span className="text-green-600">{kegiatan.jam}</span>
                              <div className="text-green-500">{kegiatan.lokasi}</div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-2 text-xs text-green-700">* Jadwal kegiatan ditandai border hijau</div>
                </div>

                {/* Grafik Donasi Bulanan (dummy) */}
                <div className="mt-10 bg-white rounded-2xl shadow p-6">
                  <h4 className="text-lg font-bold text-green-700 mb-4">Grafik Donasi & Zakat Bulanan</h4>
                  <svg viewBox="0 0 320 100" width="100%" height="100" className="mb-2">
                    <polyline
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="4"
                      points="0,80 40,60 80,70 120,40 160,50 200,30 240,60 280,20 320,40"
                    />
                    {/* Bulan label */}
                    <text x="0" y="95" fontSize="10" fill="#888">Jan</text>
                    <text x="40" y="95" fontSize="10" fill="#888">Feb</text>
                    <text x="80" y="95" fontSize="10" fill="#888">Mar</text>
                    <text x="120" y="95" fontSize="10" fill="#888">Apr</text>
                    <text x="160" y="95" fontSize="10" fill="#888">Mei</text>
                    <text x="200" y="95" fontSize="10" fill="#888">Jun</text>
                    <text x="240" y="95" fontSize="10" fill="#888">Jul</text>
                    <text x="280" y="95" fontSize="10" fill="#888">Agu</text>
                    <text x="310" y="95" fontSize="10" fill="#888">Sep</text>
                  </svg>
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Rp 1jt</span>
                    <span>Rp 2jt</span>
                    <span>Rp 3jt</span>
                    <span>Rp 4jt</span>
                  </div>
                </div>

                <div className="mt-10 bg-white rounded-2xl shadow p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Komposisi Keuangan Masjid */}
                    <div>
                      <h4 className="text-lg font-bold text-green-700 mb-4">Komposisi Keuangan Masjid</h4>
                      <div className="flex items-center gap-8">
                        <svg viewBox="0 0 100 100" width="100" height="100">
                          <circle r="40" cx="50" cy="50" fill="#bbf7d0" />
                          <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="#22C55E" />
                          <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" fill="#4ade80" />
                        </svg>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-500" /> Operasional (40%)
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-400" /> Pembangunan (35%)
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-200" /> Sosial (25%)
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Komposisi Donasi & Zakat */}
                    <div>
                      <h4 className="text-lg font-bold text-green-700 mb-4">Komposisi Donasi & Zakat</h4>
                      <div className="flex items-center gap-8">
                        <svg viewBox="0 0 100 100" width="100" height="100">
                          <circle r="40" cx="50" cy="50" fill="#bbf7d0" />
                          <path d="M50,50 L50,10 A40,40 0 0,1 90,50 Z" fill="#22C55E" />
                          <path d="M50,50 L90,50 A40,40 0 0,1 50,90 Z" fill="#4ade80" />
                        </svg>
                        <div className="flex flex-col gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-500" /> Infaq (50%)
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-400" /> Zakat (30%)
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="inline-block w-3 h-3 rounded bg-green-200" /> Sedekah (20%)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
    );
}
