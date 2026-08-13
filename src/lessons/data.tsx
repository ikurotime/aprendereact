import type { Module } from './types'

export const modules: Module[] = [
  {
    id: 'fundamentos',
    title: 'Fundamentos de React',
    description: 'JSX, componentes, props, estado, y el ciclo de vida básico.',
    lessons: [
      {
        id: 'jsx',
        module: 'fundamentos',
        title: 'JSX y tu primer componente',
        content: `JSX es una extensión de sintaxis para JavaScript que se ve como HTML. React la usa para describir cómo debería verse la interfaz de usuario.

## ¿Qué es JSX?

JSX te permite escribir código que mezcla lógica JavaScript con marcado. A diferencia de los templates tradicionales, JSX se compila a llamadas \`React.createElement\`, lo que significa que tienes todo el poder de JavaScript disponible.

### Reglas básicas de JSX

1. **Un solo elemento raíz** — Un componente debe devolver un solo elemento contenedor. Puedes usar \`<div>\`, \`<section>\`, o un Fragment (\`<></>\`).
2. **Cierra todas las etiquetas** — Incluso las autocontenidas como \`<img />\` o \`<br />\`.
3. **camelCase en atributos** — \`className\`, \`onClick\`, \`tabIndex\` en vez de \`class\`, \`onclick\`, \`tabindex\`.
4. **Expresiones con \`{}\`** — Cualquier expresión de JavaScript se puede incrustar con llaves.

### Tu primer componente

Un componente en React es solo una función que devuelve JSX. Por convención, los nombres de componentes empiezan con mayúscula.

En el playground de abajo, el componente \`Saludo\` recibe un \`nombre\` y renderiza un saludo personalizado.`,
        code: `function Saludo({ nombre }) {
  return (
    <div>
      <h1>¡Hola, {nombre}!</h1>
      <p>Este es tu primer componente en React.</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Saludo nombre="Mundo" />
      <Saludo nombre="React" />
    </div>
  )
}

export default App`,
      },
      {
        id: 'props',
        module: 'fundamentos',
        title: 'Props: pasando datos entre componentes',
        content: `Las props (propiedades) son la forma de pasar datos de un componente padre a un hijo. Son de solo lectura: un componente nunca debe modificar sus propias props.

## Cómo funcionan las props

Las props se pasan como atributos en JSX y se reciben como un objeto en el parámetro de la función del componente.

### Destructuring de props

Es buena práctica destructurar las props directamente en los parámetros:

\`\`\`jsx
function Avatar({ src, alt, size = 64 }) {
  return <img src={src} alt={alt} width={size} />;
}
\`\`\`

### Children

La prop especial \`children\` te permite pasar elementos JSX anidados:

\`\`\`jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}
\`\`\`

En el playground, fíjate cómo \`Perfil\` recibe props y las usa para renderizar diferentes usuarios.`,
        code: `function Perfil({ nombre, edad, pais }) {
  return (
    <div style={{
      border: '1px solid #e5e4e7',
      borderRadius: 8,
      padding: 16,
      marginBottom: 12
    }}>
      <h3>{nombre}</h3>
      <p>Edad: {edad} años</p>
      <p>País: {pais}</p>
    </div>
  )
}

function ListaPerfiles({ perfiles }) {
  return (
    <div>
      <h2>Perfiles</h2>
      {perfiles.map(p => (
        <Perfil key={p.nombre} {...p} />
      ))}
    </div>
  )
}

function App() {
  const usuarios = [
    { nombre: 'Ana', edad: 25, pais: 'México' },
    { nombre: 'Luis', edad: 30, pais: 'Colombia' },
    { nombre: 'Sofía', edad: 28, pais: 'Argentina' },
  ]

  return <ListaPerfiles perfiles={usuarios} />
}

export default App`,
      },
      {
        id: 'estado',
        module: 'fundamentos',
        title: 'useState: estado en componentes',
        content: `El estado (state) permite a los componentes recordar y actualizar información entre renderizados. \`useState\` es el Hook básico para esto.

## useState

\`\`\`jsx
const [valor, setValor] = useState(initialValue)
\`\`\`

- \`valor\`: el valor actual del estado
- \`setValor\`: función que actualiza el estado y causa un re-render
- \`initialValue\`: el valor inicial (solo se usa en el primer render)

### Actualizaciones

Nunca mutues el estado directamente. Siempre usa la función actualizadora:

\`\`\`jsx
// ❌ MAL
contador = contador + 1

// ✅ BIEN
setContador(contador + 1)
// o con función:
setContador(prev => prev + 1)
\`\`\`

### Múltiples estados

Puedes usar tantos \`useState\` como necesites, o agrupar estados relacionados en un objeto.

En el playground hay un contador simple y un input controlado. Juega con ambos.`,
        code: `import { useState } from 'react'

function Contador() {
  const [contador, setContador] = useState(0)

  return (
    <div>
      <h2>Contador: {contador}</h2>
      <button onClick={() => setContador(c => c + 1)}>
        Incrementar
      </button>
      <button onClick={() => setContador(c => c - 1)}>
        Decrementar
      </button>
      <button onClick={() => setContador(0)}>
        Resetear
      </button>
    </div>
  )
}

function InputControlado() {
  const [texto, setTexto] = useState('')

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Input controlado</h3>
      <input
        value={texto}
        onChange={e => setTexto(e.target.value)}
        placeholder="Escribe algo..."
      />
      <p>Has escrito: {texto}</p>
    </div>
  )
}

function App() {
  return (
    <div>
      <Contador />
      <InputControlado />
    </div>
  )
}

export default App`,
      },
      {
        id: 'eventos',
        module: 'fundamentos',
        title: 'Eventos y manejo de interacciones',
        content: `React normaliza los eventos del navegador para que funcionen igual en todos los entornos. Los eventos en React se nombran en camelCase y se pasan como props.

## Eventos comunes

\`\`\`jsx
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>...</form>
<div onMouseEnter={handleMouseEnter}>...</div>
\`\`\`

### Pasar argumentos

Si necesitas pasar un argumento al manejador, usa una arrow function:

\`\`\`jsx
<button onClick={() => handleDelete(id)}>Eliminar</button>
\`\`\`

### El objeto evento

El manejador recibe el evento sintético de React. Puedes llamar \`e.preventDefault()\` para evitar comportamientos por defecto (como recargar la página en un formulario).

En el playground hay un formulario controlado que muestra cómo manejar submit y cómo prevenir el comportamiento por defecto.`,
        code: `import { useState } from 'react'

function Formulario() {
  const [nombre, setNombre] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(\`¡Hola, \${nombre}! \${mensaje}\`)
    setNombre('')
    setMensaje('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre: </label>
        <input
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          placeholder="Tu nombre"
        />
      </div>
      <div style={{ marginTop: 8 }}>
        <label>Mensaje: </label>
        <input
          value={mensaje}
          onChange={e => setMensaje(e.target.value)}
          placeholder="Tu mensaje"
        />
      </div>
      <button type="submit" style={{ marginTop: 12 }}>
        Enviar
      </button>
    </form>
  )
}

function App() {
  return (
    <div>
      <h2>Formulario con eventos</h2>
      <Formulario />
    </div>
  )
}

export default App`,
      },
      {
        id: 'renderizado-listas',
        module: 'fundamentos',
        title: 'Renderizado de listas y condicionales',
        content: `En React renderizas listas usando \`map()\` y condicionales con operadores lógicos o ternarios.

## Listas con map

\`\`\`jsx
{items.map(item => (
  <li key={item.id}>{item.nombre}</li>
))}
\`\`\`

Cada elemento necesita un \`key\` único y estable para ayudar a React a identificar cambios.

### Renderizado condicional

\`\`\`jsx
// Ternario
{isLoggedIn ? <UserPanel /> : <LoginButton />}

// AND lógico
{unreadCount > 0 && <Badge count={unreadCount} />}

// Variable condicional
let content = isAdmin ? <AdminPanel /> : <UserPanel />
\`\`\`

En el playground hay una lista de tareas que puedes filtrar y marcar como completadas.`,
        code: `import { useState } from 'react'

const TAREAS_INICIALES = [
  { id: 1, texto: 'Aprender React', completa: false },
  { id: 2, texto: 'Construir un proyecto', completa: true },
  { id: 3, texto: 'Publicar en producción', completa: false },
]

function ListaTareas() {
  const [tareas, setTareas] = useState(TAREAS_INICIALES)
  const [soloPendientes, setSoloPendientes] = useState(false)

  const toggleTarea = (id) => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completa: !t.completa } : t
    ))
  }

  const tareasFiltradas = soloPendientes
    ? tareas.filter(t => !t.completa)
    : tareas

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={soloPendientes}
          onChange={() => setSoloPendientes(v => !v)}
        />
        {' '}Solo pendientes
      </label>

      <ul>
        {tareasFiltradas.map(tarea => (
          <li
            key={tarea.id}
            onClick={() => toggleTarea(tarea.id)}
            style={{
              textDecoration: tarea.completa ? 'line-through' : 'none',
              cursor: 'pointer',
              marginBottom: 4
            }}
          >
            {tarea.texto}
          </li>
        ))}
      </ul>

      {tareasFiltradas.length === 0 && (
        <p>¡No hay tareas pendientes! 🎉</p>
      )}
    </div>
  )
}

function App() {
  return (
    <div>
      <h2>Lista de tareas</h2>
      <ListaTareas />
    </div>
  )
}

export default App`,
      },
    ],
  },
  {
    id: 'intermedio',
    title: 'React Intermedio',
    description: 'useEffect, useRef, useMemo, useCallback, Context API, formularios avanzados.',
    lessons: [
      {
        id: 'useEffect',
        module: 'intermedio',
        title: 'useEffect: efectos secundarios y ciclo de vida',
        content: `\`useEffect\` te permite ejecutar efectos secundarios en tus componentes: llamadas API, suscripciones, timers, manipulación del DOM.

## Sintaxis

\`\`\`jsx
useEffect(() => {
  // efecto
  return () => {
    // cleanup (opcional)
  }
}, [dependencias])
\`\`\`

### Comportamiento según dependencias

- \`[]\` (array vacío): se ejecuta solo al montar
- \`[var1, var2]\`: se ejecuta al montar y cuando var1 o var2 cambien
- Sin array: se ejecuta en cada render
- \`return cleanup\`: se ejecuta al desmontar o antes de re-ejecutar

### Ejemplo: fetch de datos

\`\`\`jsx
const [data, setData] = useState(null)
useEffect(() => {
  fetch('/api/data')
    .then(r => r.json())
    .then(setData)
}, [])
\`\`\`

En el playground simulamos una llamada API con un timer para mostrarte el flujo de carga, éxito y error.`,
        code: `import { useState, useEffect } from 'react'

function SimularAPI({ id }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setData(null)

    const timer = setTimeout(() => {
      setData({
        id,
        nombre: \`Elemento \${id}\`,
        descripcion: 'Este dato se cargó de forma asíncrona.'
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) return <p>Cargando...</p>

  return (
    <div>
      <h3>{data.nombre}</h3>
      <p>{data.descripcion}</p>
    </div>
  )
}

function App() {
  const [id, setId] = useState(1)

  return (
    <div>
      <h2>Fetch simulado con useEffect</h2>
      <button onClick={() => setId(Math.floor(Math.random() * 100))}>
        Cargar otro elemento
      </button>
      <SimularAPI id={id} />
    </div>
  )
}

export default App`,
      },
      {
        id: 'useRef',
        module: 'intermedio',
        title: 'useRef: referencias al DOM y valores persistentes',
        content: `\`useRef\` te da un objeto mutable que persiste entre renders sin causar re-renderizados cuando cambia.

## Usos comunes

### 1. Referencias al DOM

Para acceder directamente a elementos del DOM:

\`\`\`jsx
const inputRef = useRef(null)
// ...
<input ref={inputRef} />
// inputRef.current.focus()
\`\`\`

### 2. Valores persistentes

Para guardar valores que no deben causar re-render:

\`\`\`jsx
const countRef = useRef(0)
countRef.current += 1 // no causa re-render
\`\`\`

### Diferencia con useState

- \`useState\`: el cambio causa re-render
- \`useRef\`: el cambio NO causa re-render

En el playground hay un cronómetro que usa useRef para trackear el intervalo sin causar re-renders innecesarios.`,
        code: `import { useState, useRef, useEffect } from 'react'

function Cronometro() {
  const [segundos, setSegundos] = useState(0)
  const [corriendo, setCorriendo] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (corriendo) {
      intervalRef.current = setInterval(() => {
        setSegundos(s => s + 1)
      }, 1000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [corriendo])

  const reset = () => {
    setCorriendo(false)
    setSegundos(0)
  }

  return (
    <div>
      <h2>{segundos}s</h2>
      <button onClick={() => setCorriendo(true)}>
        Iniciar
      </button>
      <button onClick={() => setCorriendo(false)}>
        Pausar
      </button>
      <button onClick={reset}>
        Resetear
      </button>
    </div>
  )
}

function AutoFocus() {
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h3>Auto-focus con useRef</h3>
      <input ref={inputRef} placeholder="Haz click en el botón" />
      <button onClick={focusInput} style={{ marginLeft: 8 }}>
        Enfocar input
      </button>
    </div>
  )
}

function App() {
  return (
    <div>
      <Cronometro />
      <AutoFocus />
    </div>
  )
}

export default App`,
      },
      {
        id: 'context',
        module: 'intermedio',
        title: 'Context API: estado global sin prop drilling',
        content: `Context API evita pasar props manualmente a través de múltiples niveles de componentes (prop drilling).

## Crear y usar contexto

\`\`\`jsx
// 1. Crear el contexto
const TemaContext = createContext('light')

// 2. Proveer el valor
<TemaContext.Provider value="dark">
  <App />
</TemaContext.Provider>

// 3. Consumir el valor
const tema = useContext(TemaContext)
\`\`\`

### Cuándo usarlo

- Tema (claro/oscuro)
- Usuario autenticado
- Preferencias de idioma
- Estado de UI global

### No abuses de Context

Context no es un sustituto de todas las props. Úsalo solo para datos que realmente necesiten muchos componentes. Para estado global complejo, considera Zustand, Jotai, o Redux.

En el playground hay un ejemplo de tema claro/oscuro usando Context.`,
        code: `import { useState, useContext, createContext } from 'react'

const TemaContext = createContext(null)

function Boton({ children, onClick }) {
  const { tema } = useContext(TemaContext)

  return (
    <button
      onClick={onClick}
      style={{
        padding: '8px 16px',
        background: tema === 'oscuro' ? '#333' : '#f0f0f0',
        color: tema === 'oscuro' ? '#fff' : '#000',
        border: '1px solid #ccc',
        borderRadius: 6,
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  )
}

function Panel() {
  const { tema, toggleTema } = useContext(TemaContext)

  return (
    <div style={{
      padding: 24,
      background: tema === 'oscuro' ? '#1a1a1a' : '#fff',
      color: tema === 'oscuro' ? '#fff' : '#000',
      borderRadius: 8,
      transition: 'all 0.2s'
    }}>
      <h2>Tema actual: {tema}</h2>
      <Boton onClick={toggleTema}>
        Cambiar a {tema === 'oscuro' ? 'claro' : 'oscuro'}
      </Boton>
      <div style={{ marginTop: 16 }}>
        <Boton>Botón de ejemplo</Boton>
      </div>
    </div>
  )
}

function App() {
  const [tema, setTema] = useState('claro')
  const toggleTema = () => {
    setTema(t => t === 'claro' ? 'oscuro' : 'claro')
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      <Panel />
    </TemaContext.Provider>
  )
}

export default App`,
      },
      {
        id: 'formularios-avanzados',
        module: 'intermedio',
        title: 'Formularios avanzados y validación',
        content: `Los formularios son una parte esencial de cualquier app. En React, controlamos cada input con estado.

## Patrones clave

### Input controlado

\`\`\`jsx
<input value={valor} onChange={e => setValor(e.target.value)} />
\`\`\`

### Múltiples campos con un solo estado

\`\`\`jsx
const [form, setForm] = useState({ nombre: '', email: '' })
const handleChange = (e) => {
  setForm({ ...form, [e.target.name]: e.target.value })
}
\`\`\`

### Validación

Puedes validar en tiempo real (onChange) o al hacer submit. Es buena práctica mostrar errores específicos por campo.

En el playground hay un formulario de registro con validación de campos obligatorios, formato de email, y confirmación de contraseña.`,
        code: `import { useState } from 'react'

function FormularioRegistro() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmar: ''
  })
  const [errores, setErrores] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validar = () => {
    const nuevosErrores = {}
    if (!form.nombre.trim()) nuevosErrores.nombre = 'El nombre es obligatorio'
    if (!form.email.includes('@')) nuevosErrores.email = 'Email inválido'
    if (form.password.length < 6) nuevosErrores.password = 'Mínimo 6 caracteres'
    if (form.password !== form.confirmar) nuevosErrores.confirmar = 'Las contraseñas no coinciden'
    return nuevosErrores
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length === 0) {
      alert('¡Registro exitoso!')
    }
  }

  const campos = [
    { name: 'nombre', label: 'Nombre', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Contraseña', type: 'password' },
    { name: 'confirmar', label: 'Confirmar contraseña', type: 'password' },
  ]

  return (
    <form onSubmit={handleSubmit}>
      {campos.map(campo => (
        <div key={campo.name} style={{ marginBottom: 12 }}>
          <label>{campo.label}: </label>
          <input
            name={campo.name}
            type={campo.type}
            value={form[campo.name]}
            onChange={handleChange}
          />
          {errores[campo.name] && (
            <p style={{ color: 'red', fontSize: 13, margin: 0 }}>
              {errores[campo.name]}
            </p>
          )}
        </div>
      ))}
      <button type="submit">Registrarse</button>
    </form>
  )
}

function App() {
  return (
    <div>
      <h2>Formulario de registro</h2>
      <FormularioRegistro />
    </div>
  )
}

export default App`,
      },
      {
        id: 'useMemo-useCallback',
        module: 'intermedio',
        title: 'useMemo y useCallback: optimización de rendimiento',
        content: `\`useMemo\` y \`useCallback\` ayudan a evitar trabajo innecesario y renders extra.

## useMemo

Memoriza el resultado de un cálculo costoso:

\`\`\`jsx
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.price, 0)
}, [items])
\`\`\`

## useCallback

Memoriza una función para que no se cree de nuevo en cada render:

\`\`\`jsx
const handleClick = useCallback(() => {
  doSomething(id)
}, [id])
\`\`\`

### ¡No optimices prematuramente!

Solo usa estos hooks cuando tengas:
- Cálculos costosos (procesar grandes arrays, filter, sort)
- Referencias estables para children que usen React.memo
- Efectos que dependan de funciones

En el playground hay una lista filtrable donde useMemo evita recalcular los filtros y useCallback estabiliza el manejador.`,
        code: `import { useState, useMemo, useCallback } from 'react'

const PRODUCTOS = [
  { id: 1, nombre: 'Laptop', precio: 1200, categoria: 'electronica' },
  { id: 2, nombre: 'Mouse', precio: 30, categoria: 'electronica' },
  { id: 3, nombre: 'Libro', precio: 20, categoria: 'papeleria' },
  { id: 4, nombre: 'Monitor', precio: 400, categoria: 'electronica' },
  { id: 5, nombre: 'Cuaderno', precio: 5, categoria: 'papeleria' },
]

function App() {
  const [filtro, setFiltro] = useState('todas')
  const [carrito, setCarrito] = useState([])

  const productosFiltrados = useMemo(() => {
    console.log('Filtrando productos...')
    if (filtro === 'todas') return PRODUCTOS
    return PRODUCTOS.filter(p => p.categoria === filtro)
  }, [filtro])

  const agregarAlCarrito = useCallback((producto) => {
    setCarrito(prev => [...prev, producto.nombre])
  }, [])

  const total = useMemo(() => {
    return productosFiltrados.reduce((sum, p) => sum + p.precio, 0)
  }, [productosFiltrados])

  return (
    <div>
      <select onChange={e => setFiltro(e.target.value)} value={filtro}>
        <option value="todas">Todas</option>
        <option value="electronica">Electrónica</option>
        <option value="papeleria">Papelería</option>
      </select>

      <ul>
        {productosFiltrados.map(p => (
          <li key={p.id}>
{p.nombre} - \${p.precio}
            <button onClick={() => agregarAlCarrito(p)}>
              +
            </button>
          </li>
        ))}
      </ul>

      <p>Total: \${total}</p>
      <p>Carrito: {carrito.join(', ') || 'vacío'}</p>
    </div>
  )
}

export default App`,
      },
    ],
  },
  {
    id: 'avanzado',
    title: 'React Avanzado',
    description: 'Custom hooks, render props, compound components, React Router, testing.',
    lessons: [
      {
        id: 'custom-hooks',
        module: 'avanzado',
        title: 'Custom Hooks: tu propia lógica reutilizable',
        content: `Los custom hooks son funciones JavaScript que reutilizan lógica con estado. Empiezan con \`use\` y pueden usar otros hooks.

## ¿Por qué custom hooks?

- Extraer lógica repetitiva de componentes
- Separar concerns sin añadir componentes extra
- Compartir lógica entre componentes sin prop drilling

### Ejemplo: useWindowSize

\`\`\`jsx
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })
  useEffect(() => {
    const handleResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return size
}
\`\`\`

En el playground hay varios custom hooks: \`useWindowSize\`, \`useLocalStorage\`, y \`useFetch\`. Puedes ver cómo encapsulan lógica compleja en una API simple.`,
        code: `import { useState, useEffect, useCallback } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValueAndStore = useCallback((newValue) => {
    setValue(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }, [key])

  return [value, setValueAndStore]
}

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(url)
      .then(r => r.json())
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(e); setLoading(false) } })

    return () => { cancelled = true }
  }, [url])

  return { data, loading, error }
}

function App() {
  const [nombre, setNombre] = useLocalStorage('nombre', '')
  const { data, loading } = useFetch('https://jsonplaceholder.typicode.com/todos/1')

  return (
    <div>
      <h2>useLocalStorage</h2>
      <input value={nombre} onChange={e => setNombre(e.target.value)} />
      <p>Guardado en localStorage: "{nombre}"</p>
      <p>(Recarga la página y verás que el valor persiste)</p>

      <h2 style={{ marginTop: 24 }}>useFetch</h2>
      {loading ? <p>Cargando...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default App`,
      },
      {
        id: 'react-router',
        module: 'avanzado',
        title: 'React Router: navegación entre páginas',
        content: `React Router es la librería estándar para manejar navegación en aplicaciones React de una sola página (SPA).

## Conceptos clave

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
\`\`\`

- \`<BrowserRouter>\`: proveedor del enrutador
- \`<Routes>\`: contenedor de rutas
- \`<Route path="/" element={<Home />} />\`: define una ruta
- \`<Link to="/about">\`: navegación sin recargar la página
- \`useParams()\`: obtiene parámetros de la URL
- \`useNavigate()\`: navegación programática

### Rutas anidadas y layouts

\`\`\`jsx
<Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/productos/:id" element={<Producto />} />
</Route>
\`\`\`

En el playground el enrutador no funciona por limitaciones del entorno, pero aquí abajo tienes un ejemplo conceptual completo. Este proyecto (Aprende React) usa React Router internamente para navegar entre la landing y las lecciones.`,
        code: `// Ejemplo conceptual de React Router
// (no ejecutable en este playground)

/*
import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom'

function Home() {
  return <h1>Inicio</h1>
}

function Producto() {
  const { id } = useParams()
  return <h1>Producto: {id}</h1>
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/productos/1">Producto 1</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:id" element={<Producto />} />
      </Routes>
    </BrowserRouter>
  )
}
*/

function App() {
  return (
    <div style={{ padding: 24 }}>
      <h2>React Router</h2>
      <p>React Router permite navegar entre páginas sin recargar el navegador.</p>
      <pre style={{ background: '#f5f5f4', padding: 16, borderRadius: 8 }}>
&#123;/* Este proyecto usa React Router para navegar entre lecciones */&#125;
      </pre>
      <p>Explora las lecciones usando los botones "Anterior" y "Siguiente".</p>
    </div>
  )
}

export default App`,
      },
      {
        id: 'compound-components',
        module: 'avanzado',
        title: 'Compound Components: componentes flexibles y expresivos',
        content: `El patrón Compound Components permite crear componentes que trabajan juntos implícitamente, compartiendo estado interno sin que el usuario tenga que gestionarlo.

## Ejemplo clásico: Select

\`\`\`jsx
<Select>
  <Select.Option value="1">Opción 1</Select.Option>
  <Select.Option value="2">Opción 2</Select.Option>
</Select>
\`\`\`

### Cómo implementarlo

1. El componente padre maneja el estado
2. Los hijos reciben las props necesarias mediante React.Children.map o Context
3. La API es declarativa y expresiva

### Ventajas

- Mayor expresividad
- El usuario no maneja estado interno
- Flexibilidad en el marcado
- Buena separación de responsabilidades

En el playground hay un componente \`Acordeon\` y \`Acordeon.Item\` implementando este patrón.`,
        code: `import { useState, createContext, useContext } from 'react'

const AcordeonContext = createContext(null)

function Acordeon({ children }) {
  const [abierto, setAbierto] = useState(null)

  return (
    <AcordeonContext.Provider value={{ abierto, setAbierto }}>
      <div style={{ border: '1px solid #e5e4e7', borderRadius: 8 }}>
        {children}
      </div>
    </AcordeonContext.Provider>
  )
}

function Item({ titulo, children }) {
  const { abierto, setAbierto } = useContext(AcordeonContext)
  const estaAbierto = abierto === titulo

  return (
    <div>
      <button
        onClick={() => setAbierto(estaAbierto ? null : titulo)}
        style={{
          width: '100%',
          padding: '12px 16px',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #e5e4e7',
          cursor: 'pointer',
          textAlign: 'left',
          fontSize: 16,
          fontWeight: 500
        }}
      >
        {titulo} {estaAbierto ? '▲' : '▼'}
      </button>
      {estaAbierto && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e4e7' }}>
          {children}
        </div>
      )}
    </div>
  )
}

Acordeon.Item = Item

function App() {
  return (
    <div>
      <h2>Acordeón (Compound Components)</h2>
      <Acordeon>
        <Acordeon.Item titulo="¿Qué es React?">
          React es una biblioteca de JavaScript para construir interfaces de usuario.
        </Acordeon.Item>
        <Acordeon.Item titulo="¿Qué es JSX?">
          JSX es una extensión de sintaxis que combina JavaScript con marcado HTML.
        </Acordeon.Item>
        <Acordeon.Item titulo="¿Qué es un Hook?">
          Los Hooks son funciones que permiten usar estado y otras características en componentes funcionales.
        </Acordeon.Item>
      </Acordeon>
    </div>
  )
}

export default App`,
      },
      {
        id: 'testing',
        module: 'avanzado',
        title: 'Testing en React con Vitest y Testing Library',
        content: `Los tests te dan confianza para hacer cambios sin romper funcionalidad existente.

## Herramientas

- **Vitest**: corredor de tests rápido (usado en este proyecto)
- **React Testing Library**: renderiza componentes y simula interacciones
- **Jest DOM**: matchers para el DOM (\`toBeInTheDocument\`, \`toHaveTextContent\`)

### Tipos de tests

\`\`\`tsx
// Test de renderizado
test('muestra el título', () => {
  render(<MiComponente />)
  expect(screen.getByText('Hola')).toBeInTheDocument()
})

// Test de interacción
test('incrementa al hacer click', async () => {
  render(<Contador />)
  await user.click(screen.getByText('+'))
  expect(screen.getByText('1')).toBeInTheDocument()
})
\`\`\`

En el playground hay un contador con tests que puedes inspeccionar. Aunque no puedes ejecutar tests aquí, el código te muestra la estructura típica.`,
        code: `import { useState } from 'react'

function Contador({ inicial = 0 }) {
  const [count, setCount] = useState(inicial)

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
      <button onClick={() => setCount(inicial)}>Reset</button>
    </div>
  )
}

/*
// Tests con Vitest + Testing Library
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Contador from './Contador'

describe('Contador', () => {
  it('renderiza el valor inicial', () => {
    render(<Contador inicial={5} />)
    expect(screen.getByText('Contador: 5')).toBeInTheDocument()
  })

  it('incrementa al hacer click en +', async () => {
    const user = userEvent.setup()
    render(<Contador />)
    await user.click(screen.getByText('+'))
    expect(screen.getByText('Contador: 1')).toBeInTheDocument()
  })

  it('decrementa al hacer click en -', async () => {
    const user = userEvent.setup()
    render(<Contador />)
    await user.click(screen.getByText('-'))
    expect(screen.getByText('Contador: -1')).toBeInTheDocument()
  })
})
*/

function App() {
  return <Contador />
}

export default App`,
      },
    ],
  },
  {
    id: 'ecosistema',
    title: 'Ecosistema y Producción',
    description: 'Estado global, TypeScript, patrones avanzados, performance, y deploy.',
    lessons: [
      {
        id: 'typescript-react',
        module: 'ecosistema',
        title: 'React con TypeScript: tipado seguro',
        content: `TypeScript añade tipos a JavaScript, atrapando errores en tiempo de compilación. Con React, los tipos hacen tu código más predecible.

## Tipos comunes

\`\`\`tsx
// Props de un componente
interface ButtonProps {
  label: string
  variant?: 'primary' | 'secondary'
  onClick: () => void
  disabled?: boolean
}

function Button({ label, variant = 'primary', onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}

// useState tipado
const [user, setUser] = useState<User | null>(null)

// useRef tipado
const inputRef = useRef<HTMLInputElement>(null)

// Eventos
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setValue(e.target.value)
}
\`\`\`

En el playground hay un componente de lista de tareas con tipos completos. Fíjate cómo las interfaces hacen el código auto-documentado.`,
        code: `import { useState } from 'react'

interface Tarea {
  id: number
  texto: string
  completa: boolean
  prioridad: 'alta' | 'media' | 'baja'
}

interface TareaItemProps {
  tarea: Tarea
  onToggle: (id: number) => void
}

function TareaItem({ tarea, onToggle }: TareaItemProps) {
  const colores: Record<string, string> = {
    alta: '#ef4444',
    media: '#f59e0b',
    baja: '#22c55e',
  }

  return (
    <li
      onClick={() => onToggle(tarea.id)}
      style={{
        textDecoration: tarea.completa ? 'line-through' : 'none',
        cursor: 'pointer',
        padding: '8px 12px',
        marginBottom: 4,
        borderLeft: \`4px solid \${colores[tarea.prioridad]}\`,
        background: '#fafaf9',
        borderRadius: '0 4px 4px 0'
      }}
    >
      {tarea.texto}
    </li>
  )
}

const TAREAS: Tarea[] = [
  { id: 1, texto: 'Aprender TypeScript', completa: false, prioridad: 'alta' },
  { id: 2, texto: 'Tipar componentes', completa: false, prioridad: 'alta' },
  { id: 3, texto: 'Crear interfaces', completa: true, prioridad: 'media' },
]

function App() {
  const [tareas, setTareas] = useState<Tarea[]>(TAREAS)

  const toggleTarea = (id: number) => {
    setTareas(prev => prev.map(t =>
      t.id === id ? { ...t, completa: !t.completa } : t
    ))
  }

  return (
    <div>
      <h2>Lista de tareas tipada</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map(t => (
          <TareaItem key={t.id} tarea={t} onToggle={toggleTarea} />
        ))}
      </ul>
    </div>
  )
}

export default App`,
      },
      {
        id: 'estado-global',
        module: 'ecosistema',
        title: 'Estado global con Zustand',
        content: `Zustand es una librería minimalista para manejar estado global. Es más simple que Redux pero igual de poderosa.

## Store con Zustand

\`\`\`tsx
import { create } from 'zustand'

interface Store {
  count: number
  increment: () => void
  decrement: () => void
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}))
\`\`\`

### Usar el store

\`\`\`tsx
function Counter() {
  const count = useStore((state) => state.count)
  const increment = useStore((state) => state.increment)
  return <button onClick={increment}>{count}</button>
}
\`\`\`

### Ventajas

- No necesita Provider
- Selectores para evitar re-renders innecesarios
- TypeScript first
- API minimalista

En el playground hay un carrito de compras con Zustand (simulado sin la librería).`,
        code: `import { create } from 'zustand'
import { useState } from 'react'

interface Producto {
  id: number
  nombre: string
  precio: number
}

interface CarritoStore {
  items: Producto[]
  agregar: (p: Producto) => void
  eliminar: (id: number) => void
  limpiar: () => void
}

const useCarrito = create<CarritoStore>((set) => ({
  items: [],
  agregar: (producto) =>
    set((state) => ({ items: [...state.items, producto] })),
  eliminar: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  limpiar: () => set({ items: [] }),
}))

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: 'Camiseta', precio: 25 },
  { id: 2, nombre: 'Gorra', precio: 15 },
  { id: 3, nombre: 'Taza', precio: 10 },
]

function App() {
  const items = useCarrito((s) => s.items)
  const agregar = useCarrito((s) => s.agregar)
  const eliminar = useCarrito((s) => s.eliminar)
  const limpiar = useCarrito((s) => s.limpiar)

  const total = items.reduce((sum, i) => sum + i.precio, 0)

  return (
    <div>
      <h2>Tienda</h2>
      {PRODUCTOS.map((p) => (
        <div key={p.id} style={{ marginBottom: 8 }}>
          {p.nombre} - \${p.precio}{' '}
          <button onClick={() => agregar(p)}>Agregar</button>
        </div>
      ))}

      <hr />
      <h2>Carrito ({items.length})</h2>
      {items.length === 0 ? (
        <p>Carrito vacío</p>
      ) : (
        <>
          {items.map((item, i) => (
            <div key={i}>
              {item.nombre} - \${item.precio}{' '}
              <button onClick={() => eliminar(item.id)}>x</button>
            </div>
          ))}
          <p><strong>Total: \${total}</strong></p>
          <button onClick={limpiar}>Limpiar carrito</button>
        </>
      )}
    </div>
  )
}

export default App`,
      },
      {
        id: 'patrones-rendimiento',
        module: 'ecosistema',
        title: 'Patrones de rendimiento y buenas prácticas',
        content: `Escribir React performante no es solo sobre hooks de optimización, sino sobre arquitectura.

## Patrones clave

### 1. Levantar estado (Lifting State Up)

Mueve el estado al ancestro común más cercano. No dupliques estado.

### 2. Colocar estado (Colocating State)

Mantén el estado tan cerca como sea posible de donde se usa. No pongas todo en un store global.

### 3. Componentes puros con React.memo

\`\`\`tsx
const ExpensiveList = React.memo(function ExpensiveList({ items }) {
  return items.map(item => <div key={item.id}>{item.name}</div>)
})
\`\`\`

### 4. Code Splitting con lazy

\`\`\`tsx
const Dashboard = lazy(() => import('./Dashboard'))
\`\`\`

### 5. Virtualización para listas largas

Usa react-window o react-virtuoso para listas de miles de elementos.

En el playground hay una demostración de React.memo con indicadores visuales de re-render.`,
        code: `import { useState, memo } from 'react'

// Este componente solo se re-renderiza si sus props cambian
const ListaExpensive = memo(function ListaExpensive({ items, onRemove }) {
  console.log('Renderizando ListaExpensive')
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          {item.nombre}
          <button onClick={() => onRemove(item.id)}>Eliminar</button>
        </li>
      ))}
    </ul>
  )
})

function App() {
  const [items, setItems] = useState([
    { id: 1, nombre: 'Elemento 1' },
    { id: 2, nombre: 'Elemento 2' },
    { id: 3, nombre: 'Elemento 3' },
  ])
  const [contador, setContador] = useState(0)

  const eliminar = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  return (
    <div>
      <h2>React.memo en acción</h2>
      <p>Contador (no afecta la lista): {contador}</p>
      <button onClick={() => setContador(c => c + 1)}>
        Incrementar contador
      </button>

      <p style={{ marginTop: 16 }}>
        La lista abajo NO se re-renderiza al cambiar el contador
        (mira la consola)
      </p>

      <ListaExpensive items={items} onRemove={eliminar} />
    </div>
  )
}

export default App`,
      },
    ],
  },
]

export const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0)

export function getLessonById(id: string) {
  for (const module of modules) {
    const lesson = module.lessons.find(l => l.id === id)
    if (lesson) return lesson
  }
  return null
}

export function getAdjacentLessons(id: string) {
  const allLessons = modules.flatMap(m => m.lessons)
  const idx = allLessons.findIndex(l => l.id === id)
  return {
    prev: idx > 0 ? allLessons[idx - 1] : null,
    next: idx < allLessons.length - 1 ? allLessons[idx + 1] : null,
  }
}