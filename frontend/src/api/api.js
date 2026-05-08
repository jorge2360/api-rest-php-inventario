const API_BASE_URL = 'http://localhost:8000'

async function request(endpoint, options = {}) {
  const headers = {
    ...(options.headers || {}),
  }

  if (options.body) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Error en la solicitud')
  }

  return data
}

export const categoriaApi = {
  getAll() {
    return request('/categorias')
  },
  create(payload) {
    return request('/categorias', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  update(id, payload) {
    return request(`/categorias/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })
  },
  delete(id) {
    return request(`/categorias/${id}`, {
      method: 'DELETE',
    })
  },
}
export const productoApi = {
  getAll() {
    return request('/productos')
  },
  create(payload) {
    return request('/productos', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}