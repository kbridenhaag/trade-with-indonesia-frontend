import { GetServerSideProps, NextPage } from 'next'
import { DefaultLayout } from '../../../layouts/DefaultLayout'

const SignInGooglePage: NextPage = () => {
  return <DefaultLayout></DefaultLayout>
}

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl =
    'https://accounts.google.com/o/oauth2/v2/auth?response_type=code'
  const clientId = process.env.OAUTH_CLIENT_ID
  const redirectUri = process.env.OAUTH_REDIRECT_URI
  const scope = 'openid%20email'

  const oAuthUrl = `${baseUrl}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

  return {
    redirect: {
      destination: oAuthUrl,
      permanent: false
    }
  }
}

export default SignInGooglePage
