"use client";

// import Link dari next/link
import Link from "next/link";

// import useActionState dari react
import { useActionState } from 'react'

// import signInAction dari server actions
import { signInAction } from "@/app/actions/auth/sign-in";

// initial state untuk form
const initialState = { errors: {} as Record<string, string[]> };

export function SignInForm() {

    // useActionState untuk menghandle state form dan action
    const [formState, formAction, isPending] = useActionState(signInAction, initialState);

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-gradient-to-br from-green-50 to-green-100">
            {/* Subtle background effects */}
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
                                Masuk Pengurus Masjid
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                                Masukkan email dan password untuk login ke dashboard pengurus masjid.
                            </p>
                        </div>

                        <form action={formAction} className="space-y-5" noValidate>
                            {formState?.errors?._form?.length ? (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {formState.errors._form[0]}
                                </div>
                            ) : null}

                            {/* Email field */}
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
                                    />
                                </div>
                                {formState?.errors?.email?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.email[0]}</p>
                                ) : null}
                            </div>

                            {/* Password field */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-green-700"
                                    >
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs font-semibold text-green-700 underline underline-offset-4 hover:text-green-900"
                                    >
                                        Lupa password?
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className={`block w-full rounded-2xl border bg-green-50 px-4 py-3 text-sm text-green-900 placeholder-green-400 outline-none transition focus:ring-2 focus:ring-green-500/10 ${formState?.errors?.password?.length ? "border-red-300" : "border-green-200"
                                            }`}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {formState?.errors?.password?.length ? (
                                    <p className="mt-2 text-sm text-red-600">{formState.errors.password[0]}</p>
                                ) : null}
                            </div>

                            {/* Remember me checkbox */}
                            <div className="flex items-center gap-3">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-green-300 text-green-700 focus:ring-green-500/20"
                                />
                                <label htmlFor="remember" className="text-sm text-green-700">
                                    Ingat saya selama 30 hari
                                </label>
                            </div>

                            {/* Submit button */}
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full rounded-full bg-green-600 px-5 py-3 text-base font-bold text-white shadow-lg transition hover:bg-green-700 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-green-500/20"
                                >
                                    {isPending ? "Sedang masuk..." : "Masuk"}
                                </button>

                                <p className="mt-4 text-center text-xs text-green-700">
                                    Belum punya akun?{" "}
                                    <Link
                                        href="/sign-up"
                                        className="font-bold text-green-700 underline underline-offset-4 hover:text-green-900"
                                    >
                                        Daftar
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
