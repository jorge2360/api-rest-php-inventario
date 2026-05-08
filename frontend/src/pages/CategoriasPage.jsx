import { useEffect, useState } from 'react'
import { categoriaApi } from '../api/api'

function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

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

  const guardarCategoria = async (event) => {
    event.preventDefault()
    setError('')
    setSuccessMessage('')

    if (!form.nombre.trim()) {
      setError('El nombre de la categoría es obligatorio.')
      return
    }

    try {
      setSaving(true)
      await categoriaApi.create(form)
      setSuccessMessage('Categoría creada correctamente.')
      setForm({ nombre: '', descripcion: '' })
      await cargarCategorias()
    } catch (err) {
      setError(err.message || 'Error al crear categoría')
    } finally {
      setSaving(false)
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-slate-800">Categorías</h2>

      <form onSubmit={guardarCategoria} className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70"
          >
            {saving ? 'Guardando...' : 'Guardar categoría'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}
      {successMessage && (
        <p className="mt-4 rounded bg-green-100 p-3 text-green-700">{successMessage}</p>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-800">Listado de categorías</h3>

        {loading ? (
          <p className="mt-4 text-slate-600">Cargando categorías...</p>
        ) : categorias.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
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
          </div>
        ) : (
          <p className="mt-4 text-slate-600">No hay categorías registradas.</p>
        )}
      </div>
    </section>
  )
}

export default CategoriasPage