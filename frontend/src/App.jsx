import HomePage from './pages/HomePage'
import CategoriasPage from './pages/CategoriasPage'
import ProductosPage from './pages/ProductosPage'

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-800">Sistema de Inventario</h1>
          <p className="text-sm text-slate-500">API REST PHP + MySQL consumida con React</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        <HomePage />
        <CategoriasPage />
        <ProductosPage />
      </main>
    </div>
  )
}

export default App