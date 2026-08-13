import { useLocation, useNavigate } from 'react-router-dom'

const temas = [
  { id: 'fundamentos', label: 'Fundamentos' },
  { id: 'intermedio', label: 'Intermedio' },
  { id: 'avanzado', label: 'Avanzado' },
  { id: 'ecosistema', label: 'Ecosistema' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isHome = location.pathname === '/'
  const currentModule = location.pathname.startsWith('/leccion/')
    ? location.pathname.split('/')[2]?.split('-')[0]
    : null

  return (
    <header className="frame-pad py-5 text-sm reveal" style={{ animationDelay: '0ms' }}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 font-medium tracking-tight cursor-pointer"
        >
          <span className="inline-flex items-center justify-center rounded-md bg-[var(--color-ink)] w-6 h-6 font-mono text-[11px] text-[var(--color-bg)]">
            ⚛
          </span>
          <span className="text-[var(--color-ink)]">aprendereact</span>
        </button>

        {!isHome && (
          <nav className="flex items-center gap-4 text-[var(--color-muted)]">
            {temas.map((t) => (
              <button
                key={t.id}
                onClick={() => navigate(`/leccion/${t.id}/jsx`)}
                className={`cursor-pointer transition-opacity ${
                  currentModule === t.id
                    ? 'text-[var(--color-ink)] font-medium'
                    : 'hover:text-[var(--color-ink)] hover:opacity-80'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}