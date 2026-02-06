'use server'

// import Bcrypt untuk hashing password
import bcrypt from 'bcryptjs'

// import prisma client
import { prisma } from '@/lib/db'

// import redirect dari next/navigation
import { redirect } from 'next/navigation'

// import signUpSchema dari schemas
import { signUpSchema } from '@/schemas/auth/sign-up.schema'

//interface untuk error validasi
interface SignUpActionState {
  errors: {
    name?: string[]
    email?: string[]
    password?: string[]
    termsAccepted?: string[]
    _form?: string[]
  }
}

/**
 * Action untuk proses sign-up
 * @param formData data dari form sign-up
 */
export async function signUpAction(
  _prevState: SignUpActionState,
  formData: FormData
): Promise<SignUpActionState> {

  // validasi form data menggunakan zod
  const result = signUpSchema.safeParse({
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    termsAccepted: formData.get('termsAccepted') === 'on' || formData.get('termsAccepted') === 'true',
  })

  // jika validasi gagal
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors }
  }

  try {
    // hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(result.data.password, 10)

    // simpan user baru ke database menggunakan prisma
    await prisma.user.create({
      data: {
        name: result.data.name,
        email: result.data.email,
        password: hashedPassword,
      },
    })

    // redirect ke halaman sign-in setelah berhasil sign-up
    redirect('/sign-in')

  } catch (error: any) {

    // Error NEXT_REDIRECT
    if (error?.digest?.startsWith('NEXT_REDIRECT')) throw error

    // Tangani error dari prisma (email duplicate)
    // NOTE: Prisma unique constraint biasanya code = P2002
    if (error?.code === 'P2002') {
      return {
        errors: {
          email: ['Email already registered'],
        },
      }
    }

    // Error umum
    return {
      errors: {
        _form: ['Registration failed, please try again'],
      },
    }
  }
}
