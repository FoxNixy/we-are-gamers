import { useEffect, useState } from "react"
import { Form } from "../features/components/form/Form"

export const Inventory = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    const getProducts = async () => {
      try {
        const apiEndpoint = 'https://gaming-shop-5846.onrender.com/api/products'
        const res = await fetch(apiEndpoint, {
          method: 'GET',
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message)
        }

        setProducts(data)
      } catch (error) {
        const errorMessage = error instanceof Error
          ? error.message 
          : 'An error has occurred'
        
        console.error(errorMessage)
      }
    }
    getProducts()
  }, [])

  const handleSubmit = async (formData: Record<any, string>) => {
    try {
      setIsLoading(true)
      const apiEndpoint = 'https://gaming-shop-5846.onrender.com/api/products'
      const res = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      setProducts(data)
    } catch (error) {
      const errorMessage = error instanceof Error
          ? error.message 
          : 'An error has occurred'
        
      console.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async (productId: string) => {
    try {
      const apiEndpoint = `https://gaming-shop-5846.onrender.com/api/products/${productId}`
      const res = await fetch(apiEndpoint, {
        method: 'DELETE'
      })

      const data = await res.json()
      console.log(data)

      if (!res.ok) {
        throw new Error(data.message)
      }

      setProducts(data)
    } catch (error) {
      const errorMessage = error instanceof Error
          ? error.message 
          : 'An error has occurred'
        
      console.error(errorMessage)
    }
  }
  
  return (
    <div className="max-w-6xl mx-auto">
    <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Agregar Nuevo Producto</h2>
      <Form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1">Nombre del producto</label>
            <input
              type="text"
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ej. Smartphone X"
              required
              name="name"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Precio</label>
            <input
              type="number"
              className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              name="price"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Descripción</label>
          <textarea
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Detalles del producto"
              name="description"
          />
        </div>
        <div className="flex items-center">

          <label className="ml-2 text-gray-300 flex items-center flex-row-reverse">Disponible           <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 mr-1.5 bg-gray-700 border-gray-600 rounded focus:ring-blue-400"
            name="available"
          /></label>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition"
        >
          {
            !isLoading
              ? 'Guardar Producto'
              : <div className="size-6 mx-auto">
                <div className="size-full rounded-full border-3 border-neutral-200 border-b-transparent animate-spin" />
              </div>
          }
        </button>
      </Form>
    </div>
    
     <div className="p-6 bg-zinc-900 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-white mb-4">Lista de productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white border border-zinc-700">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-4 py-3 border-b border-zinc-700 max-w-max">Nombre</th>
              <th className="px-4 py-3 border-b border-zinc-700 max-w-max">Descripción</th>
              <th className="px-4 py-3 border-b border-zinc-700 max-w-max">Precio</th>
              <th className="px-4 py-3 border-b border-zinc-700 max-w-max">Disponible</th>
              <th className="px-4 py-3 border-b border-zinc-700 max-w-max">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products?.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-zinc-500">
                  No hay productos registrados.
                </td>
              </tr>
            ) : (
              products?.map((product) => (
                <tr key={product.id} className="hover:bg-zinc-800 transition">
                  <td className="px-4 py-3 border-b border-zinc-700">
                    <input type="text" defaultValue={product.name} />
                  </td>
                  <td className="px-4 py-3 border-b border-zinc-700">
                    {product.description || "-"}
                  </td>
                  <td className="px-4 py-3 border-b border-zinc-700">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-3 border-b border-zinc-700">
                    {product.available ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 size-5"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 size-5 rotate-45"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b border-zinc-700 flex gap-3">
                    <a href={`/productos/${product.id}`} className="block py-1.5 px-3 bg-blue-600 text-white rounded hover:cursor-pointer transition hover:bg-blue-600/75" title="Editar">
                      {/* <FaEdit /> */}
                      Editar
                    </a>
                    <button onClick={() => onDelete(product.id)} className="block py-1.5 px-3 bg-red-600 text-white rounded hover:cursor-pointer transition hover:bg-red-600/75" title="Eliminar">
                      {/* <FaTrash /> */}
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
    
    </div>
    
  )
}