import { useEffect, useState } from 'react'
import { categoriaApi, productoApi } from '../api/api'
import Card from '../components/Card'
import Button from '../components/Button'
import Alert from '../components/Alert'

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

const getStockBadge = (stock) => {
  const value = Number(stock)

  if (value <= 5) {
    return 'bg-red-100 text-red-700'
  }

  if (value <= 15) {
    return 'bg-amber-100 text-amber-700'
  }

  return 'bg-emerald-100 text-emerald-700'
}

  return (
    <Card title="Gestión de productos">

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
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancelar edición
              </Button>
            )}
          </div>
        </div>
      </form>

      {error && <Alert type="error">{error}</Alert>}
      {successMessage && <Alert type="success">{successMessage}</Alert>}

      <div className="mt-6">
        <h3 className="text-lg font-semibold text-slate-800">Listado de productos</h3>

        {loading ? (
          <p className="mt-4 text-slate-600">Cargando productos...</p>
        ) : productos.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-50">
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">ID</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Producto</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Categoría</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Precio</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Stock</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Descripción</th>
                  <th className="border-b border-slate-200 p-3 text-left text-sm font-semibold text-slate-700">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {productos.map((producto) => (
                  <tr key={producto.id_producto} className="hover:bg-slate-50">
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-700">{producto.id_producto}</td>
                    <td className="border-b border-slate-100 p-3 text-sm font-medium text-slate-800">{producto.nombre}</td>
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-600">{producto.categoria}</td>
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-700">Q {Number(producto.precio).toFixed(2)}</td>
                    <td className="border-b border-slate-100 p-3">
                      <span className={`rounded-full px-3 py-1 text-sm font-medium ${getStockBadge(producto.stock)}`}>
                        {producto.stock}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 p-3 text-sm text-slate-600">{producto.descripcion || 'Sin descripción'}</td>
                    <td className="border-b border-slate-100 p-3">
                      <div className="flex flex-wrap gap-2">
                        <Button type="button" variant="warning" onClick={() => editarProducto(producto)}>
                          Editar
                        </Button>
                        <Button type="button" variant="success" onClick={() => actualizarStock(producto)}>
                          Stock
                        </Button>
                        <Button type="button" variant="danger" onClick={() => eliminarProducto(producto.id_producto)}>
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
          <p className="mt-4 text-slate-600">No hay productos registrados.</p>
        )}
      </div>
    </Card>
  )
}

export default ProductosPage