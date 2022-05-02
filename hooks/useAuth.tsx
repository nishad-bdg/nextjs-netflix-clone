import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { auth } from '../firebase'

interface IAuth {
  user: User | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

interface AuthProviderProps {
  children: React.ReactNode
}

export const authProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [initialLoading, setInitialLoading] = useState<boolean>(false)

  const router = useRouter()

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged in...
          setUser(user)
          setLoading(false)
        } else {
          // Not logged in...
          setUser(null)
          setLoading(true)
          router.push('/login')
        }

        setInitialLoading(false)
      }),
    [auth]
  )

  const signUp = async (email: string, password: string) => {
    setLoading(true)
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      setUser(user.user)
      router.push('/')
    } catch (error: any) {
      alert(error.message)
    }
    setLoading(false)
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      setUser(user.user)
      router.push('/')
    } catch (error: any) {
      alert(error.message)
    }
    setLoading(false)
  }

  const logout = async () => {
    setLoading(true)
    try {
      await signOut(auth)
      setUser(null)
    } catch (error: any) {
      alert(error.message)
    }
    setLoading(false)
  }

  const memoedValue = useMemo(
    () => ({
      user,
      signIn,
      signUp,
      logout,
      loading,
      error,
    }),
    [user, loading, error]
  )
  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export default useAuth
