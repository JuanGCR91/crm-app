import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/Input'
import { setUserSession } from '@/utils/auth'

// Usuarios simulados para prueba local
const users = [
  { email: 'admin@crm.com', password: '1234', role: 'admin' },
  { email: 'supervisor@crm.com', password: '1234', role: 'supervisor' },
  { email: 'agente@crm.com', password: '1234', role: 'agente' },
]

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    const user = users.find(u => u.email === email && u.password === password)
    if (!user) {
      setError('Credenciales inválidas')
      return
    }
    setUserSession(user)
    navigate(`/${user.role}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Input label="Correo electrónico" value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        <Input label="Contraseña" value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700">
          Entrar
        </button>
      </form>
    </div>
  )
}

export default Login
