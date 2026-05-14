// Client-safe session ID utility — no server/db imports
export function generateSessionId(): string {
  return `s-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return generateSessionId()
  const key = 'bee-lab-session'
  let id = localStorage.getItem(key)
  if (!id) { id = generateSessionId(); localStorage.setItem(key, id) }
  return id
}
