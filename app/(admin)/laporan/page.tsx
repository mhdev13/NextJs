"use client";
import Sidebar from '@/app/(admin)/sidebar';
import PageHeader from '@/components/common/page-header';
import { useState } from 'react';

export default function LaporanMasjidPage() {
  // Dummy data laporan
  const [laporan, setLaporan] = useState([
    { id: 1, tanggal: '2026-03-01', judul: 'Laporan Keuangan Februari', kategori: 'Keuangan', ringkasan: 'Saldo akhir Rp 5.000.000', file: 'laporan-keuangan-feb.pdf' },
    { id: 2, tanggal: '2026-03-02', judul: 'Laporan Kegiatan Maulid', kategori: 'Kegiatan', ringkasan: 'Acara berjalan lancar, peserta 200 orang', file: 'laporan-maulid.pdf' },
    { id: 3, tanggal: '2026-03-03', judul: 'Laporan Donasi & Zakat', kategori: 'Donasi & Zakat', ringkasan: 'Total donasi Rp 2.000.000, zakat Rp 1.700.000', file: 'laporan-donasi-zakat.pdf' },
  ]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState<{mode: 'add'|'edit', data?: any}|null>(null);

  // Filtered data
  const filteredLaporan = laporan.filter(l => l.judul.toLowerCase().includes(filter.toLowerCase()) || l.kategori.toLowerCase().includes(filter.toLowerCase()));

  // Handle add
  const handleAdd = (data: any) => {
    setLaporan([...laporan, { ...data, id: Date.now() }]);
    setModal(null);
  };
  // Handle edit
  const handleEdit = (data: any) => {
    setLaporan(laporan.map(l => l.id === data.id ? data : l));
    setModal(null);
  };
  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm('Yakin hapus laporan?')) setLaporan(laporan.filter(l => l.id !== id));
  };

  return (
    <div className="bg-zinc-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Sidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 rounded-3xl bg-white p-5 sm:p-8 shadow-sm">
            <PageHeader title="Laporan Masjid" subtitle="Rekap laporan keuangan, kegiatan, dan donasi masjid" />
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Cari judul/kategori..."
                className="rounded-xl border border-green-200 px-4 py-2 text-sm focus:ring-green-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <button
                className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-700"
                onClick={() => setModal({mode:'add'})}
              >Tambah Laporan</button>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Judul</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Kategori</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Ringkasan</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">File</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLaporan.map(l => (
                    <tr key={l.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 text-sm text-green-900 font-semibold">{l.tanggal}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{l.judul}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{l.kategori}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{l.ringkasan}</td>
                      <td className="px-4 py-2 text-sm text-green-700">
                        <a href={"/files/"+l.file} target="_blank" rel="noopener" className="underline text-green-600">{l.file}</a>
                      </td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        <button className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold" onClick={()=>setModal({mode:'edit',data:l})}>Edit</button>
                        <button className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold" onClick={()=>handleDelete(l.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredLaporan.length === 0 && (
                <div className="text-center text-green-700 py-6">Tidak ada laporan ditemukan.</div>
              )}
            </div>

            {/* Modal Form Tambah/Edit Laporan */}
            {modal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">{modal.mode === 'add' ? 'Tambah Laporan' : 'Edit Laporan'}</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = {
                      id: modal.data?.id,
                      tanggal: form.tanggal.value,
                      judul: form.judul.value,
                      kategori: form.kategori.value,
                      ringkasan: form.ringkasan.value,
                      file: form.file.value,
                    };
                    modal.mode === 'add' ? handleAdd(data) : handleEdit(data);
                  }}>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Tanggal</label>
                      <input name="tanggal" type="date" defaultValue={modal.data?.tanggal||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Judul</label>
                      <input name="judul" defaultValue={modal.data?.judul||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Kategori</label>
                      <select name="kategori" defaultValue={modal.data?.kategori||'Keuangan'} required className="w-full rounded-xl border border-green-200 px-3 py-2">
                        <option value="Keuangan">Keuangan</option>
                        <option value="Kegiatan">Kegiatan</option>
                        <option value="Donasi & Zakat">Donasi & Zakat</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Ringkasan</label>
                      <input name="ringkasan" defaultValue={modal.data?.ringkasan||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">File</label>
                      <input name="file" defaultValue={modal.data?.file||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="flex gap-2 justify-end mt-4">
                      <button type="button" className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 font-bold" onClick={()=>setModal(null)}>Batal</button>
                      <button type="submit" className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold">{modal.mode === 'add' ? 'Tambah' : 'Simpan'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
