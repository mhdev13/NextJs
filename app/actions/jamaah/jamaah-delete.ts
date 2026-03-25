'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function deleteJamaahAction(formData: FormData) {
  const id = formData.get('id') as string
  await prisma.jamaah.delete({ where: { id } })
  revalidatePath('/jamaah')
}
