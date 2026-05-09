import { useEffect, useState } from 'react'
import { categoriaApi, productoApi } from '../api/api'

function ProductosPage() {
  const [editingId, setEditingId] = useState(null)
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [form, setForm] = useState({
    id_categoria: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
  })

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const cargarDatos = async () => {
    setLoading(true)
    setError('')

    try {
      const [productosResponse, categoriasResponse] = await Promise.all([
        productoApi.getAll(),
        categoriaApi.getAll(),
      ])

      setProductos(Array.isArray(productosResponse.data) ? productosResponse.data : [])
      setCategorias(Array.isArray(categoriasResponse.data) ? categoriasResponse.data : [])
    } catch (err) {
      setError(err.message || 'Error al cargar datos')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setForm({
      id_categoria: '',
      nombre: '',
      descripcion: '',
      precio: '',
      stock: '',
    })
    setEditingId(null)
  }

  const guardarProducto = async (event) => {
  event.preventDefault()
  setError('')
  setSuccessMessage('')

  if (!form.id_categoria || !form.nombre.trim() || Number(form.precio) <= 0 || Number(form.stock) < 0) {
    setError('Los campos categoría, nombre, precio y stock son obligatorios.')
    return
  }

  try {
    setSaving(true)

    const payload = {
      id_categoria: Number(form.id_categoria),
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: Number(form.precio),
      stock: Number(form.stock),
    }

    if (editingId) {
      await productoApi.update(editingId, payload)
      setSuccessMessage('Producto actualizado correctamente.')
    } else {
      await productoApi.create(payload)
      setSuccessMessage('Producto creado correctamente.')
    }

    resetForm()
    await cargarDatos()
  } catch (err) {
    setError(err.message || 'Error al guardar producto')
  } finally {
    setSaving(false)
  }
}

const editarProducto = (producto) => {
  setError('')
  setSuccessMessage('')
  setEditingId(producto.id_producto)

  setForm({
    id_categoria: producto.id_categoria || '',
    nombre: producto.nombre || '',
    descripcion: producto.descripcion || '',
    precio: producto.precio || '',
    stock: producto.stock || '',
  })
}

const eliminarProducto = async (id) => {
  setError('')
  setSuccessMessage('')

  const confirmado = window.confirm('¿Deseas eliminar este producto?')
  if (!confirmado) return

  try {
    await productoApi.delete(id)
    setSuccessMessage('Producto eliminado correctamente.')

    if (editingId === id) {
      resetForm()
    }

    await cargarDatos()
  } catch (err) {
    setError(err.message || 'Error al eliminar producto')
  }
}
const actualizarStock = async (producto) => {
  setError('')
  setSuccessMessage('')

  const nuevoStock = window.prompt(
    `Ingrese el nuevo stock para ${producto.nombre}:`,
    producto.stock,
  )

  if (nuevoStock === null) return

  if (Number(nuevoStock) < 0 || nuevoStock.trim() === '') {
    setError('El stock debe ser mayor o igual a cero.')
    return
  }

  try {
    await productoApi.updateStock(producto.id_producto, {
      stock: Number(nuevoStock),
    })

    setSuccessMessage('Stock actualizado correctamente.')
    await cargarDatos()
  } catch (err) {
    setError(err.message || 'Error al actualizar stock')
  }
}

  useEffect(() => {
    cargarDatos()
  }, [])

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-slate-800">Productos</h2>

      <form onSubmit={guardarProducto} className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Categoría</label>
          <select
            value={form.id_categoria}
            onChange={(e) => setForm({ ...form, id_categoria: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2">
            <option value="">Seleccione una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>{categoria.nombre}</option>))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Nombre</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"/>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Precio</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"/>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"/>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium text-slate-700">Descripción</label>
          <input
            type="text"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="w-full rounded border border-slate-300 px-3 py-2"/>
        </div>

        <div className="md:col-span-2">
          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-70">
              {saving ? 'Guardando...' : editingId ? 'Actualizar producto' : 'Guardar producto'}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded bg-slate-500 px-4 py-2 text-white hover:bg-slate-600">Cancelar edición</button>
            )}
          </div>
        </div>
      </form>

      {error && <p className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}
      {successMessage && (
        <p className="mt-4 rounded bg-green-100 p-3 text-green-700">{successMessage}</p>
      )}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-800">Listado de productos</h3>

        {loading ? (
          <p className="mt-4 text-slate-600">Cargando productos...</p>
        ) : productos.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Producto</th>
                  <th className="border p-3 text-left">Categoría</th>
                  <th className="border p-3 text-left">Precio</th>
                  <th className="border p-3 text-left">Stock</th>
                  <th className="border p-3 text-left">Descripción</th>
                  <th className="border p-3 text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id_producto}>
                    <td className="border p-3">{producto.id_producto}</td>
                    <td className="border p-3">{producto.nombre}</td>
                    <td className="border p-3">{producto.categoria}</td>
                    <td className="border p-3">Q {Number(producto.precio).toFixed(2)}</td>
                    <td className="border p-3">{producto.stock}</td>
                    <td className="border p-3">{producto.descripcion}</td>
                    <td className="border p-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => editarProducto(producto)}
                          className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600">Editar</button>
                        <button
                          type="button"
                          onClick={() => eliminarProducto(producto.id_producto)}
                          className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700">Eliminar</button>
                        <button
                        type="button"
                        onClick={() => actualizarStock(producto)}
                        className="rounded bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700">Stock</button>
                      </div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-slate-600">No hay productos registrados.</p>
        )}
      </div>
    </section>
  )
}

export default ProductosPage