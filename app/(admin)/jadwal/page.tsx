"use client";
import Sidebar from '@/app/(admin)/sidebar';
import PageHeader from '@/components/common/page-header';
import { useState } from 'react';

export default function JadwalPage() {
  // Dummy data jadwal kegiatan
  const [jadwal, setJadwal] = useState([
    { id: 1, tanggal: '2026-03-05', nama: 'Kajian Subuh', pemateri: 'Ustadz Ahmad', lokasi: 'Ruang Utama', jam: '05:00', aktif: true },
    { id: 2, tanggal: '2026-03-06', nama: 'Shalat Jumat', pemateri: 'Imam Masjid', lokasi: 'Ruang Utama', jam: '12:00', aktif: true },
    { id: 3, tanggal: '2026-03-07', nama: 'Pengajian Anak', pemateri: 'Ustadzah Siti', lokasi: 'Ruang Belajar', jam: '15:00', aktif: false },
    { id: 4, tanggal: '2026-03-08', nama: 'Bakti Sosial', pemateri: '-', lokasi: 'Halaman Masjid', jam: '08:00', aktif: true },
  ]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState<{mode: 'add'|'edit', data?: any}|null>(null);

  // Filtered data
  const filteredJadwal = jadwal.filter(j => j.nama.toLowerCase().includes(filter.toLowerCase()));

  // Handle add
  const handleAdd = (data: any) => {
    setJadwal([...jadwal, { ...data, id: Date.now() }]);
    setModal(null);
  };
  // Handle edit
  const handleEdit = (data: any) => {
    setJadwal(jadwal.map(j => j.id === data.id ? data : j));
    setModal(null);
  };
  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm('Yakin hapus jadwal kegiatan?')) setJadwal(jadwal.filter(j => j.id !== id));
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
            <PageHeader title="Jadwal Kegiatan" subtitle="Daftar jadwal kegiatan masjid" />
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Cari nama kegiatan..."
                className="rounded-xl border border-green-200 px-4 py-2 text-sm focus:ring-green-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <button
                className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-700"
                onClick={() => setModal({mode:'add'})}
              >Tambah Kegiatan</button>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Nama Kegiatan</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Pemateri</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Lokasi</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Jam</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJadwal.map(j => (
                    <tr key={j.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 text-sm text-green-900 font-semibold">{j.tanggal}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{j.nama}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{j.pemateri}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{j.lokasi}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{j.jam}</td>
                      <td className="px-4 py-2 text-sm">
                        {j.aktif ? (
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Aktif</span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Nonaktif</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        <button className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold" onClick={()=>setModal({mode:'edit',data:j})}>Edit</button>
                        <button className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold" onClick={()=>handleDelete(j.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredJadwal.length === 0 && (
                <div className="text-center text-green-700 py-6">Tidak ada jadwal kegiatan ditemukan.</div>
              )}
            </div>

            {/* Modal Form Tambah/Edit Jadwal */}
            {modal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">{modal.mode === 'add' ? 'Tambah Kegiatan' : 'Edit Kegiatan'}</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = {
                      id: modal.data?.id,
                      tanggal: form.tanggal.value,
                      nama: form.nama.value,
                      pemateri: form.pemateri.value,
                      lokasi: form.lokasi.value,
                      jam: form.jam.value,
                      aktif: form.aktif.checked,
                    };
                    modal.mode === 'add' ? handleAdd(data) : handleEdit(data);
                  }}>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Tanggal</label>
                      <input name="tanggal" type="date" defaultValue={modal.data?.tanggal||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Nama Kegiatan</label>
                      <input name="nama" defaultValue={modal.data?.nama||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Pemateri</label>
                      <input name="pemateri" defaultValue={modal.data?.pemateri||''} className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Lokasi</label>
                      <input name="lokasi" defaultValue={modal.data?.lokasi||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Jam</label>
                      <input name="jam" type="time" defaultValue={modal.data?.jam||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-4 flex items-center gap-2">
                      <input type="checkbox" name="aktif" defaultChecked={modal.data?.aktif??true} className="h-4 w-4 rounded border-green-300 text-green-700" />
                      <label className="text-sm text-green-700">Aktif</label>
                    </div>
                    <div className="flex gap-2 justify-end">
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
