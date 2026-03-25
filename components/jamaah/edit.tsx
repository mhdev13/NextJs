"use client";
import React from "react";
import { Jamaah } from "./table";

export default function JamaahEditForm({ jamaah }: { jamaah: Jamaah }) {
  // TODO: Implement form logic and server action
  return (
    <form className="space-y-5">
      <input type="hidden" name="id" value={jamaah.id} />
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-green-800">Nama</label>
        <input id="nama" name="nama" type="text" defaultValue={jamaah.nama} className="block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-900/10 border-green-200" placeholder="Nama jamaah" />
      </div>
      <div>
        <label htmlFor="alamat" className="block text-sm font-medium text-green-800">Alamat</label>
        <input id="alamat" name="alamat" type="text" defaultValue={jamaah.alamat} className="block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-900/10 border-green-200" placeholder="Alamat" />
      </div>
      <div>
        <label htmlFor="telepon" className="block text-sm font-medium text-green-800">Telepon</label>
        <input id="telepon" name="telepon" type="text" defaultValue={jamaah.telepon} className="block w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-900/10 border-green-200" placeholder="Telepon" />
      </div>
      <div className="flex items-center gap-2">
        <input type="checkbox" id="aktif" name="aktif" defaultChecked={jamaah.aktif} className="h-4 w-4 rounded border-green-300 text-green-700" />
        <label htmlFor="aktif" className="text-sm text-green-700">Aktif</label>
      </div>
      <button type="submit" className="px-4 py-2 rounded-xl bg-green-600 text-white font-bold">Simpan</button>
    </form>
  );
}
