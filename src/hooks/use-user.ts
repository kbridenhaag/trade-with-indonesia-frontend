import { useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import useSWR from 'swr'
import { fetcherWithAuth, fetchUser } from '../fetcher'

export default function useUser({
  redirectTo = '',
  redirectIfFound = false
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR<{
    id: string
    email: string
    role: string
    isSignedOut?: boolean
  }>(process.env.NEXT_PUBLIC_API_URL + '/users/me', fetchUser)

  const router = useRouter()

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && user.isSignedOut) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && !user.isSignedOut)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  const signOut = () => {
    localStorage.removeItem('__BATIK_ACCESS__')
    mutateUser(undefined)
    router.push('/sign-in')
  }

  return { user, mutateUser, signOut }
}
