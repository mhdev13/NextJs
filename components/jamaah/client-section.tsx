"use client";
import React, { useState } from "react";
import JamaahTable, { Jamaah } from "./table";
import { createJamaahAction } from '@/app/actions/jamaah/jamaah-create';
import { updateJamaahAction } from '@/app/actions/jamaah/jamaah-update';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function JamaahClientSection({ jamaah }: { jamaah: Jamaah[] }) {
  const [filter, setFilter] = useState("");
  const [modal, setModal] = useState<{mode: 'add'|'edit', data?: Jamaah|null}|null>(null);

  const filteredJamaah = filter
    ? jamaah.filter((j: Jamaah) => j.nama.toLowerCase().includes(filter.toLowerCase()))
    : jamaah;

  function handleExportPDF() {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Nama", "Alamat", "Telepon", "Status"]],
      body: filteredJamaah.map((j: Jamaah) => [j.nama, j.alamat, j.telepon, j.aktif ? "Aktif" : "Nonaktif"]),
    });
    doc.save("data-jamaah.pdf");
  }

  function handleExportExcel() {
    const ws = XLSX.utils.json_to_sheet(
      filteredJamaah.map((j: Jamaah) => ({
        Nama: j.nama,
        Alamat: j.alamat,
        Telepon: j.telepon,
        Status: j.aktif ? "Aktif" : "Nonaktif",
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Jamaah");
    XLSX.writeFile(wb, "data-jamaah.xlsx");
  }

  function handleEdit(j: Jamaah) {
    setModal({ mode: 'edit', data: j });
  }
  function handleDelete(j: Jamaah) {
    if (confirm(`Yakin ingin menghapus jamaah "${j.nama}"?`)) {
      // TODO: panggil server action hapus
      alert('Fitur hapus belum diimplementasikan');
    }
  }

  function handleAdd() {
    setModal({ mode: 'add', data: null });
  }

  function handleCloseModal() {
    setModal(null);
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2 items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama jamaah..."
          className="rounded-xl border border-green-200 px-4 py-2 text-sm focus:ring-green-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-700"
          type="button"
          onClick={handleAdd}
        >Tambah Jamaah</button>
        <button
          className="rounded-xl bg-green-500 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-600"
          type="button"
          onClick={handleExportPDF}
        >Export PDF</button>
        <button
          className="rounded-xl bg-green-400 text-white px-4 py-2 text-sm font-bold shadow hover:bg-green-500"
          type="button"
          onClick={handleExportExcel}
        >Export Excel</button>
      </div>
      <JamaahTable
        jamaah={filteredJamaah}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      {/* Modal Form Tambah/Edit Jamaah */}
      {modal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold text-green-700 mb-4">
              {modal.mode === 'add' ? 'Tambah Jamaah' : 'Edit Jamaah'}
            </h3>
            <form
              action={async (formData: FormData) => {
                if (modal.mode === 'add') {
                  await createJamaahAction(formData);
                } else {
                  await updateJamaahAction(formData);
                }
                handleCloseModal();
              }}>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-green-700 mb-1">Nama</label>
                <input name="nama" defaultValue={modal.data?.nama||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-green-700 mb-1">Alamat</label>
                <input name="alamat" defaultValue={modal.data?.alamat||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-semibold text-green-700 mb-1">Telepon</label>
                <input name="telepon" defaultValue={modal.data?.telepon||''} required className="w-full rounded-xl border border-green-200 px-3 py-2" />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <input type="checkbox" name="aktif" defaultChecked={modal.data?.aktif??true} className="h-4 w-4 rounded border-green-300 text-green-700" />
                <label className="text-sm text-green-700">Aktif</label>
              </div>
              <div className="flex gap-2 justify-end">
                <button type="button" className="px-4 py-2 rounded-xl bg-zinc-100 text-zinc-700 font-bold" onClick={handleCloseModal}>Batal</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold">{modal.mode === 'add' ? 'Tambah' : 'Simpan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
