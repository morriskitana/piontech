import Image from "next/image";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-[10%] h-72 w-72 rounded-full bg-cyan-500/25 blur-[140px]" />
        <div className="absolute right-[10%] bottom-[14%] h-[22rem] w-[22rem] rounded-full bg-blue-500/20 blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.05),_rgba(15,23,42,0.9))]" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <main className="relative z-10 flex w-full max-w-2xl flex-col items-center gap-8 rounded-[2rem] border border-white/10 bg-slate-950/75 p-12 text-center shadow-[0_30px_80px_-40px_rgba(56,189,248,0.7)] backdrop-blur">
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/piontech-logo-placeholder.svg"
            alt="PionTech Sytsem Ltd. logo"
            width={320}
            height={120}
            priority
            className="drop-shadow-[0_16px_40px_rgba(56,189,248,0.35)]"
          />
          <h1 className="text-balance text-4xl font-semibold md:text-5xl">
            Piontech is almost ready
          </h1>
          <p className="max-w-xl text-sm text-slate-300/80 md:text-base">
            We are polishing a new technology experience. Leave your email and
            we will share the first look as soon as it is ready.
          </p>
        </div>

        <form
          className="flex w-full flex-col gap-3 sm:flex-row"
          action="#"
          method="post"
          noValidate
        >
          <label htmlFor="email" className="sr-only">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="you@company.com"
            required
            className="h-12 flex-1 rounded-full border border-white/20 bg-black/40 px-5 text-sm text-white outline-none transition focus:border-cyan-200 focus:ring-2 focus:ring-cyan-400/40"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 px-6 text-sm font-semibold text-slate-950 transition hover:from-cyan-200 hover:via-sky-300 hover:to-blue-400"
          >
            Contact us
          </button>
        </form>

        <p className="text-xs text-slate-300/70">
          We will only use your email to respond to this request.
        </p>
      </main>
    </div>
  );
}
