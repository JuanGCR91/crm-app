import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import Admin from './pages/Admin'
import Supervisor from './pages/Supervisor'
import Agente from './pages/Agente'
import Login from './pages/Login'
import { getUserRole, getUserSession } from './utils/auth'

const ProtectedRoute = ({ children, role }) => {
  const session = getUserSession()
  if (!session) return <Navigate to="/login" />
  if (session.role !== role) return <Navigate to={`/${session.role}`} />
  return children
}

const AppRouter = () => {
  const role = getUserRole()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={
          <ProtectedRoute role="admin">
            <DashboardLayout role="admin"><Admin /></DashboardLayout>
          </ProtectedRoute>
        }/>
        <Route path="/supervisor" element={
          <ProtectedRoute role="supervisor">
            <DashboardLayout role="supervisor"><Supervisor /></DashboardLayout>
          </ProtectedRoute>
        }/>
        <Route path="/agente" element={
          <ProtectedRoute role="agente">
            <DashboardLayout role="agente"><Agente /></DashboardLayout>
          </ProtectedRoute>
        }/>
        <Route path="*" element={<Navigate to={role ? `/${role}` : "/login"} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
