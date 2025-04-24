import type { FC, FormEvent, ReactNode } from "react"

interface FormProps {
  children: ReactNode
  onSubmit: (formData: Record<string, any>) => void
  className?: string
}

export const Form: FC<FormProps> = ({
  children,
  onSubmit,
  className
}) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    const currentTarget = e.currentTarget as HTMLFormElement

    const formData = Object.fromEntries(new window.FormData(currentTarget))

    onSubmit(formData)
  }
  
  return (
    <form className={className} onSubmit={handleSubmit}>
        {children}
    </form>
  )
}