import { useEffect, useState } from 'react'
import { categoriaApi } from '../api/api'

function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cargarCategorias = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await categoriaApi.getAll()
      setCategorias(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(err.message || 'Error al cargar categorías')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-slate-800">Categorías</h2>

      {loading && <p className="mt-4 text-slate-600">Cargando categorías...</p>}
      {error && <p className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}

      {!loading && !error && (
        <div className="mt-4 overflow-x-auto">
          {categorias.length > 0 ? (
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Nombre</th>
                  <th className="border p-3 text-left">Descripción</th>
                </tr>
              </thead>
              <tbody>
                {categorias.map((categoria) => (
                  <tr key={categoria.id_categoria}>
                    <td className="border p-3">{categoria.id_categoria}</td>
                    <td className="border p-3">{categoria.nombre}</td>
                    <td className="border p-3">{categoria.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-600">No hay categorías registradas.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default CategoriasPage