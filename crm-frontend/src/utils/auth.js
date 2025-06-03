export function setUserSession(user) {
  localStorage.setItem('crmUser', JSON.stringify(user))
}

export function getUserSession() {
  const stored = localStorage.getItem('crmUser')
  return stored ? JSON.parse(stored) : null
}

export function clearUserSession() {
  localStorage.removeItem('crmUser')
}

export function getUserRole() {
  const user = getUserSession()
  return user?.role || null
}
