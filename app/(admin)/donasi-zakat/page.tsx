"use client";
import Sidebar from '@/app/(admin)/sidebar';
import PageHeader from '@/components/common/page-header';
import { useState } from 'react';

export default function DonasiZakatPage() {
  // Dummy data donasi & zakat
  const [data, setData] = useState([
    { id: 1, tanggal: '2026-03-01', nama: 'Donasi Pembangunan', jenis: 'Donasi', nominal: 2000000, donatur: 'Bapak Ali', keterangan: 'Transfer', aktif: true },
    { id: 2, tanggal: '2026-03-02', nama: 'Zakat Fitrah', jenis: 'Zakat', nominal: 500000, donatur: 'Ibu Siti', keterangan: 'Tunai', aktif: true },
    { id: 3, tanggal: '2026-03-03', nama: 'Donasi Operasional', jenis: 'Donasi', nominal: 750000, donatur: 'Bapak Hasan', keterangan: 'Transfer', aktif: false },
    { id: 4, tanggal: '2026-03-04', nama: 'Zakat Mal', jenis: 'Zakat', nominal: 1200000, donatur: 'Ibu Dewi', keterangan: 'Tunai', aktif: true },
  ]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState<{mode: 'add'|'edit', data?: any}|null>(null);

  // Filtered data
  const filteredData = data.filter(d => d.nama.toLowerCase().includes(filter.toLowerCase()) || d.jenis.toLowerCase().includes(filter.toLowerCase()));

  // Handle add
  const handleAdd = (formData: any) => {
    setData([...data, { ...formData, id: Date.now() }]);
    setModal(null);
  };
  // Handle edit
  const handleEdit = (formData: any) => {
    setData(data.map(d => d.id === formData.id ? formData : d));
    setModal(null);
  };
  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm('Yakin hapus data donasi/zakat?')) setData(data.filter(d => d.id !== id));
  };

  // Total donasi & zakat
  const totalDonasi = data.filter(d => d.jenis === 'Donasi' && d.aktif).reduce((a, b) => a + b.nominal, 0);
  const totalZakat = data.filter(d => d.jenis === 'Zakat' && d.aktif).reduce((a, b) => a + b.nominal, 0);

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
            <PageHeader title="Donasi & Zakat" subtitle="Rekap data donasi dan zakat masjid" />
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Cari nama/jenis..."
                className="rounded-xl border border-green-200 px-4 py-2 text-sm focus:ring-green-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <button
                className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-700"
                onClick={() => setModal({mode:'add'})}
              >Tambah Data</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center">
                <div className="text-xs text-green-700 font-bold mb-1">Total Donasi Aktif</div>
                <div className="text-2xl font-bold text-green-800">Rp {totalDonasi.toLocaleString()}</div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex flex-col items-center">
                <div className="text-xs text-green-700 font-bold mb-1">Total Zakat Aktif</div>
                <div className="text-2xl font-bold text-green-800">Rp {totalZakat.toLocaleString()}</div>
              </div>
            </div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Nama</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Jenis</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Nominal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Donatur</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Keterangan</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Status</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(d => (
                    <tr key={d.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 text-sm text-green-900 font-semibold">{d.tanggal}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{d.nama}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{d.jenis}</td>
                      <td className="px-4 py-2 text-sm text-green-700">Rp {d.nominal.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{d.donatur}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{d.keterangan}</td>
                      <td className="px-4 py-2 text-sm">
                        {d.aktif ? (
                          <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Aktif</span>
                        ) : (
                          <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Nonaktif</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        <button className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold" onClick={()=>setModal({mode:'edit',data:d})}>Edit</button>
                        <button className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold" onClick={()=>handleDelete(d.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredData.length === 0 && (
                <div className="text-center text-green-700 py-6">Tidak ada data donasi/zakat ditemukan.</div>
              )}
            </div>

            {/* Modal Form Tambah/Edit Donasi & Zakat */}
            {modal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">{modal.mode === 'add' ? 'Tambah Data' : 'Edit Data'}</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = {
                      id: modal.data?.id,
                      tanggal: form.tanggal.value,
                      nama: form.nama.value,
                      jenis: form.jenis.value,
                      nominal: Number(form.nominal.value),
                      donatur: form.donatur.value,
                      keterangan: form.keterangan.value,
                      aktif: form.aktif.checked,
                    };
                    modal.mode === 'add' ? handleAdd(formData) : handleEdit(formData);
                  }}>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Tanggal</label>
                      <input name="tanggal" type="date" defaultValue={modal.data?.tanggal||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Nama</label>
                      <input name="nama" defaultValue={modal.data?.nama||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Jenis</label>
                      <select name="jenis" defaultValue={modal.data?.jenis||'Donasi'} required className="w-full rounded-xl border border-green-200 px-3 py-2">
                        <option value="Donasi">Donasi</option>
                        <option value="Zakat">Zakat</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Nominal</label>
                      <input name="nominal" type="number" min="0" defaultValue={modal.data?.nominal||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Donatur</label>
                      <input name="donatur" defaultValue={modal.data?.donatur||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Keterangan</label>
                      <input name="keterangan" defaultValue={modal.data?.keterangan||''} className="w-full rounded-xl border border-green-200 px-3 py-2" />
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
