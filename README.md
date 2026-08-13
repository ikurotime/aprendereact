# aprendereact

Curso interactivo de React en español. Cada lección combina una explicación
escrita con un playground donde puedes editar y ejecutar el código al instante.

🚧 En construcción. ¿Quieres colaborar? Escríbeme en
[@ikurotime](https://twitter.com/ikurotime).

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router 7
- Sandpack (playground de código)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
```

Otros comandos:

```bash
npm run build    # typecheck + build de producción en dist/
npm run preview  # sirve el build de producción
npm run lint     # oxlint
```

## Estructura

```
src/
  components/Navbar.tsx   Cabecera y navegación entre módulos
  lessons/data.tsx        Contenido de las lecciones (markdown + código)
  lessons/types.ts        Tipos Lesson y Module
  pages/Home.tsx          Landing
  pages/Lesson.tsx        Vista de lección con playground
  index.css               Tokens de diseño y utilidades
```

Para añadir una lección, edita `src/lessons/data.tsx`: cada entrada necesita
`id`, `module`, `title`, `content` (markdown) y `code` (el ejemplo inicial del
playground).

## Despliegue

Se despliega con Docker en [Dokploy](https://dokploy.com). El `Dockerfile`
compila con Node y sirve el resultado estático con nginx, con fallback SPA para
las rutas `/leccion/:id`.

```bash
docker build -t aprendereact .
docker run -p 8080:80 aprendereact
```

## Licencia

MIT
