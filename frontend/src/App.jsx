import HomePage from './pages/HomePage'
import CategoriasPage from './pages/CategoriasPage'
import ProductosPage from './pages/ProductosPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 hidden h-full w-64 border-r border-slate-200 bg-white p-6 shadow-sm lg:block">
        <h1 className="text-2xl font-bold text-slate-900">Inventario</h1>
        <p className="mt-1 text-sm text-slate-500">Panel administrativo</p>

        <nav className="mt-8 space-y-2">
          <a href="#inicio" className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100">
            Inicio
          </a>
          <a href="#categorias" className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100">
            Categorías
          </a>
          <a href="#productos" className="block rounded-lg px-4 py-2 text-slate-700 hover:bg-slate-100">
            Productos
          </a>
        </nav>
      </aside>

      <div className="lg:ml-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-900">Sistema de Inventario</h2>
            <p className="text-sm text-slate-500">React + Tailwind CSS consumiendo API REST PHP</p>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-6 px-6 py-6">
          <div id="inicio">
            <HomePage />
          </div>

          <div id="categorias">
            <CategoriasPage />
          </div>

          <div id="productos">
            <ProductosPage />
          </div>
        </main>
      </div>
    </div>
  )
}

export default App