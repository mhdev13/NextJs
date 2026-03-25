import React from "react";

export type Jamaah = {
  id: string;
  nama: string;
  alamat: string;
  telepon: string;
  aktif: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function JamaahTable({ jamaah, onEdit, onDelete }: {
  jamaah: Jamaah[];
  onEdit?: (j: Jamaah) => void;
  onDelete?: (j: Jamaah) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-green-200">
      <table className="min-w-full divide-y divide-green-200">
        <thead className="bg-green-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-green-500">Nama</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-green-500">Alamat</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-green-500">Telepon</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-green-500">Status</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-green-500">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-green-200 bg-white">
          {jamaah.map((j) => (
            <tr key={j.id} className="transition hover:bg-green-50">
              <td className="px-6 py-4 font-medium text-sm text-green-900">{j.nama}</td>
              <td className="px-6 py-4 text-sm text-green-700">{j.alamat}</td>
              <td className="px-6 py-4 text-sm text-green-700">{j.telepon}</td>
              <td className="px-6 py-4 text-sm">
                {j.aktif ? (
                  <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Aktif</span>
                ) : (
                  <span className="inline-block px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">Nonaktif</span>
                )}
              </td>
              <td className="px-6 py-4 text-right text-sm flex gap-2 justify-end">
                <button
                  className="px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold"
                  type="button"
                  onClick={() => onEdit?.(j)}
                >Edit</button>
                <button
                  className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold"
                  type="button"
                  onClick={() => onDelete?.(j)}
                >Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {jamaah.length === 0 && (
        <div className="text-center text-green-700 py-6">Tidak ada data jamaah ditemukan.</div>
      )}
    </div>
  );
}
