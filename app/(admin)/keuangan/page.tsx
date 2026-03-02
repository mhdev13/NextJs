"use client";
import Sidebar from '@/app/(admin)/sidebar';
import PageHeader from '@/components/common/page-header';
import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function KeuanganPage() {
  // Dummy data keuangan
  const [keuangan, setKeuangan] = useState([
    { id: 1, tanggal: '2026-03-01', keterangan: 'Donasi Jumat', tipe: 'Masuk', jumlah: 2000000 },
    { id: 2, tanggal: '2026-03-02', keterangan: 'Pembayaran listrik', tipe: 'Keluar', jumlah: 500000 },
    { id: 3, tanggal: '2026-03-03', keterangan: 'Zakat', tipe: 'Masuk', jumlah: 1200000 },
    { id: 4, tanggal: '2026-03-04', keterangan: 'Perbaikan sound system', tipe: 'Keluar', jumlah: 800000 },
  ]);
  const [filter, setFilter] = useState('');
  const [modal, setModal] = useState<{mode: 'add'|'edit', data?: any}|null>(null);

  // Filtered data
  const filteredKeuangan = keuangan.filter(k => k.keterangan.toLowerCase().includes(filter.toLowerCase()));

  // Handle add
  const handleAdd = (data: any) => {
    setKeuangan([...keuangan, { ...data, id: Date.now() }]);
    setModal(null);
  };
  // Handle edit
  const handleEdit = (data: any) => {
    setKeuangan(keuangan.map(k => k.id === data.id ? data : k));
    setModal(null);
  };
  // Handle delete
  const handleDelete = (id: number) => {
    if (confirm('Yakin hapus data keuangan?')) setKeuangan(keuangan.filter(k => k.id !== id));
  };

  // Hitung saldo
  const saldo = keuangan.reduce((acc, k) => k.tipe === 'Masuk' ? acc + k.jumlah : acc - k.jumlah, 0);

  // Export PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Tanggal', 'Keterangan', 'Tipe', 'Jumlah (Rp)']],
      body: filteredKeuangan.map(k => [k.tanggal, k.keterangan, k.tipe, k.jumlah.toLocaleString()]),
    });
    doc.save('data-keuangan.pdf');
  };

  // Export Excel
  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredKeuangan.map(k => ({
      Tanggal: k.tanggal,
      Keterangan: k.keterangan,
      Tipe: k.tipe,
      Jumlah: k.jumlah,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Keuangan');
    XLSX.writeFile(wb, 'data-keuangan.xlsx');
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
            <PageHeader title="Keuangan Masjid" subtitle="Rekap transaksi keuangan masjid" />
            <div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
              <input
                type="text"
                placeholder="Cari keterangan..."
                className="rounded-xl border border-green-200 px-4 py-2 text-sm focus:ring-green-500"
                value={filter}
                onChange={e => setFilter(e.target.value)}
              />
              <button
                className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-700"
                onClick={() => setModal({mode:'add'})}
              >Tambah Transaksi</button>
              <button
                className="rounded-xl bg-green-500 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-600"
                onClick={handleExportPDF}
              >Export PDF</button>
              <button
                className="rounded-xl bg-green-400 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-500"
                onClick={handleExportExcel}
              >Export Excel</button>
            </div>
            <div className="mb-4 text-green-700 font-bold text-lg">Saldo Masjid: Rp {saldo.toLocaleString()}</div>
            <div className="overflow-x-auto mt-2">
              <table className="min-w-full border rounded-xl overflow-hidden">
                <thead className="bg-green-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Tanggal</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Keterangan</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Tipe</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Jumlah (Rp)</th>
                    <th className="px-4 py-2 text-left text-xs font-bold text-green-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredKeuangan.map(k => (
                    <tr key={k.id} className="border-b last:border-b-0">
                      <td className="px-4 py-2 text-sm text-green-900 font-semibold">{k.tanggal}</td>
                      <td className="px-4 py-2 text-sm text-green-700">{k.keterangan}</td>
                      <td className="px-4 py-2 text-sm">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${k.tipe === 'Masuk' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{k.tipe}</span>
                      </td>
                      <td className="px-4 py-2 text-sm text-green-900 font-bold">{k.jumlah.toLocaleString()}</td>
                      <td className="px-4 py-2 text-sm flex gap-2">
                        <button className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold" onClick={()=>setModal({mode:'edit',data:k})}>Edit</button>
                        <button className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold" onClick={()=>handleDelete(k.id)}>Hapus</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredKeuangan.length === 0 && (
                <div className="text-center text-green-700 py-6">Tidak ada data transaksi ditemukan.</div>
              )}
            </div>

            {/* Modal Form Tambah/Edit Transaksi */}
            {modal && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
                  <h3 className="text-lg font-bold text-green-700 mb-4">{modal.mode === 'add' ? 'Tambah Transaksi' : 'Edit Transaksi'}</h3>
                  <form onSubmit={e => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const data = {
                      id: modal.data?.id,
                      tanggal: form.tanggal.value,
                      keterangan: form.keterangan.value,
                      tipe: form.tipe.value,
                      jumlah: Number(form.jumlah.value),
                    };
                    modal.mode === 'add' ? handleAdd(data) : handleEdit(data);
                  }}>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Tanggal</label>
                      <input name="tanggal" type="date" defaultValue={modal.data?.tanggal||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Keterangan</label>
                      <input name="keterangan" defaultValue={modal.data?.keterangan||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
                    </div>
                    <div className="mb-3">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Tipe</label>
                      <select name="tipe" defaultValue={modal.data?.tipe||'Masuk'} className="w-full rounded-xl border border-green-200 px-3 py-2">
                        <option value="Masuk">Masuk</option>
                        <option value="Keluar">Keluar</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-semibold text-green-700 mb-1">Jumlah (Rp)</label>
                      <input name="jumlah" type="number" min="0" defaultValue={modal.data?.jumlah||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
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
