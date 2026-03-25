'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function updateJamaahAction(formData: FormData) {
  const id = formData.get('id') as string
  const nama = formData.get('nama') as string
  const alamat = formData.get('alamat') as string
  const telepon = formData.get('telepon') as string
  const aktif = formData.get('aktif') === 'on'

  await prisma.jamaah.update({
    where: { id },
    data: { nama, alamat, telepon, aktif }
  })
  revalidatePath('/jamaah')
}
