import { useEffect, useState } from 'react'
import { categoriaApi, productoApi } from '../api/api'
import Card from '../components/Card'

function HomePage() {
  const [stats, setStats] = useState({
    totalCategorias: 0,
    totalProductos: 0,
    stockTotal: 0,
    productosBajoStock: 0,
  })

  const [loading, setLoading] = useState(false)

  const cargarMetricas = async () => {
    setLoading(true)

    try {
      const [categoriasResponse, productosResponse] = await Promise.all([
        categoriaApi.getAll(),
        productoApi.getAll(),
      ])

      const categorias = Array.isArray(categoriasResponse.data) ? categoriasResponse.data : []
      const productos = Array.isArray(productosResponse.data) ? productosResponse.data : []

      const stockTotal = productos.reduce((total, producto) => {
        return total + Number(producto.stock || 0)
      }, 0)

      const productosBajoStock = productos.filter((producto) => Number(producto.stock) <= 5).length

      setStats({
        totalCategorias: categorias.length,
        totalProductos: productos.length,
        stockTotal,
        productosBajoStock,
      })
    } catch (error) {
      console.error('Error al cargar métricas:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarMetricas()
  }, [])

  return (
    <Card title="Resumen general">
      {loading ? (
        <p className="text-slate-600">Cargando métricas...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm font-medium text-blue-700">Categorías</p>
            <p className="mt-2 text-3xl font-bold text-blue-900">{stats.totalCategorias}</p>
          </div>

          <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-sm font-medium text-indigo-700">Productos</p>
            <p className="mt-2 text-3xl font-bold text-indigo-900">{stats.totalProductos}</p>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-5">
            <p className="text-sm font-medium text-emerald-700">Stock total</p>
            <p className="mt-2 text-3xl font-bold text-emerald-900">{stats.stockTotal}</p>
          </div>

          <div className="rounded-xl border border-red-100 bg-red-50 p-5">
            <p className="text-sm font-medium text-red-700">Bajo stock</p>
            <p className="mt-2 text-3xl font-bold text-red-900">{stats.productosBajoStock}</p>
          </div>
        </div>
      )}
    </Card>
  )
}

export default HomePage