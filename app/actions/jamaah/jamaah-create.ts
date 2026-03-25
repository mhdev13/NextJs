'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createJamaahAction(formData: FormData) {
  const nama = formData.get('nama') as string
  const alamat = formData.get('alamat') as string
  const telepon = formData.get('telepon') as string
  const aktif = formData.get('aktif') === 'on'

  await prisma.jamaah.create({
    data: { nama, alamat, telepon, aktif }
  })
  revalidatePath('/jamaah')
}
