"use client";

// import Link dari next/link
import Link from "next/link";

// import useActionState dari react
import { useActionState } from "react";

// import server action
import { signUpAction } from "@/app/actions/auth/sign-up";

// initial state untuk form
const initialState = { errors: {} as Record<string, string[]> };

export function SignUpForm() {

    // useActionState untuk menghandle state form dan action
    const [formState, formAction, isPending] = useActionState(signUpAction, initialState);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-green-100">
            {/* subtle background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 left-10 h-72 w-72 -translate-x-1/2 rounded-full bg-green-300/40 blur-3xl animate-pulse" />
                <div className="absolute -bottom-24 right-10 h-72 w-72 rounded-full bg-green-200/40 blur-3xl animate-pulse" />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-xl items-center px-6 py-14">
                <div className="w-full">
                    <div className="rounded-3xl bg-white p-8 shadow-lg backdrop-blur border border-green-100 sm:p-10">
                        <div className="mb-8 text-center">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-600 mb-3 shadow-lg">
                                <svg width="28" height="28" fill="none" viewBox="0 0 28 28"><circle cx="14" cy="14" r="14" fill="#22C55E"/><path d="M14 8a3 3 0 0 1 3 3v2h2a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h2v-2a3 3 0 0 1 3-3z" fill="#fff"/></svg>
                            </span>
                            <h3 className="text-3xl font-extrabold tracking-tight text-green-700">
                                Daftar Pengurus Masjid
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                                Buat akun pengurus masjid Anda secara gratis dan mulai kelola masjid dengan mudah.
                            </p>
                        </div>

                        <form action={formAction} className="space-y-5" noValidate>
                            {/* Error umum */}
                            {formState?.errors?._form?.length ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {formState.errors._form[0]}
                                </div>
                            ) : null}

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-green-700"
                                >
                                    Nama Lengkap
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        autoComplete="name"
                                        className={`block w-full rounded-2xl border bg-green-50 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-500/10 ${formState?.errors?.name?.length ? "border-red-300" : "border-green-200"
                                            }`}
                                        placeholder="Nama Pengurus"
                                        disabled={isPending}
                                    />
                                </div>

                                {/* Name error */}
                                {formState?.errors?.name?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.name[0]}</p>
                                ) : null}
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-green-700"
                                >
                                    Email Pengurus
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className={`block w-full rounded-2xl border bg-green-50 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-500/10 ${formState?.errors?.email?.length ? "border-red-300" : "border-green-200"
                                            }`}
                                        placeholder="pengurus@masjid.com"
                                        disabled={isPending}
                                    />
                                </div>

                                {/* Email error */}
                                {formState?.errors?.email?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.email[0]}</p>
                                ) : null}
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-green-700"
                                >
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        className={`block w-full rounded-2xl border bg-green-50 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-500/10 ${formState?.errors?.password?.length ? "border-red-300" : "border-green-200"
                                            }`}
                                        placeholder="••••••••"
                                        disabled={isPending}
                                    />
                                </div>
                                <p className="mt-2 text-sm text-green-600">
                                    Minimal 8 karakter.
                                </p>

                                {/* Password error */}
                                {formState?.errors?.password?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.password[0]}</p>
                                ) : null}
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">
                                <input
                                    id="termsAccepted"
                                    name="termsAccepted"
                                    type="checkbox"
                                    className="mt-1 h-4 w-4 rounded border-green-300 text-green-700 focus:ring-green-500/20"
                                    disabled={isPending}
                                />
                                <label htmlFor="termsAccepted" className="text-sm leading-relaxed text-green-700">
                                    Saya setuju dengan
                                    <a href="#" className="font-bold text-green-700 underline underline-offset-4 hover:text-green-900 mx-1">
                                        Syarat Layanan
                                    </a>
                                    dan
                                    <a href="#" className="font-bold text-green-700 underline underline-offset-4 hover:text-green-900 mx-1">
                                        Kebijakan Privasi
                                    </a>
                                </label>
                            </div>

                            {/* Terms error */}
                            {formState?.errors?.termsAccepted?.length ? (
                                <p className="text-sm text-red-600">{formState.errors.termsAccepted[0]}</p>
                            ) : null}

                            {/* Submit */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full rounded-full bg-green-600 px-5 py-3 text-base font-bold text-white shadow-lg transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                >
                                    {isPending ? (
                                        <span className="inline-flex items-center justify-center gap-2">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                            Mendaftar...
                                        </span>
                                    ) : (
                                        "Daftar"
                                    )}
                                </button>

                                <p className="mt-4 text-center text-xs text-green-700">
                                    Sudah punya akun?{" "}
                                    <Link
                                        href="/sign-in"
                                        className="font-bold text-green-700 underline underline-offset-4 hover:text-green-900"
                                    >
                                        Masuk
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    <p className="mt-6 text-center text-xs text-green-700">
                        Dengan melanjutkan, Anda setuju dengan
                        <a href="#" className="underline underline-offset-4 hover:text-green-900 mx-1">
                            Syarat
                        </a>
                        dan
                        <a href="#" className="underline underline-offset-4 hover:text-green-900 mx-1">
                            Kebijakan Privasi
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    );
}
