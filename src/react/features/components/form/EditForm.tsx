import { useEffect, useState } from "react"
import { Form } from "./Form"

export const EditForm = ({
  productId,
}: {
  productId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [product, setProduct] = useState({})

  useEffect(() => {
    const getCurrentProduct = async () => {
      try {
        const res = await fetch(`https://gaming-shop-5846.onrender.com/api/products/${productId}`, {
          method: "GET",
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message)
        }

        setProduct(data)
      } catch (error) {
              const errorMessage = error instanceof Error
        ? error.message
        : 'An error has occurred'
      
      console.error(errorMessage)
      }
    }

    getCurrentProduct()
  })
  
  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      setIsLoading(true)
      const apiEndpoint = `https://gaming-shop-5846.onrender.com/api/products/${productId}`
      const res = await fetch(apiEndpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message)
      }

      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 1500);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'An error has occurred'
      
      console.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="name" className="block text-sm mb-1">Nombre</label>
      <input
        type="text"
        id="name"
        defaultValue={product?.name}
        name="name"
        className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Nombre del producto"
        required
      />

      <label htmlFor="description" className="block text-sm mb-1">Descripción</label>
      <textarea
        id="description"
        name="description"
        rows={3}
        defaultValue={product?.description}
        className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Descripción del producto"></textarea>

      <label htmlFor="price" className="block text-sm mb-1">Precio</label>
      <input
        type="number"
        step="0.01"
        id="price"
        name="price"
        className="w-full mb-4 px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Precio del producto"
        required
        defaultValue={product?.price}
      />

      <div className="flex items-center mb-4">
        <label className="ml-2 text-gray-300 flex items-center flex-row-reverse"
          >Disponible <input
            type="checkbox"
            className="h-4 w-4 text-blue-500 mr-1.5 bg-gray-700 border-gray-600 rounded focus:ring-blue-400"
            name="available"
            defaultChecked={!!product?.available}
            
          /></label>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
      >
        
      {
        isLoading
          ? <div className="size-6 mx-auto">
            <div className="size-full rounded-full border-3 border-neutral-200 border-b-transparent animate-spin" />
          </div>
          : success 
            ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-400"><path d="M20 6 9 17l-5-5"/></svg>
            : 'Guardar Cambios'
      }
      </button>
      <a href="/inventario" className="w-full block mt-2 text-center border border-blue-600 hover:bg-blue-900 text-white font-medium py-2 rounded-md transition">Volver</a>
    </Form>
  )
}