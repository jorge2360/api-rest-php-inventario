import { useEffect, useState } from 'react'
import { productoApi } from '../api/api'

function ProductosPage() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const cargarProductos = async () => {
    setLoading(true)
    setError('')

    try {
      const response = await productoApi.getAll()
      setProductos(Array.isArray(response.data) ? response.data : [])
    } catch (err) {
      setError(err.message || 'Error al cargar productos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarProductos()
  }, [])

  return (
    <section className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-semibold text-slate-800">Productos</h2>

      {loading && <p className="mt-4 text-slate-600">Cargando productos...</p>}
      {error && <p className="mt-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}

      {!loading && !error && (
        <div className="mt-4 overflow-x-auto">
          {productos.length > 0 ? (
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-slate-100">
                  <th className="border p-3 text-left">ID</th>
                  <th className="border p-3 text-left">Producto</th>
                  <th className="border p-3 text-left">Categoría</th>
                  <th className="border p-3 text-left">Precio</th>
                  <th className="border p-3 text-left">Stock</th>
                  <th className="border p-3 text-left">Descripción</th>
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
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-600">No hay productos registrados.</p>
          )}
        </div>
      )}
    </section>
  )
}

export default ProductosPage