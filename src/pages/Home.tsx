export default function Home() {
  return (
    <div className="frame-stack">
      <section
        className="frame-block reveal text-center"
        style={{ animationDelay: '100ms' }}
      >
        <h1 className="text-4xl font-medium tracking-tight text-balance text-[var(--color-ink)] sm:text-5xl">
          Aprende React desde cero
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty text-[var(--color-muted)]">
          Domina la tecnología de Frontend más utilizada hasta el momento, con
          los ejercicios que necesitas para entender e interiorizar todos sus
          conceptos.
        </p>

        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-pretty text-[var(--color-muted)]">
          Ejercicios interactivos para reforzar el aprendizaje y ejemplos de
          buenas prácticas en React.
        </p>

        <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-pretty text-[var(--color-muted)]">
          ¿Quieres colaborar? Escríbeme.
        </p>

        <a
          href="https://twitter.com/ikurotime"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[var(--color-ink)] px-5 py-2.5 text-sm font-medium text-[var(--color-bg)] transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          Escríbeme en @ikurotime
          <span aria-hidden="true">→</span>
        </a>
      </section>
    </div>
  )
}
