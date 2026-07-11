import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70dvh] flex-col justify-center py-24">
      <p className="eyebrow mb-4">404 / Page not found</p>
      <h1 className="title-display max-w-2xl">This page is off press.</h1>
      <p className="mt-6 max-w-xl text-[color:var(--color-mute)]">
        The page you requested does not exist or may have moved.
      </p>
      <Link href="/" className="btn-pill btn-pill-rust mt-10 w-fit">
        Return home
      </Link>
    </section>
  );
}
