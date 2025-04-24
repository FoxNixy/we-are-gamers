import { useEffect } from "react"
import { useAuthStore } from "../stores/authStore"

export const UserSessionPanel = () => {
  const { user, setUser } = useAuthStore()

  useEffect(() => {
    const localUser = sessionStorage.getItem('local_user')
    console.log(localUser)

    if (!localUser) {
      return setUser(null)
    }

    setUser(JSON.parse(localUser))
  }, [])
  
  return (
          <>
            {
              !user
              ? <>
              <div className="flex items-center gap-2">
        <a
          className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/registro"
          aria-label="Ir a la página sobre nosotros"
        >
          Register
        </a>
        <a
          className="bg-neutral-700 py-2 px-4 rounded-md hover:bg-neutral-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/iniciar-sesion"
          aria-label="Ir a la página sobre nosotros"
        >
          Login
        </a>
      </div>
              </>
              :         <a
          className="bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          href="/inventario"
          aria-label="Ir a la página sobre nosotros"
        >
          Inventario
        </a>
            }
          </>
  )
}