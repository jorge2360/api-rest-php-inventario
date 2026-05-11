import { useEffect, useState } from 'react'
import { categoriaApi } from '../api/api'
import Card from '../components/Card'
import Button from '../components/Button'
import Alert from '../components/Alert'

function CategoriasPage() {
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [editingId, setEditingId] = useState(null)
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

  const resetForm = () => {
    setForm({ nombre: '', descripcion: '' })
    setEditingId(null)
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

      if (editingId) {
        await categoriaApi.update(editingId, form)
        setSuccessMessage('Categoría actualizada correctamente.')
      } else {
        await categoriaApi.create(form)
        setSuccessMessage('Categoría creada correctamente.')
      }

      resetForm()
      await cargarCategorias()
    } catch (err) {
      setError(err.message || 'Error al guardar categoría')
    } finally {
      setSaving(false)
    }
  }

  const editarCategoria = (categoria) => {
    setError('')
    setSuccessMessage('')
    setEditingId(categoria.id_categoria)
    setForm({
      nombre: categoria.nombre || '',
      descripcion: categoria.descripcion || '',
    })
  }

  const eliminarCategoria = async (id) => {
    setError('')
    setSuccessMessage('')

    const confirmado = window.confirm('¿Deseas eliminar esta categoría?')
    if (!confirmado) return

    try {
      await categoriaApi.delete(id)
      setSuccessMessage('Categoría eliminada correctamente.')

      if (editingId === id) {
        resetForm()
      }

      await cargarCategorias()
    } catch (err) {
      setError(err.message || 'Error al eliminar categoría')
    }
  }

  useEffect(() => {
    cargarCategorias()
  }, [])

  const [searchTerm, setSearchTerm] = useState('')

  const categoriasFiltradas = categorias.filter((categoria) => {
    const termino = searchTerm.toLowerCase()

    return (
      categoria.nombre.toLowerCase().includes(termino) ||
      (categoria.descripcion || '').toLowerCase().includes(termino)
    )
  })

  return (
    <Card title="Gestión de categorías">
      <form onSubmit={guardarCategoria} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-wrap gap-2 md:col-span-2">
          <Button type="submit" disabled={saving}>
            {saving ? 'Guardando...' : editingId ? 'Actualizar categoría' : 'Guardar categoría'}
          </Button>

          {editingId && (
            <Button type="button" variant="secondary" onClick={resetForm}>
              Cancelar edición
            </Button>
          )}
        </div>
      </form>

      <div className="mt-4 space-y-3">
        {error && <Alert type="error">{error}</Alert>}
        {successMessage && <Alert type="success">{successMessage}</Alert>}
      </div>

      <div className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-800">Listado de categorías</h3>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
            Mostrando: {categoriasFiltradas.length} de {categorias.length}
          </span>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Buscar categoría
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre o descripción"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {loading ? (
          <p className="text-slate-600">Cargando categorías...</p>
        ) : categoriasFiltradas.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">
                    ID
                  </th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">
                    Nombre
                  </th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">
                    Descripción
                  </th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody>
                {categoriasFiltradas.map((categoria) => (
                  <tr key={categoria.id_categoria} className="hover:bg-slate-50">
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-700">
                      {categoria.id_categoria}
                    </td>
                    <td className="border-b border-slate-100 p-3 text-sm font-medium text-slate-800">
                      {categoria.nombre}
                    </td>
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-600">
                      {categoria.descripcion || 'Sin descripción'}
                    </td>
                    <td className="border-b border-slate-100 p-3">
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="warning" onClick={() => editarCategoria(categoria)}>
                          Editar
                        </Button>

                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => eliminarCategoria(categoria.id_categoria)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Alert type="info">No hay categorías registradas.</Alert>
        )}
      </div>
    </Card>
  )
}

export default CategoriasPage