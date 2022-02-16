import { GetServerSideProps, NextPage } from 'next'
import { DefaultLayout } from '../../../layouts/DefaultLayout'
import { Text } from '../../../kbridh/Text'
import { Link } from '../../../kbridh/Link'
import useUser from '../../../hooks/use-user'
import { useEffect } from 'react'

interface VerifyGoogleOAuthCodePageProps {
  error?: string
  accessToken?: string
}

const VerifyGoogleOAuthCodePage: NextPage<VerifyGoogleOAuthCodePageProps> = (
  props: VerifyGoogleOAuthCodePageProps
) => {
  const { error, accessToken } = props
  const { user, mutateUser } = useUser({
    redirectIfFound: true,
    redirectTo: '/'
  })

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('__BATIK_ACCESS__', accessToken)
      mutateUser()
    }
  }, [accessToken, mutateUser])

  return (
    <DefaultLayout>
      {error ? (
        <>
          <Text as="h1" size="heading-xl">
            An error has occured
          </Text>
          <Text>
            An error has occured which prevented you from signing in. Please{' '}
            <Link href="/sign-in">try again.</Link>
          </Text>
          <Text>Message: {error}</Text>
        </>
      ) : (
        <>
          <Text as="h1" size="heading-xl">
            Sign in with Google
          </Text>
          <Text>Redirecting you to the homepage...</Text>
        </>
      )}
    </DefaultLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { code } = ctx.query

  if (!code || typeof code !== 'string') {
    return {
      props: {
        error: 'CodeNotSupplied'
      }
    }
  }

  try {
    const googleAccessToken = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code,
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          redirect_uri: process.env.OAUTH_REDIRECT_URI,
          grant_type: 'authorization_code'
        })
      }
    ).then(async (res) => {
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || err.err_description)
      }
      const { id_token } = await res.json()
      return id_token
    })

    const accessTokenResult = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          accessToken: googleAccessToken
        })
      }
    )

    if (!accessTokenResult.ok) {
      const result = await accessTokenResult.json()
      const error = new Error(result.error)
      throw error
    }

    const { accessToken } = await accessTokenResult.json()

    return {
      props: {
        accessToken
      }
    }
  } catch (e) {
    return {
      props: {
        error: e instanceof Error ? e.message : 'Unexpected Error'
      }
    }
  }
}

export default VerifyGoogleOAuthCodePage
