"use client";
import React from "react";

export default function JamaahDeleteForm({ jamaahId, jamaahNama }: { jamaahId: string; jamaahNama?: string }) {
  // TODO: Implement delete logic and server action
  const handleDelete = (e: React.FormEvent) => {
    if (!confirm(`Yakin ingin menghapus jamaah ${jamaahNama ? `"${jamaahNama}"` : "ini"}?`)) {
      e.preventDefault();
    }
  };

  return (
    <form action="#" onSubmit={handleDelete} className="inline-flex">
      <input type="hidden" name="id" value={jamaahId} />
      <button type="submit" className="inline-flex items-center justify-center rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700">
        <span className="sr-only">Hapus</span>
        {/* TODO: Tambah icon hapus */}
        🗑️
      </button>
    </form>
  );
}
