import axios from 'axios'
import { useState } from "react";
import { Form } from "../../components/form/Form";
import { useAuthStore } from "../stores/authStore";
import { api } from "../../../../api/axios";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useAuthStore()
  const [errors, setErrors] = useState<string[]> ([])
  
  
  const handleSumit = async (formData: Record<string, any>) => {
    try {
      setIsLoading(true)
      setErrors([])
      const apiEndpoint = '/api/auth/login'
      const res = await api.post(apiEndpoint, formData)

      const { data } = res

      window.location.href = '/inventario'
      sessionStorage.setItem('local_user', JSON.stringify(data.user))
      setUser(data.user)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Server error:', error.response?.data);
        setErrors(error.response?.data.details.errors)
      } else {
        console.error('Error inesperado:', error);
        setErrors(['Error inesperado al intentar iniciar sesión'])
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  console.log(errors)
  return (
    <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4 text-center">Iniciar Sesión</h2>

      {errors.length > 0 && (
        <div className='my-2 flex flex-col gap-1 max-w-[17rem] mx-auto'>
          {errors.map((error, index) => (
              <p className='text-red-400 text-center text-balance' key={index}>{error}</p>
          ))}
      </div>
      )}
      
      <Form className="space-y-4" onSubmit={handleSumit}>
        <div>
          <label className="block text-gray-300 mb-1">Correo electrónico</label>
          <input
            type="email"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="ejemplo@dominio.com"
            required
            name="email"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-1">Contraseña</label>
          <input
            type="password"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="********"
            name="password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-medium transition"
        >
                    {
            !isLoading
              ? 'Iniciar Sesión'
              : <div className="size-6 mx-auto">
                <div className="size-full rounded-full border-3 border-neutral-200 border-b-transparent animate-spin" />
              </div>
          }
          
        </button>
      </Form>
      <p className="text-center text-gray-400 mt-4">
        ¿No tienes cuenta?{' '}
        <a href="/registro" className="text-blue-500 hover:underline">
          Regístrate
        </a>
      </p>
    </div>
  );
}