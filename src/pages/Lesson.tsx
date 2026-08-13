import { useParams, useNavigate } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Sandpack } from '@codesandbox/sandpack-react'
import { getLessonById, getAdjacentLessons, modules } from '../lessons/data'

function getFileExtension(code: string) {
  if (code.includes(':') || code.includes('interface') || code.includes('<') && code.includes('>')) {
    return 'tsx'
  }
  return 'jsx'
}

export default function Lesson() {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const lesson = getLessonById(lessonId || '')

  if (!lesson) {
    return (
      <div className="frame-block" style={{ padding: '4rem 1.5rem' }}>
        <h2 className="text-xl font-medium text-[var(--color-ink)]">
          Lección no encontrada
        </h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-sm text-[var(--color-muted)] underline cursor-pointer"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  const { prev, next } = getAdjacentLessons(lesson.id)
  const currentModule = modules.find((m) => m.lessons.some((l) => l.id === lesson.id))
  const moduleIndex = modules.findIndex((m) => m.id === currentModule?.id)
  const lessonIndex = currentModule?.lessons.findIndex((l) => l.id === lesson.id) ?? 0

  const ext = getFileExtension(lesson.code)

  return (
    <div className="frame-stack">
      {/* Header */}
      <div className="frame-pad py-4 reveal" style={{ animationDelay: '0ms' }}>
        <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
          <button
            onClick={() => navigate('/')}
            className="cursor-pointer hover:text-[var(--color-ink)]"
          >
            Inicio
          </button>
          <span>/</span>
          <span>Módulo {moduleIndex + 1}</span>
          <span>/</span>
          <span className="text-[var(--color-ink)]">{lesson.title}</span>
        </div>
      </div>

      {/* Contenido */}
      <div className="frame-pad py-10 reveal" style={{ animationDelay: '100ms' }}>
        <span className="text-xs font-medium text-[var(--color-muted)]">
          Lección {moduleIndex + 1}.{lessonIndex + 1}
        </span>
        <h1 className="mt-1 text-3xl font-medium tracking-tight text-[var(--color-ink)]">
          {lesson.title}
        </h1>

        <div className="mt-8 prose prose-sm max-w-none" style={{ color: 'var(--color-muted)', lineHeight: 1.7 }}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children, ...props }) {
                const isInline = !className
                if (isInline) {
                  return (
                    <code
                      style={{
                        background: 'var(--color-surface)',
                        padding: '2px 6px',
                        borderRadius: 4,
                        fontSize: '0.875em',
                        color: 'var(--color-ink)',
                      }}
                      {...props}
                    >
                      {children}
                    </code>
                  )
                }
                return (
                  <pre
                    style={{
                      background: 'var(--color-surface)',
                      padding: '16px',
                      borderRadius: 8,
                      overflow: 'auto',
                      fontSize: '0.8125rem',
                      lineHeight: 1.6,
                      border: '1px solid var(--color-line)',
                    }}
                  >
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                )
              },
              h2({ children }) {
                return (
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      marginTop: '2rem',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {children}
                  </h2>
                )
              },
              h3({ children }) {
                return (
                  <h3
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      color: 'var(--color-ink)',
                      marginTop: '1.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {children}
                  </h3>
                )
              },
              p({ children }) {
                return <p style={{ marginBottom: '1rem' }}>{children}</p>
              },
              ul({ children }) {
                return <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }}>{children}</ul>
              },
              li({ children }) {
                return <li style={{ marginBottom: '0.25rem' }}>{children}</li>
              },
              strong({ children }) {
                return <strong style={{ color: 'var(--color-ink)' }}>{children}</strong>
              },
            }}
          >
            {lesson.content}
          </Markdown>
        </div>
      </div>

      {/* Playground */}
      <div className="frame-pad py-8 reveal" style={{ animationDelay: '200ms' }}>
        <h2 className="text-sm font-medium text-[var(--color-muted)] mb-4">
          Playground — edita y ejecuta el código
        </h2>
        <div className="rounded-lg border border-[var(--color-line)] overflow-hidden">
          <Sandpack
            template="react-ts"
            theme="light"
            options={{
              visibleFiles: [`/App.${ext}`],
              activeFile: `/App.${ext}`,
              showLineNumbers: true,
              editorHeight: 400,
            }}
            customSetup={{
              dependencies: {
                react: '^19.2.0',
                'react-dom': '^19.2.0',
                zustand: '^5.0.0',
                'react-router-dom': '^7.0.0',
              },
              entry: '/index.tsx',
            }}
            files={{
              [`/App.${ext}`]: lesson.code,
              '/index.tsx': {
                code: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.${ext}'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)`,
                hidden: true,
              },
              '/tsconfig.json': {
                code: JSON.stringify(
                  {
                    compilerOptions: {
                      target: 'ES2020',
                      module: 'ESNext',
                      moduleResolution: 'bundler',
                      jsx: 'react-jsx',
                      strict: true,
                    },
                  },
                  null,
                  2
                ),
                hidden: true,
              },
            }}
          />
        </div>
      </div>

      {/* Navegación */}
      <div className="frame-pad py-6 reveal" style={{ animationDelay: '300ms' }}>
        <div className="flex items-center justify-between gap-4">
          {prev ? (
            <button
              onClick={() => navigate(`/leccion/${prev.id}`)}
              className="group flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer"
            >
              <span aria-hidden="true" className="group-hover:-translate-x-0.5 transition-transform">
                ←
              </span>
              <div className="text-left">
                <div className="text-xs text-[var(--color-subtle)]">Anterior</div>
                <div className="text-[var(--color-ink)] group-hover:underline">
                  {prev.title}
                </div>
              </div>
            </button>
          ) : (
            <div />
          )}

          {next ? (
            <button
              onClick={() => navigate(`/leccion/${next.id}`)}
              className="group flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer"
            >
              <div className="text-right">
                <div className="text-xs text-[var(--color-subtle)]">Siguiente</div>
                <div className="text-[var(--color-ink)] group-hover:underline">
                  {next.title}
                </div>
              </div>
              <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">
                →
              </span>
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm text-[var(--color-muted)] cursor-pointer hover:text-[var(--color-ink)]"
            >
              ← Volver al inicio
            </button>
          )}
        </div>
      </div>
    </div>
  )
}